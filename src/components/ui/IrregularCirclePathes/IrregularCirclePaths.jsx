import { motion as Motion } from "framer-motion"
export default function IrregularCirclePaths() {
    // Generate irregular circular paths with organic variations
    const generateIrregularCirclePath = (
        radius,
        centerX,
        centerY,
        irregularity,
        pathIndex
    ) => {
        const points = [];
        const steps = 120;
        const baseRadius = radius;

        for (let i = 0; i <= steps; i++) {
            const angle = (i / steps) * Math.PI * 2;

            // Create irregular radius variations using multiple sine waves
            const radiusVariation1 =
                Math.sin(angle * 3 + pathIndex * 0.5) * irregularity * 0.4;
            const radiusVariation2 =
                Math.sin(angle * 7 + pathIndex * 0.8) * irregularity * 0.2;
            const radiusVariation3 =
                Math.sin(angle * 11 + pathIndex * 1.2) * irregularity * 0.15;
            const radiusVariation4 =
                Math.cos(angle * 5 + pathIndex * 0.3) * irregularity * 0.25;

            const currentRadius =
                baseRadius +
                radiusVariation1 +
                radiusVariation2 +
                radiusVariation3 +
                radiusVariation4;

            // Add some organic wobble to the center point
            const centerOffsetX =
                Math.sin(angle * 2 + pathIndex * 0.4) * irregularity * 0.1;
            const centerOffsetY =
                Math.cos(angle * 1.5 + pathIndex * 0.6) * irregularity * 0.1;

            const x = centerX + centerOffsetX + Math.cos(angle) * currentRadius;
            const y = centerY + centerOffsetY + Math.sin(angle) * currentRadius;

            points.push(`${x},${y}`);
        }

        return `M${points.join(" L")}Z`; // Close the path with Z
    };

    // Create multiple layers of irregular circular paths
    const pathLayers = [];
    const numLayers = 10;
    const centerX = 400;
    const centerY = 400;

    for (let i = 0; i < numLayers; i++) {
        const baseRadius = 80 + i * 25;
        const irregularity = 30 + Math.sin(i * 0.3) * 20;
        const pathIndex = i;

        pathLayers.push({
            id: i,
            radius: baseRadius,
            irregularity,
            pathIndex,
            delay: i * 0.6,
            duration: 20 + Math.sin(i * 0.4) * 8,
            opacity: 0.3 + Math.sin(i * 0.2) * 0.2,
        });
    }

    return (
        <div className="absolute inset-0 overflow-hidden opacity-30">
            <svg
                className="w-full h-full"
                viewBox="0 0 800 800"
                fill="none"
                preserveAspectRatio="xMidYMid slice"
            >
                <defs>
                    <filter id="circleGlow">
                        <feGaussianBlur
                            stdDeviation="1.5"
                            result="coloredBlur"
                        />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <radialGradient
                        id="circleGradient"
                        cx="50%"
                        cy="50%"
                        r="50%"
                    >
                        <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
                        <stop offset="50%" stopColor="rgba(255,255,255,0.3)" />
                        <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
                    </radialGradient>
                    <linearGradient
                        id="pathGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                    >
                        <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
                        <stop offset="25%" stopColor="rgba(255,255,255,0.4)" />
                        <stop offset="75%" stopColor="rgba(255,255,255,0.4)" />
                        <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
                    </linearGradient>
                </defs>

                {pathLayers.map((layer) => (
                    <Motion.path
                        key={layer.id}
                        d={generateIrregularCirclePath(
                            layer.radius,
                            centerX,
                            centerY,
                            layer.irregularity,
                            layer.pathIndex
                        )}
                        stroke="url(#pathGradient)"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                        filter="url(#circleGlow)"
                        initial={{
                            pathLength: 0,
                            opacity: 0,
                            rotate: 0,
                        }}
                        animate={{
                            pathLength: [0, 1, 1, 0],
                            opacity: [
                                0,
                                layer.opacity,
                                layer.opacity * 1.2,
                                layer.opacity,
                                0,
                            ],
                            rotate: [0, 360],
                        }}
                        transition={{
                            pathLength: {
                                duration: layer.duration,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: layer.delay,
                                times: [0, 0.3, 0.7, 0.9, 1],
                            },
                            opacity: {
                                duration: layer.duration,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: layer.delay,
                                times: [0, 0.2, 0.5, 0.8, 1],
                            },
                            rotate: {
                                duration: layer.duration * 2,
                                repeat: Infinity,
                                ease: "linear",
                                delay: layer.delay * 0.5,
                            },
                        }}
                        style={{
                            transformOrigin: `${centerX}px ${centerY}px`,
                        }}
                    />
                ))}

                {/* Floating particles that follow circular paths */}
                {Array.from({ length: 18 }, (_, i) => {
                    const particleRadius = 120 + i * 15;
                    const particleSpeed = 15 + Math.random() * 10;

                    return (
                        <Motion.circle
                            key={`particle-${i}`}
                            r="1.5"
                            fill="rgba(255,255,255,0.7)"
                            filter="url(#circleGlow)"
                            initial={{
                                cx: centerX + particleRadius,
                                cy: centerY,
                                opacity: 0,
                            }}
                            animate={{
                                cx: [
                                    centerX + particleRadius,
                                    centerX,
                                    centerX - particleRadius,
                                    centerX,
                                    centerX + particleRadius,
                                ],
                                cy: [
                                    centerY,
                                    centerY - particleRadius,
                                    centerY,
                                    centerY + particleRadius,
                                    centerY,
                                ],
                                opacity: [0, 0.8, 1, 0.8, 0.6, 0],
                            }}
                            transition={{
                                duration: particleSpeed,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.8,
                                times: [0, 0.25, 0.5, 0.75, 1, 1],
                            }}
                        />
                    );
                })}

                {/* Central pulsing elements */}
                {Array.from({ length: 5 }, (_, i) => (
                    <Motion.circle
                        key={`center-${i}`}
                        r={8 + i * 4}
                        fill="none"
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth="1"
                        cx={centerX}
                        cy={centerY}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: [0, 0.6, 0],
                            scale: [0.5, 1.5, 2],
                        }}
                        transition={{
                            duration: 4 + i * 0.5,
                            repeat: Infinity,
                            delay: i * 0.8,
                            ease: "easeOut",
                        }}
                    />
                ))}

                {Array.from({ length: 12 }, (_, i) => {
                    const orbitRadius = 200 + Math.sin(i * 0.5) * 50;
                    const orbitSpeed = 12 + Math.random() * 6;
                    const baseAngle = (i * Math.PI) / 6;

                    // Pre-calculate all positions to avoid undefined values
                    const positions = [
                        {
                            x: centerX + orbitRadius * Math.cos(baseAngle),
                            y: centerY + orbitRadius * Math.sin(baseAngle)
                        },
                        {
                            x: centerX + orbitRadius * Math.cos(baseAngle + Math.PI),
                            y: centerY + orbitRadius * Math.sin(baseAngle + Math.PI)
                        },
                        {
                            x: centerX + orbitRadius * Math.cos(baseAngle + Math.PI * 2),
                            y: centerY + orbitRadius * Math.sin(baseAngle + Math.PI * 2)
                        }
                    ];

                    return (
                        <Motion.circle
                            key={`orbit-${i}`}
                            r="2"
                            fill="rgba(255,255,255,0.5)"
                            initial={{
                                cx: positions[0].x,
                                cy: positions[0].y,
                                opacity: 0
                            }}
                            animate={{
                                opacity: [0, 0.8, 0],
                                cx: [positions[0].x, positions[1].x, positions[2].x],
                                cy: [positions[0].y, positions[1].y, positions[2].y],
                            }}
                            transition={{
                                duration: orbitSpeed,
                                repeat: Infinity,
                                delay: i * 0.5,
                                ease: "easeInOut",
                            }}
                        />
                    );
                })}
            </svg>
        </div>
    );
}