

// import React, { useState } from "react";
// import { useGetAllLeasesQuery, useCreateLeaseMutation } from "../features/lease/leaseAPI";
// import { jwtDecode } from "jwt-decode";

// const LeaseManagementPage: React.FC = () => {
//   const token = localStorage.getItem("token");
//   const decodedToken: any = token ? jwtDecode(token) : null;
//   const tenantId = decodedToken?.id;

//   const { data: leases, isLoading, error, refetch } = useGetAllLeasesQuery();
//   const [createLease] = useCreateLeaseMutation();
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

//   const [formData, setFormData] = useState({
//     start_date: "",
//     end_date: "",
//     rent_amount: "",
//     deposit_amount: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleCreateLease = async () => {
//     if (!tenantId) {
//       setMessage({ type: 'error', text: "Tenant ID not found" });
//       return;
//     }

//     setLoading(true);
//     setMessage(null);
//     try {
//       await createLease({
//           tenant_id: tenantId,
//           start_date: formData.start_date,
//           end_date: formData.end_date,
//           rent_amount: Number(formData.rent_amount),
//           deposit_amount: Number(formData.deposit_amount),
//           unit_id: 0
//       }).unwrap();
//       refetch();
//       setMessage({ type: 'success', text: "Lease created successfully!" });
//       setFormData({ start_date: "", end_date: "", rent_amount: "", deposit_amount: "" });
//     } catch (error) {
//       console.error("Error creating lease:", error);
//       setMessage({ type: 'error', text: "Failed to create lease" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (isLoading) return <div>Loading leases...</div>;
//   if (error) return <div>Error loading leases</div>;

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
//       <h2 className="text-3xl font-bold mb-6">Lease Management</h2>
//       {message && (
//         <div
//           className={`p-4 mb-4 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
//         >
//           {message.text}
//         </div>
//       )}
//       <form className="space-y-4">
//         <input
//           type="date"
//           name="start_date"
//           value={formData.start_date}
//           onChange={handleChange}
//           className="w-full p-3 border"
//         />
//         <input
//           type="date"
//           name="end_date"
//           value={formData.end_date}
//           onChange={handleChange}
//           className="w-full p-3 border"
//         />
//         <input
//           type="text"
//           name="rent_amount"
//           value={formData.rent_amount}
//           onChange={handleChange}
//           placeholder="Rent Amount"
//           className="w-full p-3 border"
//         />
//         <input
//           type="text"
//           name="deposit_amount"
//           value={formData.deposit_amount}
//           onChange={handleChange}
//           placeholder="Deposit Amount"
//           className="w-full p-3 border"
//         />
//         <button
//           type="button"
//           onClick={handleCreateLease}
//           className={`bg-blue-500 text-white px-6 py-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
//           disabled={loading}
//         >
//           {loading ? "Creating Lease..." : "Create Lease"}
//         </button>
//       </form>

//       <h3 className="text-2xl font-semibold mt-8">Existing Leases</h3>
//       <ul className="mt-4">
//         {leases?.map((lease: any) => (
//           <li key={lease.id} className="p-4 border-b">
//             <p>Lease ID: {lease.id}</p>
//             <p>Start Date: {lease.start_date}</p>
//             <p>End Date: {lease.end_date}</p>
//             <p>Rent: {lease.rent_amount}</p>
//             <p>Deposit: {lease.deposit_amount}</p>
//             <p>Status: {lease.lease_status}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default LeaseManagementPage;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useGetAllLeasesQuery, useCreateLeaseMutation } from "../features/lease/leaseAPI";
import { jwtDecode } from "jwt-decode";

const LeaseManagementPage: React.FC = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const token = localStorage.getItem("token");
  const decodedToken: any = token ? jwtDecode(token) : null;
  const tenantId = decodedToken?.id;

  const { data: leases, isLoading, error, refetch } = useGetAllLeasesQuery();
  const [createLease] = useCreateLeaseMutation();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [formData, setFormData] = useState({
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
      setMessage({ type: 'error', text: "Tenant ID not found" });
      return;
    }

    setLoading(true);
    setMessage(null);
    try {
      await createLease({
          tenant_id: tenantId,
          start_date: formData.start_date,
          end_date: formData.end_date,
          rent_amount: Number(formData.rent_amount),
          deposit_amount: Number(formData.deposit_amount),
          unit_id: 0
      }).unwrap();
      refetch();
      setMessage({ type: 'success', text: "Lease created successfully!" });
      setFormData({ start_date: "", end_date: "", rent_amount: "", deposit_amount: "" });
      navigate("/payments"); // Navigate to the payments page after successful creation
    } catch (error) {
      console.error("Error creating lease:", error);
      setMessage({ type: 'error', text: "Failed to create lease" });
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return <div>Loading leases...</div>;
  if (error) return <div>Error loading leases</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6">Lease Management</h2>
      {message && (
        <div
          className={`p-4 mb-4 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
        >
          {message.text}
        </div>
      )}
      <form className="space-y-4">
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
          className={`bg-blue-500 text-white px-6 py-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
          disabled={loading}
        >
          {loading ? "Creating Lease..." : "Create Lease"}
        </button>
      </form>

      <h3 className="text-2xl font-semibold mt-8">Existing Leases</h3>
      <ul className="mt-4">
        {leases?.map((lease: any) => (
          <li key={lease.id} className="p-4 border-b">
            <p>Lease ID: {lease.id}</p>
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