import { useRef, useState } from "react";
import Modal from "../Modal";
import PollPresentational from "./PollPresentational";
import { useTranslation } from "react-i18next";

export default function PollContainer() {
   const { t } = useTranslation();
  const modalRef = useRef();
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [allowMultiple, setAllowMultiple] = useState(false);

  const openModal = () => modalRef.current.open();
  const closeModal = () => modalRef.current.close();

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

    const pollData = { question, options: filledOptions, allowMultiple };
    alert("Poll Submitted:\n" + JSON.stringify(pollData, null, 2));
    closeModal();
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <button
          onClick={openModal}
          className="bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary/80 transition"
        >
          Create Poll
        </button>
      </div>

      <Modal ref={modalRef}>
        <PollPresentational
          question={question}
          setQuestion={setQuestion}
          options={options}
          onOptionChange={handleOptionChange}
          allowMultiple={allowMultiple}
          setAllowMultiple={setAllowMultiple}
          onSubmit={handleSubmit}
          onClose={closeModal}
          t={t}
        />
      </Modal>
    </>
  );
}
