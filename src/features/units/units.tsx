// import React, { useState, useEffect } from 'react';
// import {
//   useCreateUnitMutation,
//   useGetAllUnitsQuery,
//   useGetUnitByIdQuery,
//   useUpdateUnitMutation,
//   useDeleteUnitMutation,
// } from "./unitsAPI";
// import Spinner from '../../components/spinner';

// const UnitPage: React.FC = () => {
//   const [unitId, setUnitId] = useState('');
//   const [formData, setFormData] = useState({ name: '', status: 'available' });
//   const [message, setMessage] = useState('');

//   const { data: unit, refetch, isFetching, isError } = useGetUnitByIdQuery(Number(unitId), { skip: !unitId });
//   const { data: units, refetch: refetchAllUnits, isLoading: isUnitsLoading } = useGetAllUnitsQuery(undefined);
//   const [createUnit, { isLoading: isCreating }] = useCreateUnitMutation();
//   const [updateUnit, { isLoading: isUpdating }] = useUpdateUnitMutation();
//   const [deleteUnit, { isLoading: isDeleting }] = useDeleteUnitMutation();

//   useEffect(() => {
//     if (unit) {
//       setFormData({ name: unit.name, status: unit.status });
//     }
//   }, [unit]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleCreateUnit = async () => {
//     if (!formData.name || !formData.status) {
//       setMessage('All fields are required.');
//       return;
//     }
//     try {
//       await createUnit(formData).unwrap();
//       setMessage('✅ Unit created successfully!');
//       setFormData({ name: '', status: 'available' });
//       refetchAllUnits();
//     } catch {
//       setMessage('❌ Failed to create unit.');
//     }
//   };

//   const handleUpdateUnit = async () => {
//     if (!unitId || !formData.name || !formData.status) {
//       setMessage('Unit ID and all fields are required for update.');
//       return;
//     }
//     try {
//       await updateUnit({ id: Number(unitId), unitData: formData }).unwrap();
//       setMessage('✅ Unit updated successfully!');
//       refetchAllUnits();
//     } catch {
//       setMessage('❌ Failed to update unit.');
//     }
//   };

//   const handleDeleteUnit = async (id: number) => {
//     try {
//       await deleteUnit(id).unwrap();
//       setMessage('✅ Unit deleted successfully!');
//       refetchAllUnits();
//     } catch {
//       setMessage('❌ Failed to delete unit.');
//     }
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h1 className="text-3xl font-bold mb-6">Unit Management</h1>
//       {message && <p className="text-sm mb-4 text-center p-2 rounded bg-gray-100">{message}</p>}

//       <div className="mb-6">
//         <input
//           type="text"
//           placeholder="Unit ID"
//           value={unitId}
//           onChange={(e) => setUnitId(e.target.value)}
//           className="border p-2 mr-2 rounded w-1/2"
//         />
//         <button onClick={() => refetch()} className="bg-blue-500 text-white px-4 py-2 rounded">
//           Get Unit
//         </button>
//       </div>

//       {isFetching && <Spinner />}
//       {isError && unitId && <p className="text-red-500">Unit not found.</p>}

//       <div className="mb-6">
//         <h2 className="text-xl font-semibold">Create / Update Unit</h2>
//         <input
//           type="text"
//           name="name"
//           placeholder="Unit Name"
//           value={formData.name}
//           onChange={handleInputChange}
//           className="border p-2 mb-2 block w-full rounded"
//         />
//         <select
//           name="status"
//           value={formData.status}
//           onChange={handleInputChange}
//           className="border p-2 mb-2 block w-full rounded"
//         >
//           <option value="available">Available</option>
//           <option value="occupied">Occupied</option>
//         </select>
//         <button
//           onClick={handleCreateUnit}
//           disabled={isCreating}
//           className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
//         >
//           {isCreating ? <Spinner /> : 'Create Unit'}
//         </button>
//         <button
//           onClick={handleUpdateUnit}
//           disabled={isUpdating}
//           className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
//         >
//           {isUpdating ? <Spinner /> : 'Update Unit'}
//         </button>
//       </div>

//       <div className="mb-6">
//         <h2 className="text-xl font-semibold mb-2">All Units</h2>
//         {isUnitsLoading ? <Spinner /> : (
//           <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {units?.map((u) => (
//               <li key={u.id} className="border p-4 rounded bg-white">
//                 <strong>ID: {u.id}</strong>
//                 <p><strong>Name:</strong> {u.name}</p>
//                 <p><strong>Status:</strong> {u.status}</p>
//                 <button
//                   onClick={() => handleDeleteUnit(u.id)}
//                   disabled={isDeleting}
//                   className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 mt-2"
//                 >
//                   {isDeleting ? <Spinner /> : 'Delete'}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UnitPage;

// // 🚀 Now with clean notifications and a smoother delete experience! Let me know if anything else needs adjusting! ✨


import React, { useState, useEffect } from 'react';
import {
  useCreateUnitMutation,
  useGetAllUnitsQuery,
  useGetUnitByIdQuery,
  useUpdateUnitMutation,
  useDeleteUnitMutation,
} from "./unitsAPI";
import Spinner from '../../components/spinner';

const UnitPage: React.FC = () => {
  const [unitId, setUnitId] = useState('');
  const [formData, setFormData] = useState({ name: '', status: 'available' });
  const [message, setMessage] = useState('');

  const { data: unit, refetch, isFetching, isError } = useGetUnitByIdQuery(Number(unitId), { skip: !unitId });
  const { data: units, refetch: refetchAllUnits, isLoading: isUnitsLoading } = useGetAllUnitsQuery(undefined);
  const [createUnit, { isLoading: isCreating }] = useCreateUnitMutation();
  const [updateUnit, { isLoading: isUpdating }] = useUpdateUnitMutation();
  const [deleteUnit, { isLoading: isDeleting }] = useDeleteUnitMutation();

  useEffect(() => {
    if (unit) {
      setFormData({ name: unit.name, status: unit.status });
    }
  }, [unit]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateUnit = async () => {
    if (!formData.name || !formData.status) {
      setMessage('All fields are required.');
      return;
    }
    try {
      await createUnit(formData).unwrap();
      setMessage('✅ Unit created successfully!');
      setFormData({ name: '', status: 'available' });
      refetchAllUnits();
    } catch {
      setMessage('❌ Failed to create unit.');
    }
  };

  const handleUpdateUnit = async () => {
    if (!unitId || !formData.name || !formData.status) {
      setMessage('Unit ID and all fields are required for update.');
      return;
    }
    try {
      await updateUnit({ id: Number(unitId), unitData: formData }).unwrap();
      setMessage('✅ Unit updated successfully!');
      refetchAllUnits();
    } catch {
      setMessage('❌ Failed to update unit.');
    }
  };

  const handleDeleteUnit = async (id: number) => {
    try {
      await deleteUnit(id).unwrap();
      setMessage('✅ Unit deleted successfully!');
      refetchAllUnits();
    } catch {
      setMessage('❌ Failed to delete unit.');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Unit Management</h1>
      {message && <p className="text-sm mb-4 text-center p-2 rounded bg-gray-100">{message}</p>}

      <div className="mb-6">
        <input
          type="text"
          placeholder="Unit ID"
          value={unitId}
          onChange={(e) => setUnitId(e.target.value)}
          className="border p-2 mr-2 rounded w-1/2"
        />
        <button onClick={() => refetch()} className="bg-blue-500 text-white px-4 py-2 rounded">
          Get Unit
        </button>
      </div>

      {isFetching && <Spinner />}
      {isError && unitId && <p className="text-red-500">Unit not found.</p>}

      <div className="mb-6">
        <h2 className="text-xl font-semibold">Create / Update Unit</h2>
        <input
          type="text"
          name="name"
          placeholder="Unit Name"
          value={formData.name}
          onChange={handleInputChange}
          className="border p-2 mb-2 block w-full rounded"
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          className="border p-2 mb-2 block w-full rounded"
        >
          <option value="available">Available</option>
          <option value="occupied">Occupied</option>
        </select>
        <button
          onClick={handleCreateUnit}
          disabled={isCreating}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
        >
          {isCreating ? <Spinner /> : 'Create Unit'}
        </button>
        <button
          onClick={handleUpdateUnit}
          disabled={isUpdating}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          {isUpdating ? <Spinner /> : 'Update Unit'}
        </button>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">All Units</h2>
        {isUnitsLoading ? <Spinner /> : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {units?.map((u) => (
              <li 
                key={u.id} 
                className={`border p-4 rounded bg-white ${u.status === 'available' ? 'bg-green-100' : 'bg-blue-100'}`}
              >
                <strong>ID: {u.id}</strong>
                <p><strong>Name:</strong> {u.name}</p>
                <p className={`${u.status === 'available' ? 'text-green-600' : 'text-blue-600'}`}>
                  <strong>Status:</strong> {u.status}
                </p>
                <button
                  onClick={() => handleDeleteUnit(u.id)}
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

export default UnitPage;

// ✅ Now the status shows in green for available and blue for occupied units! 🚀
