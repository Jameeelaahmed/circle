import { useState, useEffect } from "react";
import { setProfileData } from "../../features/userProfile/profileSlice";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { getUserProfile } from "../../fire_base/profileController/profileController";
import { auth, db } from "../../firebase-config";
import { useSelector } from "react-redux";
import ProfilePresentational from "./profilepresentational";
import {
  
  arrayUnion,
  doc,
  getDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { getUserInfo } from "../../features/user/userSlice";
const ProfilePage = () => {
  const profileData = useSelector((state) => state.profileData);
  const userInfo = useSelector(getUserInfo);
  const [isFollowing, setIsFollowing] = useState(false);

  const [activeTab, setActiveTab] = useState("about");
  const [showEditMode, setShowEditMode] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isProfileMyProfile, setIsProfileMyProfile] = useState(false);
  const dispatch = useDispatch();
  const { profileId } = useParams();

  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await getUserProfile(profileId);
      console.log(profile)
      dispatch(setProfileData(profile));

      if (auth.currentUser.uid === profileId) {
        setIsProfileMyProfile(true);
      }
    };

    fetchProfile();
  }, [profileId]);

  useEffect(() => {
    if (!profileData?.id || !profileData.connectionRequests || !userInfo?.uid)
      return;

    setIsFollowing(
      profileData.connectionRequests.some((user) => user.uid === userInfo.uid),
    );
  }, [profileData.connectionRequests, userInfo?.uid]);

  const handleFollow = async () => {
    setIsFollowing(!isFollowing);
    const userRef = doc(db, "users", profileId);
    if (isFollowing) {
      const snap = await getDoc(userRef);
      if (snap.exists()) {
        const data = snap.data();
        const requests = data.connectionRequests || [];

        const updatedRequests = requests.filter(
          (req) => req.uid !== userInfo.uid,
        );

        await updateDoc(userRef, {
          connectionRequests: updatedRequests,
        });
      }
    } else {
      await updateDoc(userRef, {
        ["connectionRequests"]: arrayUnion({
          email: userInfo.email,
          uid: userInfo.uid,
          username: userInfo.username,
          sentAt: Timestamp.now(),
        }),
      });
    }
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
