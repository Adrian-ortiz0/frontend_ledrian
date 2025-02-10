import { useState } from "react";
import { FollowersCard } from "./FollowersCard";

export const FollowersFeed = ({ usuario }) => {
  const followersIds = usuario?.followersIds || [];

  return (
    <div className="flex justify-start w-full lg:flex-col lg:p-10">
      {followersIds.length === 0 ? (
        <p className="text-gray-400 text-center">Aún no tienes seguidores</p>
      ) : (
        <div className="space-y-4">
          {followersIds.map((followerId) => (
            <FollowersCard key={followerId} followerId={followerId} />
          ))}
        </div>
      )}
    </div>
  );
};
