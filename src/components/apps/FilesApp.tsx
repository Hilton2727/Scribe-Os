import React, { useState, useEffect } from 'react';
import { listFiles } from '../../serviece/api.service';

const FilesApp: React.FC<{ dark?: boolean }> = ({ dark }) => {
  const [currentPath, setCurrentPath] = useState('');
  const [files, setFiles] = useState<Array<{ name: string; type: string; size: string | number; modified: string }>>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFiles = async (dir: string = '') => {
    setLoading(true);
    setError(null);
    try {
      const data = await listFiles(dir);
      setFiles(data);
    } catch (e: any) {
      setError(e.message || 'Failed to load files');
      setFiles([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFiles(currentPath);
  }, [currentPath]);

  const navigateUp = () => {
    if (!currentPath) return;
      const parts = currentPath.split('/').filter(Boolean);
      parts.pop();
    setCurrentPath(parts.join('/'));
  };

  const openFolder = (name: string) => {
    setCurrentPath(currentPath ? `${currentPath}/${name}` : name);
  };

  return (
    <div className={`h-full flex flex-col ${dark ? 'bg-[#23232b] text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Toolbar */}
      <div className={`${dark ? 'bg-[#23232b] border-b border-gray-700' : 'bg-white border-b border-gray-200'} p-3`}>
        <div className="flex items-center space-x-3">
          <button
            onClick={navigateUp}
            disabled={!currentPath}
            className={`px-3 py-1 rounded transition ${dark ? 'bg-gray-700 text-gray-100 hover:bg-gray-600 disabled:opacity-50' : 'bg-gray-200 hover:bg-gray-300 disabled:opacity-50'}`}
          >
            ← Back
          </button>
          <div className={`flex-1 rounded px-3 py-1 text-sm ${dark ? 'bg-[#23232b] text-gray-400' : 'bg-gray-100 text-gray-700'}`}>📁 htdocs{currentPath ? '/' + currentPath : ''}</div>
        </div>
      </div>
      {/* File List */}
      <div className="flex-1 overflow-auto">
        {loading ? (
          <div className={`p-4 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>Loading...</div>
        ) : error ? (
          <div className={`p-4 ${dark ? 'text-red-400' : 'text-red-500'}`}>{error}</div>
        ) : (
        <div className="grid grid-cols-1 gap-1 p-4">
            {files.map((file, index) => (
            <div
              key={index}
              onClick={() => file.type === 'folder' ? openFolder(file.name) : setSelectedFile(file.name)}
              className={`flex items-center space-x-3 p-3 rounded cursor-pointer transition ${
                selectedFile === file.name
                  ? dark ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-900'
                  : dark ? 'hover:bg-gray-800' : 'hover:bg-blue-50'
              }`}
            >
              <div className="text-2xl">
                {file.type === 'folder' ? '📁' : '📄'}
              </div>
              <div className="flex-1">
                <div className="font-medium">{file.name}</div>
                <div className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {file.size} • Modified {file.modified}
                </div>
              </div>
            </div>
          ))}
        </div>
        )}
      </div>
      {/* Status Bar */}
      <div className={`${dark ? 'bg-[#23232b] border-t border-gray-700 text-gray-400' : 'bg-white border-t border-gray-200 text-gray-600'} p-2 text-sm`}>
        {files.length} items
      </div>
    </div>
  );
};

export default FilesApp; 