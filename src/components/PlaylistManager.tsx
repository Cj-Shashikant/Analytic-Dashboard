import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { 
  PlayCircle, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  X, 
  BarChart3, 
  FileText, 
  Clock, 
  Users,
  Building2,
  MapPin,
  CalendarDays,
  DollarSign,
  List,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Crown,
  Target,
  TrendingUp,
  Shield,
  ChevronDown,
  ChevronUp,
  Edit,
  ArrowUp,
  ArrowDown,
  AlertTriangle
} from 'lucide-react';
import { toast } from 'sonner';

export interface PlaylistItem {
  id: string;
  name: string;
  reportType: string;
  chartType?: 'revenue' | 'expenses';
  filters: {
    selectedEntity: string;
    selectedReportType: string;
    selectedBusinessType: string;
    selectedLocation: string;
    selectedDuration: string;
    valueUnit: string;
  };
  duration?: number; // seconds to display
  notes?: string;
  createdAt: Date;
}

export interface Playlist {
  id: string;
  name: string;
  description?: string;
  items: PlaylistItem[];
  totalDuration: number;
  isDefault?: boolean;
  category?: 'executive' | 'operational' | 'financial' | 'strategic' | 'custom';
  icon?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface PlaylistManagerProps {
  currentFilters: {
    selectedEntity: string;
    selectedReportType: string;
    selectedBusinessType: string;
    selectedLocation: string;
    selectedDuration: string;
    valueUnit: string;
  };
  onPlayPlaylist: (playlist: Playlist) => void;
  onCreatePlaylistItem?: (item: PlaylistItem) => void;
  // Add current chart data for saving
  currentChartData?: any[];
  currentChartType?: 'revenue' | 'expenses';
  topExpenseCategories?: string;
}

export function PlaylistManager({ 
  currentFilters, 
  onPlayPlaylist,
  onCreatePlaylistItem,
  currentChartData = [],
  currentChartType,
  topExpenseCategories
}: PlaylistManagerProps) {
  // Default playlists - 4 executive-ready presentations
  const getDefaultPlaylists = (): Playlist[] => [
    {
      id: 'executive-overview',
      name: 'Executive Overview',
      description: 'Comprehensive C-suite presentation covering all key performance metrics',
      category: 'executive',
      icon: '👑',
      items: [
        {
          id: 'exec-revenue-metrics',
          name: 'Revenue Performance Overview',
          reportType: 'Revenue vs Expenses',
          chartType: 'revenue',
          filters: { ...currentFilters, selectedReportType: 'Revenue vs Expenses' },
          duration: 25,
          notes: 'Start with high-level revenue overview for executive context',
          createdAt: new Date()
        },
        {
          id: 'exec-expense-analysis',
          name: 'Cost Structure Analysis',
          reportType: 'Revenue vs Expenses',
          chartType: 'expenses',
          filters: { ...currentFilters, selectedReportType: 'Revenue vs Expenses' },
          duration: 20,
          notes: 'Key expense categories and cost optimization opportunities',
          createdAt: new Date()
        },
        {
          id: 'exec-products-performance',
          name: 'Product Line Performance',
          reportType: 'Revenue by Products',
          filters: { ...currentFilters, selectedReportType: 'Revenue by Products' },
          duration: 25,
          notes: 'Revenue contribution by product categories',
          createdAt: new Date()
        },
        {
          id: 'exec-partner-performance',
          name: 'Insurance Partner Analysis',
          reportType: 'Revenue by Insurers',
          filters: { ...currentFilters, selectedReportType: 'Revenue by Insurers' },
          duration: 20,
          notes: 'Strategic partnership performance evaluation',
          createdAt: new Date()
        },
        {
          id: 'exec-retention-insights',
          name: 'Client Retention Insights',
          reportType: 'Retention - By Insurer',
          filters: { ...currentFilters, selectedReportType: 'Retention - By Insurer' },
          duration: 15,
          notes: 'Customer retention and loyalty metrics',
          createdAt: new Date()
        }
      ],
      totalDuration: 105,
      isDefault: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'financial-deep-dive',
      name: 'Financial Deep Dive',
      description: 'Detailed financial analysis for CFO and finance team presentations',
      category: 'financial',
      icon: '💰',
      items: [
        {
          id: 'fin-revenue-breakdown',
          name: 'Revenue Business Model Analysis',
          reportType: 'Revenue vs Expenses',
          chartType: 'revenue',
          filters: { ...currentFilters, selectedReportType: 'Revenue vs Expenses' },
          duration: 30,
          notes: 'B2B/B2C/B2B2C revenue model deep dive',
          createdAt: new Date()
        },
        {
          id: 'fin-expense-categories',
          name: 'Expense Categories Breakdown',
          reportType: 'Revenue vs Expenses',
          chartType: 'expenses',
          filters: { ...currentFilters, selectedReportType: 'Revenue vs Expenses' },
          duration: 35,
          notes: 'Detailed cost center analysis and budget variance',
          createdAt: new Date()
        },
        {
          id: 'fin-product-profitability',
          name: 'Product Profitability Analysis',
          reportType: 'Revenue by Products',
          filters: { ...currentFilters, selectedReportType: 'Revenue by Products' },
          duration: 30,
          notes: 'Margin analysis by product category',
          createdAt: new Date()
        },
        {
          id: 'fin-vertical-performance',
          name: 'Business Vertical Performance',
          reportType: 'Revenue by Business Vertical',
          filters: { ...currentFilters, selectedReportType: 'Revenue by Business Vertical' },
          duration: 25,
          notes: 'Revenue contribution by business segments',
          createdAt: new Date()
        }
      ],
      totalDuration: 120,
      isDefault: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'strategic-review',
      name: 'Strategic Review',
      description: 'Strategic insights for business planning and growth initiatives',
      category: 'strategic',
      icon: '🎯',
      items: [
        {
          id: 'strat-market-position',
          name: 'Market Position Overview',
          reportType: 'Revenue by Insurers',
          filters: { ...currentFilters, selectedReportType: 'Revenue by Insurers' },
          duration: 25,
          notes: 'Competitive positioning and partner relationships',
          createdAt: new Date()
        },
        {
          id: 'strat-product-portfolio',
          name: 'Product Portfolio Strategy',
          reportType: 'Revenue by Products',
          filters: { ...currentFilters, selectedReportType: 'Revenue by Products' },
          duration: 30,
          notes: 'Product mix optimization and growth opportunities',
          createdAt: new Date()
        },
        {
          id: 'strat-policy-analysis',
          name: 'Policy Type Distribution',
          reportType: 'Revenue by Policy Type',
          filters: { ...currentFilters, selectedReportType: 'Revenue by Policy Type' },
          duration: 20,
          notes: 'Policy type trends and strategic focus areas',
          createdAt: new Date()
        },
        {
          id: 'strat-retention-strategy',
          name: 'Retention Strategy Review',
          reportType: 'Retention - By Insurer',
          filters: { ...currentFilters, selectedReportType: 'Retention - By Insurer' },
          duration: 25,
          notes: 'Client retention strategies and improvement initiatives',
          createdAt: new Date()
        },
        {
          id: 'strat-lob-performance',
          name: 'Line of Business Performance',
          reportType: 'Revenue by LOB',
          filters: { ...currentFilters, selectedReportType: 'Revenue by LOB' },
          duration: 20,
          notes: 'LOB performance analysis and strategic priorities',
          createdAt: new Date()
        }
      ],
      totalDuration: 120,
      isDefault: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'operational-dashboard',
      name: 'Operational Dashboard',
      description: 'Day-to-day operational metrics for department heads and managers',
      category: 'operational',
      icon: '⚙️',
      items: [
        {
          id: 'ops-current-performance',
          name: 'Current Period Performance',
          reportType: 'Revenue vs Expenses',
          chartType: 'revenue',
          filters: { ...currentFilters, selectedReportType: 'Revenue vs Expenses' },
          duration: 20,
          notes: 'Current period revenue performance vs targets',
          createdAt: new Date()
        },
        {
          id: 'ops-cost-monitoring',
          name: 'Cost Center Monitoring',
          reportType: 'Revenue vs Expenses',
          chartType: 'expenses',
          filters: { ...currentFilters, selectedReportType: 'Revenue vs Expenses' },
          duration: 25,
          notes: 'Real-time expense tracking and budget monitoring',
          createdAt: new Date()
        },
        {
          id: 'ops-product-trends',
          name: 'Product Performance Trends',
          reportType: 'Revenue by Products',
          filters: { ...currentFilters, selectedReportType: 'Revenue by Products' },
          duration: 20,
          notes: 'Weekly/monthly product performance trends',
          createdAt: new Date()
        },
        {
          id: 'ops-broker-performance',
          name: 'Broker Performance Metrics',
          reportType: 'Retention - Broker',
          filters: { ...currentFilters, selectedReportType: 'Retention - Broker' },
          duration: 20,
          notes: 'Individual broker performance and retention rates',
          createdAt: new Date()
        },
        {
          id: 'ops-partner-health',
          name: 'Partner Relationship Health',
          reportType: 'Retention - By Insurer',
          filters: { ...currentFilters, selectedReportType: 'Retention - By Insurer' },
          duration: 15,
          notes: 'Partner relationship strength and retention metrics',
          createdAt: new Date()
        }
      ],
      totalDuration: 100,
      isDefault: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  // State management
  const [playlists, setPlaylists] = useState<Playlist[]>(getDefaultPlaylists());
  const [expandedPlaylists, setExpandedPlaylists] = useState<Record<string, boolean>>({});

  // Edit duration states
  const [editingDuration, setEditingDuration] = useState<string | null>(null);
  const [editDurationValue, setEditDurationValue] = useState<number>(20);

  // Confirmation dialog states
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    type: 'playlist' | 'item';
    playlistId: string;
    itemId?: string;
    playlistName?: string;
    itemName?: string;
  } | null>(null);

  // Load playlists from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('dashboardPlaylists');
    if (saved) {
      try {
        const savedPlaylists = JSON.parse(saved).map((playlist: any) => ({
          ...playlist,
          createdAt: new Date(playlist.createdAt),
          updatedAt: new Date(playlist.updatedAt),
          items: playlist.items.map((item: any) => ({
            ...item,
            createdAt: new Date(item.createdAt)
          }))
        }));
        
        // Merge with default playlists, keeping saved versions if they exist
        const defaultPlaylists = getDefaultPlaylists();
        const mergedPlaylists = defaultPlaylists.map(defaultPlaylist => {
          const savedVersion = savedPlaylists.find((p: Playlist) => p.id === defaultPlaylist.id);
          return savedVersion || defaultPlaylist;
        });
        
        // Add any custom playlists
        const customPlaylists = savedPlaylists.filter((p: Playlist) => !p.isDefault);
        setPlaylists([...mergedPlaylists, ...customPlaylists]);
      } catch (error) {
        console.error('Error loading playlists:', error);
        setPlaylists(getDefaultPlaylists());
      }
    }
  }, []);

  // Save playlists to localStorage
  useEffect(() => {
    localStorage.setItem('dashboardPlaylists', JSON.stringify(playlists));
  }, [playlists]);

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Available report types for playlist creation
  const availableReports = [
    { value: 'Revenue vs Expenses', label: 'Revenue vs Expenses', chartTypes: ['revenue', 'expenses'] },
    { value: 'Revenue by Products', label: 'Revenue by Products' },
    { value: 'Revenue by Insurers', label: 'Revenue by Insurers' },
    { value: 'Revenue by Policy Type', label: 'Revenue by Policy Type' },
    { value: 'Revenue by Business Vertical', label: 'Revenue by Business Vertical' },
    { value: 'Revenue by LOB', label: 'Revenue by LOB' },
    { value: 'Retention Analysis', label: 'Retention Analysis' },
    { value: 'Retention - By Insurer', label: 'Retention - By Insurer' },
    { value: 'Retention - Broker', label: 'Retention - Broker' }
  ];

  // Toggle playlist expansion
  const togglePlaylistExpansion = (playlistId: string) => {
    setExpandedPlaylists(prev => ({
      ...prev,
      [playlistId]: !prev[playlistId]
    }));
  };

  // Delete playlist with confirmation
  const handleDeletePlaylist = (playlistId: string, playlistName: string) => {
    setDeleteConfirmation({
      type: 'playlist',
      playlistId,
      playlistName
    });
  };

  // Delete playlist item with confirmation
  const handleDeleteItem = (playlistId: string, itemId: string, itemName: string) => {
    setDeleteConfirmation({
      type: 'item',
      playlistId,
      itemId,
      itemName
    });
  };

  // Confirm deletion
  const confirmDelete = () => {
    if (!deleteConfirmation) return;

    if (deleteConfirmation.type === 'playlist') {
      setPlaylists(prev => prev.filter(p => p.id !== deleteConfirmation.playlistId));
      toast.success(`Playlist "${deleteConfirmation.playlistName}" deleted`);
    } else if (deleteConfirmation.type === 'item' && deleteConfirmation.itemId) {
      setPlaylists(prev => prev.map(playlist => 
        playlist.id === deleteConfirmation.playlistId 
          ? { 
              ...playlist, 
              items: playlist.items.filter(item => item.id !== deleteConfirmation.itemId),
              totalDuration: playlist.items
                .filter(item => item.id !== deleteConfirmation.itemId)
                .reduce((sum, item) => sum + (item.duration || 20), 0),
              updatedAt: new Date()
            }
          : playlist
      ));
      toast.success(`Chart "${deleteConfirmation.itemName}" removed from playlist`);
    }

    setDeleteConfirmation(null);
  };

  // Cancel deletion
  const cancelDelete = () => {
    setDeleteConfirmation(null);
  };

  // Move item up/down
  const moveItem = (playlistId: string, itemId: string, direction: 'up' | 'down') => {
    setPlaylists(prev => prev.map(playlist => {
      if (playlist.id !== playlistId) return playlist;

      const currentIndex = playlist.items.findIndex(item => item.id === itemId);
      if (currentIndex === -1) return playlist;

      const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
      if (newIndex < 0 || newIndex >= playlist.items.length) return playlist;

      const newItems = [...playlist.items];
      [newItems[currentIndex], newItems[newIndex]] = [newItems[newIndex], newItems[currentIndex]];

      return {
        ...playlist,
        items: newItems,
        updatedAt: new Date()
      };
    }));

    toast.success(`Chart moved ${direction}`);
  };

  // Edit duration handlers
  const handleStartEditDuration = (itemId: string, currentDuration: number) => {
    setEditingDuration(itemId);
    setEditDurationValue(currentDuration);
  };

  const handleSaveDuration = (playlistId: string, itemId: string) => {
    setPlaylists(prev => prev.map(playlist => 
      playlist.id === playlistId 
        ? { 
            ...playlist, 
            items: playlist.items.map(item => 
              item.id === itemId 
                ? { ...item, duration: editDurationValue }
                : item
            ),
            totalDuration: playlist.items
              .map(item => item.id === itemId ? editDurationValue : (item.duration || 20))
              .reduce((sum, duration) => sum + duration, 0),
            updatedAt: new Date()
          }
        : playlist
    ));
    setEditingDuration(null);
    toast.success('Duration updated');
  };

  const handleCancelEditDuration = () => {
    setEditingDuration(null);
    setEditDurationValue(20);
  };

  // Format duration
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Get icon for report type
  const getReportIcon = (reportType: string) => {
    if (reportType.includes('Revenue')) return BarChart3;
    if (reportType.includes('Retention')) return Users;
    return FileText;
  };

  // Get category icon
  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'executive': return Crown;
      case 'financial': return DollarSign;
      case 'strategic': return Target;
      case 'operational': return Users;
      default: return List;
    }
  };

  // Get category color
  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'executive': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'financial': return 'text-green-600 bg-green-50 border-green-200';
      case 'strategic': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'operational': return 'text-orange-600 bg-orange-50 border-orange-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <>
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-lg transition-all duration-200 hover:bg-purple-50 text-purple-600" title="Presentation Playlists">
            <List className="w-4 h-4" />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[500px] sm:w-[600px]">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <List className="w-5 h-5 text-purple-600" />
              Presentation Playlists
            </SheetTitle>
            <SheetDescription>
              Professional presentation playlists for executive meetings
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-4">
            {/* Playlists List */}
            <div className="space-y-4">
              {playlists.map((playlist) => {
                const CategoryIcon = getCategoryIcon(playlist.category);
                const isExpanded = expandedPlaylists[playlist.id];
                
                return (
                  <Card key={playlist.id} className={`p-4 border-l-4 ${getCategoryColor(playlist.category)}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <CategoryIcon className="w-4 h-4" />
                          <h3 className="font-semibold text-gray-900">{playlist.name}</h3>
                          {playlist.icon && (
                            <span className="text-lg">{playlist.icon}</span>
                          )}
                          {playlist.isDefault && (
                            <Badge variant="secondary" className="text-xs">Default</Badge>
                          )}
                        </div>
                        {playlist.description && (
                          <p className="text-sm text-gray-600 mb-2">{playlist.description}</p>
                        )}
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>{playlist.items.length} items</span>
                          <span>{formatDuration(playlist.totalDuration)}</span>
                          {playlist.category && (
                            <Badge variant="outline" className="text-xs capitalize">
                              {playlist.category}
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        {/* Delete Playlist Button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeletePlaylist(playlist.id, playlist.name)}
                          className="h-8 w-8 p-0 text-red-600 hover:bg-red-50"
                          title="Delete playlist"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        
                        {/* Accordion Control */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => togglePlaylistExpansion(playlist.id)}
                          className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-50"
                          title={isExpanded ? "Hide items" : "Show items"}
                        >
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </Button>
                        
                        {/* Play Button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onPlayPlaylist(playlist)}
                          className="h-8 w-8 p-0 text-green-600 hover:bg-green-50"
                          title="Play Playlist"
                        >
                          <Play className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Collapsible Playlist Items */}
                    {isExpanded && (
                      <div className="space-y-2 mt-4 border-t pt-3">
                        {playlist.items.map((item, index) => {
                          const IconComponent = getReportIcon(item.reportType);
                          const isEditingThisItem = editingDuration === item.id;
                          const canMoveUp = index > 0;
                          const canMoveDown = index < playlist.items.length - 1;
                          
                          return (
                            <div key={item.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                              <span className="text-xs text-gray-500 font-mono w-6">{index + 1}.</span>
                              <IconComponent className="w-4 h-4 text-gray-600" />
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium text-gray-900 truncate">
                                  {item.name}
                                </div>
                                <div className="text-xs text-gray-500 truncate">
                                  {item.reportType} • {item.filters.selectedEntity}
                                </div>
                              </div>
                              
                              {/* Duration Display/Edit */}
                              <div className="flex items-center gap-2">
                                {isEditingThisItem ? (
                                  <div className="flex items-center gap-1">
                                    <Input
                                      type="number"
                                      value={editDurationValue}
                                      onChange={(e) => setEditDurationValue(parseInt(e.target.value) || 20)}
                                      className="w-16 h-6 text-xs"
                                      min={5}
                                      max={300}
                                    />
                                    <span className="text-xs text-gray-500">s</span>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleSaveDuration(playlist.id, item.id)}
                                      className="h-6 w-6 p-0 text-green-600 hover:bg-green-50"
                                      title="Save duration"
                                    >
                                      <Save className="w-3 h-3" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={handleCancelEditDuration}
                                      className="h-6 w-6 p-0 text-gray-600 hover:bg-gray-50"
                                      title="Cancel edit"
                                    >
                                      <X className="w-3 h-3" />
                                    </Button>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-1">
                                    <span className="text-xs text-gray-500 min-w-[35px] text-center">
                                      {formatDuration(item.duration || 20)}
                                    </span>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleStartEditDuration(item.id, item.duration || 20)}
                                      className="h-6 w-6 p-0 text-blue-600 hover:bg-blue-50"
                                      title="Edit duration"
                                    >
                                      <Edit className="w-3 h-3" />
                                    </Button>
                                  </div>
                                )}
                                
                                {/* Move Up/Down Controls */}
                                <div className="flex flex-col gap-0">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => moveItem(playlist.id, item.id, 'up')}
                                    disabled={!canMoveUp}
                                    className="h-4 w-6 p-0 text-gray-600 hover:bg-gray-50 disabled:opacity-30"
                                    title="Move up"
                                  >
                                    <ArrowUp className="w-3 h-3" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => moveItem(playlist.id, item.id, 'down')}
                                    disabled={!canMoveDown}
                                    className="h-4 w-6 p-0 text-gray-600 hover:bg-gray-50 disabled:opacity-30"
                                    title="Move down"
                                  >
                                    <ArrowDown className="w-3 h-3" />
                                  </Button>
                                </div>
                                
                                {/* Delete Item Button */}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteItem(playlist.id, item.id, item.name)}
                                  className="h-6 w-6 p-0 text-red-600 hover:bg-red-50"
                                  title="Remove Item"
                                >
                                  <X className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmation !== null} onOpenChange={cancelDelete}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <DialogTitle className="text-lg font-semibold text-gray-900">
                  {deleteConfirmation?.type === 'playlist' ? 'Delete Playlist' : 'Remove Chart'}
                </DialogTitle>
                <DialogDescription className="text-sm text-gray-600 mt-1">
                  This action cannot be undone.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          
          <div className="py-4">
            {deleteConfirmation?.type === 'playlist' ? (
              <div className="space-y-3">
                <p className="text-sm text-gray-900">
                  Are you sure you want to delete the playlist <span className="font-semibold">"{deleteConfirmation.playlistName}"</span>?
                </p>
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-800">
                    <strong>Warning:</strong> This will permanently delete the entire playlist and all its charts. This action cannot be undone.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-gray-900">
                  Are you sure you want to remove <span className="font-semibold">"{deleteConfirmation?.itemName}"</span> from this playlist?
                </p>
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    This will remove the chart from the playlist but won't affect the original data.
                  </p>
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="flex gap-3">
            <Button variant="outline" onClick={cancelDelete}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              {deleteConfirmation?.type === 'playlist' ? 'Delete Playlist' : 'Remove Chart'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}