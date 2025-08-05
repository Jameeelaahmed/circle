import { useState, useCallback, useRef } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';

export function useChatTypingIndicator(circleId, userId, userName) {
    const [isTyping, setIsTyping] = useState(false);
    const typingTimeoutRef = useRef(null);

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
        } catch (error) {
            console.error('Error updating typing status:', error);
        }
    }, [circleId, userId, userName]);

    const handleStartTyping = useCallback(() => {
        if (!isTyping) {
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
        setIsTyping(false);
        updateTypingStatus(false);
    }, [updateTypingStatus]);

    // Cleanup function
    const cleanup = useCallback(() => {
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }
        setIsTyping(false);
        updateTypingStatus(false);
    }, [updateTypingStatus]);

    return {
        isTyping,
        handleStartTyping,
        handleStopTyping,
        cleanup
    };
}
