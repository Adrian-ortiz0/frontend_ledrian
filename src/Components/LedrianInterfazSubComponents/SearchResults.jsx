import React from 'react'

export const SearchResults = ({ results, onSelectUser }) => {
    if (results.length === 0) {
      return null;
    }
  
    return (
      <div className="absolute top-[6vh] w-full max-w-[400px] bg-white rounded-lg shadow-lg z-10">
        {results.map((user) => (
          <div
            key={user.id}
            className="p-3 hover:bg-gray-100 cursor-pointer"
            onClick={() => onSelectUser(user)}
          >
            <div className="flex items-center gap-3">
              <img
                src={user.photo}
                alt={`${user.name} ${user.lastname}`}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold text-gray-900">
                  {user.name} {user.lastname}
                </p>
                <p className="text-sm text-gray-500">@{user.username}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };