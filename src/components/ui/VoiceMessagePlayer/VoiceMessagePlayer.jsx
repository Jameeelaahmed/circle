import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import Skeleton from "@mui/material/Skeleton";

const VoiceMessagePlayer = ({ audioData, isMe, duration: providedDuration }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(providedDuration || 0);
    const [currentTime, setCurrentTime] = useState(0);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    const [isLoading, setIsLoading] = useState(!providedDuration || providedDuration === 0);
    const [waveformBars, setWaveformBars] = useState(() =>
        Array(40).fill(0).map(() => Math.random() * 0.6 + 0.2)
    );
    const audioRef = useRef(null);
    const animationRef = useRef(null);
    const originalWaveformRef = useRef(
        Array(40).fill(0).map(() => Math.random() * 0.6 + 0.2)
    );

    const speeds = [1, 1.25, 1.5, 2];

    // Initialize with proper waveform on mount
    useEffect(() => {
        // Set initial waveform pattern
        const initialPattern = Array(40).fill(0).map(() => Math.random() * 0.6 + 0.2);
        setWaveformBars(initialPattern);
        originalWaveformRef.current = initialPattern;
    }, [audioData]); // Re-initialize when audioData changes

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        const updateWaveformProgress = () => {
            if (!audioRef.current || duration === 0) return;

            const progress = currentTime / duration;
            const activeBars = Math.floor(progress * 40);

            setWaveformBars(prev => {
                if (!Array.isArray(prev) || prev.length !== 40) {
                    return originalWaveformRef.current;
                }

                return prev.map((originalHeight, index) => {
                    const baseHeight = originalWaveformRef.current[index] || originalHeight;
                    if (index < activeBars) {
                        return Math.max(baseHeight, 0.8); // Active bars - use original height or 0.8, whichever is higher
                    } else if (index === activeBars) {
                        return Math.max(baseHeight, 0.6); // Current playing bar
                    } else {
                        return baseHeight; // Inactive bars keep original height
                    }
                });
            });
        };

        const handleLoadedMetadata = () => {
            // Use provided duration if audio duration is invalid
            const audioDuration = audio.duration;
            if (isFinite(audioDuration) && audioDuration > 0) {
                setDuration(audioDuration);
            } else if (providedDuration > 0) {
                setDuration(providedDuration);
            } else {
                console.warn('No valid duration available');
            }
            setIsLoading(false); // Audio metadata loaded
        };

        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
            // Update waveform progress during playback and when paused
            updateWaveformProgress();
        };

        const handlePlay = () => {
            // Audio should play normally without Web Audio API
        };

        const handleEnded = () => {
            setIsPlaying(false);
            setCurrentTime(0);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };

        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('play', handlePlay);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('ended', handleEnded);

            if (animationRef.current) {
                const currentAnimation = animationRef.current;
                cancelAnimationFrame(currentAnimation);
                animationRef.current = null;
            }
        };
    }, [duration, currentTime, isPlaying, providedDuration]);

    // Update waveform based on playback progress (no Web Audio API needed)
    useEffect(() => {
        if (duration === 0) return;

        // Always update waveform to show current progress
        const updateWaveformProgress = () => {
            const progress = currentTime / duration;
            const activeBars = Math.floor(progress * 20);

            setWaveformBars(prev =>
                prev.map((_, index) => {
                    if (index < activeBars) {
                        return 0.8; // Played bars
                    } else if (index === activeBars) {
                        return 0.6; // Current playing bar
                    } else {
                        return 0.3; // Unplayed bars
                    }
                })
            );
        };

        updateWaveformProgress();
    }, [currentTime, duration]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.playbackRate = playbackSpeed;
        }
    }, [playbackSpeed]);

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleSpeedChange = () => {
        const currentIndex = speeds.indexOf(playbackSpeed);
        const nextIndex = (currentIndex + 1) % speeds.length;
        setPlaybackSpeed(speeds[nextIndex]);
    };

    const formatTime = (seconds) => {
        if (isNaN(seconds)) return "0:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleWaveformClick = (barIndex) => {
        if (!audioRef.current || duration === 0) return;

        const clickProgress = barIndex / 20;
        const newTime = clickProgress * duration;
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    return (
        <StyledWrapper $isMe={isMe}>
            <audio
                ref={audioRef}
                src={audioData}
                preload="metadata"
            />

            {isLoading ? (
                <div className="voice-player">
                    {/* Loading Skeleton */}
                    <Skeleton
                        sx={{ bgcolor: isMe ? "rgba(255, 255, 255, 0.2)" : "var(--color-secondary)" }}
                        animation="wave"
                        variant="circular"
                        width={32}
                        height={32}
                    />
                    <div className="waveform-container">
                        <Skeleton
                            sx={{ bgcolor: isMe ? "rgba(255, 255, 255, 0.2)" : "var(--color-secondary)" }}
                            animation="wave"
                            variant="rounded"
                            width="100%"
                            height={32}
                        />
                    </div>
                    <div className="controls">
                        <Skeleton
                            sx={{ bgcolor: isMe ? "rgba(255, 255, 255, 0.2)" : "var(--color-secondary)" }}
                            animation="wave"
                            variant="text"
                            width={30}
                            height={12}
                        />
                        <Skeleton
                            sx={{ bgcolor: isMe ? "rgba(255, 255, 255, 0.2)" : "var(--color-secondary)" }}
                            animation="wave"
                            variant="rounded"
                            width={24}
                            height={16}
                        />
                    </div>
                </div>
            ) : (
                <div className="voice-player">
                    {/* Play/Pause Button */}
                    <button className="play-button" onClick={togglePlayPause}>
                        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                    </button>

                    {/* Waveform */}
                    <div className="waveform-container">
                        <div className="waveform">
                            {waveformBars.map((amplitude, index) => (
                                <div
                                    key={index}
                                    className="bar"
                                    style={{
                                        height: `${Math.max(3, amplitude * 24)}px`,
                                    }}
                                    onClick={() => handleWaveformClick(index)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Dynamic Time Display: Duration when stopped, Counter when playing */}
                    <div className="controls">
                        <span className="duration">
                            {isPlaying ? formatTime(currentTime) : formatTime(duration)}
                        </span>
                        <button className="speed-button" onClick={handleSpeedChange}>
                            {playbackSpeed}x
                        </button>
                    </div>
                </div>
            )}
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
  .voice-player {
    display: flex;
    align-items: center;
    gap: 12px;
    width:100%
    // min-width: 200px;
    // max-width: 280px;
  }

  .play-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: none;
    background: ${props => props.$isMe ? 'rgba(255, 255, 255, 0.2)' : 'var(--color-secondary)'};
    color: white;
    cursor: pointer;
    transition: all 0.2s ease;
    flex-shrink: 0;

    &:hover {
      background: ${props => props.$isMe ? 'rgba(255, 255, 255, 0.3)' : 'var(--color-primary)'};
      transform: scale(1.05);
    }
  }

  .waveform-container {
    flex: 1;
    height: 32px;
    display: flex;
    align-items: center;
  }

  .waveform {
    display: flex;
    align-items: center;
    gap: 2px;
    height: 100%;
    width: 100%;
    cursor: pointer;
  }

  .bar {
    width: 3px;
    background: ${props => props.$isMe ? 'rgba(255, 255, 255, 0.6)' : 'var(--color-secondary)'};
    border-radius: 2px;
    transition: all 0.15s ease;
    min-height: 3px;
    cursor: pointer;

    &:hover {
      background: ${props => props.$isMe ? 'rgba(255, 255, 255, 0.8)' : 'var(--color-primary)'};
    }
  }

  .controls {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    flex-shrink: 0;
  }

  .duration {
    font-size: 10px;
    color: ${props => props.$isMe ? 'rgba(255, 255, 255, 0.8)' : 'var(--color-text)'};
    opacity: 0.8;
    font-weight: 500;
  }

  .speed-button {
    background: none;
    border: 1px solid ${props => props.$isMe ? 'rgba(255, 255, 255, 0.3)' : 'var(--color-secondary)'};
    color: ${props => props.$isMe ? 'rgba(255, 255, 255, 0.9)' : 'var(--color-text)'};
    border-radius: 12px;
    padding: 2px 6px;
    font-size: 9px;
    cursor: pointer;
    transition: all 0.2s ease;
    min-width: 24px;

    &:hover {
      background: ${props => props.$isMe ? 'rgba(255, 255, 255, 0.1)' : 'var(--color-secondary)'};
      border-color: ${props => props.$isMe ? 'rgba(255, 255, 255, 0.5)' : 'var(--color-primary)'};
    }
  }
`;

export default VoiceMessagePlayer;
