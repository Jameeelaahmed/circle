import React, { useState, useRef } from "react";
import styled, { css } from "styled-components";
import EmojiPicker from "emoji-picker-react";
import { SmilePlus } from "lucide-react";
import { useTranslation } from "react-i18next";

const Input = ({ label, value, onChange }) => {
  const { i18n } = useTranslation();
  const direction = i18n.dir(); // 'ltr' or 'rtl'
  const [showPicker, setShowPicker] = useState(false);
  const inputRef = useRef(null);

  const handleEmojiClick = (emojiData) => {
    const emoji = emojiData.emoji;
    onChange({ target: { value: value + emoji } });
    setShowPicker(false);
    inputRef.current.focus();
  };

  return (
    <StyledWrapper $dir={direction}>
      <div className="input-container text-text-primary">
        <input
          ref={inputRef}
          type="text"
          id="input"
          value={value}
          onChange={onChange}
          placeholder=" "
          dir={direction}
        />
        <label htmlFor="input" className="label text-primary">
          {label}
        </label>
        <div className="underline" />
        <span
          className="emoji-icon text-text"
          onClick={() => setShowPicker(!showPicker)}
        >
          <SmilePlus />
        </span>

        {showPicker && (
          <div className="emoji-picker">
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              height={300}
              width={250}
            />
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
    margin: 25px auto;
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

    ${({ $dir }) =>
    $dir === "rtl" &&
    css`
        padding: 5px 0 5px 35px;
      `}
  }

  .input-container .label {
    position: absolute;
    top: 0;
    color: #fffff;
    transition: all 0.3s ease;
    pointer-events: none;

    ${({ $dir }) =>
    $dir === "rtl"
      ? css`
            right: 0;
            left: auto;
          `
      : css`
            left: 0;
            right: auto;
          `}
  }

  .input-container input[type="text"]:focus ~ .label,
  .input-container input[type="text"]:not(:placeholder-shown) ~ .label {
    top: -20px;
    font-size: 16px;
    color: #fffff;
  }

  .input-container .underline {
    position: absolute;
    bottom: 0;
    height: 2px;
    width: 100%;
    background-color: #333;
    transform: scaleX(0);
    transition: all 0.3s ease;

    ${({ $dir }) =>
    $dir === "rtl"
      ? css`
            right: 0;
            left: auto;
          `
      : css`
            left: 0;
            right: auto;
          `}
  }

  .input-container input[type="text"]:focus ~ .underline,
  .input-container input[type="text"]:not(:placeholder-shown) ~ .underline {
    transform: scaleX(1);
  }

  .emoji-icon {
    position: absolute;
    top: 8px;
    font-size: 20px;
    cursor: pointer;
    z-index: 10;

    ${({ $dir }) =>
    $dir === "rtl"
      ? css`
            left: 5px;
            right: auto;
          `
      : css`
            right: 5px;
            left: auto;
          `}
  }

  .emoji-picker {
    position: absolute;
    top: 45px;
    z-index: 1000;

    ${({ $dir }) =>
    $dir === "rtl"
      ? css`
            left: 0;
            right: auto;
          `
      : css`
            right: 0;
            left: auto;
          `}
  }
`;
export default Input;
