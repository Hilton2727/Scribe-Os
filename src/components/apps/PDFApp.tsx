import React from 'react';

const PDFApp: React.FC<{ dark?: boolean }> = ({ dark }) => {
  return (
    <div className={`h-full flex flex-col ${dark ? 'bg-[#23232b] text-gray-100' : 'bg-white text-gray-900'}`}>
      <div className="p-4 font-bold text-lg border-b border-gray-200 dark:border-gray-700">PDF Viewer</div>
      <div className="flex-1 flex flex-col items-center justify-center">
        <button className="mb-4 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Upload PDF</button>
        <div className="w-64 h-80 border-2 border-dashed border-gray-400 flex items-center justify-center text-gray-400 dark:text-gray-500">
          PDF preview will appear here.
        </div>
      </div>
    </div>
  );
};

export default PDFApp; 