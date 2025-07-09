import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// STYLESHEETS
import "./index.css";
import App from "./App.jsx";
// FONTS
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";
import "@fontsource-variable/quicksand";
// CONTEXTS
import UserProvider from "./context/UserContext.jsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
    <ToastContainer/>
  </StrictMode>
);
