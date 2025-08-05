import { createBrowserRouter, RouterProvider } from "react-router";
import { lazy, Suspense } from "react";

// Eagerly loaded components (small and frequently used)
import RootLayout from "../layouts/RootLayout";

// Lazy loaded components with dynamic imports
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

// Simple wrapper component for lazy-loaded routes
const LazyWrapper = ({ children }) => (
  <Suspense fallback={<div />}>
    {children}
  </Suspense>
);
const routes = createBrowserRouter([
  { path: "/login", element: <LazyWrapper><LoginPage /></LazyWrapper> },
  { path: "/register", element: <LazyWrapper><RegisterPage /></LazyWrapper> },
  { path: "/forget-password", element: <LazyWrapper><ForgetPassword /></LazyWrapper> },
  { path: "/success", element: <LazyWrapper><PaymentSuccess /></LazyWrapper> },
  { path: "/cancel", element: <LazyWrapper><PaymentFailure /></LazyWrapper> },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <LazyWrapper><LandingPage /></LazyWrapper> },
      { path: "circles", element: <LazyWrapper><CirclesPageContainer /></LazyWrapper> },
      { path: "circles/:circleId", element: <LazyWrapper><CirclePageContainer /></LazyWrapper> },
      { path: "payments", element: <LazyWrapper><Payments /></LazyWrapper> },
      { path: "events", element: <LazyWrapper><EventsContainer /></LazyWrapper> },
      { path: "about", element: <LazyWrapper><AboutUs /></LazyWrapper> },
      { path: "explore", element: <LazyWrapper><Explore /></LazyWrapper> },
      // "events/:cirlceId/:eventId/memories"
      { path: "circles/:circleId/memories", element: <LazyWrapper><Memories /></LazyWrapper> },
      { path: "circles/:circleId/memories/add", element: <LazyWrapper><MemoryUploadPage /></LazyWrapper> },
    ],
  },
  {
    path: "/profile/:profileId",
    element: <RootLayout />,
    children: [{ index: true, element: <LazyWrapper><ProfilePage /></LazyWrapper> }],
  },
]);

export default function RoutesPages() {
  return <RouterProvider router={routes} />;
}
