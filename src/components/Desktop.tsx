
import React, { useState, useMemo } from 'react';
import DraggableWindow from './DraggableWindow';
import DynamicIsland from './DynamicIsland';
import DarkVeil from './ui/DarkVeil';
import { Settings, FileText, Globe, Terminal, Folder, Code, Wrench, Moon, Sun, Power, Search, Grid3X3, Mail, Database, Store, Pencil, File, Image as LucideImage, Video } from 'lucide-react';
import Logo from './ui/Logo';
import AppLauncher from './apps/AppLauncher';
import Dock from './ui/Dock';

type AppType = 'terminal' | 'settings' | 'notes' | 'browser' | 'files' | 'editor' | 'tools';

interface Window {
  id: number;
  title: string;
  type: AppType;
  zIndex: number;
  isMinimized: boolean;
}

const Desktop: React.FC = () => {
  const [windows, setWindows] = useState<Window[]>([]);
  const [maxZIndex, setMaxZIndex] = useState(10);
  const [dark, setDark] = useState(false);
  const [showAppLauncher, setShowAppLauncher] = useState(false);

  const closeWindow = (id: number) => {
    setWindows(prev => prev.filter(window => window.id !== id));
  };

  const minimizeWindow = (id: number) => {
    setWindows(prev => prev.map(window => 
      window.id === id ? { ...window, isMinimized: true } : window
    ));
  };

  const restoreWindow = (id: number) => {
    const newZIndex = maxZIndex + 1;
    setMaxZIndex(newZIndex);
    setWindows(prev => prev.map(window => 
      window.id === id ? { ...window, isMinimized: false, zIndex: newZIndex } : window
    ));
  };

  const openApp = (type: AppType) => {
    // Check if there's a minimized window of this type to restore
    const minimizedWindow = windows.find(w => w.type === type && w.isMinimized);
    if (minimizedWindow) {
      restoreWindow(minimizedWindow.id);
      return;
    }

    // Limit to 4 open windows per app type
    const openCount = windows.filter(w => w.type === type && !w.isMinimized).length;
    if (openCount >= 4) return;

    const newId = Math.max(...windows.map(w => w.id), 0) + 1;
    const newZIndex = maxZIndex + 1;
    setMaxZIndex(newZIndex);
    
    const titles: Record<AppType, string> = {
      terminal: `Terminal ${newId}`,
      settings: 'System Preferences',
      notes: 'Notes',
      browser: 'Browser',
      files: 'Files',
      editor: 'Code Editor',
      tools: 'Tools',
    };
    
    setWindows(prev => [...prev, { 
      id: newId, 
      title: titles[type], 
      type,
      zIndex: newZIndex,
      isMinimized: false
    }]);
  };

  const bringToFront = (id: number) => {
    const newZIndex = maxZIndex + 1;
    setMaxZIndex(newZIndex);
    setWindows(prev => prev.map(window => 
      window.id === id ? { ...window, zIndex: newZIndex } : window
    ));
  };

  const allApps = [
    { type: "terminal" as AppType, icon: Terminal, label: "Terminal", color: "bg-black/80 hover:bg-black/90" },
    { type: "files" as AppType, icon: Folder, label: "Files", color: "bg-blue-600/80 hover:bg-blue-600/90" },
    { type: "editor" as AppType, icon: Code, label: "Code Editor", color: "bg-green-600/80 hover:bg-green-600/90" },
    { type: "settings" as AppType, icon: Settings, label: "Settings", color: "bg-gray-600/80 hover:bg-gray-600/90" },
    { type: "notes" as AppType, icon: FileText, label: "Notes", color: "bg-yellow-500/80 hover:bg-yellow-500/90" },
    { type: "browser" as AppType, icon: Globe, label: "Browser", color: "bg-blue-500/80 hover:bg-blue-500/90" },
    { type: "tools" as AppType, icon: Wrench, label: "Tools", color: "bg-orange-500/80 hover:bg-orange-500/90" },
    { type: "mail" as AppType, icon: Mail, label: "Mail App", color: "bg-red-500/80 hover:bg-red-500/90" },
    { type: "sql" as AppType, icon: Database, label: "SQL Terminal", color: "bg-purple-600/80 hover:bg-purple-600/90" },
    { type: "database" as AppType, icon: Database, label: "Database App", color: "bg-indigo-600/80 hover:bg-indigo-600/90" },
    { type: "store" as AppType, icon: Pencil, label: "Scribe Store", color: "bg-pink-500/80 hover:bg-pink-500/90" },
    { type: "pdf" as AppType, icon: File, label: "PDF App", color: "bg-gray-800/80 hover:bg-gray-800/90" },
    { type: "viewer" as AppType, icon: LucideImage, label: "Viewer", color: "bg-teal-500/80 hover:bg-teal-500/90" },
    { type: "video" as AppType, icon: Video, label: "Video App", color: "bg-yellow-700/80 hover:bg-yellow-700/90" }
  ];

  const defaultDockApps = [
    { type: 'terminal' as AppType, icon: Terminal, label: 'Terminal', color: 'bg-black/80 hover:bg-black/90' },
    { type: 'files' as AppType, icon: Folder, label: 'Files', color: 'bg-blue-600/80 hover:bg-blue-600/90' },
    { type: 'editor' as AppType, icon: Code, label: 'Code Editor', color: 'bg-green-600/80 hover:bg-green-600/90' },
    { type: 'settings' as AppType, icon: Settings, label: 'Settings', color: 'bg-gray-600/80 hover:bg-gray-600/90' },
    { type: 'notes' as AppType, icon: FileText, label: 'Notes', color: 'bg-yellow-500/80 hover:bg-yellow-500/90' },
    { type: 'browser' as AppType, icon: Globe, label: 'Browser', color: 'bg-blue-500/80 hover:bg-blue-500/90' }
  ];

  const dockApps = useMemo(() => {
    const openAppTypes = Array.from(new Set(windows.map(w => w.type)));
    const dynamicDockApps = allApps.filter(app =>
      openAppTypes.includes(app.type) &&
      !defaultDockApps.some(d => d.type === app.type)
    );
    return [...defaultDockApps, ...dynamicDockApps];
  }, [windows]);

  return (
    <div className={`relative w-full h-screen overflow-hidden${dark ? ' dark' : ''}`}>
      {/* Desktop Logo */}
      <div className="absolute top-6 left-6 z-30">
        <Logo />
      </div>
      {/* Top-right controls */}
      <DesktopControls dark={dark} setDark={setDark} />
      {/* Desktop Background */}
      <div className="absolute inset-0 z-0">
        <DarkVeil />
      </div>
      <div className="absolute inset-0 bg-black/10 z-10"></div>

      {/* Dynamic Island */}
      <DynamicIsland />

      {/* App Launcher Modal */}
      <AppLauncher
        show={showAppLauncher}
        onClose={() => setShowAppLauncher(false)}
        onAppSelect={openApp}
        dark={dark}
        allApps={allApps}
      />
      {/* Dock */}
      <Dock
        dockApps={dockApps}
        windows={windows}
        openApp={openApp}
        showAppLauncher={showAppLauncher}
        setShowAppLauncher={setShowAppLauncher}
        dark={dark}
      />

      {/* Windows */}
      <div className="absolute inset-0">
        {windows.filter(w => !w.isMinimized).map((window, index) => (
          <div 
            key={window.id} 
            className="absolute"
            style={{
              left: `${50 + index * 30}px`,
              top: `${70 + index * 30}px`,
              zIndex: window.zIndex
            }}
          >
            <DraggableWindow
              title={window.title}
              type={window.type as AppType}
              isMinimized={window.isMinimized}
              onClose={() => closeWindow(window.id)}
              onMinimize={() => minimizeWindow(window.id)}
              onFocus={() => bringToFront(window.id)}
              dark={dark}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

interface DesktopControlsProps {
  dark: boolean;
  setDark: React.Dispatch<React.SetStateAction<boolean>>;
}

const DesktopControls: React.FC<DesktopControlsProps> = ({ dark, setDark }) => {
  const [showPower, setShowPower] = useState(false);

  // Animate theme toggle
  const handleThemeToggle = () => {
    setDark((d) => !d);
  };

  return (
    <div className="absolute top-6 right-6 z-30 flex items-center space-x-4">
      <button
        onClick={handleThemeToggle}
        className={`transition-all duration-300 p-2 shadow-lg hover:scale-110 focus:outline-none ${dark ? 'rotate-180' : ''}`}
        aria-label="Toggle dark mode"
      >
        <span className="block transition-transform duration-300">
          {dark ? <Moon className="w-6 h-6 text-blue-500" /> : <Sun className="w-6 h-6 text-yellow-400" />}
        </span>
      </button>
      <button
        onClick={() => setShowPower(true)}
        className="transition-all duration-300 p-2 shadow-lg hover:scale-110 focus:outline-none"
        aria-label="Power options"
      >
        <Power className="w-6 h-6 text-red-500" />
      </button>
      {showPower && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 flex flex-col items-center space-y-4 border border-gray-200 dark:border-gray-700">
            <div className="text-3xl mb-2">⚡</div>
            <div className="text-xl font-bold mb-4">Power Options</div>
            <button
              onClick={() => { setShowPower(false); alert('Logout action!'); }}
              className="w-40 py-2 mb-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              Logout
            </button>
            <button
              onClick={() => { setShowPower(false); alert('Restart action!'); }}
              className="w-40 py-2 rounded bg-gray-600 text-white font-semibold hover:bg-gray-700 transition"
            >
              Restart
            </button>
            <button
              onClick={() => setShowPower(false)}
              className="w-40 py-2 rounded bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-300 dark:hover:bg-gray-700 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Desktop;
