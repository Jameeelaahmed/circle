import Modal from "../../ui/Modal/Modal";
import DeleteMessageModalContainer from "../../ui/Modal/DeleteModal/DeleteMessageModalContainer";
import VoiceMessagePlayer from "../../ui/VoiceMessagePlayer/VoiceMessagePlayer";
import { useState, useEffect } from "react";

function ChatMessagePresentational({
    handleReact,
    messages,
    currentUser,
    messagesEndRef,
    getMessageRadius,
    dir,
    onMessageContextMenu,
    handleAction,
    menu,
    menuDirection,
    open,
    close,
    deleteModalRefs,
    onDeleteMessage,
    formatMessageDate,
    shouldShowDateSeparator,
    messageRefs,
    scrollToMessage,
    canEditMessage
}) {
    const reactionEmojis = ['👍', '😂', '❤️', '🔥', '🙏'];
    const [imageSlider, setImageSlider] = useState({
        isOpen: false,
        images: [],
        currentIndex: 0
    });

    // Open image slider
    const openImageSlider = (images, startIndex = 0) => {
        setImageSlider({
            isOpen: true,
            images: images,
            currentIndex: startIndex
        });
    };

    // Close image slider
    const closeImageSlider = () => {
        setImageSlider({
            isOpen: false,
            images: [],
            currentIndex: 0
        });
    };

    // Navigate to next image
    const nextImage = () => {
        setImageSlider(prev => ({
            ...prev,
            currentIndex: (prev.currentIndex + 1) % prev.images.length
        }));
    };

    // Navigate to previous image
    const prevImage = () => {
        setImageSlider(prev => ({
            ...prev,
            currentIndex: prev.currentIndex === 0 ? prev.images.length - 1 : prev.currentIndex - 1
        }));
    };

    // Handle keyboard navigation for image slider
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (!imageSlider.isOpen) return;

            switch (e.key) {
                case 'Escape':
                    closeImageSlider();
                    break;
                case 'ArrowLeft':
                    prevImage();
                    break;
                case 'ArrowRight':
                    nextImage();
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [imageSlider.isOpen]);

    // Group consecutive media messages from the same sender
    const groupConsecutiveMedia = (messages) => {
        const grouped = [];
        let currentGroup = null;

        for (let i = 0; i < messages.length; i++) {
            const msg = messages[i];
            const prevMsg = messages[i - 1];

            // Check if this message should be grouped with the previous one
            const shouldGroup =
                msg.messageType === 'image' &&
                prevMsg &&
                prevMsg.messageType === 'image' &&
                msg.senderId === prevMsg.senderId &&
                Math.abs(new Date(msg.timestamp?.toDate() || msg.timestamp) -
                    new Date(prevMsg.timestamp?.toDate() || prevMsg.timestamp)) < 60000; // Within 1 minute

            if (shouldGroup && currentGroup) {
                // Add to current group
                currentGroup.messages.push(msg);
                currentGroup.lastIndex = i;
            } else if (msg.messageType === 'image') {
                // Start new group or single image
                currentGroup = {
                    type: 'media_group',
                    messages: [msg],
                    firstIndex: i,
                    lastIndex: i,
                    senderId: msg.senderId,
                    senderName: msg.senderName
                };
                grouped.push(currentGroup);
            } else {
                // Regular message
                grouped.push({ type: 'regular', message: msg, index: i });
                currentGroup = null;
            }
        }

        return grouped;
    };

    // Render media grid based on number of images
    const renderMediaGrid = (mediaMessages) => {
        const count = mediaMessages.length;

        if (count === 1) {
            const msg = mediaMessages[0];
            return (
                <div className="relative">
                    <img
                        src={msg.mediaData}
                        alt="Shared image"
                        className="max-w-full max-h-80 rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => openImageSlider(mediaMessages, 0)}
                    />
                </div>
            );
        } else if (count === 2) {
            return (
                <div className="grid grid-cols-2 gap-1 max-w-80">
                    {mediaMessages.map((msg, idx) => (
                        <img
                            key={msg.id || idx}
                            src={msg.mediaData}
                            alt="Shared image"
                            className="w-full h-40 rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => openImageSlider(mediaMessages, idx)}
                        />
                    ))}
                </div>
            );
        } else if (count === 3) {
            return (
                <div className="grid grid-cols-2 gap-1 max-w-80">
                    <img
                        src={mediaMessages[0].mediaData}
                        alt="Shared image"
                        className="w-full h-40 rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity row-span-2"
                        onClick={() => openImageSlider(mediaMessages, 0)}
                    />
                    <div className="grid grid-rows-2 gap-1">
                        {mediaMessages.slice(1).map((msg, idx) => (
                            <img
                                key={msg.id || idx}
                                src={msg.mediaData}
                                alt="Shared image"
                                className="w-full h-[calc(10rem-0.125rem)] rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity"
                                onClick={() => openImageSlider(mediaMessages, idx + 1)}
                            />
                        ))}
                    </div>
                </div>
            );
        } else if (count === 4) {
            return (
                <div className="grid grid-cols-2 gap-1 max-w-80">
                    {mediaMessages.map((msg, idx) => (
                        <img
                            key={msg.id || idx}
                            src={msg.mediaData}
                            alt="Shared image"
                            className="w-full h-40 rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => openImageSlider(mediaMessages, idx)}
                        />
                    ))}
                </div>
            );
        } else {
            // 5+ images: show first 4 in 2x2 grid with "+X more" overlay on 4th
            const remaining = count - 4;
            return (
                <div className="grid grid-cols-2 gap-1 max-w-80">
                    {/* First row */}
                    <img
                        src={mediaMessages[0].mediaData}
                        alt="Shared image"
                        className="w-full h-40 rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => openImageSlider(mediaMessages, 0)}
                    />
                    <img
                        src={mediaMessages[1].mediaData}
                        alt="Shared image"
                        className="w-full h-40 rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => openImageSlider(mediaMessages, 1)}
                    />

                    {/* Second row */}
                    <img
                        src={mediaMessages[2].mediaData}
                        alt="Shared image"
                        className="w-full h-40 rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => openImageSlider(mediaMessages, 2)}
                    />
                    <div className="relative">
                        <img
                            src={mediaMessages[3].mediaData}
                            alt="Shared image"
                            className="w-full h-40 rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => openImageSlider(mediaMessages, 3)}
                        />
                        <div className="absolute inset-0 bg-black/60 rounded-lg flex items-center justify-center cursor-pointer"
                            onClick={() => openImageSlider(mediaMessages, 3)}>
                            <span className="text-white font-bold text-lg">+{remaining}</span>
                        </div>
                    </div>
                </div>
            );
        }
    };

    const groupedMessages = groupConsecutiveMedia(messages);

    return (
        <div className="px-4 py-2 space-y-3 overflow-y-auto max-h-full relative" dir={dir}>
            {messages.length === 0 && (
                <div className="text-center py-8 text-gray-400">No messages yet. Start a conversation!</div>
            )}

            {groupedMessages.map((item, idx) => {
                // Handle media groups
                if (item.type === 'media_group') {
                    const firstMessage = item.messages[0];
                    const isMe = currentUser && (firstMessage.senderId === currentUser.id);
                    const bubbleColor = isMe ? 'bg-primary' : 'bg-main';

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
                                    <div className="bg-main/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
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
                                                {renderMediaGrid(item.messages)}

                                                <div className="flex justify-between items-end mt-1.5">
                                                    {/* Sent time */}
                                                    {firstMessage.sentTime && (
                                                        <div className={`text-[10px] ${isMe ? 'text-white/80' : 'text-secondary'} mr-2 flex items-center gap-1`}>
                                                            <span>{firstMessage.sentTime}</span>
                                                        </div>
                                                    )}

                                                    {/* Message reactions */}
                                                    {hasReactions && (
                                                        <div className={`flex gap-1 ${isMe ? 'justify-end' : 'justify-start'}`}>
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

                // Handle regular messages
                const msg = item.message;
                const originalIdx = item.index;
                const isMe = currentUser && (msg.senderId === currentUser.id);
                const radius = getMessageRadius({ messages, idx: originalIdx, isMe });
                const bubbleColor = isMe ? 'bg-primary' : 'bg-main';

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

                return (
                    <div
                        key={msg.messageId || msg.id || originalIdx}
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
                                <div className="bg-main/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                                    <span className="text-xs font-medium text-white/80">
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
                                        <div className={`h-8 w-1 rounded-full bg-secondary/70 ${isMe ? 'ml-2' : 'mr-2'}`} />
                                        <div
                                            className="flex items-center px-2 py-1 rounded-2xl bg-black/30 border border-secondary/30 min-w-0 cursor-pointer hover:bg-black/40 transition-colors"
                                            onClick={() => scrollToMessage && scrollToMessage(msg.replyTo.messageId || msg.replyTo.id)}
                                        >
                                            <div className="flex flex-col min-w-0">
                                                <span className="font-semibold text-primary text-xs truncate max-w-[100px]">
                                                    {(msg.replyTo.senderId === msg.senderId)
                                                        ? (msg.senderId === currentUser?.id)
                                                            ? 'Replied to yourself'
                                                            : `Replied to ${msg.senderName || 'User'}`
                                                        : (msg.replyTo.senderName || 'User')}
                                                </span>
                                                <span className="text-xs text-white/80 truncate max-w-[140px]">
                                                    {msg.replyTo.messageType === 'audio' ? '🎤 Voice message' :
                                                        msg.replyTo.messageType === 'image' ? '📷 Photo' :
                                                            msg.replyTo.messageType === 'video' ? '🎥 Video' :
                                                                msg.replyTo.text}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="flex">
                                    {/* Profile picture (only for other users and first in group) */}
                                    {!isMe && isFirstInGroup && (
                                        <div className="mr-2 self-start">
                                            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-white">
                                                {msg.senderName?.[0] || 'U'}
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
                                                {msg.senderName || 'User'}
                                            </span>
                                        )}
                                        <div
                                            className={`${bubbleColor} ${radius} shadow-md px-4 py-2.5 flex flex-col relative z-0 max-w-full sm:max-w-lg break-words`}
                                            onContextMenu={e => onMessageContextMenu && onMessageContextMenu(e, msg)}
                                        >
                                            {/* Message content */}
                                            {msg.messageType === 'audio' ? (
                                                <VoiceMessagePlayer
                                                    audioData={msg.audioUrl || msg.mediaData}
                                                    isMe={isMe}
                                                    duration={msg.duration}
                                                />
                                            ) : msg.messageType === 'image' ? (
                                                <div className="flex flex-col">
                                                    <img
                                                        src={msg.mediaData}
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
                                                        src={msg.mediaData}
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
                                                <span className="text-sm break-words">{msg.text}</span>
                                            )}                                            <div className="flex justify-between items-end mt-1.5">
                                                {/* Sent time and edited indicator */}
                                                {msg.sentTime && (
                                                    <div className={`text-[10px] ${isMe ? 'text-white/80' : 'text-secondary'} mr-2 flex items-center gap-1`}>
                                                        <span>{msg.sentTime}</span>
                                                        {msg.edited && (
                                                            <span className="text-[9px] opacity-70">(edited)</span>
                                                        )}
                                                    </div>
                                                )}

                                                {/* Message reactions */}
                                                {hasReactions && (
                                                    <div className={`flex gap-1 ${isMe ? 'justify-end' : 'justify-start'}`}>
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
            })}

            {/* Context Menu */}
            {menu.visible && menu.message && (
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
                                link.href = menu.message.mediaData;
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
            )}

            {/* Delete Message Modals - One for each message */}
            {deleteModalRefs?.current && messages.map((msg) => (
                <Modal
                    key={`modal-${msg.id}`}
                    ref={(ref) => {
                        if (ref && msg.id) {
                            deleteModalRefs.current[msg.id] = ref;
                        }
                    }}
                >
                    <DeleteMessageModalContainer
                        close={() => close && close(msg.id)}
                        message={msg}
                        currentUser={currentUser}
                        onDelete={onDeleteMessage}
                    />
                </Modal>
            ))}

            {/* Image Slider Modal */}
            {imageSlider.isOpen && (
                <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
                    {/* Close button */}
                    <button
                        className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 z-60 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                        onClick={closeImageSlider}
                    >
                        ×
                    </button>

                    {/* Download button */}
                    <button
                        className="absolute top-4 right-16 text-white text-lg hover:text-gray-300 z-60 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                        onClick={() => {
                            const currentImage = imageSlider.images[imageSlider.currentIndex];
                            const link = document.createElement('a');
                            link.href = currentImage.mediaData;
                            link.download = currentImage.fileName || `image-${imageSlider.currentIndex + 1}.jpg`;
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                        }}
                        title="Download image"
                    >
                        ⬇
                    </button>

                    {/* Image counter */}
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white bg-black/50 px-3 py-1 rounded-full text-sm">
                        {imageSlider.currentIndex + 1} / {imageSlider.images.length}
                    </div>

                    {/* Previous button */}
                    {imageSlider.images.length > 1 && (
                        <button
                            className="absolute left-4 text-white text-4xl hover:text-gray-300 z-60 w-12 h-12 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                            onClick={prevImage}
                        >
                            ‹
                        </button>
                    )}

                    {/* Current image container with proper sizing */}
                    <div className="flex items-center justify-center w-full h-full p-4">
                        <div className="relative max-w-[90vw] max-h-[80vh] flex items-center justify-center">
                            <img
                                src={imageSlider.images[imageSlider.currentIndex]?.mediaData}
                                alt="Full size image"
                                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                                style={{
                                    maxWidth: '90vw',
                                    maxHeight: '80vh',
                                    width: 'auto',
                                    height: 'auto'
                                }}
                            />
                        </div>
                    </div>

                    {/* Next button */}
                    {imageSlider.images.length > 1 && (
                        <button
                            className="absolute right-4 text-white text-4xl hover:text-gray-300 z-60 w-12 h-12 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                            onClick={nextImage}
                        >
                            ›
                        </button>
                    )}

                    {/* Image thumbnails */}
                    {imageSlider.images.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto p-2 bg-black/30 rounded-lg backdrop-blur-sm">
                            {imageSlider.images.map((img, idx) => (
                                <img
                                    key={img.id || idx}
                                    src={img.mediaData}
                                    alt={`Thumbnail ${idx + 1}`}
                                    className={`w-16 h-16 object-cover rounded cursor-pointer border-2 hover:border-gray-300 transition-colors ${idx === imageSlider.currentIndex ? 'border-white' : 'border-transparent'
                                        }`}
                                    onClick={() => setImageSlider(prev => ({ ...prev, currentIndex: idx }))}
                                />
                            ))}
                        </div>
                    )}

                    {/* Click outside to close */}
                    <div
                        className="absolute inset-0 -z-10"
                        onClick={closeImageSlider}
                    />
                </div>
            )}

            <div ref={messagesEndRef} />
        </div>
    );
}

export default ChatMessagePresentational;