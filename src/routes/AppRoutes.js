import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Index";

const AppRoutes = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    }
]);

export default AppRoutes;