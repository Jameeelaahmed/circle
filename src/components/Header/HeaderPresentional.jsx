// components
import UserDropDownContainer from "../UserDropDown/UserDropDownContainer";
import Skeleton from "@mui/material/Skeleton";
// libs
import { motion as Motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import { Logo } from "../../assets/icons/Logo";
import Notificaion from "../../pages/Notifications/NotificationSection";

function HeaderPresentional({
  isAuthLoading,
  isLoggedIn,
  currentLang,
  navItems,
  handleLanguageChange,
}) {
  return (
    <div className="bg-main/90 fixed top-0 z-50 w-full border-b border-white/10 backdrop-blur-sm">
      <div className="flex h-16 w-full items-center px-2 sm:px-4 lg:px-6">
        {/* <div className="flex items-center justify-between h-16"> */}
        {/* Left - Navigation Items */}
        <div className="flex flex-1 items-center">
          <div className="hidden items-center space-x-6 md:flex">
            {navItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.href}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 transition-colors duration-200 hover:bg-white/10 ${
                    isActive
                      ? "text-primary bg-white/10"
                      : "hover:text-primary text-text"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
        <Motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute flex flex-shrink-0 -translate-x-1/2 transform items-center ltr:left-1/2 rtl:right-1/2"
        >
          <Link to="/" className="flex items-center">
            <Logo />
          </Link>
        </Motion.div>

        {/* Right - Button with Dropdown */}
        <div className="relative flex flex-1 items-center justify-end space-x-4">
          <button
            className="text-primary hover:bg-primary/20 bg-inputsBg flex items-center space-x-2 rounded-lg px-3 py-2 transition-all duration-200"
            onClick={() =>
              handleLanguageChange(currentLang === "ar" ? "en" : "ar")
            }
          >
            {currentLang === "ar" ? "en" : "ar"}
          </button>
          <Notificaion></Notificaion>
          {isAuthLoading || isLoggedIn === undefined ? (
            <Skeleton
              sx={{ bgcolor: "var(--color-inputsBg)" }}
              animation="wave"
              variant="text"
              width={120}
              height={70}
            />
          ) : isLoggedIn === true ? (
            <UserDropDownContainer />
          ) : isLoggedIn === false ? (
            <Link to="/login">
              <button className="text-primary hover:bg-primary/20 font-secondary flex items-center space-x-2 rounded-lg bg-white/10 px-3 py-2 tracking-wide transition-all duration-200">
                SignIn/Up
              </button>
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default HeaderPresentional;
