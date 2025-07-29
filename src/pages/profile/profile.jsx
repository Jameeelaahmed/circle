import React, { useState, useEffect } from "react";
import { setProfileData } from "../../features/userProfile/profileSlice";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { getUserProfile } from "../../fire_base/profileController/profileController";
import { auth } from "../../firebase-config";
import { useSelector } from "react-redux";
import ProfilePresentational from "./profilepresentational";
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
    <ProfilePresentational
      {...{
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
      }}
    />
  );
};

export default ProfilePage;
