import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { MoreHorizontal, ChevronUp, ChevronDown } from "lucide-react";
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
  AreaChart,
  Area
} from "recharts";
import { chartDimensions, commonStyles, topFilterOptions } from "./commonStyle";
import { ThreeDotsMenu } from "./ThreeDotsMenu";
import { ChartType } from "./ChartTypeSwitcher";
import { Card } from "./ui/card";
// Import scrollable chart components
import { 
  ScrollableBarChart, 
  ScrollableLineChart, 
  shouldUseScrollableChart 
} from "./ChartUtils";

// Loss Reason Analysis Data (preserved from original)
const lossReasonData = [
  {
    id: "pricing-issues",
    name: "Pricing Issues",
    value: 2850000,
    premium: 2850000,
    policies: 1250,
    color: "#3B82F6",
    percentage: 23.0,
  },
  {
    id: "price-competitiveness",
    name: "Price Competitiveness",
    value: 2850000,
    premium: 2850000,
    policies: 1250,
    color: "#6B7280",
    percentage: 35.2,
  },
 
  {
    id: "poor-service",
    name: "Poor Service",
    value: 2356000,
    premium: 2356000,
    policies: 980,
    color: "#10B981",
    percentage: 19.0,
  },
  {
    id: "better-offers",
    name: "Better Offers Elsewhere",
    value: 1982000,
    premium: 1982000,
    policies: 820,
    color: "#F59E0B",
    percentage: 16.0,
  },
  {
    id: "claims-experience",
    name: "Claims Experience",
    value: 1368000,
    premium: 1368000,
    policies: 650,
    color: "#EF4444",
    percentage: 11.0,
  },
  {
    id: "policy-cancelled",
    name: "Policy Cancelled",
    value: 1116000,
    premium: 1116000,
    policies: 520,
    color: "#8B5CF6",
    percentage: 9.0,
  },
  {
    id: "coverage-gaps",
    name: "Coverage Gaps",
    value: 868000,
    premium: 868000,
    policies: 410,
    color: "#06B6D4",
    percentage: 7.0,
  },
  {
    id: "communication-issues",
    name: "Communication Issues",
    value: 620000,
    premium: 620000,
    policies: 290,
    color: "#84CC16",
    percentage: 5.0,
  },
  {
    id: "regulatory-changes",
    name: "Regulatory Changes",
    value: 620000,
    premium: 620000,
    policies: 290,
    color: "#F97316",
    percentage: 5.0,
  },
  {
    id: "business-closure",
    name: "Business Closure",
    value: 372000,
    premium: 372000,
    policies: 175,
    color: "#EC4899",
    percentage: 3.0,
  },
  {
    id: "other-reasons",
    name: "Other Reasons",
    value: 248000,
    premium: 248000,
    policies: 115,
    color: "#6B7280",
    percentage: 2.0,
  },
  {
    id: "policy-cancelled",
    name: "Policy Cancelled",
    value: 1116000,
    premium: 1116000,
    policies: 520,
    color: "#8B5CF6",
    percentage: 9.0,
  },
  {
    id: "coverage-gaps",
    name: "Coverage Gaps",
    value: 868000,
    premium: 868000,
    policies: 410,
    color: "#06B6D4",
    percentage: 7.0,
  },
  {
    id: "communication-issues",
    name: "Communication Issues",
    value: 620000,
    premium: 620000,
    policies: 290,
    color: "#84CC16",
    percentage: 5.0,
  },
  {
    id: "regulatory-changes",
    name: "Regulatory Changes",
    value: 620000,
    premium: 620000,
    policies: 290,
    color: "#F97316",
    percentage: 5.0,
  },
  {
    id: "business-closure",
    name: "Business Closure",
    value: 372000,
    premium: 372000,
    policies: 175,
    color: "#EC4899",
    percentage: 3.0,
  },
  {
    id: "other-reasons",
    name: "Other Reasons",
    value: 248000,
    premium: 248000,
    policies: 115,
    color: "#6B7280",
    percentage: 2.0,
  },
];

// Broker Retention Data (preserved from original)
const brokerRetentionData = [
  {
    id: "marsh-mclennan",
    name: "Marsh & McLennan",
    retentionRate: 94.2,
    totalPolicies: 15420,
    renewedPolicies: 14526,
    lostPolicies: 894,
    totalPremium: 125600000,
    color: "#3B82F6",
  },
  {
    id: "aon-plc",
    name: "Aon plc",
    retentionRate: 91.8,
    totalPolicies: 12850,
    renewedPolicies: 11796,
    lostPolicies: 1054,
    totalPremium: 98750000,
    color: "#10B981",
  },
  {
    id: "willis-towers",
    name: "Willis Towers Watson",
    retentionRate: 89.5,
    totalPolicies: 10200,
    renewedPolicies: 9129,
    lostPolicies: 1071,
    totalPremium: 87300000,
    color: "#F59E0B",
  },
  {
    id: "arthur-gallagher",
    name: "Arthur J. Gallagher",
    retentionRate: 87.3,
    totalPolicies: 8950,
    renewedPolicies: 7813,
    lostPolicies: 1137,
    totalPremium: 72400000,
    color: "#EF4444",
  },
  {
    id: "brown-brown",
    name: "Brown & Brown",
    retentionRate: 85.1,
    totalPolicies: 7600,
    renewedPolicies: 6468,
    lostPolicies: 1132,
    totalPremium: 61200000,
    color: "#8B5CF6",
  },
];

interface RetentionByBrokerProps {
  selectedReportType: string;
  currentFilters: any;
  onItemClick?: (item: any) => void;
  presentationMode?: boolean;
  onPresentationMode?: () => void;
  onPlayFullView?: (
    filters: any,
    chartData: any,
    chartType?: "revenue" | "expenses"
  ) => void;
}

export function RetentionByBroker({
  selectedReportType,
  currentFilters,
  onItemClick,
  presentationMode = false,
  onPresentationMode,
  onPlayFullView,
}: RetentionByBrokerProps) {
  const [lossReasonTopFilter, setLossReasonTopFilter] = useState("Top 10");
  const [autoZoomActive, setAutoZoomActive] = useState(false);
  const [currentFocusedElement, setCurrentFocusedElement] = useState(0);
  const [focusedElement, setFocusedElement] = useState<any>(null);
  const [chartTypeState, setChartTypeState] = useState<ChartType>("donut");
  // Full screen modal states
  const [isRevenueFullScreen, setIsRevenueFullScreen] = useState(false);
  const [isExpensesFullScreen, setIsExpensesFullScreen] = useState(false);

  // Get filtered loss reason data based on top filter
  const getFilteredLossReasonData = () => {
    const topCount = parseInt(lossReasonTopFilter.replace("Top ", ""));
    return lossReasonData.slice(0, topCount);
  };

  const chartData = getFilteredLossReasonData();
  const totalValue = chartData.reduce((sum, item) => sum + item.value, 0);

  // Format value function
  const getFormattedValue = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`;
    }
    return value.toString();
  };

  // Format total function
  const getFormattedTotal = (total: number) => {
    if (total >= 1000000) {
      return Math.round(total / 1000).toString();
    }
    return total.toString();
  };

  // Handle segment click
  const handleSegmentClick = (data: any) => {
    setFocusedElement(focusedElement?.id === data.id ? null : data);
    if (onItemClick) {
      onItemClick(data);
    }
  };

  // Enhanced custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200 z-50 pointer-events-none">
          <p className="font-medium text-gray-900">{data.name}</p>
          <p className="text-sm text-gray-600">
            {getFormattedValue(data.value)} ({data.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  // Enhanced chart renderer with support for all chart types
  const renderLossReasonChart = (
    data: any[],
    chartType: string,
    isFullScreen: boolean = false,
    showLegend: boolean = true
  ) => {
    const size = isFullScreen ? chartDimensions.fullScreen : chartDimensions.default;
    
    // Check if we should use scrollable charts based on data length
    const useScrollable = shouldUseScrollableChart(lossReasonTopFilter, data.length);
    
    // Custom tooltip for loss reason charts
    const CustomTooltip = ({ active, payload, label }: any) => {
      if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
          <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
            <p className="font-semibold text-gray-900">{data.name}</p>
            <p className="text-blue-600">
              Value: {getFormattedValue(data.value)} ({data.percentage}%)
            </p>
          </div>
        );
      }
      return null;
    };

    // Use scrollable charts for bar and line when needed
    if (chartType === "bar" && useScrollable) {
      return (
        <ScrollableBarChart
          data={data}
          dataKey="value"
          nameKey="name"
          color="#3B82F6"
          valueFormatter={getFormattedValue}
          config={{
            containerHeight: size.height,
            minBarWidth: 50,
            scrollThreshold: 10,
            marginBottom: 80,
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
          valueFormatter={getFormattedValue}
          config={{
            containerHeight: size.height,
            scrollThreshold: 10,
            marginBottom: 80,
          }}
        />
      );
    }
  
    // Fallback to original implementation for non-scrollable cases
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
              <Bar dataKey="value" radius={[4, 4, 0, 0]} fill="#3B82F6" />
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
    } else if (chartType === "stackedBar") {
      return (
        <div className="w-full h-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
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
              <Bar dataKey="value" stackId="a" radius={[4, 4, 0, 0]} fill="#3B82F6" />
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
    
      return renderEnhancedDonut(data, size, total, isFullScreen);
    }
  
    // Default fallback
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-gray-500">Chart type not supported: {chartType}</p>
      </div>
    );
  };

  // Enhanced donut chart renderer (matching Products Enhanced component exactly)
  const renderEnhancedDonut = (
    data: any[],
    size: { width: number; height: number },
    total: number,
    isPresentation = false
  ) => {
    const presentationMultiplier = isPresentation ? 1.4 : 1.0;
    const outerRadiusMultiplier = isPresentation ? 0.38 : 0.32;
    const innerRadiusMultiplier = isPresentation ? 0.2 : 0.18;
    const labelDistance = isPresentation ? 45 : 30;

    // Auto-zoom magnification - increase outer radius for focused element
    const focusedOuterRadiusMultiplier =
      autoZoomActive && focusedElement
        ? outerRadiusMultiplier + 0.08
        : outerRadiusMultiplier;

    // Calculate background circle size based on inner radius
    const backgroundRadius =
      Math.min(size.width, size.height) * innerRadiusMultiplier * 0.85;

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

                const isFocused =
                  focusedElement && payload.id === focusedElement.id;
                const isAutoZooming = autoZoomActive && focusedElement;

                return (
                  <text
                    x={x}
                    y={y}
                    fill={
                      isFocused
                        ? "#3B82F6"
                        : isAutoZooming
                        ? "#9CA3AF"
                        : "#374151"
                    }
                    textAnchor={x > cx ? "start" : "end"}
                    dominantBaseline="central"
                    className={
                      isFocused
                        ? "text-sm transition-all duration-500 font-bold"
                        : "text-sm transition-all duration-500 font-medium"
                    }
                    fontSize={isFocused ? "16" : "14"}
                  >
                    {isFocused
                      ? `● ${(percent * 100).toFixed(0)}% ●`
                      : `${(percent * 100).toFixed(0)}%`}
                  </text>
                );
              }}
              outerRadius={
                Math.min(size.width, size.height) * focusedOuterRadiusMultiplier
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
              {data.map((entry, index) => {
                const isFocused =
                  focusedElement && entry.id === focusedElement.id;
                const isAutoZooming = autoZoomActive && focusedElement;

                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    className={
                      isFocused
                        ? "cursor-pointer transition-all duration-500 drop-shadow-lg"
                        : "cursor-pointer transition-all duration-500 hover:opacity-90"
                    }
                    fillOpacity={isAutoZooming ? (isFocused ? 1.0 : 0.2) : 1.0}
                    stroke={isFocused ? "#3B82F6" : "#ffffff"}
                    strokeWidth={isFocused ? 8 : 2}
                    filter={isFocused ? "url(#magnifyGlow)" : undefined}
                  />
                );
              })}
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
            {focusedElement ? (
              <div className="animate-pulse">
                <div className="text-sm font-semibold text-blue-600 mb-1 text-center">
                  {focusedElement.name}
                </div>
                <div className="text-2xl font-bold text-gray-900 text-center mb-1">
                  {getFormattedValue(focusedElement.value)}
                </div>
                <div className="text-base font-semibold text-blue-500 text-center mb-2">
                  {focusedElement.percentage}%
                </div>
                <div className="text-xs text-blue-400 text-center mt-2 font-medium">
                  ● FOCUSED ●
                </div>
              </div>
            ) : (
              <div className="text-2xl font-semibold text-gray-900">
                {getFormattedTotal(total)}
                <div className="text-xs text-gray-500 mt-1">thousands</div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // DataTable component with sorting functionality and detailed information
  const DataTable = ({ data, type }: { data: any[]; type: string }) => {
    const [sortColumn, setSortColumn] = useState<'category' | 'percentage' | null>(null);
    const [sortState, setSortState] = useState<'none' | 'desc' | 'asc'>('none');

    // Handle sort click
    const handleSort = (column: 'category' | 'percentage') => {
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

    // Sort data based on current sort state - always show ALL data (no filtering)
    const sortedData = React.useMemo(() => {
      const allData = lossReasonData; // Use full dataset, not filtered
      
      if (!sortColumn || sortState === 'none') {
        return allData;
      }

      return [...allData].sort((a, b) => {
        let aValue: any;
        let bValue: any;

        switch (sortColumn) {
          case 'category':
            aValue = a.name;
            bValue = b.name;
            break;
          case 'percentage':
            aValue = a.percentage;
            bValue = b.percentage;
            break;
          default:
            return 0;
        }

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          if (sortState === 'desc') {
            return bValue.localeCompare(aValue);
          } else {
            return aValue.localeCompare(bValue);
          }
        } else {
          if (sortState === 'desc') {
            return bValue - aValue;
          } else {
            return aValue - bValue;
          }
        }
      });
    }, [sortColumn, sortState]);

    // Get SVG color based on sort state
    const getSvgColor = (column: 'category' | 'percentage') => {
      if (sortColumn !== column) return 'currentColor';
      if (sortState === 'desc') return '#22c55e'; // Green for high to low
      if (sortState === 'asc') return '#ef4444'; // Red for low to high
      return 'currentColor';
    };

    // Get SVG rotation based on sort state
    const getSvgRotation = (column: 'category' | 'percentage') => {
      if (sortColumn !== column || sortState === 'none') return '';
      if (sortState === 'asc') return 'rotate-180';
      return '';
    };

    // Format premium amount
    const formatPremium = (amount: number) => {
      if (amount >= 1000000) {
        return `₹${(amount / 100000).toFixed(2)} Thousands`;
      } else if (amount >= 1000) {
        return `₹${(amount / 1000).toFixed(0)}K`;
      }
      return `₹${amount}`;
    };

    return (
      <div className="h-120 overflow-auto relative">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 grid grid-cols-2 gap-4 p-3 font-medium text-gray-700">
          <div 
            className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded transition-colors flex items-center"
            onClick={() => handleSort('category')}
          >
            <span className="mr-1">Category</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke={getSvgColor('category')}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-all duration-200 ${getSvgRotation('category')}`}
            >
              <path d="M12 5v14"></path>
              <path d="m19 12-7 7-7-7"></path>
            </svg>
          </div>
          <div 
            className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded transition-colors flex items-center justify-end"
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
        
        {/* Data Rows */}
        <div className="space-y-1">
          {sortedData.map((item, index) => (
            <div
              key={item.id}
              className="grid grid-cols-2 gap-4 p-3 hover:bg-gray-50 transition-colors border-b border-gray-100"
            >
              <div className="flex items-start space-x-3">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0 mt-1"
                  style={{ backgroundColor: item.color }}
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">
                    {item.name}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {item.policies} policies
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-900">
                  {item.percentage}%
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {formatPremium(item.premium)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={commonStyles.container}>
      <div className={commonStyles.splitLayout}>
        {/* Left Section - Chart */}
        <div className={commonStyles.leftSection}>
          <Card className={commonStyles.chartCard}>
            <div className={commonStyles.chartHeader}>
              <div className={commonStyles.chartTitleContainer}>
                <h3 className={commonStyles.chartTitle}>
                  {lossReasonTopFilter} Loss Reason Categories
                </h3>
                <p className={commonStyles.chartSubtitle}>
                  Distribution of retention loss across reason categories
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
                  onFullScreen={() => setIsRevenueFullScreen(true)}
                  onPresentationMode={onPresentationMode}
                  onSaveChart={() => {}}
                  currentFilters={currentFilters}
                  chartData={chartData}
                  onPlayFullView={onPlayFullView}
                  chartType="revenue"
                />
              </div>
            </div>

            {/* Chart Container */}
            <div className="h-96">
              <div className={commonStyles.chartContainer}>
                <div className={commonStyles.chartWrapper}>
                  {renderLossReasonChart(chartData, chartTypeState)}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Section - Data Table */}
        <div className={commonStyles.rightSection}>
          <Card className={commonStyles.card}>
            
            <div>
              <DataTable data={chartData} type="loss-reason" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}