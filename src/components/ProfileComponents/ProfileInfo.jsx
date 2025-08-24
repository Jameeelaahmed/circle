import { useEffect, useState } from "react";
import { auth } from "../../firebase-config";
import { updateUserProfile } from "../../fire_base/profileController/profileController";
import { useDispatch } from "react-redux";
import { setProfileData } from "../../features/userProfile/profileSlice";
import ProfileInfoPresentioal from "./ProfileInfoPresentional";

const ProfileInfo = ({
  isProfileMyProfile,
  profileData,
  isConnected,
  handleConnect,
  isConnecting,
}) => {
  const dispatch = useDispatch();
  const [showEditModeLocation, setShowEditModeLocation] = useState(false);
  const [showEditModeBio, setShowEditModeBio] = useState(false);
  const [newBio, setNewBio] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  // Initialize state values when profileData changes
  useEffect(() => {
    if (profileData) {
      setNewBio(profileData.bio || "");
      setNewLocation(profileData.location || "");

      // Auto-enable edit mode for empty fields only on initial load
      if (!profileData.bio && isProfileMyProfile) {
        setShowEditModeBio(true);
      }
      if (!profileData.location && isProfileMyProfile) {
        setShowEditModeLocation(true);
      }
    }
  }, [profileData, isProfileMyProfile]);

  const handleUpdateAvatar = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type and size
    if (!file.type.startsWith("image/")) {
      setUploadError("Please select a valid image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      setUploadError("Image size must be less than 5MB");
      return;
    }

    setIsUploading(true);
    setUploadError("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "coverPic");
      formData.append("folder", "profilePic");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dlyfph65r/image/upload",
        {
          method: "POST",
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      const photoUrl = data.secure_url;

      await updateUserProfile(auth.currentUser.uid, {
        photoUrl: photoUrl,
      });

      // Update local state
      dispatch(setProfileData({ photoUrl: photoUrl }));
    } catch (error) {
      console.error("Error uploading avatar:", error);
      setUploadError("Failed to update profile picture. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleUpdateLocation = async () => {
    if (!newLocation.trim()) {
      setUploadError("Location cannot be empty");
      return;
    }

    try {
      await updateUserProfile(auth.currentUser.uid, {
        location: newLocation.trim(),
      });

      dispatch(setProfileData({ location: newLocation.trim() }));
      setShowEditModeLocation(false);
      setUploadError("");
    } catch (error) {
      console.error("Error updating location:", error);
      setUploadError("Failed to update location. Please try again.");
    }
  };

  const handleUpdateBio = async () => {
    if (newBio.length > 160) {
      setUploadError("Bio must be 160 characters or less");
      return;
    }

    try {
      await updateUserProfile(auth.currentUser.uid, {
        bio: newBio.trim(),
      });

      dispatch(setProfileData({ bio: newBio.trim() }));
      setShowEditModeBio(false);
      setUploadError("");
    } catch (error) {
      console.error("Error updating bio:", error);
      setUploadError("Failed to update bio. Please try again.");
    }
  };

  const cancelLocationEdit = () => {
    setNewLocation(profileData.location || "");
    setShowEditModeLocation(false);
    setUploadError("");
  };

  const cancelBioEdit = () => {
    setNewBio(profileData.bio || "");
    setShowEditModeBio(false);
    setUploadError("");
  };

  const handleHover = (e, shadow) => {
    e.target.style.boxShadow = shadow;
  };

  const handleLeave = (e, originalShadow = "none") => {
    e.target.style.boxShadow = originalShadow;
  };

  if (!profileData) {
    return (
      <div className="flex h-48 items-center justify-center px-3 pb-4 sm:px-4 sm:pb-6 lg:px-6">
        <div className="text-center" style={{ color: "var(--color-text)" }}>
          Loading profile...
        </div>
      </div>
    );
  }

  return (
    <ProfileInfoPresentioal
      {...{
        profileData,
        isUploading,
        uploadError,
        isProfileMyProfile,
        handleHover,
        handleLeave,
        showEditModeBio,
        setShowEditModeBio,
        newBio,
        setNewBio,
        handleUpdateBio,
        cancelBioEdit,
        showEditModeLocation,
        setShowEditModeLocation,
        newLocation,
        setNewLocation,
        handleUpdateLocation,
        cancelLocationEdit,
        handleUpdateAvatar,
        handleConnect,
        isConnected,
        isConnecting,
      }}
    />
  );
};

export default ProfileInfo;
