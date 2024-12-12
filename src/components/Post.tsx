import React, { useState } from "react";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Post = ({
  post,
  user,
  likesCount,
  handleLike,
  handleUnLike,
  likeBtnLoading,
}: {
  post: string;
  user: any;
  likesCount: number;
  handleLike: any;
  handleUnLike: any;
  likeBtnLoading: boolean;
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex p-4 border-b w-full mb-6">
      <img
        onClick={() => navigate(`/profile/${user?.username}`)}
        src={
          user?.profileImage ||
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        }
        alt={`${user?.username}'s profile`}
        className="w-12 h-12 rounded-full mr-4 object-cover hover:cursor-pointer"
      />
      <div className="flex-grow">
        <div
          onClick={() => navigate(`/profile/${user?.username}`)}
          className="font-bold hover:cursor-pointer"
        >
          {user?.username}
        </div>
        <div className="mt-2">{post}</div>
        <button
          disabled={likeBtnLoading}
          onClick={handleLike}
          className="flex items-center mt-2 text-gray-600 hover:text-red-500 disabled:cursor-not-allowed"
        >
          <Heart
            color={likesCount > 0 ? "red" : "currentColor"}
            fill={likesCount > 0 ? "red" : "none"}
            className="mr-2"
          />
          <span>{likesCount}</span>
        </button>
      </div>
    </div>
  );
};

export default Post;
