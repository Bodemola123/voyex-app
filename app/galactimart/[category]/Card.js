'use client'
import React, { useState } from 'react';
import ProductCard from '../../../components/galatimart-page/ProductCard';

const Card = ({ toolsData, category, isLoading, error }) => {
  
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const toolsPerPage = 15;
    if (error) {
      return (
        <div className="text-red-500 p-4 bg-[#1c1d1f] rounded-lg text-center">
          Failed to fetch Tools, Please try again later
        </div>
      );
    }
    
  if (isLoading) {
    return (
      <div className="w-full h-64 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C088FB]"></div>
      </div>
    );
  }

  const filteredTools = toolsData.filter(
    (tool) => tool.category.toLowerCase() === category.toLowerCase()
  );
  
  if (filteredTools.length === 0) {
    return (
      <div className="text-center py-6">
        No tools available in that filter at the moment.
      </div>
    );
  }
  


  // Calculate total pages
  const totalPages = Math.ceil(filteredTools.length / toolsPerPage);

  // Get the current tools to display based on the page
  const currentTools = filteredTools.slice(
    (currentPage - 1) * toolsPerPage,
    currentPage * toolsPerPage
  );

  // Handle page change
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-2">
        {/* <p>
          Dive deeper into the cosmos of <span className="capitalize">{category}</span> tools.
        </p> */}
      </div>
      <div className="grid grid-cols-3 gap-4">
        {currentTools.map((tool) => (
          <ProductCard
            key={tool.tool_id}
            product={{
              id: tool.tool_id,
              title: tool.tool_name,
              image: tool.icon,
              rating: tool.rating,
              description: tool.large_description,
              tags: tool.use_case_tags,
            }}
          />
        ))}
      </div>
      
      {/* Pagination controls */}
      <div className="flex justify-center gap-2 mt-6">
        <button
          className="px-4 py-2 border rounded-md"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        
        {/* Page numbers */}
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`px-3 py-1 rounded-md ${currentPage === index + 1 ? 'bg-[#C088FB] text-white' : 'bg-transparent'}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        
        <button
          className="px-4 py-2 border rounded-md"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Card;
