import React from "react";
import { Share2, Settings } from "lucide-react";
import { COLORS } from "../../constants";

const ProfileHeader = ({ showMobileMenu, setShowMobileMenu }) => {
  return (
    <div
      className="sticky top-0 z-50 border-b"
      style={{
        backgroundColor: COLORS.glass,
        backdropFilter: "blur(10px)",
        borderColor: COLORS.dark,
      }}
    >
      {/* Mobile Menu */}
      {showMobileMenu && (
        <div
          className="space-y-2 border-t px-4 py-3 sm:hidden"
          style={{
            backgroundColor: COLORS.glass,
            borderColor: COLORS.dark,
          }}
        >
          <button
            className="flex w-full items-center space-x-3 rounded-lg p-2 transition-all duration-300"
            style={{
              backgroundColor: COLORS.glass,
              color: COLORS.text,
            }}
          >
            <Share2 className="h-4 w-4" />
            <span className="text-sm">Share Profile</span>
          </button>
          <button
            className="flex w-full items-center space-x-3 rounded-lg p-2 transition-all duration-300"
            style={{
              backgroundColor: COLORS.glass,
              color: COLORS.text,
            }}
          >
            <Settings className="h-4 w-4" />
            <span className="text-sm">Settings</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileHeader;
