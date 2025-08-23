// components
import UserDropDownContainer from "../UserDropDown/UserDropDownContainer";
import Skeleton from "@mui/material/Skeleton";
// libs
import { motion as Motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import { Logo } from "../../assets/icons/Logo";
import Notificaion from "../Notifications/NotificationSection";
import { useState } from "react";
import { UserPlus } from "lucide-react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

function HeaderPresentional({
  toggleDark,
  darkMode,
  isAuthLoading,
  isLoggedIn,
  currentLang,
  navItems,
  handleLanguageChange,
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="bg-main fixed top-0 z-50 w-full border-b border-white/10">
      <div className="flex h-16 w-full items-center px-4 sm:px-6 lg:px-8">
        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="hover:text-primary -ml-2 p-2 text-white transition-colors duration-200 md:hidden"
          aria-label="Toggle mobile menu"
        >
          <svg
            className="h-6 w-6"
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

        <Motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="ml-4 flex flex-shrink-0 items-center md:hidden"
        >
          <Link to="/" className="flex items-center justify-center">
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
                  `rounded-lg px-3 py-2 text-sm transition-colors duration-200 hover:bg-white/10 lg:text-base ${
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
            className="text-primary hover:bg-primary/20 bg-inputsBg flex items-center space-x-2 rounded-lg px-2 py-1 text-sm transition-all duration-200 sm:px-3 sm:py-2"
            onClick={() =>
              handleLanguageChange(currentLang === "ar" ? "en" : "ar")
            }
          >
            {currentLang === "ar" ? "en" : "ar"}
          </button>

           {/* Theme Toggle */}
          <button
          type="button"
            onClick={toggleDark}
            className="text-primary hover:bg-primary/20 bg-inputsBg rounded-lg p-2 transition-all duration-200"
            aria-label="Toggle theme"
          >
             {darkMode ? (
            <Sun className="w-5 h-5 text-[var(--color-secondary)]" />
          ) : (
            <Moon className="w-5 h-5 text-[var(--color-primary)]" />
          )}
          </button>

          {/* Notifications - Always visible on header */}
          <Notificaion />

          <Link to="/circles-requests">
            <button
              className="text-primary hover:bg-primary/20 bg-inputsBg flex items-center rounded-lg px-2 py-1 transition-all duration-200 sm:px-3 sm:py-2"
              title="Circle Join Requests"
            >
              <UserPlus className="h-6 w-6" />
            </button>
          </Link>

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
              <button className="text-primary hover:bg-primary/20 font-secondary flex items-center space-x-2 rounded-lg bg-white/10 px-2 py-1 text-sm tracking-wide transition-all duration-200 sm:px-3 sm:py-2">
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
          className="bg-main fixed top-16 right-0 bottom-0 left-0 z-40 md:hidden"
        >
          <div className="h-full space-y-3 px-4 py-6">
            {navItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block rounded-lg px-4 py-3 text-lg transition-colors duration-200 hover:bg-white/10 ${
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
        </Motion.div>
      )}
    </div>
  );
}

export default HeaderPresentional;
