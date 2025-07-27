import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from './app/store.js'
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

createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <App />
    </Provider>

    <ToastContainer />
  </>
);
