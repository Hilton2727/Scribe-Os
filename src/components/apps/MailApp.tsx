import React from 'react';

const MailApp: React.FC<{ dark?: boolean }> = ({ dark }) => {
  return (
    <div className={`h-full flex ${dark ? 'bg-[#23232b] text-gray-100' : 'bg-white text-gray-900'}`}>
      <div className={`w-64 border-r ${dark ? 'bg-[#23232b] border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
        <div className="p-4 font-bold text-lg">Inbox</div>
        <ul className="space-y-2 p-2">
          <li className="p-2 rounded hover:bg-blue-100 dark:hover:bg-gray-800 cursor-pointer">Welcome to Mail App</li>
          <li className="p-2 rounded hover:bg-blue-100 dark:hover:bg-gray-800 cursor-pointer">Your Invoice is Ready</li>
          <li className="p-2 rounded hover:bg-blue-100 dark:hover:bg-gray-800 cursor-pointer">React Project Update</li>
        </ul>
      </div>
      <div className="flex-1 p-6">
        <h2 className="text-xl font-bold mb-2">Welcome to Mail App</h2>
        <div className="text-sm text-gray-500 mb-4">From: admin@example.com</div>
        <div className="mb-4">This is a sample email preview. You can design this further as needed.</div>
      </div>
    </div>
  );
};

export default MailApp; 