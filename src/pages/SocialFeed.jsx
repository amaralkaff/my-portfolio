// src/pages/SocialFeed.jsx
import React, { useState, useEffect } from "react";
import Post from "./../components/social/Post";
import PostForm from "./../components/social/PostForm";
import { getPosts, subscribeToPosts } from "../utils/firestoreUtils";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { AnimatePresence, motion } from "framer-motion";

const SocialFeed = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToPosts((newPosts) => {
      setPosts(newPosts);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleNewPost = (post) => {
    setPosts([post, ...posts]);
  };

  const handleDeletePost = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="social-feed">
      <h2 className="text-2xl font-bold mb-4">Social Feed</h2>
      <PostForm onNewPost={handleNewPost} />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <AnimatePresence>
          {posts.map((post) => (
            <Post key={post.id} post={post} onDelete={handleDeletePost} />
          ))}
        </AnimatePresence>
      )}
    </div>
  );
};

export default SocialFeed;
