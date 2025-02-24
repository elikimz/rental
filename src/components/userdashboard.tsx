import React, { useState, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { Menu, X, Home, User, Building, Key, CreditCard, LifeBuoy, LogOut } from "lucide-react"; // Icons for better UI

const TenantLayout: React.FC = () => {
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
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-green-700 text-white p-2 rounded-md shadow-md"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-green-700 text-white p-6 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:relative transition-transform duration-300 ease-in-out z-40 shadow-lg`}
      >
        <h2 className="text-2xl font-bold mb-6">Tenant Dashboard</h2>
        <nav className="space-y-4">
          <Link to="/tenant-dashboard" className="flex items-center gap-3 hover:text-gray-300" onClick={handleLinkClick}>
            <Home size={20} /> Overview
          </Link>
          <Link to="/tenant-dashboard/account" className="flex items-center gap-3 hover:text-gray-300" onClick={handleLinkClick}>
            <User size={20} /> My Account
          </Link>
          <Link to="/tenant-dashboard/property" className="flex items-center gap-3 hover:text-gray-300" onClick={handleLinkClick}>
            <Building size={20} /> Properties
          </Link>
          <Link to="/tenant-dashboard/unit" className="flex items-center gap-3 hover:text-gray-300" onClick={handleLinkClick}>
            <Key size={20} /> Units
          </Link>
          <Link to="/tenant-dashboard/lease" className="flex items-center gap-3 hover:text-gray-300" onClick={handleLinkClick}>
            <Key size={20} /> Leases
          </Link>
          <Link to="/tenant-dashboard/payment" className="flex items-center gap-3 hover:text-gray-300" onClick={handleLinkClick}>
            <CreditCard size={20} /> Payments
          </Link>
          <Link to="/tenant-dashboard/support" className="flex items-center gap-3 hover:text-gray-300" onClick={handleLinkClick}>
            <LifeBuoy size={20} /> Support
          </Link>
          <button
            onClick={handleLogout}
            className="mt-4 flex items-center gap-3 w-full text-left text-red-400 hover:text-red-600"
          >
            <LogOut size={20} /> Logout
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 w-full p-6 bg-gray-100 lg:ml-64">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Placeholder for dynamic dashboard cards */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold">Property Overview</h3>
            <p className="text-gray-600">Summary of your rented properties.</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold">Active Leases</h3>
            <p className="text-gray-600">View lease agreements and statuses.</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold">Payment History</h3>
            <p className="text-gray-600">Track your past and upcoming payments.</p>
          </div>
        </div>

        {/* Render the child routes */}
        <div className="mt-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default TenantLayout;
