import { useState, useRef, useEffect } from 'react';
import CameraViewPresentational from './CameraViewPresentational';

function CameraModalContainer({ isOpen, onClose, onCapture }) {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const streamRef = useRef(null);
    const [isCameraReady, setIsCameraReady] = useState(false);
    const [facingMode, setFacingMode] = useState('environment'); // 'user' for front, 'environment' for back
    const [error, setError] = useState(null);

    // Start camera stream
    const startCamera = async () => {
        try {
            setError(null);
            setIsCameraReady(false);

            // Stop existing stream if any
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }

            const constraints = {
                video: {
                    facingMode: facingMode,
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                },
                audio: false
            };

            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            streamRef.current = stream;

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.onloadedmetadata = () => {
                    setIsCameraReady(true);
                };
            }
        } catch (err) {
            console.error('Error accessing camera:', err);
            setError('Could not access camera. Please check permissions.');
        }
    };

    // Stop camera stream
    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        setIsCameraReady(false);
    };

    // Capture photo
    const capturePhoto = () => {
        if (!videoRef.current || !canvasRef.current) return;

        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // Set canvas size to video size
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Draw video frame to canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert canvas to blob
        canvas.toBlob((blob) => {
            if (blob) {
                onCapture(blob);
            }
        }, 'image/jpeg', 0.9);
    };

    // Switch camera (front/back)
    const switchCamera = () => {
        setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
    };

    // Handle close
    const handleClose = () => {
        stopCamera();
        onClose();
    };

    // Start camera when modal opens
    useEffect(() => {
        if (isOpen) {
            startCamera();
        } else {
            stopCamera();
        }

        return () => {
            stopCamera();
        };
    }, [isOpen, facingMode]); // eslint-disable-line react-hooks/exhaustive-deps

    if (!isOpen) return null;

    return (
        <CameraViewPresentational
            capturePhoto={capturePhoto}
            switchCamera={switchCamera}
            handleClose={handleClose}
            isCameraReady={isCameraReady}
            error={error}
            startCamera={startCamera}
            videoRef={videoRef}
            facingMode={facingMode}
            canvasRef={canvasRef} />
    )
}

export default CameraModalContainer
