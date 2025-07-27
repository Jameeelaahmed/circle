import React, { useState, useEffect } from "react";
import ProfileHeader from "../../components/ProfileComponents/ProfileHeader";
import ProfileCover from "../../components/ProfileComponents/ProfileCover";
import ProfileInfo from "../../components/ProfileComponents/ProfileInfo";
import ProfileStats from "../../components/ProfileComponents/ProfileStats";
import ProfileTabs from "../../components/ProfileComponents/ProfileTabs";
import ProfileContent from "../../components/ProfileComponents/ProfileContent";
import { setProfileData } from "../../features/userProfile/profileSlice";
import { COLORS, FONTS } from "../../constants";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { getUserProfile } from "../../fire_base/profileController/profileController";
import { auth } from "../../firebase-config";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState("about");
  const [showEditMode, setShowEditMode] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isProfileMyProfile, setIsProfileMyProfile] = useState(false);
  const dispatch = useDispatch();
  const profileData = useSelector((state) => state.profileData);
  const { profileId } = useParams();

  useEffect(() => {
    const fitchProfile = async () => {
      const profile = await getUserProfile(profileId);

      dispatch(setProfileData(profile));
      console.log(profileData);

      if (auth.currentUser.uid === profileId) {
        setIsProfileMyProfile(true);
      }
    };
    fitchProfile();
  }, [profileId]);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: COLORS.darker,
        fontFamily: FONTS.body,
        color: COLORS.text,
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

export default ProfilePage;
