import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
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

interface DurationOfRelationshipProps {
  valueUnit: string;
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

export function DurationOfRelationship({ 
  valueUnit, 
  currentFilters,
  onPlayFullView
}: DurationOfRelationshipProps) {
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
}