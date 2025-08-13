// libs
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import { getFirestore, collection, addDoc, serverTimestamp, doc, deleteDoc, query, where, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";
import { fetchCircles } from '../../features/circles/circlesSlice';
// slices & hooks
import { setSelectedCircle } from '../../features/circles/circlesSlice';
import { fetchCircleMembers } from '../../features/circleMembers/circleMembersSlice';
import { getProfileData } from '../../features/userProfile/profileSlice';
import { useAuth } from '../../hooks/useAuth';
// components
import { toastStyles } from "../../utils/toastStyles";
import CirclesPagePresentational from './CirclesPagePresentational'
import CirclesTabs from '../../components/ui/CircleTabs/CirclesTabs';
import CirclesPrivacyFilter from '../../components/ui/CirclePrivacyFilter/CirclesPrivacyFilter';
import CustomPaginationContainer from '../../components/Pagination/CustomPaginationContainer';
import CirclesSkeltonCard from '../../components/CirclesSkeltonsCard/CirclesSkeltonCard';
function CirclesPageContainer() {
    const membersByCircle = useSelector(state => state.members.membersByCircle);
    const navigate = useNavigate();
    const circles = useSelector(state => state.circles.circles);
    const profile = useSelector(getProfileData);
    const dispatch = useDispatch();
    const { user } = useAuth()
    const [activeTab, setActiveTab] = useState(user ? 'my' : 'forYou');
    const [circlePrivacy, setCirclePrivacy] = useState('all');
    const [currentPage, setCurrentPage] = useState(0);
    const circlesPerPage = activeTab === "my" ? 9 : 6;
    const circlesStatus = useSelector(state => state.circles.status);
    const profileStatus = useSelector(state => state.userProfile.status);
    const { isLoggedIn } = useAuth();
    const authModalRef = useRef();
    const [pendingRequests, setPendingRequests] = useState([]);
    const deleteCircleRef = useRef();
    const [selectedCircleToDelete, setSelectedCircleToDelete] = useState(null);

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

    async function handleJoinRequest(circleId, e) {
        e.stopPropagation();
        const db = getFirestore();
        const circle = circles.find(c => c.id === circleId);
        if (!circle || !user) return;

        // Find the owner member (not just admin)
        const members = membersByCircle[circle.id] || [];
        const ownerMember = members.find(member => member.isOwner);
        const circleOwnerId = ownerMember ? ownerMember.id : null;

        if (!circleOwnerId) {
            return;
        }

        // Check for existing pending join request
        const joinRequestQuery = query(
            collection(db, "circleRequests"),
            where("circleId", "==", circle.id),
            where("requesterId", "==", user.uid), // renamed for clarity
            where("status", "==", "pending"),
            where("type", "==", "join-request")
        );
        const joinRequestSnapshot = await getDocs(joinRequestQuery);
        if (!joinRequestSnapshot.empty) {
            return;
        }

        try {
            await addDoc(collection(db, "circleRequests"), {
                circleId: circle.id,
                type: "join-request",
                requesterId: user.uid,
                requesterUsername: profile.username,
                requesterEmail: profile.email,
                requesterPhotoUrl: profile.photoUrl,
                approverId: ownerMember.id,
                approverUsername: ownerMember.username,
                circleName: circle.circleName,
                message: `${profile.username} wants to join your circle "${circle.circleName}".`,
                status: "pending",
                createdAt: serverTimestamp()
            });
            setPendingRequests(prev => [...prev, circle.id]);
            toast.success("Request Sent successfully!", toastStyles);
        } catch (error) {
            console.error("Join request error:", error);
            alert("Failed to send join request.");
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
    const handleDeleteCircle = async () => {
        if (!isOwner || !selectedCircleToDelete) return;
        try {
            const db = getFirestore();
            await deleteDoc(doc(db, "circles", selectedCircleToDelete.id));
            toast.success("Circle deleted successfully!");
            dispatch(fetchCircles());
            closeCircleDeleteModal();
        } catch (error) {
            toast.error("Failed to delete circle.");
            console.error(error);
        }
    };

    return (
        <div className='pt-paddingTop flex flex-col min-h-screen'>
            {user && <>
                <CirclesTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                {activeTab === "my" &&
                    <CirclesPrivacyFilter circlePrivacy={circlePrivacy} setCirclePrivacy={setCirclePrivacy} />
                }
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
