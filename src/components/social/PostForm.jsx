// src/components/social/PostForm.jsx
import React, { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import Button from "../common/Button";
import FormInput from "../common/FormInput";
import { addPost } from "../../utils/firestoreUtils";

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
      };
      await addPost(post);
      onNewPost(post);
      setContent("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
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
    </form>
  );
};

export default PostForm;
