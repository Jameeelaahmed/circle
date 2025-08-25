import VoiceMessagePlayer from "../../ui/VoiceMessagePlayer/VoiceMessagePlayer";
import { detectTextDirection, getTextDirectionClasses } from "../../../utils/textDirection.js";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useState, useRef } from "react";

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
    dir,
    handleMessageContextMenu
}) {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const isMe = currentUser && (msg.user.userId === currentUser.id);
    const radius = getMessageRadius({ messages, idx: originalIdx, isMe });
    const bubbleColor = isMe ? 'bg-main/30' : 'bg-main';

    // Check if this is the first message in a group from the same sender
    const prevItem = groupedMessages[idx - 1];
    const prevMessage = prevItem?.type === 'regular' ? prevItem.message :
        prevItem?.type === 'media_group' ? prevItem.messages[0] : null;
    const isFirstInGroup = !prevMessage || prevMessage.user.userId !== msg.user.userId;

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
    const [isLongPressed, setIsLongPressed] = useState(false);
    const longPressTimeout = useRef();
    const handleTouchStart = (e) => {
        longPressTimeout.current = setTimeout(() => {
            setIsLongPressed(true);
            let x, y;
            if (e.touches && e.touches.length > 0) {
                x = e.touches[0].clientX;
                y = e.touches[0].clientY;
            } else {
                x = e.clientX;
                y = e.clientY;
            }
            if (handleMessageContextMenu) {
                handleMessageContextMenu(e, msg, x, y);
            }
        }, 500); // 500ms for long press
    };
    const handleTouchEnd = () => {
        clearTimeout(longPressTimeout.current);
        setIsLongPressed(false);
    };
    const handleTouchCancel = () => {
        clearTimeout(longPressTimeout.current);
        setIsLongPressed(false);
    };

    // // Helper to open context menu at arrow position
    // const openMenuAtArrow = (e) => {
    //     // Get button position
    //     const rect = e.currentTarget.getBoundingClientRect();
    //     const x = rect.left + rect.width / 2;
    //     const y = rect.top + rect.height;

    //     // Use correct handler for device
    //     if (window.matchMedia("(pointer: coarse)").matches && handleMessageContextMenu) {
    //         // Mobile/touch
    //         handleMessageContextMenu(e, msg, x, y);
    //     } else if (onMessageContextMenu) {
    //         // Desktop
    //         onMessageContextMenu(e, msg, x, y);
    //     }
    // };

    return (
        <div
            data-message-id={msg.messageId || msg.id}
            data-sender-id={msg.user.userId}
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
                                onClick={() => scrollToMessage && scrollToMessage(msg.replyTo.messageId)}
                            >
                                <div className="flex flex-col min-w-0">
                                    <span className="font-semibold text-primary text-xs truncate max-w-[100px]">
                                        {(msg.replyTo.user.userId === msg.user.userId)
                                            ? (msg.user.userId === currentUser?.id)
                                                ? t('Replied to yourself')
                                                : `${t("Replied to")} ${msg.user.userName || 'User'}`
                                            : (msg.replyTo.userName || 'User')}
                                    </span>
                                    <span
                                        className={`text-xs text-text/80 truncate max-w-[140px] ${msg.replyTo.text ? getTextDirectionClasses(msg.replyTo.text) : ''}`}
                                        dir={msg.replyTo.text ? detectTextDirection(msg.replyTo.text) : 'ltr'}
                                    >
                                        {msg.replyTo.messageType === 'audio' ? t('Voice message') :
                                            msg.replyTo.messageType === 'image' ? t('Photo') :
                                                msg.replyTo.messageType === 'video' ? t('Video') :
                                                    msg.replyTo.text || t('Unsupported message')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="flex">
                        {/* Profile picture (only for other users and first in group) */}
                        {!isMe && (
                            <div className="ltr:mr-2 rtl:ml-2 self-start select-none">
                                {isFirstInGroup ? (
                                    <div
                                        className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-text cursor-pointer overflow-hidden select-none"
                                        onClick={() => navigate(`/profile/${msg.user.userId}`)}
                                        title={msg.user.userName}
                                        style={{ userSelect: "none" }}
                                    >
                                        {msg.senderPhotoUrl ? (
                                            <img
                                                src={msg.senderPhotoUrl}
                                                alt={msg.user.userName || "User"}
                                                className="w-full h-full object-cover rounded-full select-none"
                                                style={{ userSelect: "none" }}
                                                draggable={false}
                                            />
                                        ) : (
                                            <span className="select-none" style={{ userSelect: "none" }}>
                                                {msg.user.userName?.[0]?.toUpperCase() || 'U'}
                                            </span>
                                        )}
                                    </div>
                                ) : (
                                    // Spacer for alignment
                                    <div className="w-8 h-8 select-none" style={{ userSelect: "none" }} />
                                )}
                            </div>
                        )}
                        <div className="flex flex-col select-none" style={{ userSelect: "none" }}>
                            {/* Sender name (only for other users and first in group) */}
                            {!isMe && isFirstInGroup && (
                                <span
                                    className="text-xs font-semibold mb-1 text-accent truncate max-w-full cursor-pointer select-none"
                                    style={{ userSelect: "none" }}
                                    onClick={() => navigate(`/profile/${msg.user.userId}`)}
                                >
                                    {msg.user.userName || 'User'}
                                </span>
                            )}
                            <div
                                className={`${bubbleColor} ${radius} shadow-md px-4 py-2.5 flex flex-col relative z-0 max-w-full sm:max-w-lg break-words select-none ${isLongPressed ? "ring-2 ring-primary/60 bg-primary/10" : ""}`}
                                onContextMenu={e => onMessageContextMenu && onMessageContextMenu(e, msg)}
                                onTouchStart={handleTouchStart}
                                onTouchEnd={handleTouchEnd}
                                onTouchCancel={handleTouchCancel}
                                dir="auto"
                                style={{ userSelect: "none" }}
                            >
                                {/* Message content */}
                                {msg.messageType === 'audio' ? (
                                    <div className="select-none" style={{ userSelect: "none" }}>
                                        <VoiceMessagePlayer
                                            audioData={msg.audioUrl}
                                            isMe={isMe}
                                            duration={msg.duration}
                                        />
                                    </div>
                                ) : msg.messageType === 'image' ? (
                                    <div className="flex flex-col select-none" style={{ userSelect: "none" }}>
                                        <img
                                            src={msg.imageUrl}
                                            alt="Shared image"
                                            className="max-w-full max-h-80 rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity select-none"
                                            style={{ userSelect: "none" }}
                                            onClick={() => openImageSlider([msg], 0)}
                                            draggable={false}
                                        />
                                        {msg.fileName && (
                                            <span className="text-xs mt-1 opacity-75 select-none" style={{ userSelect: "none" }}>
                                                {msg.fileName}
                                            </span>
                                        )}
                                    </div>
                                ) : msg.messageType === 'video' ? (
                                    <div className="flex flex-col select-none" style={{ userSelect: "none" }}>
                                        <video
                                            src={msg.videoUrl}
                                            controls
                                            className="max-w-full max-h-80 rounded-lg select-none"
                                            style={{ userSelect: "none" }}
                                            preload="metadata"
                                            draggable={false}
                                        >
                                            Your browser does not support the video tag.
                                        </video>
                                        {msg.fileName && (
                                            <span className="text-xs mt-1 opacity-75 select-none" style={{ userSelect: "none" }}>
                                                {msg.fileName}
                                            </span>
                                        )}
                                    </div>
                                ) : msg.messageType === 'system' ? (
                                    <>
                                        {console.log("here")
                                        }
                                        <span className="text-xs text-accent font-semibold text-center w-full select-none" style={{ userSelect: "none" }}>
                                            {msg.text || t("System message")}
                                        </span>
                                    </>
                                ) : (
                                    <span className={`text-sm break-word text-text select-none`} style={{ userSelect: "none" }}>
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
