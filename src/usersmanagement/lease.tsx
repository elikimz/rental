import React, { useState } from "react";
import { useGetAllLeasesQuery, useCreateLeaseMutation } from "../features/lease/leaseAPI";
import { jwtDecode } from "jwt-decode";

const LeaseManagementPage: React.FC = () => {
  const token = localStorage.getItem("token");
  const decodedToken: any = token ? jwtDecode(token) : null;
  const tenantId = decodedToken?.id;

  const { data: leases, isLoading, error, refetch } = useGetAllLeasesQuery();
  const [createLease] = useCreateLeaseMutation();

  const [formData, setFormData] = useState({
    unit_id: "",
    start_date: "",
    end_date: "",
    rent_amount: "",
    deposit_amount: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateLease = async () => {
    if (!tenantId) {
      console.error("Tenant ID not found");
      return;
    }

    try {
      await createLease({
        tenant_id: tenantId,
        unit_id: Number(formData.unit_id),
        start_date: formData.start_date,
        end_date: formData.end_date,
        rent_amount: Number(formData.rent_amount),
        deposit_amount: Number(formData.deposit_amount),
      }).unwrap();
      refetch();
      alert("Lease created successfully!");
    } catch (error) {
      console.error("Error creating lease:", error);
      alert("Failed to create lease");
    }
  };

  if (isLoading) return <div>Loading leases...</div>;
  if (error) return <div>Error loading leases</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6">Lease Management</h2>
      <form className="space-y-4">
        <input
          type="text"
          name="unit_id"
          value={formData.unit_id}
          onChange={handleChange}
          placeholder="Unit ID"
          className="w-full p-3 border"
        />
        <input
          type="date"
          name="start_date"
          value={formData.start_date}
          onChange={handleChange}
          className="w-full p-3 border"
        />
        <input
          type="date"
          name="end_date"
          value={formData.end_date}
          onChange={handleChange}
          className="w-full p-3 border"
        />
        <input
          type="text"
          name="rent_amount"
          value={formData.rent_amount}
          onChange={handleChange}
          placeholder="Rent Amount"
          className="w-full p-3 border"
        />
        <input
          type="text"
          name="deposit_amount"
          value={formData.deposit_amount}
          onChange={handleChange}
          placeholder="Deposit Amount"
          className="w-full p-3 border"
        />
        <button
          type="button"
          onClick={handleCreateLease}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Create Lease
        </button>
      </form>

      <h3 className="text-2xl font-semibold mt-8">Existing Leases</h3>
      <ul className="mt-4">
        {leases?.map((lease: any) => (
          <li key={lease.id} className="p-4 border-b">
            <p>Lease ID: {lease.id}</p>
            <p>Unit ID: {lease.unit_id}</p>
            <p>Start Date: {lease.start_date}</p>
            <p>End Date: {lease.end_date}</p>
            <p>Rent: {lease.rent_amount}</p>
            <p>Deposit: {lease.deposit_amount}</p>
            <p>Status: {lease.lease_status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeaseManagementPage;
