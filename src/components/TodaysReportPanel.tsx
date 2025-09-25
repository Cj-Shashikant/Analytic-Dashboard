import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from './ui/sheet';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Calendar, TrendingUp, TrendingDown, Users, UserX, Target, Clock, X, Shield, FileText, DollarSign, AlertTriangle, CreditCard, Receipt, Hourglass, UserMinus } from 'lucide-react';

interface TodaysReportPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TodaysReportPanel({ isOpen, onClose }: TodaysReportPanelProps) {
  // Mild Professional Color Palette for Executive Reporting
  const professionalPalette = {
    // Core colors - Mild and professional
    primary: "#3B82F6",       // Softer blue (trust, stability)
    secondary: "#6B7280",     // Muted gray (balance)
    success: "#10B981",       // Softer emerald green (growth, success)
    warning: "#F59E0B",       // Softer amber (caution, attention)
    danger: "#EF4444",        // Softer red (urgent attention)
    info: "#06B6D4",         // Softer cyan blue (information)
    
    // Mild accent colors
    mutedGreen: "#22C55E",    // Softer green
    mutedBlue: "#3B82F6",     // Softer blue  
    mutedGray: "#9CA3AF",     // Lighter gray
    lightGray: "#F9FAFB",     // Very light neutral background
    darkGray: "#4B5563",      // Softer dark text
    
    // Mild supporting colors
    accent: "#8B5CF6",        // Softer purple
    teal: "#14B8A6",          // Softer teal
    orange: "#FB923C",        // Softer orange
    
    // Mild backgrounds
    cardBg: "#FFFFFF",        // Pure white cards
    panelBg: "#F9FAFB",       // Very light gray panel background
    
    // Soft borders & shadows
    borderLight: "#E5E7EB",   // Softer borders
    shadow: "0 1px 2px 0 rgb(0 0 0 / 0.05), 0 1px 1px -1px rgb(0 0 0 / 0.05)" // Very soft shadow
  };

  // Sample today's report data with merged business lost and leads lost
  const todaysStats = {
    newLeads: 47,
    businessWon: {
      count: 12,
      value: 385.6, // in Lakhs
      // Changed from insurance companies to client names
      clients: ['Mahindra Finance', 'Tech Mahindra Corp', 'Tata Motors Ltd']
    },
    businessLost: {
      // Merged business lost and leads lost
      businessCount: 8,
      businessValue: 142.3, // in Lakhs
      leadsCount: 15,
      leadsValue: 89.7, // in Lakhs
      totalCount: 23, // 8 + 15
      totalValue: 232.0, // 142.3 + 89.7
      // Changed from insurance companies to insurance broker names
      brokers: ['Prime Insurance Brokers', 'Elite Risk Advisors', 'Metro Insurance Solutions', 'Alpha Brokerage Services']
    },
    attendance: {
      present: 142,
      absent: 8,
      onLeave: 3,
      total: 153
    },
    claims: {
      newClaims: 18,
      pendingClaims: 45,
      settledClaims: 32,
      claimValue: 156.7, // in Lakhs
      avgSettlementTime: 12, // days
      aging: {
        days15: { count: 12, amount: 45.2 }, // > 15 days
        days30: { count: 8, amount: 32.8 },  // > 30 days
        days45: { count: 5, amount: 28.1 },  // > 45 days
        days60: { count: 3, amount: 18.9 }   // > 60 days
      }
    },
    finance: {
      pendingBrokerage: {
        amount: 67.8, // in Lakhs
        count: 28
      },
      pendingPolicies: 145,
      pendingRevenue: 78.9, // in Lakhs
      aging: {
        days15: { count: 23, amount: 35.4 }, // > 15 days with amounts
        days30: { count: 18, amount: 28.2 }, // > 30 days with amounts
        days45: { count: 12, amount: 19.7 }, // > 45 days with amounts
        days60: { count: 8, amount: 12.5 }   // > 60 days with amounts
      }
    }
  };

  const attendanceRate = ((todaysStats.attendance.present / todaysStats.attendance.total) * 100).toFixed(1);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:w-96 p-0 border-l" style={{ borderColor: professionalPalette.borderLight, backgroundColor: professionalPalette.panelBg }}>
        {/* Header */}
        <SheetHeader className="p-4 pb-3 border-b" style={{ borderColor: professionalPalette.borderLight, backgroundColor: professionalPalette.cardBg }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg" style={{ backgroundColor: `${professionalPalette.primary}15` }}>
                <Calendar className="w-5 h-5" style={{ color: professionalPalette.primary }} />
              </div>
              <div>
                <SheetTitle style={{ fontSize: '18px', fontWeight: '600', color: professionalPalette.darkGray }}>Today's Report</SheetTitle>
                <SheetDescription style={{ fontSize: '13px', color: professionalPalette.mutedGray, marginTop: '2px' }}>
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'short', 
                    day: 'numeric' 
                  })} • Daily Performance Overview
                </SheetDescription>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose} 
              className="rounded-full h-8 w-8 p-0 hover:bg-gray-100"
              style={{ color: professionalPalette.mutedGray }}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </SheetHeader>

        {/* Content */}
        <div className="p-4 space-y-4 overflow-y-auto h-full" style={{ backgroundColor: professionalPalette.panelBg }}>
          {/* Today's New Leads - Prominent */}
          <Card 
            className="p-4 border-0 rounded-lg" 
            style={{ 
              backgroundColor: professionalPalette.cardBg,
              boxShadow: professionalPalette.shadow,
              borderLeft: `4px solid ${professionalPalette.primary}`
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg" style={{ backgroundColor: `${professionalPalette.primary}15` }}>
                  <Target className="w-4 h-4" style={{ color: professionalPalette.primary }} />
                </div>
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: professionalPalette.darkGray }}>Today's New Leads</h3>
                  <p style={{ fontSize: '12px', color: professionalPalette.mutedGray, marginTop: '1px' }}>Fresh opportunities</p>
                </div>
              </div>
              <div className="text-right">
                <p style={{ fontSize: '24px', fontWeight: '600', color: professionalPalette.primary }}>
                  {todaysStats.newLeads}
                </p>
                <p style={{ fontSize: '11px', color: professionalPalette.mutedGray }}>leads</p>
              </div>
            </div>
          </Card>

          {/* Business Won */}
          <Card 
            className="p-4 border-0 rounded-lg" 
            style={{ 
              backgroundColor: professionalPalette.cardBg,
              boxShadow: professionalPalette.shadow,
              borderLeft: `4px solid ${professionalPalette.success}`
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" style={{ color: professionalPalette.success }} />
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: professionalPalette.success }}>Business Won</h3>
              </div>
              <Badge 
                className="text-xs border-0 rounded-md px-2 py-1" 
                style={{ 
                  backgroundColor: `${professionalPalette.success}15`, 
                  color: professionalPalette.success 
                }}
              >
                +{todaysStats.businessWon.count}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span style={{ fontSize: '12px', color: professionalPalette.mutedGray }}>Total Value</span>
                <span style={{ fontSize: '13px', fontWeight: '600', color: professionalPalette.darkGray }}>₹{todaysStats.businessWon.value} Lakhs</span>
              </div>
              <div className="flex justify-between items-center">
                <span style={{ fontSize: '12px', color: professionalPalette.mutedGray }}>Policies</span>
                <span style={{ fontSize: '13px', fontWeight: '600', color: professionalPalette.darkGray }}>{todaysStats.businessWon.count}</span>
              </div>
              <div className="pt-2 border-t" style={{ borderColor: professionalPalette.borderLight }}>
                <p style={{ fontSize: '11px', color: professionalPalette.mutedGray, marginBottom: '4px' }}>Key Wins:</p>
                <div className="flex flex-wrap gap-1">
                  {todaysStats.businessWon.clients.map((client, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="text-xs rounded-md px-2 py-0.5"
                      style={{ borderColor: professionalPalette.borderLight, color: professionalPalette.mutedGray }}
                    >
                      {client}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Merged Business Lost & Leads Lost */}
          <Card 
            className="p-4 border-0 rounded-lg" 
            style={{ 
              backgroundColor: professionalPalette.cardBg,
              boxShadow: professionalPalette.shadow,
              borderLeft: `4px solid ${professionalPalette.danger}`
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-4 h-4" style={{ color: professionalPalette.danger }} />
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: professionalPalette.danger }}>Business Lost & Leads Lost</h3>
              </div>
              <Badge 
                className="text-xs border-0 rounded-md px-2 py-1" 
                style={{ 
                  backgroundColor: `${professionalPalette.danger}15`, 
                  color: professionalPalette.danger 
                }}
              >
                -{todaysStats.businessLost.totalCount}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span style={{ fontSize: '12px', color: professionalPalette.mutedGray }}>Total Lost Value</span>
                <span style={{ fontSize: '13px', fontWeight: '600', color: professionalPalette.darkGray }}>₹{todaysStats.businessLost.totalValue} Lakhs</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex justify-between items-center">
                  <span style={{ fontSize: '11px', color: professionalPalette.mutedGray }}>Business Lost</span>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: professionalPalette.darkGray }}>{todaysStats.businessLost.businessCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span style={{ fontSize: '11px', color: professionalPalette.mutedGray }}>Leads Lost</span>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: professionalPalette.darkGray }}>{todaysStats.businessLost.leadsCount}</span>
                </div>
              </div>
              <div className="pt-2 border-t" style={{ borderColor: professionalPalette.borderLight }}>
                <p style={{ fontSize: '11px', color: professionalPalette.mutedGray, marginBottom: '4px' }}>Lost to:</p>
                <div className="flex flex-wrap gap-1">
                  {todaysStats.businessLost.brokers.map((broker, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="text-xs rounded-md px-2 py-0.5"
                      style={{ borderColor: professionalPalette.borderLight, color: professionalPalette.mutedGray }}
                    >
                      {broker}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Claims Section - Card Layout */}
          <Card 
            className="p-4 border-0 rounded-lg" 
            style={{ 
              backgroundColor: professionalPalette.cardBg,
              boxShadow: professionalPalette.shadow,
              borderLeft: `4px solid ${professionalPalette.accent}`
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" style={{ color: professionalPalette.accent }} />
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: professionalPalette.accent }}>Claims Section</h3>
              </div>
              <Badge 
                className="text-xs border-0 rounded-md px-2 py-1" 
                style={{ 
                  backgroundColor: `${professionalPalette.accent}15`, 
                  color: professionalPalette.accent 
                }}
              >
                {todaysStats.claims.newClaims} New
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center p-2 rounded-lg" style={{ backgroundColor: `${professionalPalette.info}10` }}>
                  <p style={{ fontSize: '14px', fontWeight: '600', color: professionalPalette.darkGray }}>{todaysStats.claims.pendingClaims}</p>
                  <p style={{ fontSize: '10px', color: professionalPalette.mutedGray }}>Pending</p>
                </div>
                <div className="text-center p-2 rounded-lg" style={{ backgroundColor: `${professionalPalette.success}10` }}>
                  <p style={{ fontSize: '14px', fontWeight: '600', color: professionalPalette.darkGray }}>{todaysStats.claims.settledClaims}</p>
                  <p style={{ fontSize: '10px', color: professionalPalette.mutedGray }}>Settled</p>
                </div>
                <div className="text-center p-2 rounded-lg" style={{ backgroundColor: `${professionalPalette.warning}10` }}>
                  <p style={{ fontSize: '14px', fontWeight: '600', color: professionalPalette.darkGray }}>{todaysStats.claims.avgSettlementTime}d</p>
                  <p style={{ fontSize: '10px', color: professionalPalette.mutedGray }}>Avg Time</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span style={{ fontSize: '12px', color: professionalPalette.mutedGray }}>Claim Value</span>
                <span style={{ fontSize: '13px', fontWeight: '600', color: professionalPalette.darkGray }}>₹{todaysStats.claims.claimValue} Lakhs</span>
              </div>
              <div className="pt-2 border-t" style={{ borderColor: professionalPalette.borderLight }}>
                <p style={{ fontSize: '11px', color: professionalPalette.mutedGray, marginBottom: '4px' }}>Claims Aging Analysis:</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex justify-between items-center">
                    <span style={{ fontSize: '11px', color: professionalPalette.mutedGray }}>{'> 15 days'}</span>
                    <span style={{ fontSize: '12px', fontWeight: '600', color: professionalPalette.warning }}>
                      {todaysStats.claims.aging.days15.count} (₹{todaysStats.claims.aging.days15.amount}L)
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span style={{ fontSize: '11px', color: professionalPalette.mutedGray }}>{'> 30 days'}</span>
                    <span style={{ fontSize: '12px', fontWeight: '600', color: professionalPalette.warning }}>
                      {todaysStats.claims.aging.days30.count} (₹{todaysStats.claims.aging.days30.amount}L)
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span style={{ fontSize: '11px', color: professionalPalette.mutedGray }}>{'> 45 days'}</span>
                    <span style={{ fontSize: '12px', fontWeight: '600', color: professionalPalette.danger }}>
                      {todaysStats.claims.aging.days45.count} (₹{todaysStats.claims.aging.days45.amount}L)
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span style={{ fontSize: '11px', color: professionalPalette.mutedGray }}>{'> 60 days'}</span>
                    <span style={{ fontSize: '12px', fontWeight: '600', color: professionalPalette.danger }}>
                      {todaysStats.claims.aging.days60.count} (₹{todaysStats.claims.aging.days60.amount}L)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Finance Section - Card Layout */}
          <Card 
            className="p-4 border-0 rounded-lg" 
            style={{ 
              backgroundColor: professionalPalette.cardBg,
              boxShadow: professionalPalette.shadow,
              borderLeft: `4px solid ${professionalPalette.orange}`
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" style={{ color: professionalPalette.orange }} />
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: professionalPalette.orange }}>Finance Section</h3>
              </div>
              <Badge 
                className="text-xs border-0 rounded-md px-2 py-1" 
                style={{ 
                  backgroundColor: `${professionalPalette.orange}15`, 
                  color: professionalPalette.orange 
                }}
              >
                {todaysStats.finance.pendingPolicies} Policies
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-center p-2 rounded-lg" style={{ backgroundColor: `${professionalPalette.warning}10` }}>
                  <p style={{ fontSize: '13px', fontWeight: '600', color: professionalPalette.darkGray }}>₹{todaysStats.finance.pendingBrokerage.amount}L</p>
                  <p style={{ fontSize: '10px', color: professionalPalette.mutedGray }}>Pending Brokerage</p>
                </div>
                <div className="text-center p-2 rounded-lg" style={{ backgroundColor: `${professionalPalette.info}10` }}>
                  <p style={{ fontSize: '13px', fontWeight: '600', color: professionalPalette.darkGray }}>₹{todaysStats.finance.pendingRevenue}L</p>
                  <p style={{ fontSize: '10px', color: professionalPalette.mutedGray }}>Pending Revenue</p>
                </div>
              </div>
              <div className="pt-2 border-t" style={{ borderColor: professionalPalette.borderLight }}>
                <p style={{ fontSize: '11px', color: professionalPalette.mutedGray, marginBottom: '4px' }}>Aging Analysis:</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex justify-between items-center">
                    <span style={{ fontSize: '11px', color: professionalPalette.mutedGray }}>{'> 15 days'}</span>
                    <span style={{ fontSize: '12px', fontWeight: '600', color: professionalPalette.warning }}>
                      {todaysStats.finance.aging.days15.count} (₹{todaysStats.finance.aging.days15.amount}L)
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span style={{ fontSize: '11px', color: professionalPalette.mutedGray }}>{'> 30 days'}</span>
                    <span style={{ fontSize: '12px', fontWeight: '600', color: professionalPalette.warning }}>
                      {todaysStats.finance.aging.days30.count} (₹{todaysStats.finance.aging.days30.amount}L)
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span style={{ fontSize: '11px', color: professionalPalette.mutedGray }}>{'> 45 days'}</span>
                    <span style={{ fontSize: '12px', fontWeight: '600', color: professionalPalette.danger }}>
                      {todaysStats.finance.aging.days45.count} (₹{todaysStats.finance.aging.days45.amount}L)
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span style={{ fontSize: '11px', color: professionalPalette.mutedGray }}>{'> 60 days'}</span>
                    <span style={{ fontSize: '12px', fontWeight: '600', color: professionalPalette.danger }}>
                      {todaysStats.finance.aging.days60.count} (₹{todaysStats.finance.aging.days60.amount}L)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Team Attendance - Card Layout */}
          <Card 
            className="p-4 border-0 rounded-lg" 
            style={{ 
              backgroundColor: professionalPalette.cardBg,
              boxShadow: professionalPalette.shadow,
              borderLeft: `4px solid ${professionalPalette.info}`
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" style={{ color: professionalPalette.info }} />
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: professionalPalette.info }}>Team Attendance</h3>
              </div>
              <Badge 
                className="text-xs border-0 rounded-md px-2 py-1" 
                style={{ 
                  backgroundColor: `${professionalPalette.info}15`, 
                  color: professionalPalette.info 
                }}
              >
                {attendanceRate}%
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center p-2 rounded-lg" style={{ backgroundColor: `${professionalPalette.success}10` }}>
                  <p style={{ fontSize: '16px', fontWeight: '600', color: professionalPalette.darkGray }}>{todaysStats.attendance.present}</p>
                  <p style={{ fontSize: '10px', color: professionalPalette.mutedGray }}>Present</p>
                </div>
                <div className="text-center p-2 rounded-lg" style={{ backgroundColor: `${professionalPalette.danger}10` }}>
                  <p style={{ fontSize: '16px', fontWeight: '600', color: professionalPalette.darkGray }}>{todaysStats.attendance.absent}</p>
                  <p style={{ fontSize: '10px', color: professionalPalette.mutedGray }}>Absent</p>
                </div>
                <div className="text-center p-2 rounded-lg" style={{ backgroundColor: `${professionalPalette.warning}10` }}>
                  <p style={{ fontSize: '16px', fontWeight: '600', color: professionalPalette.darkGray }}>{todaysStats.attendance.onLeave}</p>
                  <p style={{ fontSize: '10px', color: professionalPalette.mutedGray }}>On Leave</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span style={{ fontSize: '12px', color: professionalPalette.mutedGray }}>Total Team</span>
                <span style={{ fontSize: '13px', fontWeight: '600', color: professionalPalette.darkGray }}>{todaysStats.attendance.total} members</span>
              </div>
            </div>
          </Card>

          {/* Growth & Performance Section - REMOVED COMPLETELY */}
          
        </div>
      </SheetContent>
    </Sheet>
  );
}