import {
  MapPin,
  Calendar,
  UserRoundX,
  Camera,
  Edit3,
  Check,
  X,
  UserPlus,
  UserCheck,
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
  handleConnect,
  isConnected,
  isConnecting,
  handleReport,
  reported,
  isReporting
}) => {
  return (
    <div className="bg-text/5 mb-10 rounded-b-[var(--rounded-rounded)] px-3 pb-4 shadow-[var(--shadow-glassCard)] sm:px-4 sm:pb-6 lg:px-6">
      <div className="relative z-10 -mt-8 flex flex-col space-y-4 sm:-mt-12 lg:-mt-16">
        {/* Error Message */}
        {uploadError && (
          <div className="text-accent border-primary rounded-lg border bg-[color-mix(in_srgb,var(--color-accent)_20%,transparent)] p-3 text-sm">
            {uploadError}
          </div>
        )}

        {/* Profile Image and Basic Info */}
        <div className="flex flex-col space-y-6 pt-10 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-8">
          {/* Avatar */}
          <div className="group relative self-center sm:self-auto">
            <img
              src={profileData.photoUrl || "/default-avatar.png"}
              alt={profileData.username || "User"}
              className={`border-text h-24 w-24 rounded-full border-4 object-cover shadow-xl transition-all duration-300 sm:h-28 sm:w-28 lg:h-36 lg:w-36 ${
                isUploading ? "opacity-70" : "opacity-100"
              }`}
            />
            {isProfileMyProfile && (
              <label
                className={`bg-primary absolute right-2 bottom-2 flex cursor-pointer items-center justify-center rounded-full p-2 shadow-lg transition-all duration-300 group-hover:scale-110 ${
                  isUploading ? "cursor-not-allowed opacity-70" : "opacity-100"
                }`}
              >
                <Camera className="text-text h-4 w-4 sm:h-5 sm:w-5" />
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

          {/* Profile Info */}
          <div className="flex-1 text-center sm:text-left">
            {/* Display Name + Username */}
            <div className="mb-4">
              <h1 className="from-primary to-secondary font-secondary bg-gradient-to-r bg-clip-text text-2xl font-bold text-transparent sm:text-3xl md:text-4xl">
                {profileData.displayName || profileData.username || "User"}
              </h1>
              <p className="mt-1 text-sm font-medium text-gray-400 sm:text-base lg:text-lg">
                @{profileData.username || "username"}
              </p>
            </div>

            {/* Bio */}
            <div className="border-secondary mt-4 mb-5 rounded-3xl border bg-transparent p-5 shadow-xl transition-all hover:shadow-2xl">
              {showEditModeBio ? (
                <div className="animate-fadeIn space-y-3">
                  <textarea
                    value={newBio}
                    onChange={(e) => setNewBio(e.target.value)}
                    placeholder="Tell us about yourself..."
                    maxLength={160}
                    className="border-secondary focus:border-primary focus:ring-primary min-h-[80px] w-full resize-none rounded-xl border px-4 py-3 text-sm shadow-sm transition-all focus:ring-1 sm:text-base"
                    rows={3}
                  />
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-gray-400">{newBio.length}/160</span>
                    <div className="flex space-x-3">
                      <button
                        onClick={handleUpdateBio}
                        className="text-primary hover:bg-primary/20 rounded-full p-2 transition"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                      <button
                        onClick={cancelBioEdit}
                        className="text-accent hover:bg-accent/20 rounded-full p-2 transition"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between">
                  <p className="flex-1 text-sm leading-relaxed text-gray-300 sm:text-base">
                    {profileData.bio ||
                      (isProfileMyProfile
                        ? "Add a bio to tell people about yourself"
                        : "")}
                  </p>
                  {isProfileMyProfile && (
                    <button
                      onClick={() => setShowEditModeBio(true)}
                      className="hover:text-text ml-3 rounded-full p-2 text-gray-400 transition hover:bg-white/10"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Location and Join Date */}
            <div className="flex flex-col items-center justify-center space-y-1 text-xs sm:flex-row sm:justify-start sm:space-y-0 sm:space-x-4 sm:text-sm">
              <div className="text-text flex items-center">
                <MapPin className="h-3 w-3 flex-shrink-0 sm:h-4 sm:w-4 ltr:mr-1 rtl:ml-1" />
                {showEditModeLocation ? (
                  <div className="animate-fadeIn flex items-center gap-2">
                    <input
                      type="text"
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      placeholder="Add your location"
                      className="border-secondary text-text focus:border-primary focus:ring-primary rounded-lg border bg-[var(--color-glass)] px-3 py-1 text-sm shadow-sm transition-all focus:ring-1"
                    />
                    <button
                      onClick={handleUpdateLocation}
                      className="text-primary hover:bg-primary/20 rounded-full p-1 transition"
                    >
                      <Check className="h-3 w-3" />
                    </button>
                    <button
                      onClick={cancelLocationEdit}
                      className="text-accent hover:bg-accent/20 rounded-full p-1 transition"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span>
                      {profileData.location ||
                        (isProfileMyProfile
                          ? "Add location"
                          : "Location not set")}
                    </span>
                    {isProfileMyProfile && (
                      <button
                        onClick={() => setShowEditModeLocation(true)}
                        className="hover:text-text rounded-full p-1 text-gray-400 transition hover:bg-white/10"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                )}
              </div>

              <span className="text-text flex items-center">
                <Calendar className="h-3 w-3 sm:h-4 sm:w-4 ltr:mr-1 rtl:ml-1" />
                Joined {profileData.joinDate || "Recently"}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {!isProfileMyProfile && (
          <div className="flex flex-col space-y-2 sm:flex-row sm:justify-end sm:space-y-0 sm:space-x-3">
            <button
              onClick={handleConnect}
              disabled={isConnecting}
              className={`flex transform items-center justify-center rounded-[var(--rounded-pill)] px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 sm:px-6 sm:text-base ${
                isConnected
                  ? "border border-green-500/30 bg-green-500/20 text-green-400"
                  : "bg-primary cursor-pointer text-text shadow-btnPrimary"
              } ${isConnecting ? "cursor-not-allowed opacity-70" : ""}`}
              onMouseEnter={(e) => {
                if (!isConnected && !isConnecting) {
                  e.target.style.boxShadow = "var(--shadow-btnSecondaryHover)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isConnected && !isConnecting) {
                  e.target.style.boxShadow = "var(--shadow-btnPrimary)";
                }
              }}
            >
              {isConnecting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                  Connecting...
                </>
              ) : isConnected ? (
                <>
                  <UserCheck className="h-4 w-4 ltr:mr-2 rtl:ml-2" />
                  Connected
                </>
              ) : (
                <>
                  <UserPlus className="h-4 w-4 ltr:mr-2 rtl:ml-2" />
                  Connect
                </>
              )}
            </button>

            <button
              onClick={handleReport}
              disabled={isReporting}
              className={`${
                reported ? "bg-[#091429] shadow-2xl shadow-black text-white" : "bg-accent cursor-pointer text-text"
              } rounded-[var(--rounded-pill)] shadow-2xl shadow-black px-4 py-2 text-sm font-medium transition-all duration-300 sm:px-6 sm:text-base`}
              onMouseEnter={(e) =>
                handleHover(e, "var(--shadow-btnSecondaryHover)")
              }
              onMouseLeave={(e) => handleLeave(e)}
            >
              <UserRoundX className="inline h-3 w-3 sm:h-4 sm:w-4 ltr:mr-2 rtl:ml-2" />
              {reported ? "Reported" : "Report"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileInfoPresentioal;
