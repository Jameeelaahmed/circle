import styled from "styled-components";
import { useRef } from "react";

const RecordBtn = ({ isRecording, onStart, onStop }) => {
  const buttonRef = useRef(null);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isRecording) {
      console.log('RecordBtn: Stopping recording');
      onStop && onStop();
    } else {
      console.log('RecordBtn: Starting recording');
      onStart && onStart();
    }
  };

  return (
    <StyledWrapper>
      <button
        ref={buttonRef}
        onClick={handleClick}
        className={isRecording ? 'recording' : ''}
        type="button"
      >
        <div className="svg-wrapper-1">
          <div className="svg-wrapper">
            <svg
              height={24}
              width={24}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                d="M12 2a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3zM19 11a1 1 0 0 1 2 0v1a7 7 0 0 1-6 6.93V21h4a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2h4v-2.07A7 7 0 0 1 3 12v-1a1 1 0 0 1 2 0v1a5 5 0 0 0 10 0v-1a1 1 0 0 1 2 0z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  button {
    font-family: inherit;
    font-size: 20px;
    color: var(--color-text);
    padding: 0.8em 1.2em;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: var(--rounded-pill);
    box-shadow: var(--shadow-main);
    transition: all 0.3s;
    background: linear-gradient(135deg, #25d366, #128c7e);
    user-select: none;
    cursor: pointer;
  }

  button:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-main);
    padding: 0em;
  }

  button:active {
    transform: scale(0.95);
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  }

  button.recording {
    background: linear-gradient(135deg, #ff4757, #c44569);
    animation: pulse 1.5s infinite;
    transform: scale(1.1);
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(255, 71, 87, 0.7);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(255, 71, 87, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(255, 71, 87, 0);
    }
  }

  button svg {
    width: 18px;
    height: 18px;
    fill: var(--color-text);
    transition: all 0.3s;
  }

  button .svg-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.2);
    transition: all 0.3s;
  }

  button:hover .svg-wrapper {
    background-color: rgba(255, 255, 255, 0.3);
    width: 54px;
    height: 54px;
  }

  button:hover svg {
    width: 25px;
    height: 25px;
  }

  button.recording .svg-wrapper {
    background-color: rgba(255, 255, 255, 0.3);
    width: 54px;
    height: 54px;
  }

  button.recording svg {
    width: 25px;
    height: 25px;
  }
`;

export default RecordBtn;
