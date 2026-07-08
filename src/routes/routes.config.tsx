import { AppRoute } from "./types";
import { ROUTES } from "./route-paths";

import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/Website/Home/Home";
import Shop from "@/pages/Website/Shop/Shop";
import ProductDetail from "@/pages/Website/Product/ProductDetail";
// import Cart from "@/pages/Website/Cart/Cart";
import NotFound from "@/pages/common/NotFound/NotFound";
import Terms from "@/pages/common/Terms";
import Privacy from "@/pages/common/Privacy";

export const appRoutes: AppRoute[] = [
  {
    path: ROUTES.HOME,
    element: <Home />,
    layout: MainLayout,
  },
  {
    path: ROUTES.SHOP,
    element: <Shop />,
    layout: MainLayout,
  },
  {
    path: ROUTES.PRODUCT,
    element: <ProductDetail />,
    layout: MainLayout,
  },
  // {
  //   path: ROUTES.CART,
  //   element: <Cart />,
  //   layout: MainLayout,
  // },
  {
    path: ROUTES.TERMS,
    element: <Terms />,
    layout: MainLayout,
  },
  {
    path: ROUTES.PRIVACY,
    element: <Privacy />,
    layout: MainLayout,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
