import React from 'react';
import { Package } from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip
} from 'recharts';

interface NumberOfProductsProps {
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

export function NumberOfProducts({ 
  valueUnit, 
  currentFilters,
  onPlayFullView
}: NumberOfProductsProps) {

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
}