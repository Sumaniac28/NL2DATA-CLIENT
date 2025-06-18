import { Suspense, type FC } from "react";
import { useRoutes, type RouteObject } from "react-router-dom";
import Landing from "./features/landing/landing";
import Dashboard from "./features/dashboard/Dashboard";

const AppRouter: FC = () => {
  const routes: RouteObject[] = [
    {
      path: "/",
      element: (
        <Suspense>
          <Landing />
        </Suspense>
      ),
    },
    {
      path: "/dashboard",
      element: (
        <Suspense>
          <Dashboard />
        </Suspense>
      ),
    },
  ];
  return useRoutes(routes);
};

export default AppRouter;
