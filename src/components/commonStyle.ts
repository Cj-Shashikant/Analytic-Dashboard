// Common CSS styles for chart components

export const commonStyles = {
  // Main container styles
  container: "space-y-6",
  
  // Split layout styles - Flexible height for content adaptation
  splitLayout: "grid grid-cols-1 lg:grid-cols-2 gap-6",
  
  // Left section (Chart) styles - Ensure full height
  leftSection: "lg:col-span-1",
  chartCard: "p-4 flex flex-col",
  chartHeader: "flex items-center justify-between mb-2 h-16 flex-shrink-0",
  chartTitleContainer: "",
  chartTitle: "text-lg font-semibold text-gray-900 mb-1",
  chartSubtitle: "text-sm text-gray-600",
  chartControls: "flex items-center gap-2",
  
  
  // Select dropdown styles
  selectTrigger: "w-28 h-8 text-xs",
  
  // Chart container styles - Flexible height to match content
  chartContainer: "flex-1 relative min-h-[336px]",
  chartWrapper: "w-full h-full",
  
  // Right section styles - Ensure full height
  rightSection: "lg:col-span-1",
  
  // Card component base style
  card: "p-4 h-full",
  
  // Data table styles
  dataTableCard: "p-4 flex flex-col",
  dataTableHeader: "flex items-center justify-between mb-2 h-16 flex-shrink-0",
  dataTableTitleContainer: "",
  dataTableTitle: "text-lg font-semibold text-gray-900 mb-1",
  dataTableSubtitle: "text-sm text-gray-600",
  dataTableContainer: "flex-1 relative min-h-[336px]",
  dataTableScrollable: "w-full h-full overflow-auto",
  dataTableHeaderRow: "flex items-center gap-4 pb-3 mb-3 border-b border-gray-200",
  dataTableHeaderCell: "text-sm font-semibold text-gray-700 text-center",
  sortableHeader: "cursor-pointer hover:text-gray-900 transition-colors",
  dataTableBody: "space-y-2",
  dataTableRow: "flex items-center gap-4 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer",
  dataTableCell: "text-center",
  dataTableItemInfo: "flex items-center gap-3",
  dataTableColorIndicator: "w-3 h-3 rounded-full flex-shrink-0",
  dataTableItemDetails: "min-w-0 text-left",
  dataTableItemName: "font-medium text-gray-900 text-sm block",
  dataTableItemDescription: "text-xs text-gray-500 block",
  dataTableValue: "font-medium text-gray-900 text-sm",
  dataTableUnit: "text-xs text-gray-500",
};

// Chart dimension constants
export const chartDimensions = {
  default: { width: 609, height: 336 },
  fullScreen: { width: 800, height: 600 },
};

// Common filter options
export const topFilterOptions = [
  { value: "Top 5", label: "Top 5" },
  { value: "Top 10", label: "Top 10" },
  { value: "Top 15", label: "Top 15" },
  { value: "Top 20", label: "Top 20" },
  { value: "Top 30", label: "Top 30" },
  { value: "Top 50", label: "Top 50" },
  { value: "All", label: "All (30)" },
];

// Common subtitle text generators
export const getChartSubtitle = (selectedReportType: string) => {
  const typeMap: Record<string, string> = {
    "Revenue by Vertical": "business verticals",
    "Revenue by LOB": "lines of business",
    "Revenue by Policy Type": "policy types",
    "Revenue by Insurers": "insurance partners",
    "Revenue by Products": "product categories",
  };
  
  return `Distribution of revenue across ${typeMap[selectedReportType] || "categories"}`;
};