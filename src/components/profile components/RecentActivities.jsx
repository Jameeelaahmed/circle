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
export default function RecentActivities({ recentActivities }) {
  return (
    <div>
      <h2
        className="text-lg sm:text-xl font-bold mb-3"
        style={{
          color: COLORS.light,
          fontFamily: FONTS.heading,
        }}
      >
        Recent Activity
      </h2>
      <div className="space-y-3 sm:space-y-4">
        {recentActivities.map((activity, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div
              className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center flex-shrink-0"
              style={{
                background: `linear-gradient(45deg, ${COLORS.primary}, ${COLORS.secondary})`,
                borderRadius: RADII.pill,
              }}
            >
              <Users className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-xs sm:text-sm" style={{ color: COLORS.light }}>
                {activity.text}
              </p>
              <p className="text-xs mt-1" style={{ color: COLORS.text }}>
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
