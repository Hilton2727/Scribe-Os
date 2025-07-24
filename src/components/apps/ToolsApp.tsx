import React from 'react';
import { Database, Globe, Server, LifeBuoy, FileCog, Mail, Box } from 'lucide-react';

const tools = [
  {
    name: 'Database Tool',
    icon: <Database className="w-8 h-8 text-blue-600 mb-2" />,
    description: 'Manage your databases',
    onClick: () => alert('Database Tool coming soon!'),
  },
  {
    name: 'ENV Tool',
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
  {
    name: 'SMTP Tool',
    icon: <Mail className="w-8 h-8 text-red-600 mb-2" />,
    description: 'Test and manage SMTP email sending',
    onClick: () => alert('SMTP Tool coming soon!'),
  },
  {
    name: 'Docker Tool',
    icon: <Box className="w-8 h-8 text-blue-800 mb-2" />,
    description: 'Manage Docker containers and images',
    onClick: () => alert('Docker Tool coming soon!'),
  },
];

interface ToolsAppProps {
  dark?: boolean;
}

const ToolsApp: React.FC<ToolsAppProps> = ({ dark }) => {
  return (
    <div className={`h-full flex flex-col items-center justify-center p-8 ${dark ? 'bg-[#23232b]' : 'bg-gray-50'}`}>
      <div className="text-4xl mb-4">🛠️</div>
      <div className={`text-2xl font-bold mb-6 ${dark ? 'text-gray-100' : ''}`}>Tools</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-3xl max-h-[60vh] overflow-y-auto p-2">
        {tools.map((tool) => (
          <button
            key={tool.name}
            onClick={tool.onClick}
            className={`flex flex-col items-center p-6 rounded-xl transition focus:outline-none border ${dark ? 'bg-[#23232b] border-gray-700 text-gray-100 hover:bg-[#2d2d38] shadow-2xl' : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-100 shadow hover:shadow-lg'}`}
          >
            {tool.icon}
            <div className={`font-semibold text-lg mb-1 ${dark ? 'text-gray-100' : ''}`}>{tool.name}</div>
            <div className={`text-gray-500 text-sm text-center ${dark ? 'text-gray-400' : ''}`}>{tool.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ToolsApp; 