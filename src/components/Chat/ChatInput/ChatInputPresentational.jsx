import SendBtn from "../../ui/ReactBits/SendBtn/SendBtn"
import DeleteBtn from "../../ui/ReactBits/DeleteBtn/DeleteBtn"
import VoiceWaveform from "../../ui/VoiceWaveform/VoiceWaveform"
import CameraView from "../../ui/CameraView/CameraViewPresentational"
import CreatePollModalContainer from "../../ui/Modal/Poll/CreatePollModalContainer";
import Modal from "../../ui/Modal/Modal";
import { Mic, Paperclip, Camera, Image, BarChart3 } from "lucide-react"
import { useEffect, useRef } from "react"

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
    handleOpenPollModal
}) {
    const mediaMenuRef = useRef(null);

    // Close media menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (mediaMenuRef.current && !mediaMenuRef.current.contains(event.target)) {
                setShowMediaMenu(false);
            }
        }

        if (showMediaMenu) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
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
                        <div className="absolute inset-0 bg-main/95 backdrop-blur-sm rounded-4xl flex items-center justify-between px-4 z-50">
                            <VoiceWaveform
                                isRecording={isRecording}
                                recordingTime={recordingTime}
                                audioStream={audioStream}
                            />
                            <div className="flex items-center gap-3">
                                <DeleteBtn onDelete={cancelRecording} />
                                <button
                                    onClick={stopRecording}
                                    className="flex items-center justify-center w-12 h-12 bg-primary hover:bg-primary/80 rounded-full text-white transition-colors"
                                    title="Send recording"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )}

                    <form onSubmit={(e) => handleSendMsg(e)} className="flex items-center bg-main/10 shadow-main p-2 rounded-4xl">
                        <textarea
                            onInput={handleInput}
                            onKeyDown={handleKeyDown}
                            dir={dir}
                            ref={msgVal}
                            className="bg-inputsBg w-full p-5 rounded-4xl resize-none overflow-y-auto leading-6 ltr:mr-2 rtl:ml-2"
                            rows={1}
                            placeholder={isEditing ? "Edit your message..." : "Type a message..."}
                            disabled={isRecording}
                        />
                        {hasText || isEditing ? (
                            <button
                                type="submit"
                                className="flex items-center justify-center w-12 h-12 bg-primary hover:bg-primary/80 rounded-full text-white transition-colors"
                                title={isEditing ? "Save changes" : "Send message"}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                                </svg>
                            </button>
                        ) : (
                            <div className="flex items-center gap-2 relative" style={{ visibility: isRecording ? 'hidden' : 'visible' }}>
                                {/* Media Upload Button with Dropup Menu */}
                                <div className="relative" ref={mediaMenuRef}>
                                    {/* Dropup Menu - Context Menu Style */}
                                    {showMediaMenu && (
                                        <div className="absolute bottom-full mb-2 right-0 bg-main shadow-lg border border-primary/20 rounded-lg py-1 min-w-[140px] z-50">
                                            <button
                                                onClick={handleCameraCapture}
                                                className="w-full px-3 py-2 text-left hover:bg-primary/10 flex items-center gap-3 text-primary transition-colors"
                                                type="button"
                                            >
                                                <Camera size={16} />
                                                <span className="text-sm">Camera</span>
                                            </button>
                                            <button
                                                onClick={handleImageUpload}
                                                className="w-full px-3 py-2 text-left hover:bg-primary/10 flex items-center gap-3 text-primary transition-colors"
                                                type="button"
                                            >
                                                <Image size={16} />
                                                <span className="text-sm">Gallery</span>
                                            </button>
                                            <button
                                                onClick={handleOpenPollModal}
                                                className="w-full px-3 py-2 text-left hover:bg-primary/10 flex items-center gap-3 text-primary transition-colors"
                                                type="button"
                                            >
                                                <BarChart3 size={16} />
                                                <span className="text-sm">Poll</span>
                                            </button>
                                        </div>
                                    )}

                                    <button
                                        onClick={handleMediaUpload}
                                        className="flex items-center justify-center w-12 h-12 bg-secondary/10 hover:bg-secondary/20 text-secondary hover:text-main rounded-full transition-all duration-200 border border-secondary/20 hover:border-secondary/40"
                                        title="Upload media"
                                        type="button"
                                        disabled={isUploading}
                                    >
                                        {isUploading ? (
                                            uploadProgress.total > 1 ? (
                                                <div className="flex flex-col items-center">
                                                    <div className="w-5 h-5 border-2 border-secondary/30 border-t-secondary rounded-full animate-spin"></div>
                                                    <span className="text-[8px] mt-0.5 text-secondary/80">
                                                        {uploadProgress.current}/{uploadProgress.total}
                                                    </span>
                                                </div>
                                            ) : (
                                                <div className="w-5 h-5 border-2 border-secondary/30 border-t-secondary rounded-full animate-spin"></div>
                                            )
                                        ) : (
                                            <Paperclip size={20} />
                                        )}
                                    </button>
                                </div>

                                <button
                                    onClick={startRecording}
                                    className="flex items-center justify-center w-12 h-12 bg-secondary/10 hover:bg-secondary/20 text-secondary hover:text-main rounded-full transition-all duration-200 border border-secondary/20 hover:border-secondary/40"
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

            {/* Poll Modal - Outside the form to prevent interference */}
            <Modal ref={pollModalRef}>
                <CreatePollModalContainer onClose={handleClosePollModal} />
            </Modal>
        </div>
    )
}

export default ChatInputPresentational
