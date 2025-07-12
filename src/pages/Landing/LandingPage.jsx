"use client";

import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
import { Search, Bell, Mail, User } from "lucide-react";
import { useState } from "react";
import Orb from '../../components/ui/Orb/Orb';

function IrregularCirclePaths() {
    // Generate irregular circular paths with organic variations
    const generateIrregularCirclePath = (radius, centerX, centerY, irregularity, pathIndex) => {
        const points = [];
        const steps = 200;
        const baseRadius = radius;

        for (let i = 0; i <= steps; i++) {
            const angle = (i / steps) * Math.PI * 2;

            // Create irregular radius variations using multiple sine waves
            const radiusVariation1 = Math.sin(angle * 3 + pathIndex * 0.5) * irregularity * 0.4;
            const radiusVariation2 = Math.sin(angle * 7 + pathIndex * 0.8) * irregularity * 0.2;
            const radiusVariation3 = Math.sin(angle * 11 + pathIndex * 1.2) * irregularity * 0.15;
            const radiusVariation4 = Math.cos(angle * 5 + pathIndex * 0.3) * irregularity * 0.25;

            const currentRadius = baseRadius + radiusVariation1 + radiusVariation2 + radiusVariation3 + radiusVariation4;

            // Add some organic wobble to the center point
            const centerOffsetX = Math.sin(angle * 2 + pathIndex * 0.4) * irregularity * 0.1;
            const centerOffsetY = Math.cos(angle * 1.5 + pathIndex * 0.6) * irregularity * 0.1;

            const x = centerX + centerOffsetX + Math.cos(angle) * currentRadius;
            const y = centerY + centerOffsetY + Math.sin(angle) * currentRadius;

            points.push(`${x},${y}`);
        }

        return `M${points.join(' L')}Z`; // Close the path with Z
    };

    // Create multiple layers of irregular circular paths
    const pathLayers = [];
    const numLayers = 15;
    const centerX = 400;
    const centerY = 400;

    for (let i = 0; i < numLayers; i++) {
        const baseRadius = 70 + (i * 20); // Reduced base radius
        const irregularity = 25 + Math.sin(i * 0.3) * 15; // Reduced irregularity
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
        <div className="absolute inset-0 overflow-hidden flex justify-center opacity-30 transform scale-[0.85]"> {/* Reduced size */}
            <svg
                className="w-4/5 h-screen"
                viewBox="0 0 800 800"
                fill="none"
                preserveAspectRatio="xMidYMid slice"
            >
                <defs>
                    <filter id="circleGlow">
                        <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <radialGradient id="circleGradient" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
                        <stop offset="50%" stopColor="rgba(255,255,255,0.3)" />
                        <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
                    </radialGradient>
                    <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
                        <stop offset="25%" stopColor="rgba(255,255,255,0.4)" />
                        <stop offset="75%" stopColor="rgba(255,255,255,0.4)" />
                        <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
                    </linearGradient>
                </defs>

                {pathLayers.map((layer) => (
                    <motion.path
                        key={layer.id}
                        d={generateIrregularCirclePath(layer.radius, centerX, centerY, layer.irregularity, layer.pathIndex)}
                        stroke="url(#pathGradient)"
                        strokeWidth="1.2"
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
                            opacity: [0, layer.opacity, layer.opacity * 1.2, layer.opacity, 0],
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
                            }
                        }}
                        style={{
                            transformOrigin: `${centerX}px ${centerY}px`,
                        }}
                    />
                ))}

                {/* Floating particles that follow circular paths */}
                {Array.from({ length: 18 }, (_, i) => {
                    const particleRadius = 100 + (i * 12); // Reduced particle radius
                    const particleSpeed = 15 + Math.random() * 10;

                    return (
                        <motion.circle
                            key={`particle-${i}`}
                            r="1.5"
                            fill="rgba(255,255,255,0.7)"
                            filter="url(#circleGlow)"
                            initial={{
                                cx: centerX + particleRadius,
                                cy: centerY,
                                opacity: 0
                            }}
                            animate={{
                                cx: [
                                    centerX + particleRadius,
                                    centerX,
                                    centerX - particleRadius,
                                    centerX,
                                    centerX + particleRadius
                                ],
                                cy: [
                                    centerY,
                                    centerY - particleRadius,
                                    centerY,
                                    centerY + particleRadius,
                                    centerY
                                ],
                                opacity: [0, 0.8, 1, 0.8, 0.6, 0]
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
                    <motion.circle
                        key={`center-${i}`}
                        r={6 + i * 3} // Reduced central elements size
                        fill="none"
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth="1"
                        cx={centerX}
                        cy={centerY}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: [0, 0.6, 0],
                            scale: [0.5, 1.3, 1.7], // Reduced scale
                        }}
                        transition={{
                            duration: 4 + i * 0.5,
                            repeat: Infinity,
                            delay: i * 0.8,
                            ease: "easeOut",
                        }}
                    />
                ))}

                {/* Connecting orbital dots */}
                {Array.from({ length: 12 }, (_, i) => {
                    const orbitRadius = 180 + Math.sin(i * 0.5) * 40; // Reduced orbit radius
                    const orbitSpeed = 12 + Math.random() * 6;
                    const startAngle = i * Math.PI / 6;

                    return (
                        <motion.circle
                            key={`orbit-${i}`}
                            r="1.8" // Slightly larger for visibility
                            fill="rgba(255,255,255,0.5)"
                            initial={{
                                cx: centerX + orbitRadius * Math.cos(startAngle),
                                cy: centerY + orbitRadius * Math.sin(startAngle),
                                opacity: 0
                            }}
                            animate={{
                                opacity: [0, 0.8, 0],
                                cx: [
                                    centerX + orbitRadius * Math.cos(startAngle),
                                    centerX + orbitRadius * Math.cos(startAngle + Math.PI),
                                    centerX + orbitRadius * Math.cos(startAngle + Math.PI * 2),
                                ],
                                cy: [
                                    centerY + orbitRadius * Math.sin(startAngle),
                                    centerY + orbitRadius * Math.sin(startAngle + Math.PI),
                                    centerY + orbitRadius * Math.sin(startAngle + Math.PI * 2),
                                ]
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

function FloatingAvatars() {
    const [hoveredAvatar, setHoveredAvatar] = useState(null);

    // Adjusted positions to align with scaled-down spiral - same positions as original avatars
    const orbPositions = [
        {
            id: 1,
            x: "18%",
            y: "22%",
            delay: 0,
            hue: 0,
            imageUrl: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
            name: "Alex Morgan",
            role: "Lead Developer",
            status: "Active now"
        },
        {
            id: 2,
            x: "42%",
            y: "12%",
            delay: 0.5,
            hue: 60,
            imageUrl: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
            name: "Taylor Swift",
            role: "UX Designer",
            status: "Last seen 2h ago"
        },
        {
            id: 3,
            x: "66%",
            y: "26%",
            delay: 1,
            hue: 120,
            imageUrl: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
            name: "Michael Chen",
            role: "Product Manager",
            status: "In a meeting"
        },
        {
            id: 4,
            x: "26%",
            y: "52%",
            delay: 1.5,
            hue: 180,
            imageUrl: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
            name: "Sarah Johnson",
            role: "Backend Engineer",
            status: "Working remotely"
        },
        {
            id: 5,
            x: "58%",
            y: "42%",
            delay: 2,
            hue: 240,
            imageUrl: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
            name: "David Kim",
            role: "Frontend Developer",
            status: "Active now"
        },
        {
            id: 6,
            x: "34%",
            y: "74%",
            delay: 2.5,
            hue: 300,
            imageUrl: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
            name: "Emma Wilson",
            role: "QA Engineer",
            status: "On vacation"
        },
        {
            id: 7,
            x: "74%",
            y: "66%",
            delay: 3,
            hue: 30,
            imageUrl: "https://images.pexels.com/photos/1547570/pexels-photo-1547570.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
            name: "James Rodriguez",
            role: "DevOps Specialist",
            status: "Active now"
        },
        {
            id: 8,
            x: "14%",
            y: "82%",
            delay: 3.5,
            hue: 90,
            imageUrl: "https://images.pexels.com/photos/1499327/pexels-photo-1499327.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
            name: "Olivia Parker",
            role: "Data Scientist",
            status: "Focus mode"
        },
    ];

    return (
        <>
            {orbPositions.map((orb) => (
                <motion.div
                    key={orb.id}
                    className="absolute z-20"
                    style={{ left: orb.x, top: orb.y }}
                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        rotate: 0,
                        y: [0, -8, 0],
                        x: [0, 4, 0],
                    }}
                    transition={{
                        delay: orb.delay,
                        duration: 0.8,
                        type: "spring",
                        stiffness: 100,
                        y: {
                            duration: 4 + Math.random() * 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: Math.random() * 2,
                        },
                        x: {
                            duration: 6 + Math.random() * 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: Math.random() * 3,
                        }
                    }}
                >
                    <div
                        className="relative"
                        onMouseEnter={() => setHoveredAvatar(orb.id)}
                        onMouseLeave={() => setHoveredAvatar(null)}
                    >
                        <motion.div
                            className="relative"
                            whileHover={{ scale: 1.1, zIndex: 30 }}
                            transition={{ type: "spring", stiffness: 400 }}
                            style={{ width: '80px', height: '80px' }}
                        >
                            <Orb
                                hoverIntensity={0.3}
                                rotateOnHover={true}
                                hue={orb.hue}
                                forceHoverState={false}
                                imageUrl={orb.imageUrl}
                            />
                        </motion.div>

                        {/* Hover details card */}
                        {hoveredAvatar === orb.id && (
                            <motion.div
                                className="absolute top-0 left-full ml-4 w-64 bg-black/90 backdrop-blur-sm rounded-xl p-4 shadow-lg z-30 border border-white/10"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <div className="flex items-center">
                                    <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                                        <img
                                            src={orb.imageUrl}
                                            alt={`Team member ${orb.name}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold">{orb.name}</h3>
                                        <p className="text-sm text-purple-400">{orb.role}</p>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <div className="flex items-center text-sm">
                                        <div className={`w-2 h-2 rounded-full mr-2 ${orb.status.includes("Active") ? "bg-green-500" : "bg-gray-500"}`}></div>
                                        <span className="text-gray-300">{orb.status}</span>
                                    </div>
                                    {/* <div className="mt-3 flex space-x-2">
                                        <Button variant="outline" size="sm" className="text-xs flex-1 bg-black/50 border-white/10">
                                            Message
                                        </Button>
                                        <Button variant="outline" size="sm" className="text-xs flex-1 bg-black/50 border-white/10">
                                            Profile
                                        </Button>
                                    </div> */}
                                </div>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            ))}
        </>
    );
}

export function LandingPage() {
    return (
        <div className="h-screen w-screen bg-black flex flex-col justify-center overflow-hidden">
            {/* Navigation Bar */}
            {/* <NavBar /> */}

            <div className="w-full h-screen relative flex-1 flex items-center justify-center px-4 pt-16">
                {/* Irregular Circle Background Paths */}
                <IrregularCirclePaths />

                {/* Floating Avatars */}
                <FloatingAvatars />
            </div>
        </div>
    );
}