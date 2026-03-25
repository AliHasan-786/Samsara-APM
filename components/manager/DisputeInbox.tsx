'use client';

import { useState } from 'react';
import { AlertTriangle, Phone, Zap, Shield, Navigation, ChevronRight, CheckCircle, XCircle } from 'lucide-react';
import { SafetyEvent, DISPUTE_REASONS } from '@/lib/mockData';

const eventIcons: Record<string, React.ElementType> = {
  distraction: AlertTriangle,
  fatigue: Zap,
  phone_use: Phone,
  seatbelt: Shield,
  speeding: Navigation,
};

const confidenceBadge = (score: number) => {
  if (score < 60) return { bg: '#FFF8E7', text: '#B45309', border: '#FBB924' };
  if (score <= 75) return { bg: '#FFF1F0', text: '#C2410C', border: '#FB923C' };
  return { bg: '#FEF2F2', text: '#991B1B', border: '#FCA5A5' };
};

const formatRelativeTime = (ts: string) => {
  const diff = Date.now() - new Date(ts).getTime();
  const h = Math.floor(diff / 3600000);
  const d = Math.floor(h / 24);
  if (d > 0) return `${d}d ago`;
  if (h > 0) return `${h}h ago`;
  return 'Just now';
};

const initials = (name: string) =>
  name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

interface Props {
  events: SafetyEvent[];
  selectedId: string | null;
  onSelect: (event: SafetyEvent) => void;
}

export default function DisputeInbox({ events, selectedId, onSelect }: Props) {
  const pending = events.filter(e => e.disputeStatus === 'pending');
  const reviewed = events.filter(e => e.disputeStatus === 'approved' || e.disputeStatus === 'rejected');

  const [tab, setTab] = useState<'pending' | 'reviewed'>('pending');
  const displayed = tab === 'pending' ? pending : reviewed;

  return (
    <div className="flex flex-col h-full">
      {/* Tab bar */}
      <div
        className="flex border-b px-4 pt-3 gap-1"
        style={{ backgroundColor: '#F8FAFC', borderColor: '#D6DBE1' }}
      >
        <button
          onClick={() => setTab('pending')}
          className="px-4 py-2 text-sm font-medium transition-colors flex items-center gap-2"
          style={{
            color: tab === 'pending' ? '#0369EA' : '#6B7280',
            borderBottom: tab === 'pending' ? '2px solid #0369EA' : '2px solid transparent',
            paddingBottom: tab === 'pending' ? '6px' : '8px',
          }}
        >
          Pending
          {pending.length > 0 && (
            <span
              className="text-xs font-bold rounded-full px-1.5 py-0.5 min-w-[20px] text-center"
              style={{ backgroundColor: '#FFF8E7', color: '#B45309', border: '1px solid #FBB924' }}
            >
              {pending.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setTab('reviewed')}
          className="px-4 py-2 text-sm font-medium transition-colors"
          style={{
            color: tab === 'reviewed' ? '#0369EA' : '#6B7280',
            borderBottom: tab === 'reviewed' ? '2px solid #0369EA' : '2px solid transparent',
            paddingBottom: tab === 'reviewed' ? '6px' : '8px',
          }}
        >
          Reviewed ({reviewed.length})
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {displayed.length === 0 ? (
          <div className="py-12 text-center">
            <CheckCircle className="w-8 h-8 mx-auto mb-3" style={{ color: '#0DAB41', opacity: 0.4 }} />
            <p className="text-sm" style={{ color: '#6B7280' }}>All caught up!</p>
            <p className="text-xs mt-1" style={{ color: '#6B7280' }}>No pending disputes</p>
          </div>
        ) : (
          displayed.map(event => {
            const Icon = eventIcons[event.eventType] ?? AlertTriangle;
            const reasonData = DISPUTE_REASONS.find(r => r.code === event.disputeReasonCode);
            const isSelected = event.id === selectedId;
            const confBadge = confidenceBadge(event.aiConfidenceScore);

            return (
              <button
                key={event.id}
                onClick={() => onSelect(event)}
                className="w-full rounded-xl p-3.5 text-left transition-all duration-150 border"
                style={{
                  backgroundColor: isSelected ? '#F0F6FE' : '#FFFFFF',
                  borderColor: isSelected ? '#0369EA' : '#F3F4F6',
                  borderLeft: isSelected ? '3px solid #0369EA' : '1px solid #F3F4F6',
                }}
                onMouseEnter={e => {
                  if (!isSelected) (e.currentTarget as HTMLElement).style.backgroundColor = '#F0F6FE';
                }}
                onMouseLeave={e => {
                  if (!isSelected) (e.currentTarget as HTMLElement).style.backgroundColor = '#FFFFFF';
                }}
              >
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                    style={{ backgroundColor: '#EFF6FF', color: '#0369EA' }}
                  >
                    {initials(event.driverName)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-sm font-semibold truncate" style={{ color: '#00263E' }}>
                        {event.driverName}
                      </span>
                      <div className="flex items-center gap-1 shrink-0">
                        <span className="text-xs" style={{ color: '#6B7280' }}>{formatRelativeTime(event.timestamp)}</span>
                        {tab === 'pending' && <ChevronRight className="w-3.5 h-3.5" style={{ color: '#D6DBE1' }} />}
                        {event.disputeStatus === 'approved' && <CheckCircle className="w-4 h-4" style={{ color: '#0DAB41' }} />}
                        {event.disputeStatus === 'rejected' && <XCircle className="w-4 h-4" style={{ color: '#DF2036' }} />}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <Icon className="w-3.5 h-3.5 shrink-0" style={{ color: '#6B7280' }} />
                      <span className="text-xs truncate" style={{ color: '#6B7280' }}>{event.aiLabel}</span>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      {reasonData && (
                        <span
                          className="text-xs px-2 py-0.5 rounded-md"
                          style={{ backgroundColor: '#F0F6FE', color: '#333333' }}
                        >
                          {reasonData.label}
                        </span>
                      )}
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: confBadge.bg,
                          color: confBadge.text,
                          border: `1px solid ${confBadge.border}`,
                        }}
                      >
                        {event.aiConfidenceScore}% conf.
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
