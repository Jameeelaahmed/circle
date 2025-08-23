import clsx from "clsx";
import { RADII } from "../../../constants";

export default function AuthButton({
  iconSrc,
  authFunc,
  size,
  classes,
  children,
}) {
  const finalClasses = clsx(
    "w-full justify-center flex items-center gap-6 bg-text text-black px-6 py-2 cursor-pointer",
    classes,
  );
  return (
    <button
      onClick={authFunc}
      className={finalClasses}
      style={{ borderRadius: RADII.pill }}
    >
      <img src={iconSrc} width={size} height={size} />
      {children}
    </button>
  );
}
