99; // libs
import { motion as Motion } from "framer-motion";
import { Link, NavLink } from "react-router";

// icons
import { ChevronDown } from "lucide-react";

function HeaderPresentional({
  isDropdownOpen,
  setIsDropdownOpen,
  currentLang,
  dropdownRef,
  toggleDropdown,
  dropdownItems,
  navItems,
  handleLanguageChange,
}) {
  return (
    // reaplaced static with sticky
    <div className="bg-main/90 sticky top-0 z-50 w-full border-b border-white/10 backdrop-blur-sm">
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
                      : "hover:text-primary text-white"
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
            <svg
              className="h-12 w-12"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Circle Home"
            >
              {/* Modern concentric circles with gradient */}
              <defs>
                <linearGradient
                  id="logoGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#ff6b8b" />
                  <stop offset="100%" stopColor="#00c9b1" />
                </linearGradient>
              </defs>

              {/* Outer circle with gradient */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="url(#logoGradient)"
                strokeWidth="6"
              />

              {/* Abstract C shape formed from circle segment */}
              <path
                d="M65,35 A15,15 0 0,1 65,65"
                fill="none"
                stroke="white"
                strokeWidth="8"
                strokeLinecap="round"
              />

              {/* Central dot */}
              <circle cx="50" cy="50" r="8" fill="#ff6b8b" />
            </svg>
          </Link>
        </Motion.div>

        {/* Right - Button with Dropdown */}
        <div
          className="relative flex flex-1 items-center justify-end space-x-4"
          ref={dropdownRef}
        >
          <button
            className="text-primary hover:bg-primary/20 flex items-center space-x-2 rounded-lg bg-white/10 px-3 py-2 transition-all duration-200"
            onClick={() =>
              handleLanguageChange(currentLang === "ar" ? "en" : "ar")
            }
          >
            {currentLang === "ar" ? "en" : "ar"}
          </button>
          <button
            onClick={toggleDropdown}
            className="text-primary hover:bg-primary/20 flex items-center space-x-2 rounded-lg bg-white/10 px-3 py-2 transition-all duration-200"
          >
            {/* Primary colored circular letter */}
            <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-full">
              <span className="text-sm font-bold text-white">U</span>
            </div>

            {/* Dropdown icon */}
            <ChevronDown
              className={`text-primary h-4 w-4 transition-transform duration-200 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          <Motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{
              opacity: isDropdownOpen ? 1 : 0,
              scale: isDropdownOpen ? 1 : 0.95,
              y: isDropdownOpen ? 0 : -10,
            }}
            transition={{ duration: 0.2 }}
            className={`bg-main/90 absolute top-full z-50 mt-2 w-48 overflow-hidden rounded-lg border border-white/10 shadow-lg backdrop-blur-sm ltr:right-0 rtl:left-0 ${
              isDropdownOpen ? "pointer-events-auto" : "pointer-events-none"
            }`}
          >
            {dropdownItems.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className="hover:bg-primary/20 block px-4 py-3 text-sm text-white transition-colors"
                onClick={() => setIsDropdownOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </Motion.div>
        </div>
      </div>
    </div>
  );
}

export default HeaderPresentional;
