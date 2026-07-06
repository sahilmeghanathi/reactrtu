import { Navigate, Outlet } from "react-router-dom";

import { ROUTES } from "./route-paths";

export default function PublicRoute() {
  const isAuthenticated = false;

  return isAuthenticated ? (
    <Navigate replace to={ROUTES.DASHBOARD} />
  ) : (
    <Outlet />
  );
}
