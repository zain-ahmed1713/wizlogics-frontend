import axios from "axios";
import { Trophy } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

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

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState<User[]>([]);

  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get("/api/users/fetch-leaderboard", {
        withCredentials: true,
      });

      if (response.status === 200) {
        setLeaderboardData(response.data?.data);
      }
    } catch (error) {
      toast.error("Cannot fetch leaderboard at the moment");
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <div className="h-screen text-white overflow-auto">
      <div className="py-6 text-3xl font-semibold text-center">Leaderboard</div>
      <div className="bg-[#1b2937] shadow-lg rounded-2xl p-6 w-full max-w-md mx-auto mb-12">
        <div className="space-y-4">
          {leaderboardData.map((user, index) => (
            <div key={user._id} className="flex items-center rounded-lg p-3">
              <div className="mr-4 text-center w-10">
                <span className="font-bold text-xl text-white">
                  {index + 1}
                </span>
              </div>
              <img
                src={
                  user.profilePicture ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
                alt={`${user.username}'s profile`}
                className="w-12 h-12 rounded-full mr-4 object-cover"
              />
              <div className="flex-grow">
                <p className="font-semibold text-white">{user.username}</p>
              </div>
              <div className="flex items-center">
                <span className="font-bold text-white mr-2">
                  {user.points || 0}
                </span>
                {index > 0 && <div className="flex flex-col"></div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
