import { motion as Motion } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import OrbContainer from "../Orb/OrbContainer";

function PresentaionalLandingContainer({ avatars, hoveredAvatar, setHoveredAvatar }) {
    const [cardDirection, setCardDirection] = useState({});
    const avatarRefs = useRef({});
    const cardWidth = 260;
    const cardHeight = 120;

    useLayoutEffect(() => {
        if (!hoveredAvatar) return;

        const avatarEl = avatarRefs.current[hoveredAvatar];
        if (!avatarEl) return;

        const rect = avatarEl.getBoundingClientRect();
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const padding = 16;

        const space = {
            right: vw - rect.right,
            left: rect.left,
            top: rect.top,
            bottom: vh - rect.bottom,
        };

        let direction = "right";
        if (space.right >= cardWidth + padding) direction = "right";
        else if (space.left >= cardWidth + padding) direction = "left";
        else if (space.bottom >= cardHeight + padding) direction = "bottom";
        else if (space.top >= cardHeight + padding) direction = "top";
        else direction = "bottom"; // fallback

        setCardDirection((prev) => ({ ...prev, [hoveredAvatar]: direction }));
    }, [hoveredAvatar]);

    return (
        <>
            {avatars.map((orb) => (
                <Motion.div
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
                        },
                    }}
                >
                    <div
                        className="relative"
                        ref={(el) => (avatarRefs.current[orb.id] = el)}
                        onMouseEnter={() => setHoveredAvatar(orb.id)}
                        onMouseLeave={() => setHoveredAvatar(null)}
                    >
                        <Motion.div
                            className="relative"
                            whileHover={{ scale: 1.1, zIndex: 30 }}
                            transition={{ type: "spring", stiffness: 400 }}
                            style={{ width: "120px", height: "120px" }}
                        >
                            <OrbContainer
                                hoverIntensity={0.3}
                                rotateOnHover={true}
                                hue={orb.hue}
                                forceHoverState={false}
                                imageUrl={orb.imageUrl}
                            />
                        </Motion.div>

                        {/* Hover card */}
                        {hoveredAvatar === orb.id && (() => {
                            const direction = cardDirection[orb.id];
                            let positionClasses = "";

                            switch (direction) {
                                case "right":
                                    positionClasses = "left-full ml-4 top-1/2 -translate-y-1/2";
                                    break;
                                case "left":
                                    positionClasses = "right-full mr-4 top-1/2 -translate-y-1/2";
                                    break;
                                case "top":
                                    positionClasses = "bottom-full mb-4 left-1/2 -translate-x-1/2";
                                    break;
                                case "bottom":
                                default:
                                    positionClasses = "top-full mt-4 left-1/2 -translate-x-1/2";
                            }

                            return (
                                <Motion.div
                                    className={`absolute ${positionClasses} w-64 bg-black/90 backdrop-blur-sm rounded-xl p-4 shadow-lg z-30 border border-white/10`}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
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
                                    </div>
                                </Motion.div>
                            );
                        })()}
                    </div>
                </Motion.div>
            ))}
        </>
    );
}

export default PresentaionalLandingContainer;
