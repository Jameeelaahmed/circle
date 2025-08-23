import ModalHeading from "../ModalHeading/ModalHeading"
import { useTranslation } from "react-i18next"
function DeleteMessageModalPresentational({
    close,
    deleteOption,
    setDeleteOption,
    handleDelete,
    showRadioOptions
}) {
    const { t } = useTranslation();
    return (
        <>
            <ModalHeading title={t("Delete Message?")} onClose={close} />

            <div className="p-4">
                {showRadioOptions ? (
                    <>
                        <p className="text-text mb-6">
                            {t("You can delete messages for everyone or just for yourself.")}
                        </p>

                        {/* Delete for me option */}
                        <div className="mb-4">
                            <label className="flex items-center cursor-pointer group">
                                <div className="relative">
                                    <input
                                        type="radio"
                                        value="forMe"
                                        checked={deleteOption === 'forMe'}
                                        onChange={(e) => setDeleteOption(e.target.value)}
                                        className="sr-only"
                                    />
                                    <div className={`w-5 h-5 rounded-full border-2 transition-all
                                        ${deleteOption === 'forMe'
                                            ? 'border-primary bg-primary'
                                            : 'border-text-400 group-hover:border-primary'
                                        }`}>
                                        {deleteOption === 'forMe' && (
                                            <div className="w-2 h-2 bg-text rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                                        )}
                                    </div>
                                </div>
                                <p className="text-text ml-3">{t("Delete for me")}</p>
                            </label>
                        </div>

                        {/* Delete for everyone option */}
                        <div className="mb-6">
                            <label className="flex items-center cursor-pointer group">
                                <div className="relative">
                                    <input
                                        type="radio"
                                        value="forEveryone"
                                        checked={deleteOption === 'forEveryone'}
                                        onChange={(e) => setDeleteOption(e.target.value)}
                                        className="sr-only"
                                    />
                                    <div className={`w-5 h-5 rounded-full border-2 transition-all
                                        ${deleteOption === 'forEveryone'
                                            ? 'border-primary bg-primary'
                                            : 'border-text-400 group-hover:border-primary'
                                        }`}>
                                        {deleteOption === 'forEveryone' && (
                                            <div className="w-2 h-2 bg-text rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                                        )}
                                    </div>
                                </div>
                                <p className="text-text ml-3">Delete for everyone</p>
                            </label>
                        </div>
                    </>
                ) : (
                    <p className="text-text mb-6">
                        {t("Are you sure you want to delete this message? This action cannot be undone.")}
                    </p>
                )}

                <div className="flex gap-3 justify-end">
                    <button
                        onClick={handleDelete}
                        className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-text transition-colors"
                    >
                        {t("Delete")}
                    </button>
                </div>
            </div>
        </>
    )
}

export default DeleteMessageModalPresentational
