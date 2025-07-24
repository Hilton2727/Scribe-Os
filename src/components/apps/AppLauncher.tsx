import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface AppLauncherProps {
  show: boolean;
  onClose: () => void;
  onAppSelect: (type: string) => void;
  dark?: boolean;
  allApps: { type: string; icon: React.ElementType; label: string; color: string }[];
}

const AppLauncher: React.FC<AppLauncherProps> = ({ show, onClose, onAppSelect, dark, allApps }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredApps = allApps.filter(app =>
    app.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-6 w-[600px] max-h-[70vh] overflow-hidden">
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search applications..."
            className="w-full pl-10 pr-4 py-3 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100"
            autoFocus
          />
        </div>
        {/* Apps Grid */}
        <div className="grid grid-cols-4 gap-4 max-h-[400px] overflow-y-auto">
          {filteredApps.map(app => (
            <button
              key={app.type}
              onClick={() => { onAppSelect(app.type); onClose(); }}
              className="flex flex-col items-center p-4 rounded-xl hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-200 group"
            >
              <div className={`w-16 h-16 rounded-2xl ${app.color} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-200 shadow-lg`}>
                <app.icon className="w-8 h-8 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100 text-center">
                {app.label}
              </span>
            </button>
          ))}
        </div>
      </div>
      {/* Backdrop to close launcher */}
      <div
        className="fixed inset-0 z-[-1]"
        onClick={onClose}
      />
    </div>
  );
};

export default AppLauncher; 