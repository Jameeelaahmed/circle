// Libs
import { createBrowserRouter, RouterProvider } from "react-router";
// Components
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import AboutUs from "../pages/AboutUs/AboutUs";
import RootLayout from "../layouts/RootLayout";
import Events from "../pages/Events/Events";
import LandingContainer from "../pages/Landing/LandingContainer";


const routes = createBrowserRouter([
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { index: true, element: <LandingContainer /> },
            { path: "events", element: <Events /> },
            { path: "payments", element: "" },
            { path: "about", element: <AboutUs /> },
        ]
    },
]);

export default function RoutesPages() {
    return <RouterProvider router={routes} />;
}
