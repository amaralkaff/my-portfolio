// src/components/social/Post.jsx
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ImageComponent from "../common/ImageComponent";
import defaultProfile from "../../../public/assets/defaultProfile.svg";
import { deletePost } from "../../utils/firestoreUtils";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { UserContext } from "../../contexts/UserContext";

const Post = ({ post, onDelete }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const handleProfileClick = () => {
    navigate(`/profile/${post.userId}`);
  };

  const handleDelete = async () => {
    if (user.uid !== post.userId) {
      Swal.fire("Error!", "You cannot delete someone else's post.", "error");
      return;
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        await deletePost(post.id);
        Swal.fire("Deleted!", "Your post has been deleted.", "success");
        onDelete(post.id); // Update the UI in real-time
      } catch (error) {
        Swal.fire("Error!", "There was an error deleting the post.", "error");
      }
    }
  };

  return (
    <motion.div
      className="post mb-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        className="post-author flex-shrink-0 mr-4 cursor-pointer"
        onClick={handleProfileClick}
      >
        <ImageComponent
          src={post.authorPhotoURL || defaultProfile}
          alt="Author's profile picture"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full"
        />
      </div>
      <div className="post-content flex-grow">
        <div
          className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer"
          onClick={handleProfileClick}
        >
          {post.author}
        </div>
        <div className="mt-2 text-lg text-gray-900 dark:text-gray-100">
          {post.content}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-500 mt-2">
          {new Date(post.createdAt).toLocaleString()}
        </div>
        {user.uid === post.userId && (
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 mt-2"
          >
            Delete Post
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default Post;
