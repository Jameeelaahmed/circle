import {motion} from "framer-motion"

export default function FloatingAvatars() {
    const avatars = [
        {
            id: 1,
            src: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
            x: "20%",
            y: "25%",
            delay: 0,
        },
        {
            id: 2,
            src: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
            x: "40%",
            y: "15%",
            delay: 0.5,
        },
        {
            id: 3,
            src: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
            x: "70%",
            y: "25%",
            delay: 1,
        },
        {
            id: 4,
            src: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
            x: "12%",
            y: "50%",
            delay: 1.5,
        },
        {
            id: 5,
            src: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
            x: "60%",
            y: "40%",
            delay: 2,
        },
        {
            id: 6,
            src: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
            x: "40%",
            y: "80%",
            delay: 2.5,
        },
        {
            id: 8,
            src: "https://images.pexels.com/photos/1499327/pexels-photo-1499327.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
            x: "75%",
            y: "60%",
            delay: 3.5,
        },
    ];

    return (
        <>
            {avatars.map((avatar) => (
                <motion.div
                    key={avatar.id}
                    className="absolute w-12 h-12 rounded-full overflow-hidden border-2 border-white/30 shadow-xl z-20"
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
                        className="w-full h-full object-cover"
                    />
                </motion.div>
            ))}
        </>
    );
}
