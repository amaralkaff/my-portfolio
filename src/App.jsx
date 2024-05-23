import { useContext, useEffect, Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import { UserContext } from "./contexts/UserContext";
import Loader from "./components/common/Loader";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Login = lazy(() => import("./pages/Login"));
const FinishSignUp = lazy(() => import("./pages/FinishSignUp"));

const App = () => {
  const { user, theme } = useContext(UserContext);

  useEffect(() => {
    document.body.className = theme === "light" ? "light-mode" : "dark-mode";
  }, [theme]);

  return (
    <Router>
      <Navbar />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home theme={theme} />} />
          <Route
            path="/about"
            element={user ? <About /> : <Navigate to="/login" />}
          />
          <Route
            path="/contact"
            element={user ? <Contact /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/finishSignUp" element={<FinishSignUp />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
