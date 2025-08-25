import { useContext, useEffect } from "react";
import { Outlet } from "react-router";
import HeaderContainer from "../components/Header/HeaderContainer";
import { ThemeContext } from "../contexts/ThemeContext";
function RootLayout() {

  const {darkMode, setDarkMode} = useContext(ThemeContext);

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
