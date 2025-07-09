import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "../pages/Login";
import Register from "../pages/Register";

const routes = createBrowserRouter([
    { path: "/", element: <Login /> },
    { path: "/register", element: <Register /> },
]);

export default function RoutesPages() {
    return <RouterProvider router={routes} />;
}
