import { X } from "lucide-react";
import React, { useState } from "react";
import ShinyText from "../ui/ReactBits/ShinyText/ShinyText";
import Input from "../ui/Input/Input";
import Toggle from "../ui/ReactBits/Toggle/Toggle";
import SendBtn from "../ui/ReactBits/SendBtn/SendBtn";

export default function Poll() {
  const [close, setClose] = useState("block");
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
    if (question.trim() === "") {
      alert("Please enter a question.");
      return;
    }
    if (filledOptions.length < 2) {
      alert("Please provide at least two options.");
      return;
    }

    const pollData = {
      question,
      options: filledOptions,
      allowMultiple,
    };

    alert("Poll Submitted:\n" + JSON.stringify(pollData, null, 2));
    setClose("hidden");
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Blurred Background */}
      <div className="absolute inset-0 blur-2xl"></div>

      {/* Centered Poll Form */}
      <div
        className={`absolute shadow-2xl shadow-white inset-0 flex items-center justify-center ${close}`}
      >
        <div
          className="relative w-full max-w-md p-8 rounded-4xl shadow-lg border-2 backdrop-blur-lg overflow-hidden"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            borderColor: "var(--color-primary)",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.6)",
          }}
        >
          <div className="flex items-center justify-between gap-3 mb-10">
            <h2
              style={{
                background:
                  "linear-gradient(to bottom, var(--color-secondary) 0%, var(--color-primary) 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
              className="text-4xl font-bold"
            >
              Create Poll
            </h2>
            <X
              onClick={() => setClose("hidden")}
              size={28}
              className="hover:bg-white/30 transition-all p-1 rounded-full cursor-pointer"
            />
          </div>

          <form onSubmit={handleSubmit} className="relative z-10">
            <label className="block text-2xl mb-3 font-medium text-white">
              Question
            </label>
            <div className="space-y-1 mb-4">
              <label className="flex items-center gap-1">
                <Input
                  label={"Ask question"}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
              </label>
            </div>

            <label className="block text-2xl mb-3 font-medium text-white">
              Options
            </label>
            <div className="space-y-3 mb-6">
              {options.map((option, index) => (
                <Input
                  key={index}
                  label={`Option ${index + 1}`}
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                />
              ))}
            </div>

            <div className="flex justify-between items-center mb-6">
              <ShinyText
                text="Allow multiple answers!"
                disabled={false}
                speed={3}
                className="custom-class text-white"
              />

              <Toggle
                checked={allowMultiple}
                onChange={() => setAllowMultiple(!allowMultiple)}
              />
            </div>

            <div className="flex justify-end relative z-10">
              <SendBtn />
            </div>
          </form>

          {/* White bottom bar */}
          <div className="absolute left-0 right-0 bottom-0 h-15 bg-white/10  shadow-inner z-0" />
        </div>
      </div>
    </div>
  );
}
