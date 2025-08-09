import { createBrowserRouter, RouterProvider } from "react-router";
// Components
import RootLayout from "../layouts/RootLayout";
import { lazy } from "react";
// import AboutUs from "../pages/AboutUs/AboutUs";
// import Payments from "../pages/Payments/PaymentContainer";
// import LandingPage from "../pages/Landing/LandingContainer";
// import ForgetPassword from "../pages/Authentication/ForgetPasswordPage/ForgetPasswordContainer";
// import LoginPage from "../pages/Authentication/LoginPage/LoginPage";
// import RegisterPage from "../pages/Authentication/RegisterPage/RegisterPage";
// import EventsContainer from "../pages/Events/EventsContainer";
// import PaymentSuccess from "../pages/Payments/Success";
// import PaymentFailure from "../pages/Payments/Cancel";
// import Explore from "../pages/Explore/Explore";
// import ProfilePage from "../pages/profile/profile.jsx";
// import Memories from "../pages/Memories";
// import CirclesPageContainer from "../pages/CirclesPage/CirclesPageContainer.jsx";
// import CirclePageContainer from "../pages/CirlclePage/CirclePageContainer.jsx";
// import MemoryUploadPage from "../pages/Memories/AddMemories.jsx";
const AboutUs = lazy(() => import("../pages/AboutUs/AboutUs"));
const Payments = lazy(() => import("../pages/Payments/PaymentContainer"));
const LandingPage = lazy(() => import("../pages/Landing/LandingContainer"));
const ForgetPassword = lazy(() => import("../pages/Authentication/ForgetPasswordPage/ForgetPasswordContainer"));
const LoginPage = lazy(() => import("../pages/Authentication/LoginPage/LoginPage"));
const RegisterPage = lazy(() => import("../pages/Authentication/RegisterPage/RegisterPage"));
const EventsContainer = lazy(() => import("../pages/Events/EventsContainer"));
const PaymentSuccess = lazy(() => import("../pages/Payments/Success"));
const PaymentFailure = lazy(() => import("../pages/Payments/Cancel"));
const Explore = lazy(() => import("../pages/Explore/Explore"));
const ProfilePage = lazy(() => import("../pages/profile/profile.jsx"));
const Memories = lazy(() => import("../pages/Memories"));
const CirclesPageContainer = lazy(() => import("../pages/CirclesPage/CirclesPageContainer.jsx"));
const CirclePageContainer = lazy(() => import("../pages/CirlclePage/CirclePageContainer.jsx"));
const MemoryUploadPage = lazy(() => import("../pages/Memories/AddMemories.jsx"));

const routes = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/forget-password", element: <ForgetPassword /> },
  { path: "/success", element: <PaymentSuccess /> },
  { path: "/cancel", element: <PaymentFailure /> },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "circles", element: <CirclesPageContainer /> },
      { path: "circles/:circleId", element: <CirclePageContainer /> },
      { path: "payments", element: <Payments /> },
      { path: "events", element: <EventsContainer /> },
      { path: "about", element: <AboutUs /> },
      { path: "explore", element: <Explore /> },
      // "events/:cirlceId/:eventId/memories"
      { path: "circles/:circleId/memories", element: <Memories /> },
      { path: "circles/:circleId/memories/add", element: <MemoryUploadPage /> },
    ],
  },
  {
    path: "/profile/:profileId",
    element: <RootLayout />,
    children: [{ index: true, element: <ProfilePage /> }],
  },
]);

export default function RoutesPages() {
  return <RouterProvider router={routes} />;
}
