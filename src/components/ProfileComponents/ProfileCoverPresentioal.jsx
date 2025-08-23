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
        <div className="bg-accent text-accent border-accent absolute top-2 left-2 z-10 rounded-lg border p-2 text-xs backdrop-blur-md sm:text-sm">
          {uploadError}
        </div>
      )}

      <div
        className="rounded-rounded relative h-32 overflow-hidden bg-cover bg-center sm:h-48 md:h-56 lg:h-64"
        style={{
          backgroundImage: `url(${coverImage})`,
        }}
      >
        <div className="bg-opacity-40 absolute inset-0"></div>

        {/* Loading overlay */}
        {isUploading && (
          <div className="bg-main bg-opacity-50 absolute inset-0 flex items-center justify-center">
            <div className="text-text flex items-center space-x-2">
              <div className="border-text h-6 w-6 animate-spin rounded-full border-2 border-t-transparent"></div>
              <span className="text-sm">Updating cover photo...</span>
            </div>
          </div>
        )}

        {/* Camera button - only show if viewing own profile */}
        {isProfileMyProfile && (
          <label
            className={`absolute top-2 right-2 rounded-full p-1.5 transition-all duration-300 sm:top-4 sm:right-4 sm:p-2 ${
              isUploading
                ? "cursor-not-allowed opacity-70"
                : "cursor-pointer opacity-100"
            } bg-glass border-none backdrop-blur-md`}
            onMouseEnter={(e) =>
              !isUploading && handleHover(e, "var(--shadow-btnSecondaryHover)")
            }
            onMouseLeave={(e) => !isUploading && handleLeave(e)}
          >
            <Camera className="text-text h-4 w-4 sm:h-5 sm:w-5" />
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
