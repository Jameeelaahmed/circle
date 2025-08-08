import { useState, useCallback, useRef } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';

export function useChatTypingIndicator(circleId, userId, userName) {
    const [isTyping, setIsTyping] = useState(false);
    const typingTimeoutRef = useRef(null);
    const lastUpdateTimeRef = useRef(0);

    const updateTypingStatus = useCallback(async (typing) => {
        try {
            const typingDoc = doc(db, `circles/${circleId}/typing/status`);
            const currentStatus = {};

            if (typing) {
                currentStatus[userId] = {
                    userName,
                    timestamp: Date.now(),
                    isTyping: true
                };
            } else {
                currentStatus[userId] = {
                    userName,
                    timestamp: Date.now(),
                    isTyping: false
                };
            }
            await setDoc(typingDoc, currentStatus, { merge: true });
            lastUpdateTimeRef.current = Date.now();
        } catch (error) {
            console.error('Error updating typing status:', error);
        }
    }, [circleId, userId, userName]);

    const handleStartTyping = useCallback(() => {
        const now = Date.now();

        // Only update typing status if:
        // 1. Not currently typing, OR
        // 2. More than 2 seconds have passed since last update (to refresh the timestamp)
        if (!isTyping || (now - lastUpdateTimeRef.current > 2000)) {
            setIsTyping(true);
            updateTypingStatus(true);
        }

        // Clear existing timeout
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        // Set timeout to stop typing after 3 seconds of inactivity
        typingTimeoutRef.current = setTimeout(() => {
            setIsTyping(false);
            updateTypingStatus(false);
        }, 3000);
    }, [isTyping, updateTypingStatus]);

    const handleStopTyping = useCallback(() => {
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }
        if (isTyping) {
            setIsTyping(false);
            updateTypingStatus(false);
        }
    }, [isTyping, updateTypingStatus]);

    // Cleanup function
    const cleanup = useCallback(() => {
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }
        if (isTyping) {
            setIsTyping(false);
            updateTypingStatus(false);
        }
    }, [isTyping, updateTypingStatus]);

    return {
        isTyping,
        handleStartTyping,
        handleStopTyping,
        cleanup
    };
}
