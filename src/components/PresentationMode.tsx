import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription } from './ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from './ui/dropdown-menu';
import { ChartsSection } from './ProductDetailsPanel/ChartsSection_Products_Enhanced';
import { AutoSlidingCharts } from './AutoSlidingCharts';
import { AdvancedFilters } from './AdvancedFilters';
import { X, Play, Pause, RotateCcw, ChevronLeft, ChevronRight, BarChart3, Maximize2, Settings, Plus, Users, Calendar, Phone, CheckSquare, Filter, Building2, UserPlus, PhoneCall, CalendarPlus, ClipboardList } from 'lucide-react';

interface PresentationModeProps {
  isOpen: boolean;
  onClose: () => void;
  selectedEntity: string;
  selectedReportType: string;
  selectedBusinessType: string;
  selectedLocation: string;
  actualDuration: string;
  valueUnit: string;
  baseMetricsData: any;
  topExpenseCategories: string;
  allReportTypes: string[];
  onReportTypeChange: (reportType: string) => void;
  onValueUnitChange?: (unit: string) => void;
  onTopExpenseCategoriesChange?: (value: string) => void;
}

export function PresentationMode({
  isOpen,
  onClose,
  selectedEntity,
  selectedReportType,
  selectedBusinessType,
  selectedLocation,
  actualDuration,
  valueUnit,
  baseMetricsData,
  topExpenseCategories,
  allReportTypes,
  onReportTypeChange,
  onValueUnitChange = () => {},
  onTopExpenseCategoriesChange = () => {}
}: PresentationModeProps) {
  // Auto-slide functionality
  const [isAutoSliding, setIsAutoSliding] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(20); // 20 seconds default
  const [slideInterval, setSlideInterval] = useState(20000); // 20 seconds in ms
  
  // Chart navigation for Revenue vs Expenses (excluding Revenue by Business Model)
  const [currentChartType, setCurrentChartType] = useState<'expenses'>('expenses');
  
  // Full screen chart navigation (left/right arrows)
  const [showNavControls, setShowNavControls] = useState(true);
  
  // Advanced filters state
  const [isAdvancedFiltersOpen, setIsAdvancedFiltersOpen] = useState(false);
  
  // CRM Creation states
  const [showCRMSuccess, setShowCRMSuccess] = useState<{type: string, visible: boolean}>({type: '', visible: false});
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  // Professional palette for consistent styling
  const professionalPalette = {
    primary: "#1E40AF",
    secondary: "#475569",
    success: "#059669",
    mutedGray: "#64748B",
    lightGray: "#F1F5F9",
    borderLight: "#E2E8F0",
    cardBg: "#FFFFFF",
    accent: "#7C3AED",
    info: "#0284C7",
  };

  // Filter report types to show only revenue-focused reports for presentation (excluding Revenue by Business Model)
  const presentationReportTypes = allReportTypes.filter(type => 
    type.includes('Revenue') || type === 'Revenue vs Expenses'
  );

  // Clear intervals on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, []);

  // Auto-slide logic
  useEffect(() => {
    if (isAutoSliding && isOpen) {
      startAutoSlide();
    } else {
      stopAutoSlide();
    }

    return () => {
      stopAutoSlide();
    };
  }, [isAutoSliding, isOpen, selectedReportType]);

  const startAutoSlide = () => {
    // Clear existing intervals
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (countdownRef.current) clearInterval(countdownRef.current);

    // Reset countdown
    setTimeRemaining(slideInterval / 1000);

    // Start countdown
    countdownRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          return slideInterval / 1000;
        }
        return prev - 1;
      });
    }, 1000);

    // Start auto-slide
    intervalRef.current = setInterval(() => {
      goToNextSlide();
      setTimeRemaining(slideInterval / 1000);
    }, slideInterval);
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
    setTimeRemaining(slideInterval / 1000);
    if (isAutoSliding) {
      stopAutoSlide();
      setTimeout(() => startAutoSlide(), 100);
    }
  };

  const goToNextSlide = () => {
    if (selectedReportType === 'Revenue vs Expenses') {
      // Only show expenses chart (removed revenue by business model)
      const currentIndex = presentationReportTypes.indexOf(selectedReportType);
      const nextIndex = (currentIndex + 1) % presentationReportTypes.length;
      onReportTypeChange(presentationReportTypes[nextIndex]);
    } else {
      // Move to next report type
      const currentIndex = presentationReportTypes.indexOf(selectedReportType);
      const nextIndex = (currentIndex + 1) % presentationReportTypes.length;
      onReportTypeChange(presentationReportTypes[nextIndex]);
    }
  };

  const goToPrevSlide = () => {
    if (selectedReportType === 'Revenue vs Expenses') {
      // Only show expenses chart (removed revenue by business model)
      const currentIndex = presentationReportTypes.indexOf(selectedReportType);
      const prevIndex = currentIndex === 0 ? presentationReportTypes.length - 1 : currentIndex - 1;
      onReportTypeChange(presentationReportTypes[prevIndex]);
    } else {
      // Move to previous report type
      const currentIndex = presentationReportTypes.indexOf(selectedReportType);
      const prevIndex = currentIndex === 0 ? presentationReportTypes.length - 1 : currentIndex - 1;
      onReportTypeChange(presentationReportTypes[prevIndex]);
    }
  };

  const getSlideTitle = () => {
    if (selectedReportType === 'Revenue vs Expenses') {
      return 'Expenses Breakdown Analysis'; // Removed revenue by business model
    }
    return selectedReportType;
  };

  // CRM Actions
  const handleCreateCRM = (type: 'lead' | 'contact' | 'meeting' | 'task') => {
    // Simulate creation and show success message
    setShowCRMSuccess({type, visible: true});
    setTimeout(() => {
      setShowCRMSuccess({type: '', visible: false});
    }, 2000);
  };

  const getSlideSubtitle = () => {
    return `${selectedEntity} • ${selectedBusinessType} • ${selectedLocation} • ${actualDuration}`;
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (event.key) {
        case 'ArrowLeft':
          goToPrevSlide();
          if (isAutoSliding) resetSlide();
          break;
        case 'ArrowRight':
        case ' ': // Spacebar
          event.preventDefault();
          goToNextSlide();
          if (isAutoSliding) resetSlide();
          break;
        case 'p':
        case 'P':
          toggleAutoSlide();
          break;
        case 'Escape':
          onClose();
          break;
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyPress);
      return () => document.removeEventListener('keydown', handleKeyPress);
    }
  }, [isOpen, isAutoSliding, selectedReportType, currentChartType]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[1440px] h-[1000px] max-w-none max-h-none p-0 bg-white border-0" aria-describedby="presentation-description">
        <DialogDescription id="presentation-description" className="sr-only">
          Full-screen presentation mode for revenue and expense analytics dashboard with auto-slide functionality and executive controls
        </DialogDescription>
        <div className="flex flex-col h-full relative">
          {/* Presentation Header with Executive CRM Navigation */}
          <div className="flex flex-col border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            {/* Executive CRM Navigation Bar */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-blue-100">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">Executive Analysis</span>
                </div>
                
                {/* CRM Quick Actions */}
                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8 px-3 text-xs bg-white border-blue-200 hover:bg-blue-50">
                        <UserPlus className="w-3 h-3 mr-1.5" />
                        New Lead
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-48">
                      <DropdownMenuItem onClick={() => handleCreateCRM('lead')}>
                        <UserPlus className="w-4 h-4 mr-2" />
                        Create Lead
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Users className="w-4 h-4 mr-2" />
                        Import Leads
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8 px-3 text-xs bg-white border-blue-200 hover:bg-blue-50">
                        <Users className="w-3 h-3 mr-1.5" />
                        Contacts
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-48">
                      <DropdownMenuItem onClick={() => handleCreateCRM('contact')}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Contact
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Users className="w-4 h-4 mr-2" />
                        View All Contacts
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8 px-3 text-xs bg-white border-blue-200 hover:bg-blue-50">
                        <CalendarPlus className="w-3 h-3 mr-1.5" />
                        Meetings
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-48">
                      <DropdownMenuItem onClick={() => handleCreateCRM('meeting')}>
                        <CalendarPlus className="w-4 h-4 mr-2" />
                        Schedule Meeting
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Calendar className="w-4 h-4 mr-2" />
                        View Calendar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8 px-3 text-xs bg-white border-blue-200 hover:bg-blue-50">
                        <ClipboardList className="w-3 h-3 mr-1.5" />
                        Tasks
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-48">
                      <DropdownMenuItem onClick={() => handleCreateCRM('task')}>
                        <Plus className="w-4 h-4 mr-2" />
                        Create Task
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <CheckSquare className="w-4 h-4 mr-2" />
                        View All Tasks
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Advanced Filters */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAdvancedFiltersOpen(true)}
                className="h-8 px-3 text-xs bg-white border-blue-200 hover:bg-blue-50"
              >
                <Filter className="w-3 h-3 mr-1.5" />
                Advanced Filters
              </Button>
            </div>

            {/* Main Header */}
            <div className="flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-blue-100 border border-blue-200">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900">{getSlideTitle()}</h1>
                  <p className="text-base text-gray-600 mt-1">{getSlideSubtitle()}</p>
                </div>
              </div>
              
              {/* Header Controls */}
              <div className="flex items-center gap-3">
                {/* Auto-slide controls */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleAutoSlide}
                    className="h-9 px-3 text-sm font-medium rounded-lg"
                    style={{
                      borderColor: professionalPalette.borderLight,
                      backgroundColor: isAutoSliding ? `${professionalPalette.success}10` : professionalPalette.cardBg,
                      color: isAutoSliding ? professionalPalette.success : professionalPalette.mutedGray,
                    }}
                  >
                    {isAutoSliding ? (
                      <Pause className="w-4 h-4 mr-1.5" />
                    ) : (
                      <Play className="w-4 h-4 mr-1.5" />
                    )}
                    {isAutoSliding ? 'Auto Play' : 'Auto Play'}
                  </Button>

                  {isAutoSliding && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={resetSlide}
                      className="h-9 px-2 text-sm rounded-lg"
                      style={{ color: professionalPalette.mutedGray }}
                      title="Reset Timer"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                {/* Timer display */}
                {isAutoSliding && (
                  <Badge 
                    variant="outline" 
                    className="text-sm px-3 py-1 rounded-lg font-mono"
                    style={{ 
                      borderColor: professionalPalette.primary,
                      color: professionalPalette.primary,
                      backgroundColor: `${professionalPalette.primary}05`
                    }}
                  >
                    {timeRemaining}s
                  </Badge>
                )}

                {/* Exit presentation */}
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="h-9 px-4 text-sm font-medium rounded-lg border-gray-300 hover:bg-gray-50"
                >
                  <X className="w-4 h-4 mr-2" />
                  Exit Presentation
                </Button>
              </div>
            </div>
          </div>

          {/* Progress bar for auto-slide */}
          {isAutoSliding && (
            <div className="w-full bg-gray-200 h-1">
              <div
                className="h-1 transition-all duration-1000 ease-linear"
                style={{
                  backgroundColor: professionalPalette.primary,
                  width: `${((slideInterval / 1000 - timeRemaining) / (slideInterval / 1000)) * 100}%`,
                }}
              />
            </div>
          )}

          {/* Left Navigation Arrow */}
          {showNavControls && (
            <button
              onClick={() => {
                goToPrevSlide();
                if (isAutoSliding) resetSlide();
              }}
              className="absolute left-6 top-1/2 transform -translate-y-1/2 z-10 p-4 bg-white rounded-full shadow-xl border border-gray-200 hover:bg-gray-50 hover:shadow-2xl transition-all duration-200 group"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600 group-hover:text-blue-600" />
            </button>
          )}

          {/* Right Navigation Arrow */}
          {showNavControls && (
            <button
              onClick={() => {
                goToNextSlide();
                if (isAutoSliding) resetSlide();
              }}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 z-10 p-4 bg-white rounded-full shadow-xl border border-gray-200 hover:bg-gray-50 hover:shadow-2xl transition-all duration-200 group"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-blue-600" />
            </button>
          )}

          {/* Slide Navigation Dots */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-lg border border-gray-200">
            {presentationReportTypes.map((reportType, index) => {
              const isActive = reportType === selectedReportType;
              return (
                <button
                  key={reportType}
                  onClick={() => {
                    onReportTypeChange(reportType);
                    if (isAutoSliding) resetSlide();
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    isActive ? 'bg-blue-600 w-6' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  title={reportType}
                />
              );
            })}
            
            {/* Removed Revenue by Business Model navigation dots */}
          </div>

          {/* CRM Success Notification */}
          {showCRMSuccess.visible && (
            <div className="absolute top-24 right-6 z-20 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-in slide-in-from-top-2 duration-300">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {showCRMSuccess.type.charAt(0).toUpperCase() + showCRMSuccess.type.slice(1)} created successfully!
                </span>
              </div>
            </div>
          )}

          {/* Main Chart Content - Aligned to Top */}
          <div className="flex-1 p-8 overflow-hidden flex flex-col items-start justify-start">
            <ChartsSection 
              valueUnit={valueUnit} 
              selectedReportType={selectedReportType}
              fullScreen={true}
              chartType={selectedReportType === 'Revenue vs Expenses' ? 'expenses' : undefined}
              baseMetricsData={baseMetricsData}
              topExpenseCategories={topExpenseCategories}
              presentationMode={true}
            />
          </div>

          {/* Keyboard Shortcuts Help (bottom right) */}
          <div className="absolute bottom-6 right-6 z-10 bg-white rounded-lg px-3 py-2 shadow-lg border border-gray-200 opacity-75 hover:opacity-100 transition-opacity">
            <div className="text-xs text-gray-600 space-y-1">
              <div><kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">←→</kbd> Navigate</div>
              <div><kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Space</kbd> Next</div>
              <div><kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">P</kbd> Play/Pause</div>
              <div><kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Esc</kbd> Exit</div>
            </div>
          </div>
        </div>

        {/* Advanced Filters */}
        <AdvancedFilters
          isOpen={isAdvancedFiltersOpen}
          onClose={() => setIsAdvancedFiltersOpen(false)}
          valueUnit={valueUnit}
          onValueUnitChange={onValueUnitChange}
          topExpenseCategories={topExpenseCategories}
          onTopExpenseCategoriesChange={onTopExpenseCategoriesChange}
          selectedEntity={selectedEntity}
          selectedBusinessType={selectedBusinessType}
          selectedLocation={selectedLocation}
          selectedReportType={selectedReportType}
          selectedDuration={actualDuration}
        />
      </DialogContent>
    </Dialog>
  );
}