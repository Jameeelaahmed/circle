import { createBrowserRouter, RouterProvider } from "react-router"

const routes = createBrowserRouter([
    { path: "", element: "" },
])

export default function RoutesPages() {
    return <RouterProvider router={routes} />
}