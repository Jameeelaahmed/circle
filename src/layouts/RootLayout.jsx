import { useEffect, useState } from "react";
import Header from "../components/Header/HeaderContainer";
import { Outlet } from "react-router";
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
      <Header toggleDark={() => setDarkMode(!darkMode)} darkMode={darkMode} />
      <Outlet />
    </div>
  );
}

export default RootLayout;
