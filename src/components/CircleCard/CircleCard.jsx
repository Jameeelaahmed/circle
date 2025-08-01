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
import EventsContainer from './../../pages/Events/EventsContainer';

export default function CircleCard({ circle }) {
  return (
    <div
      className="p-3 transition-all duration-300 hover:scale-105 sm:p-4"
      style={{
        background: `linear-gradient(135deg, ${COLORS.primary}10, ${COLORS.secondary}10)`,
        borderRadius: RADII.rounded,
        boxShadow: SHADOWS.card,
        border: `1px solid ${COLORS.primary}20`,
      }}
    >
      <div className="mb-2 flex items-center space-x-2 sm:mb-3 sm:space-x-3">
        <div
          className="flex h-8 w-8 items-center justify-center sm:h-10 sm:w-10 lg:h-12 lg:w-12 rounded-full overflow-hidden"
        >
          <img className="w-full h-full object-cover rounded-full"
            src={circle.imageUrl} alt="" />
        </div>
        <div>
          <h3
            className="text-sm font-semibold sm:text-base"
            style={{
              color: COLORS.light,
              fontFamily: FONTS.heading,
            }}
          >
            {circle.circleName}
          </h3>
          <p className="text-xs sm:text-sm" style={{ color: COLORS.text }}>
            124 members
          </p>
        </div>
      </div>
      <p
        className="mb-2 text-xs sm:mb-3 sm:text-sm line-clamp-3"
        style={{ color: COLORS.text }}
      >
        {circle.description}
      </p>
      <button
        className="w-full py-1.5 text-xs font-medium transition-all duration-300 sm:py-2 sm:text-sm"
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
