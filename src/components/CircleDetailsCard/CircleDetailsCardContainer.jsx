import React, { useLayoutEffect, useState } from 'react'
import CircleDetailsCardPresentational from './CircleDetailsCardPresentational'

function CircleDetailsCardContainer({ orb, hoveredAvatar, isRTLState, avatarRefs }) {
    const [cardDirection, setCardDirection] = useState({});
    const cardWidth = 260;
    const cardHeight = 120;

    useLayoutEffect(() => {
        if (!hoveredAvatar || hoveredAvatar !== orb.id) {
            return;
        }

        // Add a small delay to ensure the ref is set
        const calculatePosition = () => {
            const avatarEl = avatarRefs.current[hoveredAvatar];
            if (!avatarEl) {
                // Try again after a short delay
                setTimeout(calculatePosition, 10);
                return;
            }

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

            if (isRTLState) {
                // In RTL, prioritize left side first (which is natural reading direction)
                if (space.left >= cardWidth + padding) direction = "left";
                else if (space.right >= cardWidth + padding) direction = "right";
                else if (space.bottom >= cardHeight + padding) direction = "bottom";
                else if (space.top >= cardHeight + padding) direction = "top";
                else direction = "bottom"; // fallback
            } else {
                // In LTR, prioritize right side first (original behavior)
                if (space.right >= cardWidth + padding) direction = "right";
                else if (space.left >= cardWidth + padding) direction = "left";
                else if (space.bottom >= cardHeight + padding) direction = "bottom";
                else if (space.top >= cardHeight + padding) direction = "top";
                else direction = "bottom"; // fallback
            }


            setCardDirection((prev) => ({ ...prev, [hoveredAvatar]: direction }));
        };

        calculatePosition();
    }, [hoveredAvatar, isRTLState, orb.id, avatarRefs, cardWidth, cardHeight]);

    // Only render if this orb is hovered
    if (hoveredAvatar !== orb.id) {
        return null;
    }

    // Get position classes based on direction and RTL state
    const getPositionClasses = (direction) => {
        switch (direction) {
            case "right":
                // Card appears to the right of orb
                return "left-full ml-4 top-1/2 -translate-y-1/2";
            case "left":
                // Card appears to the left of orb
                return "right-full mr-4 top-1/2 -translate-y-1/2";
            case "top":
                // Card appears above orb
                return isRTLState
                    ? "bottom-full mb-4 right-1/2 translate-x-1/2"
                    : "bottom-full mb-4 left-1/2 -translate-x-1/2";
            case "bottom":
            default:
                // Card appears below orb
                return isRTLState
                    ? "top-full mt-4 right-1/2 translate-x-1/2"
                    : "top-full mt-4 left-1/2 -translate-x-1/2";
        }
    };

    // Use calculated direction or default to "right"
    const direction = cardDirection[orb.id] || "right";
    const positionClasses = getPositionClasses(direction);


    return (
        <CircleDetailsCardPresentational
            positionClasses={positionClasses}
            isRTLState={isRTLState}
            orb={orb}
        />
    )
}

export default CircleDetailsCardContainer
