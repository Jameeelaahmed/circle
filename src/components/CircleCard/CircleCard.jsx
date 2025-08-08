export default function CircleCard({ circle, membersByCircle }) {
  const members = membersByCircle?.[circle.id] || [];
  const hasImage = !!circle.imageUrl;
  // const avatarBg = getAvatarBg(circle.circleName);

  return (
    <div className="relative overflow-hidden rounded-3xl p-4 sm:p-5 transition-all duration-300 hover:shadow-xl group"
      style={{
        background: 'linear-gradient(145deg, var(--color-main) 0%, #0a142a 100%)',
        border: '1px solid rgba(172, 159, 250, 0.15)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
      }}
    >
      {/* Shiny hover effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-[150%] -top-[50%] w-[60%] h-[200%] bg-gradient-to-r from-transparent via-[rgba(172,159,250,0.2)] to-transparent transform rotate-[25deg] transition-all duration-900 opacity-0 group-hover:opacity-100 group-hover:left-[150%]"></div>
      </div>

      {/* Content container */}
      <div className="relative z-10">
        <div className="mb-3 flex items-center space-x-3 sm:mb-4 sm:space-x-4">
          <div
            className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full overflow-hidden border border-[var(--color-primary)]"
          // style={!hasImage ? { background: avatarBg } : {}}
          >
            {hasImage ? (
              <img
                className="w-full h-full object-cover rounded-full"
                src={circle.imageUrl}
                alt={circle.circleName}
              />
            ) : (
              <span
                className="text-xl font-bold text-white select-none"
                style={{ fontFamily: 'var(--font-secondary)' }}
              >
                {circle.circleName?.charAt(0)?.toUpperCase() || "?"}
              </span>
            )}
          </div>
          <div>
            <h3 className="text-base font-bold sm:text-lg text-[var(--color-primary)]">
              {circle.circleName}
            </h3>
            <p className="text-xs sm:text-sm flex items-center mt-1"
              style={{ color: 'var(--color-secondary)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              {members.length} {members.length === 1 ? "Member" : "Members"}
            </p>
          </div>
        </div>

        <p className="mb-4 text-xs sm:text-sm line-clamp-3 leading-relaxed min-h-[3.5em]"
          style={{ color: 'rgba(173, 186, 199, 0.95)' }}>
          {circle.description || "This circle hasn't added a description yet"}
        </p>

        <button className="w-full py-2 sm:py-2.5 text-xs sm:text-sm font-medium transition-all duration-300 rounded-2xl border border-[var(--color-primary)] bg-transparent text-[var(--color-primary)] hover:bg-[rgba(172,159,250,0.15)] relative overflow-hidden">
          <span className="relative z-10">View Circle</span>
          <div className="absolute inset-0 bg-[var(--color-primary)] opacity-0 hover:opacity-10 transition-opacity"></div>
        </button>
      </div>
    </div>
  );
}