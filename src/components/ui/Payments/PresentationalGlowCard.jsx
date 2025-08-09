import { motion, useMotionTemplate } from "framer-motion";
function GlowCardPresentational({
  handleMouseMove,
  handleMouseEnter,
  handleMouseLeave,
  mouseX,
  mouseY,
  isHovering,
  children,
  radius,
  color,
  className,
}) {
  return (
    <div
      className={`group relative rounded-lg border border-neutral-800 bg-black p-6 transition-all duration-300 hover:border-neutral-700 ${className} w-full`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Spotlight effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-lg opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          backgroundColor: color,
          maskImage: useMotionTemplate`
            radial-gradient(
              ${radius}px circle at ${mouseX}px ${mouseY}px,
              white,
              transparent 80%
            )
          `,
        }}
      />

      {/* Animated dots effect on hover */}
      {isHovering && (
        <motion.div
          className="absolute inset-0 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-50" />
          <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/50 to-transparent" />
        </motion.div>
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
export default GlowCardPresentational;
