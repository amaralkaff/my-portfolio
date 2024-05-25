// src/components/common/Button.jsx
import { motion } from "framer-motion";

const Button = ({
  children,
  onClick,
  type = "button",
  className = "",
  ariaLabel,
}) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    type={type}
    onClick={onClick}
    aria-label={ariaLabel}
    className={`py-2 px-6 md:py-3 md:px-8 text-sm font-semibold rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 ease-in-out transform shadow-button bg-primary-light hover:bg-primary-dark text-white dark:bg-primary-dark dark:hover:bg-primary-dark ${className}`}
  >
    {children}
  </motion.button>
);

export default Button;
