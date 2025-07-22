import React from "react";
import AboutTab from "./AboutTab";
import CirclesTab from "./CirclesTab";
import { COLORS } from "../../../constants";

const ProfileContent = ({ activeTab, profileData }) => {
  return (
    <div style={{ backgroundColor: COLORS.dark }}>
      {activeTab === "about" && (
        <AboutTab
          interests={profileData.interests}
          recentActivities={profileData.recentActivities}
        />
      )}

      {activeTab === "circles" && <CirclesTab />}
    </div>
  );
};

export default ProfileContent;
