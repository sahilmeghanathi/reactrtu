import { ComponentType, ReactNode } from "react";

export type RouteAuthType = "public" | "private" | "guest";

export interface AppRoute {
  path: string;
  element: ReactNode;
  layout?: ComponentType<{ children: ReactNode }>;
  auth?: RouteAuthType;
  children?: AppRoute[];
}
