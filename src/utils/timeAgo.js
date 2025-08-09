function timeAgo(inputDateString) {
  const date = new Date(inputDateString);
  const now = new Date();
  const diff = now - date; // in milliseconds

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30); // Approximate
  const years = Math.floor(days / 365); // Approximate

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  if (seconds < 60) return rtf.format(-seconds, "second");
  if (minutes < 60) return rtf.format(-minutes, "minute");
  if (hours < 24) return rtf.format(-hours, "hour");
  if (days < 7) return rtf.format(-days, "day");
  if (weeks < 5) return rtf.format(-weeks, "week");
  if (months < 12) return rtf.format(-months, "month");
  return rtf.format(-years, "year");
}
export { timeAgo };
