import { useEffect, useState } from "react";
import { getFirestore, collection, query, where, getDocs, doc, updateDoc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import { useAuth } from "../../hooks/useAuth";
import CirclesRequistsPresentational from "./CirclesRequestsPresentational";
import { useDispatch } from "react-redux";
import { fetchUserProfile } from "../../features/userProfile/profileSlice";

function CirclesRequistsContainer() {
    const { user } = useAuth();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const [requestType, setRequestType] = useState("join-request");

    useEffect(() => {
        async function fetchRequests() {
            if (!user) return;
            setLoading(true);
            const db = getFirestore();
            const q = query(
                collection(db, "circleRequests"),
                where(
                    requestType === "join-request" ? "approverId" : "invitedUserId",
                    "==",
                    user.uid
                ),
                where("status", "==", "pending"),
                where("type", "==", requestType)
            );

            const snapshot = await getDocs(q);
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setRequests(data);
            setLoading(false);
        }
        fetchRequests();
    }, [user, requestType]);

    // Accept request
    async function handleAccept(requestId) {
        const db = getFirestore();
        const request = requests.find(r => r.id === requestId);
        if (!request) return;

        let memberId, memberData;
        if (requestType === "join-request") {
            memberId = request.requesterId;
            memberData = {
                email: request.requesterEmail,
                isAdmin: false,
                isOwner: false,
                photoUrl: request.requesterPhotoUrl,
                username: request.requesterUsername,
            };
        } else {
            memberId = request.invitedUserId;
            memberData = {
                email: request.invitedUserEmail,
                isAdmin: false,
                isOwner: false,
                photoUrl: request.invitedUserPhotoUrl,
                username: request.invitedUserUsername,
            };
        }

        await setDoc(
            doc(db, "circles", request.circleId, "members", memberId),
            memberData
        );

        // Update request status
        const requestRef = doc(db, "circleRequests", requestId);
        await updateDoc(requestRef, { status: "accepted" });

        // Update joinedCircles for the user
        const userRef = doc(db, "users", memberId);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
            const userData = userSnap.data();
            const joinedCircles = userData.joinedCircles || [];
            if (!joinedCircles.includes(request.circleId)) {
                await updateDoc(userRef, {
                    joinedCircles: [...joinedCircles, request.circleId]
                });
            }
        }

        await deleteDoc(requestRef);


        setRequests(prev => prev.filter(req => req.id !== requestId));
        dispatch(fetchUserProfile(user.uid));
    }

    // Cancel request
    async function handleCancel(requestId) {
        const db = getFirestore();
        const requestRef = doc(db, "circleRequests", requestId);
        await updateDoc(requestRef, { status: "cancelled" });
        setRequests(prev => prev.filter(req => req.id !== requestId));
    }

    return (
        <CirclesRequistsPresentational
            requests={requests}
            loading={loading}
            onAccept={handleAccept}
            onCancel={handleCancel}
            requestType={requestType}
            setRequestType={setRequestType}
        />
    );
}

export default CirclesRequistsContainer;
