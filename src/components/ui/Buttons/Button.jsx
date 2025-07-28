import clsx from "clsx";
import { COLORS, RADII } from "../../../constants";

export default function Button({
  variant = "primary",
  size = "small",
  classes,
  children,
  handleClick = () => {},
}) {
  const variants = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    accent: "bg-accent",
    glass: "bg-glass",
  }[variant];
  const sizes = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg",
    xlarge: "w-7/12 py-3 text-lg",
  }[size];

  const finalClasses = clsx(
    variants,
    sizes,
    classes,
    "cursor-pointer font-quick-sand font-semibold",
  );
  return (
    <button
      style={{ background: variants, borderRadius: RADII.rounded }}
      className={finalClasses}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
