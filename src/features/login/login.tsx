


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import Spinner from "../../components/spinner";
import { useLoginUserMutation } from "./loginAPI";
import { Eye, EyeOff } from "react-feather"; // For show/hide password icons

interface FormData {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const [formError, setFormError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const loginData = new URLSearchParams();
    loginData.append("username", formData.email);
    loginData.append("password", formData.password);

    try {
      const response = await loginUser(loginData).unwrap();
      console.log("Login successful:", response);

      const token = response.access_token;
      localStorage.setItem("token", token);

      // Decode token to get role
      const decodedToken: any = jwtDecode(token);
      const userRole = decodedToken.role;
      console.log("Decoded role:", userRole);

      // Navigate based on role
      if (userRole === "Tenant") {
        navigate("/tenant-dashboard");
      } else if (userRole === "Admin") {
        navigate("/admin-dashboard");
      } else {
        setFormError("Login successful, but there was an issue. Please contact support.");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      if (err.status === 401) {
        setFormError("Invalid credentials. Please try again.");
      } else {
        setFormError("Login failed. Please try again later.");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6 sm:p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-8">
            Welcome Back
          </h2>

          {formError && (
            <p className="mt-4 text-center text-red-500 text-sm">{formError}</p>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-3 text-white font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg transition duration-300 disabled:opacity-70 flex items-center justify-center"
            >
              {isLoading ? <Spinner /> : "Log In"}
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-gray-600 dark:text-gray-400">
            Don’t have an account?{" "}
            <a
              href="/register"
              className="text-blue-600 hover:text-blue-700 dark:text-purple-400 dark:hover:text-purple-300 underline"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;