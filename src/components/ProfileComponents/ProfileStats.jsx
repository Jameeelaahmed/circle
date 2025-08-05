const ProfileStats = ({ stats }) => {
  return (
    <div
      className="mt-4 grid grid-cols-3 gap-2 border-t pt-4 sm:mt-6 sm:gap-4 sm:pt-6 bg-white/5 rounded-t-2xl"
      style={{
        borderColor: "var(--color-glass)",
        marginTop: 0,
        paddingLeft: "0.75rem",
        paddingRight: "0.75rem",
        paddingBottom: "1rem",
      }}
    >
      <div className="text-center">
        <div
          className="text-lg font-bold sm:text-xl lg:text-2xl"
          style={{
            color: "var(--color-light)",
            fontFamily: "var(--font-heading)",
          }}
        >
          {stats.circles}
        </div>
        <div
          className="text-xs sm:text-sm"
          style={{ color: "var(--color-text)" }}
        >
          Circles
        </div>
      </div>
      <div className="text-center">
        <div
          className="text-lg font-bold sm:text-xl lg:text-2xl"
          style={{
            color: "var(--color-light)",
            fontFamily: "var(--font-heading)",
          }}
        >
          {stats.followers}
        </div>
        <div
          className="text-xs sm:text-sm flex flex-col"
          style={{ color: "var(--color-text)" }}
        >
        <span className="text-2xl font-bold">{stats.connections}</span>
          <span>Connections</span>
        </div>
      </div>
      <div className="text-center">
        <div
          className="text-lg font-bold sm:text-xl lg:text-2xl"
          style={{
            color: "var(--color-light)",
            fontFamily: "var(--font-heading)",
          }}
        >
        </div>
        {/* <div
          className="text-xs sm:text-sm"
          style={{ color: "var(--color-text)" }}
        >
          Following
        </div> */}
      </div>
    </div>
  );
};

export default ProfileStats;
