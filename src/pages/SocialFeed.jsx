// src/pages/SocialFeed.jsx
import React, { useState, useEffect, useContext } from "react";
import Post from "./../components/social/Post";
import PostForm from "./../components/social/PostForm";
import { subscribeToPosts } from "../utils/firestoreUtils";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { AnimatePresence, motion } from "framer-motion";
import { UserContext } from "../contexts/UserContext";

const SocialFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const unsubscribe = subscribeToPosts((newPosts) => {
      setPosts(newPosts);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleNewPost = (newPost) => {
    setPosts((prevPosts) => {
      const existingPost = prevPosts.find((post) => post.id === newPost.id);
      if (existingPost) {
        return prevPosts; // If the post already exists, return the current state
      }
      return [newPost, ...prevPosts]; // Add new post to the beginning of the array
    });
  };

  const handleDeletePost = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  const handleLikePost = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, likes: [...post.likes, user.uid] }
          : post
      )
    );
  };

  return (
    <div className="social-feed max-w-2xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Social Feed</h2>
      <PostForm onNewPost={handleNewPost} />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <AnimatePresence>
          {posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Post
                post={post}
                onDelete={handleDeletePost}
                onLike={handleLikePost}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </div>
  );
};

export default SocialFeed;
