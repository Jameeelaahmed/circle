import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase-config";
import cloudinaryService from "../../services/cloudinaryService";

/**
 * Upload and send image message using Cloudinary
 * @param {File} file - Image file to upload
 * @param {string} circleId - Circle ID
 * @param {string} userId - User ID  
 * @param {string} userName - User name
 * @param {Object} replyTo - Reply to message object
 * @param {Function} onProgress - Progress callback
 * @param {Function} formatTime - Time formatting function
 * @returns {Promise<Object>} Upload result
 */
export async function uploadAndSendImage(file, circleId, userId, userName, replyTo, onProgress, formatTime) {
    try {
        // Upload to Cloudinary
        const uploadResult = await cloudinaryService.uploadImage(file, onProgress, {
            folder: `circles/${circleId}/images`,
            tags: ['chat', 'image', circleId]
        });

        // Send message to Firestore
        const messageData = {
            messageType: "image",
            senderId: userId,
            senderName: userName,
            sentTime: formatTime(),
            imageUrl: uploadResult.secure_url,
            mediaData: uploadResult.secure_url, // Add for compatibility with UI
            publicId: uploadResult.public_id,
            fileName: file.name,
            fileSize: file.size,
            width: uploadResult.width,
            height: uploadResult.height,
            mimeType: file.type,
            timestamp: serverTimestamp(),
            replyTo: replyTo ? {
                id: replyTo.id,
                messageId: replyTo.messageId || replyTo.id,
                senderId: replyTo.senderId,
                senderName: replyTo.senderName,
                text: replyTo.text,
                messageType: replyTo.messageType,
            } : null,
        };

        const docRef = await addDoc(collection(db, "circles", circleId, "chat"), messageData);

        return {
            messageId: docRef.id,
            uploadResult,
            ...messageData
        };
    } catch (error) {
        console.error('Error uploading and sending image:', error);
        throw error;
    }
}

/**
 * Upload and send audio message using Cloudinary
 * @param {Blob} audioBlob - Audio blob to upload
 * @param {number} duration - Recording duration in seconds
 * @param {string} circleId - Circle ID
 * @param {string} userId - User ID
 * @param {string} userName - User name
 * @param {Object} replyTo - Reply to message object
 * @param {Function} onProgress - Progress callback
 * @param {Function} formatTime - Time formatting function
 * @returns {Promise<Object>} Upload result
 */
export async function uploadAndSendAudio(audioBlob, duration, circleId, userId, userName, replyTo, onProgress, formatTime) {
    try {
        // Upload to Cloudinary
        const uploadResult = await cloudinaryService.uploadAudio(audioBlob, onProgress, {
            folder: `circles/${circleId}/audio`,
            tags: ['chat', 'voice', 'audio', circleId]
        });

        // Send message to Firestore
        const messageData = {
            messageType: "audio",
            senderId: userId,
            senderName: userName,
            sentTime: formatTime(),
            audioUrl: uploadResult.secure_url,
            audioData: uploadResult.secure_url, // For VoiceMessagePlayer compatibility
            mediaData: uploadResult.secure_url, // Add for compatibility with UI
            publicId: uploadResult.public_id,
            duration: Math.round(duration),
            fileSize: audioBlob.size,
            mimeType: uploadResult.format ? `audio/${uploadResult.format}` : 'audio/webm',
            timestamp: serverTimestamp(),
            replyTo: replyTo ? {
                id: replyTo.id || replyTo.messageId,
                messageId: replyTo.messageId || replyTo.id,
                senderId: replyTo.senderId,
                senderName: replyTo.senderName,
                text: replyTo.text || '',
                messageType: replyTo.messageType || 'text',
            } : null,
        };

        console.log('Sending audio message to Firestore:', messageData);
        const docRef = await addDoc(collection(db, "circles", circleId, "chat"), messageData);
        console.log('Audio message sent successfully with ID:', docRef.id);

        return {
            messageId: docRef.id,
            uploadResult,
            ...messageData
        };
    } catch (error) {
        console.error('Error uploading and sending audio:', error);
        throw error;
    }
}

/**
 * Upload and send video message using Cloudinary
 * @param {File} file - Video file to upload
 * @param {string} circleId - Circle ID
 * @param {string} userId - User ID
 * @param {string} userName - User name
 * @param {Object} replyTo - Reply to message object
 * @param {Function} onProgress - Progress callback
 * @param {Function} formatTime - Time formatting function
 * @returns {Promise<Object>} Upload result
 */
export async function uploadAndSendVideo(file, circleId, userId, userName, replyTo, onProgress, formatTime) {
    try {
        // Upload to Cloudinary
        const uploadResult = await cloudinaryService.uploadVideo(file, onProgress, {
            folder: `circles/${circleId}/videos`,
            tags: ['chat', 'video', circleId]
        });

        // Send message to Firestore
        const messageData = {
            messageType: "video",
            senderId: userId,
            senderName: userName,
            sentTime: formatTime(),
            videoUrl: uploadResult.secure_url,
            mediaData: uploadResult.secure_url, // Add for compatibility with UI
            publicId: uploadResult.public_id,
            fileName: file.name,
            fileSize: file.size,
            duration: uploadResult.duration,
            width: uploadResult.width,
            height: uploadResult.height,
            mimeType: file.type,
            timestamp: serverTimestamp(),
            replyTo: replyTo ? {
                id: replyTo.id,
                messageId: replyTo.messageId || replyTo.id,
                senderId: replyTo.senderId,
                senderName: replyTo.senderName,
                text: replyTo.text,
                messageType: replyTo.messageType,
            } : null,
        };

        const docRef = await addDoc(collection(db, "circles", circleId, "chat"), messageData);

        return {
            messageId: docRef.id,
            uploadResult,
            ...messageData
        };
    } catch (error) {
        console.error('Error uploading and sending video:', error);
        throw error;
    }
}

/**
 * Batch upload images using Cloudinary
 * @param {File[]} files - Array of image files
 * @param {string} circleId - Circle ID
 * @param {string} userId - User ID
 * @param {string} userName - User name
 * @param {Object} replyTo - Reply to message object
 * @param {Function} onProgress - Progress callback (current, total)
 * @param {Function} formatTime - Time formatting function
 * @returns {Promise<Object[]>} Array of upload results
 */
export async function batchUploadImages(files, circleId, userId, userName, replyTo, onProgress, formatTime) {
    try {
        const results = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            // Update overall progress
            if (onProgress) {
                onProgress(i + 1, files.length);
            }

            // Upload individual file
            const result = await uploadAndSendImage(
                file,
                circleId,
                userId,
                userName,
                i === 0 ? replyTo : null, // Only apply reply to first image
                null, // No individual progress for batch
                formatTime
            );

            results.push(result);
        }

        return results;
    } catch (error) {
        console.error('Error batch uploading images:', error);
        throw error;
    }
}

/**
 * Get optimized image URL with transformations
 * @param {string} publicId - Cloudinary public ID
 * @param {Object} options - Transformation options
 * @returns {string} Optimized image URL
 */
export function getOptimizedImageUrl(publicId, options = {}) {
    const {
        width = 'auto',
        height = 'auto',
        quality = 'auto',
        crop = 'fill',
        format = 'auto'
    } = options;

    const transformations = {
        w: width,
        h: height,
        q: quality,
        c: crop,
        f: format
    };

    return getCloudinaryUrl(publicId, transformations);
}

/**
 * Get thumbnail URL for images
 * @param {string} publicId - Cloudinary public ID
 * @param {number} size - Thumbnail size (default 150)
 * @returns {string} Thumbnail URL
 */
export function getThumbnailUrl(publicId, size = 150) {
    return getOptimizedImageUrl(publicId, {
        width: size,
        height: size,
        crop: 'thumb',
        quality: 'auto'
    });
}

/**
 * Get preview URL for videos
 * @param {string} publicId - Cloudinary public ID
 * @returns {string} Video thumbnail URL
 */
export function getVideoThumbnailUrl(publicId) {
    const baseUrl = `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}`;
    return `${baseUrl}/video/upload/so_0,w_300,h_200,c_fill,q_auto,f_jpg/${publicId}.jpg`;
}

// Re-export cloudinary config for URL generation
import CLOUDINARY_CONFIG, { getCloudinaryUrl } from '../../config/cloudinary.js';
