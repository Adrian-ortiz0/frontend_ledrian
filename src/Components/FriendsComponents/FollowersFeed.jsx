import { FollowersCard } from "./FollowersCard";

export const FollowersFeed = ({ usuario }) => {
  const followersIds = usuario?.followersIds || [];

  return (
    <div className="flex justify-center w-full lg:flex-col lg:w-[60vw] lg:p-10 lg:left-[15vw] lg:fixed">
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
