import React, { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { commonStyles, chartDimensions, topFilterOptions, getChartSubtitle } from "../commonStyle";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  Package,
  Building2,
  FileText,
  BarChart3,
  Filter,
  Table,
  Download,
  Search,
  ChevronDown,
  Users,
  Briefcase,
  Store,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from "lucide-react";
import { InsurerDetailsPanel } from "../InsurerDetailsPanel";
import { InsurersList } from "./InsurersList";
import { ChartType } from "../ChartTypeSwitcher";
import { ThreeDotsMenu } from "../ThreeDotsMenu";
import { FullScreenChartModalEnhanced } from "../FullScreenChartModal_Enhanced";

import { RevenueBreakdownCards } from "../RevenueBreakdownCards";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";
import { 
  ScrollableBarChart, 
  ScrollableLineChart, 
  shouldUseScrollableChart,
  renderEnhancedChart 
} from "../ChartUtils";

interface ChartsSectionProps {
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

export function ChartsSection({
  valueUnit,
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
  selectedYAxis,
}: ChartsSectionProps) {
  // Client type filter for products (only applies to Revenue by Products)
  const [selectedClientTypes, setSelectedClientTypes] = useState<string[]>([
    "Corporate",
    "Retail",
    "Affinity",
  ]);

  // Buyer type filter for Revenue vs Expenses charts
  const [selectedBuyerTypes, setSelectedBuyerTypes] = useState<string[]>([
    "Corporate",
    "Retail",
    "Affinity",
  ]);

  // Insurer details panel state
  const [selectedInsurer, setSelectedInsurer] = useState<any>(null);
  const [isInsurerDetailsOpen, setIsInsurerDetailsOpen] = useState(false);

  // Top insurers filter for Revenue by Insurers
  const [insurersTopFilter, setInsurersTopFilter] = useState<string>("Top 10");

  // Chart type switching capability added back for bar/line chart support
  const [chartTypeState, setChartTypeState] = useState<ChartType>("donut");

  // No need to sync with chartType prop as it's for revenue/expenses distinction, not chart visualization type

  // Accordion state for presentation mode
  const [isInsurerListExpanded, setIsInsurerListExpanded] = useState(true);

  // Full screen modal states
  const [isRevenueFullScreen, setIsRevenueFullScreen] = useState(false);
  const [isExpensesFullScreen, setIsExpensesFullScreen] = useState(false);

  // Full screen expense filter state (separate from normal view)
  const [fullScreenExpenseFilter, setFullScreenExpenseFilter] =
    useState<string>("Top 10");

  const getFormattedValue = (value: number) => {
    // For Cross-Sell Penetration, show customer counts instead of revenue
    if (selectedReportType === "Cross-Sell Penetration") {
      return value.toLocaleString("en-IN");
    }

    if (valueUnit === "Cr") {
      return `₹${(value / 10000000).toFixed(2)}`;
    } else if (valueUnit === "L") {
      return `₹${(value / 100000).toFixed(2)}`;
    } else if (valueUnit === "K") {
      return `₹${(value / 1000).toFixed(2)}`;
    }
    return `₹${value.toLocaleString("en-IN")}`;
  };

  // Get formatted total for center display with separate lines for number and unit
  const getFormattedTotal = (value: number) => {
    // For Cross-Sell Penetration, show customer counts
    if (selectedReportType === "Cross-Sell Penetration") {
      const number = (value / 1000).toFixed(0);
      const unit = "customers";
      return (
        <div className="text-center">
          <div>{number}K</div>
          <div className="text-xs">{unit}</div>
        </div>
      );
    }

    if (valueUnit === "Cr") {
      const number = (value / 10000000).toFixed(1);
      const unit = "crores";
      return (
        <div className="text-center">
          <div>{number}</div>
          <div className="text-xs">{unit}</div>
        </div>
      );
    } else if (valueUnit === "L") {
      const number = (value / 100000).toFixed(1);
      const unit = "lakhs";
      return (
        <div className="text-center">
          <div>{number}</div>
          <div className="text-xs">{unit}</div>
        </div>
      );
    } else if (valueUnit === "K") {
      const number = (value / 1000).toFixed(0);
      const unit = "thousands";
      return (
        <div className="text-center">
          <div>{number}</div>
          <div className="text-xs">{unit}</div>
        </div>
      );
    }
    const number = (value / 1000000).toFixed(1);
    const unit = "millions";
    return (
      <div className="text-center">
        <div>{number}</div>
        <div className="text-xs">{unit}</div>
      </div>
    );
  };

  // Professional color palette similar to leaderboard
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

  // Get metrics data for calculations
  const getMetricsData = () => {
    if (baseMetricsData) {
      return baseMetricsData;
    }

    // Fallback data
    const baseMetrics = {
      totalRevenue: 240000000, // ₹24 crores
      expenses: 153467000, // ₹15.35 crores
      grossProfit: 86533000, // ₹8.65 crores
    };

    // Adjust values slightly based on report type
    const adjustmentFactor =
      selectedReportType === "Revenue by Products"
        ? 1.0
        : selectedReportType === "Revenue by Insurers"
        ? 0.95
        : selectedReportType === "Revenue by Policy Type"
        ? 1.08
        : selectedReportType === "Revenue by Vertical"
        ? 0.96 // Updated name
        : selectedReportType === "Revenue by LOB"
        ? 1.02
        : 0.92;

    return {
      totalRevenue: baseMetrics.totalRevenue * adjustmentFactor,
      expenses: baseMetrics.expenses * adjustmentFactor,
      grossProfit: baseMetrics.grossProfit * adjustmentFactor,
    };
  };

  const metricsData = getMetricsData();

  // Get data based on selected report type
  const getReportData = () => {
    const totalRevenue = metricsData.totalRevenue;
    const productsRevenue = totalRevenue * 0.75; // 75% of total revenue for products

    // Base data structure - will be customized based on report type
    if (selectedReportType === "Revenue by Insurers") {
      return [
        {
          id: "hdfc-ergo",
          name: "HDFC ERGO",
          value: Math.round(productsRevenue * 0.225),
          color: professionalColors.revenueColors[0],
          percentage: 22.5,
          description: "HDFC ERGO General Insurance Company",
        },
        {
          id: "icici-lombard",
          name: "ICICI Lombard",
          value: Math.round(productsRevenue * 0.195),
          color: professionalColors.revenueColors[1],
          percentage: 19.5,
          description: "ICICI Lombard General Insurance Company",
        },
        {
          id: "bajaj-allianz",
          name: "Bajaj Allianz",
          value: Math.round(productsRevenue * 0.165),
          color: professionalColors.revenueColors[2],
          percentage: 16.5,
          description: "Bajaj Allianz General Insurance Company",
        },
        {
          id: "tata-aig",
          name: "Tata AIG",
          value: Math.round(productsRevenue * 0.135),
          color: professionalColors.revenueColors[3],
          percentage: 13.5,
          description: "Tata AIG General Insurance Company",
        },
        {
          id: "reliance-general",
          name: "Reliance General",
          value: Math.round(productsRevenue * 0.115),
          color: professionalColors.revenueColors[4],
          percentage: 11.5,
          description: "Reliance General Insurance Company",
        },
        {
          id: "new-india-assurance",
          name: "New India Assurance",
          value: Math.round(productsRevenue * 0.085),
          color: professionalColors.revenueColors[5],
          percentage: 8.5,
          description: "The New India Assurance Company",
        },
        {
          id: "oriental-insurance",
          name: "Oriental Insurance",
          value: Math.round(productsRevenue * 0.055),
          color: professionalColors.revenueColors[6],
          percentage: 5.5,
          description: "Oriental Insurance Company",
        },
        {
          id: "united-india",
          name: "United India",
          value: Math.round(productsRevenue * 0.025),
          color: professionalColors.revenueColors[7],
          percentage: 2.5,
          description: "United India Insurance Company",
        },
      ];
    } else if (selectedReportType === "Revenue by Vertical") {
      // Updated from "Revenue by Business Vertical"
      return [
        {
          id: "life-health",
          name: "Life & Health",
          value: Math.round(productsRevenue * 0.385),
          color: professionalColors.revenueColors[0],
          percentage: 38.5,
        },
        {
          id: "property-casualty",
          name: "Property & Casualty",
          value: Math.round(productsRevenue * 0.295),
          color: professionalColors.revenueColors[1],
          percentage: 29.5,
        },
        {
          id: "commercial-lines",
          name: "Commercial Lines",
          value: Math.round(productsRevenue * 0.185),
          color: professionalColors.revenueColors[2],
          percentage: 18.5,
        },
        {
          id: "specialty-lines",
          name: "Specialty Lines",
          value: Math.round(productsRevenue * 0.135),
          color: professionalColors.revenueColors[3],
          percentage: 13.5,
        },
      ];
    } else if (selectedReportType === "Revenue by LOB") {
      return [
        {
          id: "employee-benefit",
          name: "Employee Benefit",
          value: Math.round(productsRevenue * 0.325),
          color: professionalColors.revenueColors[0],
          percentage: 32.5,
        },
        {
          id: "property-engineering",
          name: "Property & Engineering",
          value: Math.round(productsRevenue * 0.265),
          color: professionalColors.revenueColors[1],
          percentage: 26.5,
        },
        {
          id: "marine",
          name: "Marine",
          value: Math.round(productsRevenue * 0.185),
          color: professionalColors.revenueColors[2],
          percentage: 18.5,
        },
        {
          id: "specie",
          name: "Specie",
          value: Math.round(productsRevenue * 0.125),
          color: professionalColors.revenueColors[3],
          percentage: 12.5,
        },
        {
          id: "specialities",
          name: "Specialities",
          value: Math.round(productsRevenue * 0.065),
          color: professionalColors.revenueColors[4],
          percentage: 6.5,
        },
        {
          id: "liability",
          name: "Liability",
          value: Math.round(productsRevenue * 0.035),
          color: professionalColors.revenueColors[5],
          percentage: 3.5,
        },
      ];
    } else if (selectedReportType === "Cross-Sell Penetration") {
      // Cross-sell penetration data showing customer product penetration
      const totalCustomers = 85000; // Total customer base
      return [
        {
          id: "1-product",
          name: "1 Product",
          value: Math.round(totalCustomers * 0.425),
          color: professionalColors.revenueColors[0],
          percentage: 42.5,
        },
        {
          id: "2-products",
          name: "2 Products",
          value: Math.round(totalCustomers * 0.285),
          color: professionalColors.revenueColors[1],
          percentage: 28.5,
        },
        {
          id: "3-products",
          name: "3 Products",
          value: Math.round(totalCustomers * 0.165),
          color: professionalColors.revenueColors[2],
          percentage: 16.5,
        },
        {
          id: "4-products",
          name: "4 Products",
          value: Math.round(totalCustomers * 0.085),
          color: professionalColors.revenueColors[3],
          percentage: 8.5,
        },
        {
          id: "5-products",
          name: "5 Products",
          value: Math.round(totalCustomers * 0.035),
          color: professionalColors.revenueColors[4],
          percentage: 3.5,
        },
        {
          id: "more-than-5",
          name: "> 5 Products",
          value: Math.round(totalCustomers * 0.005),
          color: professionalColors.revenueColors[5],
          percentage: 0.5,
        },
      ];
    } else {
      // Extended Products data - 30 different insurance products for filtering
      const extendedColors = [
        ...professionalColors.revenueColors,
        "#FF6B6B",
        "#4ECDC4",
        "#45B7D1",
        "#96CEB4",
        "#FFEAA7",
        "#DDA0DD",
        "#98D8C8",
        "#F7DC6F",
        "#BB8FCE",
        "#85C1E9",
        "#F8C471",
        "#82E0AA",
        "#F1948A",
        "#85929E",
        "#D5A6BD",
        "#A9CCE3",
        "#F9E79F",
        "#A3E4D7",
        "#D7BDE2",
        "#AED6F1",
        "#FCF3CF",
        "#FADBD8",
        "#EAEDED",
        "#E8DAEF",
        "#AEB6BF",
        "#D6EAF8",
        "#FEF9E7",
        "#FDEDEC",
        "#F4F6F6",
        "#EBF5FB",
      ];

      // Realistic percentage distribution for 30 products with long tail
      const percentages = [
        18.5, 15.2, 12.8, 9.3, 7.1, 5.4, 4.2, 3.8, 3.1, 2.7, 2.3, 1.9, 1.6, 1.4,
        1.2, 1.0, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.4, 0.3, 0.3, 0.2, 0.2, 0.2,
        0.1, 0.1,
      ];

      const productNames = [
        "Health Insurance",
        "Motor Insurance",
        "Life Insurance",
        "Property Insurance",
        "Travel Insurance",
        "Personal Accident Insurance",
        "Fire Insurance",
        "Marine Insurance",
        "Cyber Insurance",
        "Professional Indemnity",
        "Directors & Officers Insurance",
        "Employment Practices Liability",
        "Product Liability Insurance",
        "Commercial General Liability",
        "Workers Compensation",
        "Business Interruption",
        "Equipment Insurance",
        "Cargo Insurance",
        "Transit Insurance",
        "Fidelity Guarantee",
        "Credit Insurance",
        "Key Person Insurance",
        "Group Health Insurance",
        "Group Life Insurance",
        "Pension Plans",
        "Annuity Plans",
        "Child Education Plans",
        "Retirement Plans",
        "Investment Plans",
        "Unit Linked Insurance Plans",
      ];

      return productNames.map((name, index) => ({
        id: name
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, ""),
        name: name,
        value: Math.round(productsRevenue * (percentages[index] / 100)),
        color: extendedColors[index % extendedColors.length],
        percentage: percentages[index],
        description: `${name} policies and coverage`,
      }));
    }
  };

  // Enhanced Insurers Data with more insurers for filtering
  const getInsurersData = () => {
    return getReportData();
  };

  // Get filtered insurers data based on the insurersTopFilter dropdown
  const getFilteredInsurersData = () => {
    const allInsurers = getInsurersData();
    const totalCategories = allInsurers.length;

    // Determine how many categories to show based on selection
    let categoriesToShow = 10; // default
    if (insurersTopFilter === "Top 5") {
      categoriesToShow = 5;
    } else if (insurersTopFilter === "Top 10") {
      categoriesToShow = 10;
    } else if (insurersTopFilter === "Top 15") {
      categoriesToShow = 15;
    } else if (insurersTopFilter === "Top 20") {
      categoriesToShow = 20;
    } else if (insurersTopFilter === "Top 30") {
      categoriesToShow = 30;
    } else if (insurersTopFilter === "Top 50") {
      categoriesToShow = 50;
    } else if (insurersTopFilter === "All") {
      categoriesToShow = totalCategories;
    }

    // Debug logging
    console.log('🔍 Insurers Filter Debug:', {
      insurersTopFilter,
      totalCategories,
      categoriesToShow,
      selectedReportType,
      allInsurersLength: allInsurers.length
    });

    // If we're showing all or the selection is more than available categories
    if (categoriesToShow >= totalCategories) {
      return {
        chartData: allInsurers,
        remainingData: [],
        shouldShowTopText: false,
        chartTitle: `${
          selectedReportType === "Revenue by Vertical"
            ? "Business Vertical"
            : selectedReportType === "Revenue by LOB"
            ? "Line of Business"
            : selectedReportType === "Cross-Sell Penetration"
            ? "Cross-Sell Penetration"
            : selectedReportType === "Revenue by Insurers"
            ? "Insurer"
            : "Product"
        } Categories`,
      };
    } else {
      // Show only the selected number of top categories
      return {
        chartData: allInsurers.slice(0, categoriesToShow),
        remainingData: allInsurers.slice(categoriesToShow),
        shouldShowTopText: true,
        chartTitle: `${
          selectedReportType === "Revenue by Vertical"
            ? "Business Vertical"
            : selectedReportType === "Revenue by LOB"
            ? "Line of Business"
            : selectedReportType === "Cross-Sell Penetration"
            ? "Cross-Sell Penetration"
            : selectedReportType === "Revenue by Insurers"
            ? "Insurer"
            : "Product"
        } Categories`,
      };
    }
  };

  // Handle chart interactions
  const handleSegmentClick = (segment: any) => {
    console.log("Segment clicked:", segment);
    // You can add more interaction logic here
    setSelectedInsurer(segment);
    setIsInsurerDetailsOpen(true);
  };

  const handleInsurerClick = (insurer: any) => {
    setSelectedInsurer(insurer);
    setIsInsurerDetailsOpen(true);
  };

  const handleSegmentHover = (segment: any) => {
    // Handle hover effects
    console.log("Segment hovered:", segment);
  };

  const filteredInsurersData = getFilteredInsurersData();
  const chartData = filteredInsurersData.chartData;
  const totalValue = chartData.reduce((sum, item) => sum + item.value, 0);

  // Auto-zoom functionality
  useEffect(() => {
    if (onTotalElementsChange) {
      // Report total number of elements for auto-zoom
      onTotalElementsChange(chartData.length);
    }
  }, [chartData.length, onTotalElementsChange]);

  // Get focused element data for highlighting
  const getFocusedElement = () => {
    if (autoZoomActive && currentFocusedElement < chartData.length) {
      return chartData[currentFocusedElement];
    }
    return null;
  };

  const focusedElement = getFocusedElement();

  // Enhanced custom tooltip that positions above center of donut charts
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

  // Enhanced donut chart with fixed tooltip positioning and auto-zoom magnification
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
                <div
                  className={`${
                    isPresentation ? "text-lg" : "text-sm"
                  } font-semibold text-blue-600 mb-1 text-center`}
                >
                  {focusedElement.name}
                </div>
                <div
                  className={`${
                    isPresentation ? "text-3xl" : "text-2xl"
                  } font-bold text-gray-900 text-center mb-1`}
                >
                  {getFormattedValue(focusedElement.value)}
                </div>
                <div
                  className={`${
                    isPresentation ? "text-lg" : "text-base"
                  } font-semibold text-blue-500 text-center mb-2`}
                >
                  {focusedElement.percentage}%
                </div>
                {isPresentation && (
                  <div
                    className={`text-xs text-gray-500 text-center max-w-[120px] mx-auto leading-tight`}
                  >
                    {focusedElement.description}
                  </div>
                )}
                <div
                  className={`${
                    isPresentation ? "text-xs" : "text-xs"
                  } text-blue-400 text-center mt-2 font-medium`}
                >
                  ● FOCUSED ●
                </div>
              </div>
            ) : (
              <div
                className={`${
                  isPresentation ? "text-3xl" : "text-2xl"
                } font-semibold text-gray-900`}
              >
                {getFormattedTotal(total)}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Enhanced table render
  const renderTable = (
    data: any[],
    size: { width: number; height: number }
  ) => {
    const columnHeader =
      selectedReportType === "Revenue by Vertical"
        ? "Vertical"
        : selectedReportType === "Revenue by LOB"
        ? "Line of Business"
        : selectedReportType === "Cross-Sell Penetration"
        ? "Product Count"
        : "Product";

    const valueHeader =
      selectedReportType === "Cross-Sell Penetration" ? "Customers" : "Revenue";

    return (
      <div className="relative w-full h-full">
        <div className="w-full h-full overflow-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-3 border-b text-sm font-medium text-gray-900">
                  {columnHeader}
                </th>
                <th className="text-right p-3 border-b text-sm font-medium text-gray-900">
                  {valueHeader}
                </th>
                <th className="text-right p-3 border-b text-sm font-medium text-gray-900">
                  Percentage
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
                const isFocused =
                  focusedElement && item.id === focusedElement.id;
                const isAutoZooming = autoZoomActive && focusedElement;

                return (
                  <tr
                    key={item.id || index}
                    className={
                      isFocused
                        ? "cursor-pointer transition-all duration-500 bg-blue-50 border-l-4 border-blue-500"
                        : isAutoZooming
                        ? "cursor-pointer transition-all duration-500 opacity-30 hover:bg-gray-50"
                        : "cursor-pointer transition-all duration-500 hover:bg-gray-50"
                    }
                    onClick={() => handleSegmentClick(item)}
                  >
                    <td className="p-3 border-b">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="font-medium text-gray-900">
                          {item.name}
                        </span>
                      </div>
                    </td>
                    <td className="p-3 border-b text-right">
                      <span className="font-medium text-gray-900">
                        {getFormattedValue(item.value)}
                      </span>
                    </td>
                    <td className="p-3 border-b text-right">
                      <span className="text-sm text-gray-600">
                        {item.percentage}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // Get breakdown title based on report type
  const getBreakdownTitle = () => {
    if (selectedReportType === "Revenue by Vertical") {
      return "Business Vertical Breakdown";
    } else if (selectedReportType === "Revenue by LOB") {
      return "Line of Business Breakdown";
    } else if (selectedReportType === "Cross-Sell Penetration") {
      return "Customer Penetration Breakdown";
    }
    return "Product Breakdown";
  };

  // Enhanced chart renderer with scrollable support for bar and line charts
  const renderChart = (
    data: any[],
    size: { width: number; height: number },
    type: string,
    includeTooltip = true,
    isPresentation = false
  ) => {
    // Check if we should use scrollable charts based on topExpenseCategories filter
    const topFilterValue = parseInt(topExpenseCategories.replace(/\D/g, '')) || 10;
    const useScrollable = shouldUseScrollableChart(topFilterValue, data.length);

    // For Cross-Sell Penetration and other product-style reports, we can support different chart types
    if (type === "bar") {
      if (useScrollable) {
        return (
          <ScrollableBarChart 
            data={data} 
            size={size} 
            CustomTooltip={CustomTooltip}
          />
        );
      } else {
        return (
          <div
            className="relative"
            style={{ width: size.width, height: size.height }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={CustomTooltip} />
                <Bar dataKey="value" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
      }
    } else if (type === "line") {
      if (useScrollable) {
        return (
          <ScrollableLineChart 
            data={data} 
            size={size} 
            CustomTooltip={CustomTooltip}
          />
        );
      } else {
        return (
          <div
            className="relative"
            style={{ width: size.width, height: size.height }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={CustomTooltip} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#3B82F6"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        );
      }
    } else if (type === "stackedBar") {
      return (
        <div
          className="relative"
          style={{ width: size.width, height: size.height }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={CustomTooltip} />
              <Bar dataKey="value" fill="#3B82F6" stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      );
    } else if (type === "table") {
      return renderTableView();
    }

    // Default to donut chart for other cases
    return renderEnhancedDonut(data, size, totalValue, isPresentation);
  };

  // Presentation mode - Full width layout with enhanced breakdown
  if (presentationMode && fullScreen) {
    return (
      <div className="w-full h-full bg-white rounded-lg p-6">
        <div className="flex h-full gap-6">
          {/* Left Side - Chart (expands when list is hidden) */}
          <div
            className={`flex items-center justify-center transition-all duration-300 ${
              isInsurerListExpanded ? "flex-1" : "flex-[2]"
            } ${
              autoZoomActive
                ? "ring-2 ring-blue-200 ring-opacity-50 rounded-lg"
                : ""
            }`}
          >
            <div
              className={`w-full h-full max-w-2xl max-h-[700px] transition-transform duration-500 ${
                autoZoomActive ? "transform scale-105" : ""
              }`}
            >
              {renderChart(
                chartData,
                {
                  width: isInsurerListExpanded ? 600 : 800,
                  height: isInsurerListExpanded ? 500 : 650,
                },
                chartTypeState,
                true,
                true
              )}
            </div>
          </div>

          {/* Right Side - Enhanced Breakdown List */}
          <div
            className={`flex flex-col transition-all duration-300 ${
              isInsurerListExpanded ? "w-80" : "w-20"
            }`}
          >
            {isInsurerListExpanded ? (
              <>
                {/* Accordion Header with Auto-Focus Progress */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {getBreakdownTitle()}
                    </h3>
                    {autoZoomActive && (
                      <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full border border-blue-200">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        <span className="text-xs font-medium text-blue-700">
                          Auto Focus: {currentFocusedElement + 1}/
                          {chartData.length}
                        </span>
                      </div>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsInsurerListExpanded(false)}
                    className="h-8 w-8 p-0 hover:bg-gray-100"
                    title="Hide breakdown list"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </Button>
                </div>

                {/* Enhanced Insurer List with Auto-Focus Highlighting */}
                <div
                  className="space-y-2 overflow-y-auto"
                  style={{ maxHeight: "calc(100% - 60px)" }}
                >
                  {chartData.map((insurer, index) => {
                    const isFocused =
                      focusedElement && insurer.id === focusedElement.id;
                    const isAutoZooming = autoZoomActive && focusedElement;

                    return (
                      <div
                        key={insurer.id || index}
                        className={`p-4 rounded-lg border transition-all duration-500 cursor-pointer ${
                          isFocused
                            ? "bg-blue-50 border-blue-300 shadow-lg scale-105 ring-2 ring-blue-200"
                            : isAutoZooming
                            ? "bg-gray-50 border-gray-200 opacity-40"
                            : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                        }`}
                        onClick={() => handleInsurerClick(insurer)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-4 h-4 rounded-full ${
                                isFocused ? "ring-2 ring-blue-400" : ""
                              }`}
                              style={{ backgroundColor: insurer.color }}
                            />
                            <span
                              className={`font-semibold ${
                                isFocused ? "text-blue-900" : "text-gray-900"
                              }`}
                            >
                              {insurer.name}
                            </span>
                            {isFocused && (
                              <div className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                                FOCUSED
                              </div>
                            )}
                          </div>
                          <span
                            className={`text-sm font-medium ${
                              isFocused ? "text-blue-600" : "text-gray-600"
                            }`}
                          >
                            {insurer.percentage}%
                          </span>
                        </div>
                        <div
                          className={`text-sm font-medium ${
                            isFocused ? "text-blue-800" : "text-gray-800"
                          }`}
                        >
                          {getFormattedValue(insurer.value)}
                        </div>
                        {isFocused && (
                          <div className="mt-2 text-xs text-blue-600 leading-relaxed">
                            {insurer.description}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="h-full flex items-center justify-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsInsurerListExpanded(true)}
                  className="h-10 w-10 p-0 hover:bg-gray-100 rotate-90"
                  title="Show breakdown list"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // New split layout - Two equal sections like Revenue by Insurers
  return (
    <div className={commonStyles.container}>
      {/* Metric Cards */}
      <RevenueBreakdownCards
        valueUnit={valueUnit}
        selectedReportType={selectedReportType}
        baseMetricsData={baseMetricsData}
      />

      {/* Main Split Layout - Two Equal Sections */}
      <div className={commonStyles.splitLayout}>
        {/* Left Section - Chart */}
        <div className={commonStyles.leftSection}>
          <Card className={commonStyles.chartCard}>
            <div className={commonStyles.chartHeader}>
              <div className={commonStyles.chartTitleContainer}>
                <h3 className={commonStyles.chartTitle}>
                  {filteredInsurersData.chartTitle}
                </h3>
                <p className={commonStyles.chartSubtitle}>
                  {getChartSubtitle(selectedReportType)}
                </p>
              </div>
              <div className={commonStyles.chartControls}>
                <Select
                  value={insurersTopFilter}
                  onValueChange={setInsurersTopFilter}
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

            {/* Chart Container - Enhanced for scrollable charts */}
            <div className={commonStyles.chartContainer}>
              <div className={commonStyles.chartWrapper}>
                {renderChart(
                  chartData,
                  chartDimensions.default,
                  chartTypeState
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* Right Section - Insurers List */}
        <div className={commonStyles.rightSection}>
          <InsurersList
            insurers={chartData}
            getFormattedValue={getFormattedValue}
            onInsurerClick={handleInsurerClick}
            selectedReportType={selectedReportType}
          />
        </div>
      </div>

      {/* Insurer Details Panel */}
      {selectedInsurer && (
        <InsurerDetailsPanel
          insurer={selectedInsurer}
          isOpen={isInsurerDetailsOpen}
          onClose={() => setIsInsurerDetailsOpen(false)}
          valueUnit={valueUnit}
        />
      )}

      {/* Full Screen Modal */}
      {isRevenueFullScreen && (
        <FullScreenChartModalEnhanced
          isOpen={isRevenueFullScreen}
          onClose={() => setIsRevenueFullScreen(false)}
          title={chartTitle}
          subtitle={getChartSubtitle(selectedReportType, insurersTopFilter)}
          chartComponent={renderChart(chartData, chartDimensions.default, chartTypeState, true, false)}
          chartType={chartTypeState}
          onChartTypeChange={setChartTypeState}
          onDownload={(format: string) => console.log(`Download ${format}`)}
        />
      )}
    </div>
  );
}
