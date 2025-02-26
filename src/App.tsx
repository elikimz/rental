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
import TenantLayout from './components/userdashboard';
import AccountPage from './usersmanagement/userspage';
import PropertiePage from './usersmanagement/properties';
import LeaseManagementPage from './usersmanagement/lease';
import UnitManagementPage from './usersmanagement/units';
import PaymentPage from './features/stripe/stripe';
import Success from './pages/success';
import Overviews from './pages/TenantDashboard';


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
      path: '/success',
      element: <Success/>,
    },
    {
      path: '/tenant-dashboard',
      element: <Overviews/>,
    },
   
   
    {
      path: '/admin-dashboard',
      element: <AdminLayout />,
      children: [
      { path: 'overview', element: <Overview /> },
      { path: 'units', element: <UnitPage /> },
       { path: 'properties', element: <PropertiesPage /> },
      { path: 'tenants', element: <TenantsPage /> },
      { path: 'leases', element: <LeasePage /> },
      { path: 'payments', element: <PaymentComponent/> },
      { path: 'users', element: <UserManagement/> },
      ],
    },

    {
      path: '/tenant-dashboard',
      element: <TenantLayout />,
      children: [
      { path: 'account', element: <AccountPage/> },
      { path: 'property', element: <PropertiePage /> },
      { path: 'unit', element: <UnitManagementPage/> },
      { path: 'lease', element: <LeaseManagementPage /> },
      { path: 'payment', element: <PaymentPage/> },
      { path: 'unit/:propertyId', element: <UnitManagementPage /> }, 
      { path: 'unit/:unitId/lease/:leaseId', element: <LeaseManagementPage /> },
      { path: '/tenant-dashboard/unit/20/lease/undefined/tenant-dashboard/payment', element: <PaymentPage/> },
      // { path: 'support', element: <Support/> },
      // { path: 'users', element: <UserManagement/> },/tenant-dashboard/unit/20/lease/undefined/tenant-dashboard/payment
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;