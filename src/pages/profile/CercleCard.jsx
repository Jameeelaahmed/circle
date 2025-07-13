import React from "react";
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
import { COLORS, FONTS, SHADOWS, RADII } from "../../constants";

export default function CercleCard({ circle }) {
  return (
    <div
      key={circle}
      className="p-3 sm:p-4 transition-all duration-300 hover:scale-105"
      style={{
        background: `linear-gradient(135deg, ${COLORS.primary}10, ${COLORS.secondary}10)`,
        borderRadius: RADII.rounded,
        boxShadow: SHADOWS.card,
        border: `1px solid ${COLORS.primary}20`,
      }}
    >
      <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
        <div
          className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 flex items-center justify-center"
          style={{
            background: `linear-gradient(45deg, ${COLORS.primary}, ${COLORS.secondary})`,
            borderRadius: RADII.pill,
          }}
        >
          <Users className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
        </div>
        <div>
          <h3
            className="font-semibold text-sm sm:text-base"
            style={{
              color: COLORS.light,
              fontFamily: FONTS.heading,
            }}
          >
            Photography Circle
          </h3>
          <p className="text-xs sm:text-sm" style={{ color: COLORS.text }}>
            124 members
          </p>
        </div>
      </div>
      <p
        className="text-xs sm:text-sm mb-2 sm:mb-3"
        style={{ color: COLORS.text }}
      >
        Weekly meetups for photo enthusiasts
      </p>
      <button
        className="w-full py-1.5 sm:py-2 font-medium transition-all duration-300 text-xs sm:text-sm"
        style={{
          backgroundColor: COLORS.glass,
          borderRadius: RADII.rounded,
          color: COLORS.accent,
          border: `1px solid ${COLORS.accent}40`,
          fontFamily: FONTS.body,
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = COLORS.accent;
          e.target.style.color = "white";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = COLORS.glass;
          e.target.style.color = COLORS.accent;
        }}
      >
        View Circle
      </button>
    </div>
  );
}
