/**
 * Custom hook to handle all media-related operations (images, camera, photos)
 * Centralizes media upload logic and error handling
 */
export function useMediaHandlers(
    mediaUpload,
    circleId,
    userId,
    userName,
    replyTo,
    setReplyTo,
    messageManager
) {
    const handleImageUpload = async () => {
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
    };

    const handleCameraCapture = async () => {
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
    };

    const handleCapturedPhoto = async (imageBlob) => {
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
    };

    const handleMediaUpload = async () => {
        mediaUpload.setShowMediaMenu(!mediaUpload.showMediaMenu);
    };

    const closeCameraModal = () => {
        mediaUpload.setShowCameraModal(false);
    };

    const handleVideoUpload = async (event) => {
        // Open file picker for video
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "video/*";
        input.onchange = async (e) => {
            const file = e.target.files[0];
            if (!file) return;
            // Upload video using your mediaUpload logic
            const videoUrl = await mediaUpload.uploadFile(file, "video");
            // Send video message
            await messageManager.sendTextMessage("", {
                ...replyTo,
                messageType: "video",
                videoUrl,
            });
            setReplyTo(null);
        };
        input.click();
    };

    return {
        handleImageUpload,
        handleCameraCapture,
        handleCapturedPhoto,
        handleMediaUpload,
        closeCameraModal,
        handleVideoUpload,
    };
}
