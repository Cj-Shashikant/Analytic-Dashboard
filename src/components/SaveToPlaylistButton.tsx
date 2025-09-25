import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Save, Plus, List, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Playlist, PlaylistItem } from './PlaylistManager';

interface SaveToPlaylistButtonProps {
  currentFilters: {
    selectedEntity: string;
    selectedReportType: string;
    selectedBusinessType: string;
    selectedLocation: string;
    selectedDuration: string;
    valueUnit: string;
  };
  currentChartData?: any[];
  currentChartType?: 'revenue' | 'expenses';
  topExpenseCategories?: string;
}

export function SaveToPlaylistButton({
  currentFilters,
  currentChartData = [],
  currentChartType,
  topExpenseCategories
}: SaveToPlaylistButtonProps) {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [saveItemName, setSaveItemName] = useState('');
  const [saveItemNotes, setSaveItemNotes] = useState('');
  const [saveItemDuration, setSaveItemDuration] = useState(20);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string>('');
  
  // New playlist creation states
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [newPlaylistDescription, setNewPlaylistDescription] = useState('');
  const [activeTab, setActiveTab] = useState<'existing' | 'new'>('existing');

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
        setPlaylists(savedPlaylists);
      } catch (error) {
        console.error('Error loading playlists:', error);
      }
    }
  }, [isSaveModalOpen]); // Reload when modal opens

  // Create new playlist and save chart to it
  const handleCreatePlaylistAndSave = () => {
    if (!newPlaylistName.trim()) {
      toast.error('Please enter a playlist name');
      return;
    }

    if (!saveItemName.trim()) {
      toast.error('Please enter a name for this chart');
      return;
    }

    const newPlaylist: Playlist = {
      id: `playlist-${Date.now()}`,
      name: newPlaylistName.trim(),
      description: newPlaylistDescription.trim() || undefined,
      items: [],
      totalDuration: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const newItem: PlaylistItem = {
      id: `item-${Date.now()}`,
      name: saveItemName.trim(),
      reportType: currentFilters.selectedReportType,
      chartType: currentChartType,
      filters: currentFilters,
      duration: saveItemDuration,
      notes: saveItemNotes.trim() || undefined,
      createdAt: new Date()
    };

    // Add item to new playlist
    newPlaylist.items = [newItem];
    newPlaylist.totalDuration = saveItemDuration;

    const updatedPlaylists = [newPlaylist, ...playlists];
    setPlaylists(updatedPlaylists);
    
    // Save to localStorage
    localStorage.setItem('dashboardPlaylists', JSON.stringify(updatedPlaylists));

    // Reset form
    resetForm();
    setIsSaveModalOpen(false);

    toast.success(`New playlist "${newPlaylist.name}" created with chart "${newItem.name}"`);
  };

  // Save current chart to existing playlist
  const handleSaveToExistingPlaylist = () => {
    if (!saveItemName.trim()) {
      toast.error('Please enter a name for this chart');
      return;
    }

    if (!selectedPlaylistId) {
      toast.error('Please select a playlist');
      return;
    }

    const newItem: PlaylistItem = {
      id: `item-${Date.now()}`,
      name: saveItemName.trim(),
      reportType: currentFilters.selectedReportType,
      chartType: currentChartType,
      filters: currentFilters,
      duration: saveItemDuration,
      notes: saveItemNotes.trim() || undefined,
      createdAt: new Date()
    };

    // Update playlists
    const updatedPlaylists = playlists.map(playlist => 
      playlist.id === selectedPlaylistId 
        ? { 
            ...playlist, 
            items: [...playlist.items, newItem],
            totalDuration: playlist.totalDuration + saveItemDuration,
            updatedAt: new Date()
          }
        : playlist
    );

    setPlaylists(updatedPlaylists);
    
    // Save to localStorage
    localStorage.setItem('dashboardPlaylists', JSON.stringify(updatedPlaylists));

    // Reset form
    resetForm();
    setIsSaveModalOpen(false);

    const selectedPlaylist = playlists.find(p => p.id === selectedPlaylistId);
    toast.success(`Chart "${newItem.name}" saved to "${selectedPlaylist?.name}"`);
  };

  // Reset form function
  const resetForm = () => {
    setSaveItemName('');
    setSaveItemNotes('');
    setSaveItemDuration(20);
    setSelectedPlaylistId('');
    setNewPlaylistName('');
    setNewPlaylistDescription('');
  };

  // Initialize save form with current view
  const handleOpenSaveModal = () => {
    setSaveItemName(`${currentFilters.selectedReportType} - ${currentFilters.selectedEntity}`);
    setSaveItemNotes('');
    setSaveItemDuration(20);
    setSelectedPlaylistId(playlists.length > 0 ? playlists[0].id : '');
    setNewPlaylistName('');
    setNewPlaylistDescription('');
    // Set active tab based on whether playlists exist
    setActiveTab(playlists.length > 0 ? 'existing' : 'new');
    setIsSaveModalOpen(true);
  };

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="h-9 w-9 p-0 rounded-lg transition-all duration-200 hover:bg-green-50 text-green-600"
        onClick={handleOpenSaveModal}
        title="Save to Playlist"
      >
        <Save className="w-4 h-4" />
      </Button>

      {/* Save to Playlist Modal */}
      <Dialog open={isSaveModalOpen} onOpenChange={setIsSaveModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Save className="w-5 h-5 text-green-600" />
              Save Chart to Playlist
            </DialogTitle>
            <DialogDescription>
              Save the current chart configuration to an existing playlist or create a new one
            </DialogDescription>
          </DialogHeader>
          
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'existing' | 'new')} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="existing" className="flex items-center gap-2">
                <List className="w-4 h-4" />
                Existing Playlist
              </TabsTrigger>
              <TabsTrigger value="new" className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                New Playlist
              </TabsTrigger>
            </TabsList>

            {/* Common Chart Details */}
            <div className="space-y-4 mt-4">
              <div>
                <label className="text-sm font-medium text-gray-900 mb-2 block">
                  Chart Name
                </label>
                <Input
                  value={saveItemName}
                  onChange={(e) => setSaveItemName(e.target.value)}
                  placeholder="Enter chart name..."
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-900 mb-2 block">
                    Display Duration
                  </label>
                  <Select value={saveItemDuration.toString()} onValueChange={(value) => setSaveItemDuration(parseInt(value))}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10 seconds</SelectItem>
                      <SelectItem value="15">15 seconds</SelectItem>
                      <SelectItem value="20">20 seconds</SelectItem>
                      <SelectItem value="25">25 seconds</SelectItem>
                      <SelectItem value="30">30 seconds</SelectItem>
                      <SelectItem value="45">45 seconds</SelectItem>
                      <SelectItem value="60">1 minute</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-900 mb-2 block">
                    Notes (Optional)
                  </label>
                  <Input
                    value={saveItemNotes}
                    onChange={(e) => setSaveItemNotes(e.target.value)}
                    placeholder="Add notes..."
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            <TabsContent value="existing" className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Select Existing Playlist</CardTitle>
                  <CardDescription>Choose a playlist to add this chart to</CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <Select value={selectedPlaylistId} onValueChange={setSelectedPlaylistId}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose a playlist..." />
                      </SelectTrigger>
                      <SelectContent>
                        {playlists.map((playlist) => (
                          <SelectItem key={playlist.id} value={playlist.id}>
                            <div className="flex items-center justify-between w-full">
                              <span>{playlist.name}</span>
                              <span className="text-xs text-gray-500 ml-2">
                                ({playlist.items.length} items)
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {playlists.length === 0 && (
                      <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                        <p className="text-sm text-amber-700">
                          No playlists available. Create a new playlist using the tab above.
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="new" className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Create New Playlist</CardTitle>
                  <CardDescription>Create a new playlist and add this chart to it</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-900 mb-2 block">
                      Playlist Name
                    </label>
                    <Input
                      value={newPlaylistName}
                      onChange={(e) => setNewPlaylistName(e.target.value)}
                      placeholder="Enter playlist name..."
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-900 mb-2 block">
                      Description (Optional)
                    </label>
                    <Input
                      value={newPlaylistDescription}
                      onChange={(e) => setNewPlaylistDescription(e.target.value)}
                      placeholder="Enter description..."
                      className="w-full"
                    />
                  </div>

                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 text-green-700">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">Chart will be added to new playlist</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <div className="bg-gray-50 p-3 rounded-lg text-sm">
              <p className="font-medium text-gray-700 mb-2">Current Configuration:</p>
              <div className="space-y-1 text-gray-600">
                <div>• {currentFilters.selectedEntity}</div>
                <div>• {currentFilters.selectedReportType}</div>
                <div>• {currentFilters.selectedBusinessType} - {currentFilters.selectedLocation}</div>
                <div>• {currentFilters.selectedDuration}</div>
                {currentChartType && (
                  <div>• Chart Type: {currentChartType}</div>
                )}
              </div>
            </div>
          </Tabs>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSaveModalOpen(false)}>
              Cancel
            </Button>
            {activeTab === 'existing' ? (
              <Button 
                onClick={handleSaveToExistingPlaylist} 
                disabled={playlists.length === 0 || !selectedPlaylistId}
              >
                Save to Playlist
              </Button>
            ) : (
              <Button 
                onClick={handleCreatePlaylistAndSave}
                disabled={!newPlaylistName.trim()}
              >
                Create & Save
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}