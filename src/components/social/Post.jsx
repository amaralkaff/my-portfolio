// src/components/social/Post.jsx
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageComponent from "../common/ImageComponent";
import defaultProfile from "../../../public/assets/defaultProfile.svg";
import { deletePost, likePost } from "../../utils/firestoreUtils";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { UserContext } from "../../contexts/UserContext";
import { AiFillDelete, AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const Post = ({ post, onDelete, onLike }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const likesArray = Array.isArray(post.likes) ? post.likes : [];
  const [liked, setLiked] = useState(likesArray.includes(user.uid));

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
        onDelete(post.id);
      } catch (error) {
        Swal.fire("Error!", "There was an error deleting the post.", "error");
      }
    }
  };

  const handleLike = async () => {
    await likePost(post.id, user.uid);
    setLiked(!liked);
    onLike(post.id);
  };

  return (
    <motion.div
      className="post mb-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex items-center mb-4">
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
        <div className="flex-grow">
          <div
            className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer"
            onClick={handleProfileClick}
          >
            {post.author}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-500">
            {new Date(post.createdAt).toLocaleString()}
          </div>
        </div>
        {user.uid === post.userId && (
          <AiFillDelete
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 cursor-pointer"
            size={24}
          />
        )}
      </div>
      <div className="post-content flex-grow">
        <div className="mt-2 text-lg text-gray-900 dark:text-gray-100">
          {post.content}
        </div>
        {post.imageUrl && (
          <div className="mt-4">
            <img
              src={post.imageUrl}
              alt="Post content"
              className="rounded-lg"
            />
          </div>
        )}
      </div>
      <div className="flex items-center mt-4">
        {liked ? (
          <AiFillHeart
            className="text-red-500"
            size={24}
            onClick={handleLike}
          />
        ) : (
          <AiOutlineHeart
            className="text-gray-500 hover:text-red-500 cursor-pointer"
            size={24}
            onClick={handleLike}
          />
        )}
        <span className="ml-2 text-gray-600 dark:text-gray-400">
          {likesArray.length} {likesArray.length === 1 ? "like" : "likes"}
        </span>
      </div>
    </motion.div>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    author: PropTypes.string,
    authorPhotoURL: PropTypes.string,
    imageUrl: PropTypes.string,
    likes: PropTypes.arrayOf(PropTypes.string).isRequired, // Ensure likes is an array of strings
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onLike: PropTypes.func.isRequired,
};

export default Post;
