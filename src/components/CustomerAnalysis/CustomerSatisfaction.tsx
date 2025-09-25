import React from 'react';
import { Badge } from '../ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Heart, 
  Target,
  Star
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
  CartesianGrid
} from 'recharts';

interface CustomerSatisfactionProps {
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

export function CustomerSatisfaction({ 
  valueUnit, 
  currentFilters,
  onPlayFullView
}: CustomerSatisfactionProps) {

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

  const getSatisfactionData = () => ({
    overallAvgRating: 4.2,
    npsScore: 42,
    promoters: 5200,
    passives: 1800,
    detractors: 1000,
    satisfactionTrend: '+8.5%',
    starRatings: [
      {
        stars: 5,
        satisfaction: 'Excellent',
        customers: 3200,
        percentage: 40.0,
        avgSpend: 125000,
        retentionRate: 96.5,
        color: colors.secondary,
        label: '5 Stars'
      },
      {
        stars: 4,
        satisfaction: 'Good',
        customers: 2000,
        percentage: 25.0,
        avgSpend: 95000,
        retentionRate: 88.2,
        color: colors.tertiary,
        label: '4 Stars'
      },
      {
        stars: 3,
        satisfaction: 'Average',
        customers: 1800,
        percentage: 22.5,
        avgSpend: 75000,
        retentionRate: 72.8,
        color: colors.primary,
        label: '3 Stars'
      },
      {
        stars: 2,
        satisfaction: 'Poor',
        customers: 600,
        percentage: 7.5,
        avgSpend: 55000,
        retentionRate: 45.3,
        color: colors.quaternary,
        label: '2 Stars'
      },
      {
        stars: 1,
        satisfaction: 'Very Poor',
        customers: 400,
        percentage: 5.0,
        avgSpend: 35000,
        retentionRate: 12.5,
        color: colors.quinternary,
        label: '1 Star'
      }
    ],
    insights: {
      topSatisfactionDrivers: [
        {
          factor: 'Claims Settlement Speed',
          impact: 92,
          customers: 7500
        },
        {
          factor: 'Customer Service Quality',
          impact: 85,
          customers: 6800
        },
        {
          factor: 'Policy Transparency',
          impact: 78,
          customers: 6200
        },
        {
          factor: 'Premium Competitiveness',
          impact: 72,
          customers: 5800
        },
        {
          factor: 'Digital Experience',
          impact: 65,
          customers: 5200
        }
      ],
      improvementAreas: [
        {
          area: 'Mobile App Experience',
          currentScore: 3.2,
          targetScore: 4.5,
          impact: 'High'
        },
        {
          area: 'Response Time',
          currentScore: 3.6,
          targetScore: 4.2,
          impact: 'Medium'
        },
        {
          area: 'Digital Onboarding',
          currentScore: 3.8,
          targetScore: 4.3,
          impact: 'Medium'
        },
        {
          area: 'Policy Documentation',
          currentScore: 4.0,
          targetScore: 4.4,
          impact: 'Low'
        }
      ]
    }
  });

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
}