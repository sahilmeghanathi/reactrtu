import { Routes, Route } from "react-router-dom";

import RouteGuard from "./RouteGuard";
import { AppRoute } from "./types";
import { appRoutes } from "./routes.config";

function renderRoutes(routes: AppRoute[]) {
  return routes.map((route) => {
    const Layout = route.layout;
    const content = Layout ? <Layout>{route.element}</Layout> : route.element;

    console.log(`Rendering route: ${route.path}, Auth: ${route.auth}, Layout: ${Layout ? Layout.name : "None"}`);

    return (
      <Route
        key={route.path}
        path={route.path}
        element={<RouteGuard auth={route.auth}>{content}</RouteGuard>}
      >
        {route.children ? renderRoutes(route.children) : null}
      </Route>
    );
  });
}

export default function AppRoutes() {
  return <Routes>{renderRoutes(appRoutes)}</Routes>;
}
