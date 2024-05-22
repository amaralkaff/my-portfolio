// components/Navbar.jsx
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { UserContext } from "../contexts/UserContext";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";

const Navbar = () => {
  const { user, logout, theme, toggleTheme } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const isMobile = () => window.innerWidth < 768;
    let timer;
    if (!isOpen && !isMobile()) {
      timer = setTimeout(() => setIsOpen(true), 500);
    }
    return () => clearTimeout(timer);
  }, [isOpen]);

  const variants = {
    open: { x: 0, opacity: 1 },
    closed: { x: "100%", opacity: 0 },
  };

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
  };

  return (
    <nav
      className="flex justify-between items-center h-16 bg-white dark:bg-gray-800 text-black dark:text-white relative shadow-sm font-mono"
      role="navigation"
    >
      <Link to="/" className="pl-8">
        my-portfolio
      </Link>
      <div className="px-4 cursor-pointer md:hidden" onClick={toggleMenu}>
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          ></path>
        </svg>
      </div>
      <motion.div
        className="absolute right-0 top-16 md:static md:flex items-center w-full md:w-auto bg-white dark:bg-gray-800 z-10"
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={variants}
        transition={{ duration: 0.5 }}
      >
        {user ? (
          <>
            <Link
              className="p-4 block md:inline-block"
              to="/"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              className="p-4 block md:inline-block"
              to="/about"
              onClick={toggleMenu}
            >
              About
            </Link>
            <Link
              className="p-4 block md:inline-block"
              to="/contact"
              onClick={toggleMenu}
            >
              Contact
            </Link>
            <button
              onClick={handleLogout}
              className="p-4 block md:inline-block"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              className="p-4 block md:inline-block"
              to="/register"
              onClick={toggleMenu}
            >
              Register
            </Link>
            <Link
              className="p-4 block md:inline-block"
              to="/login"
              onClick={toggleMenu}
            >
              Login
            </Link>
          </>
        )}
        <button onClick={toggleTheme} className="p-4">
          {theme === "light" ? <MdOutlineDarkMode /> : <MdOutlineLightMode />}
        </button>
      </motion.div>
    </nav>
  );
};

export default Navbar;
