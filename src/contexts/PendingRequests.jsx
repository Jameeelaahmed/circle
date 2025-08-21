import { createContext, useContext, useEffect, useState } from "react";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

const PendingRequestsContext = createContext();

export function PendingRequestsProvider({ children }) {
    const [pendingRequests, setPendingRequests] = useState([]);
    return (
        <PendingRequestsContext.Provider value={{ pendingRequests, setPendingRequests }}>
            {children}
        </PendingRequestsContext.Provider>
    );
}

export function usePendingRequests() {
    return useContext(PendingRequestsContext);
}

export function useSyncPendingRequests(user) {
    const { setPendingRequests } = usePendingRequests();

    useEffect(() => {
        if (!user) return;
        const db = getFirestore();
        const fetchRequests = async () => {
            const q = query(
                collection(db, "circleRequests"),
                where("requesterId", "==", user.uid),
                where("status", "==", "pending"),
                where("type", "==", "join-request")
            );
            const snapshot = await getDocs(q);
            const ids = [];
            snapshot.forEach(doc => {
                ids.push(doc.data().circleId);
            });
            setPendingRequests(ids);
        };
        fetchRequests();
    }, [user, setPendingRequests]);
}