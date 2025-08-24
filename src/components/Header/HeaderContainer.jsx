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
    { label: t("Explore"), href: "/explore" },
    { label: t("Circles"), href: "/circles" },
    { label: t("Events"), href: "/events" },
    { label: t("Payments"), href: "/payments" },
    { label: t("About Us"), href: "/about" },
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
