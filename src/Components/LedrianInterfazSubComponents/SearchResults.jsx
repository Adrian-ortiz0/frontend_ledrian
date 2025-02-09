import React from 'react';

export const SearchResults = ({ results, onSelectUser }) => {
  return (
    <div className="absolute top-full mt-2 w-full max-w-[90vw] sm:max-w-[400px] bg-white rounded-lg shadow-xl z-50 border border-gray-100">
      {results.map((user) => {
        const profileImagePath = user.photo?.startsWith("http")
          ? user.photo
          : `http://localhost:8083/api/publications/images/${user.photo}`;

        return (
          <div
            key={user.id}
            className="p-3 hover:bg-gray-50 cursor-pointer active:bg-gray-100 transition-colors"
            onClick={() => onSelectUser(user)}
          >
            <div className="flex items-center gap-3">
              <img
                src={profileImagePath || "/default-profile.png"}
                alt={`${user.name} ${user.lastname}`}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover flex-shrink-0"
              />
              <div className="min-w-0">
                <p className="font-medium text-gray-900 text-sm sm:text-base truncate">
                  {user.name} {user.lastname}
                </p>
                <p className="text-xs sm:text-sm text-gray-500 truncate">@{user.username}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};