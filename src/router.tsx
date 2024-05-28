import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';
const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Pages
const LandingPage = Loader(lazy(() => import('src/content/Landing')));
const FuelTerminal = Loader(lazy(() => import('src/content/FuelTerminal')));
const FuelTank = Loader(lazy(() => import('src/content/FuelTank')));
const RefineryTransport = Loader(lazy(() => import('src/content/RefineryTransport')));
const Refinery = Loader(lazy(() => import('src/content/Refinery')));
const FuelSourceTransport = Loader(lazy(() => import('src/content/FuelSourceTransport')));
const DataVerifyPage = Loader(lazy(() => import('src/content/DataVerify')));

// This project is origin from starter template of "Tokyo React Admin".
// There was profile page and so on.
// If you wanna recover them, please reference its git repository !
// https://github.com/bloomui/tokyo-free-white-react-admin-dashboard

// Status
const Status404 = Loader(
  lazy(() => import('src/content/pages/Status/Status404'))
);
const Status500 = Loader(
  lazy(() => import('src/content/pages/Status/Status500'))
);
const StatusComingSoon = Loader(
  lazy(() => import('src/content/pages/Status/ComingSoon'))
);
const StatusMaintenance = Loader(
  lazy(() => import('src/content/pages/Status/Maintenance'))
);

const routes: RouteObject[] = [
  {
    path: '',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <LandingPage />
      },
      {
        path: '/terminal/:terminal_id',
        element: <FuelTerminal />
      },
      {
        path: '/terminal/:terminal_id/tank',
        element: <FuelTank />
      },
      {
        path: '/terminal/:terminal_id/tank/refinerytransport',
        element: <RefineryTransport />
      },
      {
        path: '/terminal/:terminal_id/tank/refinerytransport/:refinery_id',
        element: <Refinery />
      },
      {
        path: '/terminal/:terminal_id/tank/refinerytransport/:refinery_id/fuelsourcetransport',
        element: <FuelSourceTransport />
      },
      {
        path: '/dataverify',
        element: <DataVerifyPage />
      },
      {
        path: 'status',
        children: [
          {
            path: '',
            element: <Navigate to="404" replace />
          },
          {
            path: '404',
            element: <Status404 />
          },
          {
            path: '500',
            element: <Status500 />
          },
          {
            path: 'maintenance',
            element: <StatusMaintenance />
          },
          {
            path: 'coming-soon',
            element: <StatusComingSoon />
          }
        ]
      },
      {
        path: '*',
        element: <Status404 />
      }
    ]
  },
];

export default routes;
