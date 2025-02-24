/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import { useGetUserByIdQuery, useUpdateUserMutation, useDeleteUserMutation } from "../features/users/usersAPI";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AccountPage: React.FC = () => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  // Fetch user data
  const { data: user, isLoading, isError } = useGetUserByIdQuery(Number(userId), { skip: !userId });
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const [editedUser, setEditedUser] = useState({ id: "", name: "", email: "" });

  // Auto-fill user details when data is available
  useEffect(() => {
    if (user) setEditedUser({ id: user.id, name: user.name, email: user.email });
  }, [user]);

  // Handle Update
  const handleUpdate = async () => {
    try {
      await updateUser(editedUser).unwrap();
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile.");
    }
  };

  // Handle Account Deletion
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This action is irreversible!")) return;

    try {
      await deleteUser(user?.id).unwrap();
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
      navigate("/login");
      toast.success("Account deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete account.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (isError) {
    return <p className="text-red-500 text-center">Failed to load profile.</p>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center">My Account</h2>

      <div className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto">
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-1">User ID</label>
          <input
            type="text"
            value={editedUser.id}
            readOnly
            className="w-full px-3 py-2 border border-gray-300 bg-gray-200 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-1">Name</label>
          <input
            type="text"
            value={editedUser.name}
            onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-1">Email</label>
          <input
            type="email"
            value={editedUser.email}
            onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>

        <button
          onClick={handleUpdate}
          disabled={isUpdating}
          className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isUpdating ? "Updating..." : "Update Profile"}
        </button>

        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="w-full mt-4 bg-red-600 text-white py-2 rounded-md hover:bg-red-700 disabled:bg-gray-400"
        >
          {isDeleting ? "Deleting..." : "Delete Account"}
        </button>
      </div>
    </div>
  );
};

export default AccountPage;
