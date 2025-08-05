import { useState } from "react";
import { useTranslation } from "react-i18next";
import CreatePollModalPresentational from "./CreatePollModalPresentational";

export default function CreatePollModalContainer({ onClose }) {
  const { t } = useTranslation();
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [allowMultiple, setAllowMultiple] = useState(false);

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;

    if (index === options.length - 1 && value.trim() !== "") {
      setOptions([...updatedOptions, ""]);
    } else {
      let trimmed = [...updatedOptions];
      while (
        trimmed.length > 2 &&
        trimmed[trimmed.length - 1].trim() === "" &&
        trimmed[trimmed.length - 2].trim() === ""
      ) {
        trimmed.pop();
      }
      setOptions(trimmed);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filledOptions = options.filter((opt) => opt.trim() !== "");

    if (question.trim() === "") return alert("Please enter a question.");
    if (filledOptions.length < 2)
      return alert("Please provide at least two options.");

    // const pollData = { question, options: filledOptions, allowMultiple };
    onClose();
  };

  function closeModal() {
    onClose();
  }

  return (
    <>
      <CreatePollModalPresentational
        question={question}
        setQuestion={setQuestion}
        options={options}
        onOptionChange={handleOptionChange}
        allowMultiple={allowMultiple}
        setAllowMultiple={setAllowMultiple}
        onSubmit={handleSubmit}
        close={closeModal}
        t={t}
      />
    </>
  );
}
