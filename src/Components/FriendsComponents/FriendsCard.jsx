import React, { useState } from "react";

export const FriendsCard = ({ usuario }) => {
  const [followers, setFollowers] = useState(usuario.followers);

  return (
    <div>
      {followers.length === 0 ? (
        <p className="text-white" >No friends</p>
      ) : (
        followers.map((follower) => (
          <div className="friends_card" key={follower.username}>
            <img src="/public/profile_icon.png" alt="" width={30} height={30} />
            <div>
              <p>{follower.name}</p>
              <label htmlFor="username">@{follower.username}</label>
            </div>
            <button>Unfollow</button>
          </div>
        ))
      )}
    </div>
  );
};