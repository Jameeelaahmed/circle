import { motion as Motion } from "framer-motion";
import { useMemo } from "react";

export default function IrregularCirclePaths() {
  // Simplified path generation with fewer calculations
  const generateSimplePath = useMemo(() => {
    return (radius, centerX, centerY, variation, index) => {
      const points = [];
      const steps = 24; // Drastically reduced from 60

      for (let i = 0; i <= steps; i++) {
        const angle = (i / steps) * Math.PI * 2;

        // Single sine wave for variation - much simpler
        const radiusVar = Math.sin(angle * 4 + index) * variation;
        const currentRadius = radius + radiusVar;

        const x = Math.round(centerX + Math.cos(angle) * currentRadius);
        const y = Math.round(centerY + Math.sin(angle) * currentRadius);

        points.push(`${x},${y}`);
      }

      return `M${points.join(" L")}Z`;
    };
  }, []);

  // More visible layers
  const pathLayers = useMemo(() => {
    const centerX = 400;
    const centerY = 400;

    return Array.from({ length: 8 }, (_, i) => ({ // Increased to 8 layers
      id: i,
      path: generateSimplePath(80 + i * 30, centerX, centerY, 20, i),
      delay: i * 0.8,
      duration: 8 + i * 1.5,
      opacity: 0.25 + i * 0.08,
    }));
  }, [generateSimplePath]);

  // Much fewer particles with simpler motion
  const particles = useMemo(() => {
    const centerX = 400;
    const centerY = 400;

    return Array.from({ length: 6 }, (_, i) => { // Only 6 particles
      const angle = (i / 6) * Math.PI * 2;
      const radius = 150;

      return {
        id: i,
        startX: centerX + Math.cos(angle) * radius,
        startY: centerY + Math.sin(angle) * radius,
        delay: i * 0.5,
      };
    });
  }, []);

  return (
    <div className="absolute inset-0 flex justify-center overflow-hidden opacity-20">
      <svg
        className="h-full w-full"
        viewBox="0 0 800 800"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Simplified gradient */}
          <radialGradient id="simpleGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
          </radialGradient>
        </defs>

        {/* More visible path layers */}
        {pathLayers.map((layer) => (
          <Motion.path
            key={layer.id}
            d={layer.path}
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1, 0],
              opacity: [0, layer.opacity, 0]
            }}
            transition={{
              duration: layer.duration,
              repeat: Infinity,
              delay: layer.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Simple floating particles - just opacity animation */}
        {particles.map((particle) => (
          <Motion.circle
            key={particle.id}
            r="2"
            cx={particle.startX}
            cy={particle.startY}
            fill="rgba(255,255,255,0.6)"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}

        {/* Simple center pulse - just 2 elements */}
        {[0, 1].map((i) => (
          <Motion.circle
            key={i}
            r={20 + i * 15}
            cx={400}
            cy={400}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1.5, 0],
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 2,
            }}
          />
        ))}
      </svg>
    </div>
  );
}
