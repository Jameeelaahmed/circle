import { useTranslation } from "react-i18next";
function CirclesTabs({ activeTab, setActiveTab }) {
    const { t } = useTranslation()
    return (
        <div className="flex gap-4 mb-6 justify-center">
            <button
                className={`px-4 py-2 rounded-full font-bold transition-colors cursor-pointer ${activeTab === 'my' ? 'bg-primary text-text' : 'bg-main text-primary'}`}
                onClick={() => setActiveTab('my')}
            >
                {t("My Circles")}
            </button>
            <button
                className={`px-4 py-2 rounded-full font-bold transition-colors cursor-pointer ${activeTab === 'forYou' ? 'bg-primary text-text' : 'bg-main text-primary'}`}
                onClick={() => setActiveTab('forYou')}
            >
                {t("For You")}
            </button>
        </div>
    );
}
export default CirclesTabs;
