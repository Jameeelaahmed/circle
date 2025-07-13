// Libs
import { createBrowserRouter, RouterProvider } from "react-router";
// Components
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import { LandingPage } from "../pages/Landing/Landing";
import AboutUs from "../pages/AboutUs/AboutUs";

const routes = createBrowserRouter([
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/", element: <LandingPage /> },
    { path: "/aboutus", element: <AboutUs /> },
]);

export default function RoutesPages() {
    return <RouterProvider router={routes} />;
}
