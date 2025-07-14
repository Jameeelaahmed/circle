import React from 'react';

const ShinyText = ({ text, disabled = false, speed = 5, className = '' }) => {
  const animationStyle = {
    backgroundImage:
      'linear-gradient(120deg, rgba(255,255,255,0) 40%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 60%)',
    backgroundSize: '200% 100%',
    backgroundPosition: '100%',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    display: 'inline-block',
    animation: disabled ? 'none' : `shine ${speed}s linear infinite`,
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
