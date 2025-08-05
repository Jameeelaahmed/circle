import { detectTextDirection } from "../../../utils/textDirection.js";
import { renderMediaGrid } from "../../../utils/chatutils/mediaGridUtils.jsx";

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
    dir
}) {
    const firstMessage = item.messages[0];
    const isMe = currentUser && (firstMessage.senderId === currentUser.id);
    const bubbleColor = isMe ? 'bg-main/30' : 'bg-main';

    // Check if this is the first message in a group from the same sender
    const prevItem = groupedMessages[idx - 1];
    const prevMessage = prevItem?.type === 'regular' ? prevItem.message :
        prevItem?.type === 'media_group' ? prevItem.messages[0] : null;
    const isFirstInGroup = !prevMessage || prevMessage.senderId !== firstMessage.senderId;

    // Check if we should show date separator
    const showDateSeparator = shouldShowDateSeparator(firstMessage, prevMessage);

    // Process reactions for the first message in the group
    const reactionCounts = {};
    if (Array.isArray(firstMessage.react)) {
        firstMessage.react.forEach(r => {
            if (r.emoji) reactionCounts[r.emoji] = (reactionCounts[r.emoji] || 0) + 1;
        });
    }
    const hasReactions = Object.keys(reactionCounts).length > 0;

    // Detect direction for media messages - use overall chat direction or check for caption
    const messageDirection = firstMessage.text ? detectTextDirection(firstMessage.text) : (dir === 'rtl' ? 'rtl' : 'ltr');
    const isRTLMessage = messageDirection === 'rtl';

    return (
        <div
            key={`group-${item.firstIndex}-${item.lastIndex}`}
            data-message-id={firstMessage.messageId || firstMessage.id}
            data-sender-id={firstMessage.senderId}
            ref={(ref) => {
                if (ref && (firstMessage.messageId || firstMessage.id)) {
                    messageRefs.current[firstMessage.messageId || firstMessage.id] = ref;
                }
            }}
        >
            {/* Date Separator */}
            {showDateSeparator && (
                <div className="flex justify-center my-4">
                    <div className="bg-main/30 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                        <span className="text-xs font-medium text-white/80">
                            {formatMessageDate(firstMessage.timestamp)}
                        </span>
                    </div>
                </div>
            )}

            {/* Media Group Message */}
            <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} group`}>
                <div className={`max-w-[85%] sm:max-w-lg flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                    <div className="flex">
                        {/* Profile picture (only for other users and first in group) */}
                        {!isMe && isFirstInGroup && (
                            <div className="mr-2 self-start">
                                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-white">
                                    {firstMessage.senderName?.[0] || 'U'}
                                </div>
                            </div>
                        )}
                        {/* Spacer for non-first messages in group */}
                        {!isMe && !isFirstInGroup && (
                            <div className="mr-10">
                            </div>
                        )}
                        <div className="flex flex-col">
                            {/* Sender name (only for other users and first in group) */}
                            {!isMe && isFirstInGroup && (
                                <span className="text-xs font-semibold mb-1 text-accent truncate max-w-full">
                                    {firstMessage.senderName || 'User'}
                                </span>
                            )}
                            <div
                                className={`${bubbleColor} rounded-2xl shadow-md px-4 py-2.5 flex flex-col relative z-0 max-w-full sm:max-w-lg break-words`}
                                onContextMenu={e => onMessageContextMenu && onMessageContextMenu(e, firstMessage)}
                            >
                                {/* Media Grid */}
                                {renderMediaGrid(item.messages, openImageSlider)}

                                <div className="flex justify-between items-end mt-1.5">
                                    {/* Sent time */}
                                    {firstMessage.sentTime && (
                                        <div className={`text-[10px] text-secondary flex items-center gap-1 ${isRTLMessage ? 'order-2 ml-2' : 'order-1 mr-2'}`} dir="ltr">
                                            <span>{firstMessage.sentTime}</span>
                                        </div>
                                    )}

                                    {/* Message reactions */}
                                    {hasReactions && (
                                        <div className={`flex gap-1 ${isRTLMessage ? 'order-1 justify-start' : 'order-2 justify-end'}`}>
                                            {Object.entries(reactionCounts).map(([emoji, count]) => (
                                                <span
                                                    key={emoji}
                                                    className={`text-xs px-1.5 py-0.5 rounded-full ${isMe ? 'bg-white/20' : 'bg-secondary/10'}`}
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
            </div>
        </div>
    );
}

export default MediaGroupMessage;
