import ModalHeading from "../ModalHeading/ModalHeading";
import { useTranslation } from "react-i18next";
function NotMemberModalPresentational({ handleJoinRequest, onClose, circle, isRequestPending, sendingRequestId }) {
    const { t } = useTranslation()
    return (
        <div>
            <ModalHeading title={t("Join Circle")} onClose={onClose} />
            <p className="text-center mb-6">
                {t("You need to join this circle to send messages and interact with members.")}
            </p>

            <div className="flex justify-end">
                {sendingRequestId === circle.id
                    ? t("Sending Request...")
                    : isRequestPending ? (
                        <span className="px-5 py-2 rounded-lg font-semibold mb-2 text-primary">
                            {t("Request Sent")}
                        </span>
                    ) : (
                        <button
                            onClick={(e) => handleJoinRequest(circle.id, e)}
                            className="bg-primary cursor-pointer px-5 py-2 rounded-lg font-semibold transition mb-2"
                        >
                            {t("Join Circle")}
                        </button>
                    )}
            </div>
        </div>
    );
}

export default NotMemberModalPresentational;
