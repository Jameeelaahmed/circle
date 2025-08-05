// Cloudinary configuration
const CLOUDINARY_CONFIG = {
    cloudName: "dwh8jhaot", // Use the working cloud name from memories
    uploadPreset: "images", // Use the working upload preset
    secure: true,
    resourceType: "auto" // Automatically detect file type
};

// Helper function to get Cloudinary URL
export const getCloudinaryUrl = (publicId, transformations = {}) => {
    const baseUrl = `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}`;

    // Build transformation string
    let transformStr = '';
    if (Object.keys(transformations).length > 0) {
        const transforms = Object.entries(transformations)
            .map(([key, value]) => `${key}_${value}`)
            .join(',');
        transformStr = `${transforms}/`;
    }

    return `${baseUrl}/image/upload/${transformStr}${publicId}`;
};

// Helper function to get video URL
export const getCloudinaryVideoUrl = (publicId, transformations = {}) => {
    const baseUrl = `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}`;

    // Build transformation string
    let transformStr = '';
    if (Object.keys(transformations).length > 0) {
        const transforms = Object.entries(transformations)
            .map(([key, value]) => `${key}_${value}`)
            .join(',');
        transformStr = `${transforms}/`;
    }

    return `${baseUrl}/video/upload/${transformStr}${publicId}`;
};

// Helper function to get audio URL
export const getCloudinaryAudioUrl = (publicId) => {
    const baseUrl = `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}`;
    return `${baseUrl}/video/upload/${publicId}`;
};

export default CLOUDINARY_CONFIG;
