// src/components/social/Post.jsx
const Post = ({ post }) => {
  return (
    <div className="post mb-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="post-author text-sm text-gray-600 dark:text-gray-400">
        {post.author}
      </div>
      <div className="post-content mt-2 text-lg text-gray-900 dark:text-gray-100">
        {post.content}
      </div>
      <div className="post-date text-xs text-gray-500 dark:text-gray-500 mt-2">
        {new Date(post.createdAt).toLocaleString()}
      </div>
    </div>
  );
};

export default Post;
