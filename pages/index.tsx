
// pages/index.tsx
import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import SearchResultsSummary from '../components/SearchResultsSummary';
import ResultList from '../components/ResultList';
import SearchSuggestions from '../components/SearchSuggestions';
import Pagination from '../components/Pagination'; // Import Pagination component
import { fetchTrademarks } from '../services/trademarkService';

const HomePage: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<any[]>([]);
  const [resultsCount, setResultsCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const handleSearch = async (searchQuery: string, page: number = 1) => {
    setQuery(searchQuery);
    try {
      const data = await fetchTrademarks(searchQuery, page);
      console.log(data);
      setResults(data.body.hits.hits || []);
      setResultsCount(data.body.hits.total.value || 0); // Adjust according to your API response
      setTotalPages(Math.ceil(data.body.hits.total.value / 10)); // Calculate total pages
    } catch (error) {
      console.error('Error fetching trademarks:', error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    handleSearch(query, page);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    handleSearch(suggestion);
  };

  const generateSuggestions = (query: string) => {
    if (!query) return [];
    const trimmedQuery = query.trim();
    return [`${trimmedQuery}*`, `*${trimmedQuery}`];
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <SearchResultsSummary query={query} count={resultsCount} />
      <SearchSuggestions 
        suggestions={generateSuggestions(query)} 
        onSuggestionClick={handleSuggestionClick} 
      />
      <ResultList data={results} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default HomePage;



























// // pages/index.tsx
// import React, { useState } from 'react';
// import SearchBar from '../components/SearchBar';
// import SearchResultsSummary from '../components/SearchResultsSummary';
// import ResultList from '../components/ResultList';
// import SearchSuggestions from '../components/SearchSuggestions';
// import Pagination from '../components/Pagination'; // Import Pagination component
// import { fetchTrademarks } from '../services/trademarkService';

// const HomePage: React.FC = () => {
//   const [query, setQuery] = useState<string>('');
//   const [results, setResults] = useState<any[]>([]);
//   const [resultsCount, setResultsCount] = useState<number>(0);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [totalPages, setTotalPages] = useState<number>(1);

//   const handleSearch = async (searchQuery: string, page: number = 1) => {
//     setQuery(searchQuery);
//     try {
//       const data = await fetchTrademarks(searchQuery, page);
//       console.log(data);
//       setResults(data.body.hits.hits || []);
//       setResultsCount(data.body.hits.total.value || 0); // Adjust according to your API response
//       setTotalPages(Math.ceil(data.body.hits.total.value / 10)); // Calculate total pages
//     } catch (error) {
//       console.error('Error fetching trademarks:', error);
//     }
//   };

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//     handleSearch(query, page);
//   };

//   const handleSuggestionClick = (suggestion: string) => {
//     setQuery(suggestion);
//     handleSearch(suggestion);
//   };

//   const generateSuggestions = (query: string) => {
//     if (!query) return [];
//     const trimmedQuery = query.trim();
//     return [`${trimmedQuery}*`, `*${trimmedQuery}`];
//   };

//   return (
//     <div>
//       <SearchBar onSearch={handleSearch} />
//       <SearchResultsSummary query={query} count={resultsCount} />
//       <SearchSuggestions 
//         suggestions={generateSuggestions(query)} 
//         onSuggestionClick={handleSuggestionClick} 
//       />
//       <ResultList data={results} />
//       <Pagination
//         currentPage={currentPage}
//         totalPages={totalPages}
//         onPageChange={handlePageChange}
//       />
//     </div>
//   );
// };

// export default HomePage;
