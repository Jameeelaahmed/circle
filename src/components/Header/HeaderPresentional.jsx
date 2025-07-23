// components
import UserDropDownContainer from "../UserDropDown/UserDropDownContainer";
import Skeleton from '@mui/material/Skeleton';
// libs
import { motion as Motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";

function HeaderPresentional({
  isAuthLoading,
  isLoggedIn,
  currentLang,
  navItems,
  handleLanguageChange,
}) {
  return (
    <div className="bg-main/90 fixed top-0 z-50 w-full border-b border-white/10 backdrop-blur-sm ">
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
                  `rounded-lg px-3 py-2 transition-colors duration-200 hover:bg-white/10 ${isActive
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
        <div className="relative flex flex-1 items-center justify-end space-x-4">
          <button
            className="text-primary hover:bg-primary/20 flex items-center space-x-2 rounded-lg bg-white/10 px-3 py-2 transition-all duration-200"
            onClick={() =>
              handleLanguageChange(currentLang === "ar" ? "en" : "ar")
            }
          >
            {currentLang === "ar" ? "en" : "ar"}
          </button>
          {isAuthLoading ? (
            <Skeleton sx={{ bgcolor: 'grey.900' }} animation="wave" variant="text" width={120} height={70} />
          ) : (isLoggedIn === true ? (
            <UserDropDownContainer />
          ) : (isLoggedIn === false ? (
            <Link to='/login'>
              <button className="text-primary hover:bg-primary/20 flex items-center space-x-2 rounded-lg bg-white/10 px-3 py-2 transition-all duration-200 tracking-wide font-secondary">SignIn/Up</button>
            </Link>
          ) : null))}
        </div>
      </div>
    </div >
  );
}

export default HeaderPresentional;
