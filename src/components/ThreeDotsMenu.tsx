import React, { useState } from 'react';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from './ui/dropdown-menu';
import { MoreVertical, PieChart, BarChart3, TrendingUp, LineChart, Table, Download, FileSpreadsheet, FileText, Presentation } from 'lucide-react';
import { ChartType } from './ChartTypeSwitcher';

interface ThreeDotsMenuProps {
  currentChartType: ChartType;
  onChartTypeChange: (type: ChartType) => void;
  onDownload: (format: string) => void;
  onPresentationMode?: () => void;
  className?: string;
}

export function ThreeDotsMenu({ 
  currentChartType, 
  onChartTypeChange, 
  onDownload,
  onPresentationMode,
  className = '' 
}: ThreeDotsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Version 82 Chart Types with Enhanced Options
  const chartTypes = [
    { type: 'donut' as ChartType, label: 'Donut Chart', icon: PieChart, description: 'Circular chart with center hole' },
    { type: 'bar' as ChartType, label: 'Bar Chart', icon: BarChart3, description: 'Vertical bars comparison' },
    { type: 'line' as ChartType, label: 'Line Chart', icon: LineChart, description: 'Trend visualization' },
    { type: 'stackedBar' as ChartType, label: 'Stacked Bar', icon: TrendingUp, description: 'Multi-category bars' },
    { type: 'table' as ChartType, label: 'Table View', icon: Table, description: 'Detailed data table' }
  ];

  // Enhanced Download Options for Version 82
  const downloadFormats = [
    { format: 'csv', label: 'Download as CSV', icon: FileSpreadsheet, description: 'Comma-separated values' },
    { format: 'excel', label: 'Download as Excel', icon: FileSpreadsheet, description: 'Microsoft Excel format' },
    { format: 'pdf', label: 'Download as PDF', icon: FileText, description: 'Portable document format' },
    { format: 'png', label: 'Save as Image', icon: Download, description: 'High-quality PNG image' }
  ];

  const handleChartTypeSelect = (type: ChartType) => {
    onChartTypeChange(type);
    setIsOpen(false);
  };

  const handleDownloadSelect = (format: string) => {
    onDownload(format);
    setIsOpen(false);
  };

  const handlePresentationMode = () => {
    if (onPresentationMode) {
      onPresentationMode();
    }
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={`h-9 w-9 p-0 hover:bg-gray-50 border-gray-200 rounded-lg transition-all ${className}`}
        >
          <MoreVertical className="w-4 h-4 text-gray-600" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-56 p-1 bg-white border border-gray-200 rounded-xl shadow-lg">
        {/* Chart Type Section - Version 82 Enhanced */}
        <div className="px-3 py-2 border-b border-gray-100">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
            Chart Format
          </div>
          <div className="text-xs text-gray-400">Version 82 Professional</div>
        </div>
        
        {chartTypes.map((chart) => {
          const IconComponent = chart.icon;
          const isSelected = currentChartType === chart.type;
          
          return (
            <DropdownMenuItem
              key={chart.type}
              onClick={() => handleChartTypeSelect(chart.type)}
              className={`cursor-pointer m-1 p-3 rounded-lg transition-all ${
                isSelected 
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' 
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center w-full">
                <div className={`p-1.5 rounded-md mr-3 ${
                  isSelected ? 'bg-indigo-100' : 'bg-gray-100'
                }`}>
                  <IconComponent className={`w-4 h-4 ${
                    isSelected ? 'text-indigo-600' : 'text-gray-600'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-medium ${
                    isSelected ? 'text-indigo-900' : 'text-gray-900'
                  }`}>
                    {chart.label}
                  </div>
                  <div className={`text-xs ${
                    isSelected ? 'text-indigo-600' : 'text-gray-500'
                  }`}>
                    {chart.description}
                  </div>
                </div>
                {isSelected && (
                  <div className="w-2 h-2 rounded-full bg-indigo-600 ml-2"></div>
                )}
              </div>
            </DropdownMenuItem>
          );
        })}
        
        <DropdownMenuSeparator className="my-2 bg-gray-100" />
        
        {/* Presentation Mode Section */}
        {onPresentationMode && (
          <>
            <div className="px-3 py-2 border-b border-gray-100">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                View Mode
              </div>
              <div className="text-xs text-gray-400">Full-screen presentation experience</div>
            </div>
            
            <DropdownMenuItem
              onClick={handlePresentationMode}
              className="cursor-pointer m-1 p-3 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all"
            >
              <div className="flex items-center w-full">
                <div className="p-1.5 rounded-md bg-gradient-to-r from-blue-100 to-indigo-100 mr-3">
                  <Presentation className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900">
                    Presentation Mode
                  </div>
                  <div className="text-xs text-gray-500">
                    Auto-slide with navigation controls
                  </div>
                </div>
              </div>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator className="my-2 bg-gray-100" />
          </>
        )}
        
        {/* Download Section - Version 82 Enhanced */}
        <div className="px-3 py-2 border-b border-gray-100">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
            Export Data
          </div>
          <div className="text-xs text-gray-400">Download in various formats</div>
        </div>
        
        {downloadFormats.map((download) => {
          const IconComponent = download.icon;
          
          return (
            <DropdownMenuItem
              key={download.format}
              onClick={() => handleDownloadSelect(download.format)}
              className="cursor-pointer m-1 p-3 rounded-lg hover:bg-gray-50 transition-all"
            >
              <div className="flex items-center w-full">
                <div className="p-1.5 rounded-md bg-gray-100 mr-3">
                  <IconComponent className="w-4 h-4 text-gray-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900">
                    {download.label}
                  </div>
                  <div className="text-xs text-gray-500">
                    {download.description}
                  </div>
                </div>
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}