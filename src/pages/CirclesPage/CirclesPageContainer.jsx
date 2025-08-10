// libs
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useEffect, useRef, useState } from 'react';
// slices & hooks
import { setSelectedCircle } from '../../features/circles/circlesSlice';
import { fetchCircleMembers } from '../../features/circleMembers/circleMembersSlice';
import { getProfileData } from '../../features/userProfile/profileSlice';
import { useAuth } from '../../hooks/useAuth';
// components
import CirclesPagePresentational from './CirclesPagePresentational'
import CirclesTabs from '../../components/ui/CircleTabs/CirclesTabs';
import CirclesPrivacyFilter from '../../components/ui/CirclePrivacyFilter/CirclesPrivacyFilter';
import CustomPaginationContainer from '../../components/Pagination/CustomPaginationContainer';
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
    const circlesPerPage = 6;
    const circlesStatus = useSelector(state => state.circles.status);
    const profileStatus = useSelector(state => state.userProfile.status);
    const { isLoggedIn } = useAuth();
    const authModalRef = useRef();
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

    const [authFormType, setAuthFormType] = useState("login"); // "login" or "register"

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

    function handleJoinRequest() {

    }

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
                        null // Don't render until all data is loaded
                    ) : (
                        <CirclesPagePresentational
                            circles={paginatedCircles}
                            membersByCircle={membersByCircle}
                            handleCardClick={handleCardClick}
                            activeTab={activeTab}
                            circlesStatus={circlesStatus}
                            profileStatus={profileStatus}
                            profileInterests={profile.interests}
                            user={user}
                            handleJoinRequest={handleJoinRequest}
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
                    <CirclesPagePresentational
                        circles={paginatedCircles}
                        membersByCircle={membersByCircle}
                        handleCardClick={handleCardClick}
                        activeTab={activeTab}
                        circlesStatus={circlesStatus}
                        profileStatus={profileStatus}
                        profileInterests={profile.interests}
                        user={user}
                        handleJoinRequest={handleJoinRequest}
                        handleSwitchToRegister={handleSwitchToRegister}
                        handleSwitchToLogin={handleSwitchToLogin}
                        authFormType={authFormType}
                        authModalRef={authModalRef}
                        handleCloseAuthModal={handleCloseAuthModal}
                    />
                </>
            }

        </div>
    );
}

export default CirclesPageContainer
