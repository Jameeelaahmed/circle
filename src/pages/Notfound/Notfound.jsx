import React from "react";

import BackgroundHoverEffect from "../../components/ui/ReactBits/BackgroundHoverEffect/BackgroundHoverEffect";
import { Helmet } from "react-helmet";

export default function Notfound() {
  return (
    <>
    <Helmet>
      <title>
        Page Not Found
      </title>
      <meta name="description" content="The page you are looking for does not exist." />
    </Helmet>
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
      ></BackgroundHoverEffect>
    </>
  );
}
