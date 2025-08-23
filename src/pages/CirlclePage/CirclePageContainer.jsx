// libs
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useEffect } from "react";
//func
import { fetchCircleById } from "../../features/circles/circlesSlice";
import useAuth from "../../hooks/pollhooks/useAuth";
// components
import CirclePagePresentational from "./CirclePagePresentational"
function CirclePageContainer() {
    const { user } = useAuth();
    const { circleId } = useParams();
    const dispatch = useDispatch();
    const selectedCircle = useSelector((state) => state.circles.selectedCircle);
    useEffect(() => {
        if (!selectedCircle || selectedCircle.id !== circleId) {
            dispatch(fetchCircleById(circleId));
        }
    }, [circleId, dispatch, selectedCircle]);

    return (
        <CirclePagePresentational user={user} />
    )
}

export default CirclePageContainer
