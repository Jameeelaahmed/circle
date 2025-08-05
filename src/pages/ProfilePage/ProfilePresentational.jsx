import ProfileHeader from "../../components/ProfileComponents/ProfileHeader";
import ProfileCover from "../../components/ProfileComponents/ProfileCover";
import ProfileInfo from "../../components/ProfileComponents/ProfileInfo";
import ProfileStats from "../../components/ProfileComponents/ProfileStats";
import ProfileTabs from "../../components/ProfileComponents/ProfileTabs";
import ProfileContent from "../../components/ProfileComponents/ProfileContent";

const ProfilePresentational = ({
    showMobileMenu,
    setShowMobileMenu,
    profileData,
    isProfileMyProfile,
    isFollowing,
    handleFollow,
    showEditMode,
    setShowEditMode,
    activeTab,
    setActiveTab,
}) => {
    return (
        <div
            className="min-h-screen bg-main"
            style={{
                marginTop: "4rem",
                fontFamily: "var(--font-primary)",
                color: "var(--color-text)",
            }}
        >
            <ProfileHeader
                showMobileMenu={showMobileMenu}
                setShowMobileMenu={setShowMobileMenu}
            />

            <div className="max-w-8xl mx-auto px-3 sm:px-4 lg:px-6">
                <div className="relative">
                    <ProfileCover
                        coverImage={profileData.coverPhoto}
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

                    <ProfileStats stats={profileData.stats} />
                </div>

                <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

                <ProfileContent activeTab={activeTab} profileData={profileData} />
            </div>
        </div>
    );
};

export default ProfilePresentational;
