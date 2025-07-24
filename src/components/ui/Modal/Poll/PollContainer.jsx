import { useRef, useState } from "react";
import Modal from "../Modal";
import PollPresentational from "./PollPresentational";
import { useTranslation } from "react-i18next";
import { doc, collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../../../firebase-config";
import { getAiPollOptions } from "./aiSuggestOptions";

export default function PollContainer({
  onClose,
  circleId = "YwengDJJqbgMWTBk9dAn",
}) {
  const { t } = useTranslation();
  const modalRef = useRef();

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [allowMultiple, setAllowMultiple] = useState(false);
  const [expireDate, setExpireDate] = useState("");

  const openModal = () => modalRef.current?.open();
  const closeModal = () => modalRef.current?.close();

  const handleOptionChange = (index, value) => {
    const updated = [...options];
    updated[index] = value;

    // Add new empty input if typing in the last one
    if (index === options.length - 1 && value.trim() !== "") {
      setOptions([...updated, ""]);
    } else {
      // Trim extra empty fields
      let trimmed = [...updated];
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

  const handleAskAi = async () => {
    if (!question.trim()) return alert("Please enter a question first");

    const result = await getAiPollOptions(question);
    if (!result) return alert("AI failed to suggest options");

    const suggestions = result
      .split("\n")
      .map((line) => line.replace(/^\d+\.\s*/, "").trim())
      .filter(Boolean)
      .slice(0, 5);

    if (suggestions.length < 2) {
      alert("AI did not return enough valid options");
      return;
    }

    // Add the suggestions + an empty field at the end
    setOptions([...suggestions, ""]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !question.trim() ||
      options.filter((opt) => opt.trim()).length < 2 ||
      !expireDate
    ) {
      alert(t("Please fill in all required fields"));
      return;
    }

    const pollData = {
      question: question.trim(),
      options: options
        .filter((opt) => opt.trim())
        .map((text) => ({ text, votes: 0 })),
      allowMultiple,
      expireDate: Timestamp.fromDate(new Date(expireDate)),
      createdAt: Timestamp.now(),
    };

    try {
      const pollCollectionRef = collection(
        doc(db, "circles", circleId),
        "poll",
      );
      await addDoc(pollCollectionRef, pollData);

      alert(t("Poll created successfully!"));
      setQuestion("");
      setOptions(["", ""]);
      setAllowMultiple(false);
      setExpireDate("");
      closeModal();
      onClose?.();
    } catch (error) {
      console.error("Error creating poll:", error);
      alert(t("An error occurred while creating the poll."));
    }
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        <button
          onClick={openModal}
          className="bg-primary hover:bg-primary/80 rounded-xl px-6 py-3 text-white transition"
        >
          {t("Create Poll")}
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
          expireDate={expireDate}
          setExpireDate={setExpireDate}
          onSubmit={handleSubmit}
          onAskAi={handleAskAi}
          onClose={closeModal}
          t={t}
        />
      </Modal>
    </>
  );
}
