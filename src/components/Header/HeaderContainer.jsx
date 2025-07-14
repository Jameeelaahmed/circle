// libs
import { useState, useEffect } from "react"
import i18n from '../../../i18n'
import useClickOutside from "../../hooks/useClickOutside";
import { useTranslation } from "react-i18next";

//components 
import HeaderPresentional from "./HeaderPresentional";

function Header() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [currentLang, setCurrentLang] = useState(i18n.language)
    const { t } = useTranslation();

    const dropdownRef = useClickOutside({
        state: isDropdownOpen,
        setState: setIsDropdownOpen
    });

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const dropdownItems = [
        { label: t("Profile"), href: '/profile' },
        { label: t('Settings'), href: '/settings' },
        { label: t('Help'), href: '/help' },
        { label: t('Logout'), href: '/logout' }
    ];

    const navItems = [
        { label: t('Home'), href: '/' },
        { label: t('Events'), href: '/events' },
        { label: t('Payments'), href: '/payments' },
        { label: t('About Us'), href: '/about' }
    ];


    const handleLanguageChange = (lang) => {
        i18n
            .changeLanguage(lang)
            .then(() => setCurrentLang(lang))
            .catch((err) => console.error("Error changing language:", err))
    }

    useEffect(() => {
        document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr"
    }, [currentLang])


    return (
        <>
            <HeaderPresentional isDropdownOpen={isDropdownOpen} setIsDropdownOpen={setIsDropdownOpen} currentLang={currentLang} dropdownRef={dropdownRef} toggleDropdown={toggleDropdown} dropdownItems={dropdownItems} navItems={navItems} handleLanguageChange={handleLanguageChange} />
        </>
    )
}

export default Header
