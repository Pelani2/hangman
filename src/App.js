import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { RouterProvider } from "react-router-dom";

export default function App () {
  return (
    <RouterProvider router={AppRoutes} />
  );
}