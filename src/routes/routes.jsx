// Libs
import { createBrowserRouter, RouterProvider } from "react-router";
// Components
import Login from "../pages/Login";
import Register from "../pages/Register";

const routes = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);

export default function RoutesPages() {
  return <RouterProvider router={routes} />;
}
