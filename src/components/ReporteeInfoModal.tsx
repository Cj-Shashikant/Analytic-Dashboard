import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Progress } from './ui/progress';
import { Users, Target, TrendingUp, DollarSign } from 'lucide-react';

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

interface ReporteeInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: TeamMember | null;
}

export function ReporteeInfoModal({ isOpen, onClose, member }: ReporteeInfoModalProps) {
  if (!member) return null;

  const reportees = member.reportees || [];
  
  const formatCurrency = (amount: number) => {
    return `₹${(amount / 1000).toFixed(0)}K`;
  };

  const getProgressColor = (achieved: number) => {
    if (achieved >= 95) return 'bg-green-500';
    if (achieved >= 85) return 'bg-yellow-500';
    if (achieved >= 70) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getAchievedColor = (achieved: number) => {
    if (achieved >= 95) return 'text-green-600';
    if (achieved >= 85) return 'text-yellow-600';
    if (achieved >= 70) return 'text-orange-600';
    return 'text-red-600';
  };

  // Calculate team totals
  const teamTotals = reportees.reduce(
    (acc, reportee) => ({
      revenue: acc.revenue + reportee.revenue,
      target: acc.target + reportee.target,
      achieved: acc.achieved + reportee.achieved
    }),
    { revenue: 0, target: 0, achieved: 0 }
  );

  const avgAchieved = reportees.length > 0 ? Math.round(teamTotals.achieved / reportees.length) : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium text-gray-800">
            Team Information - {member.name}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            View detailed performance metrics and team member information for {member.name}'s team
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Team Leader Info */}
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback className="bg-blue-600 text-white font-medium text-lg">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                <p className="text-gray-600">{member.role} - Team Leader</p>
                <div className="flex items-center space-x-6 mt-2">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium">{formatCurrency(member.revenue)} Revenue</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium">{formatCurrency(member.target)} Target</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-orange-600" />
                    <span className={`text-sm font-medium ${getAchievedColor(member.achieved)}`}>
                      {member.achieved}% Achieved
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Team Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <Users className="w-6 h-6 text-gray-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{reportees.length}</div>
              <div className="text-sm text-gray-600">Team Members</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <DollarSign className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{formatCurrency(teamTotals.revenue)}</div>
              <div className="text-sm text-gray-600">Total Revenue</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <Target className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{formatCurrency(teamTotals.target)}</div>
              <div className="text-sm text-gray-600">Total Target</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 text-center">
              <TrendingUp className="w-6 h-6 text-orange-600 mx-auto mb-2" />
              <div className={`text-2xl font-bold ${getAchievedColor(avgAchieved)}`}>{avgAchieved}%</div>
              <div className="text-sm text-gray-600">Avg Achievement</div>
            </div>
          </div>

          {/* Team Members List */}
          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-4">Team Members</h4>
            <div className="max-h-60 overflow-y-auto space-y-3">
              {reportees.map((reportee, index) => (
                <div key={reportee.id} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={reportee.avatar} alt={reportee.name} />
                      <AvatarFallback className="bg-gray-600 text-white text-sm">
                        {reportee.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h5 className="font-medium text-gray-900">{reportee.name}</h5>
                      <p className="text-sm text-gray-500">{reportee.role}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    {/* Revenue */}
                    <div className="text-center">
                      <div className="font-semibold text-gray-900">{formatCurrency(reportee.revenue)}</div>
                      <div className="text-xs text-gray-500">Revenue</div>
                    </div>

                    {/* Target */}
                    <div className="text-center">
                      <div className="font-semibold text-gray-900">{formatCurrency(reportee.target)}</div>
                      <div className="text-xs text-gray-500">Target</div>
                    </div>

                    {/* Achieved */}
                    <div className="text-center">
                      <div className={`font-semibold ${getAchievedColor(reportee.achieved)}`}>
                        {reportee.achieved}%
                      </div>
                      <div className="text-xs text-gray-500">Achieved</div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-16">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getProgressColor(reportee.achieved)}`}
                          style={{ width: `${Math.min(reportee.achieved, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {reportees.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No team members assigned</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}