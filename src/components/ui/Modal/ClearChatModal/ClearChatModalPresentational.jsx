import ModalHeading from "../ModalHeading/ModalHeading";
import { useTranslation } from "react-i18next";
function ClearChatModalPresentational({ close, handleClear }) {
    const { t } = useTranslation()
    return (
        <>
            <ModalHeading title={t("Clear Chat")} onClose={close} />
            <div className="p-4">
                <p className="text-text mb-6 text-center">
                    {t("Are you sure you want to clear all messages")}{t("?")}
                </p>
                <p className="text-text mb-6 text-center">
                    {t("This action cannot be undone.")}
                </p>

                <div className="flex gap-3 justify-end">
                    <button
                        onClick={handleClear}
                        className="px-4 py-2 rounded-lg bg-lg bg-red-500 text-text transition-colors"
                    >
                        {t("Clear Chat")}
                    </button>
                </div>
            </div >
        </>
    );
}

export default ClearChatModalPresentational;
