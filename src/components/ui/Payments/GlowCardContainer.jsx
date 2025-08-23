import { useMotionValue } from "framer-motion";
import GlowCardPresentational from "./PresentationalGlowCard";
import { useState } from "react";

function GlowCardContainer({
  children,
  radius = 450,
  color = "#ac9ffa",
  className,
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  return (
    <GlowCardPresentational
      mouseX={mouseX}
      mouseY={mouseY}
      isHovering={isHovering}
      handleMouseMove={handleMouseMove}
      handleMouseEnter={handleMouseEnter}
      handleMouseLeave={handleMouseLeave}
      radius={radius}
      color={color}
      className={className}
    >
      {children}
    </GlowCardPresentational>
  );
}
export default GlowCardContainer;
