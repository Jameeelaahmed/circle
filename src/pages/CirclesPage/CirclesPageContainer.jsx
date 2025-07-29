// libs
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
// slices
import { setSelectedCircle } from '../../features/circles/circlesSlice';
import { fetchCircleMembers } from '../../features/circleMembers/circleMembersSlice';

// components
import CirclesPagePresentational from './CirclesPagePresentational'
function CirclesPageContainer() {
    const circles = useSelector(state => state.circles.circles);
    const membersByCircle = useSelector(state => state.members.membersByCircle);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        circles.forEach(circle => {
            if (circle.id && !membersByCircle[circle.id]) {
                dispatch(fetchCircleMembers(circle.id));
            }
        });
    }, [circles, membersByCircle, dispatch]);

    const handleCardClick = (circle) => {
        dispatch(setSelectedCircle(circle));
        navigate(`/circles/${circle.id}`);
    };

    return (
        <>
            <CirclesPagePresentational
                circles={circles}
                membersByCircle={membersByCircle}
                handleCardClick={handleCardClick}
            />
        </>
    )
}

export default CirclesPageContainer
