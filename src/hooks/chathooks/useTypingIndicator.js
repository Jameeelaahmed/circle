// Custom hook for handling typing indicator functionality
import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase-config';

export function useTypingIndicator(circleId, userId) {
    const [typingUsers, setTypingUsers] = useState([]);

    useEffect(() => {
        if (!circleId) return;

        const typingRef = doc(db, "circles", circleId, "typing", "status");

        const unsubscribe = onSnapshot(typingRef, (snapshot) => {
            if (snapshot.exists()) {
                const typingData = snapshot.data();
                const now = Date.now();

                // Filter out expired typing indicators (older than 3 seconds) and current user
                const activeTypers = Object.entries(typingData)
                    .filter(([id, data]) => {
                        const isNotCurrentUser = id !== userId;
                        const hasTimestamp = data.timestamp;
                        const isTyping = data.isTyping;
                        const isRecent = hasTimestamp && (now - data.timestamp) < 3000;
                        return isNotCurrentUser && hasTimestamp && isTyping && isRecent;
                    })
                    .map(([id, data]) => ({
                        userId: id,
                        name: data.userName || 'User',
                        timestamp: data.timestamp
                    }));

                setTypingUsers(activeTypers);
            } else {
                setTypingUsers([]);
            }
        });

        return unsubscribe;
    }, [circleId, userId]);

    return { typingUsers };
}
