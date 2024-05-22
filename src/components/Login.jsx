// components/Login.jsx
import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider, githubProvider } from "../firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { FaGoogle, FaGithub } from "react-icons/fa";
import Swal from "sweetalert2";

const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [isFormVisible, setIsFormVisible] = useState(true);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const mockResponse = { access_token: "mock_access_token" };
      Swal.fire({
        title: "Success!",
        text: "Login successful",
        icon: "success",
        confirmButtonText: "OK",
      });
      localStorage.setItem("access_token", mockResponse.access_token);
      setUser({
        email: loginData.email,
        access_token: mockResponse.access_token,
      });
      setIsFormVisible(false);
      navigate("/");
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Invalid email or password",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // const idToken = await result.user.getIdToken();

      const mockResponse = { access_token: "mock_google_access_token" };
      Swal.fire({
        title: "Success!",
        text: "Login successful",
        icon: "success",
        confirmButtonText: "OK",
      });
      localStorage.setItem("access_token", mockResponse.access_token);
      setUser({
        email: result.user.email,
        access_token: mockResponse.access_token,
      });
      setIsFormVisible(false);
      navigate("/");
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
      Swal.fire({
        title: "Error!",
        text: "Error during Google Sign-In",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleGithubSignIn = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithPopup(auth, githubProvider);
      // const idToken = await result.user.getIdToken();

      const mockResponse = { access_token: "mock_github_access_token" };
      Swal.fire({
        title: "Success!",
        text: "Login successful",
        icon: "success",
        confirmButtonText: "OK",
      });
      localStorage.setItem("access_token", mockResponse.access_token);
      setUser({
        email: result.user.email,
        access_token: mockResponse.access_token,
      });
      setIsFormVisible(false);
      navigate("/");
    } catch (error) {
      console.error("Error during GitHub Sign-In:", error);
      Swal.fire({
        title: "Error!",
        text: "Error during GitHub Sign-In",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded shadow-lg">
        <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white">
          Login
        </h1>
        {isFormVisible && (
          <form onSubmit={handleSubmit} className="space-y-6">
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
                value={loginData.email}
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
                value={loginData.password}
                required
              />
            </div>
            <button
              className="w-full p-3 text-sm font-bold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
              type="submit"
            >
              Login
            </button>
            <button
              className="w-full p-3 text-sm font-bold bg-white dark:bg-gray-700 rounded hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 flex justify-center items-center border border-gray-300 dark:border-gray-600"
              onClick={handleGoogleSignIn}
              type="button"
            >
              <FaGoogle
                className="mr-2 text-blue-500"
                style={{ fontSize: "20px" }}
              />
              Sign in with Google
            </button>
            <button
              className="w-full p-3 text-sm font-bold bg-white dark:bg-gray-700 rounded hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 flex justify-center items-center border border-gray-300 dark:border-gray-600"
              onClick={handleGithubSignIn}
              type="button"
            >
              <FaGithub
                className="mr-2 text-blue-500"
                style={{ fontSize: "20px" }}
              />
              Sign in with GitHub
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
