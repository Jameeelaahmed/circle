import React from "react";

const ProfileStats = ({ stats }) => {
  return (
    <div
      className="mt-4 grid grid-cols-3 gap-2 border-t pt-4 sm:mt-6 sm:gap-4 sm:pt-6"
      style={{
        borderColor: "var(--color-glass)",
        backgroundColor: "var(--color-dark)",
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
          className="text-xs sm:text-sm"
          style={{ color: "var(--color-text)" }}
        >
          Followers
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
          {stats.following}
        </div>
        <div
          className="text-xs sm:text-sm"
          style={{ color: "var(--color-text)" }}
        >
          Following
        </div>
      </div>
    </div>
  );
};

export default ProfileStats;
