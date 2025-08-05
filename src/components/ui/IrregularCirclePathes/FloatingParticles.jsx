import React from "react";
import { motion as Motion } from "framer-motion";

export default function FloatingParticles({ centerX, centerY, count = 18 }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const particleRadius = 100 + i * 12;
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
    </>
  );
}
