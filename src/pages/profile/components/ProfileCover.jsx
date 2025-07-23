import React from "react";
import { Camera } from "lucide-react";
import { COLORS, SHADOWS, RADII } from "../../../constants";

const ProfileCover = ({ coverImage }) => {
  const handleHover = (e, shadow) => {
    e.target.style.boxShadow = shadow;
  };

  const handleLeave = (e, originalShadow = "none") => {
    e.target.style.boxShadow = originalShadow;
  };

  return (
    <div
      className="relative h-32 overflow-hidden sm:h-48 md:h-56 lg:h-64"
      style={{
        backgroundImage: `url(${coverImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: `0 0 ${RADII.rounded} ${RADII.rounded}`,
      }}
    >
      <div className="bg-opacity-40 absolute inset-0"></div>
      <button
        className="absolute top-2 right-2 rounded-full p-1.5 transition-all duration-300 sm:top-4 sm:right-4 sm:p-2"
        style={{
          backgroundColor: COLORS.glass,
          backdropFilter: "blur(10px)",
          borderRadius: RADII.pill,
        }}
        onMouseEnter={(e) => handleHover(e, SHADOWS.btnSecondaryHover)}
        onMouseLeave={(e) => handleLeave(e)}
      >
        <Camera className="h-4 w-4 text-white sm:h-5 sm:w-5" />
      </button>
    </div>
  );
};

export default ProfileCover;
