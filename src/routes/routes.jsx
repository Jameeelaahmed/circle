// Libs
import { createBrowserRouter, RouterProvider } from "react-router";
// Components
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import RootLayout from "../layouts/RootLayout";
import { LandingPage } from "../pages/Landing/Landing";

const routes = createBrowserRouter([
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
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
]);

export default function RoutesPages() {
    return <RouterProvider router={routes} />;
}
