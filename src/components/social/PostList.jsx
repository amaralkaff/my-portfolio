// src/components/social/PostList.jsx
import React, { useState, useEffect } from "react";
import Post from "./Post";
import LoadingSpinner from "../common/LoadingSpinner";

const PostList = ({ posts }) => {
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
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
