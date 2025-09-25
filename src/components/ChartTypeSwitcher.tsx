import React from 'react';
import { Button } from './ui/button';
import { 
  PieChart, 
  BarChart3, 
  LineChart, 
  Table, 
  TrendingUp 
} from 'lucide-react';

export type ChartType = 'donut' | 'bar' | 'stackedBar' | 'line' | 'table';

interface ChartTypeSwitcherProps {
  currentType: ChartType;
  onTypeChange: (type: ChartType) => void;
  className?: string;
}

export function ChartTypeSwitcher({ currentType, onTypeChange, className = '' }: ChartTypeSwitcherProps) {
  const professionalPalette = {
    primary: "#2563EB",
    secondary: "#475569",
    mutedGray: "#64748B",
    lightGray: "#F1F5F9",
    borderLight: "#E2E8F0",
  };

  const chartTypes = [
    {
      id: 'donut' as ChartType,
      label: 'Donut',
      icon: PieChart,
      tooltip: 'Donut Chart'
    },
    {
      id: 'bar' as ChartType,
      label: 'Bar',
      icon: BarChart3,
      tooltip: 'Bar Chart'
    },
    {
      id: 'stackedBar' as ChartType,
      label: 'Stacked',
      icon: TrendingUp,
      tooltip: 'Stacked Bar Chart'
    },
    {
      id: 'line' as ChartType,
      label: 'Line',
      icon: LineChart,
      tooltip: 'Line Chart'
    },
    {
      id: 'table' as ChartType,
      label: 'Table',
      icon: Table,
      tooltip: 'Table View'
    }
  ];

  return (
    <div className={`flex items-center gap-1 p-1 rounded-lg border ${className}`} 
         style={{ 
           backgroundColor: professionalPalette.lightGray,
           borderColor: professionalPalette.borderLight 
         }}>
      {chartTypes.map((type) => {
        const IconComponent = type.icon;
        const isActive = currentType === type.id;
        
        return (
          <Button
            key={type.id}
            variant="ghost"
            size="sm"
            onClick={() => onTypeChange(type.id)}
            className={`h-8 px-3 text-xs font-medium rounded-md transition-all duration-200 ${
              isActive ? 'shadow-sm' : 'hover:bg-white/50'
            }`}
            style={{
              backgroundColor: isActive ? professionalPalette.primary : 'transparent',
              color: isActive ? 'white' : professionalPalette.mutedGray,
            }}
            title={type.tooltip}
          >
            <IconComponent className="w-3.5 h-3.5 mr-1.5" />
            {type.label}
          </Button>
        );
      })}
    </div>
  );
}