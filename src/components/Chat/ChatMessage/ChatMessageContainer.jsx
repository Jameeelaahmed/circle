// libs
import { useState } from "react";
import { useEffect, useRef } from 'react';

// components
import ChatMessaagePresentational from "./ChatMessagePresentational";

// func
import { getMessageRadius } from "../../../utils/MessageBorderDir";
import { useTranslation } from 'react-i18next';
function ChatMessageContainer({ messages }) {
    const messagesEndRef = useRef(null);
    const [currentUser] = useState({ id: 'u2', username: 'Bob' });
    const { i18n } = useTranslation();

    const userColors = [
        'text-primary',
        'text-secondary',
        'text-accent',
        'text-blue-400',
        'text-purple-400',
        'text-pink-400',
        'text-yellow-400',
        'text-green-400',
        'text-cyan-400',
    ];

    function getUserColor(userId) {
        let hash = 0;
        for (let i = 0; i < userId.length; i++) {
            hash = userId.charCodeAt(i) + ((hash << 5) - hash);
        }
        return userColors[Math.abs(hash) % userColors.length];
    }

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    return (
        <div className="flex-grow overflow-y-auto">
            <ChatMessaagePresentational
                messages={messages}
                messagesEndRef={messagesEndRef}
                currentUser={currentUser}
                getUserColor={getUserColor}
                getMessageRadius={(args) => getMessageRadius({ ...args, dir })}
                dir={dir}
            />
        </div>
    );
}

export default ChatMessageContainer
