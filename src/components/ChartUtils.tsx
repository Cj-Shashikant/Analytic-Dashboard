import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

// Enhanced scrollable chart configuration
export interface ScrollableChartConfig {
  minBarWidth: number;
  maxVisibleBars: number;
  scrollThreshold: number;
  containerHeight: number;
  marginBottom: number;
}

// Default configuration for scrollable charts
export const defaultScrollConfig: ScrollableChartConfig = {
  minBarWidth: 50, // Minimum width per bar
  maxVisibleBars: 10, // Maximum bars visible without scrolling
  scrollThreshold: 10, // Start scrolling when more than this many items
  containerHeight: 336, // Fixed container height to match requirement
  marginBottom: 80, // Bottom margin for angled labels
};

// Enhanced Custom Tooltip for scrollable charts
interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  valueFormatter?: (value: number) => string;
}

export const EnhancedCustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
  valueFormatter = (value) => `$${value.toLocaleString()}`,
}) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-medium text-gray-900 mb-1">{label}</p>
        <p className="text-sm text-gray-600">
          <span
            className="inline-block w-3 h-3 rounded-full mr-2"
            style={{ backgroundColor: data.color || "#3B82F6" }}
          ></span>
          {valueFormatter(data.value)}
        </p>
        {data.payload?.percentage && (
          <p className="text-xs text-gray-500 mt-1">
            {data.payload.percentage.toFixed(1)}% of total
          </p>
        )}
      </div>
    );
  }
  return null;
};

// Enhanced scrollable bar chart component
interface ScrollableBarChartProps {
  data: any[];
  dataKey: string;
  nameKey?: string;
  color?: string;
  config?: Partial<ScrollableChartConfig>;
  valueFormatter?: (value: number) => string;
  onBarClick?: (data: any, index: number) => void;
  className?: string;
}

export const ScrollableBarChart: React.FC<ScrollableBarChartProps> = ({
  data,
  dataKey,
  nameKey = "name",
  color = "#3B82F6",
  config = {},
  valueFormatter,
  onBarClick,
  className = "",
}) => {
  const chartConfig = { ...defaultScrollConfig, ...config };
  const needsScrolling = data.length > chartConfig.scrollThreshold;

  // Calculate dynamic width for scrolling
  const calculateChartWidth = () => {
    if (!needsScrolling) return "100%";

    const totalBars = data.length;
    const calculatedWidth = totalBars * chartConfig.minBarWidth + 100; // Add margin
    return Math.max(600, calculatedWidth); // Minimum width of 600px
  };

  const chartWidth = calculateChartWidth();

  // Prepare chart data with proper formatting
  const chartData = data.map((item, index) => ({
    ...item,
    [nameKey]:
      item[nameKey]?.length > 15
        ? `${item[nameKey].substring(0, 15)}...`
        : item[nameKey],
    fullName: item[nameKey],
    originalIndex: index,
  }));

  const handleBarClick = (data: any, index: number) => {
    if (onBarClick) {
      // Find original data using the originalIndex
      const originalData = data.payload;
      onBarClick(originalData, data.originalIndex);
    }
  };

  if (needsScrolling) {
    return (
      <div
        className={`w-full ${className} relative`}
        style={{ height: chartConfig.containerHeight }}
      >
        {/* <div className="w-full h-full overflow-x-auto overflow-y-hidden relative"> */}
        {/* Fixed Y-axis container */}
        <div
          className="absolute  z-10 bg-white"
          style={{ width: "70px", height: "321px" }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[{ temp: Math.max(...chartData.map((d) => d[dataKey])) }]}
              margin={{
                top: 12,
                right: 0,
                left: 19,
                bottom: chartConfig.marginBottom,
              }}
            >
              <YAxis
                fontSize={12}
                tick={{ fontSize: 12 }}
                domain={[0, Math.max(...chartData.map((d) => d[dataKey]))]}
                width={50}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Scrollable chart content */}
        <div
          className="overflow-x-auto overflow-y-hidden h-full"
          style={{ marginLeft: "70px" }} // Fixed Y-axis ke liye space
        >
          <div
            className="h-full"
            style={{
              width:
                typeof chartWidth === "number" ? `${chartWidth}px` : chartWidth,
            }}
          >
            <ResponsiveContainer width="100%" height="125%">
              <BarChart
                data={chartData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 0, // No left margin since Y-axis is fixed
                  bottom: chartConfig.marginBottom,
                }}
                barCategoryGap="15%"
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey={nameKey}
                  fontSize={11}
                  angle={-45}
                  textAnchor="end"
                  height={chartConfig.marginBottom}
                  interval={0}
                  tick={{ fontSize: 11 }}
                />
                {/* Hide Y-axis since it's fixed separately */}
                <YAxis hide />
                <Tooltip
                  content={
                    <EnhancedCustomTooltip valueFormatter={valueFormatter} />
                  }
                  cursor={{ fill: "rgba(59, 130, 246, 0.1)" }}
                />
                <Bar
                  dataKey={dataKey}
                  fill={color}
                  radius={[4, 4, 0, 0]}
                  onClick={handleBarClick}
                  style={{ cursor: onBarClick ? "pointer" : "default" }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* </div> */}
      </div>
    );
  }

  // Regular chart for smaller datasets
  return (
    <div
      className={`w-full ${className}`}
      style={{ height: chartConfig.containerHeight }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey={nameKey}
            fontSize={12}
            angle={-45}
            textAnchor="end"
            height={60}
            interval={0}
          />
          <YAxis fontSize={12} />
          <Tooltip
            content={<EnhancedCustomTooltip valueFormatter={valueFormatter} />}
            cursor={{ fill: "rgba(59, 130, 246, 0.1)" }}
          />
          <Bar
            dataKey={dataKey}
            fill={color}
            radius={[4, 4, 0, 0]}
            onClick={handleBarClick}
            style={{ cursor: onBarClick ? "pointer" : "default" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// Enhanced scrollable line chart component
interface ScrollableLineChartProps {
  data: any[];
  dataKey: string;
  nameKey?: string;
  color?: string;
  config?: Partial<ScrollableChartConfig>;
  valueFormatter?: (value: number) => string;
  onPointClick?: (data: any, index: number) => void;
  className?: string;
}

export const ScrollableLineChart: React.FC<ScrollableLineChartProps> = ({
  data,
  dataKey,
  nameKey = "name",
  color = "#3B82F6",
  config = {},
  valueFormatter,
  onPointClick,
  className = "",
}) => {
  const chartConfig = { ...defaultScrollConfig, ...config };
  const needsScrolling = data.length > chartConfig.scrollThreshold;

  const calculateChartWidth = () => {
    if (!needsScrolling) return "100%";

    const totalPoints = data.length;
    const calculatedWidth = totalPoints * 60 + 100; // 60px per point + margin
    return Math.max(600, calculatedWidth);
  };

  const chartWidth = calculateChartWidth();
  // Use consistent height of 336px
  const enhancedHeight = 336;

  const chartData = data.map((item, index) => ({
    ...item,
    [nameKey]:
      item[nameKey]?.length > 15
        ? `${item[nameKey].substring(0, 15)}...`
        : item[nameKey],
    fullName: item[nameKey],
    originalIndex: index,
  }));

  if (needsScrolling) {
    return (
      <div
        className={`w-full ${className} relative`}
        style={{ height: enhancedHeight }}
      >
        {/* <div className="w-full overflow-x-auto overflow-y-hidden relative" style={{ height: '100%' }}> */}
        {/* Fixed Y-axis container */}
        <div
          className="absolute z-10 bg-white"
          style={{ width: "70px", height: "321px" }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={[chartData[0]]} // Just one item for Y-axis reference
              margin={{
                top: 0,
                right: 0,
                left: 6,
                bottom: 100,
              }}
            >
              <YAxis
                fontSize={12}
                domain={[0, Math.max(...chartData.map((d) => d[dataKey]))]}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Scrollable chart content */}
        <div
          className="overflow-x-auto overflow-y-hidden h-full"
          style={{ marginLeft: "70px" }} // Fixed Y-axis ke liye space
        >
          <div
            className="h-full"
            style={{
              width:
                typeof chartWidth === "number" ? `${chartWidth}px` : chartWidth
            }}
          >
            <ResponsiveContainer width="100%" height="105%">
              <LineChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 3, // No left margin since Y-axis is fixed
                  bottom: 60,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey={nameKey}
                  fontSize={12}
                  angle={-90}
                  textAnchor="end"
                  height={60}
                  interval={0}
                  tick={{ fontSize: 12 }}
                />
                {/* Hide Y-axis since it's fixed separately */}
                <YAxis hide />
                <Tooltip
                  content={
                    <EnhancedCustomTooltip valueFormatter={valueFormatter} />
                  }
                />
                <Line
                  type="monotone"
                  dataKey={dataKey}
                  stroke={color}
                  strokeWidth={2}
                  dot={{ fill: color, strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: color, strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* </div> */}
      </div>
    );
  }

  return (
    <div
      className={`w-full ${className}`}
      style={{ height: chartConfig.containerHeight }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey={nameKey}
            fontSize={12}
            angle={-45}
            textAnchor="end"
            height={60}
            interval={0}
          />
          <YAxis fontSize={12} />
          <Tooltip
            content={<EnhancedCustomTooltip valueFormatter={valueFormatter} />}
          />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={2}
            dot={{ fill: color, strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: color, strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

// Utility function to determine if scrolling is needed based on filter selection
export const shouldUseScrollableChart = (
  topFilter: string,
  dataLength: number,
  threshold: number = 10
): boolean => {
  // Extract number from filter (e.g., "Top 15" -> 15)
  const filterMatch = topFilter.match(/\d+/);
  const filterNumber = filterMatch ? parseInt(filterMatch[0]) : 10;

  // Always use scrollable chart for better consistency and to fix blank page issues
  // Use scrollable chart if filter is >= threshold OR if data length >= threshold
  return filterNumber >= threshold || dataLength >= threshold;
};

// Enhanced render function that can be used in existing components
export const renderEnhancedChart = (
  data: any[],
  chartType: string,
  topFilter: string,
  config: {
    dataKey: string;
    nameKey?: string;
    color?: string;
    valueFormatter?: (value: number) => string;
    onItemClick?: (data: any, index: number) => void;
    scrollConfig?: Partial<ScrollableChartConfig>;
  }
) => {
  const useScrollable = shouldUseScrollableChart(topFilter, data.length);

  if (chartType === "bar" && useScrollable) {
    return (
      <ScrollableBarChart
        data={data}
        dataKey={config.dataKey}
        nameKey={config.nameKey}
        color={config.color}
        config={config.scrollConfig}
        valueFormatter={config.valueFormatter}
        onBarClick={config.onItemClick}
      />
    );
  }

  if (chartType === "line" && useScrollable) {
    return (
      <ScrollableLineChart
        data={data}
        dataKey={config.dataKey}
        nameKey={config.nameKey}
        color={config.color}
        config={config.scrollConfig}
        valueFormatter={config.valueFormatter}
        onPointClick={config.onItemClick}
      />
    );
  }

  // Return null for non-scrollable cases - let existing components handle
  return null;
};

export default {
  ScrollableBarChart,
  ScrollableLineChart,
  EnhancedCustomTooltip,
  shouldUseScrollableChart,
  renderEnhancedChart,
  defaultScrollConfig,
};
