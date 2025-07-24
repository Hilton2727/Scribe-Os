import React, { useState, useRef, useEffect } from 'react';
import Draggable from 'react-draggable';
import TrafficLights from './TrafficLights';
import TerminalEngine from './TerminalEngine';
import { default as ToolsApp } from './ToolsApp';
import { terminalCommand, listFiles } from '../serviece/api.service';

interface DraggableWindowProps {
  title?: string;
  onClose?: () => void;
  onMinimize?: () => void;
  onFocus?: () => void;
  type?: 'terminal' | 'settings' | 'notes' | 'browser' | 'files' | 'editor' | 'tools';
  isMinimized?: boolean;
  dark?: boolean;
}

const DraggableWindow: React.FC<DraggableWindowProps> = ({ 
  title = "Terminal", 
  onClose,
  onMinimize,
  onFocus,
  type = 'terminal',
  isMinimized = false,
  dark = false
}) => {
  const [isActive, setIsActive] = useState(true);
  const [isMaximized, setIsMaximized] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);

  const handleClose = async () => {
    if (type === 'terminal') {
      try {
        await terminalCommand('exit');
      } catch (e) {
        // Ignore errors on exit
      }
    }
    onClose?.();
  };

  const handleMinimize = () => {
    onMinimize?.();
  };

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  const handleClick = () => {
    setIsActive(true);
    onFocus?.();
  };

  const renderContent = () => {
    switch (type) {
      case 'terminal':
        return <TerminalEngine dark={dark} />;
      case 'settings':
        return <SettingsApp dark={dark} />;
      case 'notes':
        return <NotesApp dark={dark} />;
      case 'browser':
        return <BrowserApp dark={dark} />;
      case 'files':
        return <FilesApp dark={dark} />;
      case 'editor':
        return <CodeEditorApp dark={dark} />;
      case 'tools':
        return <ToolsApp dark={dark} />;
      default:
        return <TerminalEngine dark={dark} />;
    }
  };

  return (
    <div style={{ display: isMinimized ? 'none' : undefined }}>
      <Draggable
        handle=".drag-handle"
        defaultPosition={{ x: 0, y: 0 }}
        bounds={{
          left: -400,
          top: -60,
          right: window.innerWidth - 400,
          bottom: window.innerHeight - 200
        }}
      >
        <div
          className={`macos-window rounded-lg overflow-hidden transition-all duration-300 animate-scale-in ${
            isMaximized ? 'w-full h-full' : 'w-[800px] h-[600px]'
          } ${dark ? 'bg-[#23232b] border border-gray-700 shadow-2xl' : 'bg-white border border-gray-200 shadow-lg'}`}
          onClick={handleClick}
        >
          <div
            ref={dragRef}
            className={`macos-titlebar drag-handle flex items-center justify-between cursor-move select-none ${dark ? 'bg-[#23232b] border-b border-gray-700' : 'bg-gray-100 border-b border-gray-200'}`}
          >
            <TrafficLights
              onClose={handleClose}
              onMinimize={handleMinimize}
              onMaximize={handleMaximize}
              isActive={isActive}
            />
            <div className="flex-1 text-center">
              <span className={`text-sm font-medium ${dark ? 'text-gray-200' : 'text-gray-700'}`}>{title}</span>
            </div>
            <div className="w-[60px]"></div>
          </div>
          <div className={`h-[calc(100%-60px)] ${dark ? 'bg-[#23232b] text-gray-200' : ''}`}>
            {renderContent()}
          </div>
        </div>
      </Draggable>
    </div>
  );
};

// Settings App Component
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

// Notes App Component
const NotesApp: React.FC<{ dark?: boolean }> = ({ dark }) => {
  const [notes, setNotes] = useState([
    { id: 1, title: 'Welcome Note', content: 'Welcome to the Notes app! Start writing your thoughts here.' },
    { id: 2, title: 'Todo List', content: '• Learn React\n• Build awesome apps\n• Deploy to production' }
  ]);
  const [selectedNote, setSelectedNote] = useState(notes[0]);
  const [isEditing, setIsEditing] = useState(false);

  const createNewNote = () => {
    const newNote = {
      id: Date.now(),
      title: 'New Note',
      content: ''
    };
    setNotes([newNote, ...notes]);
    setSelectedNote(newNote);
    setIsEditing(true);
  };

  const updateNote = (content: string) => {
    const updated = notes.map(note => 
      note.id === selectedNote.id ? { ...note, content } : note
    );
    setNotes(updated);
    setSelectedNote({ ...selectedNote, content });
  };

  return (
    <div className={`h-full flex ${dark ? 'bg-[#23232b] text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <div className={`${dark ? 'bg-[#23232b] border-gray-700' : 'bg-white border-gray-200'} w-64 border-r p-4`}>
        <button
          onClick={createNewNote}
          className={`w-full rounded px-3 py-2 mb-4 font-semibold transition ${dark ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
        >
          New Note
        </button>
        <div className="space-y-2">
          {notes.map(note => (
            <div
              key={note.id}
              onClick={() => setSelectedNote(note)}
              className={`p-3 rounded cursor-pointer transition font-medium truncate ${
                selectedNote.id === note.id
                  ? dark ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-900'
                  : dark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
              }`}
            >
              <div className="font-medium truncate">{note.title}</div>
              <div className="text-sm text-gray-500 truncate">{note.content}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 p-6">
        {selectedNote && (
          <div className={`h-full ${dark ? 'bg-[#23232b]' : ''}`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-xl font-bold ${dark ? 'text-gray-100' : ''}`}>{selectedNote.title}</h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`px-3 py-1 rounded transition ${dark ? 'bg-gray-700 text-gray-100 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
              >
                {isEditing ? 'Done' : 'Edit'}
              </button>
            </div>
            {isEditing ? (
              <textarea
                value={selectedNote.content}
                onChange={(e) => updateNote(e.target.value)}
                className={`w-full h-full resize-none border rounded p-4 font-mono ${dark ? 'bg-[#23232b] text-gray-100 border-gray-700' : 'bg-white text-gray-900 border-gray-200'}`}
                placeholder="Start writing..."
              />
            ) : (
              <div className={`whitespace-pre-wrap font-mono p-4 rounded border h-full ${dark ? 'bg-[#23232b] text-gray-100 border-gray-700' : 'bg-white text-gray-900 border-gray-200'}`}>{selectedNote.content}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Browser App Component
const BrowserApp: React.FC<{ dark?: boolean }> = ({ dark }) => {
  const [url, setUrl] = useState('https://lovable.dev');
  const [currentUrl, setCurrentUrl] = useState('https://lovable.dev');
  const [history, setHistory] = useState(['https://lovable.dev']);
  const [bookmarks, setBookmarks] = useState([
    'https://lovable.dev',
    'https://github.com',
    'https://stackoverflow.com'
  ]);
  const [iframeError, setIframeError] = useState(false);

  const navigate = () => {
    if (url) {
      setCurrentUrl(url);
      setHistory([...history, url]);
      setIframeError(false);
    }
  };

  const goBack = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      const previousUrl = newHistory[newHistory.length - 1];
      setCurrentUrl(previousUrl);
      setUrl(previousUrl);
      setHistory(newHistory);
      setIframeError(false);
    }
  };

  const addBookmark = () => {
    if (currentUrl && !bookmarks.includes(currentUrl)) {
      setBookmarks([...bookmarks, currentUrl]);
    }
  };

  return (
    <div className={`h-full flex flex-col ${dark ? 'bg-[#23232b] text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <div className={`${dark ? 'bg-[#23232b] border-b border-gray-700' : 'bg-white border-b border-gray-200'} p-3`}>
        <div className="flex items-center space-x-2 mb-2">
          <button
            onClick={goBack}
            disabled={history.length <= 1}
            className={`px-3 py-1 rounded transition ${dark ? 'bg-gray-700 text-gray-100 hover:bg-gray-600 disabled:opacity-50' : 'bg-gray-200 hover:bg-gray-300 disabled:opacity-50'}`}
          >
            ←
          </button>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && navigate()}
            className={`flex-1 px-3 py-1 border rounded ${dark ? 'bg-[#23232b] text-gray-100 border-gray-700' : 'bg-white text-gray-900 border-gray-200'}`}
            placeholder="Enter URL..."
          />
          <button
            onClick={navigate}
            className={`px-3 py-1 rounded transition ${dark ? 'bg-blue-700 text-white hover:bg-blue-800' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
          >
            Go
          </button>
          <button
            onClick={addBookmark}
            className={`px-3 py-1 rounded transition ${dark ? 'bg-yellow-700 text-white hover:bg-yellow-800' : 'bg-yellow-500 text-white hover:bg-yellow-600'}`}
          >
            ⭐
          </button>
          <button
            onClick={() => window.open(currentUrl, '_blank')}
            className={`px-3 py-1 rounded ml-2 transition ${dark ? 'bg-gray-700 text-gray-100 hover:bg-gray-600' : 'bg-gray-400 text-white hover:bg-gray-500'}`}
          >
            Open in New Tab
          </button>
        </div>
        <div className="flex space-x-2 text-sm">
          <span className={`text-gray-600 ${dark ? 'text-gray-400' : ''}`}>Bookmarks:</span>
          {bookmarks.map((bookmark, index) => (
            <button
              key={index}
              onClick={() => {
                setUrl(bookmark);
                setCurrentUrl(bookmark);
                setIframeError(false);
              }}
              className={`hover:underline ${dark ? 'text-blue-300' : 'text-blue-600'}`}
            >
              {(() => { try { return new URL(bookmark).hostname; } catch { return bookmark; } })()}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 p-0 relative">
        {iframeError && (
          <div className={`absolute inset-0 flex flex-col items-center justify-center z-10 border rounded-b-lg ${dark ? 'bg-[#23232b] border-gray-700' : 'bg-white'}`}>
            <div className="text-2xl mb-2">🚫</div>
            <div className={`text-lg font-medium mb-2 ${dark ? 'text-gray-100' : 'text-gray-700'}`}>This site refused to connect or cannot be embedded.</div>
            <div className={`text-sm mb-4 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>Try opening it in a new tab.</div>
            <button
              onClick={() => window.open(currentUrl, '_blank')}
              className={`px-4 py-2 rounded transition ${dark ? 'bg-blue-700 text-white hover:bg-blue-800' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
            >
              Open {currentUrl} in New Tab
            </button>
          </div>
        )}
        <iframe
          src={currentUrl}
          title="Web Browser"
          className="w-full h-full border-0 rounded-b-lg"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          onError={() => setIframeError(true)}
          style={{ display: iframeError ? 'none' : 'block' }}
        />
      </div>
    </div>
  );
};

// Files App Component
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

// Code Editor App Component
const CodeEditorApp: React.FC<{ dark?: boolean }> = ({ dark }) => {
  const [currentFile, setCurrentFile] = useState('index.html');
  const [code, setCode] = useState(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Web App</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f0f0f0;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333;
            text-align: center;
        }
        .button {
            background: #007bff;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
        }
        .button:hover {
            background: #0056b3;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to My Web App</h1>
        <p>This is a simple HTML page created in the code editor.</p>
        <button class="button" onclick="alert('Hello World!')">Click Me</button>
    </div>
</body>
</html>`);

  const files = [
    { name: 'index.html', type: 'html' },
    { name: 'styles.css', type: 'css' },
    { name: 'script.js', type: 'js' },
    { name: 'README.md', type: 'md' }
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'html': return '🌐';
      case 'css': return '🎨';
      case 'js': return '⚡';
      case 'md': return '📝';
      default: return '📄';
    }
  };

  return (
    <div className={`h-full flex ${dark ? 'bg-[#23232b] text-gray-100' : 'bg-gray-900 text-white'}`}>
      {/* File Explorer */}
      <div className={`${dark ? 'bg-[#23232b] border-gray-700' : 'bg-gray-800 border-gray-700'} w-64 border-r`}>
        <div className="p-3 border-b border-gray-700">
          <h3 className="font-medium">Files</h3>
        </div>
        <div className="p-2">
          {files.map((file, index) => (
            <div
              key={index}
              onClick={() => setCurrentFile(file.name)}
              className={`flex items-center space-x-2 p-2 rounded cursor-pointer hover:bg-gray-700 ${
                currentFile === file.name ? 'bg-blue-600' : ''
              }`}
            >
              <span>{getFileIcon(file.type)}</span>
              <span className="text-sm">{file.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 flex flex-col">
        <div className={`${dark ? 'bg-[#23232b] border-b border-gray-700' : 'bg-gray-800 border-b border-gray-700'} p-3`}>
          <div className="flex items-center space-x-4">
            <span className="text-sm">📁 {currentFile}</span>
            <button className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700">
              Run
            </button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
              Save
            </button>
          </div>
        </div>
        
        <div className="flex-1 relative">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-full bg-gray-900 text-white font-mono text-sm p-4 resize-none border-none outline-none"
            placeholder="Start coding..."
            spellCheck={false}
          />
          
          {/* Line numbers */}
          <div className="absolute left-0 top-0 bg-gray-800 text-gray-500 text-sm font-mono p-4 select-none pointer-events-none">
            {code.split('\n').map((_, index) => (
              <div key={index} className="text-right pr-2">
                {index + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Status Bar */}
        <div className={`${dark ? 'bg-[#23232b] border-t border-gray-700 text-gray-400' : 'bg-gray-800 border-t border-gray-700 text-gray-400'} p-2 text-sm`}>
          Lines: {code.split('\n').length} | Characters: {code.length} | Language: HTML
        </div>
      </div>
    </div>
  );
};

export default DraggableWindow;
