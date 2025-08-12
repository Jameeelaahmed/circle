import SendBtn from "../../ui/ReactBits/SendBtn/SendBtn";
import DeleteBtn from "../../ui/ReactBits/DeleteBtn/DeleteBtn";
import VoiceWaveform from "../../ui/VoiceWaveform/VoiceWaveform";
import CameraView from "../../ui/CameraView/CameraViewPresentational";
import Modal from "../../ui/Modal/Modal";
import Skeleton from "@mui/material/Skeleton";
import { Mic, Paperclip, Camera, Image, BarChart3 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function ChatInputPresentational({
  msgVal,
  handleSendMsg,
  handleInput,
  handleKeyDown,
  dir,
  isEditing,
  hasText,
  isRecording,
  recordingTime,
  audioStream,
  startRecording,
  stopRecording,
  cancelRecording,
  isUploading,
  uploadProgress,
  handleMediaUpload,
  showMediaMenu,
  setShowMediaMenu,
  handleCameraCapture,
  handleImageUpload,
  showCameraModal,
  closeCameraModal,
  handleCapturedPhoto,
  pollModalRef,
  handleClosePollModal,
  handleOpenPollModal,
}) {
  const [currentUser, setCurrentUser] = useState(null);
  const mediaMenuRef = useRef(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Close media menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        mediaMenuRef.current &&
        !mediaMenuRef.current.contains(event.target)
      ) {
        setShowMediaMenu(false);
      }
    }

    if (showMediaMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [showMediaMenu, setShowMediaMenu]);

  return (
    <div className="relative">
      {/* Show Camera View when camera is active, otherwise show chat input */}
      {showCameraModal ? (
        <CameraView
          isOpen={showCameraModal}
          onClose={closeCameraModal}
          onCapture={handleCapturedPhoto}
        />
      ) : (
        <>
          {/* Recording Overlay - WhatsApp style with waveform */}
          {isRecording && (
            <div className="bg-main/95 absolute inset-0 z-50 flex items-center justify-between rounded-4xl px-4 backdrop-blur-sm">
              <VoiceWaveform
                isRecording={isRecording}
                recordingTime={recordingTime}
                audioStream={audioStream}
              />
              <div className="flex items-center gap-3">
                <DeleteBtn onDelete={cancelRecording} />
                <button
                  onClick={stopRecording}
                  className="bg-primary hover:bg-primary/80 flex h-12 w-12 items-center justify-center rounded-full text-white transition-colors"
                  title="Send recording"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          <form
            onSubmit={(e) => handleSendMsg(e)}
            className="bg-main/10 shadow-main flex items-center rounded-4xl p-2"
          >
            <textarea
              onInput={handleInput}
              onKeyDown={handleKeyDown}
              dir={dir}
              ref={msgVal}
              className="bg-inputsBg w-full resize-none overflow-y-auto rounded-4xl p-5 leading-6 ltr:mr-2 rtl:ml-2"
              rows={1}
              placeholder={
                isEditing ? "Edit your message..." : "Type a message..."
              }
              disabled={isRecording}
            />
            {hasText || isEditing ? (
              <button
                type="submit"
                className="bg-primary hover:bg-primary/80 flex h-12 w-12 items-center justify-center rounded-full text-white transition-colors"
                title={isEditing ? "Save changes" : "Send message"}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            ) : (
              <div
                className="relative flex items-center gap-2"
                style={{ visibility: isRecording ? "hidden" : "visible" }}
              >
                {/* Media Upload Button with Dropup Menu */}
                <div className="relative" ref={mediaMenuRef}>
                  {/* Dropup Menu - Context Menu Style */}
                  {showMediaMenu && (
                    <div
                      className="bg-main border-primary/20 fixed z-[9999] min-w-[140px] rounded-lg border py-1 shadow-lg"
                      style={{
                        bottom: "70px", // Position above the input area
                        right: "20px", // Align with the right side
                      }}
                    >
                      <button
                        onClick={handleCameraCapture}
                        className="hover:bg-primary/10 text-primary flex w-full items-center gap-3 px-3 py-2 text-left transition-colors"
                        type="button"
                      >
                        <Camera size={16} />
                        <span className="text-sm">Camera</span>
                      </button>
                      <button
                        onClick={handleImageUpload}
                        className="hover:bg-primary/10 text-primary flex w-full items-center gap-3 px-3 py-2 text-left transition-colors"
                        type="button"
                      >
                        <Image size={16} />
                        <span className="text-sm">Gallery</span>
                      </button>
                      <button
                        onClick={handleOpenPollModal}
                        className="hover:bg-primary/10 text-primary flex w-full items-center gap-3 px-3 py-2 text-left transition-colors"
                        type="button"
                      >
                        <BarChart3 size={16} />
                        <span className="text-sm">Poll</span>
                      </button>
                    </div>
                  )}

                  <button
                    onClick={handleMediaUpload}
                    className="bg-secondary/10 hover:bg-secondary/20 text-secondary hover:text-main border-secondary/20 hover:border-secondary/40 flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-200"
                    title="Upload media"
                    type="button"
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      uploadProgress.total > 1 ? (
                        <div className="flex flex-col items-center">
                          <Skeleton
                            sx={{ bgcolor: "var(--color-secondary)" }}
                            animation="wave"
                            variant="circular"
                            width={20}
                            height={20}
                          />
                          <span className="text-secondary/80 mt-0.5 text-[8px]">
                            {uploadProgress.current}/{uploadProgress.total}
                          </span>
                        </div>
                      ) : (
                        <Skeleton
                          sx={{ bgcolor: "var(--color-secondary)" }}
                          animation="wave"
                          variant="circular"
                          width={20}
                          height={20}
                        />
                      )
                    ) : (
                      <Paperclip size={20} />
                    )}
                  </button>
                </div>

                <button
                  onClick={startRecording}
                  className="bg-secondary/10 hover:bg-secondary/20 text-secondary hover:text-main border-secondary/20 hover:border-secondary/40 flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-200"
                  title="Record voice message"
                  type="button"
                >
                  <Mic size={20} />
                </button>
              </div>
            )}
          </form>
        </>
      )}
    </div>
  );
}

export default ChatInputPresentational;
