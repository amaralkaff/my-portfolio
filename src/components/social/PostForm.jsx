// src/components/social/PostFoem.jsx
import React, { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import Button from "../common/Button";
import FormInput from "../common/FormInput";
import { addPost } from "../../utils/firestoreUtils";
import { motion } from "framer-motion";
import defaultProfile from "../../../public/assets/defaultProfile.svg";

const PostForm = ({ onNewPost }) => {
  const [content, setContent] = useState("");
  const { user } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content.trim()) {
      const post = {
        content,
        createdAt: new Date().toISOString(),
        userId: user.uid,
        author: user.name || "Anonymous",
        authorPhotoURL: user.photoURL || defaultProfile,
      };
      const newPost = await addPost(post);
      onNewPost(newPost);
      setContent("");
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="mb-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <FormInput
        label="New Post"
        name="content"
        type="text"
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button type="submit" className="mt-2" ariaLabel="Submit Post">
        Post
      </Button>
    </motion.form>
  );
};

export default PostForm;
