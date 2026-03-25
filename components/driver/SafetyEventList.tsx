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
  if (score < 60) return { bg: '#FFF8E7', text: '#B45309', border: '#FBB924' };
  if (score <= 75) return { bg: '#FFF1F0', text: '#C2410C', border: '#FB923C' };
  return { bg: '#FEF2F2', text: '#991B1B', border: '#FCA5A5' };
};

const statusBadge = (status: SafetyEvent['disputeStatus']) => {
  switch (status) {
    case 'pending':
      return (
        <span
          className="text-xs font-medium px-2.5 py-0.5 rounded-full"
          style={{ backgroundColor: '#FFF8E7', color: '#B45309', border: '1px solid #FBB924' }}
        >
          Dispute Pending
        </span>
      );
    case 'approved':
      return (
        <span
          className="text-xs font-medium px-2.5 py-0.5 rounded-full"
          style={{ backgroundColor: '#ECFDF5', color: '#065F46', border: '1px solid #0DAB41' }}
        >
          Approved
        </span>
      );
    case 'rejected':
      return (
        <span
          className="text-xs font-medium px-2.5 py-0.5 rounded-full"
          style={{ backgroundColor: '#FEF2F2', color: '#991B1B', border: '1px solid #DF2036' }}
        >
          Rejected
        </span>
      );
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
      <div
        className="px-4 pt-4 pb-3 sticky top-0 z-10 border-b"
        style={{ backgroundColor: '#FFFFFF', borderColor: '#D6DBE1' }}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold" style={{ color: '#00263E' }}>Safety Events</h1>
          {pendingCount > 0 && (
            <div
              className="flex items-center gap-1.5 rounded-full px-2.5 py-1"
              style={{ backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5' }}
            >
              <Bell className="w-3 h-3" style={{ color: '#991B1B' }} />
              <span className="text-xs font-semibold" style={{ color: '#991B1B' }}>{pendingCount}</span>
            </div>
          )}
        </div>
        <p className="text-xs mt-1" style={{ color: '#6B7280' }}>Tap an event to review and dispute</p>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2" style={{ backgroundColor: '#F8FAFC' }}>
        {filtered.map(event => {
          const Icon = eventIcons[event.eventType] ?? AlertTriangle;
          const confColors = confidenceColor(event.aiConfidenceScore);
          return (
            <button
              key={event.id}
              onClick={() => onSelectEvent(event)}
              className="w-full rounded-xl p-3.5 flex items-start gap-3 text-left transition-all duration-150 active:scale-98"
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #D6DBE1',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = '#0369EA';
                (e.currentTarget as HTMLElement).style.backgroundColor = '#F0F6FE';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = '#D6DBE1';
                (e.currentTarget as HTMLElement).style.backgroundColor = '#FFFFFF';
              }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                style={{ backgroundColor: '#F0F6FE' }}
              >
                <Icon className="w-4 h-4" style={{ color: '#6B7280' }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-sm font-semibold truncate" style={{ color: '#333333' }}>
                    AI Detected: {event.aiLabel}
                  </span>
                  <ChevronRight className="w-4 h-4 shrink-0" style={{ color: '#D6DBE1' }} />
                </div>
                <p className="text-xs mb-2" style={{ color: '#6B7280' }}>{formatTime(event.timestamp)}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className="text-xs font-medium px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: confColors.bg,
                      color: confColors.text,
                      border: `1px solid ${confColors.border}`,
                    }}
                  >
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
