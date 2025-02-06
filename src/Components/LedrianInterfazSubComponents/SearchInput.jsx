import React, { useState } from 'react';
import AxiosConfiguration from '../../AxiosConfiguration';
import { useNavigate } from 'react-router';

export const SearchInput = ({ placeholder = 'Search...' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value.trim() === '') {
      setSearchResults([]); 
      return;
    }

    setIsLoading(true);

    const token = localStorage.getItem('authToken');

    AxiosConfiguration.get(`users/search?query=${value}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    })
      .then((response) => {
        setSearchResults(response.data); 
      })
      .catch((error) => {
        console.error('Error buscando usuarios:', error);
        setSearchResults([]); 
      })
      .finally(() => {
        setIsLoading(false); 
      });
  };

  const handleSelectUser = (user) => {
    setSearchTerm('');
    setSearchResults([]); 
    navigate(`../user/${user.id}`)
  };

  return (
    <div className='flex justify-center items-center h-[6vh] gap-3 pr-[2vw] relative'>
      <img 
        src="/search.png" 
        alt="Search icon" 
        width={24} 
        height={24} 
        aria-hidden="true" 
        className='opacity-80 hover:opacity-100 transition-opacity duration-200 cursor-pointer'
      />
      <input
        type="text"
        className='w-full max-w-[400px] border-none rounded-xl bg-[#ffffff18] text-white text-sm pl-4 pr-4 py-2 outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all duration-300 h-full shadow-lg hover:shadow-xl focus:shadow-xl placeholder:text-[#ffffff80]'
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleInputChange}
        aria-label="Search input"
      />

      {searchResults.length > 0 && (
        <div className="absolute top-[6vh] w-full max-w-[400px] bg-white rounded-lg shadow-lg z-10">
          {searchResults.map((user) => (
            <div
              key={user.id}
              className="p-3 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelectUser(user)}
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
      )}

      {isLoading && (
        <div className="absolute top-[6vh] w-full max-w-[400px] bg-white rounded-lg shadow-lg z-10 p-3">
          <p className="text-gray-700">Buscando...</p>
        </div>
      )}
    </div>
  );
};