import React, { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { X, Settings, Filter, Calendar, Users, Building2, MapPin, Target, Palette, Eye, Save, RotateCcw, DollarSign, Pin, PinOff, Check, Layers, Sliders, Monitor, BarChart, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';

interface AdvancedFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  // Real-time filter props
  valueUnit: string;
  onValueUnitChange: (unit: string) => void;
  topExpenseCategories: string;
  onTopExpenseCategoriesChange: (value: string) => void;
  // Add more filter props as needed
  selectedEntity: string;
  selectedBusinessType: string;
  selectedLocation: string;
  selectedReportType: string;
  selectedDuration: string;
  // Pinned items props
  pinnedItems: string[];
  onPinnedItemsChange: (pinnedItems: string[]) => void;
}

export function AdvancedFilters({ 
  isOpen, 
  onClose, 
  valueUnit, 
  onValueUnitChange, 
  topExpenseCategories, 
  onTopExpenseCategoriesChange,
  selectedEntity,
  selectedBusinessType,
  selectedLocation,
  selectedReportType,
  selectedDuration,
  pinnedItems,
  onPinnedItemsChange
}: AdvancedFiltersProps) {
  // Date Range Filters
  const [dateRange, setDateRange] = useState('FY 2022-23');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  
  // Regional Filters
  const [selectedRegions, setSelectedRegions] = useState<string[]>(['Mumbai', 'Delhi', 'Bangalore']);
  const [selectedStates, setSelectedStates] = useState<string[]>(['Maharashtra', 'Delhi', 'Karnataka']);
  const [selectedCities, setSelectedCities] = useState<string[]>(['Mumbai', 'Delhi', 'Bangalore']);
  
  // Team Filters
  const [selectedTeams, setSelectedTeams] = useState<string[]>(['Sales Team A', 'Sales Team B']);
  const [selectedMembers, setSelectedMembers] = useState<string[]>(['All Members']);
  const [performanceRange, setPerformanceRange] = useState([0, 100]);
  
  // Product Filters
  const [selectedProducts, setSelectedProducts] = useState<string[]>(['Health Insurance', 'Motor Insurance']);
  const [selectedInsurers, setSelectedInsurers] = useState<string[]>(['ICICI Lombard', 'HDFC ERGO']);
  const [policyTypes, setPolicyTypes] = useState<string[]>(['Individual', 'Group']);
  
  // Business Filters
  const [businessVerticals, setBusinessVerticals] = useState<string[]>(['Corporate', 'Retail']);
  const [clientTypes, setClientTypes] = useState<string[]>(['New', 'Existing']);
  const [revenueRange, setRevenueRange] = useState([0, 10000000]);
  
  // Display Settings
  const [chartType, setChartType] = useState('donut');
  const [showPercentages, setShowPercentages] = useState(true);
  const [showLegend, setShowLegend] = useState(true);
  const [animateCharts, setAnimateCharts] = useState(true);
  const [colorScheme, setColorScheme] = useState('professional');
  const [refreshInterval, setRefreshInterval] = useState('manual');

  // Advanced Settings
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(false);
  const [exportFormat, setExportFormat] = useState('xlsx');
  
  // More options state
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  // Primary filter options data (from App.tsx)
  const entities = [
    'ABC Broking Pvt Ltd',
    'XYZ Insurance Agency',
    'PQR Financial Services',
    'DEF Risk Management'
  ];

  const businessTypes = [
    'Business',
    'Operations', 
    'Finance',
    'Marketing',
    'Sales',
    'Retention'
  ];

  const reportTypes = {
    'Business': [
      'Revenue vs Expenses',
      'Revenue by Products',
      'Revenue by Insurers', 
      'Revenue by Policy Type',
      'Revenue by Vertical',
      'Revenue by LOB',
      'Cross-Sell Penetration'
    ],
    'Operations': [
      'Revenue vs Expenses',
      'Revenue by Products',
      'Revenue by Insurers', 
      'Revenue by Policy Type',
      'Revenue by Vertical',
      'Revenue by LOB',
      'Cross-Sell Penetration'
    ],
    'Finance': [
      'Revenue vs Expenses',
      'Revenue by Products',
      'Revenue by Insurers', 
      'Revenue by Policy Type',
      'Revenue by Vertical',
      'Revenue by LOB',
      'Cross-Sell Penetration'
    ],
    'Marketing': [
      'Revenue vs Expenses',
      'Revenue by Products',
      'Revenue by Insurers', 
      'Revenue by Policy Type',
      'Revenue by Vertical',
      'Revenue by LOB',
      'Cross-Sell Penetration'
    ],
    'Sales': [
      'Revenue vs Expenses',
      'Revenue by Products',
      'Revenue by Insurers', 
      'Revenue by Policy Type',
      'Revenue by Vertical',
      'Revenue by LOB',
      'Cross-Sell Penetration'
    ],
    'Retention': [
      'Retention - By Insurer',
      'Retention - Broker'
    ]
  };

  const locations = {
    'Business': [
      'All Location',
      'Mumbai',
      'Delhi',
      'Bangalore',
      'Chennai',
      'Hyderabad',
      'Pune',
      'Kolkata',
      'Ahmedabad'
    ],
    'Operations': [
      'All Location',
      'Mumbai HQ',
      'Delhi Operations',
      'Bangalore Tech Hub',
      'Chennai Support',
      'Hyderabad Center',
      'Pune Office',
      'Remote Teams'
    ],
    'Finance': [
      'All Location',
      'Mumbai Finance',
      'Delhi Treasury',
      'Bangalore Accounts',
      'Chennai Audit',
      'Corporate Finance',
      'Regional Finance'
    ],
    'Marketing': [
      'All Location',
      'Mumbai Marketing',
      'Delhi Campaign',
      'Bangalore Digital',
      'Chennai Creative',
      'National Marketing',
      'Regional Marketing'
    ],
    'Sales': [
      'All Location',
      'Mumbai Sales',
      'Delhi Sales',
      'Bangalore Sales',
      'Chennai Sales',
      'Hyderabad Sales',
      'Pune Sales',
      'Kolkata Sales',
      'Ahmedabad Sales',
      'Online Sales'
    ],
    'Retention': [
      'All Location',
      'Mumbai Retention',
      'Delhi Retention',
      'Bangalore Retention',
      'Chennai Retention',
      'Regional Retention',
      'Corporate Retention',
      'Retail Retention'
    ]
  };

  const durations = [
    'FY 2023-24',
    'FY 2022-23',
    'FY 2021-22',
    'Q4 2023-24',
    'Q3 2023-24',
    'Q2 2023-24',
    'Q1 2023-24',
    'Custom Period'
  ];

  const valueUnits = [
    'K',
    'L', 
    'C'
  ];

  const topExpenseOptions = [
    'Top 5',
    'Top 10',
    'Top 15',
    'Top 20',
    'All'
  ];

  // Regional filters
  const regions = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata', 'Ahmedabad'];
  const states = ['Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Telangana', 'Gujarat', 'West Bengal'];
  const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Lucknow'];
  
  // Team filters
  const teams = ['Sales Team A', 'Sales Team B', 'Sales Team C', 'Marketing Team', 'Operations Team', 'Support Team'];
  const members = ['All Members', 'Top Performers', 'Neeta', 'Soham', 'Victoria', 'Cameron', 'Arlene', 'Ritesh S'];
  
  // Product filters
  const products = ['Health Insurance', 'Motor Insurance', 'Life Insurance', 'Property Insurance', 'Travel Insurance'];
  const insurers = [
    'ICICI Lombard', 'HDFC ERGO', 'Bajaj Allianz', 'Tata AIG', 'Reliance General', 'New India Assurance',
    'National Insurance', 'Oriental Insurance', 'United India Insurance', 'IFFCO-Tokio', 'Future Generali',
    'Cholamandalam MS', 'Go Digit', 'Liberty General', 'SBI General', 'Royal Sundaram', 'Shriram General',
    'Raheja QBE', 'Kotak Mahindra', 'Acko General', 'DHFL General', 'Magma HDI', 'Universal Sompo',
    'Bharti AXA', 'Edelweiss General', 'L&T General', 'Navi General', 'Zuno General', 'Care Health',
    'Star Health', 'Manipal Cigna', 'Max Bupa', 'Apollo Munich', 'Religare Health', 'Aditya Birla Health'
  ];

  // All available filter items with metadata - Removed X/Y axis controls
  const allFilterItems = [
    { id: 'organisation', name: 'Organisation', icon: Building2, currentValue: selectedEntity, category: 'Primary' },
    { id: 'department', name: 'Department', icon: Users, currentValue: selectedBusinessType, category: 'Primary' },
    { id: 'reportType', name: 'Report Type', icon: Target, currentValue: selectedReportType, category: 'Primary' },
    { id: 'location', name: 'Location', icon: MapPin, currentValue: selectedLocation, category: 'Primary' },
    { id: 'duration', name: 'Duration', icon: Calendar, currentValue: selectedDuration, category: 'Primary' },
    { id: 'valueUnit', name: 'Value Unit', icon: DollarSign, currentValue: valueUnit, category: 'Display' },
    { id: 'topExpenses', name: 'Expense Categories', icon: Target, currentValue: topExpenseCategories, category: 'Display' },
    { id: 'teams', name: 'Teams', icon: Users, currentValue: `${selectedTeams.length} selected`, category: 'Team' },
    { id: 'regions', name: 'Regions', icon: MapPin, currentValue: `${selectedRegions.length} selected`, category: 'Regional' },
    { id: 'products', name: 'Products', icon: Building2, currentValue: `${selectedProducts.length} selected`, category: 'Business' },
    { id: 'insurers', name: 'Insurers', icon: Building2, currentValue: `${selectedInsurers.length} selected`, category: 'Business' },
  ];

  const toggleArrayItem = (array: string[], setArray: (arr: string[]) => void, item: string) => {
    if (array.includes(item)) {
      setArray(array.filter(i => i !== item));
    } else {
      setArray([...array, item]);
    }
  };

  const togglePinItem = (itemId: string) => {
    let newPinnedItems;
    if (pinnedItems.includes(itemId)) {
      newPinnedItems = pinnedItems.filter(id => id !== itemId);
    } else {
      newPinnedItems = [...pinnedItems, itemId];
    }
    onPinnedItemsChange(newPinnedItems);
  };

  const resetFilters = () => {
    setDateRange('FY 2022-23');
    setSelectedRegions(['Mumbai', 'Delhi', 'Bangalore']);
    setSelectedStates(['Maharashtra', 'Delhi', 'Karnataka']);
    setSelectedCities(['Mumbai', 'Delhi', 'Bangalore']);
    setSelectedTeams(['Sales Team A', 'Sales Team B']);
    setSelectedMembers(['All Members']);
    setPerformanceRange([0, 100]);
    setSelectedProducts(['Health Insurance', 'Motor Insurance']);
    setSelectedInsurers(['ICICI Lombard', 'HDFC ERGO']);
    setPolicyTypes(['Individual', 'Group']);
    setBusinessVerticals(['Corporate', 'Retail']);
    setClientTypes(['New', 'Existing']);
    setRevenueRange([0, 10000000]);
    setChartType('donut');
    setShowPercentages(true);
    setShowLegend(true);
    setAnimateCharts(true);
    setColorScheme('professional');
    setRefreshInterval('manual');
    setEnableNotifications(true);
    setAutoSave(false);
    setExportFormat('xlsx');
  };

  const saveConfiguration = () => {
    // Save both filter settings and pinned items configuration
    const configuration = {
      pinnedItems,
      dateRange,
      selectedRegions,
      selectedStates,
      selectedCities,
      selectedTeams,
      selectedMembers,
      performanceRange,
      selectedProducts,
      selectedInsurers,
      policyTypes,
      businessVerticals,
      clientTypes,
      revenueRange,
      chartType,
      showPercentages,
      showLegend,
      animateCharts,
      colorScheme,
      refreshInterval,
      enableNotifications,
      autoSave,
      exportFormat
    };
    
    console.log('Saving configuration...', configuration);
    // Implementation for saving configuration to localStorage or API
    localStorage.setItem('dashboardConfiguration', JSON.stringify(configuration));
    
    // Show success message
    alert('Dashboard configuration saved successfully!');
  };

  // Load configuration on mount
  useEffect(() => {
    const savedConfig = localStorage.getItem('dashboardConfiguration');
    if (savedConfig) {
      try {
        const configuration = JSON.parse(savedConfig);
        // Load pinned items if available
        if (configuration.pinnedItems) {
          onPinnedItemsChange(configuration.pinnedItems);
        }
        // Load other settings
        if (configuration.dateRange) setDateRange(configuration.dateRange);
        if (configuration.selectedRegions) setSelectedRegions(configuration.selectedRegions);
        if (configuration.selectedStates) setSelectedStates(configuration.selectedStates);
        if (configuration.chartType) setChartType(configuration.chartType);
        // ... load other settings as needed
      } catch (error) {
        console.error('Error loading saved configuration:', error);
      }
    }
  }, []);

  // Group filter items by category, filtering out unavailable items
  const filtersByCategory = allFilterItems
    .filter(item => item.available !== false) // Only show available items
    .reduce((acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    }, {} as Record<string, typeof allFilterItems>);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[700px] sm:w-[800px] overflow-y-auto">
        <SheetHeader className="pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Settings className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <SheetTitle className="text-xl">Dashboard Configuration</SheetTitle>
                <SheetDescription className="text-sm text-gray-500 mt-1">
                  Customize filters, chart axes, display settings, and dashboard preferences
                </SheetDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={saveConfiguration} className="text-sm">
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button variant="ghost" onClick={onClose} className="p-2">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </SheetHeader>

        <Tabs defaultValue="filters" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="filters" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filters & Pinning
            </TabsTrigger>
            <TabsTrigger value="display" className="flex items-center gap-2">
              <Monitor className="w-4 h-4" />
              Display & Settings
            </TabsTrigger>
          </TabsList>

          {/* Filters & Pinning Tab */}
          <TabsContent value="filters" className="space-y-6">
            {/* Currently Applied Filters */}
            <Card className="p-4 bg-blue-50 border-blue-200">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-4 h-4 text-blue-600" />
                <h3 className="font-medium text-blue-900">Currently Applied Configuration</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="default" className="bg-blue-600 text-white">
                    Organisation: {selectedEntity}
                  </Badge>
                  <Badge variant="default" className="bg-blue-600 text-white">
                    Department: {selectedBusinessType}
                  </Badge>
                  <Badge variant="default" className="bg-blue-600 text-white">
                    Location: {selectedLocation}
                  </Badge>
                  <Badge variant="default" className="bg-blue-600 text-white">
                    Report: {selectedReportType}
                  </Badge>
                  <Badge variant="default" className="bg-blue-600 text-white">
                    Period: {selectedDuration}
                  </Badge>
                  <Badge variant="default" className="bg-green-600 text-white">
                    Values: {valueUnit}
                  </Badge>
                  {selectedReportType === 'Revenue vs Expenses' && (
                    <Badge variant="default" className="bg-purple-600 text-white">
                      Expenses: {topExpenseCategories}
                    </Badge>
                  )}
                </div>
              </div>
            </Card>

            {/* Pinned Items Management */}
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <Pin className="w-4 h-4 text-gray-600" />
                <h3 className="font-medium text-gray-900">Pin Filters to Main Dashboard</h3>
                <Badge variant="outline" className="ml-auto text-xs">
                  {pinnedItems.length} pinned
                </Badge>
              </div>
              
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Pinned filters</strong> appear on the main dashboard for quick access. 
                  <strong>Unpinned filters</strong> are available through "More" button.
                </p>
                <p className="text-xs text-gray-600">
                  Click any filter below to pin/unpin it. Click individual options to preview available choices.
                </p>
              </div>

              <div className="space-y-4">
                {Object.entries(filtersByCategory).map(([category, items]) => (
                  <div key={category}>
                    <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      {category} Filters
                    </h4>
                    <div className="grid grid-cols-1 gap-4">
                      {items.map((item) => {
                        const IconComponent = item.icon;
                        const isPinned = pinnedItems.includes(item.id);
                        
                        // Get available options for each filter type
                        const getFilterOptions = (filterId: string) => {
                          switch (filterId) {
                            case 'organisation':
                              return entities;
                            case 'department':
                              return businessTypes;
                            case 'reportType':
                              return reportTypes[selectedBusinessType as keyof typeof reportTypes] || reportTypes['Business'];
                            case 'location':
                              return locations[selectedBusinessType as keyof typeof locations] || locations['Business'];
                            case 'duration':
                              return durations;
                            case 'valueUnit':
                              return valueUnits;
                            case 'topExpenses':
                              return topExpenseOptions;
                            case 'teams':
                              return teams;
                            case 'regions':
                              return regions;
                            case 'products':
                              return products;
                            case 'insurers':
                              return insurers;
                            default:
                              return [];
                          }
                        };

                        const getCurrentSelection = (filterId: string) => {
                          switch (filterId) {
                            case 'organisation':
                              return selectedEntity;
                            case 'department':
                              return selectedBusinessType;
                            case 'reportType':
                              return selectedReportType;
                            case 'location':
                              return selectedLocation;
                            case 'duration':
                              return selectedDuration;
                            case 'valueUnit':
                              return valueUnit;
                            case 'topExpenses':
                              return topExpenseCategories;
                            case 'teams':
                              return selectedTeams;
                            case 'regions':
                              return selectedRegions;
                            case 'products':
                              return selectedProducts;
                            case 'insurers':
                              return selectedInsurers;
                            default:
                              return '';
                          }
                        };

                        const isMultiSelect = (filterId: string) => {
                          return ['teams', 'regions', 'products', 'insurers'].includes(filterId);
                        };

                        const filterOptions = getFilterOptions(item.id);
                        const currentSelection = getCurrentSelection(item.id);

                        return (
                          <div 
                            key={item.id} 
                            className={`border rounded-lg transition-all ${ 
                              isPinned 
                                ? 'bg-green-50 border-green-200' 
                                : 'bg-gray-50 border-gray-200'
                            }`}
                          >
                            {/* Filter Header */}
                            <div 
                              className={`flex items-center justify-between p-3 cursor-pointer hover:bg-opacity-80 ${
                                isPinned ? 'hover:bg-green-100' : 'hover:bg-gray-100'
                              }`}
                              onClick={() => togglePinItem(item.id)}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${
                                  isPinned ? 'bg-green-100' : 'bg-gray-100'
                                }`}>
                                  <IconComponent className={`w-4 h-4 ${
                                    isPinned ? 'text-green-600' : 'text-gray-600'
                                  }`} />
                                </div>
                                <div>
                                  <div className="font-medium text-gray-900">{item.name}</div>
                                  <div className="text-sm text-gray-600">{item.currentValue}</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {isPinned && (
                                  <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                                    <Check className="w-3 h-3" />
                                    Pinned
                                  </div>
                                )}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className={isPinned 
                                    ? 'text-green-600 hover:text-green-700 hover:bg-green-100' 
                                    : 'text-gray-600 hover:text-gray-700 hover:bg-gray-100'
                                  }
                                  title={isPinned ? 'Unpin from main dashboard' : 'Pin to main dashboard'}
                                >
                                  {isPinned ? <PinOff className="w-4 h-4" /> : <Pin className="w-4 h-4" />}
                                </Button>
                              </div>
                            </div>

                            {/* Available Options */}
                            {filterOptions.length > 0 && (
                              <div className="px-3 pb-3">
                                <div className="border-t border-gray-200 pt-3">
                                  <Label className="text-xs font-medium text-gray-600 mb-2 block">
                                    Available Options ({filterOptions.length})
                                    {isMultiSelect(item.id) && Array.isArray(currentSelection) && (
                                      <span className="text-blue-600 ml-1">
                                        • {currentSelection.length} selected
                                      </span>
                                    )}
                                  </Label>
                                  <div className="flex flex-wrap gap-1">
                                    {filterOptions.map((option) => {
                                      const isSelected = isMultiSelect(item.id) 
                                        ? Array.isArray(currentSelection) && currentSelection.includes(option)
                                        : option === currentSelection;
                                      
                                      return (
                                        <Badge
                                          key={option}
                                          variant={isSelected ? 'default' : 'outline'}
                                          className={`text-xs cursor-pointer transition-all duration-200 ${
                                            isSelected 
                                              ? 'bg-blue-600 text-white hover:bg-blue-700' 
                                              : 'hover:bg-gray-100 hover:border-gray-300'
                                          }`}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            if (isMultiSelect(item.id)) {
                                              // Handle multi-select for teams, regions, products, insurers
                                              const currentArray = Array.isArray(currentSelection) ? currentSelection : [];
                                              switch (item.id) {
                                                case 'teams':
                                                  toggleArrayItem(selectedTeams, setSelectedTeams, option);
                                                  break;
                                                case 'regions':
                                                  toggleArrayItem(selectedRegions, setSelectedRegions, option);
                                                  break;
                                                case 'products':
                                                  toggleArrayItem(selectedProducts, setSelectedProducts, option);
                                                  break;
                                                case 'insurers':
                                                  toggleArrayItem(selectedInsurers, setSelectedInsurers, option);
                                                  break;
                                              }
                                            }
                                            // For single-select filters, we don't change the selection here 
                                            // as they should be changed through the main dashboard
                                          }}
                                        >
                                          {isSelected && isMultiSelect(item.id) && (
                                            <Check className="w-3 h-3 mr-1" />
                                          )}
                                          {option}
                                        </Badge>
                                      );
                                    })}
                                  </div>
                                  {isMultiSelect(item.id) && (
                                    <div className="mt-2 flex gap-2">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-6 px-2 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          switch (item.id) {
                                            case 'teams':
                                              setSelectedTeams([...teams]);
                                              break;
                                            case 'regions':
                                              setSelectedRegions([...regions]);
                                              break;
                                            case 'products':
                                              setSelectedProducts([...products]);
                                              break;
                                            case 'insurers':
                                              setSelectedInsurers([...insurers]);
                                              break;
                                          }
                                        }}
                                      >
                                        Select All
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-6 px-2 text-xs text-gray-600 hover:text-gray-700 hover:bg-gray-50"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          switch (item.id) {
                                            case 'teams':
                                              setSelectedTeams([]);
                                              break;
                                            case 'regions':
                                              setSelectedRegions([]);
                                              break;
                                            case 'products':
                                              setSelectedProducts([]);
                                              break;
                                            case 'insurers':
                                              setSelectedInsurers([]);
                                              break;
                                          }
                                        }}
                                      >
                                        Clear All
                                      </Button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* More Options - Collapsible Section */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4 cursor-pointer" onClick={() => setShowMoreOptions(!showMoreOptions)}>
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-gray-600" />
                  <h3 className="font-medium text-gray-900">More Options</h3>
                </div>
                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                  More
                  {showMoreOptions ? (
                    <ChevronUp className="w-4 h-4 ml-1" />
                  ) : (
                    <ChevronDown className="w-4 h-4 ml-1" />
                  )}
                </Button>
              </div>

              {/* Collapsible Content */}
              {showMoreOptions && (
                <div className="space-y-6 mt-6 pt-4 border-t border-gray-200">
                  {/* Quick Filter Values - Moved under More */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Values Unit */}
                    <Card className="p-4">
                      <div className="flex items-center gap-2 mb-4">
                        <DollarSign className="w-4 h-4 text-gray-600" />
                        <h3 className="font-medium text-gray-900">Values Display</h3>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium mb-2 block">Values in</Label>
                          <Select value={valueUnit} onValueChange={onValueUnitChange}>
                            <SelectTrigger className="w-full">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Thousands">K</SelectItem>
                              <SelectItem value="Lakh">L</SelectItem>
                              <SelectItem value="Crore">C</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </Card>

                    {/* Top Expense Categories */}
                    {selectedReportType === 'Revenue vs Expenses' && (
                      <Card className="p-4">
                        <div className="flex items-center gap-2 mb-4">
                          <Target className="w-4 h-4 text-gray-600" />
                          <h3 className="font-medium text-gray-900">Expense Categories</h3>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium mb-2 block">Show Categories</Label>
                            <Select value={topExpenseCategories} onValueChange={onTopExpenseCategoriesChange}>
                              <SelectTrigger className="w-full">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Top 5">Top 5</SelectItem>
                                <SelectItem value="Top 10">Top 10</SelectItem>
                                <SelectItem value="Top 15">Top 15</SelectItem>
                                <SelectItem value="Top 20">Top 20</SelectItem>
                                <SelectItem value="All">All Categories</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </Card>
                    )}
                  </div>
                
                  {/* Additional Filters - Regional, Team, Business */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Additional Filters</h4>
                    <div className="space-y-6">
                      {/* Regional Filters */}
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-3">Regional Filters</h5>
                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium mb-2 block">Regions</Label>
                            <div className="flex flex-wrap gap-2">
                              {regions.map((region) => (
                                <Badge
                                  key={region}
                                  variant={selectedRegions.includes(region) ? 'default' : 'outline'}
                                  className="cursor-pointer"
                                  onClick={() => toggleArrayItem(selectedRegions, setSelectedRegions, region)}
                                >
                                  {region}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <Label className="text-sm font-medium mb-2 block">States</Label>
                            <div className="flex flex-wrap gap-2">
                              {states.map((state) => (
                                <Badge
                                  key={state}
                                  variant={selectedStates.includes(state) ? 'default' : 'outline'}
                                  className="cursor-pointer"
                                  onClick={() => toggleArrayItem(selectedStates, setSelectedStates, state)}
                                >
                                  {state}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Team Filters */}
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-3">Team & Performance</h5>
                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium mb-2 block">Teams</Label>
                            <div className="flex flex-wrap gap-2">
                              {teams.map((team) => (
                                <Badge
                                  key={team}
                                  variant={selectedTeams.includes(team) ? 'default' : 'outline'}
                                  className="cursor-pointer"
                                  onClick={() => toggleArrayItem(selectedTeams, setSelectedTeams, team)}
                                >
                                  {team}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <Label className="text-sm font-medium mb-2 block">Team Members</Label>
                            <div className="flex flex-wrap gap-2">
                              {members.map((member) => (
                                <Badge
                                  key={member}
                                  variant={selectedMembers.includes(member) ? 'default' : 'outline'}
                                  className="cursor-pointer"
                                  onClick={() => toggleArrayItem(selectedMembers, setSelectedMembers, member)}
                                >
                                  {member}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <Label className="text-sm font-medium mb-2 block">Performance Range: {performanceRange[0]}% - {performanceRange[1]}%</Label>
                            <Slider
                              value={performanceRange}
                              onValueChange={setPerformanceRange}
                              max={100}
                              step={5}
                              className="w-full"
                            />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Product & Business Filters */}
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-3">Products & Business</h5>
                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium mb-2 block">Products</Label>
                            <div className="flex flex-wrap gap-2">
                              {products.map((product) => (
                                <Badge
                                  key={product}
                                  variant={selectedProducts.includes(product) ? 'default' : 'outline'}
                                  className="cursor-pointer"
                                  onClick={() => toggleArrayItem(selectedProducts, setSelectedProducts, product)}
                                >
                                  {product}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <Label className="text-sm font-medium mb-2 block">Insurers</Label>
                            <div className="flex flex-wrap gap-2">
                              {insurers.map((insurer) => (
                                <Badge
                                  key={insurer}
                                  variant={selectedInsurers.includes(insurer) ? 'default' : 'outline'}
                                  className="cursor-pointer"
                                  onClick={() => toggleArrayItem(selectedInsurers, setSelectedInsurers, insurer)}
                                >
                                  {insurer}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <Label className="text-sm font-medium mb-2 block">Business Verticals</Label>
                            <div className="flex flex-wrap gap-2">
                              {['Corporate', 'Retail', 'SME', 'Enterprise'].map((vertical) => (
                                <Badge
                                  key={vertical}
                                  variant={businessVerticals.includes(vertical) ? 'default' : 'outline'}
                                  className="cursor-pointer"
                                  onClick={() => toggleArrayItem(businessVerticals, setBusinessVerticals, vertical)}
                                >
                                  {vertical}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </TabsContent>

          {/* Display & Settings Tab */}
          <TabsContent value="display" className="space-y-6">
            {/* Chart Display Settings */}
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <Eye className="w-4 h-4 text-gray-600" />
                <h3 className="font-medium text-gray-900">Chart Display Settings</h3>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Chart Type</Label>
                    <Select value={chartType} onValueChange={setChartType}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="donut">Donut Chart</SelectItem>
                        <SelectItem value="pie">Pie Chart</SelectItem>
                        <SelectItem value="bar">Bar Chart</SelectItem>
                        <SelectItem value="line">Line Chart</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">Color Scheme</Label>
                    <Select value={colorScheme} onValueChange={setColorScheme}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="vibrant">Vibrant</SelectItem>
                        <SelectItem value="pastel">Pastel</SelectItem>
                        <SelectItem value="monochrome">Monochrome</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Show Percentages</Label>
                    <Switch
                      checked={showPercentages}
                      onCheckedChange={setShowPercentages}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Show Legend</Label>
                    <Switch
                      checked={showLegend}
                      onCheckedChange={setShowLegend}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Animate Charts</Label>
                    <Switch
                      checked={animateCharts}
                      onCheckedChange={setAnimateCharts}
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Performance Settings */}
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <Settings className="w-4 h-4 text-gray-600" />
                <h3 className="font-medium text-gray-900">Performance & Data Settings</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium mb-2 block">Data Refresh Interval</Label>
                  <Select value={refreshInterval} onValueChange={setRefreshInterval}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manual">Manual Refresh</SelectItem>
                      <SelectItem value="30s">Every 30 seconds</SelectItem>
                      <SelectItem value="1m">Every 1 minute</SelectItem>
                      <SelectItem value="5m">Every 5 minutes</SelectItem>
                      <SelectItem value="15m">Every 15 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Export Format</Label>
                  <Select value={exportFormat} onValueChange={setExportFormat}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="xlsx">Excel (.xlsx)</SelectItem>
                      <SelectItem value="csv">CSV (.csv)</SelectItem>
                      <SelectItem value="pdf">PDF (.pdf)</SelectItem>
                      <SelectItem value="png">Image (.png)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Enable Notifications</Label>
                    <Switch
                      checked={enableNotifications}
                      onCheckedChange={setEnableNotifications}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Auto-save Configuration</Label>
                    <Switch
                      checked={autoSave}
                      onCheckedChange={setAutoSave}
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Reset and Save Actions */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <Button variant="outline" onClick={resetFilters} className="text-sm">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset All Settings
              </Button>
              <Button onClick={saveConfiguration} className="text-sm">
                <Save className="w-4 h-4 mr-2" />
                Save Configuration
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}