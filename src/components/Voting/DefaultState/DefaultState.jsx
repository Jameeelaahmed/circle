import { ChartColumn } from "lucide-react";
import styled from "styled-components";


const DefaultState = ({ onStartPoll }) => {
  return (
    <StyledWrapper>
      <div className="tooltip-container" onClick={onStartPoll}>
        <span className="tooltip">Start Poll</span>
        <div className="text "
        >

          <div className="mt-[-8px] bg-main p-4 rounded-full"
            style={{
              background: `radial-gradient(ellipse at top,var(--color-main-card-top)   0%, var(--color-main-card)  60%)`,
              backdropFilter: "blur(10px)",
            }}
          >
            <ChartColumn className="animate-float h-5 w-5" strokeWidth={2} />
          </div>
        </div>
        <span>Let's hang out!</span>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .tooltip-container {
    --background: var(--color-glass);
    --color: var(--color-primary);
    position: relative;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
    font-size: 18px;
    font-weight: 600;
    color: var(--color);
    padding: 0.7em 1.8em;
    border-radius: var(--rounded-rounded);
    text-transform: uppercase;
    height: 60px;
    width: 180px;
    display: grid;
    place-items: center;
    background-color: transparent;
  }

  .text {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    transform: scale(1);
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .tooltip-container span:last-child {
    position: absolute;
    top: 0%;
    left: 100%;
    width: 100%;
    height: 100%;
    border-radius: var(--rounded-rounded);
    opacity: 1;
    background-color: var(--background);
    z-index: -1;
    border: 2px solid var(--background);
    transform: scale(0);
    transform-origin: 0;
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
    display: grid;
    place-items: center;
    color: var(--color-primary);
  }

  .tooltip {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    padding: 0.3em 0.6em;
    opacity: 0;
    pointer-events: none;
    background: var(--color-primary);
    color: #081020;
    border-radius: var(--rounded-rounded);
    scale: 0;
    transform-origin: 0 0;
    text-transform: capitalize;
    font-weight: 400;
    font-size: 16px;
    box-shadow: var(--shadow-main);
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .tooltip::before {
    position: absolute;
    content: "";
    height: 0.6em;
    width: 0.6em;
    bottom: -0.2em;
    left: 50%;
    transform: translate(-50%) rotate(45deg);
    background: var(--color-primary);
  }

  .tooltip-container:hover .tooltip {
    top: -100%;
    opacity: 1;
    pointer-events: auto;
    scale: 1;
    animation: shake 0.5s ease-in-out both;
  }

  .tooltip-container:hover {
    box-shadow: 3px 2px 5px #081020;
    color: var(--color-text);
    border-color: transparent;
    background-color:transparent ;
  }

  .tooltip-container:hover span:last-child {
    transform: scale(1);
    left: 0;
  }

  .tooltip-container:hover .text {
    opacity: 0;
    transform: scale(0);
  }

  @keyframes shake {
    0% {
      rotate: 0;
    }
    25% {
      rotate: 7deg;
    }
    50% {
      rotate: -7deg;
    }
    75% {
      rotate: 1deg;
    }
    100% {
      rotate: 0;
    }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
  }
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
`;

export default DefaultState;
