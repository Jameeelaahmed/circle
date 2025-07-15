99// libs
import { motion as Motion } from "framer-motion"
import { Link, NavLink } from "react-router";

// icons
import { ChevronDown } from "lucide-react"

function HeaderPresentional({ isDropdownOpen, setIsDropdownOpen, currentLang, dropdownRef, toggleDropdown, dropdownItems, navItems, handleLanguageChange }) {
    return (
        <div className="w-full bg-main/90 backdrop-blur-sm border-b border-white/10 z-50 fixed top-0">
            <div className="w-full px-2 sm:px-4 lg:px-6 h-16 flex items-center ">
                {/* <div className="flex items-center justify-between h-16"> */}
                {/* Left - Navigation Items */}
                <div className="flex items-center flex-1">
                    <div className="hidden md:flex items-center space-x-6">
                        {navItems.map((item, index) => (
                            <NavLink
                                key={index}
                                to={item.href}
                                className={({ isActive }) =>
                                    `transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-white/10 ${isActive
                                        ? "text-primary bg-white/10"
                                        : "text-white hover:text-primary"
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
                    className="flex-shrink-0 flex items-center absolute ltr:left-1/2 rtl:right-1/2 transform -translate-x-1/2"
                >
                    <Link to="/" className="flex items-center">
                        <svg
                            className="w-12 h-12"
                            viewBox="0 0 100 100"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-label="Circle Home"
                        >
                            {/* Modern concentric circles with gradient */}
                            <defs>
                                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
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
                            <circle
                                cx="50"
                                cy="50"
                                r="8"
                                fill="#ff6b8b"
                            />
                        </svg>
                    </Link>
                </Motion.div>

                {/* Right - Button with Dropdown */}
                <div className="flex items-center space-x-4 flex-1 justify-end relative" ref={dropdownRef}>
                    <button
                        className="flex items-center space-x-2 px-3 py-2 bg-white/10 text-primary hover:bg-primary/20 rounded-lg transition-all duration-200"
                        onClick={() => handleLanguageChange(currentLang === "ar" ? "en" : "ar")}
                    >
                        {currentLang === "ar" ? "en" : "ar"}
                    </button>
                    <button
                        onClick={toggleDropdown}
                        className="flex items-center space-x-2 px-3 py-2 bg-white/10 text-primary hover:bg-primary/20 rounded-lg transition-all duration-200"
                    >
                        {/* Primary colored circular letter */}
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold">U</span>
                        </div>

                        {/* Dropdown icon */}
                        <ChevronDown
                            className={`w-4 h-4 text-primary transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''
                                }`}
                        />
                    </button>

                    {/* Dropdown Menu */}
                    <Motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{
                            opacity: isDropdownOpen ? 1 : 0,
                            scale: isDropdownOpen ? 1 : 0.95,
                            y: isDropdownOpen ? 0 : -10
                        }}
                        transition={{ duration: 0.2 }}
                        className={`absolute top-full ltr:right-0 rtl:left-0 mt-2 w-48 bg-main/90 backdrop-blur-sm border border-white/10 rounded-lg shadow-lg overflow-hidden z-50 ${isDropdownOpen ? 'pointer-events-auto' : 'pointer-events-none'
                            }`}
                    >
                        {dropdownItems.map((item, index) => (
                            <Link
                                key={index}
                                to={item.href}
                                className="block px-4 py-3 text-white hover:bg-primary/20 transition-colors text-sm"
                                onClick={() => setIsDropdownOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </Motion.div>
                </div>
            </div>
        </div >
    )
}

export default HeaderPresentional
