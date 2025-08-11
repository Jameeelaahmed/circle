import { useEffect, useState } from "react";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "../../hooks/useAuth";
import CirclesRequistsPresentational from "./CirclesRequestsPresentational";

function CirclesRequistsContainer() {
    const { user } = useAuth();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchRequests() {
            if (!user) return;
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

    return (
        <CirclesRequistsPresentational requests={requests} loading={loading} />
    );
}

export default CirclesRequistsContainer;
