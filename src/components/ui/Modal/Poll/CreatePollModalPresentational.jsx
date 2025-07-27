import ShinyText from "../../ReactBits/ShinyText/ShinyText";
import Input from "../../Input/Input";
import Toggle from "../../ReactBits/Toggle/Toggle";
import SendBtn from "../../ReactBits/SendBtn/SendBtn";
import AiButton from "../../Buttons/AiButton";
import ModalHeading from "../ModalHeading/ModalHeading";

export default function CreatePollModalPresentational({
  question,
  setQuestion,
  options,
  onOptionChange,
  allowMultiple,
  setAllowMultiple,
  onSubmit,
  close,
  t,
}) {
  return (
    <div className="relative w-[500px] rounded-4xl backdrop-blur-lg">
      {/* Header */}
      <ModalHeading onClose={close} title={t("Create Poll")} />

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
          <div className="flex justify-end relative z-10">
            <SendBtn />
          </div>
        </div>
      </form>
    </div>
  );
}
