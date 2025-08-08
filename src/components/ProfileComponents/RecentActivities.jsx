import {
  Users,
} from "lucide-react";

export default function RecentActivities({ recentActivities }) {
  return (
    <div>
      <h2
        className="mb-3 text-lg font-bold sm:text-xl text-text"
      >
        Recent Activity
      </h2>
      <div className="space-y-3 sm:space-y-4">
        {recentActivities.map((activity, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div
              className="
                flex h-6 w-6 flex-shrink-0 items-center justify-center sm:h-8 sm:w-8
                bg-[linear-gradient(45deg,var(--color-main),var(--color-primary))]
                rounded-[var(--rounded-pill)]
              "
            >
              <Users className="h-3 w-3 text-text sm:h-4 sm:w-4" />
            </div>
            <div className="flex-1">
              <p className="text-xs sm:text-sm text-text">
                {activity.text}
              </p>
              <p className="mt-1 text-xs text-text">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
