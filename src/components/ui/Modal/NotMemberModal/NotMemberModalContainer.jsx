import NotMemberModalPresentational from "./NotMemberModalPresentational";
import { useJoinCircleRequest } from "../../../../hooks/useJoinCircleRequest";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../../../../hooks/useAuth";
import { getProfileData } from "../../../../features/userProfile/profileSlice";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

function NotMemberModalContainer({ onClose }) {
    const membersByCircle = useSelector(state => state.members.membersByCircle);
    const circles = useSelector(state => state.circles.circles);
    const selectedCircle = useSelector(state => state.circles.selectedCircle);
    const { user } = useAuth();
    const profile = useSelector(getProfileData);

    const { handleJoinRequest, pendingRequests, setPendingRequests } = useJoinCircleRequest({
        circles,
        membersByCircle,
        user,
        profile,
        onClose
    });

    useEffect(() => {
        async function fetchPendingRequests() {
            if (!user) {
                setPendingRequests([]);
                return;
            }
            const db = getFirestore();
            const q = query(
                collection(db, "circleRequests"),
                where("requesterId", "==", user.uid), // Correct field for join requests
                where("status", "==", "pending"),
                where("type", "==", "join-request")
            );
            const snapshot = await getDocs(q);
            const requests = snapshot.docs.map(doc => doc.data().circleId);
            setPendingRequests(requests);
        }
        fetchPendingRequests();
    }, [user, circles, setPendingRequests]);

    const isRequestPending = pendingRequests?.includes(selectedCircle?.id);

    return (
        <NotMemberModalPresentational
            handleJoinRequest={handleJoinRequest}
            isRequestPending={isRequestPending}
            onClose={onClose}
            circle={selectedCircle}
        />
    );
}

export default NotMemberModalContainer;
