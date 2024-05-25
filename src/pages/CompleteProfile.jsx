// src/pages/CompleteProfile.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import Button from "../components/common/Button";
import FormInput from "../components/common/FormInput";

const CompleteProfile = () => {
  const [name, setName] = useState("");
  const { user, updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim()) {
      const updatedUser = {
        uid: user.uid,
        email: user.email,
        name: name.trim(),
      };
      await updateUser(updatedUser);
      navigate("/");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background-light dark:bg-background-dark">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-secondary-light rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-text-light dark:text-text-dark">
          Complete Profile
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput
            label="Name"
            name="name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button type="submit" className="w-full" ariaLabel="Save">
            Save
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfile;
