// components/Pagination.tsx
import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const getPaginationButtons = () => {
    const buttons = [];
    
    if (totalPages <= 5) {
      // If total pages are less than or equal to 5, show all
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(i);
      }
    } else {
      // Always show the first and last page button
      buttons.push(1);
      
      if (currentPage > 3) {
        buttons.push('...');
      }
      
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        buttons.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        buttons.push('...');
      }
      
      if (totalPages > 1) {
        buttons.push(totalPages);
      }
    }
    
    return buttons;
  };

  return (
    <div className="pagination flex justify-center my-8">
      <ul className="flex list-none">
        {getPaginationButtons().map((button, index) => (
          <li key={index} className="mx-1">
            {button === '...' ? (
              <span className="px-3 py-1">...</span>
            ) : (
              <button
                className={`px-3 py-1 border ${button === currentPage ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
                onClick={() => onPageChange(Number(button))}
              >
                {button}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;