import { useEffect, useState } from "react";
import { getFirestore, collection, query, where, getDocs, doc, updateDoc, setDoc, getDoc } from "firebase/firestore";
import { useAuth } from "../../hooks/useAuth";
import CirclesRequistsPresentational from "./CirclesRequestsPresentational";
import { useDispatch } from "react-redux";
import { fetchUserProfile } from "../../features/userProfile/profileSlice"; // Import the action to fetch user profile

function CirclesRequistsContainer() {
    const { user } = useAuth();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchRequests() {
            if (!user) return;
            setLoading(true);
            const db = getFirestore();
            const q = query(
                collection(db, "circleRequests"),
                where("adminId", "==", user.uid),
                where("status", "==", "pending")
            );

            const snapshot = await getDocs(q);
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setRequests(data);
            setLoading(false);
        }
        fetchRequests();
    }, [user]);

    // Accept request
    async function handleAccept(requestId) {
        const db = getFirestore();
        const request = requests.find(r => r.id === requestId);
        if (!request) return;

        const memberData = {
            email: request.email,
            isAdmin: false,
            avatarPhoto: request.avatarPhoto,
            username: request.username,
        };

        await setDoc(
            doc(db, "circles", request.circleId, "members", request.userId),
            memberData
        );

        // Update request status
        const requestRef = doc(db, "circleRequests", requestId);
        await updateDoc(requestRef, { status: "accepted" });

        // Update joinedCircles for the requesting user
        const userRef = doc(db, "users", request.userId);
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

        setRequests(prev => prev.filter(req => req.id !== requestId));

        // After join request is accepted and Firestore is updated
        dispatch(fetchUserProfile(user.uid)); // Dispatch the action to fetch updated user profile
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
        />
    );
}

export default CirclesRequistsContainer;
