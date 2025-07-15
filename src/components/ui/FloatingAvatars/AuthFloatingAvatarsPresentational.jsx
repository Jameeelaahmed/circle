import { motion as Motion } from "framer-motion";
export default function AuthFloatingAvatarsPresentational({ avatars }) {
  return (
    <>
      {avatars.map((avatar) => (
        <Motion.div
          key={avatar.id}
          className="absolute z-20 h-12 w-12 overflow-hidden rounded-full border-2 border-white/30 shadow-xl"
          style={{ left: avatar.x, top: avatar.y }}
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: 0,
            y: [0, -8, 0],
            x: [0, 4, 0],
          }}
          transition={{
            delay: avatar.delay,
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
            },
          }}
        >
          <img
            src={avatar.src}
            alt={`Team member ${avatar.id}`}
            className="h-full w-full object-cover"
          />
        </Motion.div>
      ))}
    </>
  );
}
