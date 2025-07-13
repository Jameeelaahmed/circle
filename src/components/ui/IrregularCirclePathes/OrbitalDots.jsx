import React from 'react';
import { motion as Motion } from "framer-motion";

export default function OrbitalDots({ centerX, centerY, count = 12 }) {
    return (
        <>
            {Array.from({ length: count }, (_, i) => {
                const orbitRadius = 180 + Math.sin(i * 0.5) * 40;
                const orbitSpeed = 12 + Math.random() * 6;
                const startAngle = i * Math.PI / 6;

                return (
                    <Motion.circle
                        key={`orbit-${i}`}
                        r="1.8"
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
        </>
    );
}
