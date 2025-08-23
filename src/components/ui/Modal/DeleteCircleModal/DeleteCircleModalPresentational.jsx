import ModalHeading from "../ModalHeading/ModalHeading";
import { AlertTriangle } from "lucide-react";
import { useTranslation } from "react-i18next";
function DeleteCircleModalPresentational({ onDeleteCircle, closeCircleDeleteModal, isDeleting, circleName }) {
    const { t } = useTranslation();
    return (
        <>
            <ModalHeading title={t("Delete Circle")} onClose={closeCircleDeleteModal} />
            <div className="p-6 text-center">
                <div className="flex flex-col items-center justify-center mb-4">
                    <AlertTriangle className="text-red-500 mb-3 animate-pulse" size={44} />
                    <h2 className="text-2xl font-extrabold text-red-600">{t("Delete Circle")}{t("?")}</h2>
                </div>

                <p className="mb-6 text-base text-text-600 leading-relaxed">
                    {t("Are you sure you want to delete")}{" "}
                    <span className="font-semibold text-primary">{circleName}</span>{t("?")}<br />
                    <span className="font-semibold text-red-500">{t("This action cannot be undone.")}</span>
                </p>

                <div className="flex justify-end gap-3">
                    <button
                        className="px-6 py-2 rounded-lg bg-red-500 text-text font-semibold shadow-sm hover:bg-red-600 focus:ring-2 focus:ring-red-300 disabled:opacity-60 transition-all"
                        onClick={onDeleteCircle}
                        disabled={isDeleting}
                    >
                        {isDeleting ? t("Deleting...") : t("Delete")}
                    </button>
                </div>
            </div>
        </>
    );
}

export default DeleteCircleModalPresentational;
