import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { X, Download, Maximize2, Filter, ChevronDown } from 'lucide-react';
import { ThreeDotsMenu } from './ThreeDotsMenu';
import { ChartType } from './ChartTypeSwitcher';
import { AdvancedFilters } from './AdvancedFilters';

interface FullScreenChartModalEnhancedProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  chartComponent: React.ReactNode;
  legendComponent?: React.ReactNode;
  chartType: ChartType;
  onChartTypeChange: (type: ChartType) => void;
  onDownload: (format: string) => void;
  badges?: React.ReactNode;
  centerIcon?: React.ReactNode;
  additionalInfo?: string;
  // New props for filtering
  isExpenses?: boolean;
  expenseFilter?: string;
  onExpenseFilterChange?: (filter: string) => void;
  filterOptions?: string[];
  // Comprehensive filter props
  showAdvancedFilters?: boolean;
  onAdvancedFiltersChange?: (filters: any) => void;
}

export function FullScreenChartModalEnhanced({
  isOpen,
  onClose,
  title,
  subtitle,
  chartComponent,
  legendComponent,
  chartType,
  onChartTypeChange,
  onDownload,
  badges,
  centerIcon,
  additionalInfo,
  isExpenses = false,
  expenseFilter = 'Top 10',
  onExpenseFilterChange,
  filterOptions = ['Top 5', 'Top 10', 'Top 15', 'Top 20', 'All'],
  showAdvancedFilters = false,
  onAdvancedFiltersChange
}: FullScreenChartModalEnhancedProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({ insurers: 0, regions: 0 });
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[1440px] h-[1040px] max-w-none max-h-none p-0 bg-white overflow-hidden">
        <div className="flex flex-col h-full">
          {/* Header - Fixed height, no scroll */}
          <DialogHeader className="flex-shrink-0 p-6 pb-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Maximize2 className="w-5 h-5 text-gray-500" />
                <div>
                  <DialogTitle className="text-xl font-semibold text-gray-800">
                    {title}
                  </DialogTitle>
                  <DialogDescription className="text-sm text-gray-600 mt-1">
                    {subtitle}
                    {additionalInfo && ` • ${additionalInfo}`}
                  </DialogDescription>
                  {additionalInfo && (
                    <Badge className="mt-2 text-xs border-0 bg-blue-50 text-blue-700">
                      {additionalInfo}
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Comprehensive Filter - Show when enabled */}
                {showAdvancedFilters && (
                  <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className={`h-8 gap-2 text-xs ${(activeFilters.insurers > 0 || activeFilters.regions > 0) ? 'bg-blue-50 border-blue-200 text-blue-700' : ''}`}
                      >
                        <Filter className="w-4 h-4" />
                        Advanced Filters
                        {(activeFilters.insurers > 0 || activeFilters.regions > 0) && (
                          <Badge variant="secondary" className="ml-1 px-1.5 py-0 text-xs bg-blue-100 text-blue-700">
                            {activeFilters.insurers + activeFilters.regions}
                          </Badge>
                        )}
                        <ChevronDown className="w-3 h-3" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-0" align="end">
                      <AdvancedFilters
                        onFilterChange={(filters) => {
                          setActiveFilters({
                            insurers: filters.insurers?.length || 0,
                            regions: filters.regions?.length || 0
                          });
                          onAdvancedFiltersChange?.(filters);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                )}
                
                {/* Expense Filter - Only show for expenses when comprehensive filter is not shown */}
                {isExpenses && onExpenseFilterChange && !showAdvancedFilters && (
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-gray-500" />
                    <Select value={expenseFilter} onValueChange={onExpenseFilterChange}>
                      <SelectTrigger className="w-32 h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {filterOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                
                <ThreeDotsMenu 
                  currentChartType={chartType}
                  onChartTypeChange={onChartTypeChange}
                  onDownload={onDownload}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onClose}
                  className="h-8 w-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </DialogHeader>

          {/* Chart Content - Takes remaining space */}
          <div className="flex-1 flex overflow-hidden">
            {/* Chart Side - Fixed width, no scroll */}
            <div className="w-3/5 flex items-center justify-center p-8 bg-gray-50/30">
              <div className="w-full h-full max-w-4xl max-h-[700px] flex items-center justify-center">
                {chartComponent}
              </div>
              {/* Center icon for donut charts */}
              {centerIcon}
            </div>
            
            {/* Information Side - Fixed width, scrollable content only */}
            <div className="w-2/5 flex flex-col border-l border-gray-200 bg-white">
              {/* Legend Header - Fixed */}
              <div className="flex-shrink-0 p-6 pb-4 border-b border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900">
                  {title.includes('Revenue') ? 'Revenue Breakdown' : 
                   title.includes('Expense') ? 'Expenses Breakdown' : 
                   `${title} Breakdown`}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Detailed analysis and category breakdown
                </p>
              </div>
              
              {/* Legend Content - Scrollable */}
              <div className="flex-1 overflow-y-auto p-6">
                {legendComponent && (
                  <div className="h-full">
                    {legendComponent}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}