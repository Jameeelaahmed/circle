import {  useState } from "react";

export function useTheme() {
    const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved === "true" || false;
  });

  

  return { darkMode, setDarkMode };
}
