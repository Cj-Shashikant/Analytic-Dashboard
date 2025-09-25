import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  X, 
  Volume2,
  VolumeX,
  Settings,
  Maximize,
  Minimize,
  BarChart3,
  FileText,
  Users,
  Clock
} from 'lucide-react';
import { Playlist, PlaylistItem } from './PlaylistManager';

interface PlaylistPlayerProps {
  playlist: Playlist;
  isOpen: boolean;
  onClose: () => void;
  onItemChange: (item: PlaylistItem, index: number) => void;
  onFiltersChange: (filters: any) => void;
  onReportTypeChange: (reportType: string) => void;
  onChartTypeChange?: (chartType: 'revenue' | 'expenses') => void;
}

export function PlaylistPlayer({
  playlist,
  isOpen,
  onClose,
  onItemChange,
  onFiltersChange,
  onReportTypeChange,
  onChartTypeChange
}: PlaylistPlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  const currentItem = playlist.items[currentIndex];
  const totalItems = playlist.items.length;

  // Initialize the first item
  useEffect(() => {
    if (currentItem && isOpen) {
      onItemChange(currentItem, currentIndex);
      onFiltersChange(currentItem.filters);
      onReportTypeChange(currentItem.reportType);
      if (currentItem.chartType && onChartTypeChange) {
        onChartTypeChange(currentItem.chartType);
      }
      setTimeRemaining(currentItem.duration || 20);
      setProgress(0);
    }
  }, [currentIndex, currentItem, isOpen]);

  // Handle playback timer
  useEffect(() => {
    if (isPlaying && currentItem) {
      const duration = (currentItem.duration || 20) * 1000; // Convert to milliseconds
      const interval = 100; // Update every 100ms for smooth progress

      intervalRef.current = setInterval(() => {
        const elapsed = Date.now() - startTimeRef.current;
        const progressPercent = Math.min((elapsed / duration) * 100, 100);
        const remaining = Math.max(0, Math.ceil((duration - elapsed) / 1000));

        setProgress(progressPercent);
        setTimeRemaining(remaining);

        if (progressPercent >= 100) {
          handleNext();
        }
      }, interval);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  }, [isPlaying, currentItem]);

  // Handle play/pause
  const handlePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      startTimeRef.current = Date.now() - ((progress / 100) * ((currentItem?.duration || 20) * 1000));
      setIsPlaying(true);
    }
  };

  // Handle next item
  const handleNext = () => {
    if (currentIndex < totalItems - 1) {
      setCurrentIndex(prev => prev + 1);
      setProgress(0);
      setIsPlaying(true);
      startTimeRef.current = Date.now();
    } else {
      // End of playlist
      setIsPlaying(false);
      setProgress(0);
    }
  };

  // Handle previous item
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setProgress(0);
      if (isPlaying) {
        startTimeRef.current = Date.now();
      }
    }
  };

  // Handle item selection
  const handleSelectItem = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
    if (isPlaying) {
      startTimeRef.current = Date.now();
    }
  };

  // Handle close
  const handleClose = () => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentIndex(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    onClose();
  };

  // Format time
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Get icon for report type
  const getReportIcon = (reportType: string) => {
    if (reportType.includes('Revenue')) return BarChart3;
    if (reportType.includes('Retention')) return Users;
    return FileText;
  };

  if (!isOpen || !currentItem) return null;

  return (
    <div className={`fixed inset-0 z-50 bg-black bg-opacity-50 flex items-end ${isFullscreen ? 'items-center' : ''}`}>
      <div className={`bg-white w-full transition-all duration-300 ${isFullscreen ? 'h-full' : 'h-32'} border-t border-gray-200`}>
        {/* Player Controls */}
        <div className="flex items-center justify-between p-4 bg-white border-b border-gray-100">
          <div className="flex items-center gap-4">
            {/* Play Controls */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="h-8 w-8 p-0"
              >
                <SkipBack className="w-4 h-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePlayPause}
                className="h-10 w-10 p-0 bg-blue-50 hover:bg-blue-100 text-blue-600"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleNext}
                disabled={currentIndex === totalItems - 1}
                className="h-8 w-8 p-0"
              >
                <SkipForward className="w-4 h-4" />
              </Button>
            </div>

            {/* Current Item Info */}
            <div className="flex items-center gap-3">
              {React.createElement(getReportIcon(currentItem.reportType), { 
                className: "w-5 h-5 text-gray-600" 
              })}
              <div>
                <div className="font-medium text-gray-900 text-sm">
                  {currentItem.name}
                </div>
                <div className="text-xs text-gray-500">
                  {currentIndex + 1} of {totalItems} • {playlist.name}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Progress and Time */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{formatTime(timeRemaining)}</span>
              </div>
              
              <div className="w-32">
                <Progress value={progress} className="h-2" />
              </div>
            </div>

            {/* Player Options */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="h-8 w-8 p-0"
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              >
                {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="h-8 w-8 p-0 text-red-600 hover:bg-red-50"
                title="Close Player"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Expanded Player (when not fullscreen) */}
        {!isFullscreen && (
          <div className="p-4">
            <div className="flex items-center gap-4">
              {/* Playlist Items */}
              <div className="flex-1">
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {playlist.items.map((item, index) => {
                    const IconComponent = getReportIcon(item.reportType);
                    const isActive = index === currentIndex;
                    const isPast = index < currentIndex;
                    
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSelectItem(index)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm whitespace-nowrap transition-colors ${
                          isActive 
                            ? 'bg-blue-50 border-blue-200 text-blue-900' 
                            : isPast
                            ? 'bg-green-50 border-green-200 text-green-800'
                            : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <span className="text-xs font-mono">{index + 1}.</span>
                        <IconComponent className="w-4 h-4" />
                        <span className="font-medium">{item.reportType}</span>
                        {item.chartType && (
                          <Badge variant="outline" className="text-xs">
                            {item.chartType}
                          </Badge>
                        )}
                        <span className="text-xs text-gray-500">
                          {formatTime(item.duration || 20)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Playlist Info */}
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">
                  Total: {formatTime(playlist.totalDuration)}
                </div>
                <div className="text-xs text-gray-500">
                  {playlist.items.length} items
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}