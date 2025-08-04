// Message utility functions for chat functionality

// User color constants
export const USER_COLORS = [
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

export function getUserColor(userId) {
    let hash = 0;
    for (let i = 0; i < userId.length; i++) {
        hash = userId.charCodeAt(i) + ((hash << 5) - hash);
    }
    return USER_COLORS[Math.abs(hash) % USER_COLORS.length];
}

export function canEditMessage(message, userId) {
    if (message.senderId !== userId) {
        return false;
    }

    const messageTime = message.timestamp?.toDate() || new Date(message.timestamp);
    const now = new Date();
    const timeDifference = (now - messageTime) / 1000 / 60; // difference in minutes

    // Allow editing for 15 minutes (like WhatsApp)
    return timeDifference <= 15;
}

export function formatMessageDate(timestamp) {
    if (!timestamp) return '';

    const messageDate = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Reset time to compare dates only
    const messageDay = new Date(messageDate.getFullYear(), messageDate.getMonth(), messageDate.getDate());
    const todayDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const yesterdayDay = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate());

    if (messageDay.getTime() === todayDay.getTime()) {
        return 'Today';
    } else if (messageDay.getTime() === yesterdayDay.getTime()) {
        return 'Yesterday';
    } else {
        return messageDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
}

export function shouldShowDateSeparator(currentMsg, prevMsg) {
    if (!currentMsg.timestamp) return false;
    if (!prevMsg || !prevMsg.timestamp) return true;

    const currentDate = currentMsg.timestamp.toDate ? currentMsg.timestamp.toDate() : new Date(currentMsg.timestamp);
    const prevDate = prevMsg.timestamp.toDate ? prevMsg.timestamp.toDate() : new Date(prevMsg.timestamp);

    // Compare dates (ignoring time)
    const currentDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const prevDay = new Date(prevDate.getFullYear(), prevDate.getMonth(), prevDate.getDate());

    return currentDay.getTime() !== prevDay.getTime();
}

export function scrollToMessage(messageId, messageRefs) {
    if (messageRefs.current[messageId]) {
        messageRefs.current[messageId].scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });

        const messageElement = messageRefs.current[messageId];
        messageElement.style.transition = 'background-color 0.3s ease';
        messageElement.style.backgroundColor = 'rgba(59, 130, 246, 0.2)'; // Blue highlight

        setTimeout(() => {
            messageElement.style.backgroundColor = 'transparent';
        }, 1500);
    }
}


export function handleDownloadMedia(message) {
    if (!message.mediaData) return;

    const link = document.createElement('a');
    link.href = message.mediaData;
    link.download = message.fileName || `${message.messageType}-${Date.now()}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
