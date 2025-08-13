import React from "react";

import BackgroundHoverEffect from "../../components/ui/ReactBits/BackgroundHoverEffect/BackgroundHoverEffect";

export default function Notfound() {
  
  return (
    <BackgroundHoverEffect
      textAutoHide={true}
      enableStars={true}
      enableSpotlight={true}
      enableBorderGlow={true}
      enableTilt={true}
      enableMagnetism={true}
      clickEffect={true}
      spotlightRadius={300}
      particleCount={12}
      glowColor="132, 0, 255"
    >
     
    </BackgroundHoverEffect>
  );
}
