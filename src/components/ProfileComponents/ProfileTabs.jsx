import React from "react";
import { COLORS, FONTS } from "../../constants";

const ProfileTabs = ({ activeTab, setActiveTab }) => {
  const tabs = ["about", "circles"];

  return (
    <div
      className="sticky top-[57px] z-20 overflow-x-auto border-b sm:top-[65px]"
      style={{
        backgroundColor: COLORS.glass,
        backdropFilter: "blur(10px)",
        borderColor: COLORS.dark,
      }}
    >
      <div className="px-3 sm:px-6">
        <nav className="flex min-w-max space-x-6 sm:space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="border-b-2 px-1 py-3 text-sm font-medium whitespace-nowrap capitalize transition-all duration-300 sm:py-4 sm:text-base"
              style={{
                borderBottomColor:
                  activeTab === tab ? COLORS.primary : "transparent",
                color: activeTab === tab ? COLORS.primary : COLORS.text,
                fontFamily: FONTS.body,
              }}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default ProfileTabs;
