
import { X, ChevronLeft, ChevronRight, Download, ZoomIn, ZoomOut } from 'lucide-react';

function PhotoGalleryPresentational({
    currentIndex,
    photos,
    currentPhoto,
    handleZoomOut,
    handleZoomIn,
    handleDownload,
    onClose,
    goToPrevious,
    goToNext,
    zoomLevel,
    isZoomed,
    resetZoom,
    setCurrentIndex,
    setIsZoomed,
    setZoomLevel }) {
    return (
        <div className="fixed inset-0 bg-black/90 z-50 flex flex-col">
            {/* Header with controls */}
            <div className="flex-shrink-0 bg-gradient-to-b from-black/50 to-transparent p-4">
                <div className="flex justify-between items-center text-text">
                    <div className="flex items-center gap-4">
                        <span className="text-sm">
                            {currentIndex + 1} of {photos.length}
                        </span>
                        {currentPhoto.fileName && (
                            <span className="text-sm opacity-75 truncate max-w-xs">
                                {currentPhoto.fileName}
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleZoomOut}
                            className="p-2 hover:bg-text/20 rounded-full transition-colors"
                            title="Zoom out"
                        >
                            <ZoomOut size={20} />
                        </button>

                        <button
                            onClick={handleZoomIn}
                            className="p-2 hover:bg-text/20 rounded-full transition-colors"
                            title="Zoom in"
                        >
                            <ZoomIn size={20} />
                        </button>

                        <button
                            onClick={handleDownload}
                            className="p-2 hover:bg-text/20 rounded-full transition-colors"
                            title="Download"
                        >
                            <Download size={20} />
                        </button>

                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-text/20 rounded-full transition-colors"
                            title="Close"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Main content area */}
            <div className="flex-1 relative flex items-center justify-center overflow-hidden">
                {/* Navigation arrows */}
                {photos.length > 1 && (
                    <>
                        <button
                            onClick={goToPrevious}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 text-text hover:bg-text/20 rounded-full transition-colors"
                            title="Previous photo"
                        >
                            <ChevronLeft size={24} />
                        </button>

                        <button
                            onClick={goToNext}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 text-text hover:bg-text/20 rounded-full transition-colors"
                            title="Next photo"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </>
                )}

                {/* Main image container */}
                <div className="w-full h-full flex items-center justify-center p-8">
                    <img
                        src={currentPhoto.imageUrl}
                        alt={currentPhoto.fileName || 'Photo'}
                        className={`max-w-full max-h-full object-contain transition-transform duration-200 cursor-pointer ${isZoomed ? 'cursor-move' : 'cursor-zoom-in'
                            }`}
                        style={{
                            transform: `scale(${zoomLevel})`,
                            transformOrigin: 'center',
                            maxWidth: isZoomed ? 'none' : '100%',
                            maxHeight: isZoomed ? 'none' : '100%'
                        }}
                        onClick={isZoomed ? resetZoom : handleZoomIn}
                        onDragStart={(e) => e.preventDefault()}
                    />
                </div>

                {/* Click outside to close */}
                <div
                    className="absolute inset-0 -z-10"
                    onClick={onClose}
                />
            </div>

            {/* Thumbnail strip for multiple photos */}
            {photos.length > 1 && (
                <div className="flex-shrink-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                    <div className="flex justify-center gap-2 overflow-x-auto max-w-full">
                        {photos.map((photo, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setCurrentIndex(index);
                                    setIsZoomed(false);
                                    setZoomLevel(1);
                                }}
                                className={`flex-shrink-0 w-16 h-16 rounded border-2 overflow-hidden transition-all ${index === currentIndex
                                    ? 'border-text scale-110'
                                    : 'border-text/30 hover:border-text/60'
                                    }`}
                            >
                                <img
                                    src={photo.imageUrl}
                                    alt={`Photo ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default PhotoGalleryPresentational
