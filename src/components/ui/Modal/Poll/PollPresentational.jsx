import { X } from "lucide-react";
import ShinyText from "../../ReactBits/ShinyText/ShinyText";
import Input from "../../Input/Input";
import Toggle from "../../ReactBits/Toggle/Toggle";
import SendBtn from "../../ReactBits/SendBtn/SendBtn";
import AiButton from "../../Buttons/AiButton";

export default function PollPresentational({
  question,
  setQuestion,
  options,
  onOptionChange,
  allowMultiple,
  setAllowMultiple,
  onSubmit,
  onClose,
  t,
}) {
  return (
    <div className="relative w-[500px] p-10 rounded-4xl backdrop-blur-lg bg-darker shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-10">
        <h2 className="text-4xl font-bold text-transparent bg-gradient-to-l from-secondary to-primary bg-clip-text">
          {t("Create Poll")}
        </h2>
        <X
          onClick={onClose}
          size={28}
          className="hover:bg-white/30 transition-all p-1 rounded-full cursor-pointer text-white"
        />
      </div>

      {/* Form */}
      <form onSubmit={onSubmit} className="">
        {/* Question */}
        <div>
          <label className="block text-lg mb-2 font-medium text-light">
            {t("Question *")}
          </label>
          <Input
            label={t("Ask question")}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>

        {/* Options */}
        <div>
          <div className="flex items-center justify-between">
            <label className="block text-lg mb-2 font-medium text-light">
              {t("Options *")}
            </label>

            <div className="flex items-center gap-x-2 cursor-pointer">
              <AiButton />
              <span className="font-bold ps-2 py-1 text-transparent bg-gradient-to-l from-secondary to-primary bg-clip-text">Ask AI</span>
            </div>
          </div>

          <div className="space-y-3">
            {options.map((option, index) => (
              <Input
                key={index}
                label={`${t("Option")} ${index + 1}`}
                value={option}
                onChange={(e) => onOptionChange(index, e.target.value)}
              />
            ))}
          </div>
        </div>

        {/* Toggle */}
        <div className="flex justify-between items-center">
          <ShinyText
            text={t("Allow multiple answers!")}
            disabled={false}
            speed={3}
            className="custom-class text-white"
          />
          <Toggle
            checked={allowMultiple}
            onChange={() => setAllowMultiple(!allowMultiple)}
          />
        </div>

        {/* Submit */}
        <div className="pt-2">
          <div className="flex justify-end relative translate-y-[50%] z-10">
            <SendBtn />
          </div>
        </div>
      </form>
    </div>
  );
}
