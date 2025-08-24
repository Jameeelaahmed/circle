import VoiceMessagePlayer from "../../ui/VoiceMessagePlayer/VoiceMessagePlayer";
import { detectTextDirection, getTextDirectionClasses } from "../../../utils/textDirection.js";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useRef } from "react";

function SingleMessage({
    msg,
    originalIdx,
    currentUser,
    getMessageRadius,
    messages,
    groupedMessages,
    idx,
    shouldShowDateSeparator,
    formatMessageDate,
    messageRefs,
    scrollToMessage,
    onMessageContextMenu,
    openImageSlider,
    dir
}) {
    const navigate = useNavigate()
    const { t } = useTranslation();
    const isMe = currentUser && (msg.senderId === currentUser.id);
    const radius = getMessageRadius({ messages, idx: originalIdx, isMe });
    const bubbleColor = isMe ? 'bg-main/30' : 'bg-main';

    // Check if this is the first message in a group from the same sender
    const prevItem = groupedMessages[idx - 1];
    const prevMessage = prevItem?.type === 'regular' ? prevItem.message :
        prevItem?.type === 'media_group' ? prevItem.messages[0] : null;
    const isFirstInGroup = !prevMessage || prevMessage.senderId !== msg.senderId;

    // Check if we should show date separator
    const showDateSeparator = shouldShowDateSeparator(msg, prevMessage);

    // Process reactions
    const reactionCounts = {};
    if (Array.isArray(msg.react)) {
        msg.react.forEach(r => {
            if (r.emoji) reactionCounts[r.emoji] = (reactionCounts[r.emoji] || 0) + 1;
        });
    }
    const hasReactions = Object.keys(reactionCounts).length > 0;

    // Long press logic
    const longPressTimeout = useRef();
    const handleTouchStart = (e) => {
        longPressTimeout.current = setTimeout(() => {
            if (onMessageContextMenu) {
                onMessageContextMenu(e, msg);
            }
        }, 500); // 500ms for long press
    };
    const handleTouchEnd = () => {
        clearTimeout(longPressTimeout.current);
    };
    const handleTouchCancel = () => {
        clearTimeout(longPressTimeout.current);
    };

    return (
        <div
            data-message-id={msg.messageId || msg.id}
            data-sender-id={msg.senderId}
            ref={(ref) => {
                if (ref && (msg.messageId || msg.id)) {
                    messageRefs.current[msg.messageId || msg.id] = ref;
                }
            }}
        >
            {/* Date Separator */}
            {showDateSeparator && (
                <div className="flex justify-center my-4">
                    <div className="bg-main/30 backdrop-blur-sm px-4 py-2 rounded-full border border-text/10">
                        <span className="text-xs font-medium text-text/80">
                            {formatMessageDate(msg.timestamp)}
                        </span>
                    </div>
                </div>
            )}

            {/* Message */}
            <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} group`}>
                <div className={`max-w-[85%] sm:max-w-lg flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                    {msg.replyTo && (
                        <div className={`mb-1 flex items-center w-fit max-w-full z-10 relative ${isMe ? 'flex-row-reverse' : ''}`}>
                            <div className={`h-8 w-1 rounded-full bg-secondary/70 ${isMe ? 'ltr:ml-2 rtl:mr-2' : 'ltr:mr-2 rtl:ml-2'}`} />
                            <div
                                className="flex items-center px-2 py-1 rounded-2xl bg-black/30 border border-secondary/30 min-w-0 cursor-pointer hover:bg-black/40 transition-colors"
                                onClick={() => scrollToMessage && scrollToMessage(msg.replyTo.messageId || msg.replyTo.id)}
                            >
                                <div className="flex flex-col min-w-0">
                                    <span className="font-semibold text-primary text-xs truncate max-w-[100px]">
                                        {(msg.replyTo.senderId === msg.senderId)
                                            ? (msg.senderId === currentUser?.id)
                                                ? t('Replied to yourself')
                                                : `${t("Replied to")} ${msg.senderName || 'User'}`
                                            : (msg.replyTo.senderName || 'User')}
                                    </span>
                                    <span
                                        className={`text-xs text-text/80 truncate max-w-[140px] ${msg.replyTo.text ? getTextDirectionClasses(msg.replyTo.text) : ''}`}
                                        dir={msg.replyTo.text ? detectTextDirection(msg.replyTo.text) : 'ltr'}
                                    >
                                        {msg.replyTo.messageType === 'audio' ? t('Voice message') :
                                            msg.replyTo.messageType === 'image' ? t('Photo') :
                                                msg.replyTo.messageType === 'video' ? t('Video') :
                                                    msg.replyTo.text}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="flex">
                        {/* Profile picture (only for other users and first in group) */}
                        {!isMe && (
                            <div className="ltr:mr-2 rtl:ml-2 self-start">
                                {isFirstInGroup ? (
                                    <div
                                        className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-text cursor-pointer overflow-hidden"
                                        onClick={() => navigate(`/profile/${msg.senderId}`)}
                                        title={msg.senderName}
                                    >
                                        {msg.senderPhotoUrl ? (
                                            <img
                                                src={msg.senderPhotoUrl}
                                                alt={msg.senderName || "User"}
                                                className="w-full h-full object-cover rounded-full"
                                            />
                                        ) : (
                                            <span>
                                                {msg.senderName?.[0]?.toUpperCase() || 'U'}
                                            </span>
                                        )}
                                    </div>
                                ) : (
                                    // Spacer for alignment
                                    <div className="w-8 h-8" />
                                )}
                            </div>
                        )}
                        <div className="flex flex-col">
                            {/* Sender name (only for other users and first in group) */}
                            {!isMe && isFirstInGroup && (
                                <span className="text-xs font-semibold mb-1 text-accent truncate max-w-full cursor-pointer" onClick={() => navigate(`/profile/${msg.senderId}`)}>
                                    {msg.senderName || 'User'}
                                </span>
                            )}
                            <div
                                className={`${bubbleColor} ${radius} shadow-md px-4 py-2.5 flex flex-col relative z-0 max-w-full sm:max-w-lg break-words`}
                                onContextMenu={e => onMessageContextMenu && onMessageContextMenu(e, msg)}
                                onTouchStart={handleTouchStart}
                                onTouchEnd={handleTouchEnd}
                                onTouchCancel={handleTouchCancel}
                                dir="auto"
                                style={{ userSelect: "none" }}
                            >
                                {/* Message content */}
                                {msg.messageType === 'audio' ? (
                                    <VoiceMessagePlayer
                                        audioData={msg.audioUrl}
                                        isMe={isMe}
                                        duration={msg.duration}
                                    />
                                ) : msg.messageType === 'image' ? (
                                    <div className="flex flex-col">
                                        <img
                                            src={msg.imageUrl}
                                            alt="Shared image"
                                            className="max-w-full max-h-80 rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity"
                                            onClick={() => openImageSlider([msg], 0)}
                                        />
                                        {msg.fileName && (
                                            <span className="text-xs mt-1 opacity-75">{msg.fileName}</span>
                                        )}
                                    </div>
                                ) : msg.messageType === 'video' ? (
                                    <div className="flex flex-col">
                                        <video
                                            src={msg.videoUrl}
                                            controls
                                            className="max-w-full max-h-80 rounded-lg"
                                            preload="metadata"
                                        >
                                            Your browser does not support the video tag.
                                        </video>
                                        {msg.fileName && (
                                            <span className="text-xs mt-1 opacity-75">{msg.fileName}</span>
                                        )}
                                    </div>
                                ) : (
                                    <span className={`text-sm break-word text-text}`}>
                                        {msg.text}
                                    </span>
                                )}

                                {/* Timestamp and reactions section - applies to all message types */}
                                {(() => {
                                    // Detect direction for all message types
                                    const messageDirection = msg.text ? detectTextDirection(msg.text) : (dir === 'rtl' ? 'rtl' : 'ltr');
                                    const isRTLMessage = messageDirection === 'rtl';

                                    return (
                                        <div className={`flex items-end mt-1.5 justify-between`}>
                                            {/* Sent time and edited indicator - positioned based on message direction */}
                                            {msg.sentTime && (
                                                <div
                                                    className={`text-[10px] text-secondary flex items-center gap-1 ${isRTLMessage ? 'order-2 ml-2' : 'order-1 mr-2'}`}
                                                    dir="ltr"
                                                >
                                                    <span>{msg.sentTime}</span>
                                                    {msg.edited && (
                                                        <span className="text-[9px] opacity-70">{t("(edited)")}</span>
                                                    )}
                                                </div>
                                            )}

                                            {/* Message reactions - positioned opposite to timestamp */}
                                            {hasReactions && (
                                                <div className={`flex gap-1 ${isRTLMessage ? 'order-1 justify-start' : 'order-2 justify-end'}`}>
                                                    {Object.entries(reactionCounts).map(([emoji, count]) => (
                                                        <span
                                                            key={emoji}
                                                            className={`text-xs px-1.5 py-0.5 rounded-full ${isMe ? 'bg-text/20' : 'bg-secondary/10'}`}
                                                        >
                                                            {emoji} {count}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleMessage;
