import { detectTextDirection } from "../../../utils/textDirection.js";
import { renderMediaGrid } from "../../../utils/chatutils/mediaGridUtils.jsx";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

function MediaGroupMessage({
    item,
    currentUser,
    groupedMessages,
    idx,
    shouldShowDateSeparator,
    formatMessageDate,
    messageRefs,
    onMessageContextMenu,
    openImageSlider,
    dir,
}) {
    const firstMessage = item.messages[0];
    const isMe = currentUser && (firstMessage.user.userId === currentUser.id);
    const bubbleColor = isMe ? 'bg-main/30' : 'bg-main';

    // Check if this is the first message in a group from the same sender
    const prevItem = groupedMessages[idx - 1];
    const prevMessage =
        prevItem?.type === "regular"
            ? prevItem.message
            : prevItem?.type === "media_group"
                ? prevItem.messages[0]
                : null;
    const isFirstInGroup =
        !prevMessage || prevMessage.user.userId !== firstMessage.user.userId;

    // Check if we should show date separator
    const showDateSeparator = shouldShowDateSeparator(firstMessage, prevMessage);

    // Process reactions for the first message in the group
    const reactionCounts = {};
    if (Array.isArray(firstMessage.react)) {
        firstMessage.react.forEach((r) => {
            if (r.emoji) reactionCounts[r.emoji] = (reactionCounts[r.emoji] || 0) + 1;
        });
    }
    const hasReactions = Object.keys(reactionCounts).length > 0;

    // Detect direction for media messages - use overall chat direction or check for caption
    const messageDirection = firstMessage.text
        ? detectTextDirection(firstMessage.text)
        : dir === "rtl"
            ? "rtl"
            : "ltr";
    const isRTLMessage = messageDirection === "rtl";
    const navigate = useNavigate();
    const longPressTimeout = useRef(null);

    const handleTouchStart = (e) => {
        longPressTimeout.current = setTimeout(() => {
            e.preventDefault();
            if (onMessageContextMenu) {
                onMessageContextMenu(e, firstMessage);
            }
        }, 500);
    };

    const handleTouchEnd = () => {
        clearTimeout(longPressTimeout.current);
    };

    return (
        <div
            key={`group-${item.firstIndex}-${item.lastIndex}`}
            data-message-id={firstMessage.messageId || firstMessage.id}
            data-sender-id={firstMessage.user.userId}
            ref={(ref) => {
                if (ref && (firstMessage.messageId || firstMessage.id)) {
                    messageRefs.current[firstMessage.messageId || firstMessage.id] = ref;
                }
            }}
        >
            {/* Date Separator */}
            {showDateSeparator && (
                <div className="my-4 flex justify-center">
                    <div className="bg-main/60 rounded-full border border-text/10 px-4 py-2 backdrop-blur-sm">
                        <span className="text-xs font-medium text-text/80">
                            {formatMessageDate(firstMessage.timestamp)}
                        </span>
                    </div>
                </div>
            )}

            {/* Media Group Message */}
            <div className={`flex ${isMe ? "justify-end" : "justify-start"} group`}>
                {/* Avatar/Spacer for alignment */}
                {!isMe && (
                    <div className="ltr:mr-2 rtl:ml-2 self-start select-none" style={{ userSelect: "none" }}>
                        {isFirstInGroup ? (
                            <div
                                className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-text cursor-pointer overflow-hidden select-none"
                                onClick={() => navigate(`/profile/${firstMessage.user.userId}`)}
                                title={firstMessage.user.userName}
                                style={{ userSelect: "none" }}
                            >
                                {firstMessage.senderPhotoUrl ? (
                                    <img
                                        src={firstMessage.senderPhotoUrl}
                                        alt={firstMessage.user.userName || "User"}
                                        className="w-full h-full object-cover rounded-full select-none"
                                        style={{ userSelect: "none" }}
                                        draggable={false}
                                    />
                                ) : (
                                    <span className="select-none" style={{ userSelect: "none" }}>
                                        {firstMessage.user.userName?.[0]?.toUpperCase() || 'U'}
                                    </span>
                                )}
                            </div>
                        ) : (
                            <div className="w-8 h-8 select-none" style={{ userSelect: "none" }} />
                        )}
                    </div>
                )}
                <div className={`flex max-w-[85%] flex-col sm:max-w-lg ${isMe ? "items-end" : "items-start"} select-none`} style={{ userSelect: "none" }}>
                    {/* Sender name (only for other users and first in group) */}
                    {!isMe && isFirstInGroup && (
                        <span
                            className="text-accent mb-1 max-w-full truncate text-xs font-semibold cursor-pointer hover:underline select-none"
                            style={{ userSelect: "none" }}
                            onClick={() => navigate(`/profile/${firstMessage.user.userId}`)}
                            title={firstMessage.user.userName}
                        >
                            {firstMessage.user.userName || "User"}
                        </span>
                    )}
                    <div
                        className={`${bubbleColor} relative z-0 flex max-w-full flex-col rounded-2xl px-4 py-2.5 break-words shadow-md sm:max-w-lg select-none`}
                        onContextMenu={(e) =>
                            onMessageContextMenu && onMessageContextMenu(e, firstMessage)
                        }
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                        style={{ userSelect: "none" }}
                    >
                        {/* Media Grid */}
                        <div className="select-none" style={{ userSelect: "none" }}>
                            {renderMediaGrid(item.messages, openImageSlider)}
                        </div>
                        <div className="mt-1.5 flex items-end justify-between select-none" style={{ userSelect: "none" }}>
                            {/* Sent time */}
                            {firstMessage.sentTime && (
                                <div
                                    className={`text-secondary flex items-center gap-1 text-[10px] ${isRTLMessage ? "order-2 ml-2" : "order-1 mr-2"} select-none`}
                                    dir="ltr"
                                    style={{ userSelect: "none" }}
                                >
                                    <span className="select-none" style={{ userSelect: "none" }}>{firstMessage.sentTime}</span>
                                </div>
                            )}
                            {/* Message reactions */}
                            {hasReactions && (
                                <div
                                    className={`flex gap-1 ${isRTLMessage ? "order-1 justify-start" : "order-2 justify-end"} select-none`}
                                    style={{ userSelect: "none" }}
                                >
                                    {Object.entries(reactionCounts).map(([emoji, count]) => (
                                        <span
                                            key={emoji}
                                            className={`rounded-full px-1.5 py-0.5 text-xs ${isMe ? "bg-text/20" : "bg-secondary/10"} select-none`}
                                            style={{ userSelect: "none" }}
                                        >
                                            {emoji} {count}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MediaGroupMessage;
