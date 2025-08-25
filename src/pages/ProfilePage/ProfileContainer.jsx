import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import {  doc, updateDoc, arrayUnion, getDoc, increment } from "firebase/firestore";
import { auth ,db } from "../../firebase-config";
import { getUserInfo } from "../../features/user/userSlice";
import ProfilePresentational from "./ProfilePresentational";
import { updateUserProfile } from "../../fire_base/profileController/profileController";
import {
  fetchUserProfile,
  fetchViewedProfile,
} from "../../features/userProfile/profileSlice";
import { sendConnectionRequestNotification } from "../../fire_base/notificationController/notificationController";
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

  const [isConnected, setIsConnected] = useState(false);
  const [activeTab, setActiveTab] = useState("about");
  const [showEditMode, setShowEditMode] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isProfileMyProfile, setIsProfileMyProfile] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [reported, setReported] = useState(false);
  const [isReporting, setIsReporting] = useState(false);

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

  // Update isConnected state based on profile
  useEffect(() => {
    if (!profile?.connectionRequests || !userInfo?.uid) {
      setIsConnected(false);
      return;
    }

    // Check if current user's UID is in the profile's connectionRequests array
    const isCurrentUserConnected = profile.connectionRequests.some(
      (request) => request.uid === userInfo.uid || request === userInfo.uid,
    );
    setIsConnected(isCurrentUserConnected);
  }, [profile?.connectionRequests, userInfo?.uid]);

  const handleConnect = async () => {
    if (isConnecting) return; // Prevent multiple clicks

    setIsConnecting(true);

    try {
      const currentConnectionRequests = profile.connectionRequests || [];
      let updatedConnectionRequests;

      if (isConnected) {
        // Remove connection - filter out current user's UID
        updatedConnectionRequests = currentConnectionRequests.filter(
          (request) => {
            // Handle both object format and string format
            const requestUid =
              typeof request === "object" ? request.uid : request;
            return requestUid !== userInfo.uid;
          },
        );
        setIsConnected(false);
      } else {
        // Add connection - add current user's UID
        updatedConnectionRequests = [
          ...currentConnectionRequests,
          userInfo.uid,
        ];
        setIsConnected(true);
        sendConnectionRequestNotification(
          profileId,
          userInfo.username,
          userInfo.uid,
          userInfo.photoURL,
          userInfo.username,
        );
      }

      // Update the profile with new connection requests
      await updateUserProfile(profileId, {
        connectionRequests: updatedConnectionRequests,
      });

      // Optionally refresh the profile data
      dispatch(fetchViewedProfile(profileId));
    } catch (error) {
      console.error("Error updating connection:", error);
      // Revert the state on error
      setIsConnected(!isConnected);
    } finally {
      setIsConnecting(false);
    }
  };

 

// Check if user already reported 
useEffect(() => {
  if (!profile?.reportedBy || !userInfo?.uid) {
    setReported(false);
    return;
  }

  const isCurrentUserReported = profile.reportedBy.some(
    (reporter) =>
      (typeof reporter === "object" ? reporter.uid : reporter) === userInfo.uid
  );

  setReported(isCurrentUserReported);
}, [profile?.reportedBy, userInfo?.uid]);

// Handle report/unreport
const handleReport = async () => {
  if (isReporting) return;

  setIsReporting(true);

  try {
    const currentReports = profile.reportedBy || [];
    let updatedReports;

    if (reported) {
      // User already reported → remove report (if you want toggle)
      updatedReports = currentReports.filter((r) => {
        const reporterId = typeof r === "object" ? r.uid : r;
        return reporterId !== userInfo.uid;
      });
      setReported(false);
    } else {
      // Add report
      updatedReports = [...currentReports, userInfo.uid];
      setReported(true);
    }

    // Check if user should be blocked
    const shouldBlock = updatedReports.length >= 2;

    // Update user document
    await updateUserProfile(profileId, {
      reportedBy: updatedReports,
      reports: updatedReports.length,
      ...(shouldBlock && { isBlocked: true }), // add isBlocked when >= 2
    });

    // Refresh profile data
    dispatch(fetchViewedProfile(profileId));
  } catch (error) {
    console.error("Error reporting user:", error);
    setReported(!reported);
  } finally {
    setIsReporting(false);
  }
};



  return (
    <ProfilePresentational
      {...{
        showMobileMenu,
        setShowMobileMenu,
        profileData: profile,
        isProfileMyProfile,
        isConnected,
        handleConnect,
        showEditMode,
        setShowEditMode,
        activeTab,
        setActiveTab,
        isConnecting,
        handleReport,
        reported,
        isReporting
      }}
    />
  );
};

export default ProfileContainer;
