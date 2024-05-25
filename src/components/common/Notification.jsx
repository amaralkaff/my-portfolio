// src/components/common/Notification.jsx
import { motion, AnimatePresence } from "framer-motion";

const Notification = ({ message, type, onClose }) => {
  const notificationVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.5 } },
  };

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 p-4 rounded-lg shadow-lg text-white ${
            type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
          variants={notificationVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          role="alert"
        >
          {message}
          <button
            onClick={onClose}
            className="ml-4 text-lg font-bold"
            aria-label="Close notification"
          >
            &times;
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification;
