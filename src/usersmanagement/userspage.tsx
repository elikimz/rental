


// // import { useGetUserByIdQuery, useUpdateUserMutation, useDeleteUserMutation } from '../features/users/usersAPI';
// // import React, { useState, useEffect } from "react";
// // import { jwtDecode } from "jwt-decode";

// // const AccountPage: React.FC = () => {
// //   const token = localStorage.getItem("token");
// //   const decodedToken: any = token ? jwtDecode(token) : null;
// //   const userId = decodedToken?.id;

// //   const { data: user, isLoading, error } = useGetUserByIdQuery(userId, { skip: !userId });
// //   const [updateUser] = useUpdateUserMutation();
// //   const [deleteUser] = useDeleteUserMutation();

// //   const [formData, setFormData] = useState({
// //     id: 0,
// //     full_name: "",
// //     email: "",
// //     role: "",
// //     profile_image: "",
// //   });

// //   useEffect(() => {
// //     if (user && userId) {
// //       setFormData({ ...user, id: userId });
// //     }
// //   }, [user, userId]);

// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const { name, value } = e.target;
// //     setFormData({ ...formData, [name]: value });
// //   };

// //   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = e.target.files?.[0];
// //     if (file) {
// //       const reader = new FileReader();
// //       reader.onloadend = () => {
// //         setFormData({ ...formData, profile_image: reader.result as string });
// //       };
// //       reader.readAsDataURL(file);
// //     }
// //   };

// //   const handleUpdate = async () => {
// //     if (!userId) {
// //       alert("User ID is missing. Please log in again.");
// //       return;
// //     }

// //     try {
// //       await updateUser({ id: userId, userData: formData }).unwrap();
// //       alert("Account updated successfully!");
// //     } catch (error) {
// //       console.error("Update error:", error);
// //       alert("Failed to update account");
// //     }
// //   };

// //   const handleDelete = async () => {
// //     if (!userId) {
// //       alert("User ID is missing. Please log in again.");
// //       return;
// //     }

// //     if (window.confirm("Are you sure you want to delete your account? This action is irreversible.")) {
// //       try {
// //         await deleteUser(userId).unwrap();
// //         localStorage.removeItem("token");
// //         alert("Account deleted successfully!");
// //         window.location.href = "/login";
// //       } catch (error) {
// //         console.error("Delete error:", error);
// //         alert("Failed to delete account");
// //       }
// //     }
// //   };

// //   if (isLoading) return <div>Loading...</div>;
// //   if (error) return <div>Error loading account details</div>;

// //   return (
// //     <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
// //       <h2 className="text-3xl font-bold mb-6">Tenant Account Management</h2>
// //       <form className="space-y-6">
// //         {formData.profile_image && (
// //           <img src={formData.profile_image} alt="Profile" className="w-32 h-32 rounded-full mb-4" />
// //         )}
// //         <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-2 border" />
// //         <input
// //           type="text"
// //           name="full_name"
// //           value={formData.full_name}
// //           onChange={handleChange}
// //           placeholder="Full Name"
// //           className="w-full p-3 border"
// //         />
// //         <input
// //           type="email"
// //           name="email"
// //           value={formData.email}
// //           className="w-full p-3 border bg-gray-100"
// //           disabled
// //         />
// //         <input
// //           type="text"
// //           name="role"
// //           value={formData.role}
// //           className="w-full p-3 border bg-gray-100"
// //           readOnly
// //         />
// //         <div className="flex justify-between">
// //           <button
// //             type="button"
// //             onClick={handleUpdate}
// //             className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
// //           >
// //             Update Account
// //           </button>
// //           <button
// //             type="button"
// //             onClick={handleDelete}
// //             className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
// //           >
// //             Delete Account
// //           </button>
// //         </div>
// //       </form>
// //     </div>
// //   );
// // };

// // export default AccountPage;

// import { useGetUserByIdQuery, useUpdateUserMutation } from '../features/users/usersAPI';
// import React, { useState, useEffect } from "react";
// import { jwtDecode } from "jwt-decode";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const AccountPage: React.FC = () => {
//   const token = localStorage.getItem("token");
//   const decodedToken: any = token ? jwtDecode(token) : null;
//   const userId = decodedToken?.id;

//   const { data: user, isLoading, error } = useGetUserByIdQuery(userId, { skip: !userId });
//   const [updateUser] = useUpdateUserMutation();

//   const [formData, setFormData] = useState({
//     id: 0,
//     full_name: "",
//     email: "",
//     role: "",
//     profile_image: "",
//   });

//   useEffect(() => {
//     if (user && userId) {
//       setFormData({ ...user, id: userId });
//     }
//   }, [user, userId]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleUpdate = async () => {
//     if (!userId) {
//       toast.error("User ID is missing. Please log in again.");
//       return;
//     }

//     try {
//       await updateUser({ id: userId, userData: formData }).unwrap();
//       toast.success("Account updated successfully!");
//     } catch (error) {
//       console.error("Update error:", error);
//       toast.error("Failed to update account");
//     }
//   };

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error loading account details</div>;

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
//       <ToastContainer />
//       <h2 className="text-3xl font-bold mb-6">Tenant Account Management</h2>
//       <form className="space-y-6">
//         {formData.profile_image && (
//           <img src={formData.profile_image} alt="Profile" className="w-32 h-32 rounded-full mb-4" />
//         )}
//         <input
//           type="text"
//           name="full_name"
//           value={formData.full_name}
//           onChange={handleChange}
//           placeholder="Full Name"
//           className="w-full p-3 border"
//         />
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           placeholder="Email"
//           className="w-full p-3 border"
//         />
//         <input
//           type="text"
//           name="role"
//           value={formData.role}
//           className="w-full p-3 border bg-gray-100"
//           readOnly
//         />
//         <div className="flex justify-between">
//           <button
//             type="button"
//             onClick={handleUpdate}
//             className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
//           >
//             Update Account
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AccountPage;


import { useGetUserByIdQuery, useUpdateUserMutation } from '../features/users/usersAPI';
import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUser, FaEnvelope, FaKey, FaSave } from 'react-icons/fa'; // Import icons

const AccountPage: React.FC = () => {
  const token = localStorage.getItem("token");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const decodedToken: any = token ? jwtDecode(token) : null;
  const userId = decodedToken?.id;

  const { data: user, isLoading, error } = useGetUserByIdQuery(userId, { skip: !userId });
  const [updateUser] = useUpdateUserMutation();

  const [formData, setFormData] = useState({
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

  const handleUpdate = async () => {
    if (!userId) {
      toast.error("User ID is missing. Please log in again.");
      return;
    }

    try {
      await updateUser({ id: userId, userData: formData }).unwrap();
      toast.success("Account updated successfully!");
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update account");
    }
  };

  if (isLoading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error loading account details</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-lg">
        <ToastContainer />
        <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
          <FaUser className="mr-2" /> Tenant Account Management
        </h2>
        <form className="space-y-6">
          {formData.profile_image && (
            <div className="flex justify-center">
              <img
                src={formData.profile_image}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-blue-100 shadow-lg"
              />
            </div>
          )}
          <div className="space-y-4">
            <div className="flex items-center border border-gray-200 rounded-lg p-3">
              <FaUser className="text-gray-400 mr-3" />
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full outline-none"
              />
            </div>
            <div className="flex items-center border border-gray-200 rounded-lg p-3">
              <FaEnvelope className="text-gray-400 mr-3" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full outline-none"
              />
            </div>
            <div className="flex items-center border border-gray-200 rounded-lg p-3 bg-gray-50">
              <FaKey className="text-gray-400 mr-3" />
              <input
                type="text"
                name="role"
                value={formData.role}
                className="w-full outline-none bg-transparent"
                readOnly
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleUpdate}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300 flex items-center"
            >
              <FaSave className="mr-2" /> Update Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountPage;