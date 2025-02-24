import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import AdminLayout from './components/admindasboard';
import UnitPage from './features/units/units';
import PropertiesPage from './features/properties/properties';
import TenantsPage from './features/tenants/tenants';
import LeasePage from './features/lease/lease';
// import DashboardHome from './features/dashboard/DashboardHome';
import LoginPage from './features/login/login';
import RegisterPage from './features/register/register';
import PaymentComponent from './features/payments/payments';
import UserManagement from './features/users/users';
import HomePage from './pages/home';
import Properties from './pages/properties';
import ServicesPage from './pages/services';
import ContactPage from './pages/contact';
import Overview from './pages/Overview';


const Router: React.FC = () => {
  const router = createBrowserRouter([

    {
      path: '/',
      element: <HomePage/>,
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '/register',
      element: <RegisterPage />,
    },
    {
      path: '/properties',
      element: <Properties/>,
    },
    {
      path: '/services',
      element: <ServicesPage/>,
    },
    {
      path: '/contact',
      element: <ContactPage/>,
    },
    {
      path: '/admin-dashboard',
      element: <Overview/>,
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
      { path: 'payments', element: <PaymentComponent/> },
      { path: 'users', element: <UserManagement/> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;