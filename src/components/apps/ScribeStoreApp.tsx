import React from 'react';
import { Pencil } from 'lucide-react';
import Logo from '../ui/Logo';

const ScribeStoreApp: React.FC<{ dark?: boolean }> = ({ dark }) => {
  return (
    <div className={`h-full flex flex-col ${dark ? 'bg-[#23232b] text-gray-100' : 'bg-white text-gray-900'}`}>
      <div className="flex items-center p-6 border-b border-gray-200 dark:border-gray-700">
        <Logo className="w-10 h-10 mr-3" />
        <h1 className="text-2xl font-bold flex items-center">Scribe Store <Pencil className="ml-2 w-6 h-6 text-pink-500" /></h1>
      </div>
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Featured</h2>
          <div className="rounded-lg bg-pink-100 dark:bg-pink-900 p-4 flex items-center">
            <Pencil className="w-8 h-8 text-pink-500 mr-4" />
            <span className="font-medium">Get creative with Scribe Store! Download new apps and themes.</span>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Apps</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="rounded-lg border p-4 flex flex-col items-center bg-white dark:bg-gray-800">
              <Logo className="w-8 h-8 mb-2" />
              <span className="font-medium">Scribe Notes</span>
              <button className="mt-2 px-3 py-1 rounded bg-pink-500 text-white hover:bg-pink-600">Install</button>
            </div>
            <div className="rounded-lg border p-4 flex flex-col items-center bg-white dark:bg-gray-800">
              <Pencil className="w-8 h-8 mb-2 text-pink-500" />
              <span className="font-medium">Scribe Draw</span>
              <button className="mt-2 px-3 py-1 rounded bg-pink-500 text-white hover:bg-pink-600">Install</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScribeStoreApp; 