import React, { useState } from "react";

export const FriendsCard = ({ usuario }) => {
  const [followers, setFollowers] = useState(usuario.followersIds);
  const [followingStatus, setFollowingStatus] = useState({}); // Estado para seguir/no seguir


  const placeholderFollowers = [
    { username: "user1", name: "User One" },
    { username: "user2", name: "User Two" },
    { username: "user3", name: "User Three" },
  ];

  const handleFollow = (username) => {
    setFollowingStatus((prev) => ({
      ...prev,
      [username]: !prev[username], 
    }));
  };

  return (
    <div className="bg-[#262626] rounded-lg shadow-lg p-4 w-full max-w-md mx-auto">
      <h2 className="text-white text-lg font-semibold mb-4 text-center">
        Followers
      </h2>
      {followers.length === 0 ? (
        <div className="space-y-4">
          {placeholderFollowers.map((follower) => (
            <div
              className="bg-[#333333] rounded-lg p-6 flex flex-col items-center justify-center space-y-4"
              key={follower.username}
            >
              <img
                src="/public/profile_icon.png"
                alt={follower.username}
                className="w-24 h-24 rounded-full object-cover"
              />
              <div className="text-center">
                <p className="text-white font-medium">{follower.name}</p>
                <p className="text-gray-400 text-sm">@{follower.username}</p>
              </div>
              <button
                onClick={() => handleFollow(follower.username)}
                className={`w-full max-w-[200px] text-sm px-4 py-2 rounded-lg transition-colors ${
                  followingStatus[follower.username]
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-[#555555] hover:bg-[#666666]"
                } text-white`}
              >
                {followingStatus[follower.username] ? "Unfollow" : "Follow"}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {followers.map((follower) => (
            <div
              className="bg-[#333333] rounded-lg p-6 flex flex-col items-center justify-center space-y-4"
              key={follower.username}
            >
              <img
                src="/public/profile_icon.png"
                alt={follower.username}
                className="w-24 h-24 rounded-full object-cover"
              />
              <div className="text-center">
                <p className="text-white font-medium">{follower.name}</p>
                <p className="text-gray-400 text-sm">@{follower.username}</p>
              </div>
              <button
                onClick={() => handleFollow(follower.username)}
                className={`w-full max-w-[200px] text-sm px-4 py-2 rounded-lg transition-colors ${
                  followingStatus[follower.username]
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-[#555555] hover:bg-[#666666]"
                } text-white`}
              >
                {followingStatus[follower.username] ? "Unfollow" : "Follow"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};