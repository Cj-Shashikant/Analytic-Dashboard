import React, { useState } from 'react';
import { Button } from './ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from './ui/dropdown-menu';
import { Download, FileText, Table, FileSpreadsheet, Loader2 } from 'lucide-react';

interface DownloadDataProps {
  data?: any[];
  filename?: string;
  reportType?: string;
  variant?: 'button' | 'floating';
  className?: string;
  onExport?: (format: 'csv' | 'excel' | 'pdf', data: any[]) => Promise<void>;
}

export function DownloadData({ 
  data = [], 
  filename = 'dashboard-data', 
  reportType = 'Dashboard Data',
  variant = 'button',
  className = '',
  onExport
}: DownloadDataProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [exportingFormat, setExportingFormat] = useState<string | null>(null);

  const professionalPalette = {
    primary: "#2563EB",
    secondary: "#475569",
    success: "#10B981",
    mutedGray: "#64748B",
    lightGray: "#F1F5F9",
    borderLight: "#E2E8F0",
    cardBg: "#FFFFFF",
  };

  // Convert data to CSV format
  const convertToCSV = (data: any[]): string => {
    if (!data || data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const csvHeaders = headers.join(',');
    
    const csvRows = data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Escape commas and quotes
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    );
    
    return [csvHeaders, ...csvRows].join('\n');
  };

  // Download file helper
  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Handle export
  const handleExport = async (format: 'csv' | 'excel' | 'pdf') => {
    setIsExporting(true);
    setExportingFormat(format);

    try {
      if (onExport) {
        await onExport(format, data);
      } else {
        // Default export behavior
        switch (format) {
          case 'csv':
            const csvContent = convertToCSV(data);
            downloadFile(csvContent, `${filename}.csv`, 'text/csv');
            break;
          case 'excel':
            // For Excel, we'll use CSV format as fallback
            const excelContent = convertToCSV(data);
            downloadFile(excelContent, `${filename}.xlsx`, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            break;
          case 'pdf':
            // PDF generation would require a library like jsPDF
            // For now, we'll show a placeholder
            console.log('PDF export would be implemented with jsPDF or similar library');
            break;
        }
      }
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
      setExportingFormat(null);
    }
  };

  const exportOptions = [
    {
      id: 'csv',
      label: 'CSV File',
      icon: FileText,
      description: 'Comma-separated values',
    },
    {
      id: 'excel',
      label: 'Excel File',
      icon: FileSpreadsheet,
      description: 'Microsoft Excel format',
    },
    {
      id: 'pdf',
      label: 'PDF Report',
      icon: Table,
      description: 'Formatted PDF document',
    },
  ];

  if (variant === 'floating') {
    return (
      <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="lg"
              className="rounded-full shadow-lg h-12 w-12 p-0"
              style={{
                backgroundColor: professionalPalette.primary,
                borderColor: professionalPalette.primary,
              }}
              disabled={isExporting}
            >
              {isExporting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Download className="w-5 h-5" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Export {reportType}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {exportOptions.map((option) => {
              const IconComponent = option.icon;
              const isCurrentlyExporting = exportingFormat === option.id;
              
              return (
                <DropdownMenuItem 
                  key={option.id}
                  onClick={() => handleExport(option.id as 'csv' | 'excel' | 'pdf')}
                  disabled={isExporting}
                  className="cursor-pointer"
                >
                  <div className="flex items-center gap-3 w-full">
                    {isCurrentlyExporting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <IconComponent className="w-4 h-4" />
                    )}
                    <div className="flex-1">
                      <div className="font-medium">{option.label}</div>
                      <div className="text-xs text-gray-500">{option.description}</div>
                    </div>
                  </div>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={`h-8 px-3 text-xs font-medium rounded-md ${className}`}
          style={{
            borderColor: professionalPalette.borderLight,
            color: professionalPalette.mutedGray,
          }}
          disabled={isExporting}
        >
          {isExporting ? (
            <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
          ) : (
            <Download className="w-3.5 h-3.5 mr-1.5" />
          )}
          Export Data
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Export Format</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {exportOptions.map((option) => {
          const IconComponent = option.icon;
          const isCurrentlyExporting = exportingFormat === option.id;
          
          return (
            <DropdownMenuItem 
              key={option.id}
              onClick={() => handleExport(option.id as 'csv' | 'excel' | 'pdf')}
              disabled={isExporting}
              className="cursor-pointer"
            >
              <div className="flex items-center gap-2 w-full">
                {isCurrentlyExporting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <IconComponent className="w-4 h-4" />
                )}
                <span>{option.label}</span>
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}