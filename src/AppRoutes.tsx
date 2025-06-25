import { lazy, Suspense, type FC, type LazyExoticComponent } from "react";
import { useRoutes, type RouteObject } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

const Landing: LazyExoticComponent<FC> = lazy(
  () => import("./features/landing/landing")
);
const Dashboard: LazyExoticComponent<FC> = lazy(
  () => import("./features/dashboard/Dashboard")
);
const Datasource: LazyExoticComponent<FC> = lazy(
  () => import("./features/datasources/Datasources")
);

const Charts: LazyExoticComponent<FC> = lazy(
  () => import("./features/charts/Charts")
);

const ChartCreation: LazyExoticComponent<FC> = lazy(
  () => import("./features/charts/Chart-Creation")
);

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
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        </Suspense>
      ),
    },
    {
      path: "/datasources",
      element: (
        <Suspense>
          <ProtectedRoute>
            <Datasource />
          </ProtectedRoute>
        </Suspense>
      ),
    },
    {
      path: "/charts",
      element: (
        <Suspense>
          <ProtectedRoute>
            <Charts />
          </ProtectedRoute>
        </Suspense>
      ),
    },
    {
      path: "/charts/create",
      element: (
        <Suspense>
          <ProtectedRoute>
            <ChartCreation />
          </ProtectedRoute>
        </Suspense>
      ),
    },
    {
      path: "/charts/edit/:chartId",
      element: (
        <Suspense>
          <ProtectedRoute>
            <ChartCreation />
          </ProtectedRoute>
        </Suspense>
      ),
    },
  ];
  return useRoutes(routes);
};

export default AppRouter;
