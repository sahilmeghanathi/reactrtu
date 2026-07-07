import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { ROUTES } from "./route-paths";
import { RouteAuthType } from "./types";
import { useAuth } from "@/hooks/useAuth";

interface RouteGuardProps {
  readonly auth?: RouteAuthType;
  readonly children: ReactNode;
}

export default function RouteGuard({ auth = "public", children }: RouteGuardProps) {
  const { isAuthenticated, loading, validateToken } = useAuth();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (auth === "public") {
        // no validation needed for pure public routes
        if (mounted) setChecking(false);
        return;
      }

      await validateToken();
      if (mounted) setChecking(false);
    })();
    return () => {
      mounted = false;
    };
  }, [auth, validateToken]);

  if (checking || loading) return null;

  if (auth === "private" && !isAuthenticated) {
    return <Navigate replace to={ROUTES.LOGIN} />;
  }

  if (auth === "guest" && isAuthenticated) {
    return <Navigate replace to={ROUTES.DASHBOARD} />;
  }

  return <>{children}</>;
}
