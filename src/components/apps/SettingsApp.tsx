import React, { useState } from 'react';

const SettingsApp: React.FC<{ dark?: boolean }> = ({ dark }) => {
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState('14');
  const [notifications, setNotifications] = useState(true);

  return (
    <div className={`h-full ${dark ? 'bg-[#23232b] text-gray-100' : 'bg-gray-50 text-gray-900'} p-6`}>
      <div className="max-w-2xl mx-auto">
        <h2 className={`text-2xl font-bold mb-6 ${dark ? 'text-gray-100' : ''}`}>System Preferences</h2>
        <div className="space-y-6">
          <div className={`${dark ? 'bg-[#23232b] border border-gray-700' : 'bg-white border border-gray-200'} rounded-lg p-4 shadow-sm`}>
            <h3 className={`font-semibold mb-3 ${dark ? 'text-gray-100' : ''}`}>Appearance</h3>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="theme"
                  value="light"
                  checked={theme === 'light'}
                  onChange={(e) => setTheme(e.target.value)}
                  className={`text-blue-600 ${dark ? 'bg-[#23232b] border-gray-700' : ''}`}
                />
                <span>Light</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="theme"
                  value="dark"
                  checked={theme === 'dark'}
                  onChange={(e) => setTheme(e.target.value)}
                  className={`text-blue-600 ${dark ? 'bg-[#23232b] border-gray-700' : ''}`}
                />
                <span>Dark</span>
              </label>
            </div>
          </div>
          <div className={`${dark ? 'bg-[#23232b] border border-gray-700' : 'bg-white border border-gray-200'} rounded-lg p-4 shadow-sm`}>
            <h3 className={`font-semibold mb-3 ${dark ? 'text-gray-100' : ''}`}>Terminal Settings</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Font Size</label>
                <select
                  value={fontSize}
                  onChange={(e) => setFontSize(e.target.value)}
                  className={`border rounded px-3 py-1 ${dark ? 'bg-[#23232b] text-gray-100 border-gray-700' : ''}`}
                >
                  <option value="12">12px</option>
                  <option value="14">14px</option>
                  <option value="16">16px</option>
                  <option value="18">18px</option>
                </select>
              </div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                  className={`text-blue-600 ${dark ? 'bg-[#23232b] border-gray-700' : ''}`}
                />
                <span>Enable notifications</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsApp; 