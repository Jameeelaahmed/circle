import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../firebase-config';
import MessageInfoModalPresentational from './MessageInfoModalPresentational';

function MessageInfoModalContainer({ message, circleId, onClose }) {
    const [seenUsers, setSeenUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMessageInfo = async () => {
            if (!message || !circleId) return;

            try {
                setLoading(true);

                // Get circle members to get user names
                const circleRef = doc(db, 'circles', circleId);
                const circleSnap = await getDoc(circleRef);

                let members = [];
                if (circleSnap.exists()) {
                    const circleData = circleSnap.data();
                    members = circleData.members || [];
                }

                // Get message seen info
                const seenBy = message.seenBy || [];

                const seenWithNames = seenBy.map(seenUser => {
                    // Try different possible member structures
                    const member = members.find(m =>
                        m.id === seenUser.userId ||
                        m.userId === seenUser.userId ||
                        m.uid === seenUser.userId
                    );
                    // Use member name first, then fallback to the userName stored in seenUser, then Unknown
                    const displayName = member?.name ||
                        member?.userName ||
                        member?.displayName ||
                        seenUser.userName ||
                        `User ${seenUser.userId.slice(-4)}`;

                    return {
                        ...seenUser,
                        name: displayName
                    };
                });

                setSeenUsers(seenWithNames);
            } catch (error) {
                console.error('Error fetching message info:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMessageInfo();
    }, [message, circleId]);

    const formatTime = (timestamp) => {
        if (!timestamp) return '';

        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    return (
        <MessageInfoModalPresentational
            onClose={onClose}
            message={message}
            formatTime={formatTime}
            seenUsers={seenUsers}
            loading={loading}
        />
    );
}

export default MessageInfoModalContainer;
