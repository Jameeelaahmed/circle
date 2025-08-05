// Custom hook for handling message seen tracking with Intersection Observer
import { useEffect } from 'react';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';

export function useMessageSeen(circleId, userId, userName, messageRefs, messages) {
    useEffect(() => {

        async function markMessageAsSeen(messageId) {
            try {
                const messageRef = doc(db, "circles", circleId, "chat", messageId);
                const msgSnap = await getDoc(messageRef);

                if (msgSnap.exists()) {
                    const messageData = msgSnap.data();
                    const currentSeenBy = messageData.seenBy || [];

                    // Check if current user has already seen this message
                    const alreadySeen = currentSeenBy.some(seen => seen.userId === userId);

                    if (!alreadySeen) {
                        const newSeenBy = [...currentSeenBy, {
                            userId: userId,
                            userName: userName,
                            seenAt: new Date()
                        }];

                        await updateDoc(messageRef, {
                            seenBy: newSeenBy
                        });
                    }
                }
            } catch (error) {
                console.error('Error marking message as seen:', error);
            }
        }

        // Create intersection observer to detect when messages come into view
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const messageElement = entry.target;
                        const messageId = messageElement.getAttribute('data-message-id');
                        const senderId = messageElement.getAttribute('data-sender-id');

                        // Only mark as seen if it's not the current user's message
                        if (messageId && senderId && senderId !== userId) {
                            markMessageAsSeen(messageId);
                        }
                    }
                });
            },
            {
                root: null,                // Use viewport as root
                rootMargin: '0px',         // No margin
                threshold: 0.5             // Message is considered seen when 50% visible
            }
        );

        // Observe all message elements
        Object.values(messageRefs.current).forEach((messageElement) => {
            if (messageElement) {
                observer.observe(messageElement);
            }
        });

        // Cleanup: disconnect observer when component unmounts or dependencies change
        return () => {
            observer.disconnect();
        };
    }, [messages, userId, circleId, userName, messageRefs]);
}
