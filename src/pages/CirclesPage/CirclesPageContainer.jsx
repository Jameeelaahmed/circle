// libs
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import { getFirestore, collection, doc, query, where, getDocs, writeBatch } from "firebase/firestore";
import { toast } from "react-toastify";
import { fetchCircles, listenToCircles } from '../../features/circles/circlesSlice';
// slices & hooks
import { setSelectedCircle } from '../../features/circles/circlesSlice';
import { fetchCircleMembers } from '../../features/circleMembers/circleMembersSlice';
import { getProfileData } from '../../features/userProfile/profileSlice';
import { useAuth } from '../../hooks/useAuth';
import { useJoinCircleRequest } from '../../hooks/useJoinCircleRequest';
import { useSyncPendingRequests } from "../../contexts/PendingRequests";
// components
import CirclesPagePresentational from './CirclesPagePresentational'
import CirclesTabs from '../../components/ui/CircleTabs/CirclesTabs';
import CirclesPrivacyFilter from '../../components/ui/CirclePrivacyFilter/CirclesPrivacyFilter';
import CustomPaginationContainer from '../../components/Pagination/CustomPaginationContainer';
import CirclesSkeltonCard from '../../components/CirclesSkeltonsCard/CirclesSkeltonCard';
function CirclesPageContainer() {
    const membersByCircle = useSelector(state => state.members.membersByCircle);
    const circles = useSelector(state => state.circles.circles);
    const { user } = useAuth()
    const navigate = useNavigate();
    const profile = useSelector(getProfileData);
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState('my');
    const [circlePrivacy, setCirclePrivacy] = useState('all');
    const [currentPage, setCurrentPage] = useState(0);
    const circlesPerPage = activeTab === "my" ? 9 : 6;
    const circlesStatus = useSelector(state => state.circles.status);
    const profileStatus = useSelector(state => state.userProfile.status);
    const { isLoggedIn } = useAuth();
    const authModalRef = useRef();
    const deleteCircleRef = useRef();
    const [selectedCircleToDelete, setSelectedCircleToDelete] = useState(null);

    const [searchQuery, setSearchQuery] = useState("");

    const { handleJoinRequest, pendingRequests, setPendingRequests } = useJoinCircleRequest({
        circles,
        membersByCircle,
        user,
        profile
    });

    useEffect(() => {
        circles.forEach(circle => {
            if (circle.id && !membersByCircle[circle.id]) {
                dispatch(fetchCircleMembers(circle.id));
            }
        });
    }, [circles, membersByCircle, dispatch]);

    // Helper to check if all members are loaded
    const allMembersLoaded = circles.every(circle => membersByCircle[circle.id]);

    let filteredCircles = [];
    let paginatedCircles = [];
    let pageCount = 0;

    if (
        circlesStatus === "succeeded" &&
        allMembersLoaded &&
        (user ? profileStatus === "succeeded" : true)
    ) {
        filteredCircles = circles;
        if (user && activeTab === 'my') {
            filteredCircles = circles.filter(circle => profile?.joinedCircles?.includes(circle.id));
            if (circlePrivacy === 'public') {
                filteredCircles = filteredCircles.filter(circle => circle.circlePrivacy === 'Public');
            } else if (circlePrivacy === 'private') {
                filteredCircles = filteredCircles.filter(circle => circle.circlePrivacy === 'Private');
            }
        } else if (user && profile?.interests && profile.interests.length > 0) {
            filteredCircles = circles
                .map(circle => ({
                    ...circle,
                    matchedInterests: circle.interests?.filter(interest =>
                        profile.interests.includes(interest)
                    ) || []
                }))
                .filter(circle =>
                    (circle.matchedInterests.length > 0 && circle.circlePrivacy === 'Public') &&
                    !((membersByCircle?.[circle.id] || []).some(member => member.id === user.uid))
                )
                .sort((a, b) => b.matchedInterests.length - a.matchedInterests.length);
        } else {
            filteredCircles = circles.filter(circle => (circle.circlePrivacy === 'public' || circle.circlePrivacy === 'Public'));
        }

        // --- SEARCH FILTER ---
        if (searchQuery.trim()) {
            const queryLower = searchQuery.trim().toLowerCase();
            filteredCircles = filteredCircles.filter(circle =>
                circle.circleName?.toLowerCase().includes(queryLower) ||
                circle.description?.toLowerCase().includes(queryLower) ||
                (circle.interests && circle.interests.some(interest => interest.toLowerCase().includes(queryLower)))
            );
        }
        // --- END SEARCH FILTER ---

        pageCount = Math.ceil(filteredCircles.length / circlesPerPage);
        paginatedCircles = filteredCircles.slice(
            currentPage * circlesPerPage,
            (currentPage + 1) * circlesPerPage
        );
    }

    const [authFormType, setAuthFormType] = useState("login");

    const handleSwitchToRegister = () => setAuthFormType("register");
    const handleSwitchToLogin = () => setAuthFormType("login");

    function handleOpenAuthModal() {
        authModalRef.current.open();
    }
    function handleCloseAuthModal() {
        authModalRef.current.close();
    }
    function handleCardClick(circle) {
        if (isLoggedIn) {
            dispatch(setSelectedCircle(circle));
            navigate(`/circles/${circle.id}`);
        } else {
            handleOpenAuthModal()
        }
    }

    useEffect(() => {
        async function fetchPendingRequests() {
            if (!user) {
                setPendingRequests([]);
                return;
            }
            const db = getFirestore();
            const q = query(
                collection(db, "circleRequests"),
                where("userId", "==", user.uid),
                where("status", "==", "pending")
            );
            const snapshot = await getDocs(q);
            const requests = snapshot.docs.map(doc => doc.data().circleId);
            setPendingRequests(requests);
        }
        fetchPendingRequests();
    }, [user, circles]);

    function openDeleteCircleModal(circle) {
        setSelectedCircleToDelete(circle);
        deleteCircleRef.current.open();
    }

    function closeCircleDeleteModal() {
        setSelectedCircleToDelete(null);
        deleteCircleRef.current.close();
    }
    const isOwner = user && selectedCircleToDelete && selectedCircleToDelete.createdBy.uid === user.uid;

    // Delete logic inside the container
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteCircle = async () => {
        if (!isOwner || !selectedCircleToDelete) return;
        setIsDeleting(true);

        try {
            const db = getFirestore();
            const batch = writeBatch(db);

            // 1. Remove the circle from all users' joinedCircles
            const usersSnapshot = await getDocs(collection(db, "users"));
            usersSnapshot.forEach(userDoc => {
                const userData = userDoc.data();
                if (
                    Array.isArray(userData.joinedCircles) &&
                    userData.joinedCircles.includes(selectedCircleToDelete.id)
                ) {
                    const updatedCircles = userData.joinedCircles.filter(
                        id => id !== selectedCircleToDelete.id
                    );
                    batch.update(userDoc.ref, { joinedCircles: updatedCircles });
                }
            });

            // 2. Delete related join requests and invitations
            const requestsQuery = query(
                collection(db, "circleRequests"),
                where("circleId", "==", selectedCircleToDelete.id)
            );
            const requestsSnapshot = await getDocs(requestsQuery);
            requestsSnapshot.forEach(requestDoc => {
                batch.delete(requestDoc.ref);
            });

            // 3. Delete the circle document itself (inside batch!)
            batch.delete(doc(db, "circles", selectedCircleToDelete.id));

            // Commit everything together
            await batch.commit();

            toast.success("Circle deleted successfully!");
            dispatch(fetchCircles());
            closeCircleDeleteModal();
        } catch (error) {
            toast.error("Failed to delete circle.");
            console.error(error);
        } finally {
            setIsDeleting(false);
        }
    };

    useSyncPendingRequests(user);

    useEffect(() => {
        const unsubscribe = dispatch(listenToCircles());
        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, [dispatch]);

    return (
        <div className='pt-paddingTop flex flex-col min-h-screen'>
            {user && <>
                <CirclesTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                {activeTab === "my" &&
                    <CirclesPrivacyFilter circlePrivacy={circlePrivacy} setCirclePrivacy={setCirclePrivacy} />
                }

                {/* Search Bar */}
                <div className="mb-4 flex justify-center px-2">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder="Search circles..."
                        className="px-3 py-2 rounded-3xl border border-primary bg-transparent text-text w-full max-w-xs sm:max-w-md md:max-w-lg transition-all"
                    />
                </div>
                <div className="flex-1">
                    {(circlesStatus !== "succeeded" ||
                        profileStatus !== "succeeded" ||
                        !allMembersLoaded) ? (
                        <div className="flex justify-center items-center h-full">
                            <span>Loading circles...</span>
                        </div>
                    ) : (
                        <CirclesPagePresentational
                            circles={paginatedCircles}
                            membersByCircle={membersByCircle}
                            handleCardClick={handleCardClick}
                            activeTab={activeTab}
                            circlesStatus={circlesStatus}
                            profileStatus={profileStatus}
                            profileInterests={profile?.interests || []}
                            user={user}
                            handleJoinRequest={handleJoinRequest}
                            pendingRequests={pendingRequests}
                            openDeleteCircleModal={openDeleteCircleModal}
                            deleteCircleRef={deleteCircleRef}
                            closeCircleDeleteModal={closeCircleDeleteModal}
                            onDeleteCircle={handleDeleteCircle}
                            isDeleting={isDeleting}
                            circleName={selectedCircleToDelete ? selectedCircleToDelete.circleName : ""}
                        />
                    )}
                </div>
                {pageCount > 1 && (
                    <CustomPaginationContainer
                        pageCount={pageCount}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                    />
                )}
            </>}

            {!user &&
                <>
                    {(circlesStatus !== "succeeded" || !allMembersLoaded) ? (
                        <CirclesSkeltonCard />
                    ) : paginatedCircles.length > 0 ? (
                        <CirclesPagePresentational
                            circles={paginatedCircles}
                            membersByCircle={membersByCircle}
                            handleCardClick={handleCardClick}
                            activeTab={activeTab}
                            circlesStatus={circlesStatus}
                            profileStatus={profileStatus}
                            profileInterests={profile?.interests || []}
                            user={user}
                            handleJoinRequest={handleJoinRequest}
                            handleSwitchToRegister={handleSwitchToRegister}
                            handleSwitchToLogin={handleSwitchToLogin}
                            authFormType={authFormType}
                            authModalRef={authModalRef}
                            handleCloseAuthModal={handleCloseAuthModal}
                        />
                    ) : (
                        <div className="flex justify-center items-center h-full">
                            <span>No circles found.</span>
                        </div>
                    )}
                </>
            }

        </div>
    );
}

export default CirclesPageContainer
