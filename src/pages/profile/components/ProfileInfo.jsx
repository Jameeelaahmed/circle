import React from "react";
import { MapPin, Calendar, MessageCircle, Camera, Edit3 } from "lucide-react";
import { COLORS, FONTS, SHADOWS, RADII } from "../../../constants";

const ProfileInfo = ({
  profileData,
  isFollowing,
  handleFollow,
  showEditMode,
  setShowEditMode,
}) => {
  const handleHover = (e, shadow) => {
    e.target.style.boxShadow = shadow;
  };

  const handleLeave = (e, originalShadow = "none") => {
    e.target.style.boxShadow = originalShadow;
  };

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
        {/* Profile Image and Basic Info */}
        <div className="flex flex-col space-y-3 sm:flex-row sm:items-end sm:space-y-0 sm:space-x-4">
          <div className="relative self-center sm:self-auto">
            <img
              src={profileData.avatar}
              alt={profileData.name}
              className="h-20 w-20 border-2 object-cover sm:h-24 sm:w-24 sm:border-4 lg:h-32 lg:w-32"
              style={{
                borderRadius: RADII.pill,
                borderColor: COLORS.light,
                boxShadow: SHADOWS.softPrimary,
              }}
            />
            <button
              className="absolute right-1 bottom-1 rounded-full p-1 transition-all duration-300 sm:right-2 sm:bottom-2 sm:p-2"
              style={{
                backgroundColor: COLORS.primary,
                borderRadius: RADII.pill,
                boxShadow: SHADOWS.btnPrimary,
              }}
              onMouseEnter={(e) => handleHover(e, SHADOWS.btnPrimaryHover)}
              onMouseLeave={(e) => handleLeave(e, SHADOWS.btnPrimary)}
            >
              <Camera className="h-3 w-3 text-white sm:h-4 sm:w-4" />
            </button>
          </div>

          <div className="flex-1 pb-2 text-center sm:pb-4 sm:text-left">
            <h1
              className="mb-1 text-xl font-bold sm:text-2xl lg:text-3xl"
              style={{
                fontFamily: FONTS.heading,
                color: COLORS.light,
              }}
            >
              {profileData.name}
            </h1>
            <p
              className="mb-2 text-sm sm:text-base"
              style={{ color: COLORS.text }}
            >
              {profileData.username}
            </p>
            <p
              className="mb-3 text-xs leading-relaxed sm:text-sm"
              style={{ color: COLORS.text }}
            >
              {profileData.bio}
            </p>
            <div className="flex flex-col items-center justify-center space-y-1 text-xs sm:flex-row sm:justify-start sm:space-y-0 sm:space-x-4 sm:text-sm">
              <span
                className="flex items-center"
                style={{ color: COLORS.text }}
              >
                <MapPin className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                {profileData.location}
              </span>
              <span
                className="flex items-center"
                style={{ color: COLORS.text }}
              >
                <Calendar className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                Joined {profileData.joinDate}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
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
          <button
            onClick={() => setShowEditMode(!showEditMode)}
            className="flex items-center justify-center rounded-full px-3 py-2 transition-all duration-300 sm:inline-flex sm:px-4"
            style={{
              borderRadius: RADII.pill,
              backgroundColor: COLORS.glass,
              color: COLORS.text,
              border: `1px solid ${COLORS.secondary}`,
            }}
            onMouseEnter={(e) => handleHover(e, SHADOWS.btnSecondaryHover)}
            onMouseLeave={(e) => handleLeave(e)}
          >
            <Edit3 className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="ml-2 sm:hidden">Edit Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
