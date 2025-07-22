export const Logo = (props) => (
  <svg
    className="h-12 w-12"
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Circle Home"
    {...props}
  >
    {/* Modern concentric circles with gradient */}
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ff6b8b" />
        <stop offset="100%" stopColor="#00c9b1" />
      </linearGradient>
    </defs>

    {/* Outer circle with gradient */}
    <circle
      cx="50"
      cy="50"
      r="45"
      fill="none"
      stroke="url(#logoGradient)"
      strokeWidth="6"
    />

    {/* Abstract C shape formed from circle segment */}
    <path
      d="M65,35 A15,15 0 0,1 65,65"
      fill="none"
      stroke="white"
      strokeWidth="8"
      strokeLinecap="round"
    />

    {/* Central dot */}
    <circle cx="50" cy="50" r="8" fill="#ff6b8b" />
  </svg>
);
