import { useState, useEffect } from 'react';
import PhotoGalleryPresentational from './PhotoGalleryPresentational';

function PhotoGalleryContainer({ photos, initialIndex = 0, isOpen, onClose }) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [isZoomed, setIsZoomed] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(1);

    useEffect(() => {
        setCurrentIndex(initialIndex);
        setIsZoomed(false);
        setZoomLevel(1);
    }, [initialIndex, isOpen]);

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % photos.length);
        setIsZoomed(false);
        setZoomLevel(1);
    };

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
        setIsZoomed(false);
        setZoomLevel(1);
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isOpen) return;

            const handleNext = () => {
                setCurrentIndex((prev) => (prev + 1) % photos.length);
                setIsZoomed(false);
                setZoomLevel(1);
            };

            const handlePrevious = () => {
                setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
                setIsZoomed(false);
                setZoomLevel(1);
            };

            switch (e.key) {
                case 'Escape':
                    onClose();
                    break;
                case 'ArrowLeft':
                    handlePrevious();
                    break;
                case 'ArrowRight':
                    handleNext();
                    break;
                default:
                    break;
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            return () => document.removeEventListener('keydown', handleKeyDown);
        }
    }, [isOpen, onClose, photos.length]);

    const handleDownload = () => {
        const currentPhoto = photos[currentIndex];
        const link = document.createElement('a');
        link.href = currentPhoto.imageUrl;
        link.download = currentPhoto.fileName || `photo-${Date.now()}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleZoomIn = () => {
        setZoomLevel(prev => Math.min(prev + 0.5, 3));
        setIsZoomed(true);
    };

    const handleZoomOut = () => {
        setZoomLevel(prev => Math.max(prev - 0.5, 0.5));
        if (zoomLevel <= 1) setIsZoomed(false);
    };

    const resetZoom = () => {
        setZoomLevel(1);
        setIsZoomed(false);
    };

    if (!isOpen || !photos.length) return null;

    const currentPhoto = photos[currentIndex];

    return (
        <PhotoGalleryPresentational
            currentIndex={currentIndex}
            photos={photos}
            currentPhoto={currentPhoto}
            handleZoomOut={handleZoomOut}
            handleZoomIn={handleZoomIn}
            handleDownload={handleDownload}
            onClose={onClose}
            goToPrevious={goToPrevious}
            goToNext={goToNext}
            zoomLevel={zoomLevel}
            isZoomed={isZoomed}
            resetZoom={resetZoom}
            setCurrentIndex={setCurrentIndex}
            setIsZoomed={setIsZoomed}
            setZoomLevel={setZoomLevel}
        />
    );
}

export default PhotoGalleryContainer;
