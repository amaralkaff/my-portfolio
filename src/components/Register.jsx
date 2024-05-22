// components/Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Register = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isFormVisible, setIsFormVisible] = useState(true);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3000/register`, userData);
      Swal.fire({
        title: "Success!",
        text: "Registration successful",
        icon: "success",
        confirmButtonText: "OK",
      });
      setIsFormVisible(false);
      navigate("/login");
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.errorMessage || "Email already registered",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded shadow-lg">
        <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white">
          Register
        </h1>
        {isFormVisible && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                className="text-sm font-bold text-gray-700 dark:text-gray-300"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="w-full p-2 mt-1 text-gray-700 bg-gray-200 dark:bg-gray-700 border rounded focus:outline-none focus:bg-white dark:focus:bg-gray-600 focus:border-blue-500"
                name="username"
                type="text"
                placeholder="Username"
                onChange={handleChange}
                value={userData.username}
                required
              />
            </div>
            <div>
              <label
                className="text-sm font-bold text-gray-700 dark:text-gray-300"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="w-full p-2 mt-1 text-gray-700 bg-gray-200 dark:bg-gray-700 border rounded focus:outline-none focus:bg-white dark:focus:bg-gray-600 focus:border-blue-500"
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
                value={userData.email}
                required
              />
            </div>
            <div>
              <label
                className="text-sm font-bold text-gray-700 dark:text-gray-300"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="w-full p-2 mt-1 text-gray-700 bg-gray-200 dark:bg-gray-700 border rounded focus:outline-none focus:bg-white dark:focus:bg-gray-600 focus:border-blue-500"
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                value={userData.password}
                required
              />
            </div>
            <button
              className="w-full p-3 text-sm font-bold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
              type="submit"
            >
              Register
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;
