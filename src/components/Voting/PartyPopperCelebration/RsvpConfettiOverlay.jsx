import React, { useState, useEffect } from "react";

const CONFETTI_OPTIONS = [
  { color: "bg-green-500", name: "Yes" },
  { color: "bg-yellow-500", name: "Maybe" },
  { color: "bg-red-500", name: "No" },
  { color: "bg-blue-500", name: "Blue" },
];

const RsvpConfettiOverlay = ({ count = 160 }) => {
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    const newConfetti = Array.from({ length: count }).map((_, index) => {
      const left = Math.random() * 100;
      const delay = Math.random() * 1.5;
      const duration = 2 + Math.random() * 2.5;
      const rotation = Math.random() * 360;

      // Select a random RSVP card option
      const cardOption = CONFETTI_OPTIONS[Math.floor(Math.random() * CONFETTI_OPTIONS.length)];

      const style = {
        left: `${left}vw`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        transform: `rotate(${rotation}deg)`,
      };

      return (
        <div
          key={index}
          style={style}
          // The card itself is a small pixel block
          className={`absolute top-0 opacity-0 animate-card-fall z-50 w-3 h-3
                      ${cardOption.color}`}
        />
      );
    });

    setConfetti(newConfetti);

    const timeout = setTimeout(() => {
      setConfetti([]);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [count]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {confetti}
    </div>
  );
};

// Custom CSS for the pixelated card fall animation
const style = document.createElement('style');
style.innerHTML = `
  @keyframes card-fall {
    0% {
      transform: translateY(-100vh) rotate(0deg) scale(0.5);
      opacity: 0;
      box-shadow: 0 0 0 transparent;
    }
    10% {
      opacity: 1;
    }
    100% {
      transform: translateY(100vh) rotate(720deg) scale(1.2);
      opacity: 0;
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
    }
  }

  .animate-card-fall {
    animation-name: card-fall;
    animation-timing-function: cubic-bezier(0.1, 0.9, 0.4, 1.2);
    animation-fill-mode: forwards;
  }
`;
document.head.appendChild(style);


export default RsvpConfettiOverlay;
