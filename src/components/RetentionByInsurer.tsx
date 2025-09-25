import React, { useState, useEffect, useMemo } from "react";
import { Card } from "./ui/card";
import { commonStyles, chartDimensions, topFilterOptions, getChartSubtitle } from "./commonStyle";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  Area,
  AreaChart,
  Legend,
} from "recharts";
import { ScrollableBarChart, ScrollableLineChart, shouldUseScrollableChart, renderEnhancedChart } from "./ChartUtils";
import { ThreeDotsMenu } from "./ThreeDotsMenu";
import { FullScreenChartModalEnhanced } from "./FullScreenChartModal_Enhanced";
import { ChartType } from "./ChartTypeSwitcher";
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Target,
  AlertTriangle,
  Filter,
  Search,
  ChevronDown,
  Building2,
  MapPin,
  UserCheck,
  UserX,
  Banknote,
  AlertCircle,
  Package,
  FileText,
  BarChart3,
  Table,
  Download,
  Briefcase,
  Store,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Shield,
  Percent,
} from "lucide-react";

// Loss Reason Data Interface
interface LossReasonData {
  id: string;
  name: string;
  value: number;
  color: string;
  percentage: number;
  premium: number;
  policies: number;
}

// Loss Reason Table Props Interface
interface LossReasonTableProps {
  lossReasonData: LossReasonData[];
  valueUnit: string;
  getFormattedValue: (value: number) => string;
  formatNumber: (num: number) => number;
  className?: string;
}

type SortState = 'none' | 'desc' | 'asc';
type SortColumn = 'policies' | 'premium' | 'percentage';

// Loss Reason Table Component
function LossReasonTable({
  lossReasonData,
  valueUnit,
  getFormattedValue,
  formatNumber,
  className = "",
}: LossReasonTableProps) {
  const [sortColumn, setSortColumn] = useState<SortColumn | null>(null);
  const [sortState, setSortState] = useState<SortState>('none');

  // Handle sort click
  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      // Cycle through states: none -> desc -> asc -> none
      if (sortState === 'none') {
        setSortState('desc');
      } else if (sortState === 'desc') {
        setSortState('asc');
      } else {
        setSortState('none');
        setSortColumn(null);
      }
    } else {
      setSortColumn(column);
      setSortState('desc');
    }
  };

  // Sort data based on current sort state
  const sortedData = useMemo(() => {
    if (!sortColumn || sortState === 'none') {
      return lossReasonData;
    }

    return [...lossReasonData].sort((a, b) => {
      let aValue: number;
      let bValue: number;

      switch (sortColumn) {
        case 'policies':
          aValue = a.policies;
          bValue = b.policies;
          break;
        case 'premium':
          aValue = a.premium;
          bValue = b.premium;
          break;
        case 'percentage':
          aValue = a.value;
          bValue = b.value;
          break;
        default:
          return 0;
      }

      if (sortState === 'desc') {
        return bValue - aValue; // High to low
      } else {
        return aValue - bValue; // Low to high
      }
    });
  }, [lossReasonData, sortColumn, sortState]);

  // Get SVG color based on sort state
  const getSvgColor = (column: SortColumn) => {
    if (sortColumn !== column) return 'currentColor';
    if (sortState === 'desc') return '#22c55e'; // Green for high to low
    if (sortState === 'asc') return '#ef4444'; // Red for low to high
    return 'currentColor'; // Default
  };

  // Get SVG rotation based on sort state
  const getSvgRotation = (column: SortColumn) => {
    if (sortColumn !== column || sortState === 'none') return '';
    if (sortState === 'asc') return 'rotate-180';
    return '';
  };

  return (
    <Card className="p-4 h-full">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-orange-100">
          <AlertTriangle className="w-5 h-5 text-orange-600" />
        </div>
        <div>
          <h3 className="font-medium text-gray-700">Loss Reason Details</h3>
          <p className="text-sm text-gray-500">Detailed breakdown of policy losses</p>
        </div>
      </div>

      <div className="h-96 overflow-auto relative">
        {/* Sticky Table Header */}
        <div
          className="sticky top-0 z-20 bg-white border-b border-gray-200 grid gap-4 py-3 px-2 text-sm font-medium text-gray-700"
          style={{ gridTemplateColumns: "2fr 1fr 1fr 1fr" }}
        >
          {/* Sticky Loss Reason Header */}
          <div className="flex items-center justify-start">
            Loss Reason
          </div>
          
          {/* Sortable Headers */}
          <div 
            className="cursor-pointer hover:bg-gray-100 px-2 py-2 rounded transition-colors flex items-center justify-center"
            onClick={() => handleSort('policies')}
          >
            <span className="mr-1">Policies</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke={getSvgColor('policies')}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-all duration-200 ${getSvgRotation('policies')}`}
            >
              <path d="M12 5v14"></path>
              <path d="m19 12-7 7-7-7"></path>
            </svg>
          </div>
          
          <div 
            className="cursor-pointer hover:bg-gray-100 px-2 py-2 rounded transition-colors flex items-center justify-center"
            onClick={() => handleSort('premium')}
          >
            <span className="mr-1">Premium</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke={getSvgColor('premium')}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-all duration-200 ${getSvgRotation('premium')}`}
            >
              <path d="M12 5v14"></path>
              <path d="m19 12-7 7-7-7"></path>
            </svg>
          </div>
          
          <div 
            className="cursor-pointer hover:bg-gray-100 px-2 py-2 rounded transition-colors flex items-center justify-center"
            onClick={() => handleSort('percentage')}
          >
            <span className="mr-1">Percentage</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke={getSvgColor('percentage')}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-all duration-200 ${getSvgRotation('percentage')}`}
            >
              <path d="M12 5v14"></path>
              <path d="m19 12-7 7-7-7"></path>
            </svg>
          </div>
        </div>

        {/* Table Body */}
        <div className="space-y-2 pt-2">
          {sortedData.map((item, index) => (
            <div
              key={item.id}
              className="grid gap-4 py-3 px-2 hover:bg-gray-50 rounded-lg transition-colors border border-gray-100"
              style={{ gridTemplateColumns: "2fr 1fr 1fr 1fr" }}
            >
              {/* Loss Reason Name with Color Indicator */}
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full shadow-sm flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                ></div>
                <div className="min-w-0">
                  <span className="text-sm font-medium text-gray-700 block truncate">
                    {item.name}
                  </span>
                </div>
              </div>

              {/* Policies Count */}
              <div className="text-center">
                <span className="text-sm font-medium text-gray-700">
                  {formatNumber(item.policies)}
                </span>
              </div>

              {/* Premium Amount */}
              <div className="text-center">
                <span className="text-sm font-medium text-gray-700">
                  {getFormattedValue(item.premium)}
                </span>
                <p className="text-xs text-gray-500">{valueUnit}s</p>
              </div>

              {/* Percentage */}
              <div className="text-center">
                <span className="text-sm font-medium text-gray-700">
                  {item.value}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

interface RetentionByInsurerProps {
  valueUnit: string;
  selectedReportType?: string;
  fullScreen?: boolean;
  chartType?: "revenue" | "expenses";
  baseMetricsData?: {
    totalRevenue: number;
    expenses: number;
    grossProfit: number;
    };
  onNavigate?: (direction: "prev" | "next") => void;
  topExpenseCategories?: string;
  presentationMode?: boolean;
  onPresentationMode?: () => void;
  onPlayFullView?: (
    filters: any,
    chartData: any,
    chartType?: "revenue" | "expenses"
  ) => void;
  // Add props for current filters to pass to SavedChartsManager
  currentFilters?: {
    selectedEntity: string;
    selectedReportType: string;
    selectedBusinessType: string;
    selectedLocation: string;
    selectedDuration: string;
    valueUnit: string;
  };
  // Auto-zoom props
  autoZoomActive?: boolean;
  currentFocusedElement?: number;
  onTotalElementsChange?: (count: number) => void;
  selectedXAxis?: string;
  selectedYAxis?: string;
}

export function RetentionByInsurer({ valueUnit,
  selectedReportType = "Revenue by Products",
  fullScreen = false,
  chartType,
  baseMetricsData,
  onNavigate,
  topExpenseCategories = "Top 10",
  presentationMode = false,
  onPresentationMode,
  onPlayFullView,
  currentFilters,
  // Auto-zoom props
  autoZoomActive = false,
  currentFocusedElement = 0,
  onTotalElementsChange,
  selectedXAxis,
  selectedYAxis, }: RetentionByInsurerProps) {
    // Insurer details panel state
      const [selectedItem, setSelectedItem] = useState<any>(null);
      const [isItemDetailsOpen, setIsItemDetailsOpen] = useState(false);
  
  // Add state for focused element (for enhanced donut chart)
  const [focusedElement, setFocusedElement] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("retention-desc");
  const [selectedInsurers, setSelectedInsurers] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([
    "Mumbai",
    "Delhi",
  ]);
  const [showFilters, setShowFilters] = useState(false);
  
  // Loss Reason Analysis chart controls
  const [lossReasonTopFilter, setLossReasonTopFilter] = useState<string>("Top 10");
  // Removed duplicate lossReasonChartType - using chartTypeState instead
  
  // ThreeDotsMenu and modal states
  const [chartTypeState, setChartTypeState] = useState<ChartType>("donut");
  const [isListExpanded, setIsListExpanded] = useState(false);
  const [isFullScreenModalOpen, setIsFullScreenModalOpen] = useState(false);
  const [fullScreenChartData, setFullScreenChartData] = useState<any>(null);
  const [fullScreenChartType, setFullScreenChartType] = useState<ChartType>("donut");
  const [fullScreenChartTitle, setFullScreenChartTitle] = useState("");
  const [fullScreenChartSubtitle, setFullScreenChartSubtitle] = useState("");

  // Handle item click for retention data
  const handleItemClick = (item: any) => {
    setSelectedItem(item);
    setIsItemDetailsOpen(true);
  };

  // Handle segment click for enhanced donut chart
  const handleSegmentClick = (data: any, index: number) => {
    if (focusedElement && focusedElement.id === data.id) {
      setFocusedElement(null);
    } else {
      setFocusedElement(data);
    }
  };

  const getFormattedValue = (value: number) => {
    if (valueUnit === "Crore") {
      return `₹${(value / 100).toFixed(2)}`;
    } else if (valueUnit === "Lakh") {
      return `₹${value.toFixed(2)}`;
    } else if (valueUnit === "Thousands") {
      return `₹${(value * 100).toFixed(2)}`;
    }
    return `₹${value.toFixed(2)}`;
  };

  // Helper function to get formatted total
  const getFormattedTotal = (total: number) => {
    return getFormattedValue(total);
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString("en-IN");
  };

  // Enhanced Executive Color Palette - More Vibrant & Distinctive
  const colorPalette = {
    // Primary Palette - Bright & Professional
    royalBlue: "#1E40AF", // Deep royal blue (authority)
    emeraldGreen: "#059669", // Rich emerald (success)
    vibrantOrange: "#EA580C", // Bright orange (energy)
    skyBlue: "#0284C7", // Vibrant sky blue (clarity)
    goldenYellow: "#D97706", // Rich golden yellow (optimism)
    richPurple: "#7C3AED", // Deep violet (innovation)
    tealMint: "#0D9488", // Fresh teal (balance)
    charcoalGray: "#374151", // Professional gray (stability)

    // Secondary Palette - Complementary Colors
    crimsonRed: "#DC2626", // Bold red (urgency)
    forestGreen: "#16A34A", // Forest green (growth)
    amberWarm: "#F59E0B", // Warm amber (caution)
    indigoDeep: "#4338CA", // Deep indigo (trust)
    roseVibrant: "#E11D48", // Vibrant rose (attention)
    cyanBright: "#06B6D4", // Bright cyan (freshness)
    lavenderSoft: "#8B5CF6", // Soft lavender (elegance)

    // Supporting Colors
    slateModern: "#64748B", // Modern slate (neutral)
    limeEnergetic: "#84CC16", // Energetic lime (vitality)
    pinkMagenta: "#EC4899", // Magenta pink (creativity)
  };
   const professionalColors = {
    // Revenue Business Model Colors - Professional and vibrant
    revenueColors: [
      "#3B82F6", // Professional blue
      "#10B981", // Emerald green
      "#F59E0B", // Amber
      "#8B5CF6", // Purple
      "#EF4444", // Red
      "#06B6D4", // Cyan
      "#84CC16", // Lime
      "#EC4899", // Pink
      "#14B8A6", // Teal
      "#F97316", // Orange
    ],
    // Expenses Colors - Extended palette for 20 items
    expenseColors: [
      "#6366F1", // Indigo
      "#EC4899", // Pink
      "#14B8A6", // Teal
      "#F97316", // Orange
      "#84CC16", // Lime
      "#8B5CF6", // Violet
      "#EF4444", // Red
      "#06B6D4", // Cyan
      "#F59E0B", // Amber
      "#10B981", // Emerald
      "#3B82F6", // Blue
      "#F43F5E", // Rose
      "#8B5A2B", // Brown
      "#6B7280", // Gray
      "#7C3AED", // Purple
      "#059669", // Green
      "#DC2626", // Red-600
      "#2563EB", // Blue-600
      "#7C2D12", // Orange-800
      "#BE123C", // Rose-700
    ],
  };


  // Loss reason data with comprehensive breakdown
  const lossReasonData = [
    {
      id: "price-competitiveness",
      name: "Price Competitiveness",
      value: 35.2,
      premium: 850,
      policies: 340,
      percentage: 35.2,
      color: colorPalette.vibrantOrange,
    },
    {
      id: "service-issues",
      name: "Service Issues",
      value: 22.1,
      premium: 534,
      policies: 180,
      percentage: 22.1,
      color: colorPalette.crimsonRed,
    },
    {
      id: "coverage-gaps",
      name: "Coverage Gaps",
      value: 18.7,
      premium: 452,
      policies: 150,
      percentage: 18.7,
      color: colorPalette.richPurple,
    },
    {
      id: "client-moved-broker",
      name: "Client Moved to Another Broker",
      value: 15.4,
      premium: 372,
      policies: 125,
      percentage: 15.4,
      color: colorPalette.charcoalGray,
    },
    {
      id: "policy-cancelled",
      name: "Policy Cancelled",
      value: 8.6,
      premium: 208,
      policies: 70,
      percentage: 8.6,
      color: colorPalette.slateModern,
    },
    {
      id: "claims-processing-delays",
      name: "Claims Processing Delays",
      value: 7.8,
      premium: 189,
      policies: 62,
      percentage: 7.8,
      color: colorPalette.emeraldGreen,
    },
    {
      id: "inadequate-communication",
      name: "Inadequate Communication",
      value: 6.9,
      premium: 167,
      policies: 55,
      percentage: 6.9,
      color: colorPalette.skyBlue,
    },
    {
      id: "product-limitations",
      name: "Product Limitations",
      value: 6.2,
      premium: 150,
      policies: 48,
      percentage: 6.2,
      color: colorPalette.goldenYellow,
    },
    {
      id: "regulatory-changes",
      name: "Regulatory Changes",
      value: 5.8,
      premium: 140,
      policies: 45,
      percentage: 5.8,
      color: colorPalette.tealMint,
    },
    {
      id: "technology-issues",
      name: "Technology Issues",
      value: 5.4,
      premium: 131,
      policies: 42,
      percentage: 5.4,
      color: colorPalette.royalBlue,
    },
    {
      id: "market-competition",
      name: "Market Competition",
      value: 4.9,
      premium: 118,
      policies: 38,
      percentage: 4.9,
      color: colorPalette.forestGreen,
    },
    {
      id: "customer-dissatisfaction",
      name: "Customer Dissatisfaction",
      value: 4.5,
      premium: 109,
      policies: 35,
      percentage: 4.5,
      color: colorPalette.amberWarm,
    },
    {
      id: "policy-terms-complexity",
      name: "Policy Terms Complexity",
      value: 4.1,
      premium: 99,
      policies: 32,
      percentage: 4.1,
      color: colorPalette.indigoDeep,
    },
    {
      id: "renewal-process-issues",
      name: "Renewal Process Issues",
      value: 3.8,
      premium: 92,
      policies: 29,
      percentage: 3.8,
      color: colorPalette.roseVibrant,
    },
    {
      id: "documentation-problems",
      name: "Documentation Problems",
      value: 3.5,
      premium: 85,
      policies: 27,
      percentage: 3.5,
      color: colorPalette.cyanBright,
    },
    {
      id: "agent-performance",
      name: "Agent Performance",
      value: 3.2,
      premium: 77,
      policies: 25,
      percentage: 3.2,
      color: colorPalette.lavenderSoft,
    },
    {
      id: "economic-factors",
      name: "Economic Factors",
      value: 2.9,
      premium: 70,
      policies: 22,
      percentage: 2.9,
      color: colorPalette.limeEnergetic,
    },
    {
      id: "digital-platform-issues",
      name: "Digital Platform Issues",
      value: 2.6,
      premium: 63,
      policies: 20,
      percentage: 2.6,
      color: colorPalette.pinkMagenta,
    },
    {
      id: "underwriting-concerns",
      name: "Underwriting Concerns",
      value: 2.3,
      premium: 56,
      policies: 18,
      percentage: 2.3,
      color: "#FF6B6B",
    },
    {
      id: "payment-processing",
      name: "Payment Processing",
      value: 2.1,
      premium: 51,
      policies: 16,
      percentage: 2.1,
      color: "#4ECDC4",
    },
    {
      id: "risk-assessment-issues",
      name: "Risk Assessment Issues",
      value: 1.8,
      premium: 43,
      policies: 14,
      percentage: 1.8,
      color: "#45B7D1",
    },
    {
      id: "compliance-requirements",
      name: "Compliance Requirements",
      value: 1.5,
      premium: 36,
      policies: 12,
      percentage: 1.5,
      color: "#96CEB4",
    },
    {
      id: "data-security-concerns",
      name: "Data Security Concerns",
      value: 1.2,
      premium: 29,
      policies: 10,
      percentage: 1.2,
      color: "#FFEAA7",
    },
    {
      id: "other-reasons",
      name: "Other Reasons",
      value: 0.9,
      premium: 22,
      policies: 8,
      percentage: 0.9,
      color: "#DDA0DD",
    },
  ];

  // Filter function for loss reason data
  const getFilteredLossReasonData = () => {
    const topCount = parseInt(lossReasonTopFilter.replace("Top ", ""));
    return lossReasonData.slice(0, topCount);
  };

  // Enhanced donut chart renderer (similar to RevenueVsExpences)
  const renderEnhancedDonut = (
    data: any[],
    size: { width: number; height: number },
    total: number,
    isPresentation = false
  ) => {
    // For presentation mode, use larger chart size and include both percentage and labels
    const presentationMultiplier = isPresentation ? 1.4 : 1.0;
    const outerRadiusMultiplier = isPresentation ? 0.38 : 0.32;
    const innerRadiusMultiplier = isPresentation ? 0.2 : 0.18;
    const labelDistance = isPresentation ? 45 : 30;

    // Calculate background circle size based on inner radius
    const backgroundRadius =
      Math.min(size.width, size.height) * innerRadiusMultiplier * 0.85;

    const handleSegmentClick = (data: any, index: number) => {
      // Handle segment click for auto-zoom
      if (onTotalElementsChange) {
        onTotalElementsChange(data.length);
      }
    };

    const getFormattedTotal = (total: number) => {
      return `${total.toFixed(1)}%`;
    };

    return (
      <div
        className="relative"
        style={{ width: size.width, height: size.height }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            {/* SVG Filters for Auto-Zoom Effects */}
            <defs>
              <filter
                id="magnifyGlow"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter
                id="focusHighlight"
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
              >
                <feDropShadow
                  dx="0"
                  dy="0"
                  stdDeviation="4"
                  floodColor="#3B82F6"
                  floodOpacity="0.6"
                />
              </filter>
            </defs>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({
                cx,
                cy,
                midAngle,
                innerRadius,
                outerRadius,
                percent,
                index,
                payload,
              }: {
                cx: number;
                cy: number;
                midAngle: number;
                innerRadius: number;
                outerRadius: number;
                percent: number;
                index: number;
                payload: any;
              }) => {
                const RADIAN = Math.PI / 180;
                const radius = outerRadius + labelDistance;
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);

                return (
                  <text
                    x={x}
                    y={y}
                    fill="#374151"
                    textAnchor={x > cx ? "start" : "end"}
                    dominantBaseline="central"
                    className="text-sm transition-all duration-500 font-medium"
                    fontSize="14"
                  >
                    {`${(percent * 100).toFixed(0)}%`}
                  </text>
                );
              }}
              outerRadius={
                Math.min(size.width, size.height) * outerRadiusMultiplier
              }
              innerRadius={
                Math.min(size.width, size.height) * innerRadiusMultiplier
              }
              paddingAngle={2}
              cornerRadius={8}
              dataKey="value"
              onClick={handleSegmentClick}
              stroke="#ffffff"
              strokeWidth={2}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  className="cursor-pointer transition-all duration-500 hover:opacity-90"
                />
              ))}
            </Pie>
            <Tooltip
              content={CustomTooltip}
              position={{
                x: size.width / 2,
                y:
                  Math.min(size.height, size.width) * innerRadiusMultiplier -
                  50,
              }}
              offset={0}
              allowEscapeViewBox={{ x: false, y: false }}
              wrapperStyle={{
                zIndex: 1000,
                transform: "translateX(-50%)",
                pointerEvents: "none",
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Round background for center label */}
        <div
          className="absolute bg-white rounded-full border border-gray-100 shadow-sm flex items-center justify-center pointer-events-none"
          style={{
            width: backgroundRadius * 2,
            height: backgroundRadius * 2,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="text-center">
            <div
              className={`${
                isPresentation ? "text-3xl" : "text-2xl"
              } font-semibold text-gray-900`}
            >
              {getFormattedTotal(total)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Chart rendering function for loss reason analysis
  // Enhanced chart renderer with scrollable support for bar and line charts
  const renderLossReasonChart = (
    data: any[],
    chartType: string,
    isFullScreen: boolean = false,
    showLegend: boolean = true
  ) => {
    
    const size = isFullScreen ? chartDimensions.fullScreen : chartDimensions.default;
    
    // Check if we should use the enhanced scrollable chart
    const useScrollable = shouldUseScrollableChart(lossReasonTopFilter, data.length);
    
    // Custom tooltip for loss reason charts
    const CustomTooltip = ({ active, payload, label }: any) => {
      if (active && payload && payload.length) {
        return (
          <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
            <p className="font-semibold text-gray-900">{label}</p>
            <p className="text-blue-600">
              Loss Percentage: {payload[0].value}%
            </p>
          </div>
        );
      }
      return null;
    };

    // Try to render with enhanced chart utils first for bar and line charts
    if (chartType === "bar" && useScrollable) {
      return (
        <ScrollableBarChart
          data={data}
          dataKey="value"
          nameKey="name"
          color="#3B82F6"
          valueFormatter={(value: number) => `${value}%`}
          config={{
            containerHeight: size.height,
            minBarWidth: 50,
            scrollThreshold: 10,
            marginBottom: 80
          }}
        />
      );
    }
    
    if (chartType === "line" && useScrollable) {
      return (
        <ScrollableLineChart
          data={data}
          dataKey="value"
          nameKey="name"
          color="#3B82F6"
          valueFormatter={(value: number) => `${value}%`}
          config={{
            containerHeight: size.height,
            scrollThreshold: 10,
            marginBottom: 80
          }}
        />
      );
    }

    // Fallback to original implementation for non-scrollable cases and other chart types
    if (chartType === "bar") {
      return (
        <div className="w-full h-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              barCategoryGap="10%"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={80}
                interval={0}
                fontSize={12}
                tick={{ fontSize: 12 }}
              />
              <YAxis fontSize={12} />
              <Tooltip content={CustomTooltip} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      );
    } else if (chartType === "line") {
      return (
        <div className="w-full h-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={80}
                interval={0}
                fontSize={12}
                tick={{ fontSize: 12 }}
              />
              <YAxis fontSize={12} />
              <Tooltip content={CustomTooltip} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "#3B82F6", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      );
    } else if (chartType === "area") {
      return (
        <div className="w-full h-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={80}
                interval={0}
                fontSize={12}
                tick={{ fontSize: 12 }}
              />
              <YAxis fontSize={12} />
              <Tooltip content={CustomTooltip} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      );
    } else if (chartType === "stacked") {
      return (
        <div className="w-full h-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={CustomTooltip} />
              <Bar dataKey="value" stackId="a" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      );
    } else if (chartType === "donut" || chartType === "pie") {
      // Use enhanced donut chart implementation
      if (!data || data.length === 0) {
        return (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-gray-500">No data available</p>
          </div>
        );
      }

      // Calculate total for center display
      const total = data.reduce((sum, item) => sum + item.value, 0);
      
      return renderEnhancedDonut(data, size, total, presentationMode);
    }

    // Default fallback (should not reach here)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-gray-500">Chart type not supported: {chartType}</p>
      </div>
    );
  };

  // Comprehensive retention metrics
  const retentionMetrics = {
    retentionRate: 73.2,
    lostBusinessRate: 26.8,
    premiumRetained: 3850,
    premiumLost: 1416,
    revenueEarned: 577.5,
    potentialLoss: 212.4,
  };

  // Enhanced insurer data with comprehensive metrics
  const insurerRetentionData = [
    {
      company: "ICICI Lombard General Insurance",
      totalPremium: 1200,
      retainedPremium: 912,
      lostPremium: 288,
      retainedPolicies: 456,
      lostPolicies: 144,
      avgTicketSizeRetained: 2.0,
      avgTicketSizeLost: 2.0,
      retentionPercentage: 76.0,
      lostPercentage: 24.0,
    },
    {
      company: "HDFC ERGO General Insurance",
      totalPremium: 980,
      retainedPremium: 725,
      lostPremium: 255,
      retainedPolicies: 362,
      lostPolicies: 98,
      avgTicketSizeRetained: 2.0,
      avgTicketSizeLost: 2.6,
      retentionPercentage: 74.0,
      lostPercentage: 26.0,
    },
    {
      company: "Bajaj Allianz General Insurance",
      totalPremium: 750,
      retainedPremium: 540,
      lostPremium: 210,
      retainedPolicies: 270,
      lostPolicies: 105,
      avgTicketSizeRetained: 2.0,
      avgTicketSizeLost: 2.0,
      retentionPercentage: 72.0,
      lostPercentage: 28.0,
    },
    {
      company: "Tata AIG General Insurance",
      totalPremium: 650,
      retainedPremium: 468,
      lostPremium: 182,
      retainedPolicies: 234,
      lostPolicies: 91,
      avgTicketSizeRetained: 2.0,
      avgTicketSizeLost: 2.0,
      retentionPercentage: 72.0,
      lostPercentage: 28.0,
    },
    {
      company: "New India Assurance",
      totalPremium: 520,
      retainedPremium: 364,
      lostPremium: 156,
      retainedPolicies: 182,
      lostPolicies: 78,
      avgTicketSizeRetained: 2.0,
      avgTicketSizeLost: 2.0,
      retentionPercentage: 70.0,
      lostPercentage: 30.0,
    },
    {
      company: "Oriental Insurance Company",
      totalPremium: 480,
      retainedPremium: 326,
      lostPremium: 154,
      retainedPolicies: 163,
      lostPolicies: 77,
      avgTicketSizeRetained: 2.0,
      avgTicketSizeLost: 2.0,
      retentionPercentage: 68.0,
      lostPercentage: 32.0,
    },
    {
      company: "United India Insurance",
      totalPremium: 420,
      retainedPremium: 277,
      lostPremium: 143,
      retainedPolicies: 139,
      lostPolicies: 71,
      avgTicketSizeRetained: 2.0,
      avgTicketSizeLost: 2.0,
      retentionPercentage: 66.0,
      lostPercentage: 34.0,
    },
    {
      company: "National Insurance Company",
      totalPremium: 380,
      retainedPremium: 247,
      lostPremium: 133,
      retainedPolicies: 124,
      lostPolicies: 66,
      avgTicketSizeRetained: 2.0,
      avgTicketSizeLost: 2.0,
      retentionPercentage: 65.0,
      lostPercentage: 35.0,
    },
    {
      company: "SBI General Insurance",
      totalPremium: 350,
      retainedPremium: 224,
      lostPremium: 126,
      retainedPolicies: 112,
      lostPolicies: 63,
      avgTicketSizeRetained: 2.0,
      avgTicketSizeLost: 2.0,
      retentionPercentage: 64.0,
      lostPercentage: 36.0,
    },
    {
      company: "Royal Sundaram General Insurance",
      totalPremium: 320,
      retainedPremium: 198,
      lostPremium: 122,
      retainedPolicies: 99,
      lostPolicies: 61,
      avgTicketSizeRetained: 2.0,
      avgTicketSizeLost: 2.0,
      retentionPercentage: 62.0,
      lostPercentage: 38.0,
    },
  ];

  // Filter options
  const insurerOptions = [
    "ICICI Lombard",
    "HDFC ERGO",
    "Bajaj Allianz",
    "Tata AIG",
    "New India Assurance",
    "Oriental Insurance",
    "United India Insurance",
    "National Insurance",
    "SBI General",
    "Royal Sundaram",
  ];

  const regionOptions = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Chennai",
    "Hyderabad",
    "Pune",
    "Kolkata",
    "Ahmedabad",
    "Jaipur",
    "Kochi",
  ];

  const handleInsurerFilter = (insurer: string) => {
    setSelectedInsurers((prev) =>
      prev.includes(insurer)
        ? prev.filter((i) => i !== insurer)
        : [...prev, insurer]
    );
  };

  const handleRegionFilter = (region: string) => {
    setSelectedRegions((prev) =>
      prev.includes(region)
        ? prev.filter((r) => r !== region)
        : [...prev, region]
    );
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload[0]) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg backdrop-blur-sm min-w-64">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: data.color }}
              />
              <h4 className="font-medium text-gray-800">{data.name}</h4>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="space-y-1">
                <p className="text-gray-500">Loss %</p>
                <p className="font-medium text-gray-800">{data.value}%</p>
              </div>

              <div className="space-y-1">
                <p className="text-gray-500">Premium Lost</p>
                <p className="font-medium text-gray-800">
                  {getFormattedValue(data.premium)} {valueUnit}s
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-gray-500">Policies</p>
                <p className="font-medium text-gray-800">
                  {formatNumber(data.policies)}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderCustomLabel = (entry: any) => {
    return entry.value >= 10 ? `${entry.value.toFixed(1)}%` : "";
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Filter Panel */}
      {/* <Card className="p-6 bg-white border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg" style={{ backgroundColor: `${colorPalette.tealMint}20` }}>
              <Filter className="w-5 h-5" style={{ color: colorPalette.tealMint }} />
            </div>
            <div>
              <h3 className="font-medium text-gray-700">Retention Analysis Filters</h3>
              <p className="text-sm text-gray-500">Filter by insurer, region, and search criteria</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </Button>
        </div>

        {showFilters && (
          <div className="space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search insurers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-gray-500" />
                <label className="font-medium text-gray-700">By Insurer</label>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {insurerOptions.map((insurer) => (
                  <div key={insurer} className="flex items-center space-x-2">
                    <Checkbox
                      id={`insurer-${insurer}`}
                      checked={selectedInsurers.includes(insurer)}
                      onCheckedChange={() => handleInsurerFilter(insurer)}
                    />
                    <label 
                      htmlFor={`insurer-${insurer}`}
                      className="text-sm text-gray-700 cursor-pointer truncate"
                      title={insurer}
                    >
                      {insurer}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <label className="font-medium text-gray-700">By Region</label>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {regionOptions.map((region) => (
                  <div key={region} className="flex items-center space-x-2">
                    <Checkbox
                      id={`region-${region}`}
                      checked={selectedRegions.includes(region)}
                      onCheckedChange={() => handleRegionFilter(region)}
                    />
                    <label 
                      htmlFor={`region-${region}`}
                      className="text-sm text-gray-700 cursor-pointer"
                    >
                      {region}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-3 border-t border-gray-200">
              <Button 
                size="sm" 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => {
                  setShowFilters(false);
                }}
              >
                Apply Filters
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setSelectedInsurers([]);
                  setSelectedRegions([]);
                  setSearchTerm('');
                }}
              >
                Clear All
              </Button>
            </div>
          </div>
        )}
      </Card> */}
      {/* Retention Analysis - Standardized Layout */}
      <div className={commonStyles.container}>
        <div className={commonStyles.splitLayout}>
          {/* Left Section - Chart */}
          <div className={commonStyles.leftSection}>
            <Card className={commonStyles.chartCard}>
              <div className={commonStyles.chartHeader}>
                <div className={commonStyles.chartTitleContainer}>
                  <h3 className={commonStyles.chartTitle}>
                    Retention Analysis - {lossReasonTopFilter}
                  </h3>
                  <p className={commonStyles.chartSubtitle}>
                    {getChartSubtitle("Retention by Insurer")}
                  </p>
                </div>
                <div className={commonStyles.chartControls}>
                  <Select
                    value={lossReasonTopFilter}
                    onValueChange={setLossReasonTopFilter}
                  >
                    <SelectTrigger className={commonStyles.selectTrigger}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {topFilterOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <ThreeDotsMenu
                    currentChartType={chartTypeState}
                    onChartTypeChange={setChartTypeState}
                    onFullScreen={() => setIsFullScreenModalOpen(true)}
                    onPresentationMode={() => {}}
                    onSaveChart={() => {}}
                    currentFilters={{}}
                    chartData={getFilteredLossReasonData()}
                    onPlayFullView={() => {}}
                    chartType="lossReason"
                  />
                </div>
              </div>

              {/* Chart Container - Enhanced for scrollable charts */}
              <div className={commonStyles.chartContainer}>
                <div className={commonStyles.chartWrapper}>
                  {renderLossReasonChart(getFilteredLossReasonData(), chartTypeState)}
                </div>
              </div>
            </Card>
          </div>

          {/* Right Section - Retention Data Table */}
           <div className={commonStyles.rightSection}>
             <RetentionDataTable
               retentionData={insurerRetentionData}
               getFormattedValue={getFormattedValue}
               valueUnit={valueUnit}
               formatNumber={formatNumber}
               onItemClick={handleItemClick}
               colorPalette={colorPalette}
             />
           </div>
        </div>
      </div>

      {/* Retention Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Retention Card */}
        <Card className="p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg" style={{ backgroundColor: `${colorPalette.emeraldGreen}20` }}>
                <Shield className="w-6 h-6" style={{ color: colorPalette.emeraldGreen }} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Retention Card</h3>
                <p className="text-sm text-gray-600">Current retention performance</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
              Active
            </Badge>
          </div>
          
           <div className="space-y-4">
            {/* Overall Retention Rate */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-700">Overall Retention</p>
                <p className="text-xs text-gray-500">Policies successfully retained</p>
              </div>
              <div className="text-right">
                <span className="text-xl font-bold text-gray-900">
                  {retentionMetrics.retentionRate}%
                </span>
              </div>
            </div>

            {/* Premium Retained */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-700">Premium Retained</p>
                <p className="text-xs text-gray-500">Premium from retained policies</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-gray-900">
                  {getFormattedValue(retentionMetrics.premiumRetained)}
                </span>
                <span className="text-xs text-gray-500 ml-1">{valueUnit}s</span>
              </div>
            </div>

            {/* Revenue Earned */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-700">Revenue Earned</p>
                <p className="text-xs text-gray-500">Commission from retained premium</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-gray-900">
                  {getFormattedValue(retentionMetrics.revenueEarned)}
                </span>
                <span className="text-xs text-gray-500 ml-1">{valueUnit}s</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Business Lost Card */}
        <Card className="p-6 bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg" style={{ backgroundColor: `${colorPalette.crimsonRed}20` }}>
                <AlertTriangle className="w-6 h-6" style={{ color: colorPalette.crimsonRed }} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Business Lost Card</h3>
                <p className="text-sm text-gray-600">Lost business analysis</p>
              </div>
            </div>
            <Badge variant="destructive" className="bg-red-100 text-red-800">
              Alert
            </Badge>
          </div>
          
          <div className="space-y-4">
            {/* Business Lost Rate */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-700">Business Lost</p>
                <p className="text-xs text-gray-500">Policies not renewed</p>
              </div>
              <div className="text-right">
                <span className="text-xl font-bold text-gray-900">
                  {retentionMetrics.lostBusinessRate}%
                </span>
              </div>
            </div>

            {/* Premium Lost */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-700">Premium Lost</p>
                <p className="text-xs text-gray-500">Premium from lost policies</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-gray-900">
                  {getFormattedValue(retentionMetrics.premiumLost)}
                </span>
                <span className="text-xs text-gray-500 ml-1">{valueUnit}s</span>
              </div>
            </div>

            {/* Potential Loss */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-700">Potential Loss</p>
                <p className="text-xs text-gray-500">Revenue at risk</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-gray-900">
                  {getFormattedValue(retentionMetrics.potentialLoss)}
                </span>
                <span className="text-xs text-gray-500 ml-1">{valueUnit}s</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Complete Retention Analysis Table */}
      <Card className="p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Complete Retention Analysis Table
            </h3>
            <p className="text-gray-600">
              Comprehensive retention metrics by insurer
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Company</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Retention %</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Total Premium ({valueUnit}s)</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Retained Premium ({valueUnit}s)</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Lost Premium ({valueUnit}s)</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Retained Policies</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Lost Policies</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Avg Ticket (Retained)</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Avg Ticket (Lost)</th>
              </tr>
            </thead>
            <tbody>
              {insurerRetentionData.map((insurer, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor: insurer.retentionPercentage >= 70
                            ? colorPalette.emeraldGreen
                            : insurer.retentionPercentage >= 65
                            ? colorPalette.goldenYellow
                            : colorPalette.vibrantOrange,
                        }}
                      />
                      <span className="font-medium text-gray-900">{insurer.company}</span>
                    </div>
                  </td>
                  <td className="text-center py-3 px-4">
                    <span className={`font-semibold ${
                      insurer.retentionPercentage >= 70 ? 'text-emerald-600' :
                      insurer.retentionPercentage >= 65 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {insurer.retentionPercentage}%
                    </span>
                  </td>
                  <td className="text-center py-3 px-4 font-medium">
                    {getFormattedValue(insurer.totalPremium)}
                  </td>
                  <td className="text-center py-3 px-4 text-emerald-600 font-medium">
                    {getFormattedValue(insurer.retainedPremium)}
                  </td>
                  <td className="text-center py-3 px-4 text-red-600 font-medium">
                    {getFormattedValue(insurer.lostPremium)}
                  </td>
                  <td className="text-center py-3 px-4 text-emerald-600 font-medium">
                    {formatNumber(insurer.retainedPolicies)}
                  </td>
                  <td className="text-center py-3 px-4 text-red-600 font-medium">
                    {formatNumber(insurer.lostPolicies)}
                  </td>
                  <td className="text-center py-3 px-4 font-medium">
                    {getFormattedValue(insurer.avgTicketSizeRetained)}
                  </td>
                  <td className="text-center py-3 px-4 font-medium">
                    {getFormattedValue(insurer.avgTicketSizeLost)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Full Screen Modal */}
      {isFullScreenModalOpen && (
        <FullScreenChartModalEnhanced
          isOpen={isFullScreenModalOpen}
          onClose={() => setIsFullScreenModalOpen(false)}
          title="Retention Analysis"
          subtitle="Retention metrics by insurer"
          chartComponent={renderLossReasonChart(getFilteredLossReasonData(), chartTypeState, true, false)}
          chartType={chartTypeState}
          onChartTypeChange={setChartTypeState}
          onDownload={(format: string) => console.log(`Download ${format}`)}
        />
      )}
    </div>
  );
}

// Retention Data Table Component
interface RetentionDataTableProps {
  retentionData: any[];
  getFormattedValue: (value: number) => string;
  valueUnit: string;
  formatNumber: (value: number) => string;
  onItemClick: (item: any) => void;
  colorPalette: any;
}

const RetentionDataTable: React.FC<RetentionDataTableProps> = ({
  retentionData,
  getFormattedValue,
  valueUnit,
  formatNumber,
  onItemClick,
  colorPalette,
}) => {
  const [sortColumn, setSortColumn] = useState<'policies' | 'amount' | 'revenue' | null>(null);
  const [sortState, setSortState] = useState<'none' | 'desc' | 'asc'>('none');

  // Handle sort click - cycle through states like ProductsList
  const handleSort = (column: 'policies' | 'amount' | 'revenue') => {
    if (sortColumn === column) {
      // Cycle through states: none -> desc -> asc -> none
      if (sortState === 'none') {
        setSortState('desc');
      } else if (sortState === 'desc') {
        setSortState('asc');
      } else {
        setSortState('none');
        setSortColumn(null);
      }
    } else {
      setSortColumn(column);
      setSortState('desc');
    }
  };

  // Sort data based on current sort state
  const sortedData = useMemo(() => {
    if (!sortColumn || sortState === 'none') {
      return retentionData;
    }

    return [...retentionData].sort((a, b) => {
      let aValue: number;
      let bValue: number;

      switch (sortColumn) {
        case 'policies':
          aValue = a.retainedPolicies || 0;
          bValue = b.retainedPolicies || 0;
          break;
        case 'amount':
          aValue = a.retainedPremium || 0;
          bValue = b.retainedPremium || 0;
          break;
        case 'revenue':
          aValue = a.totalPremium || 0;
          bValue = b.totalPremium || 0;
          break;
        default:
          return 0;
      }

      if (sortState === 'desc') {
        return bValue - aValue; // High to low
      } else {
        return aValue - bValue; // Low to high
      }
    });
  }, [retentionData, sortColumn, sortState]);

  // Get SVG color based on sort state
  const getSvgColor = (column: 'policies' | 'amount' | 'revenue') => {
    if (sortColumn !== column) return 'currentColor';
    if (sortState === 'desc') return '#22c55e'; // Green for high to low
    if (sortState === 'asc') return '#ef4444'; // Red for low to high
    return 'currentColor'; // Default
  };

  // Get SVG rotation based on sort state
  const getSvgRotation = (column: 'policies' | 'amount' | 'revenue') => {
    if (sortColumn !== column || sortState === 'none') return '';
    if (sortState === 'asc') return 'rotate-180';
    return '';
  };

  return (
    <Card className="p-4 flex flex-col">
      <div className="h-120 overflow-auto relative">
        {/* Sticky Table Header */}
        <div
          className="grid gap-4 pb-3 mb-3 border-b border-gray-200 sticky top-0 z-20 bg-white"
          style={{ gridTemplateColumns: "1.5fr 1fr 1fr 1fr" }}
        >
          {/* Sticky Insurer Header */}
          <div className="text-sm font-semibold text-gray-700 text-center flex items-center justify-center">
            Insurer
          </div>
          
          {/* Sortable Headers */}
          <div 
            className="text-sm font-semibold text-gray-700 text-center cursor-pointer hover:bg-gray-100 px-2 py-2 rounded transition-colors flex items-center justify-center"
            onClick={() => handleSort('policies')}
          >
            <span className="mr-1">No. Policies</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke={getSvgColor('policies')}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-all duration-200 ${getSvgRotation('policies')}`}
            >
              <path d="M12 5v14"></path>
              <path d="m19 12-7 7-7-7"></path>
            </svg>
          </div>
          
          <div 
            className="text-sm font-semibold text-gray-700 text-center cursor-pointer hover:bg-gray-100 px-2 py-2 rounded transition-colors flex items-center justify-center"
            onClick={() => handleSort('amount')}
          >
            <span className="mr-1">Retained</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke={getSvgColor('amount')}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-all duration-200 ${getSvgRotation('amount')}`}
            >
              <path d="M12 5v14"></path>
              <path d="m19 12-7 7-7-7"></path>
            </svg>
          </div>
          
          <div 
            className="text-sm font-semibold text-gray-700 text-center cursor-pointer hover:bg-gray-100 px-2 py-2 rounded transition-colors flex items-center justify-center"
            onClick={() => handleSort('revenue')}
          >
            <span className="mr-1">Total Premium</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke={getSvgColor('revenue')}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-all duration-200 ${getSvgRotation('revenue')}`}
            >
              <path d="M12 5v14"></path>
              <path d="m19 12-7 7-7-7"></path>
            </svg>
          </div>
        </div>

        {/* Table Body */}
        <div className="space-y-2 flex-1 overflow-y-auto min-h-0">
          {sortedData.map((item, index) => (
            <div
              key={index}
              onClick={() => onItemClick(item)}
              className="grid gap-4 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer items-center"
              style={{ gridTemplateColumns: "1.5fr 1fr 1fr 1fr" }}
            >
              {/* Insurer Column */}
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{
                    backgroundColor: item.retentionPercentage >= 70
                      ? colorPalette.emeraldGreen
                      : item.retentionPercentage >= 65
                      ? colorPalette.goldenYellow
                      : colorPalette.vibrantOrange,
                  }}
                />
                <div className="min-w-0">
                  <div className="font-medium text-gray-900 text-sm">
                    {item.company || item.name || 'Unknown'}
                  </div>
                  <div className="text-xs text-gray-500">
                    {item.retentionPercentage}% retention rate
                  </div>
                </div>
              </div>

              {/* Policies Column */}
              <div className="text-center">
                <div className="font-medium text-gray-900 text-sm">
                  {formatNumber(item.retainedPolicies || 0)}
                </div>
              </div>

              {/* Retained Premium Column */}
              <div className="text-center">
                <div className="font-medium text-gray-900 text-sm">
                  {getFormattedValue(item.retainedPremium || 0)}
                </div>
              </div>

              {/* Total Premium Column */}
              <div className="text-center">
                <div className="font-medium text-gray-900 text-sm">
                  {getFormattedValue(item.totalPremium || 0)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
