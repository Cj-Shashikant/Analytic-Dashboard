import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Calendar, X, TrendingUp, TrendingDown, BarChart3, ArrowRight, RefreshCw } from 'lucide-react';
import { CustomPeriodModal } from './CustomPeriodModal';

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentFilters: {
    selectedEntity: string;
    selectedReportType: string;
    selectedBusinessType: string;
    selectedLocation: string;
    selectedDuration: string;
    valueUnit: string;
  };
  baseMetricsData: any;
  onComparisonApply: (period1: string, period2: string, customDates?: {
    period1?: { start: Date; end: Date };
    period2?: { start: Date; end: Date };
  }) => void;
}

export function ComparisonModal({ 
  isOpen, 
  onClose, 
  currentFilters, 
  baseMetricsData,
  onComparisonApply 
}: ComparisonModalProps) {
  const [selectedPeriod1, setSelectedPeriod1] = useState(currentFilters.selectedDuration);
  const [selectedPeriod2, setSelectedPeriod2] = useState('');
  const [isCustomPeriod1Open, setIsCustomPeriod1Open] = useState(false);
  const [isCustomPeriod2Open, setIsCustomPeriod2Open] = useState(false);
  const [customPeriod1Dates, setCustomPeriod1Dates] = useState<{ start: Date; end: Date } | null>(null);
  const [customPeriod2Dates, setCustomPeriod2Dates] = useState<{ start: Date; end: Date } | null>(null);

  // All available duration options including common comparison periods
  const durationOptions = [
    // Current periods
    'FY 2023-24',
    'FY 2022-23',
    'FY 2021-22',
    'FY 2020-21',
    'FY 2019-20',
    
    // Quarters
    'Q4 2023-24',
    'Q3 2023-24',
    'Q2 2023-24',
    'Q1 2023-24',
    'Q4 2022-23',
    'Q3 2022-23',
    'Q2 2022-23',
    'Q1 2022-23',
    'Q4 2021-22',
    'Q3 2021-22',
    'Q2 2021-22',
    'Q1 2021-22',
    
    // Half years
    'H2 2023-24',
    'H1 2023-24',
    'H2 2022-23',
    'H1 2022-23',
    'H2 2021-22',
    'H1 2021-22',
    
    // Multi-period comparisons
    'Last 2 Quarters',
    'Last 3 Quarters',
    'Last 4 Quarters',
    'Last 2 Years',
    'Last 3 Years',
    'Last 5 Years',
    
    // Custom
    'Custom Period'
  ];

  // Quick comparison suggestions based on current period
  const getQuickComparisons = (currentPeriod: string) => {
    const suggestions = [];
    
    if (currentPeriod.includes('FY 2023-24')) {
      suggestions.push('FY 2022-23', 'FY 2021-22', 'Last 2 Years');
    } else if (currentPeriod.includes('Q4 2023-24')) {
      suggestions.push('Q4 2022-23', 'Q3 2023-24', 'Last 2 Quarters');
    } else if (currentPeriod.includes('Q3 2023-24')) {
      suggestions.push('Q3 2022-23', 'Q2 2023-24', 'Last 2 Quarters');
    } else {
      suggestions.push('FY 2022-23', 'Last 2 Years', 'Last 3 Quarters');
    }
    
    return suggestions;
  };

  const quickComparisons = getQuickComparisons(selectedPeriod1);

  const handlePeriod1Change = (value: string) => {
    setSelectedPeriod1(value);
    if (value === 'Custom Period') {
      setIsCustomPeriod1Open(true);
    }
  };

  const handlePeriod2Change = (value: string) => {
    setSelectedPeriod2(value);
    if (value === 'Custom Period') {
      setIsCustomPeriod2Open(true);
    }
  };

  const handleCustomPeriod1Apply = (startDate: Date, endDate: Date) => {
    setCustomPeriod1Dates({ start: startDate, end: endDate });
    setSelectedPeriod1('Custom Period');
    setIsCustomPeriod1Open(false);
  };

  const handleCustomPeriod2Apply = (startDate: Date, endDate: Date) => {
    setCustomPeriod2Dates({ start: startDate, end: endDate });
    setSelectedPeriod2('Custom Period');
    setIsCustomPeriod2Open(false);
  };

  const getDisplayPeriod = (period: string, customDates?: { start: Date; end: Date } | null) => {
    if (period === 'Custom Period' && customDates) {
      const start = customDates.start.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      });
      const end = customDates.end.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric' 
      });
      return `${start} - ${end}`;
    }
    return period;
  };

  const handleApplyComparison = () => {
    if (selectedPeriod1 && selectedPeriod2) {
      const customDates = {
        period1: customPeriod1Dates,
        period2: customPeriod2Dates
      };
      onComparisonApply(selectedPeriod1, selectedPeriod2, customDates);
      onClose();
    }
  };

  const swapPeriods = () => {
    const tempPeriod = selectedPeriod1;
    const tempDates = customPeriod1Dates;
    
    setSelectedPeriod1(selectedPeriod2);
    setCustomPeriod1Dates(customPeriod2Dates);
    
    setSelectedPeriod2(tempPeriod);
    setCustomPeriod2Dates(tempDates);
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="right" className="w-full sm:w-[600px] p-0 border-l">
          {/* Header */}
          <SheetHeader className="p-6 pb-4 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <SheetTitle className="text-xl font-semibold text-gray-900">Duration Comparison</SheetTitle>
                  <SheetDescription className="text-sm text-gray-600 mt-1">
                    Compare performance across different time periods
                  </SheetDescription>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onClose} 
                className="rounded-full h-8 w-8 p-0 hover:bg-gray-100"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </SheetHeader>

          {/* Content */}
          <div className="p-6 space-y-6 overflow-y-auto h-full">
            {/* Current Context */}
            <Card className="p-4 bg-blue-50 border-blue-200">
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-blue-600" />
                <div>
                  <h3 className="text-sm font-semibold text-blue-900">Current Context</h3>
                  <p className="text-xs text-blue-700 mt-1">
                    {currentFilters.selectedEntity} • {currentFilters.selectedReportType} • {currentFilters.selectedLocation}
                  </p>
                </div>
              </div>
            </Card>

            {/* Period Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Select Periods to Compare</h3>
              
              {/* Period 1 */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Period 1 (Primary)</label>
                <Select value={selectedPeriod1} onValueChange={handlePeriod1Change}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select first period">
                      {getDisplayPeriod(selectedPeriod1, customPeriod1Dates)}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {durationOptions.map((period) => (
                      <SelectItem key={period} value={period}>
                        {period}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={swapPeriods}
                  disabled={!selectedPeriod1 || !selectedPeriod2}
                  className="px-3 py-1 text-xs"
                >
                  <RefreshCw className="w-3 h-3 mr-1" />
                  Swap
                </Button>
              </div>

              {/* Period 2 */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Period 2 (Comparison)</label>
                <Select value={selectedPeriod2} onValueChange={handlePeriod2Change}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select second period">
                      {selectedPeriod2 ? getDisplayPeriod(selectedPeriod2, customPeriod2Dates) : 'Select second period'}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {durationOptions.map((period) => (
                      <SelectItem key={period} value={period}>
                        {period}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Quick Comparison Suggestions */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-700">Quick Comparison Suggestions</h4>
              <div className="grid grid-cols-1 gap-2">
                {quickComparisons.map((suggestion) => (
                  <Button
                    key={suggestion}
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedPeriod2(suggestion)}
                    className="justify-start text-left h-auto py-2 px-3"
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs font-medium">
                        {getDisplayPeriod(selectedPeriod1, customPeriod1Dates)}
                      </span>
                      <ArrowRight className="w-3 h-3 mx-2 text-gray-400" />
                      <span className="text-xs text-gray-600">{suggestion}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            {/* Popular Comparison Patterns */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-700">Popular Comparison Patterns</h4>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedPeriod1('FY 2023-24');
                    setSelectedPeriod2('FY 2022-23');
                  }}
                  className="text-xs h-auto py-2"
                >
                  Year over Year
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedPeriod1('Q4 2023-24');
                    setSelectedPeriod2('Q3 2023-24');
                  }}
                  className="text-xs h-auto py-2"
                >
                  Quarter over Quarter
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedPeriod1('Last 2 Years');
                    setSelectedPeriod2('Last 3 Years');
                  }}
                  className="text-xs h-auto py-2"
                >
                  Multi-Year Trend
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedPeriod1('Last 4 Quarters');
                    setSelectedPeriod2('FY 2022-23');
                  }}
                  className="text-xs h-auto py-2"
                >
                  Rolling vs Fixed
                </Button>
              </div>
            </div>

            {/* Preview */}
            {selectedPeriod1 && selectedPeriod2 && (
              <Card className="p-4 bg-green-50 border-green-200">
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-green-900">Comparison Preview</h4>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="font-medium text-green-800">
                        {getDisplayPeriod(selectedPeriod1, customPeriod1Dates)}
                      </span>
                    </div>
                    <span className="text-green-600">vs</span>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span className="font-medium text-green-800">
                        {getDisplayPeriod(selectedPeriod2, customPeriod2Dates)}
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-green-700">
                    Report: {currentFilters.selectedReportType} • Values in {currentFilters.valueUnit}
                  </div>
                </div>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                onClick={handleApplyComparison}
                disabled={!selectedPeriod1 || !selectedPeriod2}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Compare Periods
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Custom Period Modals */}
      {isCustomPeriod1Open && (
        <CustomPeriodModal
          isOpen={isCustomPeriod1Open}
          onClose={() => setIsCustomPeriod1Open(false)}
          onApply={handleCustomPeriod1Apply}
          currentStartDate={customPeriod1Dates?.start}
          currentEndDate={customPeriod1Dates?.end}
        />
      )}

      {isCustomPeriod2Open && (
        <CustomPeriodModal
          isOpen={isCustomPeriod2Open}
          onClose={() => setIsCustomPeriod2Open(false)}
          onApply={handleCustomPeriod2Apply}
          currentStartDate={customPeriod2Dates?.start}
          currentEndDate={customPeriod2Dates?.end}
        />
      )}
    </>
  );
}