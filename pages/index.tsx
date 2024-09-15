// pages/index.tsx
import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import SearchResultsSummary from '../components/SearchResultsSummary';
import ResultList from '../components/ResultList';
import SearchSuggestions from '../components/SearchSuggestions';
import Pagination from '../components/Pagination'; // Import Pagination component
import { fetchTrademarks } from '../services/trademarkService';

const HomePage: React.FC = () => {
  const [query, setQuery] = useState<string>(''); // User query for search
  const [results, setResults] = useState<any[]>([]); // Fetched trademark results
  const [resultsCount, setResultsCount] = useState<number>(0); // Total count of results
  const [currentPage, setCurrentPage] = useState<number>(1); // Current page number
  const [totalPages, setTotalPages] = useState<number>(1); // Total pages available
  const [statusFilter, setStatusFilter] = useState<string[] | null>(null); // Filter state for trademark status

  // Function to fetch trademark data, now accepting a filter for status
  const handleSearch = async (searchQuery: string, page: number = 1, status: string[] | undefined = undefined) => {
    setQuery(searchQuery);
    try {
      const data = await fetchTrademarks(searchQuery, page, status); // Pass status filter
      console.log(data);
      setResults(data.body.hits.hits || []); // Set the fetched results
      setResultsCount(data.body.hits.total.value || 0); // Set total number of results
      setTotalPages(Math.ceil(data.body.hits.total.value / 10)); // Calculate total pages based on results
    } catch (error) {
      console.error('Error fetching trademarks:', error);
    }
  };

  // When the page changes, fetch new data for that page
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    handleSearch(query, page, statusFilter ?? undefined); // Use undefined if statusFilter is null
  };
  

  // Handles when a suggestion is clicked
  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    handleSearch(suggestion);
  };

  // Generates suggestions for the search query
  const generateSuggestions = (query: string) => {
    if (!query) return [];
    const trimmedQuery = query.trim();
    return [`${trimmedQuery}*`, `*${trimmedQuery}`];
  };

  // Handle status filter changes from the `ResultList.tsx` component
  const fetchFilteredData = (status: string[] | null) => {
    setStatusFilter(status); // Set the selected status filter
    setCurrentPage(1); // Reset to page 1 when a filter is applied
    handleSearch(query, 1, status ?? undefined); // Convert null to undefined
  };
  

  return (
    <div>
      <SearchBar onSearch={handleSearch} /> {/* Search bar component */}
      <SearchResultsSummary query={query} count={resultsCount} /> {/* Summary of results */}
      <SearchSuggestions 
        suggestions={generateSuggestions(query)} 
        onSuggestionClick={handleSuggestionClick} 
      />
      <ResultList 
        data={results} 
        fetchFilteredData={fetchFilteredData} // Pass filter handler to ResultList
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange} // Handle pagination
      />
    </div>
  );
};

export default HomePage;






























// // pages/index.tsx
// import React, { useState, useEffect } from 'react';
// import SearchBar from '../components/SearchBar';
// import SearchResultsSummary from '../components/SearchResultsSummary';
// import ResultList from '../components/ResultList';
// import SearchSuggestions from '../components/SearchSuggestions';
// import Pagination from '../components/Pagination'; // Import Pagination component
// import { fetchTrademarks } from '../services/trademarkService';

// const HomePage: React.FC = () => {
//   const [query, setQuery] = useState<string>(''); // User query for search
//   const [results, setResults] = useState<any[]>([]); // Fetched trademark results
//   const [resultsCount, setResultsCount] = useState<number>(0); // Total count of results
//   const [currentPage, setCurrentPage] = useState<number>(1); // Current page number
//   const [totalPages, setTotalPages] = useState<number>(1); // Total pages available
//   const [statusFilter, setStatusFilter] = useState<string[] | null>(null); // Filter state for trademark status

//   // Function to fetch trademark data, now accepting a filter for status
//   const handleSearch = async (searchQuery: string, page: number = 1, status: string[] | undefined = undefined) => {
//     setQuery(searchQuery);
//     try {
//       const data = await fetchTrademarks(searchQuery, page, status); // Pass status filter
//       console.log(data);
//       setResults(data.body.hits.hits || []); // Set the fetched results
//       setResultsCount(data.body.hits.total.value || 0); // Set total number of results
//       setTotalPages(Math.ceil(data.body.hits.total.value / 10)); // Calculate total pages based on results
//     } catch (error) {
//       console.error('Error fetching trademarks:', error);
//     }
//   };

//   // When the page changes, fetch new data for that page
//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//     handleSearch(query, page, statusFilter ?? undefined); // Use undefined if statusFilter is null
//   };
  

//   // Handles when a suggestion is clicked
//   const handleSuggestionClick = (suggestion: string) => {
//     setQuery(suggestion);
//     handleSearch(suggestion);
//   };

//   // Generates suggestions for the search query
//   const generateSuggestions = (query: string) => {
//     if (!query) return [];
//     const trimmedQuery = query.trim();
//     return [`${trimmedQuery}*`, `*${trimmedQuery}`];
//   };

//   // Handle status filter changes from the `ResultList.tsx` component
//   const fetchFilteredData = (status: string[] | null) => {
//     setStatusFilter(status); // Set the selected status filter
//     setCurrentPage(1); // Reset to page 1 when a filter is applied
//     handleSearch(query, 1, status ?? undefined); // Convert null to undefined
//   };
  

//   return (
//     <div>
//       <SearchBar onSearch={handleSearch} /> {/* Search bar component */}
//       <SearchResultsSummary query={query} count={resultsCount} /> {/* Summary of results */}
//       <SearchSuggestions 
//         suggestions={generateSuggestions(query)} 
//         onSuggestionClick={handleSuggestionClick} 
//       />
//       <ResultList 
//         data={results} 
//         fetchFilteredData={fetchFilteredData} // Pass filter handler to ResultList
//       />
//       <Pagination
//         currentPage={currentPage}
//         totalPages={totalPages}
//         onPageChange={handlePageChange} // Handle pagination
//       />
//     </div>
//   );
// };

// export default HomePage;



























