// src/pages/Profile.jsx
import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import ImageComponent from "../components/common/ImageComponent";
import Button from "../components/common/Button";
import FormInput from "../components/common/FormInput";
import Swal from "sweetalert2";
import defaultProfile from "../../public/assets/defaultProfile.svg";

const Profile = () => {
  const { user, updateUserProfile, handleImageChange } =
    useContext(UserContext);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [bio, setBio] = useState(user.bio || "");
  const [imagePreview, setImagePreview] = useState(
    user.photoURL || defaultProfile
  );

  const handleImagePreview = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleProfileUpdate = async () => {
    try {
      setLoading(true);
      if (image) {
        await handleImageChange(image);
      }
      await updateUserProfile({ name, bio, email });
      Swal.fire("Success!", "Profile updated successfully!", "success");
    } catch (error) {
      console.error("Error updating profile: ", error);
      Swal.fire("Error!", "Error updating profile. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailUpdate = async () => {
    try {
      setLoading(true);
      await updateUserProfile({ email });
      Swal.fire(
        "Success!",
        "Email updated in profile. (Note: This does not change your Authentication email)",
        "success"
      );
    } catch (error) {
      console.error("Error updating email: ", error);
      Swal.fire("Error!", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-8 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <div className="flex flex-col items-center">
        <ImageComponent
          src={imagePreview}
          alt="Profile Picture"
          width={150}
          height={150}
          className="w-32 h-32 mb-4"
        />
        <FormInput
          label="Name"
          name="name"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <FormInput
          label="Email"
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button onClick={handleEmailUpdate} disabled={loading} className="mt-2">
          {loading ? "Updating..." : "Update Email"}
        </Button>
        <FormInput
          label="Bio"
          name="bio"
          type="text"
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <div className="mt-4">
          <input
            type="file"
            id="file-input"
            className="hidden"
            onChange={handleImagePreview}
          />
          <label
            htmlFor="file-input"
            className="cursor-pointer bg-primary-light hover:bg-primary-dark text-white py-2 px-4 rounded-full font-semibold"
          >
            Choose Image
          </label>
        </div>
        <Button
          onClick={handleProfileUpdate}
          disabled={loading}
          className="mt-4"
        >
          {loading ? "Updating..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
};

export default Profile;
