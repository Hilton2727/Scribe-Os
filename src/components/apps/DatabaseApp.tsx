import React from 'react';

const DatabaseApp: React.FC<{ dark?: boolean }> = ({ dark }) => {
  return (
    <div className={`h-full flex ${dark ? 'bg-[#23232b] text-gray-100' : 'bg-white text-gray-900'}`}>
      <div className={`w-64 border-r ${dark ? 'bg-[#23232b] border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
        <div className="p-4 font-bold text-lg">Tables</div>
        <ul className="space-y-2 p-2">
          <li className="p-2 rounded hover:bg-blue-100 dark:hover:bg-gray-800 cursor-pointer">users</li>
          <li className="p-2 rounded hover:bg-blue-100 dark:hover:bg-gray-800 cursor-pointer">orders</li>
          <li className="p-2 rounded hover:bg-blue-100 dark:hover:bg-gray-800 cursor-pointer">products</li>
        </ul>
      </div>
      <div className="flex-1 p-6">
        <h2 className="text-xl font-bold mb-2">users</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b p-2">ID</th>
              <th className="border-b p-2">Name</th>
              <th className="border-b p-2">Email</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2">1</td>
              <td className="p-2">Alice</td>
              <td className="p-2">alice@example.com</td>
            </tr>
            <tr>
              <td className="p-2">2</td>
              <td className="p-2">Bob</td>
              <td className="p-2">bob@example.com</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DatabaseApp; 