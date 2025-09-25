import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Calendar, GripVertical } from 'lucide-react';

interface TodaysReportButtonProps {
  onClick: () => void;
}

export function TodaysReportButton({ onClick }: TodaysReportButtonProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 24, y: 24 }); // Default position from bottom-right
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Dashboard boundaries (1440x1024)
  const DASHBOARD_WIDTH = 1440;
  const DASHBOARD_HEIGHT = 1024;
  const BUTTON_SIZE = 56; // Button size for boundary calculations

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    
    setDragOffset({ x: offsetX, y: offsetY });
    setIsDragging(true);
    e.preventDefault();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const offsetX = touch.clientX - rect.left;
    const offsetY = touch.clientY - rect.top;
    
    setDragOffset({ x: offsetX, y: offsetY });
    setIsDragging(true);
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      // Calculate new position relative to dashboard container
      const dashboardElement = document.querySelector('[data-dashboard-container]') || document.body;
      const dashboardRect = dashboardElement.getBoundingClientRect();
      
      let newX = e.clientX - dashboardRect.left - dragOffset.x;
      let newY = e.clientY - dashboardRect.top - dragOffset.y;

      // Constrain to dashboard boundaries
      newX = Math.max(0, Math.min(newX, DASHBOARD_WIDTH - BUTTON_SIZE));
      newY = Math.max(0, Math.min(newY, DASHBOARD_HEIGHT - BUTTON_SIZE));

      setPosition({ x: newX, y: newY });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;

      const touch = e.touches[0];
      const dashboardElement = document.querySelector('[data-dashboard-container]') || document.body;
      const dashboardRect = dashboardElement.getBoundingClientRect();
      
      let newX = touch.clientX - dashboardRect.left - dragOffset.x;
      let newY = touch.clientY - dashboardRect.top - dragOffset.y;

      // Constrain to dashboard boundaries
      newX = Math.max(0, Math.min(newX, DASHBOARD_WIDTH - BUTTON_SIZE));
      newY = Math.max(0, Math.min(newY, DASHBOARD_HEIGHT - BUTTON_SIZE));

      setPosition({ x: newX, y: newY });
      e.preventDefault();
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, dragOffset]);

  const handleClick = (e: React.MouseEvent) => {
    // Only prevent click if we are currently dragging, not if we just finished
    e.stopPropagation();
    onClick();
  };

  return (
    <Button
      ref={buttonRef}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        fixed z-50 w-14 h-14 rounded-full shadow-lg border-2 border-white
        bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800
        text-white transition-all duration-200 cursor-pointer select-none
        ${isDragging ? 'scale-110 shadow-2xl cursor-grabbing' : isHovered ? 'scale-105 shadow-xl cursor-grab' : 'hover:scale-105'}
        ${isDragging ? 'z-[60]' : 'z-50'}
      `}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        touchAction: 'none',
      }}
      title={isDragging ? "Drag to move" : "Open Today's Report"}
    >
      <div className="flex flex-col items-center justify-center">
        {/* Drag handle indicator when hovered */}
        {(isHovered || isDragging) && !isDragging && (
          <GripVertical className="w-3 h-3 opacity-60 mb-0.5 transition-opacity duration-200" />
        )}
        <Calendar className={`${(isHovered || isDragging) && !isDragging ? 'w-4 h-4' : 'w-5 h-5'} transition-all duration-200`} />
        {(!isHovered && !isDragging) && (
          <span className="text-xs mt-0.5 font-medium">Today</span>
        )}
      </div>
    </Button>
  );
}