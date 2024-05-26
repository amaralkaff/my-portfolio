// src/components/common/LoadingSpinner.jsx
import { motion } from "framer-motion";

const spinnerVariants = {
  animate: {
    rotate: 360,
    transition: {
      repeat: Infinity,
      duration: 1,
      ease: "linear",
    },
  },
};

const LoadingSpinner = () => {
  return (
    <motion.div
      className="flex justify-center items-center h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="border-t-4 border-b-4 border-blue-500 rounded-full w-16 h-16"
        variants={spinnerVariants}
        animate="animate"
      />
    </motion.div>
  );
};

export default LoadingSpinner;
