// src/App.jsx
import { useContext, useEffect, Suspense, lazy, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import { UserContext } from "./contexts/UserContext";
import Loader from "./components/common/Loader";
import RequireProfileCompletion from "./components/middleware/RequireProfileCompletion";
import LoadingSpinner from "./components/common/LoadingSpinner";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Login = lazy(() => import("./pages/Login"));
const FinishSignUp = lazy(() => import("./pages/FinishSignUp"));
const SocialFeed = lazy(() => import("./pages/SocialFeed"));
const Profile = lazy(() => import("./pages/Profile"));
const CompleteProfile = lazy(() => import("./pages/CompleteProfile"));

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
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home theme={theme} />} />
          <Route
            path="/about"
            element={
              <RequireProfileCompletion>
                <About />
              </RequireProfileCompletion>
            }
          />
          <Route
            path="/contact"
            element={
              <RequireProfileCompletion>
                <Contact />
              </RequireProfileCompletion>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/finishSignUp" element={<FinishSignUp />} />
          <Route
            path="/social"
            element={
              <RequireProfileCompletion>
                <SocialFeed />
              </RequireProfileCompletion>
            }
          />
          <Route
            path="/profile"
            element={
              <RequireProfileCompletion>
                <Profile />
              </RequireProfileCompletion>
            }
          />
          <Route
            path="/complete-profile"
            element={user ? <CompleteProfile /> : <Navigate to="/login" />}
          />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
