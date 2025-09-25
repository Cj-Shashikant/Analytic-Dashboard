import React from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { X } from 'lucide-react';

interface FilterBadgeProps {
  label: string;
  count?: number;
  onRemove?: () => void;
  variant?: 'default' | 'secondary' | 'outline';
}

export function FilterBadge({ 
  label, 
  count, 
  onRemove, 
  variant = 'secondary' 
}: FilterBadgeProps) {
  return (
    <Badge 
      variant={variant}
      className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200 transition-colors"
    >
      <span>
        {label}
        {count !== undefined && ` (${count})`}
      </span>
      {onRemove && (
        <Button
          variant="ghost"
          size="sm"
          className="h-3 w-3 p-0 hover:bg-blue-300 text-blue-600"
          onClick={onRemove}
        >
          <X className="w-2 h-2" />
        </Button>
      )}
    </Badge>
  );
}