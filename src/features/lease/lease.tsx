import React, { useState, useEffect } from 'react';
import {
  useGetAllLeasesQuery,
  useGetLeaseByIdQuery,
  useCreateLeaseMutation,
  useUpdateLeaseMutation,
  useDeleteLeaseMutation,
} from './leaseAPI';
import Spinner from '../../components/spinner';

const LeasePage: React.FC = () => {
  const [leaseId, setLeaseId] = useState('');
  const [formData, setFormData] = useState({
    start_date: '',
    end_date: '',
    rent_amount: '',
    deposit_amount: '',
  });
  const [message, setMessage] = useState('');

  const { data: leases, refetch: refetchAllLeases, isLoading: isLeasesLoading, isError } = useGetAllLeasesQuery();
  const { data: lease, refetch, isFetching } = useGetLeaseByIdQuery(Number(leaseId), { skip: !leaseId });

  const [createLease, { isLoading: isCreating }] = useCreateLeaseMutation();
  const [updateLease, { isLoading: isUpdating }] = useUpdateLeaseMutation();
  const [deleteLease, { isLoading: isDeleting }] = useDeleteLeaseMutation();

  useEffect(() => {
    if (lease) {
      setFormData({
        start_date: lease.start_date,
        end_date: lease.end_date,
        rent_amount: lease.rent_amount,
        deposit_amount: lease.deposit_amount,
      });
    }
  }, [lease]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateAmounts = () => {
    const rent = parseFloat(formData.rent_amount);
    const deposit = parseFloat(formData.deposit_amount);
    if (deposit > rent) {
      setMessage('❌ Deposit amount cannot be more than rent amount.');
      return false;
    }
    return true;
  };

  const handleCreateLease = async () => {
    if (!validateAmounts()) return;
    try {
      await createLease(formData).unwrap();
      setMessage('✅ Lease created successfully!');
      refetchAllLeases();
      setFormData({ start_date: '', end_date: '', rent_amount: '', deposit_amount: '' });
    } catch {
      setMessage('❌ Failed to create lease.');
    }
  };

  const handleUpdateLease = async () => {
    if (!leaseId) {
      setMessage('❌ Lease ID is required for update.');
      return;
    }
    if (!validateAmounts()) return;
    try {
      await updateLease({ id: Number(leaseId), leaseData: formData }).unwrap();
      setMessage('✅ Lease updated successfully!');
      refetchAllLeases();
      setFormData({ start_date: '', end_date: '', rent_amount: '', deposit_amount: '' });
    } catch {
      setMessage('❌ Failed to update lease.');
    }
  };

  const handleDeleteLease = async (id: number) => {
    try {
      await deleteLease(id).unwrap();
      setMessage('✅ Lease deleted successfully!');
      refetchAllLeases();
    } catch {
      setMessage('❌ Failed to delete lease.');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Lease Management</h1>
      {message && <p className="text-sm mb-4 text-center p-2 rounded bg-gray-100">{message}</p>}

      <div className="mb-6">
        <input
          type="text"
          placeholder="Lease ID"
          value={leaseId}
          onChange={(e) => setLeaseId(e.target.value)}
          className="border p-2 mr-2 rounded w-1/2"
        />
        <button onClick={() => refetch()} className="bg-blue-500 text-white px-4 py-2 rounded">
          Get Lease
        </button>
      </div>

      {isFetching && <Spinner />}
      {isError && leaseId && <p className="text-red-500">Lease not found.</p>}

      <div className="mb-6">
        <h2 className="text-xl font-semibold">Create / Update Lease</h2>
        <input type="date" name="start_date" value={formData.start_date} onChange={handleInputChange} className="border p-2 mb-2 block w-full rounded" />
        <input type="date" name="end_date" value={formData.end_date} onChange={handleInputChange} className="border p-2 mb-2 block w-full rounded" />
        <input type="number" name="rent_amount" placeholder="Rent Amount" value={formData.rent_amount} onChange={handleInputChange} className="border p-2 mb-2 block w-full rounded" />
        <input type="number" name="deposit_amount" placeholder="Deposit Amount" value={formData.deposit_amount} onChange={handleInputChange} className="border p-2 mb-2 block w-full rounded" />
        
        <button onClick={handleCreateLease} disabled={isCreating} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2">
          {isCreating ? <Spinner /> : 'Create Lease'}
        </button>
        <button onClick={handleUpdateLease} disabled={isUpdating} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
          {isUpdating ? <Spinner /> : 'Update Lease'}
        </button>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">All Leases</h2>
        {isLeasesLoading ? <Spinner /> : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {leases?.map((l) => (
              <li key={l.id} className="border p-4 rounded bg-white">
                <strong>ID: {l.id}</strong>
                <p><strong>Start:</strong> {l.start_date}</p>
                <p><strong>End:</strong> {l.end_date}</p>
                <p><strong>Rent:</strong> {l.rent_amount}</p>
                <p><strong>Deposit:</strong> {l.deposit_amount}</p>
                <p><strong>Status:</strong> {l.lease_status}</p>
                <button onClick={() => handleDeleteLease(l.id)} disabled={isDeleting} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 mt-2">
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

export default LeasePage;

// Let me know if you want any adjustments! 🚀
