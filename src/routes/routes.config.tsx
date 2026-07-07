import { AppRoute } from "./types";
import { ROUTES } from "./route-paths";

import MainLayout from "@/layouts/MainLayout";
import AuthLayout from "@/layouts/AuthLayout";
import DashboardLayout from "@/layouts/DashboardLayout";

import Home from "@/pages/Website/Home/Home";
import Login from "@/pages/Auth/login/Login";
import Signup from "@/pages/Auth/signup/Signup";
import ForgotPassword from "@/pages/Auth/forgot-password/ForgotPassword";
import Dashboard from "@/pages/WebPanel/Dashboard/Dashboard";
import NotFound from "@/pages/common/NotFound/NotFound";

export const appRoutes: AppRoute[] = [
  {
    path: ROUTES.HOME,
    element: <Home />,
    layout: MainLayout,
    auth: "public",
  },
  {
    path: ROUTES.LOGIN,
    element: <Login />,
    layout: AuthLayout,
    auth: "guest",
  },
  {
    path: ROUTES.SIGNUP,
    element: <Signup />,
    layout: AuthLayout,
    auth: "guest",
  },
  {
    path: ROUTES.FORGOT_PASSWORD,
    element: <ForgotPassword />,
    layout: AuthLayout,
    auth: "guest",
  },
  {
    path: ROUTES.DASHBOARD,
    element: <Dashboard />,
    layout: DashboardLayout,
    auth: "private",
  },
  {
    path: "*",
    element: <NotFound />,
    auth: "public",
  },
];
