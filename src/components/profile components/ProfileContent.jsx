import React from "react";
import AboutTab from "./AboutTab";
import CirclesTab from "./CirclesTab";
import { COLORS } from "../../constants";

const ProfileContent = ({ activeTab, profileData }) => {
  // console.log(profileData);

  return (
    <div style={{ backgroundColor: COLORS.dark }}>
      {activeTab === "about" && (
        <AboutTab
          interests={profileData.interests}
          recentActivities={profileData.joninedEvents}
        />
      )}

      {activeTab === "circles" && (
        <CirclesTab joinedCircles={profileData.joinedCircles} />
      )}
    </div>
  );
};

export default ProfileContent;
