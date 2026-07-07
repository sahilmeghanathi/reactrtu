import { Routes, Route } from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";
import AuthLayout from "@/layouts/AuthLayout";
import DashboardLayout from "@/layouts/DashboardLayout";

import Home from "@/pages/Website/Home/Home";
import Login from "@/pages/Auth/login/Login";
import Dashboard from "@/pages/WebPanel/Dashboard/Dashboard";
import NotFound from "@/pages/common/NotFound/NotFound";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import { ROUTES } from "./route-paths";

export default function AppRoutes() {
  return (
    <Routes>
      {/* <Route element={<MainLayout />}>
        <Route path={ROUTES.HOME} element={<Home />} />
      </Route> */}

      <Route element={<PublicRoute />}>
        <Route element={<AuthLayout />}>
          <Route path={ROUTES.LOGIN} element={<Login />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
