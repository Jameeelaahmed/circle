import { Users } from "lucide-react";

export default function RecentActivities({ recentActivities }) {
  return (
    <div>
      <h2 className="text-text mb-3 text-lg font-bold sm:text-xl">
        Recent Activity
      </h2>
      <div className="space-y-3 sm:space-y-4">
        {recentActivities.map((activity, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-[var(--rounded-pill)] bg-[linear-gradient(45deg,var(--color-main),var(--color-primary))] sm:h-8 sm:w-8">
              <Users className="text-text h-3 w-3 sm:h-4 sm:w-4" />
            </div>
            <div className="flex-1">
              <p className="text-text text-xs sm:text-sm">{activity.text}</p>
              <p className="text-text mt-1 text-xs">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
