import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Edit } from "lucide-react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../../contexts/AuthContext";

interface User {
  _id: string;
  name: string;
  email: string;
  username?: string;
  role: string;
  profilePicture?: string;
  followingCount: number;
  followersCount: number;
  rank: string;
  points: number;
}

const Profile = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState<User>();
  const [alreadyFollowed, setAlreadyFollowed] = useState(false);
  const [profileImage, setProfileImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const params = useParams();

  const followUser = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "/api/users/follow-user",
        {
          userID: user?._id,
          followedUserID: userData?._id,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        toast.success("User followed successfully");
        setUserData((prevUser) =>
          prevUser
            ? { ...prevUser, followersCount: prevUser?.followersCount + 1 }
            : prevUser
        );

        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      toast.error(
        error.response?.data.message || "Cannot follow user at the moment"
      );
    }
  };

  const unFollowUser = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "/api/users/unfollow-user",
        {
          userID: user?._id,
          followedUserID: userData?._id,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        toast.success("User unfollowed successfully");
        setAlreadyFollowed;
        setUserData((prevUser) =>
          prevUser
            ? { ...prevUser, followersCount: prevUser?.followersCount - 1 }
            : prevUser
        );

        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      toast.error(
        error.response?.data.message || "Cannot unfollow user at the moment"
      );
    }
  };

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validTypes: string[] = ["image/jpeg", "image/png", "image/gif"];

    if (!validTypes.includes(file.type)) {
      alert("Please upload a valid image (JPEG, PNG, or GIF)");
      return;
    }

    const formData = new FormData();
    formData.append("profilePicture", file);

    try {
      const response = await axios.patch(
        "/api/users/profile/upload-photo",
        formData,
        {
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        toast.success("Profile photo updated successfully");
        setUserData((prevUser) =>
          prevUser
            ? { ...prevUser, profilePicture: response.data?.data?.url }
            : undefined
        );
      }
    } catch (error) {
      toast.error("Cannot update image at the moment");
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const fetchUserInfo = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `/api/users/profile/${params?.username}`
      );

      if (response.status === 200) {
        setUserData(response.data.data);
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error("Cannot fetch user profile at the moment");
    }
  };

  const checkFollowedStatus = async () => {
    try {
      const response = await axios.post(
        "/api/users/followed-status",
        {
          userID: user?._id,
          followedUserID: userData?._id,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        if (response.data?.message === "User already following.") {
          setAlreadyFollowed(true);
        } else {
          setAlreadyFollowed(false);
        }
      }
    } catch (error) {
      console.log("Error fetching followed status", error);
    }
  };

  useEffect(() => {
    if (!user) {
      return;
    }

    checkFollowedStatus();
  }, [userData]);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <div className="h-screen text-white">
      <div className="py-6 text-3xl font-semibold text-center">Profile</div>
      <div className="flex justify-center items-center w-1/2 mx-auto">
        <div className="bg-[#1b2937] shadow-lg rounded-2xl p-6 text-center w-full">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/jpeg,image/png,image/gif"
            className="hidden"
          />
          <div className="relative inline-block mb-4">
            <img
              src={
                userData?.profilePicture ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
              alt="User Profile"
              className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-gray-200"
            />
            <button
              onClick={triggerFileInput}
              className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full text-white"
            >
              <Edit size={16} />
            </button>
          </div>
          <h2 className="text-2xl font-bold mb-2">
            @{userData?.username || ""}
          </h2>
          <div className="flex justify-center space-x-4 mb-4">
            <div>
              <p className="text-sm">Followers</p>
              <p className="font-bold text-lg">
                {userData?.followersCount || 0}
              </p>
            </div>
            <div>
              <p className="text-sm">Following</p>
              <p className="font-bold text-lg">
                {userData?.followingCount || 0}
              </p>
            </div>
            <div>
              <p className="text-sm">Score</p>
              <p className="font-bold text-lg">{userData?.points || 0}</p>
            </div>
          </div>
          <div className="bg-gray-100 rounded-lg p-2 mb-4">
            <p className="text-sm text-gray-700">
              Rank:{" "}
              <span className="font-bold text-blue-600">
                {userData?.rank || ""}
              </span>
            </p>
          </div>
          {user && (
            <button
              disabled={isLoading}
              onClick={alreadyFollowed ? unFollowUser : followUser}
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-80 disabled:cursor-not-allowed"
            >
              {alreadyFollowed ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
