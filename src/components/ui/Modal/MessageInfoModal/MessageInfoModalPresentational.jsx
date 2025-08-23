import ModalHeading from '../ModalHeading/ModalHeading';
import { useTranslation } from 'react-i18next';
function MessageInfoModalPresentational({ onClose, message, formatTime, seenUsers, loading }) {
    const { t } = useTranslation();
    return (
        <>
            <ModalHeading title={t("Message Info")} onClose={onClose} />

            {/* Content */}
            <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
                {/* Message preview */}
                <div className="bg-primary/10 rounded-lg p-3">
                    <div className="text-xs text-text/60 mb-1">{t("Your message")}</div>
                    <div className="text-sm text-text">
                        {message.messageType === 'audio' ? t('Voice message') :
                            message.messageType === 'image' ? t('Photo') :
                                message.messageType === 'video' ? t('Video') :
                                    message.text}
                    </div>
                    <div className="text-xs text-text/60 mt-1">
                        Sent {formatTime(message.timestamp)}
                    </div>
                </div>

                {/* Seen by section */}
                <div>
                    <div className="text-sm font-medium text-text/80 mb-2">
                        {t("Seen by")} {seenUsers.length} {seenUsers.length === 1 ? t('person') : t('people')}
                    </div>

                    {loading ? (
                        <div className="text-center py-4">
                            <div className="text-text/60">{t("Loading...")}</div>
                        </div>
                    ) : seenUsers.length === 0 ? (
                        <div className="text-center py-4">
                            <div className="text-text/60">{t("No one has seen this message yet")}</div>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {seenUsers.map((user, index) => (
                                <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-text/5">
                                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-text">
                                        {user.name[0]?.toUpperCase() || 'U'}
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-sm font-medium text-text">{user.name}</div>
                                        <div className="text-xs text-text/60">
                                            {t("Seen")} {formatTime(user.seenAt)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default MessageInfoModalPresentational
