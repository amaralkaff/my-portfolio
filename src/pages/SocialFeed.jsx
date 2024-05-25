// src/pages/SocialFeed.jsx
import React, { useState, useEffect } from "react";
import PostForm from "../components/social/PostForm";
import PostList from "../components/social/PostList";
import { getPosts } from "../utils/firestoreUtils";

const SocialFeed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPosts = await getPosts();
        setPosts(allPosts);
      } catch (error) {
        console.error("Error getting posts: ", error);
      }
    };
    fetchPosts();
  }, []);

  const handleNewPost = (post) => {
    setPosts([post, ...posts]);
  };

  return (
    <div className="social-feed-container flex flex-col items-center p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Social Feed</h1>
      <PostForm onNewPost={handleNewPost} />
      <PostList posts={posts} />
    </div>
  );
};

export default SocialFeed;
