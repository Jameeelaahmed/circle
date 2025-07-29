// libs
import { motion as Motion } from "framer-motion";
import { Link } from "react-router";
import { ChevronDown } from "lucide-react";

export default function UserDropdownPresentational({
    user,
    isDropdownOpen,
    setIsDropdownOpen,
    dropdownRef,
    toggleDropdown,
    dropdownItems,
}) {
    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                className="text-primary hover:bg-primary/20 flex items-center space-x-2 rounded-lg bg-inputsBg px-3 py-2 transition-all duration-200"
            >
                {/* Primary colored circular letter */}
                <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-full">
                    <span className="text-sm font-bold text-white">{(user && user.charAt(0).toUpperCase()) || ""}</span>
                </div>

                <ChevronDown
                    className={`text-primary h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
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
                className={`bg-main absolute top-full z-50 mt-2 w-48 overflow-hidden rounded-lg border border-white/10 shadow-lg ltr:right-0 rtl:left-0 ${isDropdownOpen ? "pointer-events-auto" : "pointer-events-none"}`}
            >
                {dropdownItems.map((item, index) =>
                    item.onClick ? (
                        <button
                            key={index}
                            onClick={item.onClick}
                            className="hover:bg-primary/20 block w-full px-4 py-3 ltr:text-left rtl:text-right text-sm text-white transition-colors"
                            type="button"
                        >
                            {item.label}
                        </button>
                    ) : (
                        <Link
                            key={index}
                            to={item.href}
                            className="hover:bg-primary/20 block px-4 py-3 text-sm text-white transition-colors"
                            onClick={() => setIsDropdownOpen(false)}
                        >
                            {item.label}
                        </Link>
                    )
                )}
            </Motion.div>
        </div>
    );
}
