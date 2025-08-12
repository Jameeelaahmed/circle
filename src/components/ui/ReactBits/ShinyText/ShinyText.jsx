import React from "react";
import { useTranslation } from "react-i18next";

const ShinyText = ({ text, disabled = false, speed = 4, className = "" }) => {
  const { i18n } = useTranslation();
  const direction = i18n.dir(); // 'ltr' or 'rtl'

  const animationName = direction === "rtl" ? "shine-rtl" : "shine";

  const animationStyle = {
    backgroundImage:
      "linear-gradient(120deg, rgba(255,255,255,0) 40%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 60%)",
    backgroundSize: "200% 100%",
    backgroundPosition: "100%",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "rgba(255, 255, 255, 0.055)",
    display: "inline-block",
    animation: disabled ? "none" : `${animationName} ${speed}s linear infinite`,
  };

  return (
    <>
      {!disabled && (
        <style>
          {`
            @keyframes shine {
              0% {
                background-position: 100%;
              }
              100% {
                background-position: -100%;
              }
            }

            @keyframes shine-rtl {
              0% {
                background-position: -100%;
              }
              100% {
                background-position: 100%;
              }
            }
          `}
        </style>
      )}
      <span className={`text-white ${className}`} style={animationStyle}>
        {text}
      </span>
    </>
  );
};

export default ShinyText;
