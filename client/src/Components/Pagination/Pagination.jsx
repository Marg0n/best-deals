import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
    }
  };

  const handlePageClick = (pageNumber) => {
    onPageChange(pageNumber);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`mx-1 px-3 py-1 rounded-full bg-[#775050]  text-white hover:bg-blue-300 transition-all duration-300 transform hover:scale-110 ${currentPage === i ? "bg-blue-500 text-white shadow-lg text-lg" : ""
            }`}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-center mt-8 space-x-4">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`px-4 py-1 rounded-full bg-[#775050] text-white hover:bg-[#3B9DF8] hover:text-[#fff] transition-all duration-300 ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
      >
        Previous
      </button>
      <div className="flex items-center space-x-2">
        {renderPageNumbers()}
      </div>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`px-4 py-1 rounded-full bg-[#775050] text-white hover:bg-[#3B9DF8] hover:text-[#fff] transition-all duration-300 ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
