import React, { useState, useEffect } from 'react';
import {
  useGetAllTenantsQuery,
  useGetTenantByIdQuery,
  useUpdateTenantMutation,
  useDeleteTenantMutation,
} from './tenantsAPI';
import Spinner from '../../components/spinner';

const TenantPage: React.FC = () => {
  const [tenantId, setTenantId] = useState('');
  const [formData, setFormData] = useState({ full_name: '', email: '', phone_number: '' });
  const [message, setMessage] = useState('');

  const { data: tenants, refetch: refetchAllTenants, isLoading: isTenantsLoading, isError } = useGetAllTenantsQuery();
  const { data: tenant, refetch, isFetching } = useGetTenantByIdQuery(Number(tenantId), { skip: !tenantId });

  const [updateTenant, { isLoading: isUpdating }] = useUpdateTenantMutation();
  const [deleteTenant, { isLoading: isDeleting }] = useDeleteTenantMutation();

  useEffect(() => {
    if (tenant) {
      setFormData({ full_name: tenant.full_name, email: tenant.email, phone_number: tenant.phone_number });
    }
  }, [tenant]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateTenant = async () => {
    if (!tenantId || !formData.full_name || !formData.email || !formData.phone_number) {
      setMessage('Tenant ID and all fields are required for update.');
      return;
    }
    try {
      await updateTenant({ id: Number(tenantId), tenantData: formData }).unwrap();
      setMessage('✅ Tenant updated successfully!');
      refetchAllTenants();
    } catch {
      setMessage('❌ Failed to update tenant.');
    }
  };

  const handleDeleteTenant = async (id: number) => {
    try {
      await deleteTenant(id).unwrap();
      setMessage('✅ Tenant deleted successfully!');
      refetchAllTenants();
    } catch {
      setMessage('❌ Failed to delete tenant.');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Tenant Management</h1>
      {message && <p className="text-sm mb-4 text-center p-2 rounded bg-gray-100">{message}</p>}

      <div className="mb-6">
        <input
          type="text"
          placeholder="Tenant ID"
          value={tenantId}
          onChange={(e) => setTenantId(e.target.value)}
          className="border p-2 mr-2 rounded w-1/2"
        />
        <button onClick={() => refetch()} className="bg-blue-500 text-white px-4 py-2 rounded">
          Get Tenant
        </button>
      </div>

      {isFetching && <Spinner />}
      {isError && tenantId && <p className="text-red-500">Tenant not found.</p>}

      <div className="mb-6">
        <h2 className="text-xl font-semibold">Update Tenant</h2>
        <input
          type="text"
          name="full_name"
          placeholder="Full Name"
          value={formData.full_name}
          onChange={handleInputChange}
          className="border p-2 mb-2 block w-full rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          className="border p-2 mb-2 block w-full rounded"
        />
        <input
          type="text"
          name="phone_number"
          placeholder="Phone Number"
          value={formData.phone_number}
          onChange={handleInputChange}
          className="border p-2 mb-2 block w-full rounded"
        />
        <button
          onClick={handleUpdateTenant}
          disabled={isUpdating}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          {isUpdating ? <Spinner /> : 'Update Tenant'}
        </button>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">All Tenants</h2>
        {isTenantsLoading ? <Spinner /> : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tenants?.map((t) => (
              <li key={t.id} className="border p-4 rounded bg-white">
                <strong>ID: {t.id}</strong>
                <p><strong>Name:</strong> {t.full_name}</p>
                <p><strong>Email:</strong> {t.email}</p>
                <p><strong>Phone:</strong> {t.phone_number}</p>
                <button
                  onClick={() => handleDeleteTenant(t.id)}
                  disabled={isDeleting}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 mt-2"
                >
                  {isDeleting ? <Spinner /> : 'Delete'}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TenantPage;

// 🚀 Let me know if anything else needs refining! ✨