import React from 'react';
import { motion as Motion } from "framer-motion";

export default function CentralPulsingElements({ centerX, centerY, count = 5 }) {
    return (
        <>
            {Array.from({ length: count }, (_, i) => (
                <Motion.circle
                    key={`center-${i}`}
                    r={6 + i * 3}
                    fill="none"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="1"
                    cx={centerX}
                    cy={centerY}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: [0, 0.6, 0],
                        scale: [0.5, 1.3, 1.7],
                    }}
                    transition={{
                        duration: 4 + i * 0.5,
                        repeat: Infinity,
                        delay: i * 0.8,
                        ease: "easeOut",
                    }}
                />
            ))}
        </>
    );
}
