import React, { useEffect, useState } from "react";
import {
  MapPin,
  Calendar,
  MessageCircle,
  Camera,
  Edit3,
  Check,
  X,
} from "lucide-react";
import { COLORS, FONTS, SHADOWS, RADII } from "../../constants";
import { auth } from "../../firebase-config";
import { updateUserProfile } from "../../fire_base/profileController/profileController";
import { useDispatch, useSelector } from "react-redux";
import { setProfileData } from "../../features/userProfile/profileSlice";

const ProfileInfo = ({
  isProfileMyProfile,
  profileData,
  isFollowing,
  handleFollow,
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
      formData.append("upload_preset", "cercle");
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
      const imageUrl = data.secure_url;

      await updateUserProfile(auth.currentUser.uid, {
        avatarPhoto: imageUrl,
      });

      // Update local state
      dispatch(setProfileData({ avatarPhoto: imageUrl }));
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
        <div className="text-center" style={{ color: COLORS.text }}>
          Loading profile...
        </div>
      </div>
    );
  }

  return (
    <div
      className="px-3 pb-4 sm:px-4 sm:pb-6 lg:px-6"
      style={{
        backgroundColor: COLORS.dark,
        borderRadius: `0 0 ${RADII.rounded} ${RADII.rounded}`,
        boxShadow: SHADOWS.glassCard,
      }}
    >
      <div className="relative z-10 -mt-8 flex flex-col space-y-4 sm:-mt-12 lg:-mt-16">
        {/* Error Message */}
        {uploadError && (
          <div
            className="rounded-lg p-3 text-sm"
            style={{
              backgroundColor: `${COLORS.accent}20`,
              color: COLORS.accent,
              border: `1px solid ${COLORS.accent}`,
            }}
          >
            {uploadError}
          </div>
        )}

        {/* Profile Image and Basic Info */}
        <div className="flex flex-col space-y-3 sm:flex-row sm:items-end sm:space-y-0 sm:space-x-4">
          <div className="relative self-center sm:self-auto">
            <img
              src={profileData.avatarPhoto || "/default-avatar.png"}
              alt={profileData.username || "User"}
              className="h-20 w-20 border-2 object-cover sm:h-24 sm:w-24 sm:border-4 lg:h-32 lg:w-32"
              style={{
                borderRadius: RADII.pill,
                borderColor: COLORS.light,
                boxShadow: SHADOWS.softPrimary,
                opacity: isUploading ? 0.7 : 1,
              }}
            />
            {isProfileMyProfile && (
              <label
                className={`absolute right-1 bottom-1 rounded-full p-1 transition-all duration-300 sm:right-2 sm:bottom-2 sm:p-2 ${
                  isUploading ? "cursor-not-allowed" : "cursor-pointer"
                }`}
                style={{
                  backgroundColor: COLORS.primary,
                  borderRadius: RADII.pill,
                  boxShadow: SHADOWS.btnPrimary,
                  opacity: isUploading ? 0.7 : 1,
                }}
                onMouseEnter={(e) =>
                  !isUploading && handleHover(e, SHADOWS.btnPrimaryHover)
                }
                onMouseLeave={(e) =>
                  !isUploading && handleLeave(e, SHADOWS.btnPrimary)
                }
              >
                <Camera className="h-3 w-3 text-white sm:h-4 sm:w-4" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUpdateAvatar}
                  className="hidden"
                  disabled={isUploading}
                />
              </label>
            )}
            {isUploading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              </div>
            )}
          </div>

          <div className="flex-1 pb-2 text-center sm:pb-4 sm:text-left">
            <h1
              className="mb-1 text-xl font-bold sm:text-2xl lg:text-3xl"
              style={{
                fontFamily: FONTS.heading,
                color: COLORS.light,
              }}
            >
              {profileData.displayName || profileData.username || "User"}
            </h1>
            <p
              className="mb-2 text-sm sm:text-base"
              style={{ color: COLORS.text }}
            >
              @{profileData.username || "username"}
            </p>

            {/* Bio Section */}
            <div className="mb-3">
              {showEditModeBio ? (
                <div className="space-y-2">
                  <textarea
                    value={newBio}
                    onChange={(e) => setNewBio(e.target.value)}
                    placeholder="Tell us about yourself..."
                    maxLength={160}
                    className="w-full resize-none rounded-lg px-3 py-2 text-xs sm:text-sm"
                    style={{
                      backgroundColor: COLORS.glass,
                      color: COLORS.light,
                      border: `1px solid ${COLORS.secondary}`,
                      minHeight: "60px",
                    }}
                    rows={3}
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-xs" style={{ color: COLORS.text }}>
                      {newBio.length}/160
                    </span>
                    <div className="flex space-x-2">
                      <button
                        onClick={handleUpdateBio}
                        className="rounded-full p-1 transition-all duration-200"
                        style={{ color: COLORS.primary }}
                      >
                        <Check className="h-4 w-4" />
                      </button>
                      <button
                        onClick={cancelBioEdit}
                        className="rounded-full p-1 transition-all duration-200"
                        style={{ color: COLORS.accent }}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between">
                  <p
                    className="flex-1 text-xs leading-relaxed sm:text-sm"
                    style={{ color: COLORS.text }}
                  >
                    {profileData.bio ||
                      (isProfileMyProfile
                        ? "Add a bio to tell people about yourself"
                        : "")}
                  </p>
                  {isProfileMyProfile && (
                    <button
                      onClick={() => setShowEditModeBio(true)}
                      className="ml-2 rounded-full p-1 transition-all duration-200"
                      style={{ color: COLORS.text }}
                    >
                      <Edit3 className="h-3 w-3 sm:h-4 sm:w-4" />
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Location and Join Date */}
            <div className="flex flex-col items-center justify-center space-y-1 text-xs sm:flex-row sm:justify-start sm:space-y-0 sm:space-x-4 sm:text-sm">
              <div className="flex items-center" style={{ color: COLORS.text }}>
                <MapPin className="mr-1 h-3 w-3 flex-shrink-0 sm:h-4 sm:w-4" />
                {showEditModeLocation ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      placeholder="Add your location"
                      className="rounded px-2 py-1 text-xs sm:text-sm"
                      style={{
                        backgroundColor: COLORS.glass,
                        color: COLORS.light,
                        border: `1px solid ${COLORS.secondary}`,
                        minWidth: "120px",
                      }}
                    />
                    <button
                      onClick={handleUpdateLocation}
                      className="rounded-full p-1 transition-all duration-200"
                      style={{ color: COLORS.primary }}
                    >
                      <Check className="h-3 w-3" />
                    </button>
                    <button
                      onClick={cancelLocationEdit}
                      className="rounded-full p-1 transition-all duration-200"
                      style={{ color: COLORS.accent }}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <span>
                      {profileData.location ||
                        (isProfileMyProfile
                          ? "Add location"
                          : "Location not set")}
                    </span>
                    {isProfileMyProfile && (
                      <button
                        onClick={() => setShowEditModeLocation(true)}
                        className="ml-2 rounded-full p-1 transition-all duration-200"
                        style={{ color: COLORS.text }}
                      >
                        <Edit3 className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                )}
              </div>

              <span
                className="flex items-center"
                style={{ color: COLORS.text }}
              >
                <Calendar className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                Joined {profileData.joinDate || "Recently"}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {!isProfileMyProfile && (
          <div className="flex flex-col space-y-2 sm:flex-row sm:justify-end sm:space-y-0 sm:space-x-3">
            <button
              onClick={handleFollow}
              className="transform rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 sm:px-6 sm:text-base"
              style={{
                borderRadius: RADII.pill,
                backgroundColor: isFollowing ? COLORS.glass : COLORS.primary,
                color: isFollowing ? COLORS.text : "white",
                boxShadow: isFollowing ? "none" : SHADOWS.btnPrimary,
                fontFamily: FONTS.body,
              }}
              onMouseEnter={(e) => {
                if (!isFollowing) {
                  e.target.style.boxShadow = SHADOWS.btnPrimaryHover;
                }
              }}
              onMouseLeave={(e) => {
                if (!isFollowing) {
                  e.target.style.boxShadow = SHADOWS.btnPrimary;
                }
              }}
            >
              {isFollowing ? "Following" : "Follow"}
            </button>

            <button
              className="rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 sm:px-6 sm:text-base"
              style={{
                borderRadius: RADII.pill,
                backgroundColor: COLORS.accent,
                color: "white",
                fontFamily: FONTS.body,
              }}
              onMouseEnter={(e) => handleHover(e, SHADOWS.btnSecondaryHover)}
              onMouseLeave={(e) => handleLeave(e)}
            >
              <MessageCircle className="mr-2 inline h-3 w-3 sm:h-4 sm:w-4" />
              Message
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileInfo;
