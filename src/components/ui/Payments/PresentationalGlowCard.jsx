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
      className={`group relative rounded-lg inset-shadow-xs  inset-shadow-primary p-3 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      z
    >
      {/* Spotlight effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-lg opacity-20 transition duration-300 group-hover:opacity-100"
        style={{
          backgroundColor: color,
          maskImage: useMotionTemplate`
            radial-gradient(
              ${radius}px circle at ${mouseX}px ${mouseY}px,
              var(--color-text),
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
          <div className="absolute inset-0 rounded-lg opacity-0" />
          <div className="absolute inset-0 rounded-lg " />
        </motion.div>
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
export default GlowCardPresentational;
