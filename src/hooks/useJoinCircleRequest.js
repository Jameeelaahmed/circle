import { getFirestore, collection, addDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";
import { toastStyles } from "../utils/toastStyles";
import { usePendingRequests } from '../contexts/PendingRequests';
export function useJoinCircleRequest({ circles, membersByCircle, user, profile, onClose, setSendingRequestId }) {
    const { pendingRequests, setPendingRequests } = usePendingRequests();

    async function handleJoinRequest(circleId, e) {
        if (e) e.stopPropagation();
        const db = getFirestore();
        const circle = circles.find(c => c.id === circleId);
        if (!circle || !user) return;
        setSendingRequestId(circleId);
        const members = membersByCircle[circle.id] || [];
        const ownerMember = members.find(member => member.isOwner);
        const circleOwnerId = ownerMember ? ownerMember.id : null;

        if (!circleOwnerId) return;

        const joinRequestQuery = query(
            collection(db, "circleRequests"),
            where("circleId", "==", circle.id),
            where("requesterId", "==", user.uid),
            where("status", "==", "pending"),
            where("type", "==", "join-request")
        );
        const joinRequestSnapshot = await getDocs(joinRequestQuery);
        if (!joinRequestSnapshot.empty) return;

        try {
            await addDoc(collection(db, "circleRequests"), {
                circleId: circle.id,
                type: "join-request",
                requesterId: user.uid,
                requesterUsername: profile.username,
                requesterEmail: profile.email,
                requesterPhotoUrl: profile.photoUrl,
                approverId: ownerMember.id,
                approverUsername: ownerMember.username,
                circleName: circle.circleName,
                message: `${profile.username} wants to join your circle "${circle.circleName}".`,
                status: "pending",
                createdAt: serverTimestamp()
            });
            setPendingRequests(prev => [...prev, circle.id]);
            if (onClose) onClose();
            toast.success("Request Sent successfully!", toastStyles);
        } catch (error) {
            console.error("Join request error:", error);
            alert("Failed to send join request.");
        } finally {
            setSendingRequestId(null);
        }
    }

    return { handleJoinRequest, pendingRequests, setPendingRequests };
}