import React, { useState, useRef, useEffect } from 'react';
import Draggable from 'react-draggable';
import TrafficLights from './TrafficLights';
import TerminalEngine from './apps/TerminalEngine';
import { default as ToolsApp } from './apps/ToolsApp';
import SettingsApp from './apps/SettingsApp';
import NotesApp from './apps/NotesApp';
import BrowserApp from './apps/BrowserApp';
import FilesApp from './apps/FilesApp';
import CodeEditorApp from './apps/CodeEditorApp';
import MailApp from './apps/MailApp';
import SQLTerminalApp from './apps/SQLTerminalApp';
import DatabaseApp from './apps/DatabaseApp';
import ScribeStoreApp from './apps/ScribeStoreApp';
import PDFApp from './apps/PDFApp';
import ViewerApp from './apps/ViewerApp';
import VideoApp from './apps/VideoApp';
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
      case 'mail':
        return <MailApp dark={dark} />;
      case 'sql':
        return <SQLTerminalApp dark={dark} />;
      case 'database':
        return <DatabaseApp dark={dark} />;
      case 'store':
        return <ScribeStoreApp dark={dark} />;
      case 'pdf':
        return <PDFApp dark={dark} />;
      case 'viewer':
        return <ViewerApp dark={dark} />;
      case 'video':
        return <VideoApp dark={dark} />;
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

export default DraggableWindow;
