import React from 'react';
import { Database, Globe, Server, LifeBuoy, FileCog } from 'lucide-react';

const tools = [
  {
    name: 'Database Tool',
    icon: <Database className="w-8 h-8 text-blue-600 mb-2" />,
    description: 'Manage your databases',
    onClick: () => alert('Database Tool coming soon!'),
  },
  {
    name: 'WNV Tool',
    icon: <Server className="w-8 h-8 text-green-600 mb-2" />,
    description: 'Web server/network utilities',
    onClick: () => alert('WNV Tool coming soon!'),
  },
  {
    name: 'Domain Tool',
    icon: <Globe className="w-8 h-8 text-purple-600 mb-2" />,
    description: 'Domain management',
    onClick: () => alert('Domain Tool coming soon!'),
  },
  {
    name: 'Contact Support',
    icon: <LifeBuoy className="w-8 h-8 text-yellow-600 mb-2" />,
    description: 'Get help and support',
    onClick: () => alert('Contact Support coming soon!'),
  },
  {
    name: '.htaccess Tool',
    icon: <FileCog className="w-8 h-8 text-pink-600 mb-2" />,
    description: 'Edit your .htaccess file',
    onClick: () => alert('.htaccess Tool coming soon!'),
  },
];

const ToolsApp: React.FC = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-gray-50 p-8">
      <div className="text-4xl mb-4">🛠️</div>
      <div className="text-2xl font-bold mb-6">Tools</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-3xl">
        {tools.map((tool) => (
          <button
            key={tool.name}
            onClick={tool.onClick}
            className="flex flex-col items-center p-6 bg-white rounded-xl shadow hover:shadow-lg transition border border-gray-200 hover:bg-gray-100 focus:outline-none"
          >
            {tool.icon}
            <div className="font-semibold text-lg mb-1">{tool.name}</div>
            <div className="text-gray-500 text-sm text-center">{tool.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ToolsApp; 