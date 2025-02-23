import React, { useState, useEffect } from "react";
import {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "./usersAPI";

const UserManagement: React.FC = () => {
  const { data: users, isLoading, error, refetch } = useGetUsersQuery();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  console.log("Fetching users...");
  console.log("Loading state:", isLoading);
  console.log("Error:", error);
  console.log("Users data:", users);

  // Notification state
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" | null }>({ message: "", type: null });

  // State for updating user
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const { data: selectedUser } = useGetUserByIdQuery(selectedUserId || 0, { skip: !selectedUserId });

  console.log("Selected user ID:", selectedUserId);
  console.log("Selected user data:", selectedUser);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    if (selectedUser) {
      setFormData({
        full_name: selectedUser.full_name,
        email: selectedUser.email,
        role: selectedUser.role,
      });
    }
  }, [selectedUser]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle update user
  const handleUpdateUser = async () => {
    if (!selectedUserId) return;

    try {
      await updateUser({ userId: selectedUserId, userData: formData }).unwrap();
      setNotification({ message: "User updated successfully!", type: "success" });
      setSelectedUserId(null);
      refetch();
    } catch (error) {
      console.error("Update error:", error);
      setNotification({ message: "Failed to update user.", type: "error" });
    }
  };

  // Handle delete user
  const handleDeleteUser = async (id: number) => {
    try {
      await deleteUser(id).unwrap();
      setNotification({ message: "User deleted successfully!", type: "success" });
      setSelectedUserId(null);
      refetch();
    } catch (error) {
      console.error("Delete error:", error);
      setNotification({ message: "Failed to delete user.", type: "error" });
    }
  };

  if (isLoading) return <div className="text-center text-blue-500">Loading users...</div>;
  if (error) return <div className="text-center text-red-500">Error loading users</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">User Management</h1>

      {/* Notification */}
      {notification.message && (
        <div className={`p-3 mb-4 text-white text-center rounded-md ${notification.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
          {notification.message}
        </div>
      )}

      {/* User Table */}
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
            {users?.map((user) => (
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

      {/* Update User Modal */}
      {selectedUserId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">Update User</h2>

            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleInputChange}
              placeholder="Full Name"
              className="w-full p-2 mb-3 border rounded-md"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="w-full p-2 mb-3 border rounded-md"
            />

            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full p-2 mb-3 border rounded-md"
            >
              <option value="Admin">Admin</option>
              <option value="Landlord">Landlord</option>
              <option value="Tenant">Tenant</option>
            </select>

            <button onClick={handleUpdateUser} className="bg-green-500 text-white w-full p-2 rounded-md hover:bg-green-600">
              Update User
            </button>

            <button onClick={() => setSelectedUserId(null)} className="bg-gray-400 text-white w-full p-2 mt-2 rounded-md hover:bg-gray-500">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
