

// import { useGetUserByIdQuery, useUpdateUserMutation } from '../features/users/usersAPI';
// import React, { useState, useEffect } from "react";
// import { jwtDecode } from "jwt-decode";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { FaUser, FaEnvelope, FaKey, FaSave } from 'react-icons/fa'; // Import icons

// const AccountPage: React.FC = () => {
//   const token = localStorage.getItem("token");
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

//   if (isLoading) return <div className="text-center py-8 text-purple-600">Loading...</div>;
//   if (error) return <div className="text-center py-8 text-red-500">Error loading account details</div>;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 to-teal-50 py-8">
//       <div className="max-w-4xl mx-auto p-8 bg-white shadow-2xl rounded-2xl">
//         <ToastContainer />
//         <h2 className="text-4xl font-bold text-purple-800 mb-8 flex items-center">
//           <FaUser className="mr-3 text-teal-500" /> Tenant Account Management
//         </h2>
//         <form className="space-y-8">
//           {formData.profile_image && (
//             <div className="flex justify-center">
//               <img
//                 src={formData.profile_image}
//                 alt="Profile"
//                 className="w-36 h-36 rounded-full border-4 border-teal-100 shadow-lg"
//               />
//             </div>
//           )}
//           <div className="space-y-6">
//             <div className="flex items-center border-2 border-purple-200 rounded-xl p-4 bg-purple-50">
//               <FaUser className="text-purple-500 mr-3" />
//               <input
//                 type="text"
//                 name="full_name"
//                 value={formData.full_name}
//                 onChange={handleChange}
//                 placeholder="Full Name"
//                 className="w-full outline-none bg-transparent placeholder-purple-400 text-purple-800"
//               />
//             </div>
//             <div className="flex items-center border-2 border-purple-200 rounded-xl p-4 bg-purple-50">
//               <FaEnvelope className="text-purple-500 mr-3" />
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Email"
//                 className="w-full outline-none bg-transparent placeholder-purple-400 text-purple-800"
//               />
//             </div>
//             <div className="flex items-center border-2 border-purple-200 rounded-xl p-4 bg-purple-50">
//               <FaKey className="text-purple-500 mr-3" />
//               <input
//                 type="text"
//                 name="role"
//                 value={formData.role}
//                 className="w-full outline-none bg-transparent text-purple-800"
//                 readOnly
//               />
//             </div>
//           </div>
//           <div className="flex justify-end">
//             <button
//               type="button"
//               onClick={handleUpdate}
//               className="bg-gradient-to-r from-purple-600 to-teal-500 text-white px-8 py-3 rounded-xl hover:from-purple-700 hover:to-teal-600 transition-all duration-300 flex items-center shadow-lg hover:shadow-xl"
//             >
//               <FaSave className="mr-2" /> Update Account
//             </button>
//           </div>
//         </form>
//       </div>
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

  if (isLoading) return <div className="text-center py-8 text-blue-600 font-sans">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500 font-sans">Error loading account details</div>;

  return (
    <div className="min-h-screen bg-gray-50 font-sans py-12">
      <div className="max-w-4xl mx-auto p-8 bg-white shadow-sm rounded-lg border border-gray-100">
        <ToastContainer />
        <h2 className="text-4xl font-bold text-gray-900 mb-8 flex items-center">
          <FaUser className="mr-3 text-blue-600" /> Tenant Account Management
        </h2>
        <form className="space-y-8">
          {formData.profile_image && (
            <div className="flex justify-center">
              <img
                src={formData.profile_image}
                alt="Profile"
                className="w-40 h-40 rounded-full border-4 border-blue-100 shadow-md"
              />
            </div>
          )}
          <div className="space-y-6">
            <div className="flex items-center border border-gray-200 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
              <FaUser className="text-gray-500 mr-3" />
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full outline-none bg-transparent placeholder-gray-400 text-gray-900"
              />
            </div>
            <div className="flex items-center border border-gray-200 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
              <FaEnvelope className="text-gray-500 mr-3" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full outline-none bg-transparent placeholder-gray-400 text-gray-900"
              />
            </div>
            <div className="flex items-center border border-gray-200 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
              <FaKey className="text-gray-500 mr-3" />
              <input
                type="text"
                name="role"
                value={formData.role}
                className="w-full outline-none bg-transparent text-gray-900"
                readOnly
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleUpdate}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center shadow-md hover:shadow-lg"
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