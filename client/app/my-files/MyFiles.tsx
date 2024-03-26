"use client"
import React, { useState } from 'react';

const MyFiles = () => {
  const [viewType, setViewType] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const filesPerPage = 10;

  // Dummy file data
  const files = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    name: `File ${i + 1}`,
    size: Math.floor(Math.random() * 100) + 1,
  }));

  // Calculate pagination
  const totalPages = Math.ceil(files.length / filesPerPage);
  const startIndex = (currentPage - 1) * filesPerPage;
  const endIndex = Math.min(startIndex + filesPerPage, files.length);

  // Pagination component
// Pagination component
const Pagination = () => (
    <div className="flex justify-center mt-4">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          className={`mx-1 px-3 py-1 rounded ${
            i + 1 === currentPage ? 'bg-gray-300' : 'bg-gray-200'
          }`}
          onClick={() => setCurrentPage(i + 1)}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
  

  return (
    <div>
      <div className="flex justify-between items-center border-b pb-2 mb-4">
        <div className="flex gap-4">
          <button
            className={`px-3 py-1 rounded ${
              viewType === 'grid' ? 'bg-gray-300' : 'bg-gray-200'
            }`}
            onClick={() => setViewType('grid')}
          >
            Grid View
          </button>
          <button
            className={`px-3 py-1 rounded ${
              viewType === 'table' ? 'bg-gray-300' : 'bg-gray-200'
            }`}
            onClick={() => setViewType('table')}
          >
            Table View
          </button>
        </div>
        <div>Page {currentPage}</div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {files.slice(startIndex, endIndex).map((file) => (
          <div key={file.id} className="border p-4">
            <div>{file.name}</div>
            <div>{file.size} KB</div>
          </div>
        ))}
      </div>
      <Pagination />
    </div>
  );
};

export default MyFiles;
