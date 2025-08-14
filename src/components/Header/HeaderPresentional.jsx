// components
import UserDropDownContainer from "../UserDropDown/UserDropDownContainer";
import Skeleton from "@mui/material/Skeleton";
// libs
import { motion as Motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import { Logo } from "../../assets/icons/Logo";
import Notificaion from "../Notifications/NotificationSection";
import { useState, useRef, useEffect } from "react";
import { UserPlus, Globe, Menu, X } from "lucide-react";

function HeaderPresentional({
  isAuthLoading,
  isLoggedIn,
  currentLang,
  navItems,
  handleLanguageChange,
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-main fixed top-0 z-50 w-full border-b border-white/10 backdrop-blur-sm bg-opacity-90">
      <div className="flex h-16 w-full items-center px-4 sm:px-6 lg:px-8">
        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-white hover:text-primary transition-colors duration-200 p-2 -ml-2"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>

        {/* Logo - Left on mobile, Center on desktop */}
        <Motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-shrink-0 items-center ml-4 md:ml-0 md:hidden"
        >
          <Link to="/" className="flex items-center">
            <Logo className="w-8 h-8" />
          </Link>
        </Motion.div>

        {/* Left - Navigation Items (Desktop) */}
        <div className="flex flex-1 items-center">
          <div className="hidden items-center space-x-1 md:flex ltr:ml-0 rtl:mr-0">
            {navItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.href}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 transition-colors duration-200 text-sm lg:text-base ${isActive
                    ? "text-primary bg-primary/10"
                    : "hover:text-primary text-text hover:bg-white/5"
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
          transition={{ duration: 0.3 }}
        // className="hidden md:absolute md:flex md:flex-shrink-0 md:-translate-x-1/2 md:transform md:items-center md:ltr:left-1/2 md:rtl:right-1/2"
        >
          {/* Center logo */}
          <Link to="/" className="flex items-center justify-center">
            <Logo className="w-10 h-10" />
          </Link>
        </Motion.div>

        {/* Right - Controls */}
        <div className="relative flex flex-1 items-center justify-end space-x-2 sm:space-x-3">
          <button
            className="text-primary hover:bg-primary/10 flex items-center justify-center rounded-lg p-2 transition-all duration-200 border border-white/10"
            onClick={() =>
              handleLanguageChange(currentLang === "ar" ? "en" : "ar")
            }
            aria-label="Change language"
          >
            <Globe className="w-5 h-5" />
            <span className="ml-1 text-xs font-medium">
              {currentLang === "ar" ? "EN" : "AR"}
            </span>
          </button>

          {/* Notifications */}
          <Notificaion />

          {/* Circle Requests */}
          <Link to="/circles-requests">
            <button
              className="text-primary hover:bg-primary/10 flex items-center justify-center rounded-lg p-2 transition-all duration-200 border border-white/10"
              title="Circle Join Requests"
              aria-label="Circle requests"
            >
              <UserPlus className="w-5 h-5" />
            </button>
          </Link>

          {/* Auth State */}
          {isAuthLoading || isLoggedIn === undefined ? (
            <Skeleton
              sx={{ bgcolor: "var(--color-inputsBg)" }}
              animation="wave"
              variant="circular"
              width={36}
              height={36}
            />
          ) : isLoggedIn === true ? (
            <UserDropDownContainer />
          ) : isLoggedIn === false ? (
            <Link to="/login">
              <button className="bg-primary hover:bg-primary/90 font-medium flex items-center rounded-lg px-4 py-2 tracking-wide transition-all duration-200 text-sm text-white shadow-md shadow-primary/20">
                Sign In
              </button>
            </Link>
          ) : null}
        </div>
      </div>

      {/* Mobile Menu */}
      <Motion.div
        ref={mobileMenuRef}
        initial={{ x: "-100%" }}
        animate={{ x: isMobileMenuOpen ? 0 : "-100%" }}
        transition={{ type: "spring", damping: 25 }}
        className="md:hidden fixed top-16 left-0 bottom-0 z-40 w-4/5 max-w-xs bg-main border-r border-white/10"
      >
        <div className="px-4 py-6 space-y-2 h-full overflow-y-auto">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block rounded-lg px-4 py-3 transition-colors duration-200 text-base ${isActive
                  ? "text-primary bg-primary/10"
                  : "hover:text-primary text-text hover:bg-white/5"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

          {/* Mobile Auth State */}
          <div className="pt-4 mt-4 border-t border-white/10">
            {isLoggedIn === false && (
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center bg-primary hover:bg-primary/90 font-medium rounded-lg px-4 py-3 transition-all duration-200 text-white"
              >
                Sign In / Register
              </Link>
            )}
          </div>
        </div>
      </Motion.div>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-30 bg-black/60 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}

export default HeaderPresentional;