import React from "react";
import { Plus } from "lucide-react";
import RecentActivities from "./RecentActivities";
import { COLORS, RADII } from "../../constants";

const AboutTab = ({ interests, recentActivities }) => {
  return (
    <div className="px-3 py-4 sm:px-6 sm:py-6">
      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
        <div className="space-y-4 sm:space-y-6 lg:col-span-2">
          <div>
            <h2
              className="mb-3 text-lg font-bold sm:text-xl"
              style={{
                color: "var(--color-light)",
                fontFamily: "var(--font-secondary)",
              }}
            >
              Interests
            </h2>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest, index) => (
                <span
                  key={index}
                  className="cursor-pointer px-2 py-1 text-xs font-medium transition-all duration-300 hover:scale-105 sm:px-3 sm:text-sm"
                  style={{
                    background:
                      "linear-gradient(45deg, var(--color-primary)20, var(--color-secondary)20)",

                    color: COLORS.primary,
                    borderRadius: RADII.pill,
                    border: `1px solid ${COLORS.primary}40`,
                    fontFamily: "var(--font-primary)",
                  }}
                >
                  {interest}
                </span>
              ))}
              <button
                className="px-2 py-1 text-xs transition-all duration-300 hover:scale-105 sm:px-3 sm:text-sm"
                style={{
                  border: `2px dashed ${COLORS.text}40`,
                  color: COLORS.text,
                  borderRadius: RADII.pill,
                  fontFamily: "var(--font-primary)",
                }}
              >
                <Plus className="mr-1 inline h-2 w-2 sm:h-3 sm:w-3" />
                Add
              </button>
            </div>
          </div>
        </div>

        <RecentActivities recentActivities={recentActivities} />
      </div>
    </div>
  );
};

export default AboutTab;
