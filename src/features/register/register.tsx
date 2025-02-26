



// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../../components/navbar";
// import Footer from "../../components/footer";
// import Spinner from "../../components/spinner";
// import { useRegisterUserMutation } from "./registerAPI";
// import { Eye, EyeOff, Lock, User, Mail, Phone } from "lucide-react"; // Added icons

// interface FormData {
//   full_name: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
//   phone_number: string;
// }

// const RegisterPage: React.FC = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState<FormData>({
//     full_name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     phone_number: "",
//   });

//   const [registerUser, { isLoading }] = useRegisterUserMutation();
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [formError, setFormError] = useState<string | null>(null);
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false);

//   const togglePasswordVisibility = () => setShowPassword(!showPassword);
//   const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       setFormError("Passwords do not match. Please try again.");
//       return;
//     }

//     setFormError(null);

//     try {
//       await registerUser({
//         full_name: formData.full_name,
//         email: formData.email,
//         password: formData.password,
//         phone_number: formData.phone_number,
//       }).unwrap();

//       setShowSuccessPopup(true);
//       setTimeout(() => {
//         setShowSuccessPopup(false);
//         navigate("/login");
//       }, 3000);
//     } catch (err: any) {
//       console.error("Registration error:", err);

//       if (err.status === 400 && err.data?.detail === "Email already registered") {
//         setFormError("This email is already registered. Try logging in instead.");
//       } else {
//         setFormError("Something went wrong. Please try again later.");
//       }
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
//         <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6 sm:p-8">
//           <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-8">
//             Create a Rental Account
//           </h2>

//           {formError && (
//             <p className="mt-4 text-center text-red-500 text-sm">{formError}</p>
//           )}

//           {showSuccessPopup && (
//             <div className="fixed top-4 right-4 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg animate-fade-in">
//               Registration successful! Redirecting to login...
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="mt-6 space-y-6">
//             {[
//               { label: "Full Name", type: "text", name: "full_name", icon: <User size={20} className="text-gray-500" /> },
//               { label: "Email", type: "email", name: "email", icon: <Mail size={20} className="text-gray-500" /> },
//               { label: "Phone Number", type: "text", name: "phone_number", icon: <Phone size={20} className="text-gray-500" /> },
//             ].map(({ label, type, name, icon }) => (
//               <div key={name}>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                   {label}
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     {icon}
//                   </div>
//                   <input
//                     type={type}
//                     name={name}
//                     value={formData[name as keyof FormData]}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 pl-10 border rounded-lg bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder={`Enter your ${label.toLowerCase()}`}
//                     required
//                   />
//                 </div>
//               </div>
//             ))}

//             {[
//               { label: "Password", name: "password", show: showPassword, toggle: togglePasswordVisibility, icon: <Lock size={20} className="text-gray-500" /> },
//               { label: "Confirm Password", name: "confirmPassword", show: showConfirmPassword, toggle: toggleConfirmPasswordVisibility, icon: <Lock size={20} className="text-gray-500" /> },
//             ].map(({ label, name, show, toggle, icon }) => (
//               <div key={name}>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                   {label}
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     {icon}
//                   </div>
//                   <input
//                     type={show ? "text" : "password"}
//                     name={name}
//                     value={formData[name as keyof FormData]}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 pl-10 border rounded-lg bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
//                     placeholder={`Enter your ${label.toLowerCase()}`}
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={toggle}
//                     className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
//                   >
//                     {show ? <EyeOff size={20} /> : <Eye size={20} />}
//                   </button>
//                 </div>
//               </div>
//             ))}

//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full px-4 py-3 text-white font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg transition duration-300 disabled:opacity-70 flex items-center justify-center"
//             >
//               {isLoading ? <Spinner /> : "Sign Up"}
//             </button>
//           </form>

//           <p className="mt-6 text-sm text-center text-gray-600 dark:text-gray-400">
//             Already have an account?{" "}
//             <a
//               href="/login"
//               className="text-blue-600 hover:text-blue-700 dark:text-purple-400 dark:hover:text-purple-300 underline"
//             >
//               Sign in
//             </a>
//           </p>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default RegisterPage;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import Spinner from "../../components/spinner";
import { useRegisterUserMutation } from "./registerAPI";
import { Eye, EyeOff, Lock, User, Mail, Phone } from "lucide-react";

interface FormData {
  full_name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone_number: string;
}

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone_number: "",
  });

  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setFormError("Passwords do not match. Please try again.");
      return;
    }

    setFormError(null);

    try {
      await registerUser({
        full_name: formData.full_name,
        email: formData.email,
        password: formData.password,
        phone_number: formData.phone_number,
      }).unwrap();

      setShowSuccessPopup(true);
      setTimeout(() => {
        setShowSuccessPopup(false);
        navigate("/login");
      }, 3000);
    } catch (err: any) {
      console.error("Registration error:", err);

      if (err.status === 400 && err.data?.detail === "Email already registered") {
        setFormError("This email is already registered. Try logging in instead.");
      } else {
        setFormError("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#1a2a6c] via-[#b21f1f] to-[#fdbb2d]">
        <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-6 sm:p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Create a Rental Account
          </h2>

          {formError && (
            <p className="mt-4 text-center text-red-500 text-sm">{formError}</p>
          )}

          {showSuccessPopup && (
            <div className="fixed top-4 right-4 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg animate-fade-in">
              Registration successful! Redirecting to login...
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            {[
              { label: "Full Name", type: "text", name: "full_name", icon: <User size={20} className="text-gray-500" /> },
              { label: "Email", type: "email", name: "email", icon: <Mail size={20} className="text-gray-500" /> },
              { label: "Phone Number", type: "text", name: "phone_number", icon: <Phone size={20} className="text-gray-500" /> },
            ].map(({ label, type, name, icon }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {label}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {icon}
                  </div>
                  <input
                    type={type}
                    name={name}
                    value={formData[name as keyof FormData]}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pl-10 border rounded-lg bg-gray-50 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={`Enter your ${label.toLowerCase()}`}
                    required
                  />
                </div>
              </div>
            ))}

            {[
              { label: "Password", name: "password", show: showPassword, toggle: togglePasswordVisibility, icon: <Lock size={20} className="text-gray-500" /> },
              { label: "Confirm Password", name: "confirmPassword", show: showConfirmPassword, toggle: toggleConfirmPasswordVisibility, icon: <Lock size={20} className="text-gray-500" /> },
            ].map(({ label, name, show, toggle, icon }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {label}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {icon}
                  </div>
                  <input
                    type={show ? "text" : "password"}
                    name={name}
                    value={formData[name as keyof FormData]}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pl-10 border rounded-lg bg-gray-50 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                    placeholder={`Enter your ${label.toLowerCase()}`}
                    required
                  />
                  <button
                    type="button"
                    onClick={toggle}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                  >
                    {show ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            ))}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-3 text-white font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg transition duration-300 disabled:opacity-70 flex items-center justify-center"
            >
              {isLoading ? <Spinner /> : "Sign Up"}
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-600 hover:text-blue-700 underline"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RegisterPage;
