import React from "react";
import { ChartColumn } from "lucide-react";
import ShinyText from "../../ui/ReactBits/ShinyText/ShinyText";

const DefaultState = ({ onStartPoll }) => {
  return (
    <div
      className="bg-glassmorphism animate-fade-slide-in flex h-[240px] flex-col items-center justify-center rounded-t-[var(--rounded-largeRounded)] p-10 shadow-[var(--shadow-glassCard)]"
      style={{
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <h2
        className="font-primary mb-10 text-center text-3xl font-semibold text-[var(--color-text)] drop-shadow-md select-none"
        style={{ fontFamily: "var(--font-primary)" }}
      >
        <ShinyText text="What’s the plan?" />
      </h2>
      <button
        onClick={onStartPoll}
        className="font-secondary shadow-inset-primary hover:shadow-inset-primary-hover relative flex cursor-pointer items-center gap-3 rounded-[var(--rounded-pill)] bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] px-12 py-4 text-lg font-bold text-[var(--color-dark)] transition duration-300 ease-in-out select-none hover:brightness-110 focus:outline-none active:scale-95"
        style={{ fontFamily: "var(--font-secondary)" }}
        aria-label="Start a new poll"
      >
        <ChartColumn className="animate-float h-6 w-6" strokeWidth={2} />
        Let’s make it official!
      </button>

      <style>{`
  .shadow-inset-primary {
    box-shadow: inset 0 0 15px rgba(172, 159, 250, 0.7);
  }
  .shadow-inset-primary-hover {
    box-shadow: inset 0 0 25px rgba(247, 143, 179, 0.85);
  }
`}</style>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .bg-glassmorphism {
          background: rgba(22, 23, 30, 0.6);
          border-radius: var(--rounded-largeRounded);
        }
      `}</style>
    </div>
  );
};

export default DefaultState;
