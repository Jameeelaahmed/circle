import { Camera } from "lucide-react";

const ProfileCoverPresentional = ({
  coverImage,
  isUploading,
  uploadError,
  handleUpdateCover,
  isProfileMyProfile,
  handleHover,
  handleLeave,
}) => {
  return (
    <div className="relative">
      {/* Error Message */}
      {uploadError && (
        <div
          className="absolute top-2 left-2 z-10 rounded-lg p-2 text-xs sm:text-sm"
          style={{
            backgroundColor: `color-mix(in srgb, var(--color-accent) 20%, transparent)`,
            color: "var(--color-accent)",
            border: `1px solid var(--color-accent)`,
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
          borderRadius: `0 0 var(--rounded-rounded) var(--rounded-rounded)`,
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
              backgroundColor: "var(--color-glass)",
              backdropFilter: "blur(10px)",
              borderRadius: "var(--rounded-pill)",
              opacity: isUploading ? 0.7 : 1,
            }}
            onMouseEnter={(e) =>
              !isUploading && handleHover(e, "var(--shadow-btnSecondaryHover)")
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

export default ProfileCoverPresentional;
