import CLOUDINARY_CONFIG from '../config/cloudinary.js';

class CloudinaryService {
    constructor() {
        // Configure Cloudinary for client-side unsigned uploads
        this.cloudName = CLOUDINARY_CONFIG.cloudName;
        this.uploadPreset = CLOUDINARY_CONFIG.uploadPreset;

        // Validate required configuration
        if (!this.cloudName || !this.uploadPreset) {
            throw new Error('Cloudinary configuration missing. Please ensure cloudName and uploadPreset are configured.');
        }
    }

    /**
     * Upload file to Cloudinary using unsigned upload
     * @param {File|Blob} file - The file to upload
     * @param {Object} options - Upload options
     * @returns {Promise<Object>} Upload result
     */
    async uploadFile(file, options = {}) {
        try {
            const formData = new FormData();

            // Add file to form data
            formData.append('file', file);

            // Add upload preset (must be created in Cloudinary dashboard as unsigned)
            formData.append('upload_preset', this.uploadPreset);

            // Add optional parameters
            if (options.folder) {
                formData.append('folder', options.folder);
            }

            // Generate unique public_id if not provided
            if (options.public_id) {
                formData.append('public_id', options.public_id);
            } else {
                const timestamp = Date.now();
                const randomStr = Math.random().toString(36).substring(2, 8);
                formData.append('public_id', `${timestamp}_${randomStr}`);
            }

            // Add tags for organization
            if (options.tags) {
                formData.append('tags', Array.isArray(options.tags) ? options.tags.join(',') : options.tags);
            }

            // Determine resource type
            const resourceType = this.getResourceType(file.type);

            // Upload to Cloudinary
            const uploadUrl = `https://api.cloudinary.com/v1_1/${this.cloudName}/${resourceType}/upload`;

            const response = await fetch(uploadUrl, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                let errorMessage = 'Unknown error';
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.error?.message || 'Unknown error';

                    // Provide specific guidance for common errors
                    if (response.status === 401 || errorMessage.includes('API key')) {
                        errorMessage = `Unauthorized: The upload preset '${this.uploadPreset}' doesn't exist or isn't configured for unsigned uploads. Please create an unsigned upload preset in your Cloudinary dashboard.`;
                    } else if (response.status === 400 && errorMessage.includes('preset')) {
                        errorMessage = `Bad Request: Upload preset '${this.uploadPreset}' not found or not configured properly.`;
                    }
                } catch {
                    errorMessage = `HTTP ${response.status}: ${response.statusText}`;
                }
                throw new Error(`Upload failed: ${errorMessage}`);
            }

            const result = await response.json();
            return result;

        } catch (error) {
            console.error('Cloudinary upload error:', error);
            throw error;
        }
    }

    /**
     * Upload image with progress tracking
     * @param {File} file - Image file
     * @param {Function} onProgress - Progress callback
     * @param {Object} options - Upload options
     * @returns {Promise<Object>} Upload result
     */
    async uploadImage(file, onProgress = null, options = {}) {
        try {
            const uploadOptions = {
                folder: 'chat/images',
                tags: ['chat', 'image'],
                ...options
            };

            if (onProgress) {
                // For progress tracking, we'll use XMLHttpRequest
                return this.uploadWithProgress(file, uploadOptions, onProgress);
            }

            return await this.uploadFile(file, uploadOptions);
        } catch (error) {
            console.error('Image upload error:', error);
            throw error;
        }
    }

    /**
     * Upload audio with progress tracking
     * @param {File|Blob} audioBlob - Audio file or blob
     * @param {Function} onProgress - Progress callback
     * @param {Object} options - Upload options
     * @returns {Promise<Object>} Upload result
     */
    async uploadAudio(audioBlob, onProgress = null, options = {}) {
        try {
            // Convert blob to file if needed
            const file = audioBlob instanceof File ? audioBlob :
                new File([audioBlob], `voice_${Date.now()}.webm`, { type: 'audio/webm' });

            const uploadOptions = {
                folder: 'chat/audio',
                tags: ['chat', 'voice', 'audio'],
                resource_type: 'video', // Audio files use 'video' resource type in Cloudinary
                ...options
            };

            if (onProgress) {
                return this.uploadWithProgress(file, uploadOptions, onProgress);
            }

            return await this.uploadFile(file, uploadOptions);
        } catch (error) {
            console.error('Audio upload error:', error);
            throw error;
        }
    }

    /**
     * Upload video with progress tracking
     * @param {File} file - Video file
     * @param {Function} onProgress - Progress callback
     * @param {Object} options - Upload options
     * @returns {Promise<Object>} Upload result
     */
    async uploadVideo(file, onProgress = null, options = {}) {
        try {
            const uploadOptions = {
                folder: 'chat/videos',
                tags: ['chat', 'video'],
                resource_type: 'video',
                ...options
            };

            if (onProgress) {
                return this.uploadWithProgress(file, uploadOptions, onProgress);
            }

            return await this.uploadFile(file, uploadOptions);
        } catch (error) {
            console.error('Video upload error:', error);
            throw error;
        }
    }

    /**
     * Upload file with progress tracking using XMLHttpRequest
     * @param {File} file - File to upload
     * @param {Object} options - Upload options
     * @param {Function} onProgress - Progress callback
     * @returns {Promise<Object>} Upload result
     */
    uploadWithProgress(file, options, onProgress) {
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', this.uploadPreset);

            // Add options to form data
            Object.keys(options).forEach(key => {
                if (options[key] !== undefined) {
                    formData.append(key, options[key]);
                }
            });

            const resourceType = this.getResourceType(file.type);
            const uploadUrl = `https://api.cloudinary.com/v1_1/${this.cloudName}/${resourceType}/upload`;

            const xhr = new XMLHttpRequest();

            // Track upload progress
            xhr.upload.addEventListener('progress', (event) => {
                if (event.lengthComputable && onProgress) {
                    const percentComplete = (event.loaded / event.total) * 100;
                    onProgress(percentComplete, event.loaded, event.total);
                }
            });

            // Handle upload completion
            xhr.addEventListener('load', () => {
                if (xhr.status === 200) {
                    try {
                        const result = JSON.parse(xhr.responseText);
                        resolve(result);
                    } catch {
                        reject(new Error('Failed to parse response'));
                    }
                } else {
                    let errorMessage = 'Unknown error';
                    try {
                        const errorData = JSON.parse(xhr.responseText);
                        errorMessage = errorData.error?.message || 'Unknown error';

                        // Provide specific guidance for common errors
                        if (xhr.status === 401 || errorMessage.includes('API key')) {
                            errorMessage = `Unauthorized: The upload preset '${this.uploadPreset}' doesn't exist or isn't configured for unsigned uploads. Please create an unsigned upload preset in your Cloudinary dashboard.`;
                        } else if (xhr.status === 400 && errorMessage.includes('preset')) {
                            errorMessage = `Bad Request: Upload preset '${this.uploadPreset}' not found or not configured properly.`;
                        }
                    } catch {
                        errorMessage = `HTTP ${xhr.status}: ${xhr.statusText || 'Request failed'}`;
                    }
                    reject(new Error(`Upload failed: ${errorMessage}`));
                }
            });

            // Handle upload errors
            xhr.addEventListener('error', () => {
                reject(new Error('Network error during upload'));
            });

            // Start upload
            xhr.open('POST', uploadUrl);
            xhr.send(formData);
        });
    }

    /**
     * Get resource type based on MIME type
     * @param {string} mimeType - File MIME type
     * @returns {string} Cloudinary resource type
     */
    getResourceType(mimeType) {
        if (mimeType.startsWith('image/')) {
            return 'image';
        } else if (mimeType.startsWith('video/') || mimeType.startsWith('audio/')) {
            return 'video'; // Both video and audio use 'video' resource type
        } else {
            return 'raw'; // For other file types
        }
    }

    /**
     * Delete file from Cloudinary
     * @param {string} publicId - Public ID of the file to delete
     * @param {string} resourceType - Resource type (image, video, raw)
     * @returns {Promise<Object>} Deletion result
     */
    async deleteFile(publicId, resourceType = 'image') {
        try {
            // Note: Deletion requires authentication and is typically done on the server side
            // This is a placeholder for client-side deletion (not recommended for production)
            console.warn('File deletion should be handled on the server side for security');
            console.log('Delete request for:', publicId, 'type:', resourceType);

            // You would typically call your backend API here
            // const response = await fetch('/api/delete-media', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ publicId, resourceType })
            // });

            return { message: 'Delete request would be sent to server' };
        } catch (error) {
            console.error('Delete error:', error);
            throw error;
        }
    }
}

// Create and export a singleton instance
const cloudinaryService = new CloudinaryService();
export default cloudinaryService;
