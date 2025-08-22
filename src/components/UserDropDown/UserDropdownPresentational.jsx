// libs
import { motion as Motion } from "framer-motion";
import { Link } from "react-router";
import { ChevronDown, User, Settings, LogOut } from "lucide-react";

export default function UserDropdownPresentational({
    user,
    isDropdownOpen,
    setIsDropdownOpen,
    dropdownRef,
    toggleDropdown,
    dropdownItems,
}) {
    // Define icons for common dropdown items
    const itemIcons = {
        profile: <User className="w-4 h-4" />,
        settings: <Settings className="w-4 h-4" />,
        logout: <LogOut className="w-4 h-4" />
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                className="text-primary hover:bg-primary/10 flex items-center space-x-2 rounded-lg bg-inputsBg px-3 py-2 transition-all duration-200 border border-text/10"
                aria-label="User menu"
            >
                {/* User avatar */}
                <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-full">
                    <span className="text-sm font-bold text-text">{(user && user.charAt(0).toUpperCase()) || ""}</span>
                </div>

                <ChevronDown
                    className={`text-primary h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                />
            </button>

            {/* Dropdown Menu */}
            <Motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{
                    opacity: isDropdownOpen ? 1 : 0,
                    y: isDropdownOpen ? 5 : -10,
                    scale: isDropdownOpen ? 1 : 0.95
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={`bg-main absolute top-full z-50 mt-2 w-56 overflow-hidden rounded-lg border border-text/10 shadow-lg ltr:right-0 rtl:left-0 ${isDropdownOpen ? "pointer-events-auto" : "pointer-events-none"}`}
            >
                {/* User info header */}
                <div className="px-4 py-3 border-b border-text/10">
                    <p className="text-sm font-medium text-text truncate">
                        {user || "Guest User"}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                        {user ? "Premium Account" : "Sign in to access features"}
                    </p>
                </div>

                {/* Dropdown items */}
                <div className="py-1">
                    {dropdownItems.map((item, index) => {
                        const icon = itemIcons[item.iconKey] || null;

                        return item.onClick ? (
                            <button
                                key={index}
                                onClick={item.onClick}
                                className="hover:bg-primary/10 w-full flex items-center px-4 py-3 ltr:text-left rtl:text-right text-sm text-text transition-colors gap-3"
                                type="button"
                            >
                                {icon}
                                {item.label}
                            </button>
                        ) : (
                            <Link
                                key={index}
                                to={item.href}
                                className="hover:bg-primary/10 flex items-center px-4 py-3 text-sm text-text transition-colors gap-3"
                                onClick={() => setIsDropdownOpen(false)}
                            >
                                {icon}
                                {item.label}
                            </Link>
                        )
                    })}
                </div>
            </Motion.div>
        </div>
    );
}