import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import AdminLayout from './components/admindasboard';
import UnitPage from './features/units/units';
import PropertiesPage from './features/properties/properties';
import TenantsPage from './features/tenants/tenants';
import LeasePage from './features/lease/lease';
// import DashboardHome from './features/dashboard/DashboardHome';
import LoginPage from './features/login/login';
import RegisterPage from './features/register/register';

const Router: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '/register',
      element: <RegisterPage />,
    },
    {
      path: '/admin-dashboard',
      element: <AdminLayout />,
      children: [
      // { path: '', element: <DashboardHome /> },
      { path: 'units', element: <UnitPage /> },
       { path: 'properties', element: <PropertiesPage /> },
      { path: 'tenants', element: <TenantsPage /> },
      { path: 'leases', element: <LeasePage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;