import React from "react";

const ProfileTabs = ({ activeTab, setActiveTab }) => {
  const tabs = ["about", "circles", "connections"];

  return (
    <div className="border-main sticky top-[57px] z-20 mx-3 overflow-x-auto border-b backdrop-blur-md sm:top-[65px]">
      <div className="px-3 sm:px-6">
        <nav className="flex min-w-max space-x-6 sm:space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`textspace-nowrap cursor-pointer border-b-2 px-1 py-3 text-sm font-medium capitalize transition-all duration-300 sm:py-4 sm:text-base ${
                activeTab === tab
                  ? "border-primary text-primary"
                  : "text-text border-transparent"
              } `}
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
