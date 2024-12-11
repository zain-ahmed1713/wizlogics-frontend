import React, { useState } from "react";
import { Heart } from "lucide-react";

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
  return (
    <div className="flex p-4 border-b w-full mb-6">
      <img
        src={
          user?.profileImage ||
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        }
        alt={`${user?.username}'s profile`}
        className="w-12 h-12 rounded-full mr-4 object-cover"
      />
      <div className="flex-grow">
        <div className="font-bold">{user?.username}</div>
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
