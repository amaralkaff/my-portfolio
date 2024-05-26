// src/App.jsx
import React, { useContext, useEffect, Suspense, lazy, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import { UserContext } from "./contexts/UserContext";
import RequireProfileCompletion from "./components/middleware/RequireProfileCompletion";
import LoadingSpinner from "./components/common/LoadingSpinner";
import PrivateRoute from "./components/middleware/PrivateRoute";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Login = lazy(() => import("./pages/Login"));
const FinishSignUp = lazy(() => import("./pages/FinishSignUp"));
const SocialFeed = lazy(() => import("./pages/SocialFeed"));
const Profile = lazy(() => import("./pages/Profile"));
const CompleteProfile = lazy(() => import("./pages/CompleteProfile"));
const UserProfile = lazy(() => import("./pages/UserProfile"));

const App = () => {
  const { user, theme } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.body.className = theme === "light" ? "light-mode" : "dark-mode";
  }, [theme]);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    handleStart();
    handleComplete();

    return () => {
      handleComplete();
    };
  }, [location]);

  return (
    <>
      <Navbar />
      {loading && <LoadingSpinner />}
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home theme={theme} />} />
          <Route
            path="/about"
            element={
              <PrivateRoute>
                <RequireProfileCompletion>
                  <About />
                </RequireProfileCompletion>
              </PrivateRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <PrivateRoute>
                <RequireProfileCompletion>
                  <Contact />
                </RequireProfileCompletion>
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/finishSignUp" element={<FinishSignUp />} />
          <Route
            path="/social"
            element={
              <PrivateRoute>
                <RequireProfileCompletion>
                  <SocialFeed />
                </RequireProfileCompletion>
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <RequireProfileCompletion>
                  <Profile />
                </RequireProfileCompletion>
              </PrivateRoute>
            }
          />
          <Route
            path="/complete-profile"
            element={user ? <CompleteProfile /> : <Navigate to="/login" />}
          />
          <Route path="/profile/:userId" element={<UserProfile />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
