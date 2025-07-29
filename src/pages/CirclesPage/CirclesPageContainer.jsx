// libs
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
// slices
import { setSelectedCircle } from '../../features/circles/circlesSlice';
import { fetchCircleMembers } from '../../features/circleMembers/circleMembersSlice';

// components
import CirclesPagePresentational from './CirclesPagePresentational'
import CirclesTabs from '../../components/ui/CircleTabs/CirclesTabs';
import CirclesPrivacyFilter from '../../components/ui/CirclePrivacyFilter/CirclesPrivacyFilter';
import CustomPaginationContainer from '../../components/Pagination/CustomPaginationContainer';

function CirclesPageContainer() {
    const circles = useSelector(state => state.circles.circles);
    const membersByCircle = useSelector(state => state.members.membersByCircle);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState('my');
    const [circlePrivacy, setCirclePrivacy] = useState('all');
    const [currentPage, setCurrentPage] = useState(0);
    const circlesPerPage = 6;

    useEffect(() => {
        circles.forEach(circle => {
            if (circle.id && !membersByCircle[circle.id]) {
                dispatch(fetchCircleMembers(circle.id));
            }
        });
    }, [circles, membersByCircle, dispatch]);

    // Filter circles by type for current tab
    let filteredCircles = circles;
    if (circlePrivacy === 'public') {
        filteredCircles = circles.filter(circle => circle.circlePrivacy === 'Public');
    } else if (circlePrivacy === 'private') {
        filteredCircles = circles.filter(circle => circle.circlePrivacy === 'Private');
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
            <CirclesPrivacyFilter circlePrivacy={circlePrivacy} setCirclePrivacy={setCirclePrivacy} />
            <div className="flex-1">
                {activeTab === 'forYou' ? (
                    <div className="text-center text-lg text-gray-400 py-12">No circles to show</div>
                ) : (
                    <CirclesPagePresentational
                        circles={paginatedCircles}
                        membersByCircle={membersByCircle}
                        handleCardClick={handleCardClick}
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
