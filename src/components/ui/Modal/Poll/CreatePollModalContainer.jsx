import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { db } from "../../../../firebase-config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import CreatePollModalPresentational from "./CreatePollModalPresentational";
import { getAiPollOptions } from "./aiSuggestOptions";
import VoteComponent from "../../../Voting/Voting";

export default function CreatePollModalContainer({ onClose, userId }) {
  const { t } = useTranslation();
  const { circleId } = useParams();

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [allowMultiple, setAllowMultiple] = useState(false);
  const [createdPollId, setCreatedPollId] = useState(null); // <-- store new poll id

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const filledOptions = options.filter((opt) => opt.trim() !== "");

    if (question.trim() === "") return alert("Please enter a question.");
    if (filledOptions.length < 2)
      return alert("Please provide at least two options.");
    if (!circleId) return alert("Circle ID not found in the URL.");

    const pollData = {
      question: question.trim(),
      options: filledOptions.map((text) => ({
        text,
        votes: 0,
      })),
      allowMultiple,
      createdAt: serverTimestamp(),
    };

    try {
      const docRef = await addDoc(
        collection(db, "circles", circleId, "polls"),
        pollData,
      );
      setCreatedPollId(docRef.id); // store poll id
      // Reset form state if you want or keep it
      setQuestion("");
      setOptions(["", ""]);
      setAllowMultiple(false);
    } catch (error) {
      console.error("Error saving poll:", error);
      alert("An error occurred while saving the poll.");
    }
  };

  const handleAskAi = async () => {
    if (!question.trim()) return alert("Please enter a question first.");
    try {
      const aiOptions = await getAiPollOptions(question);

      if (!aiOptions || aiOptions.length < 2) {
        alert("AI did not return enough options.");
        return;
      }

      setOptions([...aiOptions, ""]);
    } catch (error) {
      console.error("AI suggestion error:", error);
      alert("Failed to fetch AI suggestions.");
    }
  };

  // If poll is created, show VoteComponent instead of the form
  if (createdPollId) {
    return (
      <VoteComponent
        circleId={circleId}
        pollId={createdPollId}
        userId={userId}
        onClose={() => {
          setCreatedPollId(null);
          onClose();
        }}
      />
    );
  }

  // Otherwise show the poll creation form
  return (
    <CreatePollModalPresentational
      question={question}
      setQuestion={setQuestion}
      options={options}
      onOptionChange={handleOptionChange}
      allowMultiple={allowMultiple}
      setAllowMultiple={setAllowMultiple}
      onSubmit={handleSubmit}
      onAskAi={handleAskAi}
      close={onClose}
      t={t}
    />
  );
}
