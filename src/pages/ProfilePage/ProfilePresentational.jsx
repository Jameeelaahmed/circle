import ProfileHeader from "../../components/ProfileComponents/ProfileHeader";
import ProfileCover from "../../components/ProfileComponents/ProfileCover";
import ProfileInfo from "../../components/ProfileComponents/ProfileInfo";
import ProfileStats from "../../components/ProfileComponents/ProfileStats";
import ProfileTabs from "../../components/ProfileComponents/ProfileTabs";
import ProfileContent from "../../components/ProfileComponents/ProfileContent";

const ProfilePresentational = ({
  profileData,
  showMobileMenu,
  setShowMobileMenu,
  isProfileMyProfile,
  isFollowing,
  handleFollow,
  showEditMode,
  setShowEditMode,
  activeTab,
  setActiveTab,
}) => {
  if (!profileData) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="bg-main text-text mt-16 min-h-screen">
      <ProfileHeader
        showMobileMenu={showMobileMenu}
        setShowMobileMenu={setShowMobileMenu}
      />

      <div className="max-w-8xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="relative">
          <ProfileCover
            coverImage={profileData?.coverPhoto}
            isProfileMyProfile={isProfileMyProfile}
          />

          <ProfileInfo
            isProfileMyProfile={isProfileMyProfile}
            profileData={profileData}
            isFollowing={isFollowing}
            handleFollow={handleFollow}
            showEditMode={showEditMode}
            setShowEditMode={setShowEditMode}
          />

          {/* <ProfileStats profileData={profileData} /> */}
        </div>

        <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <ProfileContent activeTab={activeTab} profileData={profileData} />
      </div>
    </div>
  );
};

export default ProfilePresentational;
