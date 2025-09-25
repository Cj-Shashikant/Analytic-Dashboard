import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { CalendarDays, Building2, BarChart3, Clock, DollarSign, Users, Filter, Trophy, ChevronDown } from 'lucide-react';
import { Checkbox } from './ui/checkbox';
import { LeaderboardModal } from './LeaderboardModal';

interface DashboardHeaderProps {
  selectedEntity: string;
  setSelectedEntity: (value: string) => void;
  selectedReportType: string;
  setSelectedReportType: (value: string) => void;
  selectedBusinessType: string;
  setSelectedBusinessType: (value: string) => void;
  selectedDuration: string;
  setSelectedDuration: (value: string) => void;
  valueUnit: string;
  setValueUnit: (value: string) => void;
  selectedBuyerType: string;
  setSelectedBuyerType: (value: string) => void;
  fullScreen?: boolean;
  onToggleFullScreen?: () => void;
}

export function DashboardHeader({
  selectedEntity,
  setSelectedEntity,
  selectedReportType,
  setSelectedReportType,
  selectedBusinessType,
  setSelectedBusinessType,
  selectedDuration,
  setSelectedDuration,
  valueUnit,
  setValueUnit,
  selectedBuyerType,
  setSelectedBuyerType,
  fullScreen = false,
  onToggleFullScreen
}: DashboardHeaderProps) {
  const [selectedBuyerTypes, setSelectedBuyerTypes] = useState<string[]>(['Corporate', 'Retail', 'Affinity']);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);

  const entities = [
    'ABC Broking Pvt Ltd',
    'XYZ Insurance Agency',
    'PQR Financial Services',
    'DEF Risk Management'
  ];

  const reportTypes = [
    'Revenue vs Expenses',
    'Revenue by Products',
    'Revenue by Insurers', 
    'Revenue by Policy Type',
    'Revenue by Business Vertical',
    'Revenue by LOB',
    'Retention Analysis',
    'Retention - By Insurer',
    'Retention - Broker'
  ];

  const businessTypes = [
    'Business',
    'Operations', 
    'Finance',
    'Marketing',
    'Sales'
  ];

  const durations = [
    'FY 2023-24',
    'FY 2022-23',
    'FY 2021-22',
    'Q4 2023-24',
    'Q3 2023-24',
    'Q2 2023-24',
    'Q1 2023-24'
  ];

  const valueUnits = [
    'Thousands',
    'Lakh', 
    'Crore'
  ];

  const getUnitColor = (unit: string) => {
    switch (unit) {
      case 'Thousands':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Lakh':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Crore':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const toggleBuyerType = (type: string) => {
    setSelectedBuyerTypes(prev => {
      if (prev.includes(type)) {
        return prev.filter(t => t !== type);
      } else {
        return [...prev, type];
      }
    });
  };

  // Cycle through value units when the single button is clicked
  const cycleValueUnit = () => {
    const currentIndex = valueUnits.indexOf(valueUnit);
    const nextIndex = (currentIndex + 1) % valueUnits.length;
    setValueUnit(valueUnits[nextIndex]);
  };

  // Container class based on full screen mode
  const containerClass = fullScreen 
    ? "w-[1440px] h-[1024px] bg-white overflow-hidden flex flex-col" 
    : "";

  const headerClass = fullScreen 
    ? "flex-1 p-8" 
    : "mb-6";

  return (
    <div className={containerClass}>
      <div className={headerClass}>
        <Card className={`${fullScreen ? 'h-full' : ''} p-6 border-0 shadow-sm bg-white rounded-xl`}>
          {/* Header Title - Removed Full Screen Toggle */}
          <div className="flex items-center justify-start mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-blue-50">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className={`${fullScreen ? 'text-2xl' : 'text-xl'} font-semibold text-gray-900`}>
                  Analytics Dashboard
                </h1>
                <p className={`${fullScreen ? 'text-base' : 'text-sm'} text-gray-500 mt-1`}>
                  Configure your dashboard settings and filters
                </p>
              </div>
            </div>
          </div>

          {/* Main Filters - Single Row Layout */}
          <div className={`${fullScreen ? 'space-y-8' : 'mb-6'}`}>
            {fullScreen ? (
              // Full screen: Stack vertically with larger spacing
              <div className="space-y-8">
                {/* Organization Selection */}
                <div className="p-6 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Building2 className="w-4 h-4 text-gray-600" />
                    <label className="text-lg font-medium text-gray-700">
                      Name of Organisation
                    </label>
                  </div>
                  <Select value={selectedEntity} onValueChange={setSelectedEntity}>
                    <SelectTrigger className="h-12 text-base bg-white border-gray-200">
                      <SelectValue placeholder="Select organization" />
                    </SelectTrigger>
                    <SelectContent>
                      {entities.map((entity) => (
                        <SelectItem key={entity} value={entity} className="text-base py-3">
                          {entity}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Department Selection */}
                <div className="p-6 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="w-4 h-4 text-gray-600" />
                    <label className="text-lg font-medium text-gray-700">
                      Department
                    </label>
                  </div>
                  <Select value={selectedBusinessType} onValueChange={setSelectedBusinessType}>
                    <SelectTrigger className="h-12 text-base bg-white border-gray-200">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {businessTypes.map((type) => (
                        <SelectItem key={type} value={type} className="text-base py-3">
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Report Type Selection */}
                <div className="p-6 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <BarChart3 className="w-4 h-4 text-gray-600" />
                    <label className="text-lg font-medium text-gray-700">
                      Type of Report
                    </label>
                  </div>
                  <Select value={selectedReportType} onValueChange={setSelectedReportType}>
                    <SelectTrigger className="h-12 text-base bg-white border-gray-200">
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      {reportTypes.map((type) => (
                        <SelectItem key={type} value={type} className="text-base py-3">
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Report Period Selection */}
                <div className="p-6 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <CalendarDays className="w-4 h-4 text-gray-600" />
                    <label className="text-lg font-medium text-gray-700">
                      Report Period
                    </label>
                  </div>
                  <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                    <SelectTrigger className="h-12 text-base bg-white border-gray-200">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      {durations.map((duration) => (
                        <SelectItem key={duration} value={duration} className="text-base py-3">
                          {duration}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Values Unit Selection - Single Button with Leaderboard */}
                <div className="p-6 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <DollarSign className="w-4 h-4 text-gray-600" />
                    <label className="text-lg font-medium text-gray-700">
                      Values in
                    </label>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="default"
                      onClick={cycleValueUnit}
                      className={`${getUnitColor(valueUnit)} px-6 py-3 text-base transition-all flex items-center gap-2`}
                    >
                      <span>{valueUnit}</span>
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="default"
                      onClick={() => setIsLeaderboardOpen(true)}
                      className="p-3 hover:bg-amber-50 hover:border-amber-200 hover:text-amber-700 transition-all"
                      title="View Leaderboard"
                    >
                      <Trophy className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              // Normal view: Single row layout
              <div className="grid grid-cols-5 gap-4">
                
                {/* Organization Selection */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-3">
                    <Building2 className="w-4 h-4 text-gray-600" />
                    <label className="text-sm font-medium text-gray-700 truncate">
                      Organisation
                    </label>
                  </div>
                  <Select value={selectedEntity} onValueChange={setSelectedEntity}>
                    <SelectTrigger className="h-10 bg-white border-gray-200 text-sm">
                      <SelectValue placeholder="Select organization" />
                    </SelectTrigger>
                    <SelectContent>
                      {entities.map((entity) => (
                        <SelectItem key={entity} value={entity}>
                          {entity}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Department Selection */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="w-4 h-4 text-gray-600" />
                    <label className="text-sm font-medium text-gray-700 truncate">
                      Department
                    </label>
                  </div>
                  <Select value={selectedBusinessType} onValueChange={setSelectedBusinessType}>
                    <SelectTrigger className="h-10 bg-white border-gray-200 text-sm">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {businessTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Report Type Selection */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-3">
                    <BarChart3 className="w-4 h-4 text-gray-600" />
                    <label className="text-sm font-medium text-gray-700 truncate">
                      Type of Report
                    </label>
                  </div>
                  <Select value={selectedReportType} onValueChange={setSelectedReportType}>
                    <SelectTrigger className="h-10 bg-white border-gray-200 text-sm">
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      {reportTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Report Period Selection */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-3">
                    <CalendarDays className="w-4 h-4 text-gray-600" />
                    <label className="text-sm font-medium text-gray-700 truncate">
                      Report Period
                    </label>
                  </div>
                  <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                    <SelectTrigger className="h-10 bg-white border-gray-200 text-sm">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      {durations.map((duration) => (
                        <SelectItem key={duration} value={duration}>
                          {duration}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Values Unit Selection - Single Button with Leaderboard */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-3">
                    <DollarSign className="w-4 h-4 text-gray-600" />
                    <label className="text-sm font-medium text-gray-700 truncate">
                      Values in
                    </label>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={cycleValueUnit}
                      className={`${getUnitColor(valueUnit)} px-2 py-1.5 text-xs transition-all flex items-center gap-1 flex-1 min-w-0`}
                    >
                      <span className="truncate">{valueUnit}</span>
                      <ChevronDown className="w-3 h-3 flex-shrink-0" />
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsLeaderboardOpen(true)}
                      className="p-1.5 hover:bg-amber-50 hover:border-amber-200 hover:text-amber-700 transition-all flex-shrink-0"
                      title="View Leaderboard"
                    >
                      <Trophy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Buyer Type Filter - Checkboxes (Full Screen Only) */}
          {fullScreen && (
            <div className="p-6 bg-gray-50 rounded-lg mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-gray-600" />
                <label className="text-lg font-medium text-gray-700">Buyer Type</label>
              </div>
              <div className="flex gap-6">
                {['Corporate', 'Retail', 'Affinity'].map((type) => (
                  <div key={type} className="flex items-center space-x-3">
                    <Checkbox
                      id={type}
                      checked={selectedBuyerTypes.includes(type)}
                      onCheckedChange={() => toggleBuyerType(type)}
                      className="w-5 h-5"
                    />
                    <label 
                      htmlFor={type} 
                      className="text-base text-gray-700 cursor-pointer"
                    >
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Full Screen Summary */}
          {fullScreen && (
            <div className="mt-8 p-6 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-medium text-blue-900 mb-3">Current Configuration</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-blue-800">Organization:</span>
                  <span className="ml-2 text-blue-700">{selectedEntity}</span>
                </div>
                <div>
                  <span className="font-medium text-blue-800">Department:</span>
                  <span className="ml-2 text-blue-700">{selectedBusinessType}</span>
                </div>
                <div>
                  <span className="font-medium text-blue-800">Report Type:</span>
                  <span className="ml-2 text-blue-700">{selectedReportType}</span>
                </div>
                <div>
                  <span className="font-medium text-blue-800">Period:</span>
                  <span className="ml-2 text-blue-700">{selectedDuration}</span>
                </div>
                <div>
                  <span className="font-medium text-blue-800">Values:</span>
                  <span className="ml-2 text-blue-700">{valueUnit}</span>
                </div>
                <div>
                  <span className="font-medium text-blue-800">Buyer Types:</span>
                  <span className="ml-2 text-blue-700">{selectedBuyerTypes.join(', ')}</span>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Leaderboard Modal */}
        <LeaderboardModal 
          isOpen={isLeaderboardOpen} 
          onClose={() => setIsLeaderboardOpen(false)} 
        />
      </div>
    </div>
  );
}