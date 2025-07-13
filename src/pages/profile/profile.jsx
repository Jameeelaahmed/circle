import React, { useState } from "react";
import {
  MapPin,
  Calendar,
  Users,
  MessageCircle,
  Camera,
  Edit3,
  Settings,
  Share2,
  Plus,
  Menu,
  X,
} from "lucide-react";
import CercleCard from "./CercleCard";
import RecentActivities from "./RecentActivities";
import { COLORS, FONTS, SHADOWS, RADII } from "../../constants";

const ProfilePage = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState("about");
  const [showEditMode, setShowEditMode] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const profileData = {
    name: "ahmed adel",
    username: "@3adool",
    bio: "this is bio of ahmed adel this is bio of ahmed adel this is bio of ahmed adel",
    location: "3ain 4ams cairo",
    joinDate: "7 oct 2002",
    avatar:
      "https://images.theconversation.com/files/651621/original/file-20250226-32-jxjhmy.jpg?ixlib=rb-4.1.0&rect=0%2C377%2C6000%2C3000&q=45&auto=format&w=1356&h=668&fit=crop",
    coverImage: "https://wallpapercave.com/wp/wp4606672.jpg",
    stats: {
      circles: 10,
      followers: 1000,
      following: 1000,
    },
    interests: ["soccer", "photography", "cooking", "programming"],
    recentActivities: [
      {
        type: "joined",
        text: "Joined Photography Meetup",
        time: "2 hours ago",
      },
      {
        type: "created",
        text: "Created Coffee Lovers Circle",
        time: "1 day ago",
      },
      { type: "event", text: "Attended Sunday Hike", time: "3 days ago" },
    ],
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const handleHover = (e, shadow) => {
    e.target.style.boxShadow = shadow;
  };

  const handleLeave = (e, originalShadow = "none") => {
    e.target.style.boxShadow = originalShadow;
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
      {/* Header */}
      <div
        className="border-b sticky top-0 z-50"
        style={{
          backgroundColor: COLORS.glass,
          backdropFilter: "blur(10px)",
          borderColor: COLORS.dark,
        }}
      >
        {/* Mobile Menu */}
        {showMobileMenu && (
          <div
            className="sm:hidden border-t px-4 py-3 space-y-2"
            style={{
              backgroundColor: COLORS.glass,
              borderColor: COLORS.dark,
            }}
          >
            <button
              className="w-full flex items-center space-x-3 p-2 rounded-lg transition-all duration-300"
              style={{
                backgroundColor: COLORS.glass,
                color: COLORS.text,
              }}
            >
              <Share2 className="w-4 h-4" />
              <span className="text-sm">Share Profile</span>
            </button>
            <button
              className="w-full flex items-center space-x-3 p-2 rounded-lg transition-all duration-300"
              style={{
                backgroundColor: COLORS.glass,
                color: COLORS.text,
              }}
            >
              <Settings className="w-4 h-4" />
              <span className="text-sm">Settings</span>
            </button>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        {/* Cover & Profile Section */}
        <div className="relative">
          <div
            className="h-32 sm:h-48 md:h-56 lg:h-64 relative overflow-hidden"
            style={{
              backgroundImage: `url(${profileData.coverImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: `0 0 ${RADII.rounded} ${RADII.rounded}`,
            }}
          >
            <div className="absolute inset-0  bg-opacity-40"></div>
            <button
              className="absolute top-2 right-2 sm:top-4 sm:right-4 p-1.5 sm:p-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor: COLORS.glass,
                backdropFilter: "blur(10px)",
                borderRadius: RADII.pill,
              }}
              onMouseEnter={(e) => handleHover(e, SHADOWS.btnSecondaryHover)}
              onMouseLeave={(e) => handleLeave(e)}
            >
              <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </button>
          </div>

          <div
            className="px-3 sm:px-4 lg:px-6 pb-4 sm:pb-6"
            style={{
              backgroundColor: COLORS.dark,
              borderRadius: `0 0 ${RADII.rounded} ${RADII.rounded}`,
              boxShadow: SHADOWS.glassCard,
            }}
          >
            <div className="flex flex-col space-y-4 -mt-8 sm:-mt-12 lg:-mt-16 relative z-10">
              {/* Profile Image and Basic Info */}
              <div className="flex flex-col sm:flex-row sm:items-end space-y-3 sm:space-y-0 sm:space-x-4">
                <div className="relative self-center sm:self-auto">
                  <img
                    src={profileData.avatar}
                    alt={profileData.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 border-2 sm:border-4 object-cover"
                    style={{
                      borderRadius: RADII.pill,
                      borderColor: COLORS.light,
                      boxShadow: SHADOWS.softPrimary,
                    }}
                  />
                  <button
                    className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 p-1 sm:p-2 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: COLORS.primary,
                      borderRadius: RADII.pill,
                      boxShadow: SHADOWS.btnPrimary,
                    }}
                    onMouseEnter={(e) =>
                      handleHover(e, SHADOWS.btnPrimaryHover)
                    }
                    onMouseLeave={(e) => handleLeave(e, SHADOWS.btnPrimary)}
                  >
                    <Camera className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </button>
                </div>

                <div className="text-center sm:text-left flex-1 pb-2 sm:pb-4">
                  <h1
                    className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1"
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
                    className="mb-3 text-xs sm:text-sm leading-relaxed"
                    style={{ color: COLORS.text }}
                  >
                    {profileData.bio}
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start space-y-1 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm">
                    <span
                      className="flex items-center"
                      style={{ color: COLORS.text }}
                    >
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      {profileData.location}
                    </span>
                    <span
                      className="flex items-center"
                      style={{ color: COLORS.text }}
                    >
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      Joined {profileData.joinDate}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 sm:justify-end">
                <button
                  onClick={handleFollow}
                  className="px-4 sm:px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                  style={{
                    borderRadius: RADII.pill,
                    backgroundColor: isFollowing
                      ? COLORS.glass
                      : COLORS.primary,
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
                  className="px-4 sm:px-6 py-2 rounded-full font-medium transition-all duration-300 text-sm sm:text-base"
                  style={{
                    borderRadius: RADII.pill,
                    backgroundColor: COLORS.accent,
                    color: "white",
                    fontFamily: FONTS.body,
                  }}
                  onMouseEnter={(e) =>
                    handleHover(e, SHADOWS.btnSecondaryHover)
                  }
                  onMouseLeave={(e) => handleLeave(e)}
                >
                  <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 inline mr-2" />
                  Message
                </button>
                <button
                  onClick={() => setShowEditMode(!showEditMode)}
                  className="px-3 sm:px-4 py-2 rounded-full transition-all duration-300 flex items-center justify-center sm:inline-flex"
                  style={{
                    borderRadius: RADII.pill,
                    backgroundColor: COLORS.glass,
                    color: COLORS.text,
                    border: `1px solid ${COLORS.secondary}`,
                  }}
                  onMouseEnter={(e) =>
                    handleHover(e, SHADOWS.btnSecondaryHover)
                  }
                  onMouseLeave={(e) => handleLeave(e)}
                >
                  <Edit3 className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="sm:hidden ml-2">Edit Profile</span>
                </button>
              </div>
            </div>

            {/* Stats */}
            <div
              className="grid grid-cols-3 gap-2 sm:gap-4 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t"
              style={{ borderColor: COLORS.glass }}
            >
              <div className="text-center">
                <div
                  className="text-lg sm:text-xl lg:text-2xl font-bold"
                  style={{
                    color: COLORS.light,
                    fontFamily: FONTS.heading,
                  }}
                >
                  {profileData.stats.circles}
                </div>
                <div
                  className="text-xs sm:text-sm"
                  style={{ color: COLORS.text }}
                >
                  Circles
                </div>
              </div>
              <div className="text-center">
                <div
                  className="text-lg sm:text-xl lg:text-2xl font-bold"
                  style={{
                    color: COLORS.light,
                    fontFamily: FONTS.heading,
                  }}
                >
                  {profileData.stats.followers}
                </div>
                <div
                  className="text-xs sm:text-sm"
                  style={{ color: COLORS.text }}
                >
                  Followers
                </div>
              </div>
              <div className="text-center">
                <div
                  className="text-lg sm:text-xl lg:text-2xl font-bold"
                  style={{
                    color: COLORS.light,
                    fontFamily: FONTS.heading,
                  }}
                >
                  {profileData.stats.following}
                </div>
                <div
                  className="text-xs sm:text-sm"
                  style={{ color: COLORS.text }}
                >
                  Following
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div
          className="border-b sticky top-[57px] sm:top-[65px] z-20 overflow-x-auto"
          style={{
            backgroundColor: COLORS.glass,
            backdropFilter: "blur(10px)",
            borderColor: COLORS.dark,
          }}
        >
          <div className="px-3 sm:px-6">
            <nav className="flex space-x-6 sm:space-x-8 min-w-max">
              {["about", "circles"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="py-3 sm:py-4 px-1 border-b-2 font-medium text-sm sm:text-base capitalize transition-all duration-300 whitespace-nowrap"
                  style={{
                    borderBottomColor:
                      activeTab === tab ? COLORS.primary : "transparent",
                    color: activeTab === tab ? COLORS.primary : COLORS.text,
                    fontFamily: FONTS.body,
                  }}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div style={{ backgroundColor: COLORS.dark }}>
          {activeTab === "about" && (
            <div className="px-3 sm:px-6 py-4 sm:py-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                  <div>
                    <h2
                      className="text-lg sm:text-xl font-bold mb-3"
                      style={{
                        color: COLORS.light,
                        fontFamily: FONTS.heading,
                      }}
                    >
                      Interests
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {profileData.interests.map((interest, index) => (
                        <span
                          key={index}
                          className="px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer hover:scale-105"
                          style={{
                            background: `linear-gradient(45deg, ${COLORS.primary}20, ${COLORS.secondary}20)`,
                            color: COLORS.primary,
                            borderRadius: RADII.pill,
                            border: `1px solid ${COLORS.primary}40`,
                            fontFamily: FONTS.body,
                          }}
                        >
                          {interest}
                        </span>
                      ))}
                      <button
                        className="px-2 sm:px-3 py-1 text-xs sm:text-sm transition-all duration-300 hover:scale-105"
                        style={{
                          border: `2px dashed ${COLORS.text}40`,
                          color: COLORS.text,
                          borderRadius: RADII.pill,
                          fontFamily: FONTS.body,
                        }}
                      >
                        <Plus className="w-2 h-2 sm:w-3 sm:h-3 inline mr-1" />
                        Add
                      </button>
                    </div>
                  </div>
                </div>

                <RecentActivities
                  recentActivities={profileData.recentActivities}
                ></RecentActivities>
              </div>
            </div>
          )}

          {activeTab === "circles" && (
            <div className="px-3 sm:px-6 py-4 sm:py-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((circle) => (
                  <CercleCard key={circle}></CercleCard>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
