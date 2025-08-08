const ProfileStats = ({ profileData }) => {
  return (
    <div
      className="
        mt-4 grid grid-cols-3 gap-2 border-t pt-4 sm:mt-6 sm:gap-4 sm:pt-6
        bg-text/5 rounded-t-2xl border-glass
        px-3 pb-4
      "
    >
      <div className="text-center">
        <div
          className="text-lg font-bold sm:text-xl lg:text-2xl text-text"
        >
          {profileData.joinedCircles}
        </div>
        <div className="text-xs sm:text-sm text-[var(--color-text)]">
          Circles
        </div>
      </div>
      <div className="text-center">
        <div className="text-xs sm:text-sm flex flex-col text-[var(--color-text)]">
          <span className="text-2xl font-bold">{profileData.connections}</span>
          <span>Connections</span>
        </div>
      </div>
      <div className="text-center">
        <div
          className="text-lg font-bold sm:text-xl lg:text-2xl text-text"
        >
          {/* Add stat value here if needed */}
        </div>
      </div>
    </div>
  );
};

export default ProfileStats;
