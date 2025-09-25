import React from 'react';
import { Card } from './ui/card';
import { DollarSign, Target, TrendingUp, Users, CreditCard, Filter, Maximize, Trophy } from 'lucide-react';
import { Button } from './ui/button';

interface MetricsSectionProps {
  valueUnit?: string;
  selectedReportType?: string;
  baseMetricsData?: {
    totalRevenue: number;
    expenses: number;
    grossProfit: number;
  };
  isIconOnly?: boolean;
  onAdvancedFiltersClick?: () => void;
  onFullScreenClick?: () => void;
  onLeaderboardClick?: () => void;
}

export function MetricsSection({ 
  valueUnit, 
  selectedReportType = 'Revenue by Products', 
  baseMetricsData,
  isIconOnly = false,
  onAdvancedFiltersClick,
  onFullScreenClick,
  onLeaderboardClick
}: MetricsSectionProps) {
  // Professional Executive Color Palette with Distinct Backgrounds
  const professionalPalette = {
    // Core colors - muted and professional
    primary: "#475569",       // Neutral slate gray (stability)
    secondary: "#64748B",     // Medium slate (balance)
    accent: "#6B7280",        // Cool gray (sophistication)
    
    // Data visualization - muted tones
    success: "#10B981",       // Emerald green (success)
    warning: "#F59E0B",       // Amber (caution)
    danger: "#EF4444",        // Red (attention)
    info: "#3B82F6",          // Blue (information)
    
    // Enhanced backgrounds for cards - distinct colors
    successBg: "#ECFDF5",     // Light green background
    warningBg: "#FFFBEB",     // Light amber background
    primaryBg: "#EFF6FF",     // Light blue background
    infoBg: "#F0F9FF",        // Very light blue background
    
    // Backgrounds
    backgroundLight: "#F8FAFC",
    cardLight: "#FFFFFF",
    
    // Text
    textPrimary: "#0F172A",
    textSecondary: "#64748B",
    
    // Borders & Dividers
    borderLight: "#E2E8F0",
    
    // Border colors to match backgrounds
    successBorder: "#D1FAE5",
    warningBorder: "#FEF3C7",
    primaryBorder: "#DBEAFE",
  };

  const getFormattedValue = (value: number) => {
    if (valueUnit === 'Crore') {
      return `₹${(value / 10000000).toFixed(2)}`;
    } else if (valueUnit === 'Lakh') {
      return `₹${(value / 100000).toFixed(2)}`;
    } else if (valueUnit === 'Thousands') {
      return `₹${(value / 1000).toFixed(2)}`;
    }
    return `₹${value.toLocaleString('en-IN')}`;
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString('en-IN');
  };

  // Get total policies and premium for display  
  const getTotalPoliciesAndPremium = () => {
    // Sample data - in real implementation, this would come from the actual data
    const adjustmentFactor = selectedReportType === 'Revenue by Products' ? 1.0 :
                            selectedReportType === 'Revenue by Insurers' ? 0.95 :
                            selectedReportType === 'Revenue by Policy Type' ? 1.08 :
                            0.92;
    
    const basePolicies = 12847;
    const basePremium = 547290000; // in actual currency
    
    return {
      totalPolicies: Math.round(basePolicies * adjustmentFactor),
      totalPremium: basePremium * adjustmentFactor
    };
  };

  const totalsData = getTotalPoliciesAndPremium();

  // Use centralized data source if provided, otherwise fall back to default
  const getMetricsData = () => {
    if (baseMetricsData) {
      return baseMetricsData;
    }
    
    // Fallback data (should match the App.tsx centralized data)
    const baseMetrics = {
      totalRevenue: 240000000,  // ₹24 crores
      expenses: 153467000,      // ₹15.35 crores  
      grossProfit: 86533000     // ₹8.65 crores
    };

    // Adjust values slightly based on report type for demonstration
    const adjustmentFactor = selectedReportType === 'Revenue by Products' ? 1.0 :
                            selectedReportType === 'Revenue by Insurers' ? 0.95 :
                            selectedReportType === 'Revenue by Policy Type' ? 1.08 :
                            0.92; // Business Vertical

    return {
      totalRevenue: baseMetrics.totalRevenue * adjustmentFactor,
      expenses: baseMetrics.expenses * adjustmentFactor,
      grossProfit: baseMetrics.grossProfit * adjustmentFactor
    };
  };

  const metricsData = getMetricsData();
  const expenseRatio = ((metricsData.expenses / metricsData.totalRevenue) * 100).toFixed(1);
  const grossProfitPercentage = ((metricsData.grossProfit / metricsData.totalRevenue) * 100).toFixed(1);
  const avgRevenue = metricsData.totalRevenue / totalsData.totalPolicies;

  // Icon-only Key Performance Metrics section
  if (isIconOnly) {
    const iconActions = [
      {
        id: 'advanced-filters',
        icon: Filter,
        label: 'Advanced Filters',
        onClick: onAdvancedFiltersClick,
        color: 'text-blue-600',
        hoverColor: 'hover:bg-blue-50'
      },
      {
        id: 'full-screen',
        icon: Maximize,
        label: 'Full Screen',
        onClick: onFullScreenClick,
        color: 'text-green-600',
        hoverColor: 'hover:bg-green-50'
      },
      {
        id: 'leaderboard',
        icon: Trophy,
        label: 'Leaderboard',
        onClick: onLeaderboardClick,
        color: 'text-amber-600',
        hoverColor: 'hover:bg-amber-50'
      }
    ];

    return (
      <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900">Key Performance Metrics</h3>
          <div className="flex items-center gap-2">
            {iconActions.map((action) => (
              <Button
                key={action.id}
                variant="ghost"
                size="sm"
                className={`p-2 rounded-lg transition-all duration-200 ${action.hoverColor} ${action.color}`}
                onClick={action.onClick}
                title={action.label}
              >
                <action.icon className="w-4 h-4" />
              </Button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const metrics = [
    {
      title: 'Total Revenue',
      value: metricsData.totalRevenue,
      color: professionalPalette.success,
      background: professionalPalette.successBg,
      borderColor: professionalPalette.successBorder,
      isNegative: false,
      isEnhanced: true,
      policies: totalsData.totalPolicies,
      premium: totalsData.totalPremium,
      avgRevenue: avgRevenue
    },
    {
      title: 'Total Expenses',
      value: metricsData.expenses,
      specialValue: `${expenseRatio}%`,
      color: professionalPalette.warning,
      background: professionalPalette.warningBg,
      borderColor: professionalPalette.warningBorder,
      isNegative: false,
      showPercentageInTitle: true
    },
    {
      title: 'Gross Profit',
      value: metricsData.grossProfit,
      specialValue: `${grossProfitPercentage}%`, // Percentage of revenue
      color: metricsData.grossProfit >= 0 ? professionalPalette.info : professionalPalette.danger,
      background: professionalPalette.primaryBg,
      borderColor: professionalPalette.primaryBorder,
      isNegative: metricsData.grossProfit < 0,
      showPercentageInTitle: true
    }
  ];

  return (
    <div className="space-y-3">
      {/* Enhanced Professional Metrics Cards with Reduced Height */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {metrics.map((metric, index) => {
          return (
            <Card 
              key={index} 
              className="p-2.5 hover:shadow-lg transition-all duration-300 rounded-lg" // Reduced padding from p-3 to p-2.5
              style={{ 
                backgroundColor: metric.background,
                border: `1px solid ${metric.borderColor}`
              }}
            >
              {/* Reduced top section height */}
              <div className="flex items-center justify-between mb-1.5"> {/* Reduced margin from mb-2 to mb-1.5 */}
                <div></div>
                
                {/* Only show special value badge for metrics without showPercentageInTitle */}
                {metric.specialValue && !metric.showPercentageInTitle && (
                  <div className="flex items-center">
                    <span 
                      className="text-xs font-semibold px-1.5 py-0.5 rounded-full"
                      style={{ 
                        color: metric.color,
                        backgroundColor: `${metric.color}15`
                      }}
                    >
                      {metric.specialValue}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="space-y-1">
                {/* Title with optional percentage */}
                <h3 className="text-xs font-medium text-gray-600 flex items-center gap-1.5">
                  {metric.title}
                  {metric.showPercentageInTitle && metric.specialValue && (
                    <span 
                      className="text-xs font-semibold"
                      style={{ color: metric.color }}
                    >
                      {metric.specialValue}
                    </span>
                  )}
                </h3>
                
                <div className="flex items-baseline gap-1">
                  <span 
                    className={`text-lg font-bold ${metric.isNegative ? 'text-red-700' : 'text-gray-900'}`}
                  >
                    {metric.isNegative && '- '}
                    {getFormattedValue(Math.abs(metric.value))}
                  </span>
                  <span className="text-xs text-gray-500">
                    {valueUnit}s
                  </span>
                </div>

                {/* Enhanced details for Total Revenue card - More Compressed */}
                {metric.isEnhanced && (
                  <div className="mt-1.5 pt-1.5 border-t border-gray-200 space-y-0.5"> {/* Reduced spacing */}
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3 h-3 text-gray-500" />
                        <span className="text-gray-600">Policies</span>
                      </div>
                      <span className="font-medium text-gray-800">
                        {formatNumber(metric.policies!)}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5">
                        <CreditCard className="w-3 h-3 text-gray-500" />
                        <span className="text-gray-600">Premium</span>
                      </div>
                      <span className="font-medium text-gray-800">
                        {getFormattedValue(metric.premium!)} {valueUnit}s
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5">
                        <TrendingUp className="w-3 h-3 text-gray-500" />
                        <span className="text-gray-600">Avg Revenue</span>
                      </div>
                      <span className="font-medium text-gray-800">
                        ₹{Math.round(metric.avgRevenue!).toLocaleString('en-IN')}/policy
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
      
      {/* Portfolio Overview section removed as requested */}
    </div>
  );
}