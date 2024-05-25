// src/components/common/LoadingSpinner.jsx
import React from "react";
import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <motion.div
      className="flex justify-center items-center h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="loader"></div>
    </motion.div>
  );
};

export default LoadingSpinner;
