import { motion as Motion } from "framer-motion";
import CirclePathDefinitions from "./CirclePathDefinitions";
import FloatingParticles from "./FloatingParticles";
import CentralPulsingElements from "./CentralPulsingElements";
import OrbitalDots from "./OrbitalDots";
import {
  generateIrregularCirclePath,
  generatePathLayers,
} from "./utils/pathUtils";

export default function LandingIrregularCirclePaths() {
  // Configuration
  const centerX = 400;
  const centerY = 400;
  const pathLayers = generatePathLayers(12);

  return (
    <div className="inset-0 flex scale-[0.85] transform justify-center overflow-hidden opacity-30">
      {" "}
      {/* Reduced size */}
      <svg
        className="h-screen w-full"
        viewBox="0 0 800 800"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <CirclePathDefinitions />

        {pathLayers.map((layer) => (
          <Motion.path
            key={layer.id}
            d={generateIrregularCirclePath(
              layer.radius,
              centerX,
              centerY,
              layer.irregularity,
              layer.pathIndex,
            )}
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
        <FloatingParticles centerX={centerX} centerY={centerY} count={18} />

        {/* Central pulsing elements */}
        <CentralPulsingElements centerX={centerX} centerY={centerY} count={5} />

        {/* Connecting orbital dots */}
        <OrbitalDots centerX={centerX} centerY={centerY} count={12} />
      </svg>
    </div>
  );
}
