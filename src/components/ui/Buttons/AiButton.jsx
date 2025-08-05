import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="spinner">
        <div className="spinner1" />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .spinner {
    background-image: linear-gradient(var(--color-primary) 35%, var(--color-secondary));
    width: 30px;
    height: 30px;
    animation: spinning82341 1.7s linear infinite;
    text-align: center;
    border-radius: var(--rounded-pill);
    filter: blur(1px);
    box-shadow: 
      0px -5px 20px 0px var(--color-primary), 
      0px 5px 20px 0px var(--color-secondary);
  }

  .spinner1 {
    background-color: var(--color-main);
    width: 30px;
    height: 30px;
    border-radius: var(--rounded-pill);
    filter: blur(2px);
  }

  @keyframes spinning82341 {
    to {
      transform: rotate(360deg);
    }
  }
`;

export default Loader;
