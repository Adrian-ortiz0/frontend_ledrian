import { FollowersCard } from "./FollowersCard";

export const FollowersFeed = ({ usuario }) => {
  const followersIds = usuario?.followersIds || [];

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <h2 className="text-white text-xl font-bold mb-6">Tus seguidores</h2>
      
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