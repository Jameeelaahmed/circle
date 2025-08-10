function MessageContextMenu({
    menu,
    menuDirection,
    currentUser,
    handleAction,
    handleReact,
    canEditMessage,
    open
}) {
    const reactionEmojis = ['👍', '😂', '❤️', '🔥', '🙏'];

    if (!menu.visible || !menu.message) return null;

    return (
        <div
            className={`fixed z-50 w-56 backdrop-blur-2xl rounded-xl shadow-xl border border-white/10 
                flex flex-col text-sm select-none overflow-hidden
                text-white bg-main/40 ${menuDirection === 'down' ? 'animate-dropdown' : 'animate-dropup'}`}
            style={{ left: `${menu.x}px`, top: `${menu.y}px` }}
        >
            <button
                className="px-4 py-3 hover:bg-primary/30 text-left transition-colors"
                onClick={() => handleAction('reply')}
            >
                Reply
            </button>

            {/* Edit button - only for text messages within edit time limit */}
            {menu.message.senderId === currentUser?.id &&
                (!menu.message.messageType || menu.message.messageType === 'text') &&
                canEditMessage && canEditMessage(menu.message) && (
                    <button
                        className="px-4 py-3 hover:bg-primary/30 text-left transition-colors"
                        onClick={() => {
                            handleAction('edit', menu.message);
                        }}
                    >
                        Edit
                    </button>
                )}

            {/* Download button - only for image messages */}
            {menu.message.messageType === 'image' && (
                <button
                    className="px-4 py-3 hover:bg-primary/30 text-left transition-colors"
                    onClick={() => {
                        const link = document.createElement('a');
                        link.href = menu.message.imageUrl;
                        link.download = menu.message.fileName || `image-${Date.now()}.jpg`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }}
                >
                    Download
                </button>
            )}

            {/* Info button - only for own messages */}
            {menu.message.senderId === currentUser?.id && (
                <button
                    className="px-4 py-3 hover:bg-primary/30 text-left transition-colors"
                    onClick={() => handleAction('info')}
                >
                    Info
                </button>
            )}

            <button
                className="px-4 py-3 hover:bg-accent/20 text-left text-accent transition-colors"
                onClick={() => {
                    handleAction('delete');
                    open(menu.message.id || menu.message.messageId);
                }}
            >
                {menu.message.senderId === currentUser?.id ? 'Delete' : 'Delete for me'}
            </button>

            {/* Reactions */}
            <div className="flex gap-2 px-3 py-3 border-t border-white/10 justify-center">
                {reactionEmojis.map(emoji => {
                    const count = menu.message.react?.filter(r => r.emoji === emoji).length || 0;
                    return (
                        <button
                            key={emoji}
                            className={`text-xl w-8 h-8 flex items-center justify-center rounded-full transition-all
                                hover:bg-secondary/20 hover:scale-110 ${count ? 'bg-secondary/10' : ''}`}
                            onClick={() => handleReact(menu.message.id, emoji)}
                            title={`React with ${emoji}`}
                        >
                            {emoji}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default MessageContextMenu;
