// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from './src/locales/en/translationEN.json';
import translationAR from './src/locales/ar/translationAR.json';

const resources = {
    en: { translation: translationEN },
    ar: { translation: translationAR },
};

const savedLang = localStorage.getItem("selectedLanguage") || "en";

// 👇 set dir immediately before React runs
document.documentElement.dir = savedLang === "ar" ? "rtl" : "ltr";

i18n
    .use(initReactI18next)
    .init({
        supportedLngs: ["en", "ar"],
        resources,
        lng: savedLang,
        fallbackLng: "en",
        interpolation: {
            escapeValue: false,
        },
        react: {
            useSuspense: false,
        },
    });

export default i18n;
