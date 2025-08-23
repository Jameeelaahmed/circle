import {
  MapPin,
  Calendar,
  MessageCircle,
  Camera,
  Edit3,
  Check,
  X,
} from "lucide-react";

const ProfileInfoPresentioal = ({
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
  handleFollow,
  isFollowing,
}) => {
  return (
    <div className="bg-text/5 mb-10 rounded-b-[var(--rounded-rounded)] px-3 pb-4 shadow-[var(--shadow-glassCard)] sm:px-4 sm:pb-6 lg:px-6">
      <div className="relative z-10 -mt-8 flex flex-col space-y-4 sm:-mt-12 lg:-mt-16">
        {/* Error Message */}
        {uploadError && (
          <div className="text-accent border-accent rounded-lg border bg-[color-mix(in_srgb,var(--color-accent)_20%,transparent)] p-3 text-sm">
            {uploadError}
          </div>
        )}

        {/* Profile Image and Basic Info */}
        <div className="flex flex-col space-y-3 pt-10 sm:flex-row sm:items-end sm:space-y-0 sm:space-x-4">
          <div className="relative self-center sm:self-auto">
            <img
              src={profileData.photoUrl || "/default-avatar.png"}
              alt={profileData.username || "User"}
              className={`border-text shadow-softPrimary h-20 w-20 rounded-[var(--rounded-pill)] border-2 object-cover sm:h-24 sm:w-24 sm:border-4 lg:h-32 lg:w-32 ${isUploading ? "opacity-70" : "opacity-100"}`}
            />
            {isProfileMyProfile && (
              <label
                className={`absolute right-1 bottom-1 rounded-full p-1 transition-all duration-300 sm:right-2 sm:bottom-2 sm:p-2 ${isUploading ? "cursor-not-allowed opacity-70" : "cursor-pointer opacity-100"} bg-primary shadow-btnPrimary`}
                onMouseEnter={(e) =>
                  !isUploading &&
                  handleHover(e, "var(--shadow-btnPrimaryHover)")
                }
                onMouseLeave={(e) =>
                  !isUploading && handleLeave(e, "var(--shadow-btnPrimary)")
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
                <div className="border-text h-6 w-6 animate-spin rounded-full border-2 border-t-transparent"></div>
              </div>
            )}
          </div>

          <div className="flex-1 pb-2 text-center sm:pb-4 sm:text-left">
            <h1 className="text-text mb-1 text-xl font-bold sm:text-2xl lg:text-3xl">
              {profileData.displayName || profileData.username || "User"}
            </h1>
            <p className="text-text mb-2 text-sm sm:text-base">
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
                    className="bg-glass text-text border-secondary min-h-[60px] w-full resize-none rounded-lg border px-3 py-2 text-xs sm:text-sm"
                    rows={3}
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-text text-xs">
                      {newBio.length}/160
                    </span>
                    <div className="flex space-x-2">
                      <button
                        onClick={handleUpdateBio}
                        className="text-primary rounded-full p-1 transition-all duration-200"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                      <button
                        onClick={cancelBioEdit}
                        className="text-accent rounded-full p-1 transition-all duration-200"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between">
                  <p className="text-text flex-1 text-xs leading-relaxed sm:text-sm">
                    {profileData.bio ||
                      (isProfileMyProfile
                        ? "Add a bio to tell people about yourself"
                        : "")}
                  </p>
                  {isProfileMyProfile && (
                    <button
                      onClick={() => setShowEditModeBio(true)}
                      className="text-text ml-2 rounded-full p-1 transition-all duration-200"
                    >
                      <Edit3 className="h-3 w-3 sm:h-4 sm:w-4" />
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Location and Join Date */}
            <div className="flex flex-col items-center justify-center space-y-1 text-xs sm:flex-row sm:justify-start sm:space-y-0 sm:space-x-4 sm:text-sm">
              <div className="text-text flex items-center">
                <MapPin className="mr-1 h-3 w-3 flex-shrink-0 sm:h-4 sm:w-4" />
                {showEditModeLocation ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      placeholder="Add your location"
                      className="text-text border-secondary min-w-[120px] rounded border bg-[var(--color-glass)] px-2 py-1 text-xs sm:text-sm"
                    />
                    <button
                      onClick={handleUpdateLocation}
                      className="text-primary rounded-full p-1 transition-all duration-200"
                    >
                      <Check className="h-3 w-3" />
                    </button>
                    <button
                      onClick={cancelLocationEdit}
                      className="text-accent rounded-full p-1 transition-all duration-200"
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
                        className="text-text ml-2 rounded-full p-1 transition-all duration-200"
                      >
                        <Edit3 className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                )}
              </div>

              <span className="text-text flex items-center">
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
              className={`transform rounded-[var(--rounded-pill)] px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 sm:px-6 sm:text-base ${
                isFollowing
                  ? "bg-glass text-text shadow-none"
                  : "bg-primary text-text shadow-btnPrimary"
              }`}
              onMouseEnter={(e) => {
                if (!isFollowing) {
                  e.target.style.boxShadow = "var(--shadow-btnPrimaryHover)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isFollowing) {
                  e.target.style.boxShadow = "var(--shadow-btnPrimary)";
                }
              }}
            >
              {isFollowing ? "Following" : "Follow"}
            </button>

            <button
              className="bg-accent text-text rounded-[var(--rounded-pill)] px-4 py-2 text-sm font-medium transition-all duration-300 sm:px-6 sm:text-base"
              onMouseEnter={(e) =>
                handleHover(e, "var(--shadow-btnSecondaryHover)")
              }
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

export default ProfileInfoPresentioal;
