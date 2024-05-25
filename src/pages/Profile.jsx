// src/pages/Profile.jsx
import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import ImageComponent from "../components/common/ImageComponent";

const Profile = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="profile-container bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-8 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <ImageComponent
        src="/path/to/profile-picture.jpg"
        alt="Profile Picture"
        width={150}
        height={150}
      />
      <p className="text-lg mt-4">
        <strong>Name:</strong> {user.name || user.email}
      </p>
      <p className="text-lg">
        <strong>Email:</strong> {user.email}
      </p>
      <p className="text-lg">
        <strong>Bio:</strong> {user.bio || "No bio available."}
      </p>
    </div>
  );
};

export default Profile;
