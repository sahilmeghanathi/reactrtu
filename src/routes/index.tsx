import { Routes, Route } from "react-router-dom";

import { AppRoute } from "./types";
import { appRoutes } from "./routes.config";

function renderRoutes(routes: AppRoute[]) {
  return routes.map((route) => {
    const Layout = route.layout;
    const content = Layout ? <Layout>{route.element}</Layout> : route.element;

    return (
      <Route key={route.path} path={route.path} element={content}>
        {route.children ? renderRoutes(route.children) : null}
      </Route>
    );
  });
}

export default function AppRoutes() {
  return <Routes>{renderRoutes(appRoutes)}</Routes>;
}
