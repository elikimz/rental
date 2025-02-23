import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import Spinner from "../../components/spinner";
import { useRegisterUserMutation } from "./registerAPI";
import { Eye, EyeOff } from "lucide-react";

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
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200">
            Create a Rental Account
          </h2>

          {formError && (
            <p className="mt-4 text-center text-red-500 text-sm">{formError}</p>
          )}

          {showSuccessPopup && (
            <div className="fixed top-4 right-4 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg">
              Registration successful! Redirecting to login...
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {[ 
              { label: "Full Name", type: "text", name: "full_name" },
              { label: "Email", type: "email", name: "email" },
              { label: "Phone Number", type: "text", name: "phone_number" },
            ].map(({ label, type, name }) => (
              <div key={name}>
                <label className="block text-sm text-gray-700 dark:text-gray-300">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={formData[name as keyof FormData]}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            ))}

            {[ 
              { label: "Password", name: "password", show: showPassword, toggle: togglePasswordVisibility },
              { label: "Confirm Password", name: "confirmPassword", show: showConfirmPassword, toggle: toggleConfirmPasswordVisibility },
            ].map(({ label, name, show, toggle }) => (
              <div key={name}>
                <label className="block text-sm text-gray-700 dark:text-gray-300">{label}</label>
                <div className="relative">
                  <input
                    type={show ? "text" : "password"}
                    name={name}
                    value={formData[name as keyof FormData]}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={toggle}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                  >
                    {show ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            ))}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-2 text-white font-semibold bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-300 disabled:bg-blue-400 flex items-center justify-center"
            >
              {isLoading ? <Spinner /> : "Sign Up"}
            </button>
          </form>

          <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <a href="/login" className="text-blue-600 hover:underline">
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

// Let me know if this works how you want it! 🚀
