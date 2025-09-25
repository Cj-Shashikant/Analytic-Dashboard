import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface AutoSlidingChartsProps {
  reportTypes: string[];
  currentReportType: string;
  onReportTypeChange: (reportType: string) => void;
  autoSlideInterval?: number; // in milliseconds, default 15000 (15 seconds)
  className?: string;
}

export function AutoSlidingCharts({ 
  reportTypes, 
  currentReportType, 
  onReportTypeChange, 
  autoSlideInterval = 15000,
  className = '' 
}: AutoSlidingChartsProps) {
  const [isAutoSliding, setIsAutoSliding] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(autoSlideInterval / 1000);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  const professionalPalette = {
    primary: "#1E40AF",      // Deep royal blue
    secondary: "#475569",    // Neutral slate
    success: "#059669",      // Rich emerald
    mutedGray: "#64748B",    // Modern slate
    lightGray: "#F1F5F9",    // Light background
    borderLight: "#E2E8F0",  // Subtle borders
    cardBg: "#FFFFFF",       // Clean white
    accent: "#7C3AED",       // Rich purple
    info: "#0284C7",         // Vibrant sky blue
  };

  // Clear intervals on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, []);

  // Auto-slide logic
  useEffect(() => {
    if (isAutoSliding) {
      startAutoSlide();
    } else {
      stopAutoSlide();
    }

    return () => {
      stopAutoSlide();
    };
  }, [isAutoSliding, reportTypes, currentReportType]);

  const startAutoSlide = () => {
    // Clear existing intervals
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (countdownRef.current) clearInterval(countdownRef.current);

    // Reset countdown
    setTimeRemaining(autoSlideInterval / 1000);

    // Start countdown
    countdownRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          return autoSlideInterval / 1000;
        }
        return prev - 1;
      });
    }, 1000);

    // Start auto-slide
    intervalRef.current = setInterval(() => {
      const currentIndex = reportTypes.indexOf(currentReportType);
      const nextIndex = (currentIndex + 1) % reportTypes.length;
      onReportTypeChange(reportTypes[nextIndex]);
      setTimeRemaining(autoSlideInterval / 1000);
    }, autoSlideInterval);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
      countdownRef.current = null;
    }
  };

  const toggleAutoSlide = () => {
    setIsAutoSliding(!isAutoSliding);
  };

  const resetSlide = () => {
    setTimeRemaining(autoSlideInterval / 1000);
    if (isAutoSliding) {
      stopAutoSlide();
      setTimeout(() => startAutoSlide(), 100);
    }
  };

  const goToReport = (reportType: string) => {
    onReportTypeChange(reportType);
    if (isAutoSliding) {
      resetSlide();
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Auto-slide controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleAutoSlide}
            className="h-8 px-3 text-xs font-medium rounded-md"
            style={{
              borderColor: professionalPalette.borderLight,
              backgroundColor: isAutoSliding ? `${professionalPalette.success}10` : professionalPalette.cardBg,
              color: isAutoSliding ? professionalPalette.success : professionalPalette.mutedGray,
            }}
          >
            {isAutoSliding ? (
              <Pause className="w-3.5 h-3.5 mr-1.5" />
            ) : (
              <Play className="w-3.5 h-3.5 mr-1.5" />
            )}
{isAutoSliding ? 'Auto Slide On' : 'Auto Slide Off'}
          </Button>

          {isAutoSliding && (
            <Button
              variant="ghost"
              size="sm"
              onClick={resetSlide}
              className="h-8 px-2 text-xs rounded-md"
              style={{ color: professionalPalette.mutedGray }}
              title="Reset Timer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </Button>
          )}
        </div>

        {isAutoSliding && (
          <div className="flex items-center gap-2">
            <span className="text-xs" style={{ color: professionalPalette.mutedGray }}>
              Next in:
            </span>
            <Badge 
              variant="outline" 
              className="text-xs px-2 py-0.5 rounded-md font-mono"
              style={{ 
                borderColor: professionalPalette.primary,
                color: professionalPalette.primary,
                backgroundColor: `${professionalPalette.primary}05`
              }}
            >
              {timeRemaining}s
            </Badge>
          </div>
        )}
      </div>

      {/* Report type chips/tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1">
        {reportTypes.map((reportType, index) => {
          const isActive = currentReportType === reportType;
          
          return (
            <Button
              key={reportType}
              variant="ghost"
              size="sm"
              onClick={() => goToReport(reportType)}
              className={`h-8 px-3 text-xs font-medium rounded-md whitespace-nowrap transition-all duration-200 ${
                isActive ? 'shadow-sm' : 'hover:bg-gray-50'
              }`}
              style={{
                backgroundColor: isActive ? professionalPalette.primary : professionalPalette.lightGray,
                color: isActive ? 'white' : professionalPalette.mutedGray,
                borderColor: isActive ? professionalPalette.primary : professionalPalette.borderLight,
                border: isActive ? `1px solid ${professionalPalette.primary}` : `1px solid ${professionalPalette.borderLight}`,
              }}
            >
              {reportType}
              {isActive && isAutoSliding && (
                <div 
                  className="ml-2 w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
                />
              )}
            </Button>
          );
        })}
      </div>

      {/* Progress bar for auto-slide */}
      {isAutoSliding && (
        <div className="w-full bg-gray-200 rounded-full h-1">
          <div
            className="h-1 rounded-full transition-all duration-1000 ease-linear"
            style={{
              backgroundColor: professionalPalette.primary,
              width: `${((autoSlideInterval / 1000 - timeRemaining) / (autoSlideInterval / 1000)) * 100}%`,
            }}
          />
        </div>
      )}
    </div>
  );
}