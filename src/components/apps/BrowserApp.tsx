import React, { useState } from 'react';

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

export default BrowserApp; 