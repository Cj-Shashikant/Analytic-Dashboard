import React, { useState, useMemo } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { Button } from './ui/button';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Progress } from './ui/progress';
import { Plus, Users, MapPin, User, Crown, Medal, Award, Trophy, X, ArrowLeft, ArrowUpDown } from 'lucide-react';
import { ReporteeInfoModal } from './ReporteeInfoModal';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  revenue: number;
  target: number;
  achieved: number;
  avatar?: string;
  reportees?: TeamMember[];
}

export function LeaderboardModal({ isOpen, onClose }: LeaderboardModalProps) {
  const [viewType, setViewType] = useState<'team' | 'region' | 'member'>('team');
  const [sortBy, setSortBy] = useState<'revenue' | 'target' | 'achieved'>('revenue');
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isReporteeModalOpen, setIsReporteeModalOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Professional, muted color palette
  const colors = {
    // Subtle backgrounds
    primaryBg: '#F8FAFC',
    secondaryBg: '#F1F5F9',
    accentBg: '#E2E8F0',
    
    // Muted text colors
    primaryText: '#334155',
    secondaryText: '#64748B',
    mutedText: '#94A3B8',
    
    // Subtle accents
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
    info: '#3B82F6',
    
    // Very subtle rank colors
    gold: '#FEF3C7',
    goldText: '#D97706',
    silver: '#F3F4F6',
    silverText: '#6B7280',
    bronze: '#FDF2F8',
    bronzeText: '#EC4899',
    
    // Muted chart colors
    chart1: '#E0E7FF',
    chart2: '#DBEAFE', 
    chart3: '#D1FAE5',
    chart4: '#FEF3C7',
    chart5: '#F3E8FF',
  };

  // Sample team data with comprehensive reportees for all teams
  // Updated to include one record with 150% achievement
  const teamData: TeamMember[] = [
    {
      id: '1',
      name: 'Neeta',
      role: 'Team Name',
      revenue: 240000, // 150% of 160000 target
      target: 160000,
      achieved: 150, // 150% achieved
      reportees: [
        { id: '1a', name: 'John Doe', role: 'Sales Executive', revenue: 75000, target: 50000, achieved: 150 },
        { id: '1b', name: 'Jane Smith', role: 'Account Manager', revenue: 82000, target: 60000, achieved: 137 },
        { id: '1c', name: 'Mike Johnson', role: 'Business Developer', revenue: 83000, target: 50000, achieved: 166 }
      ]
    },
    {
      id: '2',
      name: 'Soham',
      role: 'Design',
      revenue: 142000,
      target: 160000,
      achieved: 94,
      reportees: [
        { id: '2a', name: 'Sarah Wilson', role: 'UI Designer', revenue: 42000, target: 45000, achieved: 93 },
        { id: '2b', name: 'David Brown', role: 'UX Designer', revenue: 48000, target: 50000, achieved: 96 },
        { id: '2c', name: 'Lisa Davis', role: 'Design Lead', revenue: 52000, target: 65000, achieved: 80 }
      ]
    },
    {
      id: '3',
      name: 'Victoria',
      role: 'Team Name',
      revenue: 138000,
      target: 160000,
      achieved: 89,
      reportees: [
        { id: '3a', name: 'Robert Taylor', role: 'Senior Consultant', revenue: 52000, target: 55000, achieved: 95 },
        { id: '3b', name: 'Emily Wilson', role: 'Project Manager', revenue: 48000, target: 50000, achieved: 96 },
        { id: '3c', name: 'Chris Anderson', role: 'Analyst', revenue: 38000, target: 55000, achieved: 69 }
      ]
    },
    {
      id: '4',
      name: 'Soham',
      role: 'Team Name',
      revenue: 132000,
      target: 160000,
      achieved: 73,
      reportees: [
        { id: '4a', name: 'Amanda Garcia', role: 'Marketing Specialist', revenue: 44000, target: 50000, achieved: 88 },
        { id: '4b', name: 'Kevin Martinez', role: 'Sales Representative', revenue: 46000, target: 55000, achieved: 84 },
        { id: '4c', name: 'Nicole Rodriguez', role: 'Account Executive', revenue: 42000, target: 55000, achieved: 76 }
      ]
    },
    {
      id: '5',
      name: 'Cameron',
      role: 'Team Name',
      revenue: 125000,
      target: 160000,
      achieved: 69,
      reportees: [
        { id: '5a', name: 'Jordan Lee', role: 'Business Analyst', revenue: 45000, target: 55000, achieved: 82 },
        { id: '5b', name: 'Alex Thompson', role: 'Sales Manager', revenue: 47000, target: 55000, achieved: 85 },
        { id: '5c', name: 'Taylor White', role: 'Client Relations', revenue: 33000, target: 50000, achieved: 66 }
      ]
    },
    {
      id: '6',
      name: 'Arlene',
      role: 'Team Name',
      revenue: 118000,
      target: 160000,
      achieved: 58,
      reportees: [
        { id: '6a', name: 'Morgan Clark', role: 'Operations Manager', revenue: 44000, target: 55000, achieved: 80 },
        { id: '6b', name: 'Casey Miller', role: 'Technical Lead', revenue: 46000, target: 55000, achieved: 84 },
        { id: '6c', name: 'Riley Davis', role: 'Project Coordinator', revenue: 28000, target: 50000, achieved: 56 }
      ]
    },
    {
      id: '7',
      name: 'Ritesh S',
      role: 'Team Name',
      revenue: 98000,
      target: 160000,
      achieved: 42,
      reportees: [
        { id: '7a', name: 'Jamie Wilson', role: 'Research Analyst', revenue: 34000, target: 55000, achieved: 62 },
        { id: '7b', name: 'Drew Johnson', role: 'Content Specialist', revenue: 36000, target: 60000, achieved: 60 },
        { id: '7c', name: 'Avery Brown', role: 'Quality Assurance', revenue: 28000, target: 45000, achieved: 62 }
      ]
    }
  ];

  const regionData = [
    { id: 'mumbai', name: 'Mumbai Region', role: 'Western Zone', revenue: 850000, target: 900000, achieved: 94 },
    { id: 'delhi', name: 'Delhi Region', role: 'Northern Zone', revenue: 720000, target: 800000, achieved: 90 },
    { id: 'bangalore', name: 'Bangalore Region', role: 'Southern Zone', revenue: 680000, target: 750000, achieved: 91 },
    { id: 'chennai', name: 'Chennai Region', role: 'Southern Zone', revenue: 620000, target: 700000, achieved: 89 },
    { id: 'hyderabad', name: 'Hyderabad Region', role: 'Southern Zone', revenue: 580000, target: 650000, achieved: 89 }
  ];

  const getCurrentData = () => {
    switch (viewType) {
      case 'region':
        return regionData;
      case 'member':
        return teamData.flatMap(member => member.reportees || []);
      default:
        return teamData;
    }
  };

  // Memoized sorted data with animation support
  const sortedData = useMemo(() => {
    const data = getCurrentData();
    return data.sort((a, b) => {
      switch (sortBy) {
        case 'target':
          return b.target - a.target;
        case 'achieved':
          return b.achieved - a.achieved;
        default:
          return b.revenue - a.revenue;
      }
    });
  }, [viewType, sortBy]);

  // Handle sort change with animation
  const handleSortChange = (newSortBy: 'revenue' | 'target' | 'achieved') => {
    if (newSortBy === sortBy) return;
    
    setIsAnimating(true);
    setSortBy(newSortBy);
    
    // Reset animation state after animation completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  const getProgressColor = (achieved: number) => {
    if (achieved >= 150) return '#7C3AED'; // Purple for exceptional performance
    if (achieved >= 95) return colors.success;
    if (achieved >= 85) return colors.warning;
    if (achieved >= 70) return colors.info;
    return colors.danger;
  };

  const getAchievedColor = (achieved: number) => {
    if (achieved >= 150) return 'text-purple-600'; // Purple for exceptional performance
    if (achieved >= 95) return 'text-emerald-600';
    if (achieved >= 85) return 'text-amber-600';
    if (achieved >= 70) return 'text-blue-600';
    return 'text-red-500';
  };

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Crown className="w-4 h-4 text-amber-600" />;
      case 1:
        return <Medal className="w-4 h-4 text-gray-500" />;
      case 2:
        return <Award className="w-4 h-4 text-orange-500" />;
      default:
        return <span className="text-sm font-medium text-gray-500">#{index + 1}</span>;
    }
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 100000) {
      return `${(amount / 1000).toFixed(0)}K`;
    }
    return `${(amount / 1000).toFixed(0)}K`;
  };

  const handleReporteeClick = (member: TeamMember) => {
    setSelectedMember(member);
    setIsReporteeModalOpen(true);
  };

  // Function to get sort label for display
  const getSortLabel = () => {
    switch (sortBy) {
      case 'revenue':
        return 'Revenue (High to Low)';
      case 'target':
        return 'Target (High to Low)';
      case 'achieved':
        return 'Achievement % (High to Low)';
      default:
        return 'Revenue (High to Low)';
    }
  };

  return (
    <>
      {/* Drawer using Sheet component */}
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent 
          side="right" 
          className="w-[1000px] h-full max-w-none flex flex-col p-0 border-l border-gray-200"
        >
          {/* Header - Compact */}
          <SheetHeader className="p-6 pb-4 border-b border-gray-100 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-50 rounded-lg">
                  <Trophy className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <SheetTitle className="text-xl font-medium text-gray-800">Leader Board</SheetTitle>
                  <p className="text-sm text-gray-500 mt-1">Performance overview across teams and regions</p>
                </div>
              </div>
              
              {/* Header Actions */}
              <div className="flex items-center gap-3">
                {/* Back to Dashboard button */}
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Dashboard
                </Button>
              </div>
            </div>
          </SheetHeader>
          
          {/* Content */}
          <div className="flex-1 p-6 overflow-hidden">
            <div className="h-full flex flex-col space-y-5">
              {/* View Type Controls - Compact */}
              <div className="flex items-center justify-start flex-shrink-0">
                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewType === 'team' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewType('team')}
                    className={`flex items-center space-x-2 px-4 py-2 text-sm transition-all duration-200 ${
                      viewType === 'team' ? 'bg-gray-900 text-white' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>By Team</span>
                  </Button>
                  <Button
                    variant={viewType === 'region' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewType('region')}
                    className={`flex items-center space-x-2 px-4 py-2 text-sm transition-all duration-200 ${
                      viewType === 'region' ? 'bg-gray-900 text-white' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>By Region</span>
                  </Button>
                  <Button
                    variant={viewType === 'member' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewType('member')}
                    className={`flex items-center space-x-2 px-4 py-2 text-sm transition-all duration-200 ${
                      viewType === 'member' ? 'bg-gray-900 text-white' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>By Member</span>
                  </Button>
                </div>
              </div>

              {/* Top 3 Performers - Much More Compact */}
              {sortedData.length >= 3 && (
                <div className="bg-gray-50 rounded-lg p-5 flex-shrink-0">
                  <h3 className="text-lg font-medium text-gray-800 mb-4 text-center">🏆 Top 3 Performers</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {sortedData.slice(0, 3).map((member, index) => (
                      <div key={member.id} className="text-center">
                        <div className="relative mb-3 inline-block">
                          <Avatar className={`w-12 h-12 ${index === 0 ? 'ring-2 ring-amber-200' : index === 1 ? 'ring-2 ring-gray-200' : 'ring-2 ring-orange-200'}`}>
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback className={`${index === 0 ? 'bg-amber-100 text-amber-700' : index === 1 ? 'bg-gray-100 text-gray-700' : 'bg-orange-100 text-orange-700'} text-xs font-medium`}>
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="absolute -top-1 -right-1">
                            {getRankIcon(index)}
                          </div>
                        </div>
                        <h4 className="text-sm font-medium text-gray-900">{member.name}</h4>
                        <p className="text-xs text-gray-500 mb-2">{member.role}</p>
                        <div className="space-y-1">
                          <div className="text-sm font-medium text-gray-900">{formatCurrency(member.revenue)}</div>
                          <div className={`text-xs ${getAchievedColor(member.achieved)}`}>
                            {member.achieved}% achieved
                            {member.achieved >= 150 && (
                              <span className="ml-1 text-purple-600 font-semibold">🚀</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Complete Rankings with Sort Options - Right Aligned Sort Info */}
              <div className="flex-1 overflow-hidden flex flex-col">
                {/* Header Row with Sort Information on Right */}
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-medium text-gray-800">Complete Rankings</h3>
                  
                  {/* Applied Sort Information - Right Aligned with Animation */}
                  <div className={`flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-md transition-all duration-300 ${
                    isAnimating ? 'scale-105 bg-blue-100' : ''
                  }`}>
                    <ArrowUpDown className={`w-3.5 h-3.5 text-blue-600 transition-transform duration-300 ${
                      isAnimating ? 'rotate-180' : ''
                    }`} />
                    <span className="text-sm text-blue-800 font-medium">
                      Sorted by: {getSortLabel()}
                    </span>
                  </div>
                </div>

                {/* Table Header with Sort Options - Aligned with columns */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-t-lg border border-gray-200 flex-shrink-0">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="w-8"></div> {/* Rank column */}
                    <div className="w-10"></div> {/* Avatar column */}
                    <div className="flex-1">
                      <span className="text-sm font-medium text-gray-600">Name & Role</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    {/* Revenue Sort */}
                    <div className="text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSortChange('revenue')}
                        className={`px-2 py-1 text-xs transition-all duration-200 ${
                          sortBy === 'revenue' 
                            ? 'text-gray-900 font-medium bg-gray-200 scale-105' 
                            : 'text-gray-500 hover:bg-gray-100'
                        }`}
                      >
                        Revenue
                      </Button>
                    </div>

                    {/* Target Sort */}
                    <div className="text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSortChange('target')}
                        className={`px-2 py-1 text-xs transition-all duration-200 ${
                          sortBy === 'target' 
                            ? 'text-gray-900 font-medium bg-gray-200 scale-105' 
                            : 'text-gray-500 hover:bg-gray-100'
                        }`}
                      >
                        Target
                      </Button>
                    </div>

                    {/* Achieved Sort */}
                    <div className="text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSortChange('achieved')}
                        className={`px-2 py-1 text-xs transition-all duration-200 ${
                          sortBy === 'achieved' 
                            ? 'text-gray-900 font-medium bg-gray-200 scale-105' 
                            : 'text-gray-500 hover:bg-gray-100'
                        }`}
                      >
                        Achieved
                      </Button>
                    </div>

                    <div className="w-16 text-center">
                      <span className="text-xs text-gray-500">Progress</span>
                    </div>

                    {/* Plus button header space */}
                    {viewType === 'team' && <div className="w-8"></div>}
                  </div>
                </div>
                
                {/* Scrollable Rankings List with Animation */}
                <div className="flex-1 overflow-y-auto border-l border-r border-b border-gray-200 rounded-b-lg">
                  <div className="space-y-0">
                    {sortedData.map((member, index) => (
                      <div 
                        key={member.id} 
                        className={`flex items-center justify-between p-4 transition-all duration-300 hover:shadow-sm border-b border-gray-100 last:border-b-0 ${
                          index < 3 ? 'bg-gray-50' : 'bg-white hover:bg-gray-50'
                        } ${member.achieved >= 150 ? 'ring-2 ring-purple-200 bg-purple-50' : ''} ${
                          isAnimating ? 'transform translate-x-1 opacity-90' : 'transform translate-x-0 opacity-100'
                        }`}
                        style={{
                          transitionDelay: `${index * 20}ms`
                        }}
                      >
                        <div className="flex items-center space-x-4 flex-1">
                          <div className="flex items-center justify-center w-8">
                            {index < 3 ? getRankIcon(index) : (
                              <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                            )}
                          </div>
                          
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback className="bg-gray-100 text-gray-700 text-xs font-medium">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-medium text-gray-900">{member.name}</h4>
                              {member.achieved >= 150 && (
                                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium">
                                  Exceptional
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500">{member.role}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-6">
                          {/* Revenue */}
                          <div className="text-center">
                            <div className="text-sm font-medium text-gray-900">{formatCurrency(member.revenue)}</div>
                            <div className="text-xs text-gray-500">Revenue</div>
                          </div>

                          {/* Target */}
                          <div className="text-center">
                            <div className="text-sm font-medium text-gray-900">{formatCurrency(member.target)}</div>
                            <div className="text-xs text-gray-500">Target</div>
                          </div>

                          {/* Achieved */}
                          <div className="text-center">
                            <div className={`text-sm font-medium ${getAchievedColor(member.achieved)}`}>
                              {member.achieved}%
                              {member.achieved >= 150 && (
                                <span className="ml-1">🚀</span>
                              )}
                            </div>
                            <div className="text-xs text-gray-500">Achieved</div>
                          </div>

                          {/* Progress Bar */}
                          <div className="w-16">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="h-2 rounded-full transition-all duration-500"
                                style={{ 
                                  width: `${Math.min(member.achieved, 100)}%`,
                                  backgroundColor: getProgressColor(member.achieved)
                                }}
                              ></div>
                            </div>
                          </div>

                          {/* Plus Button */}
                          {viewType === 'team' && member.reportees && member.reportees.length > 0 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleReporteeClick(member)}
                              className="p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-all duration-200"
                              title={`View ${member.name}'s team members`}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          )}
                          {viewType === 'team' && (!member.reportees || member.reportees.length === 0) && (
                            <div className="w-8"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Reportee Info Modal */}
      <ReporteeInfoModal
        isOpen={isReporteeModalOpen}
        onClose={() => setIsReporteeModalOpen(false)}
        member={selectedMember}
      />
    </>
  );
}