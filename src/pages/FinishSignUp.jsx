// src/pages/FinishSignUp.jsx
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";
import Swal from "sweetalert2";
import { UserContext } from "../contexts/UserContext";

const FinishSignUp = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const finishSignIn = async () => {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        let email = window.localStorage.getItem("emailForSignIn");
        if (!email) {
          email = window.prompt("Please provide your email for confirmation");
        }
        try {
          const result = await signInWithEmailLink(
            auth,
            email,
            window.location.href
          );
          window.localStorage.removeItem("emailForSignIn");
          Swal.fire("Success!", "Sign-in successful", "success");
          setUser({ email: result.user.email });
          navigate("/");
        } catch (error) {
          Swal.fire("Error!", error.message, "error");
        }
      }
    };

    finishSignIn();
  }, [auth, navigate, setUser]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded shadow-lg">
        <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white">
          Finishing Sign-In
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400">
          Please wait...
        </p>
      </div>
    </div>
  );
};

export default FinishSignUp;
