import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  sendSignInLinkToEmail,
  signInWithPopup,
  signInAnonymously,
} from "firebase/auth";
import { auth, googleProvider, githubProvider } from "../utils/firebaseConfig";
import { UserContext } from "../contexts/UserContext";

const useAuth = () => {
  const { setUser } = useContext(UserContext);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const navigate = useNavigate();

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 3000);
  };

  const handleEmailSignIn = async (email) => {
    try {
      const actionCodeSettings = {
        url: "https://my-portfolio-2ll2.vercel.app/finishSignUp",
        handleCodeInApp: true,
      };
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", email);
      showNotification("Sign-in link sent to your email", "success");
    } catch (error) {
      showNotification(error.message, "error");
    }
  };

  const handleProviderSignIn = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      showNotification("Login successful", "success");
      setUser({ email: user.email });
      navigate("/");
    } catch (error) {
      showNotification(`Error during ${provider.providerId} Sign-In`, "error");
    }
  };

  const handleAnonymousSignIn = async () => {
    try {
      const result = await signInAnonymously(auth);
      const user = result.user;
      showNotification("Anonymous login successful", "success");
      setUser({ email: "anonymous", uid: user.uid });
      navigate("/");
    } catch (error) {
      showNotification("Error during Anonymous Sign-In", "error");
    }
  };

  return {
    notification,
    showNotification,
    handleEmailSignIn,
    handleProviderSignIn,
    handleAnonymousSignIn,
  };
};

export default useAuth;
