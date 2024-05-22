// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext, useEffect } from "react";
import UserProviderWithNavigate from "./components/UserProviderWithNavigate";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Register from "./components/Register";
import Login from "./components/Login";
import { UserContext } from "./contexts/UserContext";

function App() {
  const { theme } = useContext(UserContext);

  useEffect(() => {
    document.body.className = theme === "light" ? "light-mode" : "dark-mode";
  }, [theme]);

  return (
    <Router>
      <UserProviderWithNavigate>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home theme={theme} />} />{" "}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </UserProviderWithNavigate>
    </Router>
  );
}

export default App;
