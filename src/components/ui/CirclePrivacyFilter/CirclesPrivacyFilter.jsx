import { Globe2, Lock, ListFilter } from 'lucide-react';
import { useTranslation } from 'react-i18next';
function CirclesPrivacyFilter({ circlePrivacy, setCirclePrivacy }) {
    const { t } = useTranslation()
    return (
        <div className="flex gap-2 mb-4 justify-center">
            <button
                className={`flex items-center gap-2 px-3 py-1 cursor-pointer rounded-full border font-medium transition-colors ${circlePrivacy === 'all' ? 'bg-primary text-text' : 'bg-main text-primary'}`}
                onClick={() => setCirclePrivacy('all')}
            >
                <ListFilter size={18} />
                {t("All")}
            </button>
            <button
                className={`flex items-center gap-2 px-3 py-1 cursor-pointer rounded-full border font-medium transition-colors ${circlePrivacy === 'public' ? 'bg-primary text-text' : 'bg-main text-primary'}`}
                onClick={() => setCirclePrivacy('public')}
            >
                <Globe2 size={18} />
                {t("public")}
            </button>
            <button
                className={`flex items-center gap-2 px-3 py-1 cursor-pointer rounded-full border font-medium transition-colors ${circlePrivacy === 'private' ? 'bg-primary text-text' : 'bg-main text-primary'}`}
                onClick={() => setCirclePrivacy('private')}
            >
                <Lock size={18} />
                {t("private")}
            </button>
        </div>
    );
}
export default CirclesPrivacyFilter;
