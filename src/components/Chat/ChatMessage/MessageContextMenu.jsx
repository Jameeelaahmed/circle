import { useTranslation } from "react-i18next";
function MessageContextMenu({
    menu,
    menuDirection,
    currentUser,
    handleAction,
    handleReact,
    canEditMessage,
    open
}) {
    const { t } = useTranslation();
    const reactionEmojis = ['👍', '😂', '❤️', '🔥', '🙏'];

    if (!menu.visible || !menu.message) return null;

    return (
        <div
            className={`fixed z-50 w-56 backdrop-blur-2xl rounded-xl shadow-xl border border-text/10 
                flex flex-col text-sm select-none overflow-hidden
                text-text bg-main/40 ${menuDirection === 'down' ? 'animate-dropdown' : 'animate-dropup'}`}
            style={{ left: `${menu.x}px`, top: `${menu.y}px` }}
        >
            <button
                className="px-4 py-3 hover:bg-primary/30 ltr:text-left rtl:text-right transition-colors"
                onClick={() => handleAction('reply')}
            >
                {t("Reply")}
            </button>

            {/* Edit button - only for text messages within edit time limit */}
            {menu.message.user.userId === currentUser?.id &&
                (!menu.message.messageType || menu.message.messageType === 'text') &&
                canEditMessage && canEditMessage(menu.message) && (
                    <button
                        className="px-4 py-3 hover:bg-primary/30 ltr:text-left rtl:text-right transition-colors"
                        onClick={() => {
                            handleAction('edit', menu.message);
                        }}
                    >
                        {t("Edit")}
                    </button>
                )}

            {/* Download button - only for image messages */}
            {menu.message.messageType === 'image' && (
                <button
                    className="px-4 py-3 hover:bg-primary/30 ltr:text-left rtl:text-right transition-colors"
                    onClick={() => {
                        const link = document.createElement('a');
                        link.href = menu.message.imageUrl;
                        link.download = menu.message.fileName || `image-${Date.now()}.jpg`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }}
                >
                    {t("Download")}
                </button>
            )}

            {/* Info button - only for own messages */}
            {menu.message.user.userId === currentUser?.id && (
                <button
                    className="px-4 py-3 hover:bg-primary/30 ltr:text-left rtl:text-right transition-colors"
                    onClick={() => handleAction('info')}
                >
                    {t("Info")}
                </button>
            )}

            <button
                className="px-4 py-3 hover:bg-accent/20 ltr:text-left rtl:text-right text-accent transition-colors"
                onClick={() => {
                    handleAction('delete');
                    open(menu.message.id || menu.message.messageId);
                }}
            >
                {menu.message.user.userId === currentUser?.id ? t('Delete') : t('Delete for me')}
            </button>

            {/* Reactions */}
            <div className="flex gap-2 px-3 py-3 border-t border-text/10 justify-center">
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
