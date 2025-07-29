function ChatMessaagePresentational({ messages, currentUser, getUserColor, messagesEndRef, getMessageRadius }) {

    return (
        <div className="px-4 py-2 space-y-2">
            {messages.length === 0 && (
                <div className="text-center text-gray-400">No messages yet.</div>
            )}
            {messages.map((msg, idx) => {
                const isMe = currentUser && msg.userId === currentUser.id;
                const userColor = getUserColor(msg.userId || '');
                const radius = getMessageRadius({ messages, idx, isMe });
                return (
                    <div
                        key={msg.id || idx}
                        className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-xs sm:max-w-md px-4 py-2 shadow-md ${radius} ${isMe ? 'bg-primary text-white' : 'bg-main text-text'} flex flex-col`}
                        >
                            {!isMe && (
                                <span className={`text-xs font-bold mb-1 ${userColor}`}>{msg.username || 'User'}</span>
                            )}
                            <span className="text-sm break-words">{msg.text}</span>
                        </div>
                    </div>
                );
            })}
            <div ref={messagesEndRef} />
        </div>
    );
}

export default ChatMessaagePresentational
