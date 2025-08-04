// libs
import { useEffect, useRef } from "react";
// hooks
import { useAutoDir } from "../../../hooks/useAutoDir";
import { useAuth } from '../../../hooks/useAuth';
import { useVoiceRecording } from '../../../hooks/chathooks/useVoiceRecording';
import { useMediaUpload } from '../../../hooks/chathooks/useMediaUpload';
import { useChatTypingIndicator } from '../../../hooks/chathooks/useChatTyping';
import { useMessageManager } from '../../../hooks/chathooks/useMessageManager';
// components
import ChatInputPresentational from "./ChatInputPresentational";

function ChatInputContainer({ circleId, replyTo, setReplyTo, editingMessage, setEditingMessage }) {
    const { dir, handleAutoDir } = useAutoDir();
    const { userName, userId } = useAuth();

    // Poll modal ref
    const pollModalRef = useRef();

    // Custom hooks
    const voiceRecording = useVoiceRecording();
    const mediaUpload = useMediaUpload();
    const typing = useChatTypingIndicator(circleId, userId, userName);
    const messageManager = useMessageManager(circleId, userId, userName);

    // Poll modal handlers
    function handleOpenPollModal() {
        pollModalRef.current.open();
    }

    function handleClosePollModal() {
        pollModalRef.current.close();
    }

    // Handlers
    async function handleSendMsg(e) {
        e.preventDefault();
        const value = messageManager.msgVal.current.value;
        if (!value.trim()) return;

        // Stop typing indicator when sending message
        typing.handleStopTyping();

        messageManager.clearInput();

        if (editingMessage) {
            try {
                const messageId = editingMessage.id || editingMessage.messageId;
                await messageManager.editMessage(messageId, value);
                setEditingMessage(null);
            } catch (err) {
                console.log("edit error", err.message);
            }
            return;
        }

        if (replyTo) setReplyTo(null);

        try {
            await messageManager.sendTextMessage(value, replyTo);
        } catch (err) {
            console.log("msg error", err.message);
        }
    }

    async function handleImageUpload() {
        mediaUpload.setShowMediaMenu(false);

        try {
            const files = await mediaUpload.openFileSelector('image/*', true);
            await mediaUpload.handleImageUpload(
                files,
                circleId,
                userId,
                userName,
                replyTo,
                messageManager.formatTime
            );

            if (replyTo) setReplyTo(null);
        } catch (error) {
            if (error.message !== 'No files selected') {
                alert(error.message);
            }
        }
    }

    async function handleCameraCapture() {
        try {
            const result = await mediaUpload.handleCameraCapture();

            if (result.type === 'file') {
                // Handle direct file from fallback input
                if (result.file.type.startsWith('image/')) {
                    await mediaUpload.handleImageUpload(
                        [result.file],
                        circleId,
                        userId,
                        userName,
                        replyTo,
                        messageManager.formatTime
                    );
                } else if (result.file.type.startsWith('video/')) {
                    await mediaUpload.handleVideoUpload(
                        result.file,
                        circleId,
                        userId,
                        userName,
                        replyTo,
                        messageManager.formatTime
                    );
                }

                if (replyTo) setReplyTo(null);
            }
        } catch (error) {
            alert(error.message);
        }
    }

    async function handleCapturedPhoto(imageBlob) {
        try {
            await mediaUpload.handleCapturedPhoto(
                imageBlob,
                circleId,
                userId,
                userName,
                replyTo,
                messageManager.formatTime
            );

            if (replyTo) setReplyTo(null);
        } catch (error) {
            alert(error.message);
        }
    }

    async function handleVoiceRecordingComplete() {
        try {
            const recordingData = await voiceRecording.stopRecording();
            if (recordingData && recordingData.audioBlob) {
                await voiceRecording.sendVoiceMessage(
                    recordingData.audioBlob,
                    recordingData.duration,
                    circleId,
                    userId,
                    userName,
                    replyTo,
                    messageManager.formatTime
                );

                if (replyTo) setReplyTo(null);
            }
        } catch (err) {
            console.error('Voice recording error:', err);
            alert('Failed to send voice message. Please try again.');
        }
    }

    function handleCancelEdit() {
        setEditingMessage(null);
        messageManager.clearInput();
    }

    function handleInput(e) {
        handleAutoDir(e.target.value);
        messageManager.handleInput(e);

        // Handle typing indicator
        if (e.target.value.trim().length > 0) {
            typing.handleStartTyping();
        } else {
            typing.handleStopTyping();
        }
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMsg(e);
        } else if (e.key === 'Escape' && editingMessage) {
            e.preventDefault();
            handleCancelEdit();
        }
    }

    // Handle media upload menu
    async function handleMediaUpload() {
        mediaUpload.setShowMediaMenu(!mediaUpload.showMediaMenu);
    }

    // Close camera modal
    function closeCameraModal() {
        mediaUpload.setShowCameraModal(false);
    }

    // Voice recording handlers
    function startRecording() {
        voiceRecording.startRecording();
    }

    function stopRecording() {
        handleVoiceRecordingComplete();
    }

    function cancelRecording() {
        voiceRecording.cancelRecording();
    }

    // Effects
    useEffect(() => {
        messageManager.adjustHeight();
    }, [messageManager]);

    // Populate input field when editing starts
    useEffect(() => {
        if (editingMessage) {
            messageManager.setInputValue(editingMessage.text);
            messageManager.msgVal.current?.focus();
            messageManager.msgVal.current?.select();
        }
    }, [editingMessage, messageManager]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            typing.cleanup();
        };
    }, [typing]);
    return (
        <div className="flex flex-col">
            {replyTo && (
                <div className="mb-2 px-3 py-2 rounded-lg border flex items-center gap-2 bg-primary/10 border-primary">
                    <div className="flex-1">
                        <span className="font-bold text-primary">{replyTo.senderName || 'User'}</span>
                        <span className="ml-2 text-secondary">
                            {replyTo.messageType === 'audio' ? '🎤 Voice message' :
                                replyTo.messageType === 'image' ? '📷 Photo' :
                                    replyTo.messageType === 'video' ? '🎥 Video' :
                                        replyTo.text}
                        </span>
                    </div>
                    <button
                        className="ml-2 px-2 py-1 rounded text-xs bg-secondary text-white hover:bg-main"
                        onClick={() => setReplyTo(null)}
                        type="button"
                    >Cancel</button>
                </div>
            )}
            {editingMessage && (
                <div className="mb-2 px-3 py-2 rounded-lg border flex items-center gap-2 bg-accent/10 border-accent">
                    <div className="flex-1">
                        <span className="font-bold text-accent">Editing message</span>
                        <span className="ml-2 text-secondary">{editingMessage.text}</span>
                    </div>
                    <button
                        className="ml-2 px-2 py-1 rounded text-xs bg-secondary text-white hover:bg-main"
                        onClick={handleCancelEdit}
                        type="button"
                    >Cancel</button>
                </div>
            )}
            <ChatInputPresentational
                pollModalRef={pollModalRef}
                handleOpenPollModal={handleOpenPollModal}
                handleClosePollModal={handleClosePollModal}
                msgVal={messageManager.msgVal}
                handleSendMsg={handleSendMsg}
                handleInput={handleInput}
                handleKeyDown={handleKeyDown}
                dir={dir}
                isEditing={!!editingMessage}
                hasText={messageManager.hasText || !!editingMessage}

                // Voice recording props
                isRecording={voiceRecording.isRecording}
                recordingTime={voiceRecording.recordingTime}
                audioStream={voiceRecording.audioStream}
                startRecording={startRecording}
                stopRecording={stopRecording}
                cancelRecording={cancelRecording}

                // Media upload props
                isUploading={mediaUpload.isUploading || voiceRecording.isUploading}
                uploadProgress={mediaUpload.uploadProgress}
                handleMediaUpload={handleMediaUpload}
                showMediaMenu={mediaUpload.showMediaMenu}
                setShowMediaMenu={mediaUpload.setShowMediaMenu}
                handleCameraCapture={handleCameraCapture}
                handleImageUpload={handleImageUpload}
                showCameraModal={mediaUpload.showCameraModal}
                closeCameraModal={closeCameraModal}
                handleCapturedPhoto={handleCapturedPhoto}
            />
        </div>
    );
}

export default ChatInputContainer
