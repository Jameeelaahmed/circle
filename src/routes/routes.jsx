// Libs
import { createBrowserRouter, RouterProvider } from "react-router";
// Components
import Login from "../pages/Authentication/LoginContainer";
import Register from "../pages/Authentication/RegisterContainer";
import AboutUs from "../pages/AboutUs/AboutUs";

import RootLayout from "../layouts/RootLayout";
import { LandingPage } from "../pages/Landing/LandingPage";
import Payments from "../pages/Payments/Payments";

const routes = createBrowserRouter([
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { index: true, element: <LandingPage /> },
            { path: "events", element: "" },
            { path: "payments", element: <Payments/> },
            { path: "about", element: <AboutUs /> },
        ]
    },
]);

export default function RoutesPages() {
    return <RouterProvider router={routes} />;
}
