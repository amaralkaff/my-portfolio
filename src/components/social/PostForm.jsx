// src/components/social/PostForm.jsx
import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import Button from "../common/Button";
import FormInput from "../common/FormInput";
import { addPost, uploadImage } from "../../utils/firestoreUtils";
import { motion } from "framer-motion";
import defaultProfile from "../../../public/assets/defaultProfile.svg";
import Swal from "sweetalert2";
import * as nsfwjs from "nsfwjs";
import * as tf from "@tensorflow/tfjs";

const PostForm = ({ onNewPost }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const { user } = useContext(UserContext);
  const [model, setModel] = useState(null);

  useEffect(() => {
    const loadModel = async () => {
      try {
        const loadedModel = await nsfwjs.load("/nsfwjs/model.min.js"); // Ensure the correct path
        setModel(loadedModel);
      } catch (error) {
        console.error("Error loading NSFW model:", error);
      }
    };

    loadModel();
  }, []);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content.trim()) {
      let imageUrl = null;

      if (image) {
        const isNSFW = await checkImageNSFW(image);
        if (isNSFW) {
          Swal.fire("Error!", "The uploaded image is inappropriate.", "error");
          return;
        }

        imageUrl = await uploadImage(image);
      }

      const post = {
        content,
        createdAt: new Date().toISOString(),
        userId: user.uid,
        author: user.name || "Anonymous",
        authorPhotoURL: user.photoURL || defaultProfile,
        imageUrl: imageUrl,
        likes: [],
      };

      const newPost = await addPost(post);
      onNewPost(newPost);
      setContent("");
      setImage(null);
    }
  };

  const checkImageNSFW = async (imageFile) => {
    const imageElement = document.createElement("img");
    imageElement.src = URL.createObjectURL(imageFile);

    return new Promise((resolve) => {
      imageElement.onload = async () => {
        if (!model) {
          console.error("NSFW model not loaded");
          resolve(false);
          return;
        }
        const predictions = await model.classify(imageElement);
        const nsfwPrediction = predictions.find(
          (prediction) =>
            prediction.className === "Porn" || prediction.className === "Hentai"
        );
        resolve(nsfwPrediction && nsfwPrediction.probability > 0.7);
      };
    });
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md"
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
        className="mb-4"
      />
      <input
        type="file"
        onChange={handleImageChange}
        className="mb-4 w-full text-gray-900 dark:text-gray-100"
      />
      <Button
        type="submit"
        onClick={handleSubmit}
        className="w-full"
        ariaLabel="Submit Post"
      >
        Post
      </Button>
    </motion.form>
  );
};

export default PostForm;
