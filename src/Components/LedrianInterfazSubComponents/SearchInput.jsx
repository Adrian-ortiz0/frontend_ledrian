import React, { useState } from 'react';

export const SearchInput = ({ placeholder = 'Search...', onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    if (onSearch) {
      onSearch(event.target.value);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <div className='flex justify-center items-center h-[6vh] gap-3 pr-[2vw]'>
      <img 
        src="/public/search.png" 
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
        onKeyPress={handleKeyPress}
        aria-label="Search input"
      />
    </div>
  );
};