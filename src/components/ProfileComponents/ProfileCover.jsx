import React, { useState } from "react";
import { auth } from "../../firebase-config";
import { updateUserProfile } from "../../fire_base/profileController/profileController";
import { useDispatch } from "react-redux";
import { setProfileData } from "../../features/userProfile/profileSlice";
import ProfileCoverPresentional from "./ProfileCoverPresentioal";
const ProfileCover = ({ coverImage, isProfileMyProfile }) => {
  const dispatch = useDispatch();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const handleHover = (e, shadow) => {
    e.target.style.boxShadow = shadow;
  };

  const handleLeave = (e, originalShadow = "none") => {
    e.target.style.boxShadow = originalShadow;
  };

  const handleUpdateCover = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type and size
    if (!file.type.startsWith("image/")) {
      setUploadError("Please select a valid image file");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      // 10MB limit for cover images
      setUploadError("Image size must be less than 10MB");
      return;
    }

    setIsUploading(true);
    setUploadError("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "coverPic");
      formData.append("folder", "coverPic");

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
      const imageUrl = data.secure_url;

      await updateUserProfile(auth.currentUser.uid, {
        coverPhoto: imageUrl,
      });

      // Update local state
      dispatch(setProfileData({ coverPhoto: imageUrl }));
    } catch (error) {
      console.error("Error uploading cover:", error);
      setUploadError("Failed to update cover photo. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };
  return (
    <ProfileCoverPresentional
      coverImage={coverImage}
      isProfileMyProfile={isProfileMyProfile}
      handleHover={handleHover}
      handleLeave={handleLeave}
      handleUpdateCover={handleUpdateCover}
      isUploading={isUploading}
      uploadError={uploadError}
    />
  );
};

export default ProfileCover;
