import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { MainLayout } from '@/app/layouts/MainLayout';
import { ROUTES } from '@/constants/routes';
import { LoadingSkeleton } from '@/components/common';

const HomePage = lazy(() =>
  import('@/features/home/pages/HomePage').then((module) => ({ default: module.HomePage })),
);

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: ROUTES.HOME,
        element: (
          <Suspense fallback={<RouteFallback />}>
            <HomePage />
          </Suspense>
        ),
      },
    ],
  },
]);

function RouteFallback() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 py-6 lg:px-6">
      <LoadingSkeleton variant="card" count={3} />
    </div>
  );
}

export function AppRouter() {
  return <RouterProvider router={router} />;
}
