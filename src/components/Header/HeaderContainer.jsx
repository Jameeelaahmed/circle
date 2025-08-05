// libs
import { useState, useEffect } from "react";
import i18n from "../../../i18n";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import Notification from "../../pages/Notifications/NotificationSection";
//components
import HeaderPresentional from "./HeaderPresentional";

function Header() {
  const isAuthLoading = useSelector((state) => state.user.isAuthLoading);

  // Initialize language from localStorage or fallback to i18n.language
  const [currentLang, setCurrentLang] = useState(() => {
    const savedLang = localStorage.getItem('selectedLanguage');
    return savedLang || i18n.language;
  });

  const { t } = useTranslation();
  const { isLoggedIn } = useAuth();
  const navItems = [
    { label: t("Home"), href: "/" },
    { label: t("Events"), href: "/events" },
    { label: t("Circles"), href: "/circles" },
    { label: t("Payments"), href: "/payments" },
    { label: t("About Us"), href: "/about" },
    { label: t("Explore"), href: "/explore" },
  ];

  const handleLanguageChange = (lang) => {
    i18n
      .changeLanguage(lang)
      .then(() => {
        setCurrentLang(lang);
        // Store the selected language in localStorage
        localStorage.setItem('selectedLanguage', lang);
      })
      .catch((err) => console.error("Error changing language:", err));
  };

  // Initialize language from localStorage on component mount
  useEffect(() => {
    const savedLang = localStorage.getItem('selectedLanguage');
    if (savedLang && savedLang !== i18n.language) {
      i18n.changeLanguage(savedLang).catch((err) =>
        console.error("Error setting saved language:", err)
      );
    }
  }, []);

  useEffect(() => {
    document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";
  }, [currentLang]);

  return (
    <>
      <HeaderPresentional
        isAuthLoading={isAuthLoading}
        isLoggedIn={isLoggedIn}
        currentLang={currentLang}
        navItems={navItems}
        handleLanguageChange={handleLanguageChange}
      />
    </>
  );
}

export default Header;
