import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import HeaderContainer from "../components/Header/HeaderContainer";
function RootLayout() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved === "true" || false;
  });

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);


  return (
    <div className={darkMode ? "light" : ""}>
      <HeaderContainer toggleDark={() => setDarkMode(!darkMode)} darkMode={darkMode} />
      <Outlet />
    </div>
  );
}

export default RootLayout;
