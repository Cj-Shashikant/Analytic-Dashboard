import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { Card } from './ui/card';
import { CalendarDays, X, Check, ArrowRight } from 'lucide-react';

interface CustomPeriodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (startDate: Date, endDate: Date) => void;
  currentStartDate?: Date;
  currentEndDate?: Date;
}

export function CustomPeriodModal({ 
  isOpen, 
  onClose, 
  onApply, 
  currentStartDate, 
  currentEndDate 
}: CustomPeriodModalProps) {
  const [startDate, setStartDate] = useState<Date | undefined>(currentStartDate);
  const [endDate, setEndDate] = useState<Date | undefined>(currentEndDate);
  const [step, setStep] = useState<'start' | 'end'>('start');
  const [error, setError] = useState<string>('');

  // Enhanced quick period options with more business-relevant periods
  const quickPeriods = [
    // Daily/Weekly Options
    {
      label: 'Last 7 Days',
      getValue: () => {
        const end = new Date();
        const start = new Date();
        start.setDate(start.getDate() - 7);
        return { start, end };
      }
    },
    {
      label: 'Last 30 Days',
      getValue: () => {
        const end = new Date();
        const start = new Date();
        start.setDate(start.getDate() - 30);
        return { start, end };
      }
    },
    {
      label: 'Last 60 Days',
      getValue: () => {
        const end = new Date();
        const start = new Date();
        start.setDate(start.getDate() - 60);
        return { start, end };
      }
    },
    {
      label: 'Last 90 Days',
      getValue: () => {
        const end = new Date();
        const start = new Date();
        start.setDate(start.getDate() - 90);
        return { start, end };
      }
    },
    {
      label: 'Last 180 Days',
      getValue: () => {
        const end = new Date();
        const start = new Date();
        start.setDate(start.getDate() - 180);
        return { start, end };
      }
    },
    {
      label: 'Last 365 Days',
      getValue: () => {
        const end = new Date();
        const start = new Date();
        start.setDate(start.getDate() - 365);
        return { start, end };
      }
    },

    // Monthly Options
    {
      label: 'Current Month',
      getValue: () => {
        const now = new Date();
        const start = new Date(now.getFullYear(), now.getMonth(), 1);
        const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        return { start, end };
      }
    },
    {
      label: 'Last Month',
      getValue: () => {
        const now = new Date();
        const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const end = new Date(now.getFullYear(), now.getMonth(), 0);
        return { start, end };
      }
    },
    {
      label: 'Last 3 Months',
      getValue: () => {
        const end = new Date();
        const start = new Date();
        start.setMonth(start.getMonth() - 3);
        return { start, end };
      }
    },
    {
      label: 'Last 6 Months',
      getValue: () => {
        const end = new Date();
        const start = new Date();
        start.setMonth(start.getMonth() - 6);
        return { start, end };
      }
    },
    {
      label: 'Last 12 Months',
      getValue: () => {
        const end = new Date();
        const start = new Date();
        start.setMonth(start.getMonth() - 12);
        return { start, end };
      }
    },

    // Quarterly Options
    {
      label: 'Current Quarter',
      getValue: () => {
        const now = new Date();
        const quarter = Math.floor(now.getMonth() / 3);
        const start = new Date(now.getFullYear(), quarter * 3, 1);
        const end = new Date(now.getFullYear(), quarter * 3 + 3, 0);
        return { start, end };
      }
    },
    {
      label: 'Last Quarter',
      getValue: () => {
        const now = new Date();
        const currentQuarter = Math.floor(now.getMonth() / 3);
        let lastQuarter = currentQuarter - 1;
        let year = now.getFullYear();
        
        if (lastQuarter < 0) {
          lastQuarter = 3;
          year -= 1;
        }
        
        const start = new Date(year, lastQuarter * 3, 1);
        const end = new Date(year, lastQuarter * 3 + 3, 0);
        return { start, end };
      }
    },
    {
      label: 'Last 4 Quarters',
      getValue: () => {
        const end = new Date();
        const start = new Date();
        start.setMonth(start.getMonth() - 12);
        return { start, end };
      }
    },

    // Half-Year Options
    {
      label: 'Current Half Year',
      getValue: () => {
        const now = new Date();
        const half = now.getMonth() < 6 ? 0 : 1;
        const start = new Date(now.getFullYear(), half * 6, 1);
        const end = new Date(now.getFullYear(), half * 6 + 6, 0);
        return { start, end };
      }
    },
    {
      label: 'Previous Half Year',
      getValue: () => {
        const now = new Date();
        const currentHalf = now.getMonth() < 6 ? 0 : 1;
        let prevHalf = currentHalf - 1;
        let year = now.getFullYear();
        
        if (prevHalf < 0) {
          prevHalf = 1;
          year -= 1;
        }
        
        const start = new Date(year, prevHalf * 6, 1);
        const end = new Date(year, prevHalf * 6 + 6, 0);
        return { start, end };
      }
    },

    // Yearly Options
    {
      label: 'Current Year',
      getValue: () => {
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 1);
        const end = new Date(now.getFullYear(), 11, 31);
        return { start, end };
      }
    },
    {
      label: 'Year to Date',
      getValue: () => {
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 1);
        const end = new Date();
        return { start, end };
      }
    },
    {
      label: 'Previous Year',
      getValue: () => {
        const now = new Date();
        const start = new Date(now.getFullYear() - 1, 0, 1);
        const end = new Date(now.getFullYear() - 1, 11, 31);
        return { start, end };
      }
    },
    {
      label: 'Last 2 Years',
      getValue: () => {
        const end = new Date();
        const start = new Date();
        start.setFullYear(start.getFullYear() - 2);
        return { start, end };
      }
    },
    {
      label: 'Last 3 Years',
      getValue: () => {
        const end = new Date();
        const start = new Date();
        start.setFullYear(start.getFullYear() - 3);
        return { start, end };
      }
    },

    // Financial Year Options (April to March)
    {
      label: 'Current FY (Apr-Mar)',
      getValue: () => {
        const now = new Date();
        const currentYear = now.getFullYear();
        const fyStart = now.getMonth() >= 3 ? currentYear : currentYear - 1;
        
        const start = new Date(fyStart, 3, 1); // April 1st
        const end = new Date(fyStart + 1, 2, 31); // March 31st
        return { start, end };
      }
    },
    {
      label: 'Previous FY (Apr-Mar)',
      getValue: () => {
        const now = new Date();
        const currentYear = now.getFullYear();
        const fyStart = now.getMonth() >= 3 ? currentYear - 1 : currentYear - 2;
        
        const start = new Date(fyStart, 3, 1); // April 1st
        const end = new Date(fyStart + 1, 2, 31); // March 31st
        return { start, end };
      }
    }
  ];

  const handleQuickPeriod = (period: typeof quickPeriods[0]) => {
    const { start, end } = period.getValue();
    setStartDate(start);
    setEndDate(end);
    setStep('end');
    setError('');
  };

  const handleStartDateSelect = (date: Date | undefined) => {
    if (date) {
      setStartDate(date);
      setError('');
      // If end date is already selected and is before start date, clear it
      if (endDate && endDate < date) {
        setEndDate(undefined);
      }
      setStep('end');
    }
  };

  const handleEndDateSelect = (date: Date | undefined) => {
    if (date && startDate) {
      if (date < startDate) {
        setError('End date cannot be before start date');
        return;
      }
      setEndDate(date);
      setError('');
    } else if (date && !startDate) {
      setError('Please select a start date first');
    }
  };

  const handleApply = () => {
    if (!startDate || !endDate) {
      setError('Please select both start and end dates');
      return;
    }

    if (endDate < startDate) {
      setError('End date cannot be before start date');
      return;
    }

    onApply(startDate, endDate);
    onClose();
  };

  const handleCancel = () => {
    // Reset to original values
    setStartDate(currentStartDate);
    setEndDate(currentEndDate);
    setStep('start');
    setError('');
    onClose();
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return 'Select date';
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-[95vw] sm:w-full h-[90vh] sm:h-[700px] p-0">
        {/* Header */}
        <DialogHeader className="p-6 pb-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <CalendarDays className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <DialogTitle className="text-xl font-semibold text-gray-900">
                  Select Custom Period
                </DialogTitle>
                <DialogDescription className="text-sm text-gray-500 mt-1">
                  Choose from quick periods or select a custom date range
                </DialogDescription>
              </div>
            </div>
            <Button
              variant="ghost"
              onClick={handleCancel}
              className="p-1.5 hover:bg-gray-50 rounded-md"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="flex-1 p-4 sm:p-6 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 h-full">
            
            {/* Quick Periods - Enhanced with more options */}
            <div className="space-y-4 overflow-y-auto max-h-48 sm:max-h-none">
              <h3 className="font-medium text-gray-900 sticky top-0 bg-white py-2">Quick Periods</h3>
              <div className="space-y-1">
                {quickPeriods.map((period) => (
                  <Button
                    key={period.label}
                    variant="outline"
                    onClick={() => handleQuickPeriod(period)}
                    className="w-full justify-start text-left hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-all text-sm py-2 h-auto"
                  >
                    {period.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Date Selection */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              
              {/* Selected Range Display */}
              <Card className="p-3 sm:p-4 bg-gray-50 border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="space-y-2 w-full">
                    <h4 className="text-sm font-medium text-gray-700">Selected Period</h4>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                      <div className={`px-3 py-2 rounded-md border ${startDate ? 'bg-white border-gray-200' : 'bg-gray-100 border-gray-200'}`}>
                        <span className={`text-sm ${startDate ? 'text-gray-900' : 'text-gray-500'}`}>
                          {formatDate(startDate)}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                      <div className={`px-3 py-2 rounded-md border ${endDate ? 'bg-white border-gray-200' : 'bg-gray-100 border-gray-200'}`}>
                        <span className={`text-sm ${endDate ? 'text-gray-900' : 'text-gray-500'}`}>
                          {formatDate(endDate)}
                        </span>
                      </div>
                    </div>
                    {startDate && endDate && (
                      <p className="text-xs text-gray-500">
                        {Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))} days selected
                      </p>
                    )}
                  </div>
                </div>
              </Card>

              {/* Calendar Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Button
                    variant={step === 'start' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setStep('start')}
                    className="flex items-center gap-2"
                  >
                    {startDate && <Check className="w-3 h-3" />}
                    1. Start Date
                  </Button>
                  <Button
                    variant={step === 'end' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setStep('end')}
                    disabled={!startDate}
                    className="flex items-center gap-2"
                  >
                    {endDate && <Check className="w-3 h-3" />}
                    2. End Date
                  </Button>
                </div>

                {/* Calendar */}
                <div className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={step === 'start' ? startDate : endDate}
                    onSelect={step === 'start' ? handleStartDateSelect : handleEndDateSelect}
                    disabled={(date) => {
                      if (step === 'end' && startDate) {
                        return date < startDate;
                      }
                      return date > new Date();
                    }}
                    className="rounded-md border border-gray-200 bg-white"
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-3">
                    {error}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-4 border-t border-gray-100 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              {startDate && endDate ? (
                `${formatDate(startDate)} - ${formatDate(endDate)}`
              ) : (
                'Select start and end dates to continue'
              )}
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                onClick={handleApply}
                disabled={!startDate || !endDate}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Apply Period
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}