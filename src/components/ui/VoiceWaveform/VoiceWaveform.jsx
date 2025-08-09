import styled from "styled-components";
import { useEffect, useRef, useState } from "react";

const VoiceWaveform = ({ isRecording, recordingTime, audioStream }) => {
    const [bars, setBars] = useState(Array(20).fill(0.1));
    const animationRef = useRef(null);
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const dataArrayRef = useRef(null);

    // Set up audio analysis when recording starts
    useEffect(() => {
        if (!isRecording || !audioStream) {
            // Reset bars when not recording
            setBars(Array(20).fill(0.1));
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            // Clean up audio context
            if (audioContextRef.current) {
                audioContextRef.current.close();
                audioContextRef.current = null;
            }
            return;
        }

        // Real-time audio analysis animation
        const animate = () => {
            if (!analyserRef.current || !dataArrayRef.current) {
                animateSimulated();
                return;
            }

            analyserRef.current.getByteFrequencyData(dataArrayRef.current);

            // Convert frequency data to waveform bars
            const newBars = [];
            const barCount = 20;
            const dataPerBar = Math.floor(dataArrayRef.current.length / barCount);

            for (let i = 0; i < barCount; i++) {
                let sum = 0;
                const start = i * dataPerBar;
                const end = start + dataPerBar;

                // Average the frequency data for each bar
                for (let j = start; j < end && j < dataArrayRef.current.length; j++) {
                    sum += dataArrayRef.current[j];
                }

                const average = sum / dataPerBar;
                // Normalize to 0-1 range and apply some smoothing
                const amplitude = Math.min(1, Math.max(0.1, average / 255));
                newBars.push(amplitude);
            }

            setBars(newBars);
            animationRef.current = requestAnimationFrame(animate);
        };

        // Fallback simulated animation if Web Audio API fails
        const animateSimulated = () => {
            setBars(prev =>
                prev.map((_, index) => {
                    // Create more varied animation with different frequencies
                    const baseAmplitude = 0.3;
                    const variation = Math.random() * 0.7;
                    const timeOffset = Date.now() * 0.005 + index * 0.5;
                    const sineWave = Math.sin(timeOffset) * 0.3;
                    return Math.min(1, Math.max(0.1, baseAmplitude + variation + sineWave));
                })
            );
            animationRef.current = requestAnimationFrame(animateSimulated);
        };

        // Safe audio analysis that doesn't interfere with MediaRecorder
        const setupAudioAnalysis = async () => {
            try {
                // Clone the audio stream to avoid interfering with MediaRecorder
                const clonedStream = audioStream.clone();

                audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
                const source = audioContextRef.current.createMediaStreamSource(clonedStream);
                analyserRef.current = audioContextRef.current.createAnalyser();
                analyserRef.current.fftSize = 64;
                analyserRef.current.smoothingTimeConstant = 0.8;

                // Only connect to analyser, don't route to destination
                source.connect(analyserRef.current);

                const bufferLength = analyserRef.current.frequencyBinCount;
                dataArrayRef.current = new Uint8Array(bufferLength);

                animate();
            } catch (error) {
                console.error('Error setting up audio analysis:', error);
                // Fallback to simulated animation
                animateSimulated();
            }
        };

        setupAudioAnalysis();

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
                audioContextRef.current.close();
            }
        };
    }, [isRecording, audioStream]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <StyledWrapper>
            <div className="waveform-container">
                <div className="time-display">
                    {formatTime(recordingTime)}
                </div>
                <div className="waveform">
                    {bars.map((amplitude, index) => (
                        <div
                            key={index}
                            className="bar"
                            style={{
                                height: `${Math.max(3, amplitude * 30)}px`,
                            }}
                        />
                    ))}
                </div>
                <div className="recording-text">
                    Recording...
                </div>
            </div>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
  .waveform-container {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 12px 20px;
    background: var(--color-inputsBg);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
  }

  .time-display {
    font-size: 14px;
    font-weight: 600;
    color: var(--color-primary);
    min-width: 45px;
    font-family: var(--font-secondary);
  }

  .waveform {
    display: flex;
    align-items: center;
    gap: 2px;
    height: 35px;
    flex: 1;
    justify-content: center;
    padding: 0 10px;
  }

  .bar {
    width: 3px;
    background: var(--color-secondary);
    border-radius: 2px;
    transition: height 0.15s ease;
    min-height: 3px;
    opacity: 0.8;
  }

  .bar:nth-child(even) {
    background: var(--color-primary);
  }

  .recording-text {
    font-size: 12px;
    color: var(--color-text);
    opacity: 0.7;
    font-weight: 500;
  }
`;

export default VoiceWaveform;
