
import React, { useState, useEffect, useRef } from 'react';
import { ApiService } from '../serviece/api.service';

const API_URL = '/api/terminal.php';

interface TerminalLine {
  type: 'command' | 'output' | 'error';
  content: string;
  timestamp: Date;
}

interface TerminalEngineProps {
  onCommand?: (command: string) => void;
}

const getPrompt = (currentDir: string) => `user@${currentDir}> `;

const TerminalEngine: React.FC<TerminalEngineProps> = ({ onCommand }) => {
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      type: 'output',
      content: 'Scribe OS Terminal v1.0.0',
      timestamp: new Date()
    },
    {
      type: 'output',
      content: 'Type "help" for available commands.',
      timestamp: new Date()
    }
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentDir, setCurrentDir] = useState('htdocs');
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Helper to fetch current dir from backend
  const fetchCurrentDir = async () => {
    // We'll use a special command to get the current dir name
    const dir = await ApiService.terminalCommand('pwd');
    setCurrentDir((dir as string).trim() || 'htdocs');
  };

  useEffect(() => {
    fetchCurrentDir();
  }, []);

  const executeCommand = async (command: string) => {
    const trimmedCommand = command.trim();
    if (!trimmedCommand) return;

    setCommandHistory(prev => [...prev, trimmedCommand]);
    setHistoryIndex(-1);

    setLines(prev => [...prev, {
      type: 'command',
      content: `${getPrompt(currentDir)}${trimmedCommand}`,
      timestamp: new Date()
    }]);

    try {
      const response = await ApiService.terminalCommand(trimmedCommand);
      if (typeof response === 'string' && response.includes('<<<CLEAR>>>')) {
        setLines([]);
        setCurrentInput('');
        await fetchCurrentDir();
        return;
      }
      if (typeof response === 'string' && response.includes('<<<EDIT>>>')) {
        setLines(prev => [...prev, {
          type: 'output',
          content: 'Edit mode is not supported in this terminal.',
          timestamp: new Date()
        }]);
        setCurrentInput('');
        await fetchCurrentDir();
        return;
      }
      setLines(prev => [...prev, {
        type: 'output',
        content: typeof response === 'string' ? response.replace(/<[^>]+>/g, '') : JSON.stringify(response),
        timestamp: new Date()
      }]);
    } catch (err) {
      setLines(prev => [...prev, {
        type: 'error',
        content: 'API error: ' + (err instanceof Error ? err.message : String(err)),
        timestamp: new Date()
      }]);
    }
    setCurrentInput('');
    await fetchCurrentDir();
    onCommand?.(trimmedCommand);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(currentInput);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex >= 0) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentInput('');
        } else {
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[newIndex]);
        }
      }
    }
  };

  const handleContainerClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div 
      ref={containerRef}
      className="terminal-content h-full p-4 overflow-y-auto cursor-text"
      onClick={handleContainerClick}
    >
      <div className="font-mono text-sm">
        {lines.map((line, index) => (
          <div key={index} className={`mb-1 ${
            line.type === 'command' ? 'text-gray-300' : 
            line.type === 'error' ? 'text-red-400' : 
            'text-green-400'
          }`}>
            <pre className="whitespace-pre-wrap">{line.content}</pre>
          </div>
        ))}
        <div className="flex items-center text-gray-300">
          <span className="text-green-400">{getPrompt(currentDir)}</span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-transparent border-none outline-none text-green-400 flex-1 font-mono"
            spellCheck={false}
            autoComplete="off"
          />
          <span className="text-green-400 animate-cursor-blink">█</span>
        </div>
      </div>
    </div>
  );
};

export default TerminalEngine;
