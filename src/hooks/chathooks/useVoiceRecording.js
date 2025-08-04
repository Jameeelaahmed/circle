import { useState, useRef, useCallback } from 'react';
import { uploadAndSendAudio } from '../../utils/chatutils/cloudinaryUtils';

export function useVoiceRecording() {
    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [audioStream, setAudioStream] = useState(null);
    const [recordingTime, setRecordingTime] = useState(0);
    const [isUploading, setIsUploading] = useState(false);

    const isCancelledRef = useRef(false);
    const recordingTimeRef = useRef(0);
    const recordingChunks = useRef([]);
    const recordingTimer = useRef(null);
    const recordingTimeout = useRef(null);
    const recordingPromiseRef = useRef(null);

    const stopRecording = useCallback(() => {
        return new Promise((resolve) => {
            isCancelledRef.current = false;

            if (mediaRecorder && mediaRecorder.state === 'recording') {
                // Store the resolve function to call it when recording stops
                recordingPromiseRef.current = resolve;
                mediaRecorder.stop();
            } else {
                // If not recording, resolve with null
                resolve(null);
            }

            setIsRecording(false);
            setMediaRecorder(null);
            setAudioStream(null);

            if (recordingTimeout.current) {
                clearTimeout(recordingTimeout.current);
                recordingTimeout.current = null;
            }
        });
    }, [mediaRecorder]);

    const cancelRecording = useCallback(() => {
        isCancelledRef.current = true;

        if (mediaRecorder && mediaRecorder.state === 'recording') {
            recordingChunks.current = [];
            mediaRecorder.stop();
        }

        setIsRecording(false);
        setMediaRecorder(null);
        setAudioStream(null);

        if (recordingTimer.current) {
            clearInterval(recordingTimer.current);
            recordingTimer.current = null;
        }

        if (recordingTimeout.current) {
            clearTimeout(recordingTimeout.current);
            recordingTimeout.current = null;
        }

        setRecordingTime(0);
        recordingTimeRef.current = 0;

        // Clear any pending promise
        if (recordingPromiseRef.current) {
            recordingPromiseRef.current(null);
            recordingPromiseRef.current = null;
        }
    }, [mediaRecorder]);

    const startRecording = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            setAudioStream(stream);
            isCancelledRef.current = false;

            const recorder = new MediaRecorder(stream, {
                mimeType: MediaRecorder.isTypeSupported('audio/webm;codecs=opus') ? 'audio/webm;codecs=opus' :
                    MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' :
                        MediaRecorder.isTypeSupported('audio/mp4') ? 'audio/mp4' : undefined
            });

            setMediaRecorder(recorder);
            recordingChunks.current = [];

            recorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    recordingChunks.current.push(event.data);
                }
            };

            recorder.onstop = async () => {
                console.log('Recording stopped, chunks:', recordingChunks.current.length);

                // Clean up stream and timers
                stream.getTracks().forEach(track => track.stop());
                setAudioStream(null);

                if (recordingTimer.current) {
                    clearInterval(recordingTimer.current);
                    recordingTimer.current = null;
                }
                setRecordingTime(0);
                recordingTimeRef.current = 0;

                // Handle recording data
                if (recordingChunks.current.length === 0) {
                    console.warn('No recording chunks available');
                    if (recordingPromiseRef.current) {
                        recordingPromiseRef.current(null);
                        recordingPromiseRef.current = null;
                    }
                    return;
                }

                const audioBlob = new Blob(recordingChunks.current, { type: recorder.mimeType });
                console.log('Audio blob created:', audioBlob.size, 'bytes');

                // Only return data if it wasn't cancelled
                if (recordingChunks.current.length > 0 && !isCancelledRef.current) {
                    const capturedRecordingTime = recordingTimeRef.current;
                    const recordingData = { audioBlob, duration: capturedRecordingTime };

                    if (recordingPromiseRef.current) {
                        recordingPromiseRef.current(recordingData);
                        recordingPromiseRef.current = null;
                    }
                } else {
                    if (recordingPromiseRef.current) {
                        recordingPromiseRef.current(null);
                        recordingPromiseRef.current = null;
                    }
                }
            };

            recorder.start(1000);
            setIsRecording(true);

            setRecordingTime(0);
            recordingTimeRef.current = 0;
            recordingTimer.current = setInterval(() => {
                recordingTimeRef.current += 1;
                setRecordingTime(prev => prev + 1);
            }, 1000);

            recordingTimeout.current = setTimeout(() => {
                stopRecording();
            }, 60000);

        } catch (error) {
            console.error('Error starting recording:', error);
            throw new Error('Could not access microphone. Please check permissions.');
        }
    }, [stopRecording]);

    const sendVoiceMessage = useCallback(async (audioBlob, duration, circleId, userId, userName, replyTo, formatTime) => {
        try {
            setIsUploading(true);
            console.log('Sending voice message:', audioBlob.size, 'bytes, duration:', duration);

            await uploadAndSendAudio(
                audioBlob,
                duration,
                circleId,
                userId,
                userName,
                replyTo,
                (progress) => console.log('Audio upload progress:', progress + '%'),
                formatTime
            );

            console.log('Voice message sent successfully');

        } catch (error) {
            console.error('Error sending voice message:', error);
            throw error;
        } finally {
            setIsUploading(false);
        }
    }, []);

    return {
        isRecording,
        audioStream,
        recordingTime,
        isUploading,
        startRecording,
        stopRecording,
        cancelRecording,
        sendVoiceMessage
    };
}
