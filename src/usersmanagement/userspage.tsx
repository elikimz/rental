// import React, { useState, useEffect } from "react";
// import { jwtDecode } from "jwt-decode";
// import {
//   useGetUserByIdQuery,
//   useUpdateUserMutation,
//   useDeleteUserMutation,
// } from "../features/users/usersAPI";

// interface User {
//   id: number;
//   full_name: string;
//   email: string;
//   role: string;
// }

// const AccountPage: React.FC = () => {
//   const token = localStorage.getItem("token");
//   // Decode the token and get user ID
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const decodedToken: any = token ? jwtDecode(token) : null;
//   const userId = decodedToken?.id;

//   const { data: user, isLoading, error } = useGetUserByIdQuery(userId, { skip: !userId });
//   const [updateUser] = useUpdateUserMutation();
//   const [deleteUser] = useDeleteUserMutation();

//   const [formData, setFormData] = useState<User>({
//     id: 0,
//     full_name: "",
//     email: "",
//     role: "",
//   });

//   useEffect(() => {
//     if (user) {
//       setFormData(user);
//     }
//   }, [user]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleUpdate = async () => {
//     try {
//       await updateUser(formData).unwrap();
//       alert("Account updated successfully!");
//     } catch {
//       alert("Failed to update account");
//     }
//   };

//   const handleDelete = async () => {
//     if (window.confirm("Are you sure you want to delete your account? This action is irreversible.")) {
//       try {
//         await deleteUser(userId).unwrap();
//         localStorage.removeItem("token");
//         alert("Account deleted successfully!");
//         window.location.href = "/login"; // Redirect to login page
//       } catch {
//         alert("Failed to delete account");
//       }
//     }
//   };

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error loading account details</div>;

//   return (
//     <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-md">
//       <h2 className="text-2xl font-bold mb-4">Tenant Account Management</h2>
//       <form className="space-y-4">
//         <input
//           type="text"
//           name="full_name"
//           value={formData.full_name}
//           onChange={handleChange}
//           placeholder="Full Name"
//           className="w-full p-2 border border-gray-300 rounded"
//         />
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           placeholder="Email"
//           className="w-full p-2 border border-gray-300 rounded"
//           disabled
//         />
//         <input
//           type="text"
//           name="role"
//           value={formData.role}
//           readOnly
//           className="w-full p-2 border border-gray-300 rounded bg-gray-100"
//         />
//         <div className="flex justify-between">
//           <button
//             type="button"
//             onClick={handleUpdate}
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//           >
//             Update Account
//           </button>
//           <button
//             type="button"
//             onClick={handleDelete}
//             className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//           >
//             Delete Account
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AccountPage;

import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "../features/users/usersAPI";

interface User {
  id: number;
  full_name: string;
  email: string;
  role: string;
  profile_picture?: string;
}

const AccountPage: React.FC = () => {
  const token = localStorage.getItem("token");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const decodedToken: any = token ? jwtDecode(token) : null;
  const userId = decodedToken?.id;

  const { data: user, isLoading, error } = useGetUserByIdQuery(userId, { skip: !userId });
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const [formData, setFormData] = useState<User>({
    id: 0,
    full_name: "",
    email: "",
    role: "",
    profile_picture: "",
  });

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      await updateUser(formData).unwrap();
      alert("Account updated successfully!");
    } catch {
      alert("Failed to update account");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action is irreversible.")) {
      try {
        await deleteUser({ id: userId }).unwrap();
        localStorage.removeItem("token");
        alert("Account deleted successfully!");
        window.location.href = "/login";
      } catch {
        alert("Failed to delete account");
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading account details</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6">Tenant Account Management</h2>
      <form className="space-y-6">
        <div className="flex items-center space-x-4">
          <img
            src={formData.profile_picture || "/default-avatar.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full border"
          />
          <input
            type="text"
            name="profile_picture"
            value={formData.profile_picture}
            onChange={handleChange}
            placeholder="Profile Picture URL"
            className="flex-1 p-2 border border-gray-300 rounded"
          />
        </div>
        <input
          type="text"
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full p-3 border border-gray-300 rounded"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Email"
          className="w-full p-3 border border-gray-300 rounded bg-gray-100"
          disabled
        />
        <input
          type="text"
          name="role"
          value={formData.role}
          readOnly
          className="w-full p-3 border border-gray-300 rounded bg-gray-100"
        />
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleUpdate}
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
          >
            Update Account
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700"
          >
            Delete Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountPage;
