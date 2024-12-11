import React, { useEffect, useState } from "react";
import Post from "../../../components/Post";
import { useAuth } from "../../../contexts/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

interface User {
  username: string;
  profilePicture: string;
  rank: string;
}

interface Posts {
  _id: string;
  userID: User;
  content: string;
  likesCount: number;
  createdAt: Date;
}

const Feed = () => {
  const [postContent, setPostContent] = useState("");
  const [posts, setPosts] = useState<Posts[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [likeBtnLoading, setLikeBtnLoading] = useState(false);

  const { user } = useAuth();

  const createPost = async () => {
    try {
      setIsLoading(true);
      if (!postContent) {
        toast.error("Please enter post content");
        setIsLoading(false);
        return;
      }

      const response = await axios.post(
        "/api/users/create-post",
        {
          postContent,
          userID: user?._id,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        toast.success("Post created successfully");
        setPostContent("");
        setIsLoading(false);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error creating post");
      setIsLoading(false);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get("/api/users/fetch-posts", {
        withCredentials: true,
      });

      if (response.status === 200) {
        setPosts(response.data.data);
      }
    } catch (error) {
      toast.error("Cannot retrieve posts at the moment");
    }
  };

  const likePost = async (post: Posts) => {
    try {
      setLikeBtnLoading(true);
      const response = await axios.post(
        "/api/users/like-post",
        {
          postsID: post._id,
          userID: user?._id,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        post.likesCount += 1;
        setLikeBtnLoading(false);
      }

      if (response.status === 200) {
        post.likesCount -= 1;
        setLikeBtnLoading(false);
      }
    } catch (error: any) {
      setLikeBtnLoading(false);
      toast.error(
        error.response?.data?.message || "Cannot like post at the moment"
      );
    }
  };

  const unLikePost = async (post: Posts) => {
    try {
      setLikeBtnLoading(true);
      const response = await axios.post(
        "/api/users/unlike-post",
        {
          postsID: post._id,
          userID: user?._id,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        post.likesCount -= 1;
        setLikeBtnLoading(false);
      }
    } catch (error) {
      setLikeBtnLoading(false);
      toast.error("Cannot unlike post at the moment");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [isLoading]);

  return (
    <div className="flex justify-center h-screen">
      <div className="bg-[#1b2937] text-slate-100 w-1/2 px-6 overflow-y-scroll no-scrollbar">
        <div className="py-6 text-3xl font-semibold text-center">Feed</div>
        <div>
          <textarea
            placeholder="What's on your mind?"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            className="w-full bg-[#0a1827] text-slate-100 outline-none border-none rounded-lg px-4 py-2"
          ></textarea>
          <div className="flex justify-end mt-2">
            <button
              onClick={createPost}
              disabled={isLoading}
              className="bg-[#0a1827] px-6 py-2 rounded-lg hover:opacity-80 disabled:opacity-80 disabled:cursor-not-allowed"
            >
              Post
            </button>
          </div>
        </div>
        <div className="mt-6 mb-20">
          {posts
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((post) => (
              <Post
                key={post._id}
                post={post.content}
                likesCount={post.likesCount}
                handleLike={() => likePost(post)}
                handleUnLike={() => unLikePost(post)}
                likeBtnLoading={likeBtnLoading}
                user={{
                  username: post.userID.username,
                  profileImage: post.userID.profilePicture,
                }}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Feed;
