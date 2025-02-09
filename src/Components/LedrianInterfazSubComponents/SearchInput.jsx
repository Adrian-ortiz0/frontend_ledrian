import React, { useState, useEffect } from 'react';
import AxiosConfiguration from '../../AxiosConfiguration';
import { useNavigate } from 'react-router';
import { SearchResults } from './SearchResults';

export const SearchInput = ({ placeholder = 'Search...', padding = 'p-2 sm:p-4' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      return;
    }

    const token = localStorage.getItem('authToken');
    const delayDebounce = setTimeout(() => {
      setIsLoading(true);
      
      AxiosConfiguration.get(`users/search?query=${searchTerm}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => setSearchResults(response.data))
      .catch(error => {
        console.error('Error buscando usuarios:', error);
        setSearchResults([]);
      })
      .finally(() => setIsLoading(false));
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const handleSelectUser = (user) => {
    setSearchTerm('');
    setSearchResults([]);
    navigate(`../user/${user.id}`);
  };

  return (
    <div className={`relative flex items-center ${padding}`}>
      <div className="relative w-full max-w-[400px] ml-auto">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <img 
            src="/search.png" 
            alt=""
            className="w-4 h-4 sm:w-5 sm:h-5 opacity-70"
          />
        </div>
        
        <input
          type="text"
          className="w-full pl-10 pr-4 py-2 sm:py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/60 focus:ring-2 focus:ring-white/30 focus:border-transparent text-sm sm:text-base transition-all shadow-lg hover:shadow-xl focus:outline-none"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Buscar usuarios"
        />

        {(searchResults.length > 0 || isLoading) && (
          <div className="absolute right-0 left-0 mt-2">
            {isLoading ? (
              <div className="bg-white rounded-lg shadow-xl p-4">
                <p className="text-gray-600 text-sm">Buscando...</p>
              </div>
            ) : (
              <SearchResults results={searchResults} onSelectUser={handleSelectUser} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};