// libs
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";
import { useNavigate } from "react-router";
import i18n from "../../../i18n";
import { clearUserInfo } from "../../features/user/userSlice";
// components
import UserDropdownPresentational from "./UserDropdownPresentational";
function UserDropDownContainer({ toggleDark, darkMode }) {

  // Initialize language from localStorage or fallback to i18n.language
  const [currentLang, setCurrentLang] = useState(() => {
    const savedLang = localStorage.getItem("selectedLanguage");
    return savedLang || i18n.language;
  });

  const { userName, user } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { t } = useTranslation();
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isDropdownOpen) return;
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      clearUserInfo();
      navigate("/login");
      setIsDropdownOpen(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const dropdownItems = [
    { label: t("Profile"), href: `/profile/${user.uid}` },
    { label: t("Logout"), onClick: handleLogout },
  ];

  const handleLanguageChange = (lang) => {
    i18n
      .changeLanguage(lang)
      .then(() => {
        setCurrentLang(lang);
        // Store the selected language in localStorage
        localStorage.setItem("selectedLanguage", lang);
      })
      .catch((err) => console.error("Error changing language:", err));
  };

  // Initialize language from localStorage on component mount
  useEffect(() => {
    const savedLang = localStorage.getItem("selectedLanguage");
    if (savedLang && savedLang !== i18n.language) {
      i18n
        .changeLanguage(savedLang)
        .catch((err) => console.error("Error setting saved language:", err));
    }
  }, []);

  useEffect(() => {
    document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";
  }, [currentLang]);


  return (
    <UserDropdownPresentational
      user={userName}
      userId={user.uid}
      isDropdownOpen={isDropdownOpen}
      setIsDropdownOpen={setIsDropdownOpen}
      dropdownRef={dropdownRef}
      toggleDropdown={toggleDropdown}
      dropdownItems={dropdownItems}
      handleLanguageChange={handleLanguageChange}
      currentLang={currentLang}
      handleLogout={handleLogout}
      toggleDark={toggleDark}
      darkMode={darkMode}
    />
  );
}

export default UserDropDownContainer;
