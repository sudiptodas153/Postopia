import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;
// console.log(totalPages)
  return (
    <div className="flex justify-center mt-8 gap-2 flex-wrap">
      {Array.from({ length: totalPages }, (_, i) => {
        const pageNum = i + 1;
        const isActive = currentPage === pageNum;

        return (
          <button
            key={i}
            onClick={() => onPageChange(pageNum)}
            className={`px-4 py-2 rounded-md border font-medium transition
              ${isActive
                ? ' text-white bg-gradient-to-r from-[#ad4df1] to-[#5191f7]'
                : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'}`}
          >
            {pageNum}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
