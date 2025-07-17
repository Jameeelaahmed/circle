// libs
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";
import { useNavigate } from "react-router";
import { clearUserInfo } from "../../features/user/userSlice";
// components
import UserDropdownPresentational from "./UserDropdownPresentational";
function UserDropDownContainer() {
    const { user } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { t } = useTranslation();
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    useEffect(() => {
        if (!isDropdownOpen) return;
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isDropdownOpen]);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };


    const handleLogout = async () => {
        try {
            console.log("before await");

            await signOut(auth);
            console.log("after await");
            clearUserInfo();
            navigate('/login')
            setIsDropdownOpen(false);
        } catch (error) {
            // Optionally handle error (e.g., show toast)
            console.error("Logout error:", error);
        }
    };

    const dropdownItems = [
        { label: t("Profile"), href: "/profile" },
        { label: t("Settings"), href: "/settings" },
        { label: t("Help"), href: "/help" },
        { label: t("Logout"), onClick: handleLogout },
    ];

    return (
        <UserDropdownPresentational
            user={user}
            isDropdownOpen={isDropdownOpen}
            setIsDropdownOpen={setIsDropdownOpen}
            dropdownRef={dropdownRef}
            toggleDropdown={toggleDropdown}
            dropdownItems={dropdownItems}
        />
    );
}

export default UserDropDownContainer
