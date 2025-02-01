import { FriendsCard } from "./FriendsCard"; 

export const FriendsFeed = ({ usuario }) => {
  const followingIds = usuario.followingIds || [];

  return (
    <div className="friends_feed">
      <div className="flex flex-col w-[60vw] p-10 left-[15vw] fixed">
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