import React, { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Package, 
  DollarSign, 
  FileText, 
  Phone, 
  Heart, 
  Target, 
  BarChart3,
  Download,
  Maximize,
  Clock,
  ShoppingCart,
  Coins,
  MessageSquare,
  Star,
  Layers,
  RotateCcw,
  Zap,
  ArrowUpRight,
  TrendingUp as Growth,
  Calculator,
  PieChart as PieChartIcon,
  Activity,
  Award,
  Building,
  Shield
} from 'lucide-react';
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
  ScatterChart,
  Scatter,
  Area,
  AreaChart
} from 'recharts';

interface CustomerAnalysisSectionProps {
  valueUnit: string;
  selectedReportType: string;
  currentFilters?: {
    selectedEntity: string;
    selectedReportType: string;
    selectedBusinessType: string;
    selectedLocation: string;
    selectedDuration: string;
    valueUnit: string;
  };
  onPlayFullView?: (filters: any, chartData: any, chartType?: string) => void;
}

export function CustomerAnalysisSection({ 
  valueUnit, 
  selectedReportType,
  currentFilters,
  onPlayFullView
}: CustomerAnalysisSectionProps) {
  const [segmentFilter, setSegmentFilter] = useState('All Customers');
  const [showProducts, setShowProducts] = useState(true);

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

  // Professional color palette for customer analytics
  const colors = {
    primary: '#3B82F6',
    secondary: '#10B981',
    tertiary: '#F59E0B',
    quaternary: '#8B5CF6',
    quinternary: '#EF4444',
    gradient: ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444', '#06B6D4', '#F97316', '#84CC16']
  };

  // Premium Contribution by Customer Data
  const getPremiumContributionData = () => {
    return {
      customerTiers: [
        {
          tier: 'High Value',
          range: '₹10L+ Annual Premium',
          customers: 450,
          percentage: 5.6,
          totalPremium: 135000000,
          avgPremium: 300000,
          contributionPercentage: 56.3,
          color: colors.secondary,
          growthRate: 12.5,
          retentionRate: 94.2,
          products: 3.8
        },
        {
          tier: 'Mid Value',
          range: '₹2L - ₹10L Annual Premium',
          customers: 1600,
          percentage: 20.0,
          totalPremium: 96000000,
          avgPremium: 60000,
          contributionPercentage: 40.0,
          color: colors.primary,
          growthRate: 8.2,
          retentionRate: 87.5,
          products: 2.4
        },
        {
          tier: 'Standard',
          range: '₹50K - ₹2L Annual Premium',
          customers: 3200,
          percentage: 40.0,
          totalPremium: 8800000,
          avgPremium: 27500,
          contributionPercentage: 3.7,
          color: colors.tertiary,
          growthRate: 3.1,
          retentionRate: 72.8,
          products: 1.6
        },
        {
          tier: 'Basic',
          range: 'Below ₹50K Annual Premium',
          customers: 2750,
          percentage: 34.4,
          totalPremium: 0,
          avgPremium: 18000,
          contributionPercentage: 0.0,
          color: colors.quaternary,
          growthRate: -2.5,
          retentionRate: 58.3,
          products: 1.2
        }
      ],
      
      // Top contributors analysis
      topContributors: [
        { name: 'Reliance Industries Ltd', premium: 15500000, segment: 'Corporate', products: 8, tenure: '12 years' },
        { name: 'Tata Motors Ltd', premium: 12200000, segment: 'Corporate', products: 6, tenure: '8 years' },
        { name: 'HDFC Bank Ltd', premium: 9800000, segment: 'Corporate', products: 5, tenure: '15 years' },
        { name: 'Infosys Technologies', premium: 8900000, segment: 'Corporate', products: 7, tenure: '10 years' },
        { name: 'Asian Paints Ltd', premium: 7600000, segment: 'Corporate', products: 4, tenure: '6 years' },
        { name: 'Mahindra & Mahindra', premium: 6800000, segment: 'Corporate', products: 5, tenure: '9 years' },
        { name: 'L&T Construction', premium: 5900000, segment: 'Corporate', products: 6, tenure: '7 years' },
        { name: 'Wipro Limited', premium: 5200000, segment: 'Corporate', products: 4, tenure: '11 years' },
        { name: 'Dr. Reddy\'s Labs', premium: 4800000, segment: 'Corporate', products: 3, tenure: '5 years' },
        { name: 'Bharti Airtel Ltd', premium: 4300000, segment: 'Corporate', products: 5, tenure: '13 years' }
      ],
      
      // Summary metrics
      totalPremium: 240000000, // ₹24 crores
      totalCustomers: 8000,
      averagePremium: 30000,
      concentrationRisk: 25.6, // % of premium from top 10 customers
      
      // Insights
      insights: {
        paretoAnalysis: {
          top20PercentCustomers: 1600, // Top 20% of customers
          premiumContribution: 96.3, // % of total premium they contribute
          averagePremium: 144375
        },
        
        growthOpportunities: [
          { segment: 'Standard to Mid Value', customers: 960, potential: 45600000, conversionRate: 15.2 },
          { segment: 'Basic to Standard', customers: 1375, potential: 27500000, conversionRate: 8.7 },
          { segment: 'New High Value Acquisition', customers: 50, potential: 15000000, conversionRate: 45.0 }
        ]
      }
    };
  };

  // Cross-Sell / Upsell Potential Data
  const getCrossSellData = () => {
    return {
      // Product penetration analysis
      productPenetration: [
        {
          product: 'Motor Insurance',
          currentCustomers: 6800,
          totalCustomers: 8000,
          penetration: 85.0,
          crossSellPotential: 1200,
          averageValue: 45000,
          priority: 'Medium',
          color: colors.primary
        },
        {
          product: 'Health Insurance',
          currentCustomers: 5200,
          totalCustomers: 8000,
          penetration: 65.0,
          crossSellPotential: 2800,
          averageValue: 28000,
          priority: 'High',
          color: colors.secondary
        },
        {
          product: 'Life Insurance',
          currentCustomers: 3600,
          totalCustomers: 8000,
          penetration: 45.0,
          crossSellPotential: 4400,
          averageValue: 95000,
          priority: 'High',
          color: colors.tertiary
        },
        {
          product: 'Property Insurance',
          currentCustomers: 2400,
          totalCustomers: 8000,
          penetration: 30.0,
          crossSellPotential: 5600,
          averageValue: 125000,
          priority: 'Very High',
          color: colors.quaternary
        },
        {
          product: 'Travel Insurance',
          currentCustomers: 1600,
          totalCustomers: 8000,
          penetration: 20.0,
          crossSellPotential: 6400,
          averageValue: 8500,
          priority: 'Medium',
          color: colors.quinternary
        },
        {
          product: 'Marine Insurance',
          currentCustomers: 800,
          totalCustomers: 8000,
          penetration: 10.0,
          crossSellPotential: 7200,
          averageValue: 180000,
          priority: 'Low',
          color: colors.gradient[5]
        }
      ],

      // Customer segments with cross-sell potential
      customerSegments: [
        {
          segment: 'High Value (1 Product)',
          customers: 280,
          currentSpend: 84000000,
          potentialSpend: 168000000,
          upliftPotential: 100,
          probability: 75,
          timeframe: '3-6 months',
          products: ['Health', 'Property', 'Life'],
          color: colors.secondary
        },
        {
          segment: 'Mid Value (1-2 Products)',
          customers: 1200,
          currentSpend: 72000000,
          potentialSpend: 144000000,
          upliftPotential: 100,
          probability: 60,
          timeframe: '6-12 months',
          products: ['Motor', 'Travel', 'Health'],
          color: colors.primary
        },
        {
          segment: 'Standard (1 Product)',
          customers: 2400,
          currentSpend: 66000000,
          potentialSpend: 99000000,
          upliftPotential: 50,
          probability: 45,
          timeframe: '12-18 months',
          products: ['Health', 'Travel'],
          color: colors.tertiary
        },
        {
          segment: 'Basic (Single Product)',
          customers: 1800,
          currentSpend: 32400000,
          potentialSpend: 48600000,
          upliftPotential: 50,
          probability: 25,
          timeframe: '18+ months',
          products: ['Travel', 'Health'],
          color: colors.quaternary
        }
      ],

      // Revenue opportunity matrix
      revenueMatrix: [
        {
          opportunity: 'Property Insurance to Motor Customers',
          targetCustomers: 4200,
          conversionRate: 15.2,
          expectedCustomers: 638,
          revenuePerCustomer: 125000,
          totalOpportunity: 79750000,
          priority: 'Very High',
          effort: 'Medium',
          roi: 850
        },
        {
          opportunity: 'Health Insurance to All Segments',
          targetCustomers: 2800,
          conversionRate: 22.5,
          expectedCustomers: 630,
          revenuePerCustomer: 28000,
          totalOpportunity: 17640000,
          priority: 'High',
          effort: 'Low',
          roi: 780
        },
        {
          opportunity: 'Life Insurance Cross-sell',
          targetCustomers: 4400,
          conversionRate: 8.7,
          expectedCustomers: 383,
          revenuePerCustomer: 95000,
          totalOpportunity: 36385000,
          priority: 'High',
          effort: 'High',
          roi: 420
        },
        {
          opportunity: 'Travel Insurance Volume Play',
          targetCustomers: 6400,
          conversionRate: 18.3,
          expectedCustomers: 1171,
          revenuePerCustomer: 8500,
          totalOpportunity: 9953500,
          priority: 'Medium',
          effort: 'Low',
          roi: 650
        },
        {
          opportunity: 'Marine Insurance Premium Segment',
          targetCustomers: 450,
          conversionRate: 35.0,
          expectedCustomers: 158,
          revenuePerCustomer: 180000,
          totalOpportunity: 28440000,
          priority: 'Medium',
          effort: 'High',
          roi: 380
        }
      ],

      // Summary metrics
      totalOpportunity: 158000000, // ₹15.8 crores
      currentPenetration: 48.3, // % average across products
      targetPenetration: 75.0, // % target
      expectedConversions: 2980,
      averageUplift: 67, // % revenue increase per customer
      
      // Campaign recommendations
      campaigns: [
        {
          name: 'Premium Property Protection',
          target: 'High-value motor customers without property coverage',
          customers: 320,
          investment: 1200000,
          expectedReturn: 15000000,
          duration: '6 months',
          channels: ['Phone', 'Email', 'In-person'],
          priority: 'Immediate'
        },
        {
          name: 'Health First Initiative',
          target: 'All customers without health insurance',
          customers: 2800,
          investment: 800000,
          expectedReturn: 8500000,
          duration: '12 months',
          channels: ['Digital', 'WhatsApp', 'Email'],
          priority: 'High'
        },
        {
          name: 'Life Milestone Moments',
          target: 'Customers aged 25-45 without life coverage',
          customers: 1800,
          investment: 1500000,
          expectedReturn: 12000000,
          duration: '18 months',
          channels: ['Advisory', 'Webinars', 'Personal meetings'],
          priority: 'Medium'
        }
      ]
    };
  };



  // Customer Satisfaction Data - Star Rating System
  const getSatisfactionData = () => {
    return {
      starRatings: [
        { 
          stars: 5, 
          label: '5 Stars', 
          customers: 2800, 
          percentage: 35.0, 
          avgSpend: 145000,
          satisfaction: 'Excellent',
          color: colors.secondary,
          retentionRate: 95.2
        },
        { 
          stars: 4, 
          label: '4 Stars', 
          customers: 2400, 
          percentage: 30.0, 
          avgSpend: 125000,
          satisfaction: 'Very Good',
          color: colors.tertiary,
          retentionRate: 88.5
        },
        { 
          stars: 3, 
          label: '3 Stars', 
          customers: 1600, 
          percentage: 20.0, 
          avgSpend: 95000,
          satisfaction: 'Good',
          color: colors.primary,
          retentionRate: 72.3
        },
        { 
          stars: 2, 
          label: '2 Stars', 
          customers: 800, 
          percentage: 10.0, 
          avgSpend: 68000,
          satisfaction: 'Fair',
          color: colors.quaternary,
          retentionRate: 45.8
        },
        { 
          stars: 1, 
          label: '1 Star', 
          customers: 400, 
          percentage: 5.0, 
          avgSpend: 42000,
          satisfaction: 'Poor',
          color: colors.quinternary,
          retentionRate: 12.5
        }
      ],
      
      // Summary metrics
      totalCustomers: 8000,
      overallAvgRating: 3.9,
      npsScore: 42, // Net Promoter Score (% Promoters - % Detractors)
      satisfactionTrend: '+8.5%', // YoY improvement
      
      // Satisfaction categories for NPS calculation
      promoters: 2800, // 5-star customers
      passives: 2400,  // 4-star customers  
      detractors: 1600, // 1-3 star customers
      
      // Detailed insights
      insights: {
        topSatisfactionDrivers: [
          { factor: 'Claim Settlement Speed', impact: 92, customers: 6200 },
          { factor: 'Customer Service Quality', impact: 89, customers: 5800 },
          { factor: 'Policy Coverage', impact: 85, customers: 5400 },
          { factor: 'Premium Competitiveness', impact: 78, customers: 4900 },
          { factor: 'Digital Experience', impact: 74, customers: 4500 }
        ],
        
        improvementAreas: [
          { area: 'Mobile App Experience', currentScore: 3.2, targetScore: 4.5, impact: 'High' },
          { area: 'Policy Renewal Process', currentScore: 3.5, targetScore: 4.2, impact: 'Medium' },
          { area: 'Claims Documentation', currentScore: 3.7, targetScore: 4.3, impact: 'Medium' },
          { area: 'Communication Frequency', currentScore: 3.4, targetScore: 4.0, impact: 'Low' }
        ]
      }
    };
  };

  // Duration of Relationship Data with Products Purchased
  const getDurationData = () => [
    { 
      duration: '<1 Year', 
      customers: 1250, 
      percentage: 15.6, 
      avgPremium: 45000, 
      avgProducts: 1.2,
      productDistribution: {
        oneProduct: 950,
        twoProducts: 250,
        threeOrMore: 50
      },
      color: colors.primary 
    },
    { 
      duration: '1-3 Years', 
      customers: 2800, 
      percentage: 35.0, 
      avgPremium: 68000, 
      avgProducts: 1.6,
      productDistribution: {
        oneProduct: 1400,
        twoProducts: 980,
        threeOrMore: 420
      },
      color: colors.secondary 
    },
    { 
      duration: '3-5 Years', 
      customers: 2400, 
      percentage: 30.0, 
      avgPremium: 95000, 
      avgProducts: 2.1,
      productDistribution: {
        oneProduct: 720,
        twoProducts: 1200,
        threeOrMore: 480
      },
      color: colors.tertiary 
    },
    { 
      duration: '5-10 Years', 
      customers: 1200, 
      percentage: 15.0, 
      avgPremium: 125000, 
      avgProducts: 2.8,
      productDistribution: {
        oneProduct: 240,
        twoProducts: 480,
        threeOrMore: 480
      },
      color: colors.quaternary 
    },
    { 
      duration: '10+ Years', 
      customers: 350, 
      percentage: 4.4, 
      avgPremium: 180000, 
      avgProducts: 3.5,
      productDistribution: {
        oneProduct: 35,
        twoProducts: 105,
        threeOrMore: 210
      },
      color: colors.quinternary 
    }
  ];

  const renderChart = () => {
    switch (selectedReportType) {
      case 'Duration of Relationship':
        const durationData = getDurationData();
        return (
          <div className="space-y-8">
            {/* Header Section */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Customer Relationship Duration & Product Analysis</h3>
                <p className="text-sm text-gray-600 mt-1">Distribution of customers by relationship length with product penetration insights</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <Checkbox 
                    id="show-products"
                    checked={showProducts}
                    onCheckedChange={setShowProducts}
                    className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  <label 
                    htmlFor="show-products" 
                    className="text-sm font-medium text-gray-700 cursor-pointer"
                  >
                    Number of Products
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">Avg: 3.2 years</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">Avg: 1.9 products</span>
                </div>
              </div>
            </div>

            {/* Main Chart - Conditional: Stacked Bar Chart or Simple Bar Chart */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">
                {showProducts 
                  ? "Customer Distribution by Relationship Duration & Product Holdings"
                  : "Customer Distribution by Relationship Duration"
                }
              </h4>
              <ResponsiveContainer width="100%" height={380}>
                <BarChart data={durationData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="duration" />
                  <YAxis />
                  <Tooltip 
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        if (showProducts) {
                          const total = data.productDistribution.oneProduct + data.productDistribution.twoProducts + data.productDistribution.threeOrMore;
                          return (
                            <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg min-w-72">
                              <p className="font-medium text-gray-900 mb-3">{label}</p>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Total Customers:</span>
                                  <span className="font-medium">{data.customers.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Avg Premium:</span>
                                  <span className="font-medium">{getFormattedValue(data.avgPremium)}</span>
                                </div>
                                <div className="border-t border-gray-200 pt-2">
                                  <p className="font-medium text-gray-700 mb-2">Product Distribution:</p>
                                  <div className="space-y-1">
                                    <div className="flex justify-between">
                                      <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-sm bg-blue-500" />
                                        <span className="text-gray-600">1 Product:</span>
                                      </div>
                                      <span className="font-medium">{data.productDistribution.oneProduct} ({((data.productDistribution.oneProduct / total) * 100).toFixed(1)}%)</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-sm bg-green-500" />
                                        <span className="text-gray-600">2 Products:</span>
                                      </div>
                                      <span className="font-medium">{data.productDistribution.twoProducts} ({((data.productDistribution.twoProducts / total) * 100).toFixed(1)}%)</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-sm bg-amber-500" />
                                        <span className="text-gray-600">3+ Products:</span>
                                      </div>
                                      <span className="font-medium">{data.productDistribution.threeOrMore} ({((data.productDistribution.threeOrMore / total) * 100).toFixed(1)}%)</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="border-t border-gray-200 pt-2">
                                  <div className="flex justify-between">
                                    <span className="text-blue-600 font-medium">Avg Products:</span>
                                    <span className="font-medium text-blue-600">{data.avgProducts}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        } else {
                          return (
                            <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg min-w-64">
                              <p className="font-medium text-gray-900 mb-2">{label}</p>
                              <div className="space-y-1 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Customers:</span>
                                  <span className="font-medium">{data.customers.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Percentage:</span>
                                  <span className="font-medium">{data.percentage}%</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Avg Premium:</span>
                                  <span className="font-medium">{getFormattedValue(data.avgPremium)}</span>
                                </div>
                              </div>
                            </div>
                          );
                        }
                      }
                      return null;
                    }}
                  />
                  {showProducts ? (
                    <>
                      <Bar 
                        dataKey="productDistribution.oneProduct" 
                        stackId="products" 
                        fill={colors.primary}
                        name="1 Product"
                        radius={[0, 0, 0, 0]}
                      />
                      <Bar 
                        dataKey="productDistribution.twoProducts" 
                        stackId="products" 
                        fill={colors.secondary}
                        name="2 Products"
                        radius={[0, 0, 0, 0]}
                      />
                      <Bar 
                        dataKey="productDistribution.threeOrMore" 
                        stackId="products" 
                        fill={colors.tertiary}
                        name="3+ Products"
                        radius={[4, 4, 0, 0]}
                      />
                    </>
                  ) : (
                    <Bar 
                      dataKey="customers" 
                      fill={colors.primary} 
                      radius={[4, 4, 0, 0]} 
                    />
                  )}
                </BarChart>
              </ResponsiveContainer>
              
              {/* Legend - Only show for product view */}
              {showProducts && (
                <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: colors.primary }} />
                    <span className="text-sm text-gray-600">1 Product</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: colors.secondary }} />
                    <span className="text-sm text-gray-600">2 Products</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: colors.tertiary }} />
                    <span className="text-sm text-gray-600">3+ Products</span>
                  </div>
                </div>
              )}
            </div>

            {/* Duration vs Products Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Duration Summary */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Relationship Duration Breakdown</h4>
                <div className="space-y-3">
                  {durationData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="font-medium text-gray-900">{item.duration}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">{item.customers.toLocaleString()}</div>
                        <div className="text-xs text-gray-600">{item.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Penetration by Duration */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Product Penetration by Duration</h4>
                <div className="space-y-4">
                  {durationData.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">{item.duration}</span>
                        <span className="text-sm text-blue-600 font-medium">{item.avgProducts} avg products</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">1 Product: {item.productDistribution.oneProduct}</span>
                          <span className="text-gray-500">
                            {((item.productDistribution.oneProduct / item.customers) * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">2 Products: {item.productDistribution.twoProducts}</span>
                          <span className="text-gray-500">
                            {((item.productDistribution.twoProducts / item.customers) * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">3+ Products: {item.productDistribution.threeOrMore}</span>
                          <span className="text-gray-500">
                            {((item.productDistribution.threeOrMore / item.customers) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                      {/* Progress bar showing multi-product penetration */}
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-600" 
                          style={{ 
                            width: `${(((item.productDistribution.twoProducts + item.productDistribution.threeOrMore) / item.customers) * 100)}%` 
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Summary Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">Total Customers</span>
                </div>
                <div className="text-2xl font-semibold text-blue-600">8,000</div>
                <div className="text-xs text-blue-700 mt-1">Across all durations</div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <RotateCcw className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-900">Retention Rate</span>
                </div>
                <div className="text-2xl font-semibold text-green-600">68.4%</div>
                <div className="text-xs text-green-700 mt-1">Overall retention</div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-900">Avg Premium</span>
                </div>
                <div className="text-2xl font-semibold text-purple-600">{getFormattedValue(82500)}</div>
                <div className="text-xs text-purple-700 mt-1">Per customer</div>
              </div>

              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <div className="flex items-center gap-2 mb-2">
                  <Package className="w-4 h-4 text-amber-600" />
                  <span className="text-sm font-medium text-amber-900">Cross-sell Success</span>
                </div>
                <div className="text-2xl font-semibold text-amber-600">45.2%</div>
                <div className="text-xs text-amber-700 mt-1">Multi-product rate</div>
              </div>
            </div>

            {/* Key Insights */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Key Relationship & Product Insights</h4>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h5 className="font-medium text-blue-800">🏆 Loyalty Patterns</h5>
                  <ul className="text-sm space-y-1">
                    <li className="text-gray-600">• 10+ year customers: 3.5 avg products</li>
                    <li className="text-gray-600">• 60% of 10+ year customers have 3+ products</li>
                    <li className="text-gray-600">• Premium increases 4x with tenure</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h5 className="font-medium text-green-800">📈 Growth Opportunities</h5>
                  <ul className="text-sm space-y-1">
                    <li className="text-gray-600">• 1-3 year segment: 35% of customers</li>
                    <li className="text-gray-600">• Only 1.6 avg products in this segment</li>
                    <li className="text-gray-600">• High cross-sell potential: 2,380 customers</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h5 className="font-medium text-purple-800">🎯 Retention Strategy</h5>
                  <ul className="text-sm space-y-1">
                    <li className="text-gray-600">• New customers (&lt;1 year): Focus on satisfaction</li>
                    <li className="text-gray-600">• 1-3 years: Cross-sell opportunity window</li>
                    <li className="text-gray-600">• 3+ years: Premium service & loyalty rewards</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Customer Satisfaction / NPS':
        const satisfactionData = getSatisfactionData();
        return (
          <div className="space-y-8">
            {/* Header Section */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Customer Satisfaction & Net Promoter Score Analysis</h3>
                <p className="text-sm text-gray-600 mt-1">Comprehensive customer satisfaction ratings with NPS insights and retention correlation</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium text-gray-700">{satisfactionData.overallAvgRating}/5.0 Average</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">NPS: +{satisfactionData.npsScore}</span>
                </div>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-900">Promoters</span>
                </div>
                <div className="text-2xl font-semibold text-green-600">{satisfactionData.promoters.toLocaleString()}</div>
                <div className="text-xs text-green-700 mt-1">5-star customers</div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm font-medium text-yellow-900">Passives</span>
                </div>
                <div className="text-2xl font-semibold text-yellow-600">{satisfactionData.passives.toLocaleString()}</div>
                <div className="text-xs text-yellow-700 mt-1">4-star customers</div>
              </div>

              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingDown className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-medium text-red-900">Detractors</span>
                </div>
                <div className="text-2xl font-semibold text-red-600">{satisfactionData.detractors.toLocaleString()}</div>
                <div className="text-xs text-red-700 mt-1">1-3 star customers</div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">Trend</span>
                </div>
                <div className="text-2xl font-semibold text-blue-600">{satisfactionData.satisfactionTrend}</div>
                <div className="text-xs text-blue-700 mt-1">YoY improvement</div>
              </div>
            </div>

            {/* Main Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Star Rating Distribution */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Customer Satisfaction Distribution</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={satisfactionData.starRatings}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={2}
                      dataKey="customers"
                    >
                      {satisfactionData.starRatings.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="flex">
                                  {[...Array(data.stars)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                  ))}
                                </div>
                                <span className="font-medium text-gray-900">{data.satisfaction}</span>
                              </div>
                              <div className="space-y-1 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Customers:</span>
                                  <span className="font-medium">{data.customers.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Percentage:</span>
                                  <span className="font-medium">{data.percentage}%</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Avg Spend:</span>
                                  <span className="font-medium">{getFormattedValue(data.avgSpend)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Retention:</span>
                                  <span className="font-medium">{data.retentionRate}%</span>
                                </div>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                
                {/* Legend */}
                <div className="space-y-2 mt-4">
                  {satisfactionData.starRatings.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <div className="flex items-center gap-1">
                          {[...Array(item.stars)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                          ))}
                          <span className="text-sm text-gray-600 ml-1">{item.satisfaction}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">{item.customers.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">{item.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Satisfaction vs Retention Correlation */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Satisfaction vs Retention Correlation</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={satisfactionData.starRatings} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="label" />
                    <YAxis />
                    <Tooltip 
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                              <p className="font-medium text-gray-900">{label}</p>
                              <p className="text-sm text-gray-600">Retention Rate: {data.retentionRate}%</p>
                              <p className="text-sm text-gray-600">Customers: {data.customers.toLocaleString()}</p>
                              <p className="text-sm text-gray-600">Avg Spend: {getFormattedValue(data.avgSpend)}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="retentionRate" fill={colors.secondary} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Satisfaction Drivers and Improvement Areas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Satisfaction Drivers */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Top Satisfaction Drivers</h4>
                <div className="space-y-4">
                  {satisfactionData.insights.topSatisfactionDrivers.map((driver, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">{driver.factor}</span>
                        <span className="text-sm text-green-600 font-medium">{driver.impact}% impact</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-gradient-to-r from-green-400 to-green-600" 
                          style={{ width: `${driver.impact}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-500">{driver.customers.toLocaleString()} customers affected</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Improvement Areas */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Key Improvement Areas</h4>
                <div className="space-y-4">
                  {satisfactionData.insights.improvementAreas.map((area, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">{area.area}</span>
                        <Badge variant={area.impact === 'High' ? 'destructive' : area.impact === 'Medium' ? 'default' : 'secondary'}>
                          {area.impact} Impact
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-600">Current:</span>
                        <span className="font-medium">{area.currentScore}/5.0</span>
                        <span className="text-gray-400">→</span>
                        <span className="text-gray-600">Target:</span>
                        <span className="font-medium text-green-600">{area.targetScore}/5.0</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-gradient-to-r from-red-400 to-yellow-400" 
                          style={{ width: `${(area.currentScore / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Executive Summary */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Executive Summary & Recommendations</h4>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h5 className="font-medium text-green-800">🎯 Key Strengths</h5>
                  <ul className="text-sm space-y-1">
                    <li className="text-gray-600">• 65% customers rate service 4+ stars</li>
                    <li className="text-gray-600">• Strong correlation: satisfaction → retention</li>
                    <li className="text-gray-600">• Claims settlement drives 92% satisfaction</li>
                    <li className="text-gray-600">• NPS score of +42 indicates healthy growth</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h5 className="font-medium text-amber-800">⚠️ Areas of Concern</h5>
                  <ul className="text-sm space-y-1">
                    <li className="text-gray-600">• 20% detractors need immediate attention</li>
                    <li className="text-gray-600">• Mobile app experience below industry average</li>
                    <li className="text-gray-600">• 1-2 star customers: 12.5% retention risk</li>
                    <li className="text-gray-600">• Digital experience gaps in younger segments</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h5 className="font-medium text-blue-800">🚀 Action Plan</h5>
                  <ul className="text-sm space-y-1">
                    <li className="text-gray-600">• Prioritize mobile app redesign (Q1 2024)</li>
                    <li className="text-gray-600">• Implement proactive outreach for 1-3 star customers</li>
                    <li className="text-gray-600">• Enhance digital touchpoints across journey</li>
                    <li className="text-gray-600">• Target NPS improvement to +50 by year-end</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Premium Contribution by Customer':
        const premiumData = getPremiumContributionData();
        return (
          <div className="space-y-8">
            {/* Header Section */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Premium Contribution by Customer Analysis</h3>
                <p className="text-sm text-gray-600 mt-1">Customer value segmentation with premium contribution insights and growth opportunities</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">{premiumData.totalCustomers.toLocaleString()} Total Customers</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">{getFormattedValue(premiumData.totalPremium)} Total Premium</span>
                </div>
              </div>
            </div>

            {/* Customer Tier Summary Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {premiumData.customerTiers.map((tier, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: tier.color }} />
                    <span className="font-medium text-gray-900">{tier.tier}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl font-semibold" style={{ color: tier.color }}>
                      {tier.customers.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-600">{tier.percentage}% of customers</div>
                    <div className="text-sm font-medium text-gray-700">
                      {getFormattedValue(tier.avgPremium)} avg premium
                    </div>
                    {tier.contributionPercentage > 0 && (
                      <div className="text-xs text-green-600 font-medium">
                        {tier.contributionPercentage}% of total premium
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Main Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Customer Distribution by Value Tier */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Customer Distribution by Value Tier</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={premiumData.customerTiers}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={2}
                      dataKey="customers"
                    >
                      {premiumData.customerTiers.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
                              <p className="font-medium text-gray-900 mb-2">{data.tier} Customers</p>
                              <div className="space-y-1 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Customers:</span>
                                  <span className="font-medium">{data.customers.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Avg Premium:</span>
                                  <span className="font-medium">{getFormattedValue(data.avgPremium)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Growth Rate:</span>
                                  <span className="font-medium">{data.growthRate}%</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Retention:</span>
                                  <span className="font-medium">{data.retentionRate}%</span>
                                </div>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Premium Contribution Analysis */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Premium Contribution vs Customer Count</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={premiumData.customerTiers} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="tier" />
                    <YAxis />
                    <Tooltip 
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                              <p className="font-medium text-gray-900">{label}</p>
                              <p className="text-sm text-gray-600">Premium Contribution: {data.contributionPercentage}%</p>
                              <p className="text-sm text-gray-600">Total Premium: {getFormattedValue(data.totalPremium)}</p>
                              <p className="text-sm text-gray-600">Customer %: {data.percentage}%</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="contributionPercentage" fill={colors.primary} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Top Contributors Table */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Top 10 Premium Contributors</h4>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 text-sm font-medium text-gray-600">Rank</th>
                      <th className="text-left py-2 text-sm font-medium text-gray-600">Customer Name</th>
                      <th className="text-left py-2 text-sm font-medium text-gray-600">Annual Premium</th>
                      <th className="text-left py-2 text-sm font-medium text-gray-600">Segment</th>
                      <th className="text-left py-2 text-sm font-medium text-gray-600">Products</th>
                      <th className="text-left py-2 text-sm font-medium text-gray-600">Tenure</th>
                      <th className="text-left py-2 text-sm font-medium text-gray-600">Contribution</th>
                    </tr>
                  </thead>
                  <tbody>
                    {premiumData.topContributors.map((customer, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 text-sm font-medium text-gray-900">#{index + 1}</td>
                        <td className="py-3 text-sm text-gray-900">{customer.name}</td>
                        <td className="py-3 text-sm font-medium text-green-600">{getFormattedValue(customer.premium)}</td>
                        <td className="py-3 text-sm text-gray-600">{customer.segment}</td>
                        <td className="py-3 text-sm text-center">{customer.products}</td>
                        <td className="py-3 text-sm text-gray-600">{customer.tenure}</td>
                        <td className="py-3 text-sm font-medium text-blue-600">
                          {((customer.premium / premiumData.totalPremium) * 100).toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Executive Insights */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Strategic Insights & Recommendations</h4>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h5 className="font-medium text-blue-800">🎯 Concentration Risk</h5>
                  <ul className="text-sm space-y-1">
                    <li className="text-gray-600">• Top 20% customers: {premiumData.insights.paretoAnalysis.premiumContribution}% of premium</li>
                    <li className="text-gray-600">• High concentration risk at {premiumData.concentrationRisk}%</li>
                    <li className="text-gray-600">• Diversification strategy needed</li>
                    <li className="text-gray-600">• Monitor top 10 customer retention closely</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h5 className="font-medium text-green-800">💰 Growth Opportunities</h5>
                  <ul className="text-sm space-y-1">
                    <li className="text-gray-600">• Standard → Mid Value: ₹4.56Cr potential</li>
                    <li className="text-gray-600">• Basic → Standard: ₹2.75Cr potential</li>
                    <li className="text-gray-600">• Total upgrade opportunity: ₹7.31Cr</li>
                    <li className="text-gray-600">• Focus on customer value progression</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h5 className="font-medium text-purple-800">🔄 Action Plan</h5>
                  <ul className="text-sm space-y-1">
                    <li className="text-gray-600">• VIP treatment for High Value tier</li>
                    <li className="text-gray-600">• Upgrade campaigns for Mid Value</li>
                    <li className="text-gray-600">• Cross-sell to Standard customers</li>
                    <li className="text-gray-600">• Retention programs for all tiers</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Communication & Touchpoints':
        const commData = getCommunicationData();
        return (
          <div className="space-y-8">
            {/* Header Section */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Communication & Touchpoints Analysis</h3>
                <p className="text-sm text-gray-600 mt-1">Multi-channel communication effectiveness with customer journey touchpoint optimization</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">{commData.totalInteractions.toLocaleString()} Total Interactions</span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">{commData.customerSatisfaction}/5.0 Satisfaction</span>
                </div>
              </div>
            </div>

            {/* Channel Performance Summary */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              {commData.channelPerformance.map((channel, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: channel.color }} />
                    <span className="font-medium text-gray-900">{channel.channel}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="text-xl font-semibold text-gray-900">
                      {channel.interactions.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-600">{channel.percentage}% of interactions</div>
                    <div className="text-sm text-green-600 font-medium">
                      {channel.responseRate}% response
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-xs font-medium">{channel.satisfaction}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Main Analysis Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Channel Performance Comparison */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Channel Performance Comparison</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={commData.channelPerformance} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="channel" />
                    <YAxis />
                    <Tooltip 
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                              <p className="font-medium text-gray-900">{label}</p>
                              <p className="text-sm text-gray-600">Interactions: {data.interactions.toLocaleString()}</p>
                              <p className="text-sm text-gray-600">Response Rate: {data.responseRate}%</p>
                              <p className="text-sm text-gray-600">Satisfaction: {data.satisfaction}/5.0</p>
                              <p className="text-sm text-gray-600">Cost per interaction: ₹{data.cost}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="responseRate" fill={colors.primary} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Communication Frequency Analysis */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Communication Frequency vs Satisfaction</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={commData.frequencyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="frequency" />
                    <YAxis />
                    <Tooltip 
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                              <p className="font-medium text-gray-900">{label} Communication</p>
                              <p className="text-sm text-gray-600">Customers: {data.customers.toLocaleString()}</p>
                              <p className="text-sm text-gray-600">Premium: {getFormattedValue(data.premium)}</p>
                              <p className="text-sm text-gray-600">Satisfaction: {data.satisfaction}/5.0</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="satisfaction" 
                      stroke={colors.secondary} 
                      fill={colors.secondary}
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Customer Journey Touchpoints */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Customer Journey Touchpoint Analysis</h4>
              <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
                {commData.customerJourney.map((stage, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-blue-50 rounded-lg p-4 mb-3">
                      <div className="text-lg font-semibold text-blue-600">{stage.touchpoints}</div>
                      <div className="text-xs text-gray-600">touchpoints</div>
                    </div>
                    <div className="space-y-1">
                      <h5 className="font-medium text-gray-900">{stage.stage}</h5>
                      <div className="text-sm text-green-600 font-medium">{stage.conversion}% conversion</div>
                      <div className="text-xs text-gray-500">
                        {stage.channels.slice(0, 2).join(', ')}
                        {stage.channels.length > 2 && ` +${stage.channels.length - 2}`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Channel Effectiveness Matrix */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Channel Effectiveness Ranking</h4>
                <div className="space-y-4">
                  {commData.channelPerformance
                    .sort((a, b) => (b.responseRate * b.satisfaction) - (a.responseRate * a.satisfaction))
                    .map((channel, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{channel.channel}</div>
                          <div className="text-sm text-gray-600">
                            {channel.responseRate}% response • {channel.satisfaction}/5.0 satisfaction
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">₹{channel.cost}</div>
                        <div className="text-xs text-gray-600">per interaction</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Improvement Opportunities</h4>
                <div className="space-y-4">
                  {commData.insights.improvementAreas.map((area, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">{area.area}</span>
                        <Badge variant={area.priority === 'High' ? 'destructive' : area.priority === 'Medium' ? 'default' : 'secondary'}>
                          {area.priority}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-600">Current:</span>
                        <span className="font-medium">{area.currentScore}%</span>
                        <span className="text-gray-400">→</span>
                        <span className="text-gray-600">Target:</span>
                        <span className="font-medium text-green-600">{area.target}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-gradient-to-r from-blue-400 to-green-400" 
                          style={{ width: `${(area.currentScore / area.target) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Executive Summary */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Communication Strategy Recommendations</h4>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h5 className="font-medium text-purple-800">🎯 Channel Optimization</h5>
                  <ul className="text-sm space-y-1">
                    <li className="text-gray-600">• Phone: Highest satisfaction (4.6/5.0)</li>
                    <li className="text-gray-600">• WhatsApp: Best cost-efficiency ratio</li>
                    <li className="text-gray-600">• Email: Scale optimization needed</li>
                    <li className="text-gray-600">• SMS: Consider reducing or improving</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h5 className="font-medium text-blue-800">📈 Journey Enhancement</h5>
                  <ul className="text-sm space-y-1">
                    <li className="text-gray-600">• Onboarding: 22 touchpoints (optimize)</li>
                    <li className="text-gray-600">• Retention: Most critical stage (45 touchpoints)</li>
                    <li className="text-gray-600">• Advocacy: Underutilized (8 touchpoints)</li>
                    <li className="text-gray-600">• Cross-stage consistency needed</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h5 className="font-medium text-green-800">💡 Quick Wins</h5>
                  <ul className="text-sm space-y-1">
                    <li className="text-gray-600">• Integrate WhatsApp in all journey stages</li>
                    <li className="text-gray-600">• Reduce email response time by 50%</li>
                    <li className="text-gray-600">• Implement channel preference capture</li>
                    <li className="text-gray-600">• Create unified communication dashboard</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Cross-Sell / Upsell Potential':
        const crossSellData = getCrossSellData();
        return (
          <div className="space-y-8">
            {/* Header Section */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Cross-Sell / Upsell Potential Analysis</h3>
                <p className="text-sm text-gray-600 mt-1">Product penetration insights with revenue growth opportunities and targeted campaign strategies</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">{getFormattedValue(crossSellData.totalOpportunity)} Opportunity</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">{crossSellData.currentPenetration}% Avg Penetration</span>
                </div>
              </div>
            </div>

            {/* Summary Metrics Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-900">Revenue Opportunity</span>
                </div>
                <div className="text-2xl font-semibold text-green-600">{getFormattedValue(crossSellData.totalOpportunity)}</div>
                <div className="text-xs text-green-700 mt-1">Cross-sell potential</div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">Target Customers</span>
                </div>
                <div className="text-2xl font-semibold text-blue-600">{crossSellData.expectedConversions.toLocaleString()}</div>
                <div className="text-xs text-blue-700 mt-1">Expected conversions</div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <div className="flex items-center gap-2 mb-2">
                  <Growth className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-900">Revenue Uplift</span>
                </div>
                <div className="text-2xl font-semibold text-purple-600">{crossSellData.averageUplift}%</div>
                <div className="text-xs text-purple-700 mt-1">Per customer average</div>
              </div>

              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-amber-600" />
                  <span className="text-sm font-medium text-amber-900">Penetration Gap</span>
                </div>
                <div className="text-2xl font-semibold text-amber-600">{(crossSellData.targetPenetration - crossSellData.currentPenetration).toFixed(1)}%</div>
                <div className="text-xs text-amber-700 mt-1">To target {crossSellData.targetPenetration}%</div>
              </div>
            </div>

            {/* Main Analysis Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Product Penetration Analysis */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Product Penetration & Cross-Sell Potential</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={crossSellData.productPenetration} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="product" 
                      angle={-45}
                      textAnchor="end"
                      height={80}
                      fontSize={11}
                    />
                    <YAxis />
                    <Tooltip 
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
                              <p className="font-medium text-gray-900 mb-2">{label}</p>
                              <div className="space-y-1 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Current Customers:</span>
                                  <span className="font-medium">{data.currentCustomers.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Penetration:</span>
                                  <span className="font-medium">{data.penetration}%</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Cross-sell Potential:</span>
                                  <span className="font-medium text-green-600">{data.crossSellPotential.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Avg Value:</span>
                                  <span className="font-medium">{getFormattedValue(data.averageValue)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Priority:</span>
                                  <span className={`font-medium px-2 py-1 rounded-full text-xs ${
                                    data.priority === 'Very High' ? 'bg-red-100 text-red-700' :
                                    data.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                                    data.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-gray-100 text-gray-700'
                                  }`}>{data.priority}</span>
                                </div>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="penetration" fill={colors.primary} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Revenue Opportunity Matrix */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Revenue Opportunities by Priority</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <ScatterChart data={crossSellData.revenueMatrix} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      type="number" 
                      dataKey="expectedCustomers"
                      name="Expected Customers"
                      domain={[0, 'dataMax + 100']}
                    />
                    <YAxis 
                      type="number" 
                      dataKey="totalOpportunity"
                      name="Revenue Opportunity"
                      tickFormatter={(value) => getFormattedValue(value)}
                    />
                    <Tooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg min-w-64">
                              <p className="font-medium text-gray-900 mb-2">{data.opportunity}</p>
                              <div className="space-y-1 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Target Customers:</span>
                                  <span className="font-medium">{data.targetCustomers.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Conversion Rate:</span>
                                  <span className="font-medium">{data.conversionRate}%</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Expected Customers:</span>
                                  <span className="font-medium">{data.expectedCustomers}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Revenue Opportunity:</span>
                                  <span className="font-medium text-green-600">{getFormattedValue(data.totalOpportunity)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">ROI:</span>
                                  <span className="font-medium text-blue-600">{data.roi}%</span>
                                </div>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Scatter 
                      dataKey="totalOpportunity"
                      fill={colors.secondary}
                      name="Revenue Opportunity"
                    />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Customer Segment Opportunities */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Customer Segment Cross-Sell Opportunities</h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
                {crossSellData.customerSegments.map((segment, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: segment.color }} />
                      <h5 className="font-medium text-gray-900">{segment.segment}</h5>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Customers:</span>
                        <span className="font-medium">{segment.customers.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Current Spend:</span>
                        <span className="font-medium">{getFormattedValue(segment.currentSpend)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Potential Spend:</span>
                        <span className="font-medium text-green-600">{getFormattedValue(segment.potentialSpend)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Uplift Potential:</span>
                        <span className="font-medium text-blue-600">{segment.upliftPotential}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Success Probability:</span>
                        <span className="font-medium">{segment.probability}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Timeframe:</span>
                        <span className="font-medium text-purple-600">{segment.timeframe}</span>
                      </div>
                      <div className="pt-2 border-t border-gray-100">
                        <span className="text-gray-600 text-xs">Target Products:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {segment.products.map((product, pIndex) => (
                            <span key={pIndex} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                              {product}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Campaign Recommendations */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Recommended Cross-Sell Campaigns</h4>
              <div className="space-y-4">
                {crossSellData.campaigns.map((campaign, index) => (
                  <div key={index} className="p-4 border border-gray-100 rounded-lg bg-gray-50">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h5 className="font-medium text-gray-900">{campaign.name}</h5>
                        <p className="text-sm text-gray-600 mt-1">{campaign.target}</p>
                      </div>
                      <Badge variant={campaign.priority === 'Immediate' ? 'destructive' : campaign.priority === 'High' ? 'default' : 'secondary'}>
                        {campaign.priority}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Target Customers</span>
                        <div className="font-medium text-gray-900">{campaign.customers.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Investment</span>
                        <div className="font-medium text-red-600">{getFormattedValue(campaign.investment)}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Expected Return</span>
                        <div className="font-medium text-green-600">{getFormattedValue(campaign.expectedReturn)}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">ROI</span>
                        <div className="font-medium text-blue-600">
                          {((campaign.expectedReturn / campaign.investment - 1) * 100).toFixed(0)}%
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600">Duration</span>
                        <div className="font-medium text-purple-600">{campaign.duration}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Channels</span>
                        <div className="font-medium text-gray-900">
                          {campaign.channels.slice(0, 2).join(', ')}
                          {campaign.channels.length > 2 && ` +${campaign.channels.length - 2}`}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Executive Summary */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Cross-Sell Strategy Recommendations</h4>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h5 className="font-medium text-green-800">🎯 Immediate Opportunities</h5>
                  <ul className="text-sm space-y-1">
                    <li className="text-gray-600">• Property Insurance: ₹7.98Cr opportunity</li>
                    <li className="text-gray-600">• 320 high-value motor customers ready</li>
                    <li className="text-gray-600">• 15.2% expected conversion rate</li>
                    <li className="text-gray-600">• Focus on premium customer segment</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h5 className="font-medium text-blue-800">📈 Growth Levers</h5>
                  <ul className="text-sm space-y-1">
                    <li className="text-gray-600">• Health Insurance: 2,800 customer gap</li>
                    <li className="text-gray-600">• Life Insurance: 4,400 potential customers</li>
                    <li className="text-gray-600">• Travel Insurance: High-volume, low-value play</li>
                    <li className="text-gray-600">• Marine Insurance: Premium niche segment</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h5 className="font-medium text-purple-800">💡 Strategic Actions</h5>
                  <ul className="text-sm space-y-1">
                    <li className="text-gray-600">• Launch Premium Property Protection campaign</li>
                    <li className="text-gray-600">• Implement Health First digital initiative</li>
                    <li className="text-gray-600">• Target 75% product penetration by 2024</li>
                    <li className="text-gray-600">• Expected 67% average revenue uplift</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Number of Products Purchased':
        const simpleProductData = [
          { category: 'Single Product', customers: 4800, percentage: 60.0, avgPremium: 45000, color: colors.primary },
          { category: 'Two Products', customers: 2000, percentage: 25.0, avgPremium: 85000, color: colors.secondary },
          { category: 'Three Products', customers: 800, percentage: 10.0, avgPremium: 125000, color: colors.tertiary },
          { category: 'Four+ Products', customers: 400, percentage: 5.0, avgPremium: 185000, color: colors.quaternary }
        ];
        
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Number of Products per Customer</h3>
                <p className="text-sm text-gray-600 mt-1">Simple overview of product holdings by customer</p>
              </div>
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">Avg: 1.6 products</span>
              </div>
            </div>
            
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={simpleProductData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                          <p className="font-medium text-gray-900">{label}</p>
                          <p className="text-sm text-gray-600">Customers: {data.customers.toLocaleString()}</p>
                          <p className="text-sm text-gray-600">Percentage: {data.percentage}%</p>
                          <p className="text-sm text-gray-600">Avg Premium: {getFormattedValue(data.avgPremium)}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="customers" fill={colors.primary} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>

            <div className="grid grid-cols-4 gap-4 pt-4 border-t border-gray-200">
              {simpleProductData.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-lg font-semibold" style={{ color: item.color }}>
                    {item.customers.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-600">{item.category}</div>
                  <div className="text-xs text-gray-500">{item.percentage}%</div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Report Type Not Implemented</h3>
              <p className="text-gray-600">The report type "{selectedReportType}" is under development.</p>
              <p className="text-sm text-gray-500 mt-2">Please select "Duration of Relationship" or "Number of Products Purchased" for now.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full">
      {renderChart()}
    </div>
  );
}