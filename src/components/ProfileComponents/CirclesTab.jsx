import CircleCard from "./CircleCardInProfile";

const CirclesTab = ({ joinedCircles, isLoading = false, joinedCirclesIds }) => {
  // Show skeleton cards while loading
  if (isLoading) {
    return (
      <div className="px-3 py-4 sm:px-6 sm:py-6">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {/* Show 6 skeleton cards while loading */}
          {Array.from({ length: 6 }).map((_, index) => (
            <CircleCard key={`skeleton-${index}`} isLoading={true} />
          ))}
        </div>
      </div>
    );
  }

  // Show empty state if no circles
  if (!joinedCircles || joinedCircles.length === 0) {
    return (
      <div className="px-3 py-4 sm:px-6 sm:py-6">
        <div className="py-12 text-center">
          <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
            <svg
              className="h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-medium text-gray-900">
            No circles yet
          </h3>
          <p className="text-gray-500">
            You haven't joined any circles yet. Start exploring to find circles
            that match your interests!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-3 py-4 sm:px-6 sm:py-6">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {joinedCircles.map((circle, index) => (
          <CircleCard
            circleId={joinedCirclesIds[index]}
            key={circle.id || index}
            circle={circle}
            isLoading={!circle.circleName} // Individual card loading state
          />
        ))}
      </div>
    </div>
  );
};

export default CirclesTab;
