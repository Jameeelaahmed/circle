import { useTranslation } from "react-i18next";
import { useAuth } from "../../hooks/useAuth";
import { useSelector } from "react-redux";
//components
import HeaderPresentional from "./HeaderPresentional";

function HeaderContainer({ toggleDark, darkMode }) {
  const isAuthLoading = useSelector((state) => state.user.isAuthLoading);
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

  return (
    <>
      <HeaderPresentional
        isAuthLoading={isAuthLoading}
        isLoggedIn={isLoggedIn}
        navItems={navItems}
        toggleDark={toggleDark}
        darkMode={darkMode}
      />
    </>
  );
}

export default HeaderContainer;
