import React, { useState, useEffect } from "react";
import ProfileHeader from "./components/ProfileHeader";
import ProfileCover from "./components/ProfileCover";
import ProfileInfo from "./components/ProfileInfo";
import ProfileStats from "./components/ProfileStats";
import ProfileTabs from "./components/ProfileTabs";
import ProfileContent from "./components/ProfileContent";
import { COLORS, FONTS } from "../../constants";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { getUserProfile } from "../../fire_base/profileController/profileController";
import { auth } from "../../firebase-config";
const ProfilePage = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState("about");
  const [showEditMode, setShowEditMode] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isProfileMyProfile, setIsProfileMyProfile] = useState(false);
  const dispatch = useDispatch();
  const { profileId } = useParams();

  const [profileData, setprofileData] = useState({
    name: "ahmed adel",
    username: "",
    bio: "",
    location: "",
    joinDate: "",
    avatar: "",
    coverImage: "",
    stats: {
      circles: 10,
      followers: 1000,
      following: 1000,
    },
    interests: [""],
    recentActivities: [
      {
        type: "joined",
        text: "Joined Photography Meetup",
        time: "2 hours ago",
      },
    ],
  });

  useEffect(() => {
    const fitchProfile = async () => {
      const profile = await getUserProfile(profileId);
      console.log(profile);
      // setprofileData(profile);
      setprofileData(profile);
      if (auth.currentUser.uid === profileId) {
        setIsProfileMyProfile(true);
      }
      // profileData.name = profile.displayName;
      // profileData.avatar = profile.photoURL;
    };
    fitchProfile();
  }, []);

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
          <ProfileCover coverImage={profileData.coverImage} />

          <ProfileInfo
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
