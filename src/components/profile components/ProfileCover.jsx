import React, { useState } from "react";
import { Camera } from "lucide-react";
import { COLORS, SHADOWS, RADII } from "../../constants";
import { auth } from "../../firebase-config";
import { updateUserProfile } from "../../fire_base/profileController/profileController";
import { useDispatch } from "react-redux";
import { setProfileData } from "../../features/userProfile/profileSlice";

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
    <div className="relative">
      {/* Error Message */}
      {uploadError && (
        <div
          className="absolute top-2 left-2 z-10 rounded-lg p-2 text-xs sm:text-sm"
          style={{
            backgroundColor: `${COLORS.accent}20`,
            color: COLORS.accent,
            border: `1px solid ${COLORS.accent}`,
            backdropFilter: "blur(10px)",
          }}
        >
          {uploadError}
        </div>
      )}

      <div
        className="relative h-32 overflow-hidden sm:h-48 md:h-56 lg:h-64"
        style={{
          backgroundImage: `url(${coverImage || "/default-cover.jpg"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: `0 0 ${RADII.rounded} ${RADII.rounded}`,
        }}
      >
        <div className="bg-opacity-40 absolute inset-0"></div>

        {/* Loading overlay */}
        {isUploading && (
          <div className="bg-opacity-50 absolute inset-0 flex items-center justify-center bg-black">
            <div className="flex items-center space-x-2 text-white">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              <span className="text-sm">Updating cover photo...</span>
            </div>
          </div>
        )}

        {/* Camera button - only show if viewing own profile */}
        {isProfileMyProfile && (
          <label
            className={`absolute top-2 right-2 rounded-full p-1.5 transition-all duration-300 sm:top-4 sm:right-4 sm:p-2 ${
              isUploading ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            style={{
              backgroundColor: COLORS.glass,
              backdropFilter: "blur(10px)",
              borderRadius: RADII.pill,
              opacity: isUploading ? 0.7 : 1,
            }}
            onMouseEnter={(e) =>
              !isUploading && handleHover(e, SHADOWS.btnSecondaryHover)
            }
            onMouseLeave={(e) => !isUploading && handleLeave(e)}
          >
            <Camera className="h-4 w-4 text-white sm:h-5 sm:w-5" />
            <input
              type="file"
              accept="image/*"
              onChange={handleUpdateCover}
              className="hidden"
              disabled={isUploading}
            />
          </label>
        )}
      </div>
    </div>
  );
};

export default ProfileCover;
