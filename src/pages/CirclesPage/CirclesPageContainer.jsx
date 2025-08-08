// libs
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
// slices
import { setSelectedCircle } from '../../features/circles/circlesSlice';
import { fetchCircleMembers } from '../../features/circleMembers/circleMembersSlice';
import { getProfileData } from '../../features/userProfile/profileSlice';
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
    const [activeTab, setActiveTab] = useState('my');
    const [circlePrivacy, setCirclePrivacy] = useState('all');
    const [currentPage, setCurrentPage] = useState(0);
    const circlesPerPage = 6;
    const circlesStatus = useSelector(state => state.circles.status);
    const profileStatus = useSelector(state => state.userProfile.status);
    useEffect(() => {
        circles.forEach(circle => {
            if (circle.id && !membersByCircle[circle.id]) {
                dispatch(fetchCircleMembers(circle.id));
            }
        });
    }, [circles, membersByCircle, dispatch]);

    let filteredCircles = circles;
    if (activeTab === 'my') {
        filteredCircles = circles.filter(circle => profile?.joinedCircles?.includes(circle.id));
        if (circlePrivacy === 'public') {
            filteredCircles = filteredCircles.filter(circle => circle.circlePrivacy === 'Public');
        } else if (circlePrivacy === 'private') {
            filteredCircles = filteredCircles.filter(circle => circle.circlePrivacy === 'Private');
        }
    } else {
        if (profile?.interests && profile.interests.length > 0) {
            filteredCircles = circles
                .map(circle => ({
                    ...circle,
                    matchedInterests: circle.interests?.filter(interest =>
                        profile.interests.includes(interest)
                    ) || []
                }))
                .filter(circle => circle.matchedInterests.length > 0 && circle.circlePrivacy === 'Public')
                .sort((a, b) => b.matchedInterests.length - a.matchedInterests.length);
        } else {
            filteredCircles = [];
        }
    }

    // Pagination logic
    const pageCount = Math.ceil(filteredCircles.length / circlesPerPage);
    const paginatedCircles = filteredCircles.slice(
        currentPage * circlesPerPage,
        (currentPage + 1) * circlesPerPage
    );

    const handleCardClick = (circle) => {
        dispatch(setSelectedCircle(circle));
        navigate(`/circles/${circle.id}`);
    };

    return (
        <div className='pt-paddingTop flex flex-col min-h-screen'>
            <CirclesTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab === "my" &&
                <CirclesPrivacyFilter circlePrivacy={circlePrivacy} setCirclePrivacy={setCirclePrivacy} />
            }
            <div className="flex-1">
                {activeTab === 'forYou' ? (
                    // <div className="text-center text-lg text-gray-400 py-12">No circles to show</div>
                    <CirclesPagePresentational
                        circles={paginatedCircles}
                        membersByCircle={membersByCircle}
                        handleCardClick={handleCardClick}
                        activeTab={activeTab}
                        circlesStatus={circlesStatus}
                        profileStatus={profileStatus}
                        profileInterests={profile.interests}
                    />
                ) : (
                    <CirclesPagePresentational
                        circles={paginatedCircles}
                        membersByCircle={membersByCircle}
                        handleCardClick={handleCardClick}
                        circlesStatus={circlesStatus}
                        activeTab={activeTab}
                        profileStatus={profileStatus}
                        profileInterests={profile.interests}
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
        </div>
    );
}

export default CirclesPageContainer
