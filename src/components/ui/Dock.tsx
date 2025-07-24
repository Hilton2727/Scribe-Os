import React from 'react';
import { Grid3X3 } from 'lucide-react';

interface DockProps {
  dockApps: { type: string; icon: React.ElementType; label: string; color: string }[];
  windows: { type: string; isMinimized: boolean }[];
  openApp: (type: string) => void;
  showAppLauncher: boolean;
  setShowAppLauncher: (show: boolean) => void;
  dark: boolean;
}

const Dock: React.FC<DockProps> = ({ dockApps, windows, openApp, showAppLauncher, setShowAppLauncher, dark }) => {
  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-[9999]">
      <div className={`backdrop-blur-md rounded-2xl p-2 shadow-2xl border border-white/20 ${dark ? 'bg-white/5' : 'bg-white/20'}`}> 
        <div className="flex items-center space-x-2">
          {/* App Icons */}
          {dockApps.map(app => {
            const openCount = windows.filter(w => w.type === app.type && !w.isMinimized).length;
            return (
              <div key={app.type} className="relative">
                <button
                  onClick={() => openApp(app.type)}
                  className={`w-12 h-12 rounded-lg ${app.color} transition-all duration-200 hover:scale-110 flex items-center justify-center shadow-lg`}
                  title={app.label}
                >
                  <app.icon className="w-6 h-6 text-white" />
                </button>
                {openCount > 0 && (
                  <div className="absolute -bottom-1 left-1/2 flex space-x-0.5" style={{ transform: 'translateX(-50%)' }}>
                    {Array.from({ length: Math.min(openCount, 4) }).map((_, i) => (
                      <div key={i} className="w-1 h-1 bg-white rounded-full"></div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          {/* App Launcher Button (right side) */}
          <button
            onClick={() => setShowAppLauncher(true)}
            className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-200 hover:scale-110 flex items-center justify-center shadow-lg ml-2"
            title="Applications"
          >
            <Grid3X3 className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dock; 