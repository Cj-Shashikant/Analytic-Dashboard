import React, { useState, useEffect, useCallback } from 'react';
import { TopNavigation } from './components/TopNavigation';
import { DashboardHeader } from './components/DashboardHeader';
import { ChartsSection } from './components/ProductDetailsPanel/ChartsSection_Products_Enhanced';
import { ChartsSection as ChartsSection_Products } from './components/ProductDetailsPanel/ChartsSection_Products_Enhanced';
// Unified component now handles all report types - removed redundant imports
import { RevenueVsExpences } from './components/RevenueVsExpences';
import { RetentionByInsurer } from './components/RetentionByInsurer';
import { RetentionByBroker } from './components/RetentionByBroker';
// Customer Analysis Components
import { DurationOfRelationship } from './components/CustomerAnalysis/DurationOfRelationship';
import { NumberOfProducts } from './components/CustomerAnalysis/NumberOfProducts';
import { PremiumContribution } from './components/CustomerAnalysis/PremiumContribution';
import { CustomerSatisfaction } from './components/CustomerAnalysis/CustomerSatisfaction';
import { CrossSellUpsell } from './components/CustomerAnalysis/CrossSellUpsell';
import { TodaysReportButton } from './components/TodaysReportButton';
import { TodaysReportPanel } from './components/TodaysReportPanel';
import { AdvancedFilters } from './components/AdvancedFilters';
import { LeaderboardModal } from './components/LeaderboardModal';
import { AutoSlidingCharts } from './components/AutoSlidingCharts';
import { CustomPeriodModal } from './components/CustomPeriodModal';
import { ComparisonModal } from './components/ComparisonModal';
import { ComparisonChart } from './components/ComparisonChart';
import { PresentationMode } from './components/PresentationMode';
import { MetricsSection } from './components/MetricsSection';
import { PlaylistManager, Playlist, PlaylistItem } from './components/PlaylistManager';
import { PlaylistPlayer } from './components/PlaylistPlayer';
import { SaveToPlaylistButton } from './components/SaveToPlaylistButton';
import { Button } from './components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Settings, BarChart3, ChevronLeft, ChevronRight, Trophy, Building2, Users, CalendarDays, DollarSign, ChevronDown, Sliders, Maximize, GitCompare, MapPin, Target, TrendingUp, BarChart, Play, Pause, Square, Timer } from 'lucide-react';

/**
 * INSURANCE BROKER ANALYTICS DASHBOARD
 * 
 * This is the main application component for the Revenue vs Expenses Analytics Dashboard
 * designed for insurance broker management and C-suite executives.
 * 
 * MAIN API INTEGRATION POINTS:
 * =============================
 * 
 * 1. USER AUTHENTICATION & PERMISSIONS
 *    - API ENDPOINT: GET /api/auth/user-profile
 *    - DATA FORMAT: {user_id: string, role: string, permissions: Array<string>, organization: string}
 * 
 * 2. DASHBOARD CONFIGURATION
 *    - API ENDPOINT: GET /api/dashboard/user-config
 *    - DATA FORMAT: {pinned_filters: Array<string>, default_views: object, preferences: object}
 * 
 * 3. REAL-TIME DATA UPDATES
 *    - WEBSOCKET: ws://api/live-updates
 *    - MESSAGE FORMAT: {type: 'metric_update'|'alert'|'notification', data: object, timestamp: string}
 * 
 * 4. AUDIT LOGGING
 *    - API ENDPOINT: POST /api/audit/log-action
 *    - REQUEST BODY: {action: string, filters: object, timestamp: string, user_id: string}
 */

export default function App() {
  const [selectedEntity, setSelectedEntity] = useState('ABC Broking Pvt Ltd');
  const [selectedReportType, setSelectedReportType] = useState('Revenue by Products');
  const [selectedBusinessType, setSelectedBusinessType] = useState('Business');
  const [selectedLocation, setSelectedLocation] = useState('All Location');
  const [selectedDuration, setSelectedDuration] = useState('FY 2022-23');
  const [valueUnit, setValueUnit] = useState('K');
  const [selectedBuyerType, setSelectedBuyerType] = useState('Corporate');
  const [isTodaysReportOpen, setIsTodaysReportOpen] = useState(false);
  const [isAdvancedFiltersOpen, setIsAdvancedFiltersOpen] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  
  // Auto-Zoom Presentation State
  const [isAutoZoomActive, setIsAutoZoomActive] = useState(false);
  const [currentFocusedElement, setCurrentFocusedElement] = useState<number>(0);
  const [autoZoomTimer, setAutoZoomTimer] = useState<NodeJS.Timeout | null>(null);
  const [totalElements, setTotalElements] = useState<number>(0);
  
  // New states for automatic presentation mode
  const [isInitialDelayActive, setIsInitialDelayActive] = useState(false);
  const [initialDelayTimer, setInitialDelayTimer] = useState<NodeJS.Timeout | null>(null);
  const [delayCountdown, setDelayCountdown] = useState<number>(0);
  const [countdownTimer, setCountdownTimer] = useState<NodeJS.Timeout | null>(null);
  
  // Pinned Items State - Controls which filters appear on main dashboard
  const [pinnedItems, setPinnedItems] = useState<string[]>([
    'organisation', 
    'department', 
    'reportType', 
    'duration'  // Removed 'location' as default since it's now "More conditions"
  ]);
  
  // Custom Period functionality
  const [isCustomPeriodModalOpen, setIsCustomPeriodModalOpen] = useState(false);
  const [customStartDate, setCustomStartDate] = useState<Date | undefined>();
  const [customEndDate, setCustomEndDate] = useState<Date | undefined>();
  
  // Comparison functionality
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);
  const [isComparisonChartOpen, setIsComparisonChartOpen] = useState(false);
  const [comparisonPeriod1, setComparisonPeriod1] = useState('');
  const [comparisonPeriod2, setComparisonPeriod2] = useState('');
  const [comparisonCustomDates, setComparisonCustomDates] = useState<{
    period1?: { start: Date; end: Date };
    period2?: { start: Date; end: Date };
  }>({});
  
  // Top 10 Expense Categories dropdown state
  const [topExpenseCategories, setTopExpenseCategories] = useState('Top 10');
  
  // Full screen modes
  const [isHeaderFullScreen, setIsHeaderFullScreen] = useState(false);
  const [isRevenueFullScreen, setIsRevenueFullScreen] = useState(false);
  const [fullScreenChartType, setFullScreenChartType] = useState<'revenue' | 'expenses'>('revenue');
  
  // Presentation mode
  const [isPresentationMode, setIsPresentationMode] = useState(false);
  
  // Playlist functionality
  const [isPlaylistPlayerOpen, setIsPlaylistPlayerOpen] = useState(false);
  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist | null>(null);

  // Auto-zoom control functions
  const startAutoZoom = useCallback(() => {
    if (totalElements > 0) {
      setIsAutoZoomActive(true);
      setCurrentFocusedElement(0);
      
      const timer = setInterval(() => {
        setCurrentFocusedElement(prev => (prev + 1) % totalElements);
      }, 10000); // 10 seconds per element
      
      setAutoZoomTimer(timer);
    }
  }, [totalElements]);

  const pauseAutoZoom = useCallback(() => {
    setIsAutoZoomActive(false);
    if (autoZoomTimer) {
      clearInterval(autoZoomTimer);
      setAutoZoomTimer(null);
    }
  }, [autoZoomTimer]);

  const stopAutoZoom = useCallback(() => {
    setIsAutoZoomActive(false);
    setCurrentFocusedElement(0);
    if (autoZoomTimer) {
      clearInterval(autoZoomTimer);
      setAutoZoomTimer(null);
    }
  }, [autoZoomTimer]);

  // Initial delay control functions
  const startInitialDelay = useCallback(() => {
    if (totalElements > 0) {
      setIsInitialDelayActive(true);
      setDelayCountdown(5);
      
      // Countdown timer (updates every second)
      const countdown = setInterval(() => {
        setDelayCountdown(prev => {
          if (prev <= 1) {
            clearInterval(countdown);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      setCountdownTimer(countdown);
      
      // Main delay timer (triggers auto-zoom after 5 seconds)
      const delay = setTimeout(() => {
        setIsInitialDelayActive(false);
        setDelayCountdown(0);
        startAutoZoom();
      }, 5000);
      setInitialDelayTimer(delay);
    }
  }, [totalElements, startAutoZoom]);

  const cancelInitialDelay = useCallback(() => {
    setIsInitialDelayActive(false);
    setDelayCountdown(0);
    if (initialDelayTimer) {
      clearTimeout(initialDelayTimer);
      setInitialDelayTimer(null);
    }
    if (countdownTimer) {
      clearInterval(countdownTimer);
      setCountdownTimer(null);
    }
  }, [initialDelayTimer, countdownTimer]);

  // Auto-start presentation when entering full screen
  useEffect(() => {
    if (isRevenueFullScreen && totalElements > 0 && !isInitialDelayActive && !isAutoZoomActive) {
      // Start the 5-second delay countdown when entering full screen
      const autoStartTimer = setTimeout(() => {
        startInitialDelay();
      }, 1000); // Small delay to ensure UI is ready
      
      return () => clearTimeout(autoStartTimer);
    }
  }, [isRevenueFullScreen, totalElements, isInitialDelayActive, isAutoZoomActive, startInitialDelay]);

  // Cleanup timers on unmount or when exiting full screen
  useEffect(() => {
    if (!isRevenueFullScreen) {
      stopAutoZoom();
      cancelInitialDelay();
    }
  }, [isRevenueFullScreen, stopAutoZoom, cancelInitialDelay]);

  useEffect(() => {
    return () => {
      if (autoZoomTimer) {
        clearInterval(autoZoomTimer);
      }
      if (initialDelayTimer) {
        clearTimeout(initialDelayTimer);
      }
      if (countdownTimer) {
        clearInterval(countdownTimer);
      }
    };
  }, [autoZoomTimer, initialDelayTimer, countdownTimer]);

  // Handle total elements change from chart components
  const handleTotalElementsChange = useCallback((count: number) => {
    setTotalElements(count);
    // Reset timers if elements count changes
    if (isAutoZoomActive) {
      stopAutoZoom();
    }
    if (isInitialDelayActive) {
      cancelInitialDelay();
    }
  }, [isAutoZoomActive, isInitialDelayActive, stopAutoZoom, cancelInitialDelay]);

  // Filter options data
  // API ENDPOINT: GET /api/organizations
  // DATA FORMAT: Array<{id: string, name: string, type: string, status: 'active' | 'inactive'}>
  const entities = [
    'ABC Broking Pvt Ltd',
    'XYZ Insurance Agency',
    'PQR Financial Services',
    'DEF Risk Management'
  ];

  // Updated business types with Retention department
  // API ENDPOINT: GET /api/departments
  // DATA FORMAT: Array<{id: string, name: string, description: string, permissions: string[]}>
  const businessTypes = [
    'Business',
    'Operations', 
    'Finance',
    'Marketing',
    'Sales',
    'Retention',
    'Customer Analysis'
  ];

  // Department-specific report types
  // API ENDPOINT: GET /api/report-types?department={department}
  // DATA FORMAT: Array<{id: string, name: string, category: string, department: string, isEnabled: boolean}>
  const getReportTypesForDepartment = (department: string) => {
    const reportTypesByDepartment = {
      'Business': [
        'Revenue vs Expenses',
        'Revenue by Products',
        'Revenue by Insurers', 
        'Revenue by Policy Type',
        'Revenue by Vertical',  // Renamed from "Revenue by Business Vertical"
        'Revenue by LOB',
        'Cross-Sell Penetration'  // New report type added
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
      ],
      'Customer Analysis': [
        'Duration of Relationship',
        'Number of Products Purchased',
        'Premium Contribution by Customer',
        'Customer Satisfaction / NPS',
        'Cross-Sell / Upsell Potential'
      ]
    };

    return reportTypesByDepartment[department as keyof typeof reportTypesByDepartment] || reportTypesByDepartment['Business'];
  };

  // Location options based on department
  // API ENDPOINT: GET /api/locations?department={department}
  // DATA FORMAT: Array<{id: string, name: string, type: 'office' | 'region' | 'virtual', department: string, isActive: boolean}>
  const getLocationOptions = (department: string) => {
    const locationsByDepartment = {
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

    return locationsByDepartment[department as keyof typeof locationsByDepartment] || ['All Location'];
  };

  // API ENDPOINT: GET /api/time-periods
  // DATA FORMAT: Array<{id: string, name: string, startDate: string, endDate: string, type: 'FY' | 'Quarter' | 'Month', isActive: boolean}>
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

  // API ENDPOINT: GET /api/currency-units
  // DATA FORMAT: Array<{id: string, name: string, symbol: string, conversionRate: number, isDefault: boolean}>
  const valueUnits = [
    'K',
    'L', 
    'Cr'
  ];

  // Handle department change and reset location and report type
  const handleBusinessTypeChange = (newDepartment: string) => {
    setSelectedBusinessType(newDepartment);
    
    // Reset location to "All Location" (first option) of new department
    const newLocationOptions = getLocationOptions(newDepartment);
    if (newLocationOptions.length > 0) {
      setSelectedLocation('All Location');
    }
    
    // Reset report type to first available report type for new department
    const newReportTypes = getReportTypesForDepartment(newDepartment);
    if (newReportTypes.length > 0) {
      setSelectedReportType(newReportTypes[0]);
    }
  };

  // Handle report type change
  const handleReportTypeChange = (newReportType: string) => {
    setSelectedReportType(newReportType);

    // Stop auto-zoom and delay when report type changes
    stopAutoZoom();
    cancelInitialDelay();
  };

  // Handle pinned items change from AdvancedFilters
  const handlePinnedItemsChange = (newPinnedItems: string[]) => {
    setPinnedItems(newPinnedItems);
  };

  // Helper function to format custom period display
  const getCustomPeriodDisplay = () => {
    if (!customStartDate || !customEndDate) return 'Custom Period';
    
    const start = customStartDate.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
    const end = customEndDate.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric' 
    });
    
    return `${start} - ${end}`;
  };

  // Get the actual duration value for display and calculations
  const getActualDuration = () => {
    if (selectedDuration === 'Custom Period' && customStartDate && customEndDate) {
      return getCustomPeriodDisplay();
    }
    return selectedDuration;
  };

  // Handle duration change
  const handleDurationChange = (value: string) => {
    setSelectedDuration(value);
    if (value === 'Custom Period') {
      setIsCustomPeriodModalOpen(true);
    }
  };

  // Handle custom period application
  // API ENDPOINT: POST /api/periods/validate-custom
  // REQUEST BODY: {startDate: string, endDate: string, entity: string}
  // DATA FORMAT: {isValid: boolean, warnings: Array<string>, dataAvailability: boolean, estimatedRecords: number}
  const handleCustomPeriodApply = (startDate: Date, endDate: Date) => {
    setCustomStartDate(startDate);
    setCustomEndDate(endDate);
    setSelectedDuration('Custom Period');
  };

  // Handle custom period modal close
  const handleCustomPeriodClose = () => {
    setIsCustomPeriodModalOpen(false);
    // If no custom period was set and Custom Period was selected, revert to previous selection
    if (selectedDuration === 'Custom Period' && (!customStartDate || !customEndDate)) {
      setSelectedDuration('FY 2022-23');
    }
  };

  // Handle comparison functionality
  // API ENDPOINT: POST /api/analytics/comparison/calculate
  // REQUEST BODY: {period1: string, period2: string, customDates: object, filters: currentFilters}
  // DATA FORMAT: {comparison_data: {period1: object, period2: object}, metrics: {growth: number, variance: number}, 
  //              trends: Array<{metric: string, direction: 'up'|'down'|'stable', percentage: number}>}
  const handleComparisonApply = (period1: string, period2: string, customDates?: {
    period1?: { start: Date; end: Date };
    period2?: { start: Date; end: Date };
  }) => {
    setComparisonPeriod1(period1);
    setComparisonPeriod2(period2);
    setComparisonCustomDates(customDates || {});
    setIsComparisonModalOpen(false);
    setIsComparisonChartOpen(true);
  };

  // Centralized data source for consistency across components
  // API ENDPOINT: POST /api/metrics/summary
  // REQUEST BODY: {entity: string, department: string, location: string, period: string, reportType: string}
  // DATA FORMAT: {totalRevenue: number, expenses: number, grossProfit: number, netProfit: number, margins: {gross: number, net: number}, growth: {revenue: number, profit: number}}
  const getBaseMetricsData = () => {
    // Base data in actual currency values
    const baseMetrics = {
      totalRevenue: 240000000,  // ₹24 crores = 240,000,000 (matches B2B+B2C+B2B2C)
      expenses: 153467000,      // ₹15.35 crores 
      grossProfit: 86533000     // ₹8.65 crores (24 - 15.35 = 8.65)
    };

    // Adjust values slightly based on report type and entity
    // API ENDPOINT: GET /api/entities/{entityId}/performance-factor
    // DATA FORMAT: {factor: number, trend: 'up' | 'down' | 'stable', lastUpdated: string}
    const entityFactor = selectedEntity === 'ABC Broking Pvt Ltd' ? 1.0 :
                         selectedEntity === 'XYZ Insurance Agency' ? 0.95 :
                         selectedEntity === 'PQR Financial Services' ? 1.08 :
                         0.92;

    // API ENDPOINT: GET /api/report-types/{reportType}/performance-metrics
    // DATA FORMAT: {factor: number, avgPerformance: number, benchmarks: {industry: number, internal: number}}
    const reportTypeFactor = selectedReportType === 'Revenue by Products' ? 1.0 :
                            selectedReportType === 'Revenue by Insurers' ? 0.97 :
                            selectedReportType === 'Revenue by Policy Type' ? 1.03 :
                            selectedReportType === 'Revenue by Vertical' ? 0.96 :
                            selectedReportType === 'Revenue by LOB' ? 1.02 :
                            selectedReportType === 'Cross-Sell Penetration' ? 0.98 :
                            1.0; // Revenue vs Expenses

    // Location factor for regional variations
    // API ENDPOINT: GET /api/locations/{locationId}/performance-metrics
    // DATA FORMAT: {factor: number, marketShare: number, growth: number, competitionLevel: 'low' | 'medium' | 'high'}
    const locationFactor = selectedLocation === 'All Location' ? 1.0 :
                          selectedLocation.includes('Mumbai') ? 1.0 :
                          selectedLocation.includes('Delhi') ? 0.95 :
                          selectedLocation.includes('Bangalore') ? 1.08 :
                          selectedLocation.includes('Chennai') ? 0.88 :
                          selectedLocation.includes('Hyderabad') ? 0.92 :
                          selectedLocation.includes('Pune') ? 0.85 :
                          selectedLocation.includes('Kolkata') ? 0.82 :
                          selectedLocation.includes('Ahmedabad') ? 0.78 :
                          selectedLocation.includes('Online') ? 1.15 :
                          selectedLocation.includes('National') ? 1.12 :
                          selectedLocation.includes('Corporate') ? 1.05 :
                          selectedLocation.includes('Retail') ? 0.95 :
                          selectedLocation.includes('Regional') ? 0.88 :
                          0.90; // Default for other locations

    // Custom period factor (adjust data based on period length)
    // API ENDPOINT: POST /api/periods/calculate-factor
    // REQUEST BODY: {startDate: string, endDate: string, basePeriod: string}
    // DATA FORMAT: {factor: number, periodLength: number, seasonalityAdjustment: number}
    let periodFactor = 1.0;
    if (selectedDuration === 'Custom Period' && customStartDate && customEndDate) {
      const days = Math.ceil((customEndDate.getTime() - customStartDate.getTime()) / (1000 * 60 * 60 * 24));
      // Adjust factor based on period length (assuming base is ~365 days)
      periodFactor = Math.max(0.1, Math.min(1.5, days / 365));
    }

    const adjustmentFactor = entityFactor * reportTypeFactor * locationFactor * periodFactor;

    return {
      totalRevenue: baseMetrics.totalRevenue * adjustmentFactor,
      expenses: baseMetrics.expenses * adjustmentFactor,
      grossProfit: baseMetrics.grossProfit * adjustmentFactor
    };
  };

  // Revenue-focused report types that show metrics and charts
  const revenueReportTypes = [
    'Revenue vs Expenses',
    'Revenue by Products',
    'Revenue by Insurers', 
    'Revenue by Policy Type',
    'Revenue by Vertical',  // Renamed
    'Revenue by LOB',
    'Cross-Sell Penetration'  // New report type
  ];

  // Retention-focused report types - now properly organized under Retention department
  const retentionReportTypes = [
    'Retention - By Insurer',
    'Retention - Broker'
  ];

  // Customer Analysis report types
  const customerAnalysisReportTypes = [
    'Duration of Relationship',
    'Number of Products Purchased',
    'Premium Contribution by Customer',
    'Customer Satisfaction / NPS',
    'Cross-Sell / Upsell Potential'
  ];

  const isRevenueReport = revenueReportTypes.includes(selectedReportType);
  const isRetentionReport = retentionReportTypes.includes(selectedReportType);
  const isRetentionDepartment = selectedBusinessType === 'Retention';
  const isCustomerAnalysisReport = customerAnalysisReportTypes.includes(selectedReportType);
  const isCustomerAnalysisDepartment = selectedBusinessType === 'Customer Analysis';

  // Updated logic for showing retention component
  const shouldShowRetention = isRetentionDepartment || isRetentionReport;
  const shouldShowCustomerAnalysis = isCustomerAnalysisDepartment || isCustomerAnalysisReport;

  // Function to handle full screen chart navigation
  const handleFullScreenNavigation = (direction: 'prev' | 'next') => {
    if (selectedReportType === 'Revenue vs Expenses') {
      // Toggle between revenue and expenses for Revenue vs Expenses report
      setFullScreenChartType(current => current === 'revenue' ? 'expenses' : 'revenue');
    }
    // Stop auto-zoom and delay when manually navigating
    stopAutoZoom();
    cancelInitialDelay();
  };

  // Handle presentation mode
  const handlePresentationMode = () => {
    setIsPresentationMode(true);
  };

  // Handle playing saved chart in full view
  const handlePlayFullView = (filters: any, chartData: any, chartType?: 'revenue' | 'expenses') => {
    // Set the chart type and enter full screen mode
    if (chartType) {
      setFullScreenChartType(chartType);
    }
    setIsRevenueFullScreen(true);
  };

  // Handle playlist playback
  // API ENDPOINT: GET /api/playlists/{playlistId}/start-session
  // DATA FORMAT: {session_id: string, playlist: object, current_index: number, auto_advance: boolean}
  const handlePlayPlaylist = (playlist: Playlist) => {
    setCurrentPlaylist(playlist);
    setIsPlaylistPlayerOpen(true);
  };

  // Handle playlist item change
  // API ENDPOINT: POST /api/playlists/sessions/{sessionId}/advance
  // REQUEST BODY: {item_index: number, user_action: 'manual'|'auto', timestamp: string}
  // DATA FORMAT: {item: object, analytics: {view_duration: number, interactions: number}, next_item_preview: object}
  const handlePlaylistItemChange = (item: PlaylistItem, index: number) => {
    // Apply the item's filters and settings
    setSelectedEntity(item.filters.selectedEntity);
    setSelectedReportType(item.filters.selectedReportType);
    setSelectedBusinessType(item.filters.selectedBusinessType);
    setSelectedLocation(item.filters.selectedLocation);
    setSelectedDuration(item.filters.selectedDuration);
    setValueUnit(item.filters.valueUnit);
    
    // Set chart type if applicable
    if (item.chartType) {
      setFullScreenChartType(item.chartType);
    }
    
    // Enter full screen mode for presentation
    setIsRevenueFullScreen(true);
  };

  const getFullScreenTitle = () => {
    if (selectedReportType === 'Revenue vs Expenses') {
      return fullScreenChartType === 'revenue' 
        ? 'Revenue by Business Model' 
        : 'Expenses Breakdown';
    }
    return selectedReportType;
  };

  // Cycle through value units when the single button is clicked
  const cycleValueUnit = () => {
    const currentIndex = valueUnits.indexOf(valueUnit);
    const nextIndex = (currentIndex + 1) % valueUnits.length;
    setValueUnit(valueUnits[nextIndex]);
  };

  const getUnitColor = (unit: string) => {
    switch (unit) {
      case 'K':
        return 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200';
      case 'L':
        return 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200';
      case 'C':
        return 'bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200';
    }
  };

  // Get display symbol for value unit
  const getUnitSymbol = (unit: string) => {
    switch (unit) {
      case 'Thousands':
        return 'K';
      case 'Lakh':
        return 'L';
      case 'Crore':
        return 'Cr';
      default:
        return 'K';
    }
  };

  // Dynamic width calculation based on content length - Enhanced for dropdowns and custom periods
  const getDynamicWidth = (content: string, minWidth: number = 120, maxWidth: number = 240) => {
    // For custom period, we need extra space for date ranges
    const isCustomPeriodContent = content.includes(' - ') && content !== 'Custom Period';
    const baseWidth = isCustomPeriodContent ? 
      Math.max(minWidth + 40, Math.min(maxWidth + 60, content.length * 7 + 60)) : // Wider for date ranges
      Math.max(minWidth, Math.min(maxWidth, content.length * 8 + 50)); // Normal width
    
    return `${baseWidth}px`;
  };

  // Calculate dynamic widths for each dropdown based on currently selected values
  const entityWidth = getDynamicWidth(selectedEntity, 160, 220);
  const departmentWidth = getDynamicWidth(selectedBusinessType, 100, 140);
  const reportTypeWidth = getDynamicWidth(selectedReportType, 180, 280);
  const durationWidth = getDynamicWidth(getActualDuration(), 110, 200); // Increased max for custom periods
  const locationWidth = getDynamicWidth(selectedLocation, 100, 160);

  // Create current filters object for SavedChartsManager
  // API ENDPOINT: POST /api/charts/save-filters
  // REQUEST BODY: currentFilters object below
  // DATA FORMAT: {id: string, name: string, filters: object, createdAt: string, userId: string}
  const currentFilters = {
    selectedEntity,
    selectedReportType,
    selectedBusinessType,
    selectedLocation,
    selectedDuration: getActualDuration(),
    valueUnit
  };

  // Define which report types should use the Products Enhanced layout (split layout with breakdown)
  const productStyleReportTypes = [
    'Revenue by Products',
    'Revenue by Vertical',  // Updated name
    'Revenue by LOB',
    'Cross-Sell Penetration'  // New report type uses product style layout
  ];

  // Define which report types should use the Insurers Enhanced layout (with scrollable bar/line charts)
  const insurerStyleReportTypes = [
    'Revenue by Insurers',
    'Revenue by Policy Type',
    'Revenue by Vertical',
    'Revenue by LOB'
  ];

  const shouldUseProductsLayout = productStyleReportTypes.includes(selectedReportType);
  const shouldUseInsurersLayout = insurerStyleReportTypes.includes(selectedReportType);

  // Function to check if a filter should be visible based on pinned items
  const isFilterVisible = (filterId: string) => {
    return pinnedItems.includes(filterId);
  };

  // Organize pinned items into primary and additional rows
  const primaryFilters = ['organisation', 'duration', 'department', 'reportType'];
  const additionalFilters = pinnedItems.filter(item => !primaryFilters.includes(item));

  // Render filter component based on ID
  const renderFilterComponent = (filterId: string, isAdditional: boolean = false) => {
    const baseClasses = "min-w-0";
    const containerClasses = isAdditional ? `${baseClasses} flex-1 max-w-xs` : baseClasses;

    switch (filterId) {
      // case 'organisation':
      //   return (
      //     <div key={filterId} className={containerClasses}>
      //       <div className="flex items-center gap-2 mb-2">
      //         <Building2 className="w-4 h-4 text-blue-600" />
      //         <label className="text-sm font-medium text-gray-900">Organisation</label>
      //       </div>
      //       <Select value={selectedEntity} onValueChange={setSelectedEntity}>
      //         <SelectTrigger 
      //           className="h-9 bg-blue-50 border-blue-200 text-sm transition-all duration-200 w-full"
      //           style={{ width: !isAdditional && window.innerWidth >= 1024 ? entityWidth : '100%' }}
      //         >
      //           <SelectValue placeholder="Select organization" />
      //         </SelectTrigger>
      //         <SelectContent>
      //           {entities.map((entity) => (
      //             <SelectItem key={entity} value={entity}>{entity}</SelectItem>
      //           ))}
      //         </SelectContent>
      //       </Select>
      //     </div>
      //   );

      case 'duration':
        return (
          <div key={filterId} className={containerClasses}>
            <div className="flex items-center gap-2 mb-2">
              <CalendarDays className="w-4 h-4 text-blue-600" />
              <label className="text-sm font-medium text-gray-900">Duration</label>
            </div>
            <Select value={selectedDuration} onValueChange={handleDurationChange}>
              <SelectTrigger 
                className="h-9 bg-blue-50 border-blue-200 text-sm transition-all duration-200 w-full"
                style={{ width: !isAdditional && window.innerWidth >= 1024 ? durationWidth : '100%' }}
              >
                <SelectValue placeholder="Select duration">{getActualDuration()}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {durations.map((duration) => (
                  <SelectItem key={duration} value={duration}>{duration}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case 'department':
        return (
          <div key={filterId} className={containerClasses}>
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-blue-600" />
              <label className="text-sm font-medium text-gray-900">Department</label>
            </div>
            <Select value={selectedBusinessType} onValueChange={handleBusinessTypeChange}>
              <SelectTrigger 
                className="h-9 bg-blue-50 border-blue-200 text-sm transition-all duration-200 w-full"
                style={{ width: !isAdditional && window.innerWidth >= 1024 ? departmentWidth : '100%' }}
              >
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                {businessTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case 'reportType':
        return (
          <div key={filterId} className={containerClasses}>
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-4 h-4 text-blue-600" />
              <label className="text-sm font-medium text-gray-900">Report Type</label>
            </div>
            <Select value={selectedReportType} onValueChange={handleReportTypeChange}>
              <SelectTrigger 
                className="h-9 bg-blue-50 border-blue-200 text-sm transition-all duration-200 w-full"
                style={{ width: !isAdditional && window.innerWidth >= 1024 ? reportTypeWidth : '100%' }}
              >
                <SelectValue placeholder="Report type" />
              </SelectTrigger>
              <SelectContent>
                {getReportTypesForDepartment(selectedBusinessType).map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case 'location':
        return (
          <div key={filterId} className={containerClasses}>
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-blue-600" />
              <label className="text-sm font-medium text-gray-900">Location</label>
            </div>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger 
                className="h-9 bg-blue-50 border-blue-200 text-sm transition-all duration-200 w-full"
                style={{ width: !isAdditional && window.innerWidth >= 1024 ? locationWidth : '100%' }}
              >
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                {getLocationOptions(selectedBusinessType).map((location) => (
                  <SelectItem key={location} value={location}>{location}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case 'valueUnit':
        return (
          <div key={filterId} className={containerClasses}>
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-blue-600" />
              <label className="text-sm font-medium text-gray-900">Value Unit</label>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={cycleValueUnit}
              className={`h-9 px-3 text-sm font-medium border transition-all duration-200 ${getUnitColor(valueUnit)}`}
              title={`Current unit: ${valueUnit}. Click to cycle through units.`}
            >
              <DollarSign className="w-4 h-4 mr-2" />
              {getUnitSymbol(valueUnit)}
            </Button>
          </div>
        );

      case 'topExpenses':
        return (
          <div key={filterId} className={containerClasses}>
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-blue-600" />
              <label className="text-sm font-medium text-gray-900">Expense Categories</label>
            </div>
            <Select value={topExpenseCategories} onValueChange={setTopExpenseCategories}>
              <SelectTrigger className="h-9 bg-blue-50 border-blue-200 text-sm transition-all duration-200 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Top 5">Top 5</SelectItem>
                <SelectItem value="Top 10">Top 10</SelectItem>
                <SelectItem value="Top 15">Top 15</SelectItem>
                <SelectItem value="Top 20">Top 20</SelectItem>
                <SelectItem value="All">All</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );

      default:
        return null;
    }
  };

  // Full screen header mode
  if (isHeaderFullScreen) {
    return (
      <DashboardHeader 
        selectedEntity={selectedEntity}
        setSelectedEntity={setSelectedEntity}
        selectedReportType={selectedReportType}
        setSelectedReportType={setSelectedReportType}
        selectedBusinessType={selectedBusinessType}
        setSelectedBusinessType={setSelectedBusinessType}
        selectedDuration={getActualDuration()}
        setSelectedDuration={setSelectedDuration}
        valueUnit={valueUnit}
        setValueUnit={setValueUnit}
        selectedBuyerType={selectedBuyerType}
        setSelectedBuyerType={setSelectedBuyerType}
        fullScreen={true}
        onToggleFullScreen={() => setIsHeaderFullScreen(false)}
      />
    );
  }

  // Full screen presentation mode
  if (isRevenueFullScreen) {
    return (
      <div className="w-full min-h-screen bg-background flex flex-col  lg:max-w-none lg:max-h-none lg:overflow-hidden" data-dashboard-container>
        {/* Minimal header for presentation */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-blue-50">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">{getFullScreenTitle()}</h1>
              <p className="text-base text-gray-600 mt-1">{selectedEntity} • {selectedBusinessType} • {selectedLocation} • {getActualDuration()}</p>
            </div>
          </div>

          {/* Filter and Exit Controls */}
          <div className="flex items-center gap-3">
            {/* Auto-Zoom Presentation Controls with Initial Delay */}
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border">
              {isInitialDelayActive ? (
                <>
                  <Timer className="w-4 h-4 text-orange-600" />
                  <span className="text-sm font-medium text-orange-700">Starting in {delayCountdown}s</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={cancelInitialDelay}
                    className="h-8 w-8 p-0 hover:bg-red-100 text-red-600"
                    title="Cancel Auto Start"
                  >
                    <Square className="w-4 h-4" />
                  </Button>
                </>
              ) : (
                <>
                  <span className="text-sm font-medium text-gray-700">Auto Focus:</span>
                  {!isAutoZoomActive ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={startAutoZoom}
                      className="h-8 w-8 p-0 hover:bg-green-100 text-green-600"
                      title="Start Auto Focus (10s per element)"
                      disabled={totalElements === 0}
                    >
                      <Play className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={pauseAutoZoom}
                      className="h-8 w-8 p-0 hover:bg-orange-100 text-orange-600"
                      title="Pause Auto Focus"
                    >
                      <Pause className="w-4 h-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={stopAutoZoom}
                    className="h-8 w-8 p-0 hover:bg-red-100 text-red-600"
                    title="Stop Auto Focus"
                  >
                    <Square className="w-4 h-4" />
                  </Button>
                  {totalElements > 0 && (
                    <div className="text-xs text-gray-500 ml-2">
                      {currentFocusedElement + 1}/{totalElements}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Value Unit Button in Full Screen */}
            <Button
              variant="outline"
              size="sm"
              onClick={cycleValueUnit}
              className={`h-10 px-4 text-sm font-medium border transition-all duration-200 ${getUnitColor(valueUnit)}`}
              title={`Current unit: ${valueUnit}. Click to cycle through units.`}
            >
              <DollarSign className="w-4 h-4 mr-2" />
              {getUnitSymbol(valueUnit)}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="h-10 w-10 p-0 rounded-lg transition-all duration-200 hover:bg-blue-50 text-blue-600"
              onClick={() => setIsAdvancedFiltersOpen(true)}
              title="Settings"
            >
              <Settings className="w-5 h-5" />
            </Button>
            
            <Button
              variant="outline"
              onClick={() => setIsRevenueFullScreen(false)}
              className="px-6 py-3 text-base"
            >
              Exit Presentation
            </Button>
          </div>
        </div>
        
        {/* Left Navigation Arrow */}
        <button
          onClick={() => handleFullScreenNavigation('prev')}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-white rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 hover:shadow-xl transition-all duration-200 group"
          aria-label="Previous chart"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600 group-hover:text-blue-600" />
        </button>

        {/* Right Navigation Arrow */}
        <button
          onClick={() => handleFullScreenNavigation('next')}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-white rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 hover:shadow-xl transition-all duration-200 group"
          aria-label="Next chart"
        >
          <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-blue-600" />
        </button>
        
        {/* Filter controls for presentation mode */}
        {selectedReportType === 'Revenue vs Expenses' && fullScreenChartType === 'expenses' && (
          <div className="px-8 pt-4 pb-2 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Expense Categories Breakdown</h2>
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-gray-500" />
                <Select value={topExpenseCategories} onValueChange={setTopExpenseCategories}>
                  <SelectTrigger className="w-32 h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Top 5">Top 5</SelectItem>
                    <SelectItem value="Top 10">Top 10</SelectItem>
                    <SelectItem value="Top 15">Top 15</SelectItem>
                    <SelectItem value="Top 20">Top 20</SelectItem>
                    <SelectItem value="All">All</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {/* Full screen single chart with breakdown */}
        <div className="flex-1 p-8">
          {shouldUseProductsLayout || shouldUseInsurersLayout ? (
            <ChartsSection_Products 
              valueUnit={valueUnit} 
              selectedReportType={selectedReportType}
              baseMetricsData={getBaseMetricsData()}
              topExpenseCategories={topExpenseCategories}
              currentFilters={currentFilters}
              onPlayFullView={handlePlayFullView}
              fullScreen={true}
              presentationMode={true}
              // Auto-zoom props
              autoZoomActive={isAutoZoomActive}
              currentFocusedElement={currentFocusedElement}
              onTotalElementsChange={handleTotalElementsChange}
            />
          ) : (
            <ChartsSection 
              valueUnit={valueUnit} 
              selectedReportType={selectedReportType}
              fullScreen={true}
              chartType={fullScreenChartType}
              baseMetricsData={getBaseMetricsData()}
              onNavigate={handleFullScreenNavigation}
              topExpenseCategories={topExpenseCategories}
              presentationMode={true}
              currentFilters={currentFilters}
              // Auto-zoom props
              autoZoomActive={isAutoZoomActive}
              currentFocusedElement={currentFocusedElement}
              onTotalElementsChange={handleTotalElementsChange}
            />
          )}
        </div>
      </div>
    );
  }

  // Normal dashboard view
  return (
    <div className="w-full min-h-screen bg-background flex flex-col  lg:max-w-none lg:max-h-none lg:overflow-hidden" data-dashboard-container>
      {/* Top Navigation */}
      <TopNavigation />
      
      {/* Main Content Container */}
      <main className="flex-1 lg:overflow-hidden">
        <div className="h-full px-4 sm:px-6 py-4 lg:overflow-y-auto">
          <div className="space-y-4">
            
            {/* Consolidated Dashboard Controls Section - Updated Layout */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 shadow-sm">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                {/* Left Side - Dynamic Pinned Filter Controls */}
                <div className="flex-1 space-y-4">
                  {/* Primary Row - Main Filters with More Conditions next to Report Type */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:flex lg:items-end lg:gap-6">
                    <div className="grid grid-cols-2 gap-4 sm:contents">
                      {primaryFilters.map(filterId => 
                        isFilterVisible(filterId) && renderFilterComponent(filterId)
                      ).filter(Boolean)}
                      
                      {/* More Conditions Button - positioned next to Report Type */}
                      {isFilterVisible('reportType') && (
                        <div key="more-conditions" className="min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-4 h-4"></div> {/* Spacer to align with other filters */}
                            <label className="text-sm font-medium text-transparent">
                              &nbsp;
                            </label>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsAdvancedFiltersOpen(true)}
                            className="h-9 px-3 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-all duration-200 underline-offset-4 hover:underline"
                          >
                            More
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Additional Row - Extra Pinned Filters */}
                  {additionalFilters.length > 0 && (
                    <div className="border-t border-gray-100 pt-4">
                      <div className="flex flex-wrap items-center gap-4 lg:gap-6">
                        {additionalFilters.map(filterId => renderFilterComponent(filterId, true)).filter(Boolean)}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Right Side - Action Controls */}
                <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:gap-3 lg:ml-6">
                  {/* Value Unit Button - Only show if not pinned as filter */}
                  {!isFilterVisible('valueUnit') && (
                    <div className="flex flex-col items-start lg:items-end">
                      <div className="mb-2 h-6"></div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={cycleValueUnit}
                        className={`h-9 px-4 text-sm font-medium border transition-all duration-200 ${getUnitColor(valueUnit)}`}
                        title={`Current unit: ${valueUnit}. Click to cycle through units.`}
                      >
                        <DollarSign className="w-4 h-4 mr-2" />
                        {valueUnit}
                      </Button>
                    </div>
                  )}

                  {/* Action Icons */}
                  <div className="flex flex-col items-start lg:items-end">
                    <div className="mb-2 h-6"></div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-9 w-9 p-0 rounded-lg transition-all duration-200 hover:bg-blue-50 text-blue-600"
                        onClick={() => setIsAdvancedFiltersOpen(true)}
                        title="Settings"
                      >
                        <Settings className="w-4 h-4" />
                      </Button>
                      
                      {/* <Button
                        variant="ghost"
                        size="sm"
                        className="h-9 w-9 p-0 rounded-lg transition-all duration-200 hover:bg-purple-50 text-purple-600"
                        onClick={() => setIsComparisonModalOpen(true)}
                        title="Compare Periods"
                      >
                        <GitCompare className="w-4 h-4" />
                      </Button> */}
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-9 w-9 p-0 rounded-lg transition-all duration-200 hover:bg-green-50 text-green-600"
                        onClick={() => setIsRevenueFullScreen(true)}
                        title="Full Screen"
                      >
                        <Maximize className="w-4 h-4" />
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-9 w-9 p-0 rounded-lg transition-all duration-200 hover:bg-amber-50 text-amber-600"
                        onClick={() => setIsLeaderboardOpen(true)}
                        title="Leaderboard"
                      >
                        <Trophy className="w-4 h-4" />
                      </Button>
                      
                      <SaveToPlaylistButton
                        currentFilters={currentFilters}
                        currentChartType={fullScreenChartType}
                        topExpenseCategories={topExpenseCategories}
                      />
                      
                      <PlaylistManager
                        currentFilters={currentFilters}
                        onPlayPlaylist={handlePlayPlaylist}
                        currentChartType={fullScreenChartType}
                        topExpenseCategories={topExpenseCategories}
                      />
                    </div>
                  </div>

                  {/* Today's Report Button */}
                  <div className="flex flex-col items-start lg:items-end">
                    <div className="mb-2 h-6"></div>
                    <TodaysReportButton 
                      onClick={() => setIsTodaysReportOpen(true)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Charts and Data Section - Updated Logic */}
            {/* API ENDPOINT: POST /api/charts/products-data
                REQUEST BODY: {filters: currentFilters, reportType: string, valueUnit: string}
                DATA FORMAT: {products: Array<{name: string, revenue: number, growth: number, market_share: number}>, 
                             breakdown: {b2b: number, b2c: number, b2b2c: number}, 
                             trends: Array<{period: string, value: number}>} */}
            {/* Unified Charts Section - Handles all report types */}
            {/* API ENDPOINT: POST /api/charts/unified-data
                REQUEST BODY: {filters: currentFilters, reportType: string, valueUnit: string}
                DATA FORMAT: Dynamic based on reportType - products, insurers, policy types, verticals, LOB, cross-sell */}
            {isRevenueReport && (shouldUseProductsLayout || shouldUseInsurersLayout) && (
              <ChartsSection_Products 
                valueUnit={valueUnit} 
                selectedReportType={selectedReportType}
                baseMetricsData={getBaseMetricsData()}
                topExpenseCategories={topExpenseCategories}
                currentFilters={currentFilters}
                onPlayFullView={handlePlayFullView}
              />
            )}
            {/* API ENDPOINT: POST /api/charts/general-revenue-data
                REQUEST BODY: {filters: currentFilters, reportType: string, valueUnit: string}
                DATA FORMAT: {revenue_streams: Array<{category: string, amount: number, percentage: number}>,
                             expenses: Array<{category: string, amount: number, budget: number, variance: number}>,
                             trends: {revenue: Array<{period: string, value: number}>, expenses: Array<{period: string, value: number}>}} */}
            {isRevenueReport && !shouldUseProductsLayout && !shouldUseInsurersLayout && (
              <RevenueVsExpences 
                valueUnit={valueUnit} 
                selectedReportType={selectedReportType}
                baseMetricsData={getBaseMetricsData()}
                topExpenseCategories={topExpenseCategories}
                currentFilters={currentFilters}
                onPlayFullView={handlePlayFullView}
              />
            )}

            {/* Retention Component - Now shows for Retention department */}
            {/* API ENDPOINT: POST /api/retention/data
                REQUEST BODY: {department: string, reportType: string, filters: currentFilters}
                DATA FORMAT: {retention_rates: Array<{insurer: string, rate: number, trend: string, policies_retained: number}>,
                             client_retention: {new_clients: number, retained_clients: number, churned_clients: number},
                             retention_trends: Array<{period: string, rate: number, target: number}>,
                             top_performers: Array<{broker: string, retention_rate: number, revenue_impact: number}>} */}
            {shouldShowRetention && selectedReportType === 'Retention - By Insurer' && (
              <RetentionByInsurer 
                valueUnit={valueUnit}
                selectedBusinessType={selectedBusinessType}
                selectedReportType={selectedReportType}
              />
            )}
            
            {shouldShowRetention && selectedReportType === 'Retention - Broker' && (
              <RetentionByBroker 
                valueUnit={valueUnit}
                selectedBusinessType={selectedBusinessType}
                selectedReportType={selectedReportType}
              />
            )}

            {/* Customer Analysis Components */}
            {shouldShowCustomerAnalysis && selectedReportType === 'Duration of Relationship' && (
              <DurationOfRelationship />
            )}
            
            {shouldShowCustomerAnalysis && selectedReportType === 'Number of Products Purchased' && (
              <NumberOfProducts />
            )}
            
            {shouldShowCustomerAnalysis && selectedReportType === 'Premium Contribution by Customer' && (
              <PremiumContribution />
            )}
            
            {shouldShowCustomerAnalysis && selectedReportType === 'Customer Satisfaction / NPS' && (
              <CustomerSatisfaction />
            )}
            
            {shouldShowCustomerAnalysis && selectedReportType === 'Cross-Sell / Upsell Potential' && (
              <CrossSellUpsell />
            )}

            {/* Modals and Overlays */}
            {/* API ENDPOINT: GET /api/reports/today
                QUERY PARAMS: ?entity={selectedEntity}&department={selectedBusinessType}
                DATA FORMAT: {summary: {revenue: number, policies: number, leads: number, calls: number},
                             alerts: Array<{type: string, message: string, priority: 'high' | 'medium' | 'low'}>,
                             activities: Array<{time: string, activity: string, user: string, details: object}>,
                             goals: {revenue: {current: number, target: number}, policies: {current: number, target: number}}} */}
            {isTodaysReportOpen && (
              <TodaysReportPanel 
                isOpen={isTodaysReportOpen}
                onClose={() => setIsTodaysReportOpen(false)}
              />
            )}

            {isAdvancedFiltersOpen && (
              <AdvancedFilters 
                isOpen={isAdvancedFiltersOpen}
                onClose={() => setIsAdvancedFiltersOpen(false)}
                valueUnit={valueUnit}
                onValueUnitChange={setValueUnit}
                topExpenseCategories={topExpenseCategories}
                onTopExpenseCategoriesChange={setTopExpenseCategories}
                selectedEntity={selectedEntity}
                selectedBusinessType={selectedBusinessType}
                selectedLocation={selectedLocation}
                selectedReportType={selectedReportType}
                selectedDuration={getActualDuration()}
                // Add pinned items props
                pinnedItems={pinnedItems}
                onPinnedItemsChange={handlePinnedItemsChange}
              />
            )}

            {/* API ENDPOINT: POST /api/analytics/comparison
                REQUEST BODY: {period1: string, period2: string, filters: currentFilters, metrics: Array<string>}
                DATA FORMAT: {period1_data: object, period2_data: object, variance: object, 
                             growth_rates: object, insights: Array<{metric: string, insight: string, significance: string}>} */}
            {isComparisonModalOpen && (
              <ComparisonModal
                isOpen={isComparisonModalOpen}
                onClose={() => setIsComparisonModalOpen(false)}
                currentFilters={currentFilters}
                baseMetricsData={getBaseMetricsData()}
                onComparisonApply={handleComparisonApply}
              />
            )}

            {isComparisonChartOpen && (
              <ComparisonChart
                isOpen={isComparisonChartOpen}
                onClose={() => setIsComparisonChartOpen(false)}
                period1={comparisonPeriod1}
                period2={comparisonPeriod2}
                reportType={selectedReportType}
                valueUnit={valueUnit}
                currentFilters={currentFilters}
                customDates={comparisonCustomDates}
              />
            )}

            {/* API ENDPOINT: GET /api/leaderboard
                QUERY PARAMS: ?department={selectedBusinessType}&period={selectedDuration}&metric=revenue
                DATA FORMAT: {rankings: Array<{rank: number, name: string, department: string, value: number, change: number, avatar: string}>,
                             categories: Array<{id: string, name: string, description: string}>,
                             achievements: Array<{user_id: string, badge: string, earned_date: string}>,
                             goals: {individual: Array, team: Array, department: Array}} */}
            {isLeaderboardOpen && (
              <LeaderboardModal 
                isOpen={isLeaderboardOpen}
                onClose={() => setIsLeaderboardOpen(false)}
              />
            )}

            {isCustomPeriodModalOpen && (
              <CustomPeriodModal
                isOpen={isCustomPeriodModalOpen}
                onClose={handleCustomPeriodClose}
                onApply={handleCustomPeriodApply}
                currentStartDate={customStartDate}
                currentEndDate={customEndDate}
              />
            )}

            {isPresentationMode && (
              <PresentationMode 
                isOpen={isPresentationMode}
                onClose={() => setIsPresentationMode(false)}
                selectedEntity={selectedEntity}
                selectedReportType={selectedReportType}
                selectedBusinessType={selectedBusinessType}
                selectedLocation={selectedLocation}
                actualDuration={getActualDuration()}
                valueUnit={valueUnit}
                baseMetricsData={getBaseMetricsData()}
                topExpenseCategories={topExpenseCategories}
                allReportTypes={getReportTypesForDepartment(selectedBusinessType)}
                onReportTypeChange={setSelectedReportType}
                onValueUnitChange={setValueUnit}
                onTopExpenseCategoriesChange={setTopExpenseCategories}
              />
            )}
          </div>
        </div>
      </main>

      {/* Playlist Player */}
      {/* API ENDPOINT: GET /api/playlists/{playlistId}
          DATA FORMAT: {id: string, name: string, description: string, items: Array<{filters: object, chartType: string, duration: number}>,
                       created_by: string, shared_with: Array<string>, auto_play: boolean}
          
          API ENDPOINT: POST /api/playlists/{playlistId}/play
          REQUEST BODY: {item_index: number, user_id: string}
          DATA FORMAT: {success: boolean, current_item: object, next_item: object} */}
      {currentPlaylist && (
        <PlaylistPlayer
          playlist={currentPlaylist}
          isOpen={isPlaylistPlayerOpen}
          onClose={() => {
            setIsPlaylistPlayerOpen(false);
            setCurrentPlaylist(null);
            setIsRevenueFullScreen(false);
          }}
          onItemChange={handlePlaylistItemChange}
          onFiltersChange={(filters) => {
            // Apply filters without triggering playlist navigation
          }}
          onReportTypeChange={(reportType) => {
            // Report type change is handled in handlePlaylistItemChange
          }}
          onChartTypeChange={(chartType) => {
            setFullScreenChartType(chartType);
          }}
        />
      )}
    </div>
  );
}