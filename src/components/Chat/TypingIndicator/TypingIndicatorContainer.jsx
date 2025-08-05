import { useState, useEffect } from 'react';
import TypingIndicatorPresentational from './TypingIndicatorPresentational';

function TypingIndicatorContainer({ typingUsers }) {
    const [dots, setDots] = useState('');

    // Animated dots effect
    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prev => {
                if (prev === '...') return '';
                return prev + '.';
            });
        }, 500);

        return () => clearInterval(interval);
    }, []);

    if (!typingUsers || typingUsers.length === 0) return null;

    const getTypingText = () => {
        if (typingUsers.length === 1) {
            return `${typingUsers[0].name} is typing${dots}`;
        } else if (typingUsers.length === 2) {
            return `${typingUsers[0].name} and ${typingUsers[1].name} are typing${dots}`;
        } else {
            return `${typingUsers[0].name} and ${typingUsers.length - 1} others are typing${dots}`;
        }
    };

    return (
        <TypingIndicatorPresentational getTypingText={getTypingText} />
    );
}

export default TypingIndicatorContainer;
