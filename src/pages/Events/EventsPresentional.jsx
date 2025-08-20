
import BackgroundHoverEffect from "./BackgroundHover";

function EventsPresentional({ calendarApp ,circlesInfo }) {
    
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
      calendarApp={calendarApp} circlesInfo={circlesInfo}
    ></BackgroundHoverEffect>
  );
}

export default EventsPresentional;
