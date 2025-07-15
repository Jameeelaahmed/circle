import { X } from "lucide-react";
import ShinyText from "../ui/ReactBits/ShinyText/ShinyText";
import Input from "../ui/Input/Input";
import Toggle from "../ui/ReactBits/Toggle/Toggle";
import SendBtn from "../ui/ReactBits/SendBtn/SendBtn";

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
    <div className="bg-darker relative w-[500px] rounded-4xl p-10 shadow-2xl backdrop-blur-lg">
      {/* Header */}
      <div className="mb-10 flex items-center justify-between gap-3">
        <h2 className="from-secondary to-primary bg-gradient-to-b bg-clip-text text-4xl font-bold text-transparent">
          {t("Create Poll")}
        </h2>
        <X
          onClick={onClose}
          size={28}
          className="cursor-pointer rounded-full p-1 text-white transition-all hover:bg-white/30"
        />
      </div>

      {/* Form */}
      <form onSubmit={onSubmit} className="">
        {/* Question */}
        <div>
          <label className="text-light mb-2 block text-lg font-medium">
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
          <label className="text-light mb-2 block text-lg font-medium">
            {t("Options *")}
          </label>
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
        <div className="flex items-center justify-between">
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
          <div className="relative z-10 flex translate-y-[50%] justify-end">
            <SendBtn />
          </div>
        </div>
      </form>
    </div>
  );
}
