// components/SearchResultsSummary.tsx
import React from 'react';

interface SearchResultsSummaryProps {
  query: string;
  count: number;
}

const SearchResultsSummary: React.FC<SearchResultsSummaryProps> = ({ query, count }) => {
  return (
    <div className="search-results-summary p-6">
      <p style={{color : "#4B5563"}}>
        About <strong>{count}</strong> Trademarks found for <strong>"{query}"</strong>
      </p>
      <hr className="border-t border-[#E7E6E6] mt-2" />
    </div>
  );
};

export default SearchResultsSummary;
