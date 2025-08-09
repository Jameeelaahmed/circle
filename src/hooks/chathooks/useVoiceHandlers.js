/**
 * Custom hook to handle voice recording operations
 * Manages voice recording lifecycle and audio message sending
 */
export function useVoiceHandlers(
    voiceRecording,
    circleId,
    userId,
    userName,
    replyTo,
    setReplyTo,
    messageManager
) {
    const handleVoiceRecordingComplete = async () => {
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
    };

    const startRecording = () => {
        voiceRecording.startRecording();
    };

    const stopRecording = () => {
        handleVoiceRecordingComplete();
    };

    const cancelRecording = () => {
        voiceRecording.cancelRecording();
    };

    return {
        startRecording,
        stopRecording,
        cancelRecording,
        handleVoiceRecordingComplete
    };
}
