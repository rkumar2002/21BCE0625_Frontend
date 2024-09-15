import React, { useState } from 'react';
import Image from 'next/image';
import trademarkiaLogo from '../public/trademarkia-logo.png'; 
import { FaSearch } from 'react-icons/fa';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <header className="search-header bg-[#F8FAFE] border-b-4 border-[#eaf1ff] flex items-center p-4 px-16 w-full">
      <div className="logo-container mr-10">
        <Image
          src={trademarkiaLogo}
          alt="Trademarkia Logo"
          width={140}
          height={40} 
        />
      </div>
      <div className="flex items-center border border-gray-300 rounded-lg w-1/2">
        <FaSearch className="text-gray-500 ml-2" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search Trademark Here eg. Mickey Mouse"
          className="border-none p-2 rounded-lg w-full focus:outline-none"
        />
      </div>
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-5 py-2 rounded-lg ml-2"
      >
        Search
      </button>
    </header>
  );
};

export default SearchBar;

