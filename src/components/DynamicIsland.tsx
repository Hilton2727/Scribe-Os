import React, { useState, useEffect } from 'react';
import { Calendar } from './ui/calendar';
import { cn } from '@/lib/utils';

const DynamicIsland: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleClickOutside = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div
        className={cn(
          "bg-black/80 backdrop-blur-md text-white rounded-full px-6 py-2 cursor-pointer transition-all duration-300 ease-in-out border border-white/10",
          isExpanded ? "rounded-2xl" : "hover:bg-black/90"
        )}
        onClick={handleClick}
      >
        <div className="text-sm font-medium text-center min-w-[80px]">
          {formatTime(currentTime)}
        </div>
        
        {isExpanded && (
          <div 
            className="mt-4 animate-fade-in"
            onClick={handleClickOutside}
          >
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="bg-transparent border-none p-0"
              classNames={{
                months: "flex flex-col",
                month: "space-y-4",
                caption: "flex justify-center pt-1 relative items-center text-white",
                caption_label: "text-sm font-medium text-white",
                nav: "space-x-1 flex items-center",
                nav_button: cn(
                  "h-7 w-7 bg-white/10 text-white p-0 opacity-50 hover:opacity-100 hover:bg-white/20 rounded-md border-none"
                ),
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse space-y-1",
                head_row: "flex",
                head_cell: "text-white/70 rounded-md w-9 font-normal text-[0.8rem]",
                row: "flex w-full mt-2",
                cell: "h-9 w-9 text-center text-sm p-0 relative text-white hover:bg-white/10 rounded-md",
                day: "h-9 w-9 p-0 font-normal text-white hover:bg-white/20 rounded-md",
                day_selected: "bg-white text-black hover:bg-white hover:text-black focus:bg-white focus:text-black",
                day_today: "bg-white/20 text-white font-semibold",
                day_outside: "text-white/30 opacity-50",
                day_disabled: "text-white/30 opacity-50",
                day_range_middle: "aria-selected:bg-white/20 aria-selected:text-white",
                day_hidden: "invisible",
              }}
            />
          </div>
        )}
      </div>
      
      {/* Backdrop to close calendar */}
      {isExpanded && (
        <div 
          className="fixed inset-0 z-[-1]" 
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  );
};

export default DynamicIsland;