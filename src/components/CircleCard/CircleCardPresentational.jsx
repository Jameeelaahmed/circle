import { User, Trash2 } from "lucide-react";
export default function CircleCardPresentational({
  hasImage,
  members,
  displayedInterests,
  activeTab,
  user,
  handleJoinRequest,
  isRequestPending,
  circle,
  membersByCircle,
  isOwner,
  openDeleteCircleModal,
}) {
  return (
    <>
      <div
        className="group relative cursor-pointer overflow-hidden rounded-3xl p-4 transition-all duration-300 hover:shadow-xl sm:p-5"
        style={{
          background: `radial-gradient(ellipse at top, #17284f93 0%, transparent 60%)`,
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(172, 159, 250, 0.15)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
        }}
      >
        {/* Shiny hover effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-[50%] -left-[150%] h-[200%] w-[60%] rotate-[25deg] transform bg-gradient-to-r from-transparent via-[rgba(172,159,250,0.2)] to-transparent opacity-0 transition-[opacity_transform] duration-900 group-hover:left-[150%] group-hover:opacity-100"></div>
        </div>

        {/* Content container */}
        <div className="relative z-10">
          <div className="flex justify-between">
            <div className="mb-3 flex items-center space-x-3 sm:mb-4 sm:space-x-4">
              <div className="border-primary flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border sm:h-12 sm:w-12">
                {hasImage ? (
                  <img
                    className="h-full w-full rounded-full object-cover"
                    src={circle.imageUrl}
                    alt={circle.circleName}
                  />
                ) : (
                  <span
                    className="text-text text-xl font-bold select-none"
                    style={{ fontFamily: "var(--font-secondary)" }}
                  >
                    {circle.circleName?.charAt(0)?.toUpperCase() || "?"}
                  </span>
                )}
              </div>
              <div>
                <h3 className="text-primary text-base font-bold sm:text-lg">
                  {circle.circleName}
                </h3>
                <p
                  className="mt-1 flex items-center text-xs sm:text-sm"
                  style={{ color: "var(--color-secondary)" }}
                >
                  <User className="mr-1.5 h-3.5 w-3.5" />
                  {members.length} {members.length === 1 ? "Member" : "Members"}
                </p>
              </div>
            </div>

            {isOwner && (
              <button
                className="ml-2 self-start rounded-full p-2 transition-transform hover:scale-110"
                style={{
                  color: "var(--color-secondary)",
                  background: "rgba(var(--color-secondary-rgb), 0.1)",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  openDeleteCircleModal(circle);
                }}
                title="Delete Circle"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>
          <p
            className="mb-1.5 line-clamp-3 text-xs leading-relaxed sm:text-sm"
            style={{ color: "rgba(173, 186, 199, 0.95)" }}
          >
            {circle.description}
          </p>

          {activeTab === "forYou" && (
            <>
              <div className="mt-2 mb-2 flex h-10 flex-wrap gap-2">
                {displayedInterests.map((interest) => (
                  <span
                    key={interest}
                    className="border-primary text-primary mb-2 rounded-3xl border p-2"
                  >
                    {interest}
                  </span>
                ))}
                {circle.interests.length > 4 && (
                  <span className="border-primary text-primary mb-2 rounded-3xl border p-2">
                    +{circle.interests.length - 4} more
                  </span>
                )}
              </div>
              {!(membersByCircle?.[circle.id] || []).some(
                (member) => member.id === user?.uid,
              ) && (
                <button
                  className="border-primary text-primary relative w-full overflow-hidden rounded-2xl border bg-transparent py-2 text-xs font-medium transition-all duration-300 hover:bg-[rgba(172,159,250,0.15)] sm:py-2.5 sm:text-sm"
                  onClick={(e) => handleJoinRequest(circle.id, e)}
                >
                  {isRequestPending ? "Request Sent" : "Join Circle"}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
