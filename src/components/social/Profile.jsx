// src/components/social/Profile.jsx
import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import ImageComponent from "../common/ImageComponent";
import { motion } from "framer-motion";
import defaultProfile from "../../../public/assets/defaultProfile.svg";

const Profile = () => {
  const { user } = useContext(UserContext);

  return (
    <motion.div
      className="profile-container bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-8 shadow-lg rounded-lg max-w-lg mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-3xl font-bold mb-6">Profile</h2>
      <div className="flex flex-col items-center">
        <ImageComponent
          src={user.photoURL || defaultProfile}
          alt="Profile Picture"
          width={150}
          height={150}
          className="w-36 h-36 rounded-full mb-4 object-cover"
        />
        <p className="text-xl mt-4">
          <strong>Name:</strong> {user.name || user.email}
        </p>
        <p className="text-xl">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="text-xl">
          <strong>Bio:</strong> {user.bio || "No bio available."}
        </p>
      </div>
    </motion.div>
  );
};

export default Profile;
