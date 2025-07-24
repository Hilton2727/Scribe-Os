import React from 'react';
import { PenTool } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center space-x-2 group cursor-pointer">
      <div className="relative">
        <PenTool className="h-8 w-8 text-blue-600 dark:text-blue-400 transition-transform duration-300 group-hover:rotate-12" />
        <div className="absolute -inset-1 bg-blue-600/20 dark:bg-blue-400/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
        Scribe
      </span>
    </div>
  );
};

export default Logo; 