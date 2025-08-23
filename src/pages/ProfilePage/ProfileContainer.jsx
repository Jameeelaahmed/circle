import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { auth, db } from "../../firebase-config";
import {
  arrayUnion,
  doc,
  getDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { getUserInfo } from "../../features/user/userSlice";
import ProfilePresentational from "./ProfilePresentational";
import {
  fetchUserProfile,
  fetchViewedProfile,
} from "../../features/userProfile/profileSlice";

const ProfileContainer = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(getUserInfo);
  const { profileId } = useParams();

  // Select correct profile data
  const profile = useSelector((state) =>
    auth.currentUser?.uid === profileId
      ? state.userProfile.profile
      : state.userProfile.viewedProfile,
  );

  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState("about");
  const [showEditMode, setShowEditMode] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isProfileMyProfile, setIsProfileMyProfile] = useState(false);

  // Fetch profile data
  useEffect(() => {
    if (!profileId) return;
    if (auth.currentUser?.uid === profileId) {
      dispatch(fetchUserProfile(profileId));
      setIsProfileMyProfile(true);
    } else {
      dispatch(fetchViewedProfile(profileId));
      setIsProfileMyProfile(false);
    }
  }, [profileId, dispatch]);

  // Update isFollowing state based on profile
  useEffect(() => {
    if (!profile?.id || !profile.connectionRequests || !userInfo?.uid) return;
    setIsFollowing(
      profile.connectionRequests.some((user) => user.uid === userInfo.uid),
    );
  }, [profile?.connectionRequests, userInfo?.uid, profile?.id]);

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
        profileData: profile,
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

export default ProfileContainer;
