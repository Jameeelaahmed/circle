// libs
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useEffect } from "react";

//func
import { fetchCircleById } from "../../features/circles/circlesSlice";

// components
import CirclePagePresentational from "./CirclePagePresentational"
function CirclePageContainer() {
    const { circleId } = useParams();
    const dispatch = useDispatch();
    const selectedCircle = useSelector((state) => state.circles.selectedCircle);
    useEffect(() => {
        if (!selectedCircle || selectedCircle.id !== circleId) {
            dispatch(fetchCircleById(circleId));
        }
    }, [circleId, dispatch, selectedCircle]);

    return (
        <CirclePagePresentational />
    )
}

export default CirclePageContainer
