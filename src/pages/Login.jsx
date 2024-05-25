// src/pages/Login.jsx
import { useState } from "react";
import { FaGoogle, FaGithub, FaUserSecret } from "react-icons/fa";
import { motion } from "framer-motion";
import useAuth from "../hooks/useAuth";
import Notification from "../components/common/Notification";
import Button from "../components/common/Button";
import FormInput from "../components/common/FormInput";
import { googleProvider, githubProvider } from "../utils/firebaseConfig";

const Login = () => {
  const [email, setEmail] = useState("");
  const {
    notification,
    showNotification,
    handleEmailSignIn,
    handleProviderSignIn,
    handleAnonymousSignIn,
  } = useAuth();

  const handleChange = (e) => setEmail(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleEmailSignIn(email);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background-light dark:bg-background-dark">
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => showNotification("", "")}
      />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-secondary-light rounded-lg shadow-lg"
        role="main"
      >
        <h1 className="text-4xl font-bold text-center text-text-light dark:text-text-dark">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput
            label="Email"
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
          />
          <Button
            type="submit"
            className="w-full"
            ariaLabel="Send Sign-In Link"
          >
            Send Sign-In Link
          </Button>
          <div className="flex justify-around mt-4 space-x-4">
            <Button
              onClick={() => handleProviderSignIn(googleProvider)}
              className="bg-white text-text-light dark:bg-secondary-light dark:text-text-dark border border-gray-300 dark:border-secondary-dark"
              ariaLabel="Sign in with Google"
            >
              <FaGoogle className="text-black" style={{ fontSize: "24px" }} />
            </Button>
            <Button
              onClick={() => handleProviderSignIn(githubProvider)}
              className="bg-white text-text-light dark:bg-secondary-light dark:text-text-dark border border-gray-300 dark:border-secondary-dark"
              ariaLabel="Sign in with GitHub"
            >
              <FaGithub className="text-black" style={{ fontSize: "24px" }} />
            </Button>
            <Button
              onClick={handleAnonymousSignIn}
              className="bg-white text-text-light dark:bg-secondary-light dark:text-text-dark border border-gray-300 dark:border-secondary-dark"
              ariaLabel="Sign in anonymously"
            >
              <FaUserSecret
                className="text-gray-500"
                style={{ fontSize: "24px" }}
              />
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
