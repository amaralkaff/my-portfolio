// src/pages/UserProfile.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { UserContext } from "../contexts/UserContext";
import ImageComponent from "../components/common/ImageComponent";
import defaultProfile from "../../public/assets/defaultProfile.svg";

const UserProfile = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);
  const db = getFirestore();

  useEffect(() => {
    if (!user) {
      setError("You must be logged in to view this profile.");
      return;
    }

    const fetchUser = async () => {
      try {
        const userDoc = await getDoc(doc(db, "users", userId));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        } else {
          setError("User not found");
        }
      } catch (err) {
        setError("Error fetching user data: " + err.message);
      }
    };

    fetchUser();
  }, [userId, db, user]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-8 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <div className="flex flex-col items-center">
        <ImageComponent
          src={userData.photoURL || defaultProfile}
          alt="Profile Picture"
          width={150}
          height={150}
          className="w-32 h-32 mb-4"
        />
        <p className="text-lg mt-4">
          <strong>Name:</strong> {userData.name}
        </p>
        <p className="text-lg">
          <strong>Email:</strong> {userData.email}
        </p>
        <p className="text-lg">
          <strong>Bio:</strong> {userData.bio || "No bio available."}
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
