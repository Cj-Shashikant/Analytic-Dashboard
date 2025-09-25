export const insurersListStyles = {
  // Main container - Ensure full height and proper flex layout
  container: "bg-card text-card-foreground flex flex-col rounded-xl border p-4 h-80",
  
  // Header section - Fixed height to match chart header
  header: {
    wrapper: "flex items-center justify-between mb-2 h-16 flex-shrink-0",
    icon: "w-5 h-5 text-blue-600",
    title: "font-medium text-gray-900"
  },
  
  // Table structure - Custom grid with wider Product column
  table: {
    headerRow: "grid gap-4 pb-3 mb-3 border-b border-gray-200",
    headerCell: "text-sm font-semibold text-gray-700 text-center",
    headerCellCenter: "text-sm font-semibold text-gray-700 text-center",
    headerCellRight: "text-sm font-semibold text-gray-700 text-center",
    body: "space-y-2 flex-1 overflow-y-auto min-h-0 h-80"
  },
  
  // Product row - Custom grid with wider Product column
  productRow: {
    container: "grid gap-4 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer items-center",
    productColumn: "flex items-center gap-3",
    colorIndicator: "w-3 h-3 rounded-full flex-shrink-0",
    productInfo: "min-w-0",
    productName: "font-medium text-gray-900 text-sm",
    productDescription: "text-xs text-gray-500",
    centerColumn: "text-center",
    rightColumn: "text-center",
    cellValue: "font-medium text-gray-900 text-sm"
  },
  
  // Footer (commented out in original)
  footer: {
    wrapper: "mt-4 pt-3 border-t border-gray-200",
    text: "text-xs text-gray-600 text-center"
  }
};

// Export individual style groups for easier access
export const {
  container,
  header,
  table,
  productRow,
  footer
} = insurersListStyles;