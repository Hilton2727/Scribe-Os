import React, { useState } from 'react';

const CodeEditorApp: React.FC<{ dark?: boolean }> = ({ dark }) => {
  const [currentFile, setCurrentFile] = useState('index.html');
  const [code, setCode] = useState(`<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>My Web App</title>\n    <style>\n        body {\n            font-family: Arial, sans-serif;\n            margin: 0;\n            padding: 20px;\n            background-color: #f0f0f0;\n        }\n        .container {\n            max-width: 800px;\n            margin: 0 auto;\n            background: white;\n            padding: 20px;\n            border-radius: 10px;\n            box-shadow: 0 2px 10px rgba(0,0,0,0.1);\n        }\n        h1 {\n            color: #333;\n            text-align: center;\n        }\n        .button {\n            background: #007bff;\n            color: white;\n            border: none;\n            padding: 10px 20px;\n            border-radius: 5px;\n            cursor: pointer;\n        }\n        .button:hover {\n            background: #0056b3;\n        }\n    </style>\n</head>\n<body>\n    <div class=\"container\">\n        <h1>Welcome to My Web App</h1>\n        <p>This is a simple HTML page created in the code editor.</p>\n        <button class=\"button\" onclick=\"alert('Hello World!')\">Click Me</button>\n    </div>\n</body>\n</html>`);

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

export default CodeEditorApp; 