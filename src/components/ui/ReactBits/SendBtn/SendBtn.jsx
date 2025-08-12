import styled from "styled-components";

const SendBtn = () => {
  return (
    <StyledWrapper>
      <button>
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
                d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
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
    color: white;
    padding: 0.8em 1.2em;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: var(--rounded-pill);
    box-shadow: var(--shadow-main);
    transition: all 0.3s;
  }

  button:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-main);
    padding: 0em;
    cursor: pointer;
  }

  button:active {
    transform: scale(0.95);
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  }

  button span {
    display: block;
    margin-left: 0.4em;
    transition: all 0.3s;
  }

  button:hover span {
    scale: 0;
    font-size: 0%;
    opacity: 0;
    transition: all 0.5s;
  }

  button svg {
    width: 18px;
    height: 18px;
    fill: white;
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
    background-color: var(--color-primary);
    width: 54px;
    height: 54px;
  }

  button:hover svg {
    width: 25px;
    height: 25px;
    margin-right: 5px;
    transform: rotate(45deg);
  }
`;

export default SendBtn;
