import React, { useState } from 'react';
import { FollowersCard } from '../FriendsComponents/FollowersCard';
import { useUser } from '../../UserContext';


const SuggestionCard = ({ profileImage, firstName, lastName, username }) => {
    const [isFollowing, setIsFollowing] = useState(false);

    const handleFollow = () => {
      setIsFollowing(!isFollowing); 
    };
  
    return (
      <div className="flex items-center justify-between gap-1 p-2">
        <img 
          src={profileImage} 
          alt={`${firstName} ${lastName}`} 
          width={40} 
          height={40} 
          className="rounded-full border-2 border-blue-500" 
        />
        <div className="flex flex-col">
          <p className="text-white text-sm">{firstName} {lastName}</p>
          <label className="text-gray-400 text-sm">@{username}</label>
        </div>
        <button 
          onClick={handleFollow} 
          className={`
            w-24 px-4 py-2 rounded-full text-sm font-semibold transition duration-300 
            ${isFollowing ? 
              'bg-red-600 text-white hover:bg-red-700 border-none' : 
              'bg-blue-500 text-white hover:bg-blue-600 border border-blue-500'}
            focus:outline-none hover:scale-105`}
        >
          {isFollowing ? 'Unfollow' : 'Follow'}
        </button>
      </div>
    );
  };
  

  export const Suggestions = () => {
    const { usuario } = useUser();
    const followersIds = usuario?.followersIds || [];
  
    return (
      <div className="space-y-4">
        {followersIds.length > 0 ? (
          followersIds.map((followerId) => (
            <FollowersCard key={followerId} followerId={followerId} />
          ))
        ) : (
          <div className="text-white p-10 text-center">No hay followers para mostrar.</div>
        )}
      </div>
    );
  };
