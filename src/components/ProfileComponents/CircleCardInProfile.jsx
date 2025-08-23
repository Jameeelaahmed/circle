import React from "react";
import { useNavigate } from "react-router-dom";
const CircleCard = ({ circle, isLoading = false, circleId }) => {
  const navigate = useNavigate();
  // Format the created date
  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString();
  };

  // Get privacy badge color using theme colors
  const getPrivacyBadgeColor = (privacy) => {
    return privacy === "Public"
      ? "bg-green-500/20 text-green-400 border border-green-500/30"
      : "bg-blue-500/20 text-blue-400 border border-blue-500/30";
  };

  // Show skeleton loader if loading or circle data is incomplete
  if (isLoading || !circle || !circle.circleName) {
    return (
      <div className="overflow-hidden rounded-[20px] border border-white/10 bg-[rgba(22,23,30,0.7)] shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-sm">
        {/* Skeleton Cover Image */}
        <div className="h-32 animate-pulse bg-white/10 sm:h-36"></div>

        {/* Skeleton Content */}
        <div className="p-4">
          <div className="mb-2 flex items-start justify-between">
            <div className="h-6 w-3/4 animate-pulse rounded bg-white/10"></div>
            <div className="ml-2 h-4 w-16 animate-pulse rounded bg-white/10"></div>
          </div>

          <div className="mb-2 h-4 animate-pulse rounded bg-white/10"></div>
          <div className="mb-3 h-4 w-2/3 animate-pulse rounded bg-white/10"></div>

          <div className="mb-3 flex gap-1">
            <div className="h-6 w-16 animate-pulse rounded-full bg-white/10"></div>
            <div className="h-6 w-20 animate-pulse rounded-full bg-white/10"></div>
            <div className="h-6 w-14 animate-pulse rounded-full bg-white/10"></div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="mb-1 h-3 w-24 animate-pulse rounded bg-white/10"></div>
              <div className="h-3 w-16 animate-pulse rounded bg-white/10"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      // onClick={() => navigate(`/circle/${circleId}`)}
      className="overflow-hidden rounded-[20px] border border-white/10 bg-[rgba(22,23,30,0.7)] shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-sm transition-all duration-200 hover:border-[#ac9ffa]/30 hover:bg-[rgba(22,23,30,0.8)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.4)]"
    >
      {/* Cover Image */}
      <div className="relative h-32 sm:h-36">
        <img
          src={circle.imageUrl}
          alt={circle.circleName}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/400x200?text=Circle";
          }}
        />
        {/* Privacy Badge */}
        <div className="absolute top-2 right-2">
          <span
            className={`rounded-full px-2 py-1 text-xs font-medium backdrop-blur-sm ${getPrivacyBadgeColor(circle.circlePrivacy)}`}
          >
            {circle.circlePrivacy}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title and Type */}
        <div className="mb-2 flex items-start justify-between">
          <h3 className="truncate text-lg font-semibold text-white">
            {circle.circleName}
          </h3>
          <span className="ml-2 shrink-0 text-xs text-[#ac9ffa]">
            {circle.circleType}
          </span>
        </div>

        {/* Description */}
        <p className="mb-3 line-clamp-2 text-sm text-white/70">
          {circle.description}
        </p>

        {/* Interests */}
        {circle.interests && circle.interests.length > 0 && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {circle.interests.slice(0, 3).map((interest, index) => (
                <span
                  key={index}
                  className="rounded-full border border-white/20 bg-white/10 px-2 py-1 text-xs text-white/80 backdrop-blur-sm"
                >
                  {interest}
                </span>
              ))}
              {circle.interests.length > 3 && (
                <span className="rounded-full border border-[#ac9ffa]/30 bg-[#ac9ffa]/20 px-2 py-1 text-xs text-[#ac9ffa] backdrop-blur-sm">
                  +{circle.interests.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Footer Info */}
        <div className="flex items-center justify-between text-xs text-white/60">
          <div className="flex flex-col">
            <span>Created by {circle.createdBy?.userName || "Unknown"}</span>
            <span>{formatDate(circle.createdAt)}</span>
          </div>
          {circle.expiresAt && (
            <span className="text-[#f78fb3]">
              Expires: {formatDate(circle.expiresAt)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CircleCard;
