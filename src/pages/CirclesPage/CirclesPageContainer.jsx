import CirclesPagePresentational from './CirclesPagePresentational'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { setSelectedCircle } from '../../features/circles/circlesSlice';
function CirclesPageContainer() {
    const circles = useSelector(state => state.circles.circles);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleCardClick = (circle) => {
        dispatch(setSelectedCircle(circle));
        navigate(`/circles/${circle.circleId}`);
    };
    return (
        <>
            <CirclesPagePresentational
                circles={circles}
                handleCardClick={handleCardClick}
            />
        </>
    )
}

export default CirclesPageContainer
