// Libs
import { createBrowserRouter, RouterProvider } from "react-router";
// Components
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
<<<<<<< HEAD
import { LandingPage } from "../pages/Landing/Landing";
import AboutUs from "../pages/AboutUs/AboutUs";
=======
import RootLayout from "../layouts/RootLayout";
import { LandingPage } from "../pages/Landing/LandingPage";
>>>>>>> e0ab35e032185f6d6f6c67e0d9e2567a92dacff9

const routes = createBrowserRouter([
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
<<<<<<< HEAD
    { path: "/", element: <LandingPage /> },
    { path: "/aboutus", element: <AboutUs /> },
=======
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { index: true, element: <LandingPage /> },
            { path: "events", element: "" },
            { path: "payments", element: "" },
            { path: "about", element: "" },
        ]
    },
>>>>>>> e0ab35e032185f6d6f6c67e0d9e2567a92dacff9
]);

export default function RoutesPages() {
    return <RouterProvider router={routes} />;
}
