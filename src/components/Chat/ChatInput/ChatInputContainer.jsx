// libs
import { useEffect } from "react";
// hooks
import { useAutoDir } from "../../../hooks/useAutoDir";
import { useAuth } from "../../../hooks/useAuth";
import { useVoiceRecording } from "../../../hooks/chathooks/useVoiceRecording";
import { useMediaUpload } from "../../../hooks/chathooks/useMediaUpload";
import { useChatTypingIndicator } from "../../../hooks/chathooks/useChatTyping";
import { useMessageManager } from "../../../hooks/chathooks/useMessageManager";
import { useReplyEditMutualExclusion } from "../../../hooks/chathooks/useReplyEditMutualExclusion";
import { useMediaHandlers } from "../../../hooks/chathooks/useMediaHandlers";
import { useVoiceHandlers } from "../../../hooks/chathooks/useVoiceHandlers";
import { useMessageHandlers } from "../../../hooks/chathooks/useMessageHandlers";
import { usePollModal } from "../../../hooks/chathooks/usePollModal";
// components
import ChatInputPresentational from "./ChatInputPresentational";

function ChatInputContainer({
  circleId,
  replyTo,
  setReplyTo,
  editingMessage,
  setEditingMessage,
}) {
  const { dir, handleAutoDir } = useAutoDir();
  const { userId, userName, photoUrl } = useAuth();

  // Custom hooks
  const voiceRecording = useVoiceRecording();
  const mediaUpload = useMediaUpload();
  const typing = useChatTypingIndicator(circleId, userId, userName);
  const messageManager = useMessageManager(circleId, userId, userName, photoUrl);

  // Extracted hook implementations
  const pollModal = usePollModal();
  const mediaHandlers = useMediaHandlers(
    mediaUpload,
    circleId,
    userId,
    userName,
    replyTo,
    setReplyTo,
    messageManager,
  );
  const voiceHandlers = useVoiceHandlers(
    voiceRecording,
    circleId,
    userId,
    userName,
    replyTo,
    setReplyTo,
    messageManager,
  );
  const messageHandlers = useMessageHandlers(
    messageManager,
    typing,
    replyTo,
    setReplyTo,
    editingMessage,
    setEditingMessage,
    handleAutoDir,
  );

  // Handle reply/edit mutual exclusion
  useReplyEditMutualExclusion(
    replyTo,
    setReplyTo,
    editingMessage,
    setEditingMessage,
    messageManager,
  );

  // Effects
  useEffect(() => {
    messageManager.adjustHeight();
  }, [messageManager]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      typing.cleanup();
    };
  }, [typing]);
  return (
    <div className="flex max-w-full flex-col overflow-hidden px-2 py-2">
      {replyTo && (
        <div className="bg-primary/10 border-primary mb-2 flex max-w-full items-center gap-2 overflow-hidden rounded-lg border px-3 py-2">
          <div className="min-w-0 flex-1 overflow-hidden">
            <div className="max-w-[120px] truncate">
              <span className="text-primary truncate font-bold">
                {replyTo.senderName || "User"}
              </span>
            </div>
            <div className="max-w-[180px] truncate">
              <span className="text-secondary truncate">
                {replyTo.messageType === "audio"
                  ? "🎤 Voice message"
                  : replyTo.messageType === "image"
                    ? "📷 Photo"
                    : replyTo.messageType === "video"
                      ? "🎥 Video"
                      : replyTo.text}
              </span>
            </div>
          </div>
          <button
            className="bg-secondary hover:bg-main ml-2 flex-shrink-0 rounded px-2 py-1 text-xs text-white"
            onClick={() => setReplyTo(null)}
            type="button"
          >
            Cancel
          </button>
        </div>
      )}
      {editingMessage && (
        <div className="bg-accent/10 border-accent mb-2 flex max-w-full items-center gap-2 overflow-hidden rounded-lg border px-3 py-2">
          <div className="min-w-0 flex-1 overflow-hidden">
            <div className="max-w-[120px] truncate">
              <span className="text-accent truncate font-bold">
                Editing message
              </span>
            </div>
            <div className="max-w-[180px] truncate">
              <span className="text-secondary truncate">
                {editingMessage.text}
              </span>
            </div>
          </div>
          <button
            className="bg-secondary hover:bg-main ml-2 flex-shrink-0 rounded px-2 py-1 text-xs text-white"
            onClick={messageHandlers.handleCancelEdit}
            type="button"
          >
            Cancel
          </button>
        </div>
      )}
      <ChatInputPresentational
        pollModalRef={pollModal.pollModalRef}
        handleOpenPollModal={pollModal.handleOpenPollModal}
        handleClosePollModal={pollModal.handleClosePollModal}
        msgVal={messageManager.msgVal}
        handleSendMsg={messageHandlers.handleSendMsg}
        handleInput={messageHandlers.handleInput}
        handleKeyDown={messageHandlers.handleKeyDown}
        dir={dir}
        isEditing={!!editingMessage}
        hasText={messageManager.hasText || !!editingMessage}
        // Voice recording props
        isRecording={voiceRecording.isRecording}
        recordingTime={voiceRecording.recordingTime}
        audioStream={voiceRecording.audioStream}
        startRecording={voiceHandlers.startRecording}
        stopRecording={voiceHandlers.stopRecording}
        cancelRecording={voiceHandlers.cancelRecording}
        // Media upload props
        isUploading={mediaUpload.isUploading || voiceRecording.isUploading}
        uploadProgress={mediaUpload.uploadProgress}
        handleMediaUpload={mediaHandlers.handleMediaUpload}
        showMediaMenu={mediaUpload.showMediaMenu}
        setShowMediaMenu={mediaUpload.setShowMediaMenu}
        handleCameraCapture={mediaHandlers.handleCameraCapture}
        handleImageUpload={mediaHandlers.handleImageUpload}
        showCameraModal={mediaUpload.showCameraModal}
        closeCameraModal={mediaHandlers.closeCameraModal}
        handleCapturedPhoto={mediaHandlers.handleCapturedPhoto}
      />
    </div>
  );
}

export default ChatInputContainer;
