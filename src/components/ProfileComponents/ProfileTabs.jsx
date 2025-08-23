import React from "react";

const ProfileTabs = ({ activeTab, setActiveTab }) => {
  const tabs = ["about", "circles"];

  return (
    <div
      className="
        sticky top-[57px] z-20 overflow-x-auto border-b sm:top-[65px]
        bg-text/5 backdrop-blur-md border-main
      "
    >
      <div className="px-3 sm:px-6">
        <nav className="flex min-w-max space-x-6 sm:space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                border-b-2 px-1 py-3 text-sm font-medium textspace-nowrap capitalize
                transition-all duration-300 sm:py-4 sm:text-base
                ${activeTab === tab
                  ? "border-primary text-primary"
                  : "border-transparent text-text"
                }
              `}
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
