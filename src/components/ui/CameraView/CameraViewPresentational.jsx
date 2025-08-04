import { X, Camera, RotateCcw } from 'lucide-react';

function CameraViewPresentational({ handleClose, switchCamera, capturePhoto, error, startCamera, videoRef, facingMode, isCameraReady, canvasRef }) {

    return (
        <div className="flex flex-col bg-main rounded-4xl overflow-hidden h-[80vh] max-h-[800px] min-h-[500px]">
            {/* Header */}
            <div className="flex items-center justify-between p-3 bg-primary/10 border-b border-primary/20">
                <h3 className="text-sm font-semibold text-primary">Take Photo</h3>
                <button
                    onClick={handleClose}
                    className="p-2 hover:bg-primary/10 rounded-full text-primary"
                    type="button"
                >
                    <X size={18} />
                </button>
            </div>

            {/* Camera View */}
            <div className="flex-1 relative bg-inputsBg min-h-0">
                {error ? (
                    <div className="flex items-center justify-center h-full text-primary text-center p-4">
                        <div>
                            <p className="mb-4 text-secondary text-sm">{error}</p>
                            <button
                                onClick={startCamera}
                                className="px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 text-sm"
                                type="button"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            className="w-full h-full object-cover rounded-lg"
                            style={{ transform: facingMode === 'user' ? 'scaleX(-1)' : 'none' }}
                        />

                        {!isCameraReady && (
                            <div className="absolute inset-0 flex items-center justify-center text-primary bg-main/80 rounded-lg">
                                <div className="text-center">
                                    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                                    <p className="text-secondary text-sm">Loading camera...</p>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between p-3 bg-primary/10 border-t border-primary/20">
                <button
                    onClick={switchCamera}
                    className="p-2 bg-secondary/10 hover:bg-secondary/20 rounded-full text-secondary border border-secondary/20"
                    type="button"
                    disabled={!isCameraReady}
                >
                    <RotateCcw size={18} />
                </button>

                <button
                    onClick={capturePhoto}
                    className="p-3 bg-primary hover:bg-primary/80 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                    type="button"
                    disabled={!isCameraReady}
                >
                    <Camera size={20} />
                </button>

                <button
                    onClick={handleClose}
                    className="px-3 py-2 bg-secondary/10 hover:bg-secondary/20 text-secondary rounded-lg border border-secondary/20 text-sm"
                    type="button"
                >
                    Cancel
                </button>
            </div>

            {/* Hidden canvas for photo capture */}
            <canvas ref={canvasRef} className="hidden" />
        </div>
    );
}

export default CameraViewPresentational;
