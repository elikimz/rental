// import React, { useState, useEffect } from "react";
// import {
//   useGetUsersQuery,
//   useGetUserByIdQuery,
//   useUpdateUserMutation,
//   useDeleteUserMutation,
// } from "./usersAPI";

// const UserManagement: React.FC = () => {
//   const { data: users, isLoading, error, refetch } = useGetUsersQuery(undefined);
//   const [deleteUser] = useDeleteUserMutation();
//   const [updateUser] = useUpdateUserMutation();
//   const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
//   const [formData, setFormData] = useState({ full_name: "", email: "", role: "" });
//   const { data: selectedUser, isFetching } = useGetUserByIdQuery(selectedUserId || 0, { skip: !selectedUserId });
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState<string | null>(null);

//   useEffect(() => {
//     if (selectedUser) {
//       setFormData({
//         full_name: selectedUser.full_name,
//         email: selectedUser.email,
//         role: selectedUser.role,
//       });
//     }
//   }, [selectedUser]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleUpdateUser = async () => {
//     if (!selectedUserId) return;
//     setLoading(true);
//     try {
//       await updateUser({ userId: selectedUserId, userData: formData }).unwrap();
//       setMessage("User updated successfully");
//       setSelectedUserId(null);
//       refetch();
//     } catch (error) {
//       setMessage("Update failed. Try again.");
//     }
//     setLoading(false);
//   };

//   const handleDeleteUser = async (id: number) => {
//     setLoading(true);
//     try {
//       await deleteUser(id).unwrap();
//       setMessage("User deleted successfully");
//       refetch();
//     } catch (error) {
//       setMessage("Delete failed. Try again.");
//     }
//     setLoading(false);
//   };

//   if (isLoading) return <div className="text-center text-blue-500">Loading users...</div>;
//   if (error) return <div className="text-center text-red-500">Error loading users</div>;

//   return (
//     <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
//       <h1 className="text-3xl font-bold mb-6 text-center">User Management</h1>
//       {message && <div className="text-center text-green-500 mb-4">{message}</div>}
//       <div className="overflow-x-auto">
//         <table className="w-full border-collapse border border-gray-200 shadow-sm">
//           <thead>
//             <tr className="bg-gray-100 text-gray-700">
//               <th className="p-3 border">ID</th>
//               <th className="p-3 border">Full Name</th>
//               <th className="p-3 border">Email</th>
//               <th className="p-3 border">Role</th>
//               <th className="p-3 border">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users?.map((user) => (
//               <tr key={user.id} className="hover:bg-gray-50">
//                 <td className="p-3 border text-center">{user.id}</td>
//                 <td className="p-3 border">{user.full_name}</td>
//                 <td className="p-3 border">{user.email}</td>
//                 <td className="p-3 border text-center">{user.role}</td>
//                 <td className="p-3 border text-center">
//                   <button
//                     onClick={() => setSelectedUserId(user.id)}
//                     className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-blue-600"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDeleteUser(user.id)}
//                     className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {selectedUserId && (
//         <div className="mt-6 p-6 bg-gray-100 rounded-lg shadow">
//           <h2 className="text-xl font-bold mb-4">Update User</h2>
//           {isFetching && <div className="text-blue-500">Loading user data...</div>}
//           <div className="mb-3">
//             <label className="block font-medium">Full Name</label>
//             <input
//               type="text"
//               name="full_name"
//               value={formData.full_name}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-md"
//             />
//           </div>
//           <div className="mb-3">
//             <label className="block font-medium">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-md"
//             />
//           </div>
//           <div className="mb-3">
//             <label className="block font-medium">Role</label>
//             <select
//               name="role"
//               value={formData.role}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded-md"
//             >
//               <option value="Admin">Admin</option>
//               <option value="Landlord">Landlord</option>
//               <option value="Tenant">Tenant</option>
//             </select>
//           </div>
//           <button
//             onClick={handleUpdateUser}
//             className="bg-green-500 text-white w-full p-2 rounded-md hover:bg-green-600"
//             disabled={loading}
//           >
//             {loading ? "Updating..." : "Update User"}
//           </button>
//           <button
//             onClick={() => setSelectedUserId(null)}
//             className="bg-gray-400 text-white w-full p-2 mt-2 rounded-md hover:bg-gray-500"
//           >
//             Cancel
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserManagement;


import React, { useState, useEffect } from "react";
import {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "./usersAPI";

interface User {
  id: number;
  full_name: string;
  email: string;
  role: string;
}

const UserManagement: React.FC = () => {
  const { data: users, isLoading, error, refetch } = useGetUsersQuery(undefined);
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ full_name: "", email: "", role: "" });
  const { data: selectedUser, isFetching } = useGetUserByIdQuery(selectedUserId || 0, { skip: !selectedUserId });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (selectedUser) {
      setFormData({
        full_name: selectedUser.full_name,
        email: selectedUser.email,
        role: selectedUser.role,
      });
    }
  }, [selectedUser]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateUser = async () => {
    if (!selectedUserId) return;
    setLoading(true);
    try {
      await updateUser({ userId: selectedUserId, userData: formData }).unwrap();
      setMessage("User updated successfully");
      setSelectedUserId(null);
      refetch();
    } catch {
      setMessage("Update failed. Try again.");
    }
    setLoading(false);
  };

  const handleDeleteUser = async (id: number) => {
    setLoading(true);
    try {
      await deleteUser(id).unwrap();
      setMessage("User deleted successfully");
      refetch();
    } catch {
      setMessage("Delete failed. Try again.");
    }
    setLoading(false);
  };

  if (isLoading) return <div className="text-center text-blue-500">Loading users...</div>;
  if (error) return <div className="text-center text-red-500">Error loading users</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">User Management</h1>
      {message && <div className="text-center text-green-500 mb-4">{message}</div>}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200 shadow-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Full Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Role</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user: User) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="p-3 border text-center">{user.id}</td>
                <td className="p-3 border">{user.full_name}</td>
                <td className="p-3 border">{user.email}</td>
                <td className="p-3 border text-center">{user.role}</td>
                <td className="p-3 border text-center">
                  <button
                    onClick={() => setSelectedUserId(user.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedUserId && (
        <div className="mt-6 p-6 bg-gray-100 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Update User</h2>
          {isFetching && <div className="text-blue-500">Loading user data...</div>}
          <div className="mb-3">
            <label className="block font-medium">Full Name</label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-3">
            <label className="block font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-3">
            <label className="block font-medium">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="Admin">Admin</option>
              <option value="Landlord">Landlord</option>
              <option value="Tenant">Tenant</option>
            </select>
          </div>
          <button
            onClick={handleUpdateUser}
            className="bg-green-500 text-white w-full p-2 rounded-md hover:bg-green-600"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update User"}
          </button>
          <button
            onClick={() => setSelectedUserId(null)}
            className="bg-gray-400 text-white w-full p-2 mt-2 rounded-md hover:bg-gray-500"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
