import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Target,
  TrendingUp as Growth
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer, 
  Tooltip,
  ScatterChart,
  Scatter,
  Cell
} from 'recharts';

interface CrossSellUpsellProps {
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

export function CrossSellUpsell({ 
  valueUnit, 
  currentFilters,
  onPlayFullView
}: CrossSellUpsellProps) {

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
}