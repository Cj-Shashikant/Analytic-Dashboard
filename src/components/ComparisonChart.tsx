import React, { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { TrendingUp, TrendingDown, BarChart3, X, ArrowRight, Percent } from 'lucide-react';
import { ThreeDotsMenu } from './ThreeDotsMenu';
import { ChartType } from './ChartTypeSwitcher';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from 'recharts';

interface ComparisonChartProps {
  isOpen: boolean;
  onClose: () => void;
  period1: string;
  period2: string;
  reportType: string;
  valueUnit: string;
  currentFilters: any;
  customDates?: {
    period1?: { start: Date; end: Date };
    period2?: { start: Date; end: Date };
  };
}

export function ComparisonChart({ 
  isOpen, 
  onClose, 
  period1, 
  period2, 
  reportType, 
  valueUnit,
  currentFilters,
  customDates 
}: ComparisonChartProps) {
  const [chartType, setChartType] = useState<ChartType>('donut');
  const [topFilter, setTopFilter] = useState<string>('Top 10');

  // Professional color palette
  const colors = {
    period1: '#3B82F6', // Blue
    period2: '#F59E0B', // Orange
    positive: '#10B981', // Green
    negative: '#EF4444', // Red
    neutral: '#6B7280'   // Gray
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

  const getDisplayPeriod = (period: string, customDate?: { start: Date; end: Date } | null) => {
    if (period === 'Custom Period' && customDate) {
      const start = customDate.start.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      });
      const end = customDate.end.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric' 
      });
      return `${start} - ${end}`;
    }
    return period;
  };

  // Mock data generation based on periods and report type
  const generateComparisonData = () => {
    // Base data for different report types
    const baseData = {
      'Revenue by Products': [
        { name: 'Health Insurance', period1Value: 85200000, period2Value: 76800000 },
        { name: 'Motor Insurance', period1Value: 60600000, period2Value: 58200000 },
        { name: 'Life Insurance', period1Value: 52900000, period2Value: 49100000 },
        { name: 'Property Insurance', period1Value: 43000000, period2Value: 41200000 },
        { name: 'Travel Insurance', period1Value: 30200000, period2Value: 28800000 },
        { name: 'Commercial Insurance', color: '#06B6D4' },
        { name: 'Marine Insurance', color: '#84CC16' },
        { name: 'Fire Insurance', color: '#EC4899' },
        { name: 'Cyber Insurance', color: '#14B8A6' },
        { name: 'Liability Insurance', color: '#F97316' }
      ],
      'Revenue by Insurers': [
        { name: 'ICICI Lombard General Insurance', period1Value: 68800000, period2Value: 64200000 },
        { name: 'HDFC ERGO General Insurance', period1Value: 58400000, period2Value: 55600000 },
        { name: 'Bajaj Allianz General Insurance', period1Value: 47000000, period2Value: 44800000 },
        { name: 'Tata AIG General Insurance', period1Value: 33300000, period2Value: 31900000 },
        { name: 'Reliance General Insurance', period1Value: 23700000, period2Value: 22100000 },
      ],
      'Revenue vs Expenses': [
        { name: 'B2B (Business to Business)', period1Value: 125100000, period2Value: 118200000 },
        { name: 'B2C (Business to Consumer)', period1Value: 85000000, period2Value: 79800000 },
        { name: 'B2B2C (Business to Business to Consumer)', period1Value: 30000000, period2Value: 28500000 },
      ]
    };

    const data = baseData[reportType as keyof typeof baseData] || baseData['Revenue by Products'];
    
    // Add calculated fields
    return data.map((item, index) => ({
      ...item,
      id: `item-${index}`,
      color: item.color || colors.period1,
      period1Value: item.period1Value || 0,
      period2Value: item.period2Value || 0,
      change: item.period1Value && item.period2Value ? 
        ((item.period1Value - item.period2Value) / item.period2Value) * 100 : 0,
      changeDirection: item.period1Value > item.period2Value ? 'up' : 'down'
    }));
  };

  const comparisonData = generateComparisonData();
  const totalPeriod1 = comparisonData.reduce((sum, item) => sum + item.period1Value, 0);
  const totalPeriod2 = comparisonData.reduce((sum, item) => sum + item.period2Value, 0);
  const totalChange = ((totalPeriod1 - totalPeriod2) / totalPeriod2) * 100;

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-medium text-gray-900">{data.name}</p>
          <div className="space-y-1 mt-2">
            <p className="text-sm text-blue-600">
              {getDisplayPeriod(period1, customDates?.period1)}: {getFormattedValue(data.period1Value)}
            </p>
            <p className="text-sm text-orange-600">
              {getDisplayPeriod(period2, customDates?.period2)}: {getFormattedValue(data.period2Value)}
            </p>
            <p className={`text-sm font-medium ${data.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              Change: {data.change >= 0 ? '+' : ''}{data.change.toFixed(1)}%
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  // Render comparison donut charts
  const renderComparisonDonuts = () => (
    <div className="grid grid-cols-2 gap-8">
      {/* Period 1 Chart */}
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900">
            {getDisplayPeriod(period1, customDates?.period1)}
          </h3>
          <div className="text-3xl font-bold text-blue-600 mt-2">
            {getFormattedValue(totalPeriod1)}
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={comparisonData.map(item => ({ ...item, value: item.period1Value, fill: colors.period1 }))}
                cx="50%"
                cy="50%"
                outerRadius={120}
                innerRadius={70}
                paddingAngle={2}
                dataKey="value"
                cornerRadius={6}
              >
                {comparisonData.map((entry, index) => (
                  <Cell key={`period1-cell-${index}`} fill={colors.period1} />
                ))}
              </Pie>
              <Tooltip content={CustomTooltip} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Period 2 Chart */}
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900">
            {getDisplayPeriod(period2, customDates?.period2)}
          </h3>
          <div className="text-3xl font-bold text-orange-600 mt-2">
            {getFormattedValue(totalPeriod2)}
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={comparisonData.map(item => ({ ...item, value: item.period2Value, fill: colors.period2 }))}
                cx="50%"
                cy="50%"
                outerRadius={120}
                innerRadius={70}
                paddingAngle={2}
                dataKey="value"
                cornerRadius={6}
              >
                {comparisonData.map((entry, index) => (
                  <Cell key={`period2-cell-${index}`} fill={colors.period2} />
                ))}
              </Pie>
              <Tooltip content={CustomTooltip} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  // Render side-by-side bar chart
  const renderComparisonBars = () => {
    const chartData = comparisonData.map(item => ({
      name: item.name.length > 20 ? item.name.substring(0, 20) + '...' : item.name,
      fullName: item.name,
      period1: item.period1Value,
      period2: item.period2Value,
      change: item.change
    }));

    return (
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              fontSize={12}
              angle={-45}
              textAnchor="end"
              height={100}
              interval={0}
            />
            <YAxis fontSize={12} />
            <Tooltip content={CustomTooltip} />
            <Bar dataKey="period1" fill={colors.period1} name={getDisplayPeriod(period1, customDates?.period1)} radius={[3, 3, 0, 0]} />
            <Bar dataKey="period2" fill={colors.period2} name={getDisplayPeriod(period2, customDates?.period2)} radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      {/* Fixed dimensions: 1440px x 1024px */}
      <div 
        className="bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden"
        style={{
          width: '1440px',
          height: '1024px',
          maxWidth: '95vw',
          maxHeight: '95vh'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-8 pb-6 border-b bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <BarChart3 className="w-7 h-7 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Duration Comparison</h2>
              <p className="text-base text-gray-600 mt-1">
                {reportType} • {currentFilters.selectedEntity} • {currentFilters.selectedLocation}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Select value={topFilter} onValueChange={setTopFilter}>
              <SelectTrigger className="w-32 h-10 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Top 5">Top 5</SelectItem>
                <SelectItem value="Top 10">Top 10</SelectItem>
                <SelectItem value="All">All</SelectItem>
              </SelectContent>
            </Select>
            
            <ThreeDotsMenu 
              currentChartType={chartType}
              onChartTypeChange={setChartType}
              onDownload={(format) => console.log(`Downloading comparison in ${format}`)}
            />
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              className="h-10 w-10 p-0 rounded-lg hover:bg-white"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-8 space-y-8">
            {/* Summary Cards */}
            <div className="grid grid-cols-3 gap-6">
              <Card className="p-6 border-l-4 border-l-blue-500 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-base text-gray-600 mb-2">{getDisplayPeriod(period1, customDates?.period1)}</p>
                    <p className="text-3xl font-bold text-blue-600">{getFormattedValue(totalPeriod1)}</p>
                  </div>
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                </div>
              </Card>
              
              <Card className="p-6 border-l-4 border-l-orange-500 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-base text-gray-600 mb-2">{getDisplayPeriod(period2, customDates?.period2)}</p>
                    <p className="text-3xl font-bold text-orange-600">{getFormattedValue(totalPeriod2)}</p>
                  </div>
                  <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                </div>
              </Card>
              
              <Card className={`p-6 border-l-4 shadow-lg ${totalChange >= 0 ? 'border-l-green-500' : 'border-l-red-500'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-base text-gray-600 mb-2">Change</p>
                    <div className="flex items-center gap-2">
                      <p className={`text-3xl font-bold ${totalChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {totalChange >= 0 ? '+' : ''}{totalChange.toFixed(1)}%
                      </p>
                      {totalChange >= 0 ? 
                        <TrendingUp className="w-6 h-6 text-green-600" /> : 
                        <TrendingDown className="w-6 h-6 text-red-600" />
                      }
                    </div>
                  </div>
                  <Percent className={`w-7 h-7 ${totalChange >= 0 ? 'text-green-500' : 'text-red-500'}`} />
                </div>
              </Card>
            </div>

            {/* Charts */}
            <Card className="p-8 shadow-lg">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">Comparative Analysis</h3>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                      <span className="text-base text-gray-600">{getDisplayPeriod(period1, customDates?.period1)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                      <span className="text-base text-gray-600">{getDisplayPeriod(period2, customDates?.period2)}</span>
                    </div>
                  </div>
                </div>
                
                {chartType === 'donut' ? renderComparisonDonuts() : renderComparisonBars()}
              </div>
            </Card>

            {/* Detailed Breakdown */}
            <Card className="p-8 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Detailed Breakdown</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left p-4 text-base font-semibold text-gray-900">Category</th>
                      <th className="text-right p-4 text-base font-semibold text-gray-900">
                        {getDisplayPeriod(period1, customDates?.period1)}
                      </th>
                      <th className="text-right p-4 text-base font-semibold text-gray-900">
                        {getDisplayPeriod(period2, customDates?.period2)}
                      </th>
                      <th className="text-right p-4 text-base font-semibold text-gray-900">Change</th>
                      <th className="text-center p-4 text-base font-semibold text-gray-900">Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((item, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                            <span className="font-medium text-gray-900 text-base">{item.name}</span>
                          </div>
                        </td>
                        <td className="text-right p-4 font-medium text-gray-900 text-base">
                          {getFormattedValue(item.period1Value)}
                        </td>
                        <td className="text-right p-4 font-medium text-gray-900 text-base">
                          {getFormattedValue(item.period2Value)}
                        </td>
                        <td className={`text-right p-4 font-medium text-base ${item.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {item.change >= 0 ? '+' : ''}{item.change.toFixed(1)}%
                        </td>
                        <td className="text-center p-4">
                          {item.change >= 0 ? 
                            <TrendingUp className="w-5 h-5 text-green-600 mx-auto" /> : 
                            <TrendingDown className="w-5 h-5 text-red-600 mx-auto" />
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}