// // src/layouts/AdminLayout.tsx
// import React from 'react';
// import { Outlet, Link, useNavigate } from 'react-router-dom';

// const AdminLayout: React.FC = () => {
//   const navigate = useNavigate();

//   // Handle logout
//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   return (
//     <div className="flex min-h-screen">
//       {/* Sidebar */}
//       <aside className="w-64 bg-blue-900 text-white p-4">
//         <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
//         <nav className="space-y-4">
//           <Link to="/admin-dashboard" className="block hover:text-gray-300">Overview</Link>
//           <Link to="/admin-dashboard/properties" className="block hover:text-gray-300">Properties</Link>
//           <Link to="/admin-dashboard/units" className="block hover:text-gray-300">Units</Link>
//           <Link to="/admin-dashboard/tenants" className="block hover:text-gray-300">Tenants</Link>
//           <Link to="/admin-dashboard/leases" className="block hover:text-gray-300">Leases</Link>
//           <Link to="/admin-dashboard/payments" className="block hover:text-gray-300">Payments</Link>
//           <Link to="/admin-dashboard/users" className="block hover:text-gray-300">Users</Link>
//           <button onClick={handleLogout} className="mt-4 w-full text-left text-red-400 hover:text-red-600">
//             Logout
//           </button>
//         </nav>
//       </aside>

//       {/* Main content */}
//       <main className="flex-1 p-6 bg-gray-100">
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default AdminLayout;

// // Next, I’ll add the routes for you! 🚀

import React, { useState, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Import icons

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Close sidebar when clicking a menu item (on mobile)
  const handleLinkClick = () => {
    setIsSidebarOpen(false);
  };

  // Prevent scrolling when sidebar is open (mobile)
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isSidebarOpen]);

  return (
    <div className="flex min-h-screen">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-blue-900 text-white p-2 rounded-md"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-blue-900 text-white p-4 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:relative transition-transform duration-300 ease-in-out z-40`}
      >
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
        <nav className="space-y-4">
          <Link to="/admin-dashboard" className="block hover:text-gray-300" onClick={handleLinkClick}>
            Overview
          </Link>
          <Link to="/admin-dashboard/properties" className="block hover:text-gray-300" onClick={handleLinkClick}>
            Properties
          </Link>
          <Link to="/admin-dashboard/units" className="block hover:text-gray-300" onClick={handleLinkClick}>
            Units
          </Link>
          <Link to="/admin-dashboard/tenants" className="block hover:text-gray-300" onClick={handleLinkClick}>
            Tenants
          </Link>
          <Link to="/admin-dashboard/leases" className="block hover:text-gray-300" onClick={handleLinkClick}>
            Leases
          </Link>
          <Link to="/admin-dashboard/payments" className="block hover:text-gray-300" onClick={handleLinkClick}>
            Payments
          </Link>
          <Link to="/admin-dashboard/users" className="block hover:text-gray-300" onClick={handleLinkClick}>
            Users
          </Link>
          <button onClick={handleLogout} className="mt-4 w-full text-left text-red-400 hover:text-red-600">
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 w-full p-6 bg-gray-100 lg:ml-64">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
