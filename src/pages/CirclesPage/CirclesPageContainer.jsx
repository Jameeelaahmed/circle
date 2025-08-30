// libs
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { fetchCircles, listenToCircles } from '../../features/circles/circlesSlice';
// slices & hooks
import { setSelectedCircle } from '../../features/circles/circlesSlice';
import { fetchCircleMembers } from '../../features/circleMembers/circleMembersSlice';
import { getProfileData } from '../../features/userProfile/profileSlice';
import { useAuth } from '../../hooks/useAuth';
import { useJoinCircleRequest } from '../../hooks/useJoinCircleRequest';
import { useSyncPendingRequests } from "../../contexts/PendingRequests";
import { useDeleteCircle } from "../../hooks/useDeleteCircle";
// components
import { Plus } from "lucide-react";
import CirclesPagePresentational from './CirclesPagePresentational'
import CirclesTabs from '../../components/ui/CircleTabs/CirclesTabs';
import CirclesPrivacyFilter from '../../components/ui/CirclePrivacyFilter/CirclesPrivacyFilter';
import CustomPaginationContainer from '../../components/Pagination/CustomPaginationContainer';
import CirclesSkeltonCard from '../../components/CirclesSkeltonsCard/CirclesSkeltonCard';
import Modal from '../../components/ui/Modal/Modal';
import CreateCircleModalContainer from '../../components/ui/Modal/CreateCircleModal/CreateCircleModalContainer';
import Select from 'react-select';
import { Filter } from "lucide-react"; // Or your preferred icon
import customSelectStyles from '../../components/ui/Modal/CreateCircleModal/customSelectStyles'; // Adjust path as needed
function CirclesPageContainer() {
    const { t } = useTranslation();
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
    const [sendingRequestId, setSendingRequestId] = useState(null);
    const [showMutualOnly, setShowMutualOnly] = useState(false);
    const [showFilterMenu, setShowFilterMenu] = useState(false);

    const { handleJoinRequest, pendingRequests, setPendingRequests } = useJoinCircleRequest({
        circles,
        membersByCircle,
        user,
        profile,
        setSendingRequestId
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
                filteredCircles = filteredCircles.filter(circle => circle.circlePrivacy === 'public');
            } else if (circlePrivacy === 'private') {
                filteredCircles = filteredCircles.filter(circle => circle.circlePrivacy === 'private');
            }
        } else if (user && profile?.interests && profile.interests.length > 0) {
            // Convert profile interests to lowercase once
            const userInterestsLower = profile.interests.map(i => i.toLowerCase());

            filteredCircles = circles
                // Exclude circles the user is a member of
                .filter(circle => !(profile?.joinedCircles?.includes(circle.id)))
                .map(circle => ({
                    ...circle,
                    matchedInterests: (circle.interests || []).filter(interest =>
                        userInterestsLower.includes(interest.toLowerCase())
                    )
                }))
                .sort((a, b) => b.matchedInterests.length - a.matchedInterests.length)
                .filter(circle => circle.circlePrivacy === 'public');

            if (showMutualOnly) {
                filteredCircles = filteredCircles.filter(circle => circle.matchedInterests.length > 0);
            }
        } else {
            filteredCircles = circles.filter(circle => (circle.circlePrivacy === 'public'));
        }

        if (searchQuery.trim()) {
            const queryLower = searchQuery.trim().toLowerCase();
            filteredCircles = filteredCircles.filter(circle =>
                circle.circleName?.toLowerCase().includes(queryLower) ||
                circle.description?.toLowerCase().includes(queryLower) ||
                (circle.interests && circle.interests.some(interest => interest.toLowerCase().includes(queryLower)))
            );
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
    const isOwner = user && selectedCircleToDelete && selectedCircleToDelete.createdBy === user.uid;

    // Delete logic inside the container
    const [isDeleting, setIsDeleting] = useState(false);

    const { deleteCircle } = useDeleteCircle({ t, dispatch, fetchCircles });

    const handleDeleteCircle = () => {
        deleteCircle({
            selectedCircleToDelete,
            isOwner,
            closeCircleDeleteModal,
            setIsDeleting,
        });
    };

    useSyncPendingRequests(user);

    useEffect(() => {
        const unsubscribe = dispatch(listenToCircles());
        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, [dispatch]);
    const createCircleRef = useRef()
    function openCCircleModal() {
        createCircleRef.current.open();
    }
    function closeCCircleModal() {
        createCircleRef.current.close();
    }
    return (
        <div className='pt-paddingTop bg-gradient-to-b from-bg-primary to-bg-secondary flex flex-col min-h-screen'>
            {user && <>
                <CirclesTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                {activeTab === "my" &&
                    <CirclesPrivacyFilter circlePrivacy={circlePrivacy} setCirclePrivacy={setCirclePrivacy} />
                }

                {/* Search Bar */}
                <div className="mb-4 flex justify-center items-center px-2">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder={t("Search circles...")}
                        className="px-3 py-2 rounded-3xl border border-primary bg-transparent text-text w-full max-w-xs sm:max-w-md md:max-w-lg transition-all"
                    />
                    <div className='bg-primary rounded-3xl p-2 ltr:ml-1.5 rtl:mr-1.5 cursor-pointer' onClick={openCCircleModal}>
                        <Plus size={20} />
                    </div>
                    {activeTab === "forYou" && (
                        <div className="relative flex items-center ml-2 min-w-[220px]">
                            <button
                                type="button"
                                className="flex items-center justify-center bg-transparent border-none outline-none cursor-pointer"
                                onClick={() => setShowFilterMenu((prev) => !prev)}
                                aria-label={t("Filter circles")}
                            >
                                <Filter className="text-primary" size={20} />
                            </button>
                            {showFilterMenu && (
                                <div className="absolute left-8 top-0 z-10 min-w-[200px]">
                                    <Select
                                        value={
                                            showMutualOnly
                                                ? { value: "mutual", label: t("Show Only Mutual Interests") }
                                                : { value: "all", label: t("Show All Circles") }
                                        }
                                        onChange={option => setShowMutualOnly(option.value === "mutual")}
                                        options={[
                                            { value: "all", label: t("Show All Circles") },
                                            { value: "mutual", label: t("Show Only Mutual Interests") }
                                        ]}
                                        styles={customSelectStyles}
                                        classNamePrefix="custom-select"
                                        isSearchable={false}
                                        menuIsOpen={true}
                                    />
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <Modal ref={createCircleRef}>
                    <CreateCircleModalContainer closeModal={closeCCircleModal} />
                </Modal>
                <div className="flex-1">
                    {(circlesStatus !== "succeeded" ||
                        profileStatus !== "succeeded" ||
                        !allMembersLoaded) ? (
                        <CirclesSkeltonCard />
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
                            sendingRequestId={sendingRequestId}
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
                            <span>{t("No circles found.")}</span>
                        </div>
                    )}
                </>
            }

        </div>
    );
}

export default CirclesPageContainer
