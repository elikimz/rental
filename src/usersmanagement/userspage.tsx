

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
//   profile_image?: string;
// }

// const AccountPage: React.FC = () => {
//   const token = localStorage.getItem("token");
//   const decodedToken: any = token ? jwtDecode(token) : null;
//   const userId = decodedToken?.id;

//   const { data: user, isLoading, error } = useGetUserByIdQuery(userId, { skip: !userId });
//   const [updateUser] = useUpdateUserMutation();
//   const [deleteUser] = useDeleteUserMutation();

//   const [formData, setFormData] = useState<User>({
//     id: userId,
//     full_name: "",
//     email: "",
//     role: "",
//     profile_image: "",
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

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setFormData((prev) => ({ ...prev, profile_image: reader.result as string }));
//       };
//       reader.readAsDataURL(file);
//     }
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
//         window.location.href = "/login";
//       } catch {
//         alert("Failed to delete account");
//       }
//     }
//   };

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error loading account details</div>;

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
//       <h2 className="text-3xl font-bold mb-6 text-center">Account Management</h2>
//       <form className="space-y-6">
//         {formData.profile_image && (
//           <img
//             src={formData.profile_image}
//             alt="Profile"
//             className="w-32 h-32 mx-auto rounded-full border"
//           />
//         )}
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleImageChange}
//           className="w-full p-2 border border-gray-300 rounded"
//         />
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
  profile_image?: string;
}

const AccountPage: React.FC = () => {
  const token = localStorage.getItem("token");
  const decodedToken: any = token ? jwtDecode(token) : null;
  const userId = decodedToken?.id;

  console.log("Decoded Token:", decodedToken);
  console.log("User ID:", userId);

  const { data: user, isLoading, error } = useGetUserByIdQuery(userId, { skip: !userId });
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const [formData, setFormData] = useState<User>({
    id: 0,
    full_name: "",
    email: "",
    role: "",
    profile_image: "",
  });

  useEffect(() => {
    if (user && userId) {
      setFormData({ ...user, id: userId });
    }
  }, [user, userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profile_image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async () => {
    try {
      if (!userId) {
        alert("User ID is missing. Please log in again.");
        return;
      }
      console.log("Updating user with ID:", userId);
      await updateUser({ ...formData, id: userId }).unwrap();
      alert("Account updated successfully!");
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update account");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action is irreversible.")) {
      try {
        console.log("Deleting user with ID:", userId);
        await deleteUser(userId).unwrap();
        localStorage.removeItem("token");
        alert("Account deleted successfully!");
        window.location.href = "/login";
      } catch {
        alert("Failed to delete account. Check permissions.");
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading account details</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6">Tenant Account Management</h2>
      <form className="space-y-6">
        <div className="flex flex-col items-center">
          {formData.profile_image && (
            <img
              src={formData.profile_image}
              alt="Profile"
              className="w-32 h-32 rounded-full mb-4"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded"
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
          className="w-full p-3 border border-gray-300 rounded bg-gray-100"
          readOnly
        />

        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleUpdate}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Update Account
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
          >
            Delete Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountPage;