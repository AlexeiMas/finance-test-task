import { createBrowserRouter, Navigate, RouteObject, RouterProvider } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { ERoutes } from '@/routes/routes';
import { HomePage, DynamicListPage } from '@/pages';

const Routes = () => {
  const routes: RouteObject[] = [
    {
      element: <MainLayout />,
      children: [
        {
          path: ERoutes.HomePage,
          element: <HomePage />,
        },
        {
          path: ERoutes.DynamicListPage,
          element: <DynamicListPage />,
        },
        {
          path: '*',
          element: <Navigate to={ERoutes.HomePage} />,
        },
      ],
    },
  ];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

export default Routes;
