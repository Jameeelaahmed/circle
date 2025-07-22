import React from "react";
import { COLORS, FONTS } from "../../../constants";

const ProfileStats = ({ stats }) => {
  return (
    <div
      className="mt-4 grid grid-cols-3 gap-2 border-t pt-4 sm:mt-6 sm:gap-4 sm:pt-6"
      style={{
        borderColor: COLORS.glass,
        backgroundColor: COLORS.dark,
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
            color: COLORS.light,
            fontFamily: FONTS.heading,
          }}
        >
          {stats.circles}
        </div>
        <div className="text-xs sm:text-sm" style={{ color: COLORS.text }}>
          Circles
        </div>
      </div>
      <div className="text-center">
        <div
          className="text-lg font-bold sm:text-xl lg:text-2xl"
          style={{
            color: COLORS.light,
            fontFamily: FONTS.heading,
          }}
        >
          {stats.followers}
        </div>
        <div className="text-xs sm:text-sm" style={{ color: COLORS.text }}>
          Followers
        </div>
      </div>
      <div className="text-center">
        <div
          className="text-lg font-bold sm:text-xl lg:text-2xl"
          style={{
            color: COLORS.light,
            fontFamily: FONTS.heading,
          }}
        >
          {stats.following}
        </div>
        <div className="text-xs sm:text-sm" style={{ color: COLORS.text }}>
          Following
        </div>
      </div>
    </div>
  );
};

export default ProfileStats;
