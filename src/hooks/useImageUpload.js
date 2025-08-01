import { useState } from 'react';

export function useImageUpload() {
    const [uploadedImage, setUploadedImage] = useState();

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Revoke previous preview if exists
            if (uploadedImage) {
                URL.revokeObjectURL(uploadedImage.preview);
            }
            setUploadedImage({
                file,
                preview: URL.createObjectURL(file),
            });
        }
    };

    const removeImage = () => {
        if (uploadedImage) {
            URL.revokeObjectURL(uploadedImage.preview);
        }
        setUploadedImage(undefined);
    };

    return {
        uploadedImage,
        setUploadedImage,
        handleImageUpload,
        removeImage,
    };
}



// useEffect(() => {
//   return () => {
//     uploadedImages.forEach((image) => URL.revokeObjectURL(image.preview));
//   };
// }, [uploadedImages]);
