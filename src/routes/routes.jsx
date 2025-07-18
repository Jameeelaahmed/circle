// Libs
import { createBrowserRouter, RouterProvider } from "react-router";
// Components
import AboutUs from "../pages/AboutUs/AboutUs";
import RootLayout from "../layouts/RootLayout";
import Payments from "../pages/Payments/Payments";
import LandingPage from "../pages/Landing/LandingContainer";
import ForgetPassword from "../pages/Authentication/ForgetPasswordPage/ForgetPasswordContainer";
import LoginPage from "../pages/Authentication/LoginPage/LoginPage";
import RegisterPage from "../pages/Authentication/RegisterPage/RegisterPage";
import EventsContainer from "../pages/Events/EventsContainer";
import Explore from "../pages/Explore/Explore";

const routes = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/forget-password", element: <ForgetPassword /> },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "payments", element: <Payments /> },
      { path: "events", element: <EventsContainer /> },
      { path: "about", element: <AboutUs /> },
      { path: "explore", element: <Explore /> },
    ],
  },
]);

export default function RoutesPages() {
  return <RouterProvider router={routes} />;
}
