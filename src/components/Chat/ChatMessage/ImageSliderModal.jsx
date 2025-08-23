import { useEffect } from "react";

function ImageSliderModal({
    imageSlider,
    closeImageSlider,
    nextImage,
    prevImage,
    setImageSlider
}) {
    // Handle keyboard navigation for image slider
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (!imageSlider.isOpen) return;

            switch (e.key) {
                case 'Escape':
                    closeImageSlider();
                    break;
                case 'ArrowLeft':
                    prevImage();
                    break;
                case 'ArrowRight':
                    nextImage();
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [imageSlider.isOpen, closeImageSlider, nextImage, prevImage]);

    if (!imageSlider.isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
            {/* Close button */}
            <button
                className="absolute top-4 right-4 text-text text-2xl hover:text-gray-300 z-60 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                onClick={closeImageSlider}
            >
                ×
            </button>

            {/* Download button */}
            <button
                className="absolute top-4 right-16 text-text text-lg hover:text-gray-300 z-60 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                onClick={() => {
                    const currentImage = imageSlider.images[imageSlider.currentIndex];
                    const link = document.createElement('a');
                    link.href = currentImage.imageUrl;
                    link.download = currentImage.fileName || `image-${imageSlider.currentIndex + 1}.jpg`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }}
                title="Download image"
            >
                ⬇
            </button>

            {/* Image counter */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-text bg-black/50 px-3 py-1 rounded-full text-sm">
                {imageSlider.currentIndex + 1} / {imageSlider.images.length}
            </div>

            {/* Previous button */}
            {imageSlider.images.length > 1 && (
                <button
                    className="absolute left-4 text-text text-4xl hover:text-gray-300 z-60 w-12 h-12 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                    onClick={prevImage}
                >
                    ‹
                </button>
            )}

            {/* Current image container with proper sizing */}
            <div className="flex items-center justify-center w-full h-full p-4">
                <div className="relative max-w-[90vw] max-h-[80vh] flex items-center justify-center">
                    <img
                        src={imageSlider.images[imageSlider.currentIndex]?.imageUrl}
                        alt="Full size image"
                        className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                        style={{
                            maxWidth: '90vw',
                            maxHeight: '80vh',
                            width: 'auto',
                            height: 'auto'
                        }}
                    />
                </div>
            </div>

            {/* Next button */}
            {imageSlider.images.length > 1 && (
                <button
                    className="absolute right-4 text-text text-4xl hover:text-gray-300 z-60 w-12 h-12 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                    onClick={nextImage}
                >
                    ›
                </button>
            )}

            {/* Image thumbnails */}
            {imageSlider.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto p-2 bg-black/30 rounded-lg backdrop-blur-sm">
                    {imageSlider.images.map((img, idx) => (
                        <img
                            key={img.id || idx}
                            src={img.imageUrl}
                            alt={`Thumbnail ${idx + 1}`}
                            className={`w-16 h-16 object-cover rounded cursor-pointer border-2 hover:border-gray-300 transition-colors ${idx === imageSlider.currentIndex ? 'border-text' : 'border-transparent'
                                }`}
                            onClick={() => setImageSlider(prev => ({ ...prev, currentIndex: idx }))}
                        />
                    ))}
                </div>
            )}

            {/* Click outside to close */}
            <div
                className="absolute inset-0 -z-10"
                onClick={closeImageSlider}
            />
        </div>
    );
}

export default ImageSliderModal;
