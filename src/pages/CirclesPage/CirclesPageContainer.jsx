// libs
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
// slices
import { setSelectedCircle } from '../../features/circles/circlesSlice';
import { fetchCircleMembers } from '../../features/circleMembers/circleMembersSlice';

// components
import CirclesPagePresentational from './CirclesPagePresentational'
function CirclesPageContainer() {
    const circles = useSelector(state => state.circles.circles);
    const membersByCircle = useSelector(state => state.members.membersByCircle);
    const user = useSelector(state => state.user.userInfo);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState('my');

    useEffect(() => {
        circles.forEach(circle => {
            if (circle.id && !membersByCircle[circle.id]) {
                dispatch(fetchCircleMembers(circle.id));
            }
        });
    }, [circles, membersByCircle, dispatch]);

    // My Circles: circles where user is a member
    const myCircles = circles.filter(circle => {
        const members = membersByCircle[circle.id] || [];
        return members.some(m => m.id === user?.uid);
    });

    // For You: circles with at least one matching interest
    const userInterests = user?.interests || [];

    const forYouCircles = circles.filter(circle => {
        if (!circle.interests || userInterests.length === 0) return false;
        return circle.interests.some(interest => userInterests.includes(interest));
    });

    const handleCardClick = (circle) => {
        dispatch(setSelectedCircle(circle));
        navigate(`/circles/${circle.id}`);
    };

    return (
        <div className='pt-paddingTop'>
            <div className="flex gap-4 mb-6 justify-center">
                <button
                    className={`px-4 py-2 rounded-full font-bold transition-colors ${activeTab === 'my' ? 'bg-primary text-white' : 'bg-main text-primary'}`}
                    onClick={() => setActiveTab('my')}
                >
                    My Circles
                </button>
                <button
                    className={`px-4 py-2 rounded-full font-bold transition-colors ${activeTab === 'forYou' ? 'bg-primary text-white' : 'bg-main text-primary'}`}
                    onClick={() => setActiveTab('forYou')}
                >
                    For You
                </button>
            </div>
            <CirclesPagePresentational
                circles={activeTab === 'my' ? myCircles : forYouCircles}
                membersByCircle={membersByCircle}
                handleCardClick={handleCardClick}
            />
        </div>
    )
}

export default CirclesPageContainer
