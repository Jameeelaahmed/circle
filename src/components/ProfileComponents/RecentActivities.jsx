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
export default function RecentActivities({ recentActivities }) {
  return (
    <div>
      <h2
        className="mb-3 text-lg font-bold sm:text-xl"
        style={{
          color: "var(--color-light)",
          fontFamily: "var(--font-primary)",
        }}
      >
        Recent Activity
      </h2>
      <div className="space-y-3 sm:space-y-4">
        {recentActivities.map((activity, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div
              className="flex h-6 w-6 flex-shrink-0 items-center justify-center sm:h-8 sm:w-8"
              style={{
                background: `linear-gradient(45deg, "var(--color-main)", "var(--color-primary)")`,
                borderRadius: "var(--radius-pill)",
              }}
            >
              <Users className="h-3 w-3 text-white sm:h-4 sm:w-4" />
            </div>
            <div className="flex-1">
              <p
                className="text-xs sm:text-sm"
                style={{ color: "var(--color-light)" }}
              >
                {activity.text}
              </p>
              <p
                className="mt-1 text-xs"
                style={{ color: "var(--color-text)" }}
              >
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
