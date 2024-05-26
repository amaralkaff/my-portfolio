// src/components/social/PostList.jsx
import React, { useState, useEffect } from "react";
import Post from "./Post";
import LoadingSpinner from "../common/LoadingSpinner";
import { motion, AnimatePresence } from "framer-motion";

const PostList = ({ posts, onDelete, onLike }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (posts) {
      setLoading(false);
    }
  }, [posts]);

  if (loading || !posts || posts.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <AnimatePresence>
        {posts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            <Post post={post} onDelete={onDelete} onLike={onLike} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default PostList;
