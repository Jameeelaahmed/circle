import ModalHeading from '../ModalHeading/ModalHeading';

function MessageInfoModalPresentational({ onClose, message, formatTime, seenUsers, loading }) {
    return (
        <>
            <ModalHeading title="Message Info" onClose={onClose} />

            {/* Content */}
            <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
                {/* Message preview */}
                <div className="bg-primary/10 rounded-lg p-3">
                    <div className="text-xs text-white/60 mb-1">Your message</div>
                    <div className="text-sm text-white">
                        {message.messageType === 'audio' ? '🎤 Voice message' :
                            message.messageType === 'image' ? '📷 Photo' :
                                message.messageType === 'video' ? '🎥 Video' :
                                    message.text}
                    </div>
                    <div className="text-xs text-white/60 mt-1">
                        Sent {formatTime(message.timestamp)}
                    </div>
                </div>

                {/* Seen by section */}
                <div>
                    <div className="text-sm font-medium text-white/80 mb-2">
                        Seen by {seenUsers.length} {seenUsers.length === 1 ? 'person' : 'people'}
                    </div>

                    {loading ? (
                        <div className="text-center py-4">
                            <div className="text-white/60">Loading...</div>
                        </div>
                    ) : seenUsers.length === 0 ? (
                        <div className="text-center py-4">
                            <div className="text-white/60">No one has seen this message yet</div>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {seenUsers.map((user, index) => (
                                <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5">
                                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-white">
                                        {user.name[0]?.toUpperCase() || 'U'}
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-sm font-medium text-white">{user.name}</div>
                                        <div className="text-xs text-white/60">
                                            Seen {formatTime(user.seenAt)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default MessageInfoModalPresentational
