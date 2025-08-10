// components
import UserDropDownContainer from "../UserDropDown/UserDropDownContainer";
import Skeleton from "@mui/material/Skeleton";
// libs
import { motion as Motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import { Logo } from "../../assets/icons/Logo";
import Notificaion from "../Notifications/NotificationSection";
import { useState } from "react";

function HeaderPresentional({
  isAuthLoading,
  isLoggedIn,
  currentLang,
  navItems,
  handleLanguageChange,
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="bg-main fixed top-0 z-50 w-full border-b border-white/10">
      <div className="flex h-16 w-full items-center px-4 sm:px-6 lg:px-8">
        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-white hover:text-primary transition-colors duration-200 p-2 -ml-2"
          aria-label="Toggle mobile menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Logo - Left on mobile, Center on desktop */}
        <Motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-shrink-0 items-center ml-4 md:hidden"
        >
          <Link to="/" className="flex items-center">
            <Logo />
          </Link>
        </Motion.div>

        {/* Left - Navigation Items (Desktop) */}
        <div className="flex flex-1 items-center">
          <div className="hidden items-center space-x-6 md:flex ltr:ml-0 rtl:mr-0">
            {navItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.href}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 transition-colors duration-200 hover:bg-white/10 text-sm lg:text-base ${isActive
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

        {/* Logo - Center on desktop only */}
        <Motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden md:absolute md:flex md:flex-shrink-0 md:-translate-x-1/2 md:transform md:items-center md:ltr:left-1/2 md:rtl:right-1/2"
        >
          <Link to="/" className="flex items-center">
            <Logo />
          </Link>
        </Motion.div>

        {/* Right - Controls */}
        <div className="relative flex flex-1 items-center justify-end space-x-2 sm:space-x-4">
          <button
            className="text-primary hover:bg-primary/20 bg-inputsBg flex items-center space-x-2 rounded-lg px-2 py-1 sm:px-3 sm:py-2 transition-all duration-200 text-sm"
            onClick={() =>
              handleLanguageChange(currentLang === "ar" ? "en" : "ar")
            }
          >
            {currentLang === "ar" ? "en" : "ar"}
          </button>

          {/* Notifications - Always visible on header */}
          <Notificaion />

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
              <button className="text-primary hover:bg-primary/20 font-secondary flex items-center space-x-2 rounded-lg bg-white/10 px-2 py-1 sm:px-3 sm:py-2 tracking-wide transition-all duration-200 text-sm">
                SignIn/Up
              </button>
            </Link>
          ) : null}
        </div>
      </div>

      {/* Mobile Menu Overlay - Full Height */}
      {isMobileMenuOpen && (
        <Motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-main fixed top-16 left-0 right-0 bottom-0 z-40"
        >
          <div className="px-4 py-6 space-y-3 h-full">
            {navItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block rounded-lg px-4 py-3 transition-colors duration-200 hover:bg-white/10 text-lg ${isActive
                    ? "text-primary bg-white/10"
                    : "hover:text-primary text-text"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </Motion.div>
      )}
    </div>
  );
}

export default HeaderPresentional;
