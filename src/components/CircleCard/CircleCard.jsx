import { User } from "lucide-react";
export default function CircleCard({
  circle,
  membersByCircle,
  activeTab,
  profileInterests,
  user,
  handleJoinRequest
}) {
  const members = membersByCircle?.[circle.id] || [];
  const hasImage = !!circle.imageUrl;

  // Compute mutual and other interests
  const mutualInterests = (circle.interests || []).filter((interest) =>
    profileInterests?.includes(interest),
  );
  const otherInterests = (circle.interests || []).filter(
    (interest) => !profileInterests?.includes(interest),
  );
  // Combine, limit to 4
  const displayedInterests = [...mutualInterests, ...otherInterests].slice(
    0,
    4,
  );

  return (
    <div
      className="group relative overflow-hidden rounded-3xl p-4 transition-all duration-300 hover:shadow-xl sm:p-5"
      style={{
        background:
          "linear-gradient(145deg, var(--color-main) 0%, #0a142a 100%)",
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
        <div className="mb-3 flex items-center space-x-3 sm:mb-4 sm:space-x-4">
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-[var(--color-primary)] sm:h-12 sm:w-12">
            {hasImage ? (
              <img
                className="h-full w-full rounded-full object-cover"
                src={circle.imageUrl}
                alt={circle.circleName}
              />
            ) : (
              <span
                className="text-xl font-bold text-white select-none"
                style={{ fontFamily: "var(--font-secondary)" }}
              >
                {circle.circleName?.charAt(0)?.toUpperCase() || "?"}
              </span>
            )}
          </div>
          <div>
            <h3 className="text-base font-bold text-[var(--color-primary)] sm:text-lg">
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

        <p
          className="mb-1.5 line-clamp-3 text-xs leading-relaxed sm:text-sm"
          style={{ color: "rgba(173, 186, 199, 0.95)" }}
        >
          {circle.description || "This circle hasn't added a description yet"}
        </p>

        {activeTab === "forYou" && (
          <>
            <div className="mt-2 mb-2 flex flex-wrap gap-2">
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
            {!(membersByCircle?.[circle.id] || []).some(member => member.id === user?.uid) && (
              <button
                className="relative w-full overflow-hidden rounded-2xl border border-[var(--color-primary)] bg-transparent py-2 text-xs font-medium text-[var(--color-primary)] transition-all duration-300 hover:bg-[rgba(172,159,250,0.15)] sm:py-2.5 sm:text-sm"
                onClick={() => handleJoinRequest(circle.id)}
              >
                <span className="relative z-10">Join Circle</span>
                <div className="absolute inset-0 bg-[var(--color-primary)] opacity-0 transition-opacity hover:opacity-10"></div>
              </button>
            )}
          </>
        )}
      </div>
<<<<<<< HEAD
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


=======
>>>>>>> 26cff8fdd9fe986f171d9c5246c3e10e8fe9ded6
    </div>
  );
}
