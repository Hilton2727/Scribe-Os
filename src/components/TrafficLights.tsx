
import React from 'react';

interface TrafficLightsProps {
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  isActive?: boolean;
}

const TrafficLights: React.FC<TrafficLightsProps> = ({ 
  onClose, 
  onMinimize, 
  onMaximize, 
  isActive = true 
}) => {
  return (
    <div className="flex items-center space-x-2 p-3">
      <button
        onClick={onClose}
        className={`w-3 h-3 rounded-full transition-all duration-200 ${
          isActive 
            ? 'bg-macos-red hover:bg-red-600 hover:shadow-md' 
            : 'bg-gray-300'
        }`}
        aria-label="Close window"
      />
      <button
        onClick={onMinimize}
        className={`w-3 h-3 rounded-full transition-all duration-200 ${
          isActive 
            ? 'bg-macos-yellow hover:bg-yellow-600 hover:shadow-md' 
            : 'bg-gray-300'
        }`}
        aria-label="Minimize window"
      />
      <button
        onClick={onMaximize}
        className={`w-3 h-3 rounded-full transition-all duration-200 ${
          isActive 
            ? 'bg-macos-green hover:bg-green-600 hover:shadow-md' 
            : 'bg-gray-300'
        }`}
        aria-label="Maximize window"
      />
    </div>
  );
};

export default TrafficLights;
