// libs
import { useState, useEffect, useRef } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase-config";
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../hooks/useAuth';

// components
import ChatMessaagePresentational from "./ChatMessagePresentational";

// func
import { getMessageRadius } from "../../../utils/MessageBorderDir";
function ChatMessageContainer({ circleId }) {
    const messagesEndRef = useRef(null);
    const { userName, userId } = useAuth();
    const currentUser = { id: userId, username: userName };
    const { i18n } = useTranslation();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
        if (!circleId) return;
        setLoading(true);
        setError(null);
        const q = query(
            collection(db, "circles", circleId, "chat"),
            orderBy("timestamp")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setLoading(false);
        }, (err) => {
            setError(err.message);
            setLoading(false);
        });
        return unsubscribe;
    }, [circleId]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    return (
        <>
            {loading ? (
                <div className="text-center text-gray-400 py-4">Loading messages...</div>
            ) : error ? (
                <div className="text-center text-red-500 py-4">{error}</div>
            ) : (
                <div className="flex-1 min-h-0 overflow-y-auto flex flex-col">
                    <div className="flex-1 flex flex-col justify-end min-h-full">
                        <ChatMessaagePresentational
                            messages={messages}
                            messagesEndRef={messagesEndRef}
                            currentUser={currentUser}
                            getUserColor={getUserColor}
                            getMessageRadius={(args) => getMessageRadius({ ...args, dir })}
                            dir={dir}
                        />
                    </div>
                </div>
            )}
        </>
    );
}

export default ChatMessageContainer
