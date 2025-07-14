import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import EmojiPicker from 'emoji-picker-react';
import { SmilePlus } from 'lucide-react';

const Input = ({ label, value, onChange }) => {
  const [showPicker, setShowPicker] = useState(false);
  const inputRef = useRef(null);

  const handleEmojiClick = (emojiData) => {
    const emoji = emojiData.emoji;
    onChange({ target: { value: value + emoji } });
    setShowPicker(false);
    inputRef.current.focus();
  };

  return (
    <StyledWrapper>
      <div className="input-container">
        <input
          ref={inputRef}
          type="text"
          id="input"
          value={value}
          onChange={onChange}
          placeholder=" "  
        />
        <label htmlFor="input" className="label">{label}</label>
        <div className="underline" />
        <span
          className="emoji-icon"
          onClick={() => setShowPicker(!showPicker)}
        >
          <SmilePlus />
        </span>

        {showPicker && (
          <div className="emoji-picker">
            <EmojiPicker onEmojiClick={handleEmojiClick} height={300} width={250} />
          </div>
        )}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  width: 100%;

  .input-container {
    position: relative;
    margin: 50px auto;
    width: 100%;
  }

  .input-container input[type="text"] {
    font-size: 20px;
    width: 100%;
    border: none;
    border-bottom: 2px solid #ccc;
    padding: 5px 35px 5px 0;
    background-color: transparent;
    outline: none;
  }

  .input-container .label {
    position: absolute;
    top: 0;
    left: 0;
    color: #ccc;
    transition: all 0.3s ease;
    pointer-events: none;
  }

  .input-container input[type="text"]:focus ~ .label,
  .input-container input[type="text"]:not(:placeholder-shown) ~ .label {
    top: -20px;
    font-size: 16px;
    color: #333;
  }

  .input-container .underline {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    width: 100%;
    background-color: #333;
    transform: scaleX(0);
    transition: all 0.3s ease;
  }

  .input-container input[type="text"]:focus ~ .underline,
  .input-container input[type="text"]:not(:placeholder-shown) ~ .underline {
    transform: scaleX(1);
  }

  .emoji-icon {
    position: absolute;
    right: 5px;
    top: 8px;
    font-size: 20px;
    cursor: pointer;
  }

  .emoji-picker {
    position: absolute;
    top: 40px;
    right: 0;
    z-index: 1000;
  }
`;

export default Input;
