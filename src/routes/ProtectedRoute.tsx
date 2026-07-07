import { Navigate, Outlet } from "react-router-dom";

import { ROUTES } from "./route-paths";

export default function ProtectedRoute() {
  const isAuthenticated = false;

  return isAuthenticated ? <Outlet /> : <Navigate replace to={ROUTES.LOGIN} />;
}
