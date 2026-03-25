'use client';

import { Bell, ChevronRight, AlertTriangle, Phone, Zap, Shield, Navigation } from 'lucide-react';
import { SafetyEvent } from '@/lib/mockData';

const eventIcons: Record<string, React.ElementType> = {
  distraction: AlertTriangle,
  fatigue: Zap,
  phone_use: Phone,
  seatbelt: Shield,
  speeding: Navigation,
};

const confidenceColor = (score: number) => {
  if (score < 60) return 'text-amber-400 bg-amber-500/15 border-amber-500/30';
  if (score <= 75) return 'text-orange-400 bg-orange-500/15 border-orange-500/30';
  return 'text-red-400 bg-red-500/15 border-red-500/30';
};

const statusBadge = (status: SafetyEvent['disputeStatus']) => {
  switch (status) {
    case 'pending':
      return <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30">Dispute Pending</span>;
    case 'approved':
      return <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/15 text-green-400 border border-green-500/30">Approved</span>;
    case 'rejected':
      return <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/15 text-red-400 border border-red-500/30">Rejected</span>;
    default:
      return null;
  }
};

const formatTime = (ts: string) => {
  const d = new Date(ts);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) +
    ' · ' +
    d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
};

interface Props {
  events: SafetyEvent[];
  onSelectEvent: (event: SafetyEvent) => void;
  driverFilter?: string;
}

export default function SafetyEventList({ events, onSelectEvent, driverFilter }: Props) {
  const filtered = driverFilter
    ? events.filter(e => e.driverId === driverFilter)
    : events;

  const pendingCount = filtered.filter(e => e.disputeStatus === 'none').length;

  return (
    <div className="flex flex-col h-full">
      {/* App header */}
      <div className="px-4 pt-4 pb-3 bg-[#0F172A] sticky top-0 z-10 border-b border-slate-800">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold text-white">Safety Events</h1>
          {pendingCount > 0 && (
            <div className="flex items-center gap-1.5 bg-red-500/15 border border-red-500/30 rounded-full px-2.5 py-1">
              <Bell className="w-3 h-3 text-red-400" />
              <span className="text-xs font-semibold text-red-400">{pendingCount}</span>
            </div>
          )}
        </div>
        <p className="text-xs text-slate-500 mt-1">Tap an event to review and dispute</p>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2">
        {filtered.map(event => {
          const Icon = eventIcons[event.eventType] ?? AlertTriangle;
          return (
            <button
              key={event.id}
              onClick={() => onSelectEvent(event)}
              className="w-full bg-[#1E293B] border border-slate-700 hover:border-slate-600 rounded-xl p-3.5 flex items-start gap-3 text-left transition-all duration-150 active:scale-98"
            >
              <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                <Icon className="w-4 h-4 text-slate-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-sm font-semibold text-white truncate">AI Detected: {event.aiLabel}</span>
                  <ChevronRight className="w-4 h-4 text-slate-600 shrink-0" />
                </div>
                <p className="text-xs text-slate-500 mb-2">{formatTime(event.timestamp)}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${confidenceColor(event.aiConfidenceScore)}`}>
                    {event.aiConfidenceScore}% confidence
                  </span>
                  {statusBadge(event.disputeStatus)}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
