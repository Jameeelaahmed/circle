import { FONTS, SHADOWS, RADII } from "../../constants";
import { COLORS } from "../../constants";
// Helper to pick a CSS variable shade based on circle name
const cssVars = [
  '--color-primary',
  '--color-secondary',
  '--color-accent',
  '--color-glass',
  '--color-success',
  '--color-warning',
  '--color-error',
];
const getAvatarBg = (name) => {
  if (!name) return 'var(--color-primary)';
  const code = name.charCodeAt(0);
  // Use 30% opacity for the background
  return `color-mix(in srgb, var(${cssVars[code % cssVars.length]}) 70%, white)`;
};

export default function CircleCard({ circle, membersByCircle }) {
  const members = membersByCircle && membersByCircle[circle.id] ? membersByCircle[circle.id] : [];
  const hasImage = !!circle.imageUrl;
  const avatarBg = getAvatarBg(circle.circleName);
  return (
    <div
      className="p-3 transition-all duration-300 hover:scale-105 sm:p-4"
      style={{
        background: 'linear-gradient(135deg, var(--color-primary)10, var(--color-secondary)10)',
        borderRadius: RADII.rounded,
        boxShadow: SHADOWS.card,
        border: '1px solid var(--color-primary)20',
      }}
    >
      <div className="mb-2 flex items-center space-x-2 sm:mb-3 sm:space-x-3">
        <div
          className="flex h-8 w-8 items-center justify-center sm:h-10 sm:w-10 lg:h-12 lg:w-12 rounded-full overflow-hidden"
          style={!hasImage ? { background: avatarBg } : {}}
        >
          {hasImage ? (
            <img className="w-full h-full object-cover rounded-full" src={circle.imageUrl} alt="" />
          ) : (
            <span
              className="text-lg font-bold text-white select-none"
              style={{ fontFamily: FONTS.heading }}
            >
              {circle.circleName?.charAt(0)?.toUpperCase() || "?"}
            </span>
          )}
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
            {members.length} {members.length === 1 ? " Member" : " Members"}
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
