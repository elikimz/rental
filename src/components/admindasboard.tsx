// src/layouts/AdminLayout.tsx
import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white p-4">
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
        <nav className="space-y-4">
          <Link to="/admin-dashboard" className="block hover:text-gray-300">Overview</Link>
          <Link to="/admin-dashboard/properties" className="block hover:text-gray-300">Properties</Link>
          <Link to="/admin-dashboard/units" className="block hover:text-gray-300">Units</Link>
          <Link to="/admin-dashboard/tenants" className="block hover:text-gray-300">Tenants</Link>
          <Link to="/admin-dashboard/leases" className="block hover:text-gray-300">Leases</Link>
          <Link to="/admin-dashboard/payments" className="block hover:text-gray-300">Payments</Link>
          <button onClick={handleLogout} className="mt-4 w-full text-left text-red-400 hover:text-red-600">
            Logout
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

// Next, I’ll add the routes for you! 🚀
