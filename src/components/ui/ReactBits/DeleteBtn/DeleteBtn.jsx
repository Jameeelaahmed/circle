import styled from "styled-components";

const DeleteBtn = ({ onDelete }) => {
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete && onDelete();
  };

  return (
    <StyledWrapper>
      <button
        onClick={handleClick}
        type="button"
        title="Delete recording"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 6h18m-2 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2m-6 5v6m4-6v6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border: none;
    border-radius: 50%;
    background: linear-gradient(135deg, #ff4757, #c44569);
    color: var(--color-text);
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(255, 71, 87, 0.3);
  }

  button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 71, 87, 0.4);
    background: linear-gradient(135deg, #ff3742, #b73e5a);
  }

  button:active {
    transform: scale(0.95);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

export default DeleteBtn;
