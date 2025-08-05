// Custom hook for handling automatic scrolling to bottom when new messages arrive
import { useEffect, useRef } from 'react';
export function useAutoScroll(messages, messagesEndRef) {
    const prevMessagesRef = useRef([]);

    useEffect(() => {
        const prevMessages = prevMessagesRef.current;

        // Only scroll when new messages are added (not on initial load)
        if (
            messages.length > prevMessages.length &&
            messagesEndRef.current
        ) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }

        // Update the previous messages count for next comparison
        prevMessagesRef.current = messages;
    }, [messages, messagesEndRef]);
}
