
import React from "react";
import { Link } from "react-router-dom";
import { Users, Home, DollarSign, CheckCircle, Clock } from "lucide-react";
import { useGetAllUnitsQuery } from "../features/units/unitsAPI";
import { useGetAllLeasesQuery } from "../features/lease/leaseAPI";
import { useGetAllPaymentsQuery } from "../features/payments/paymentsAPI";
import { useGetAllTenantsQuery } from "../features/tenants/tenantsAPI";
import { useGetAllPropertiesQuery } from "../features/properties/propertiesAPI";
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const Overviews: React.FC = () => {
  const { data: properties } = useGetAllPropertiesQuery(undefined);
  const { data: tenants } = useGetAllTenantsQuery(undefined);
  const { data: units } = useGetAllUnitsQuery(undefined);
  const { data: payments } = useGetAllPaymentsQuery(undefined);
  const { data: leases } = useGetAllLeasesQuery(undefined);

  const totalProperties = properties?.length || 0;
  const totalTenants = tenants?.length || 0;
  const occupiedUnits = units?.filter((unit) => unit.status === "occupied").length || 0;
  const vacantUnits = (units?.length || 0) - occupiedUnits;
  const totalPendingPayments =
    payments?.reduce((sum: number, p: { status: string; amount: number }) => sum + (p.status === "pending" ? p.amount : 0), 0) || 0;

  // Revenue Data for Bar Chart
  const revenueData = payments?.map((p: { month: string; amount: number }) => ({
    month: p.month,
    revenue: p.amount,
  })) || [];

  // Unit Status Data for Pie Chart
  const unitStatusData = [
    { name: "Occupied", value: occupiedUnits },
    { name: "Vacant", value: vacantUnits },
  ];
  const COLORS = ["#4CAF50", "#FF5733"];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 shadow-md rounded-lg flex items-center">
          <Home size={28} className="text-blue-500 mr-3" />
          <div>
            <p className="text-gray-500">Total Properties</p>
            <h2 className="text-xl font-semibold">{totalProperties}</h2>
          </div>
        </div>

        <div className="bg-white p-4 shadow-md rounded-lg flex items-center">
          <Users size={28} className="text-green-500 mr-3" />
          <div>
            <p className="text-gray-500">Total Tenants</p>
            <h2 className="text-xl font-semibold">{totalTenants}</h2>
          </div>
        </div>

        <div className="bg-white p-4 shadow-md rounded-lg flex items-center">
          <CheckCircle size={28} className="text-purple-500 mr-3" />
          <div>
            <p className="text-gray-500">Occupied Units</p>
            <h2 className="text-xl font-semibold">{occupiedUnits}</h2>
          </div>
        </div>

        <div className="bg-white p-4 shadow-md rounded-lg flex items-center">
          <DollarSign size={28} className="text-yellow-500 mr-3" />
          <div>
            <p className="text-gray-500">Pending Payments</p>
            <h2 className="text-xl font-semibold">Ksh {totalPendingPayments.toLocaleString()}</h2>
          </div>
        </div>
      </div>

      {/* Graphs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Revenue Trend */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-3">Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <ReBarChart data={revenueData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#4CAF50" />
            </ReBarChart>
          </ResponsiveContainer>
        </div>

        {/* Unit Status Overview */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-3">Unit Status Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <RePieChart>
              <Pie data={unitStatusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
                {unitStatusData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </RePieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-3">Recent Activity</h2>
        <ul className="space-y-3">
          {leases?.slice(0, 3).map((lease, index) => (
            <li key={index} className="flex items-center">
              <Clock size={20} className="text-gray-500 mr-2" />
              {lease.tenant} moved into {lease.unit}
            </li>
          ))}
          {payments?.slice(0, 3).map((payment: { tenant: string; amount: number; unit: string }, index: number) => (
            <li key={index} className="flex items-center">
              <Clock size={20} className="text-gray-500 mr-2" />
              {payment.tenant} paid Ksh {payment.amount} for {payment.unit}
            </li>
          ))}
        </ul>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 flex space-x-4">
        <Link to="/admin-dashboard/properties" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          Add Property
        </Link>
        <Link to="/admin-dashboard/tenants" className="bg-green-600 text-white px-4 py-2 rounded-lg">
          Add Tenant
        </Link>
        <Link to="/admin-dashboard/payments" className="bg-yellow-600 text-white px-4 py-2 rounded-lg">
          Collect Rent
        </Link>
      </div>
    </div>
  );
};

export default Overviews;
