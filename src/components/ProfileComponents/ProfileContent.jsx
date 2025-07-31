import AboutTab from "./AboutTab";
import CirclesTab from "./CirclesTab";

const ProfileContent = ({ activeTab, profileData }) => {
  // console.log(profileData);

  return (
    <div className="bg-white/5 backdrop-blur-2xl mb-8 rounded-b-2xl shadow-md">
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
