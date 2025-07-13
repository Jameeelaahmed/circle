import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/profile/profile";
const routes = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/:profileName", element: <Profile /> },
  //   { path: "/", element: <Profile /> },
]);

export default function RoutesPages() {
  return <RouterProvider router={routes} />;
}
