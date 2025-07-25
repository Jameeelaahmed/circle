import CirclesPagePresentational from './CirclesPagePresentational'
import { useSelector } from 'react-redux';
function CirclesPageContainer() {
    const circles = useSelector(state => state.circles.circles);
    console.log(circles);

    return (
        <>
            <CirclesPagePresentational
                circles={circles}
            />
        </>
    )
}

export default CirclesPageContainer
