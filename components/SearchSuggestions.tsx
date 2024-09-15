// components/SearchSuggestions.tsx
import React from 'react';
import { FaFilter, FaShareAlt } from 'react-icons/fa';
import { useRouter } from 'next/router';

interface SearchSuggestionsProps {
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
  onShareClick: () => void; // Add this line
}

const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({ suggestions, onSuggestionClick, onShareClick }) => {
  return (
    <div className="search-suggestions flex justify-between items-center px-5">
      <div className="suggestions-buttons flex items-center">
        <span className="mr-4 text-gray-700">Also try searching for:</span>
        <div className="suggestions-buttons-container flex space-x-2">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => onSuggestionClick(suggestion)}
              className="bg-[#fef7f0] border border-[#e7760e] text-[#e7760e] px-4 py-2 rounded-lg"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
      <div className="actions flex items-center">
        <button className="share-button flex items-center justify-center border border-light-gray rounded-full w-10 h-10 mr-3" onClick={onShareClick}>
          <FaShareAlt className="text-dark-gray" />
        </button>
      </div>
    </div>
  );
};

export default SearchSuggestions;

