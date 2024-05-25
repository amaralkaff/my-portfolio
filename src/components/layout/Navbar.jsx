// src/components/layout/Navbar.jsx
import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { UserContext } from "../../contexts/UserContext";
import ThemeToggle from "../common/ThemeToggle";

const Navbar = () => {
  const { user, logout } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!user);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    setIsLoggedIn(!!user);
  }, [user]);

  useEffect(() => {
    const isMobile = () => window.innerWidth < 768;
    let timer;
    if (!isOpen && !isMobile()) {
      timer = setTimeout(() => setIsOpen(true), 500);
    }
    return () => clearTimeout(timer);
  }, [isOpen]);

  const menuVariants = {
    open: { x: 0, opacity: 1, transition: { duration: 0.5 } },
    closed: { x: "100%", opacity: 0, transition: { duration: 0.5 } },
  };

  const itemVariants = {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: 50, transition: { duration: 0.5 } },
  };

  const handleLogout = async () => {
    await logout();
    navigate("/"); // Navigate to home page after logout
    setIsOpen(false);
  };

  return (
    <nav
      className="flex justify-between items-center h-16 bg-white dark:bg-gray-800 text-black dark:text-white relative shadow-sm font-mono"
      role="navigation"
      aria-label="Main navigation"
    >
      <Link to="/" className="pl-8" aria-label="Home">
        my-portfolio
      </Link>
      <div
        className="px-4 cursor-pointer md:hidden"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
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
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute right-0 top-16 md:static md:flex items-center w-full md:w-auto bg-white dark:bg-gray-800 z-10"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <AnimatePresence>
              {user && (
                <>
                  <motion.div
                    key="about"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={itemVariants}
                  >
                    <Link
                      className="p-4 block md:inline-block"
                      to="/about"
                      onClick={toggleMenu}
                      aria-label="About"
                    >
                      About
                    </Link>
                  </motion.div>
                  <motion.div
                    key="contact"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={itemVariants}
                  >
                    <Link
                      className="p-4 block md:inline-block"
                      to="/contact"
                      onClick={toggleMenu}
                      aria-label="Contact"
                    >
                      Contact
                    </Link>
                  </motion.div>
                  <motion.div
                    key="social"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={itemVariants}
                  >
                    <Link
                      className="p-4 block md:inline-block"
                      to="/social"
                      onClick={toggleMenu}
                      aria-label="Social Feed"
                    >
                      Social Feed
                    </Link>
                  </motion.div>
                  <motion.div
                    key="profile"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={itemVariants}
                  >
                    <Link
                      className="p-4 block md:inline-block"
                      to="/profile"
                      onClick={toggleMenu}
                      aria-label="Profile"
                    >
                      Profile
                    </Link>
                  </motion.div>
                </>
              )}
              {isLoggedIn ? (
                <motion.button
                  key="logout"
                  onClick={handleLogout}
                  className="p-4 block md:inline-block"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={itemVariants}
                  aria-label="Logout"
                >
                  Logout
                </motion.button>
              ) : (
                <motion.div
                  key="login"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={itemVariants}
                >
                  <Link
                    className="p-4 block md:inline-block"
                    to="/login"
                    onClick={toggleMenu}
                    aria-label="Login"
                  >
                    Login
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
            <ThemeToggle />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
