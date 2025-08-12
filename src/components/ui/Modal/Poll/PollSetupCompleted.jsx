import ShinyText from "../../ReactBits/ShinyText/ShinyText";
import ModalHeading from "../ModalHeading/ModalHeading";

export default function PollSetupCompleted({ onClose, handleStartNewPollClick, t }) {
  return (
    <div
      className="relative w-[360px] rounded-[var(--rounded-rounded)]  backdrop-blur-lg p-6  text-center"
      style={{ fontFamily: "var(--font-primary)" }}
    >
      {/* Header */}
      <ModalHeading onClose={onClose} title={t("Poll Setup Completed")} />

      {/* Content */}
      <div className="mt-5">
        <ShinyText
          text={t("Poll setup is completed!")}
          speed={2}
          className="mb-6 text-xl font-semibold text-[var(--color-text)]"
        />

        <div className="flex justify-center gap-3">
          <button
            onClick={handleStartNewPollClick}
            className="rounded-[var(--rounded-pill)] bg-[var(--color-primary)] px-6 py-2 text-sm font-semibold text-white hover:shadow-btnSecondaryHover transition-shadow duration-300"
            type="button"
          >
            {t("Create New Poll")}
          </button>

          
        </div>
      </div>
    </div>
  );
}
