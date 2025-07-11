// Libs
import { createBrowserRouter, RouterProvider } from "react-router";
// Components
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import { LandingPage } from "../pages/Landing/Landing";

const routes = createBrowserRouter([
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/", element: <LandingPage /> },
]);

export default function RoutesPages() {
    return <RouterProvider router={routes} />;
}
