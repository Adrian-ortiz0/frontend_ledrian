import React, { useState } from 'react';


const SuggestionCard = ({ profileImage, firstName, lastName, username, onFollow }) => {
    return (
      <div className="flex items-center justify-center gap-5 bg-transparent p-3 rounded-xl duration-300">
        {/* Imagen de perfil */}
        <img 
          src={profileImage} 
          alt={`${firstName} ${lastName}`} 
          width={40} 
          height={40} 
          className="rounded-full border-2 border-blue-500" 
        />
        
        {/* Información del usuario */}
        <div className="flex flex-col">
          <p className="text-white text-sm">{firstName} {lastName}</p>
          <label className="text-gray-400 text-sm">@{username}</label>
        </div>
        
        {/* Botón Follow */}
        <button 
          onClick={onFollow} 
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Follow
        </button>
      </div>
    );
  };

export const Suggestions = () => {

    const [following, setFollowing] = useState(false);

    const handleFollow = () => {
      setFollowing(!following);  // Cambia el estado de seguir/no seguir
      console.log(following ? 'Unfollowed' : 'Followed');
    };
  return (
    <div className='suggestions-container'>
 <SuggestionCard 
        profileImage="/public/profile_icon.png"
        firstName="Leonardo"
        lastName="Gonzales"
        username="Leonardog"
        onFollow={handleFollow}
      />
 <SuggestionCard 
        profileImage="/public/profile_icon.png"
        firstName="Leonardo"
        lastName="Gonzales"
        username="Leonardog"
        onFollow={handleFollow}
      />
 <SuggestionCard 
        profileImage="/public/profile_icon.png"
        firstName="Leonardo"
        lastName="Gonzales"
        username="Leonardog"
        onFollow={handleFollow}
      />
    </div>
  )
}
