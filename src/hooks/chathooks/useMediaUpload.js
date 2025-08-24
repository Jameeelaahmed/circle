import { useState } from 'react';
import { format } from 'date-fns';
import {
    uploadAndSendImage,
    uploadAndSendVideo,
    batchUploadImages
} from '../../utils/chatutils/cloudinaryUtils';

export function useMediaUpload() {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0 });
    const [showMediaMenu, setShowMediaMenu] = useState(false);
    const [showCameraModal, setShowCameraModal] = useState(false);

    const defaultFormatTime = () => format(new Date(), 'hh:mm a');

    const handleImageUpload = async (files, circleId, userId, userName, replyTo, formatTime = defaultFormatTime) => {
        if (!files || files.length === 0) return;

        try {
            setUploadProgress({ current: 0, total: files.length });
            setIsUploading(true);

            if (files.length === 1) {
                // Single image upload
                await uploadAndSendImage(
                    files[0],
                    circleId,
                    userId,
                    userName,
                    replyTo,
                    formatTime
                );
            } else {
                // Batch upload
                await batchUploadImages(
                    files,
                    circleId,
                    userId,
                    userName,
                    replyTo,
                    (current, total) => setUploadProgress({ current, total }),
                    formatTime
                );
            }

        } catch (error) {
            console.error('Error uploading images:', error);
            throw new Error('Failed to upload images. Please try again.');
        } finally {
            setUploadProgress({ current: 0, total: 0 });
            setIsUploading(false);
        }
    };

    const handleVideoUpload = async (file, circleId, userId, userName, replyTo, formatTime = defaultFormatTime) => {
        try {
            setIsUploading(true);

            await uploadAndSendVideo(
                file,
                circleId,
                userId,
                userName,
                replyTo,
                formatTime
            );

        } catch (error) {
            console.error('Error uploading video:', error);
            throw new Error('Failed to upload video. Please try again.');
        } finally {
            setIsUploading(false);
        }
    };

    const handleCameraCapture = () => {
        setShowMediaMenu(false);

        return new Promise((resolve, reject) => {
            // Check if device has camera support
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                setShowCameraModal(true);
                resolve({ type: 'modal' });
            } else {
                // Fallback to file input with capture
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*,video/*';
                input.capture = 'environment';

                input.onchange = (event) => {
                    const file = event.target.files[0];
                    if (file) {
                        resolve({ type: 'file', file });
                    } else {
                        reject(new Error('No file selected'));
                    }
                };

                input.click();
            }
        });
    };

    const handleCapturedPhoto = async (imageBlob, circleId, userId, userName, replyTo, formatTime = defaultFormatTime) => {
        setShowCameraModal(false);

        try {
            setIsUploading(true);

            // Convert blob to file
            const file = new File([imageBlob], `camera-${Date.now()}.jpg`, {
                type: 'image/jpeg',
                lastModified: Date.now()
            });

            await uploadAndSendImage(
                file,
                circleId,
                userId,
                userName,
                replyTo,
                formatTime
            );

        } catch (error) {
            console.error('Error uploading camera photo:', error);
            throw new Error('Failed to upload photo. Please try again.');
        } finally {
            setIsUploading(false);
        }
    };

    const openFileSelector = (accept = 'image/*', multiple = true) => {
        return new Promise((resolve, reject) => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = accept;
            input.multiple = multiple;

            input.onchange = (event) => {
                const files = Array.from(event.target.files);
                if (files.length > 0) {
                    resolve(files);
                } else {
                    reject(new Error('No files selected'));
                }
            };

            input.click();
        });
    };

    return {
        isUploading,
        uploadProgress,
        showMediaMenu,
        setShowMediaMenu,
        showCameraModal,
        setShowCameraModal,
        handleImageUpload,
        handleVideoUpload,
        handleCameraCapture,
        handleCapturedPhoto,
        openFileSelector
    };
}
