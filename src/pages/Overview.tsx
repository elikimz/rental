import React from "react";
import { Link } from "react-router-dom";
import { BarChart, Users, Home, DollarSign, CheckCircle, Clock } from "lucide-react";

const Overview: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 shadow-md rounded-lg flex items-center">
          <Home size={28} className="text-blue-500 mr-3" />
          <div>
            <p className="text-gray-500">Total Properties</p>
            <h2 className="text-xl font-semibold">12</h2>
          </div>
        </div>

        <div className="bg-white p-4 shadow-md rounded-lg flex items-center">
          <Users size={28} className="text-green-500 mr-3" />
          <div>
            <p className="text-gray-500">Total Tenants</p>
            <h2 className="text-xl font-semibold">34</h2>
          </div>
        </div>

        <div className="bg-white p-4 shadow-md rounded-lg flex items-center">
          <CheckCircle size={28} className="text-purple-500 mr-3" />
          <div>
            <p className="text-gray-500">Occupied Units</p>
            <h2 className="text-xl font-semibold">78%</h2>
          </div>
        </div>

        <div className="bg-white p-4 shadow-md rounded-lg flex items-center">
          <DollarSign size={28} className="text-yellow-500 mr-3" />
          <div>
            <p className="text-gray-500">Pending Payments</p>
            <h2 className="text-xl font-semibold">Ksh 120,000</h2>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-3">Revenue Trend</h2>
        {/* Placeholder for Chart */}
        <div className="h-48 flex items-center justify-center text-gray-400">
          <BarChart size={48} />
          <p className="ml-2">Chart Coming Soon...</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-3">Recent Activity</h2>
        <ul className="space-y-3">
          <li className="flex items-center">
            <Clock size={20} className="text-gray-500 mr-2" />
            John Doe paid rent for **Unit A3** (Ksh 25,000)
          </li>
          <li className="flex items-center">
            <Clock size={20} className="text-gray-500 mr-2" />
            New tenant **Alice Mwangi** moved into **Unit B4**
          </li>
          <li className="flex items-center">
            <Clock size={20} className="text-gray-500 mr-2" />
            Lease renewed for **Unit C2** (James Kariuki)
          </li>
        </ul>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 flex space-x-4">
        <Link to="/admin-dashboard/properties/new" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          Add Property
        </Link>
        <Link to="/admin-dashboard/tenants/new" className="bg-green-600 text-white px-4 py-2 rounded-lg">
          Add Tenant
        </Link>
        <Link to="/admin-dashboard/payments" className="bg-yellow-600 text-white px-4 py-2 rounded-lg">
          Collect Rent
        </Link>
      </div>
    </div>
  );
};

export default Overview;
