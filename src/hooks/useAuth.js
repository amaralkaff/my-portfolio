// src/hooks/useAuth.js
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  sendSignInLinkToEmail,
  signInWithEmailLink,
  signInAnonymously,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
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
        url: `${window.location.origin}/finishSignUp`,
        handleCodeInApp: true,
      };
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", email);
      showNotification("Sign-in link sent to your email.", "success");
    } catch (error) {
      showNotification(error.message, "error");
    }
  };

  const finishSignIn = async (email, link) => {
    try {
      const result = await signInWithEmailLink(auth, email, link);
      window.localStorage.removeItem("emailForSignIn");
      setUser({ email: result.user.email });
      showNotification("Sign-in successful", "success");
      navigate("/");
    } catch (error) {
      showNotification(error.message, "error");
    }
  };

  const handleProviderSignIn = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser({ email: result.user.email });
      showNotification("Login successful", "success");
      navigate("/");
    } catch (error) {
      showNotification(error.message, "error");
    }
  };

  const handleAnonymousSignIn = async () => {
    try {
      const result = await signInAnonymously(auth);
      setUser({ uid: result.user.uid });
      showNotification("Anonymous login successful", "success");
      navigate("/");
    } catch (error) {
      showNotification(error.message, "error");
    }
  };

  return {
    notification,
    showNotification,
    handleEmailSignIn,
    finishSignIn,
    handleProviderSignIn,
    handleAnonymousSignIn,
  };
};

export default useAuth;
