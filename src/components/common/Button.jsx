// src/components/common/Button.jsx
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const Button = ({
  children,
  onClick,
  type = "button",
  className = "",
  ariaLabel,
  disabled = false,
}) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    type={type}
    onClick={onClick}
    aria-label={ariaLabel}
    disabled={disabled}
    className={`py-2 px-6 md:py-3 md:px-8 text-sm font-semibold rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 ease-in-out transform shadow-button bg-primary-light hover:bg-primary-dark text-white dark:bg-primary-dark dark:hover:bg-primary-dark ${className} ${
      disabled ? "opacity-50 cursor-not-allowed" : ""
    }`}
  >
    {children}
  </motion.button>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired, // Ensure onClick is required
  type: PropTypes.string,
  className: PropTypes.string,
  ariaLabel: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export default Button;
