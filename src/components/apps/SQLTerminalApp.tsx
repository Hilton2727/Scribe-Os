import React, { useState } from 'react';

const SQLTerminalApp: React.FC<{ dark?: boolean }> = ({ dark }) => {
  const [query, setQuery] = useState('SELECT * FROM users;');
  const [result, setResult] = useState('');

  const runQuery = () => {
    setResult('Query executed! (This is a mock result.)');
  };

  return (
    <div className={`h-full flex flex-col ${dark ? 'bg-[#23232b] text-gray-100' : 'bg-white text-gray-900'}`}>
      <div className="p-4 font-bold text-lg border-b border-gray-200 dark:border-gray-700">SQL Terminal</div>
      <textarea
        className={`flex-1 m-4 p-2 rounded border ${dark ? 'bg-[#23232b] border-gray-700 text-gray-100' : 'bg-gray-50 border-gray-300 text-gray-900'}`}
        value={query}
        onChange={e => setQuery(e.target.value)}
        rows={6}
      />
      <button
        className="mx-4 mb-2 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        onClick={runQuery}
      >
        Run Query
      </button>
      <div className="flex-1 m-4 p-2 rounded border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
        {result || 'Results will appear here.'}
      </div>
    </div>
  );
};

export default SQLTerminalApp; 