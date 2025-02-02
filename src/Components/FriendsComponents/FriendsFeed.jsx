import { FriendsCard } from "./FriendsCard"; 

export const FriendsFeed = ({ usuario }) => {
  const followingIds = usuario.followingIds || [];

  return (
    <div className="friends_feed">
      <div className="flex flex-col w-screen lg:flex-col lg:w-[60vw] lg:p-10 lg:left-[15vw] lg:fixed">
        {followingIds.length === 0 ? (
          <p className="text-white text-center">No estás siguiendo a nadie.</p>
        ) : (
          followingIds.map((followingId) => (
            <FriendsCard key={followingId} usuario={{ id: followingId }} />
          ))
        )}
      </div>
    </div>
  );
};