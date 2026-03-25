'use client';

import { useState } from 'react';
import { useDisputes } from '@/context/DisputeContext';
import { useToast } from '@/components/Toast';
import { SafetyEvent } from '@/lib/mockData';
import DisputeInbox from '@/components/manager/DisputeInbox';
import ReviewPanel from '@/components/manager/ReviewPanel';
import { Info, AlertTriangle } from 'lucide-react';

export default function ManagerPage() {
  const { events, resolveDispute } = useDisputes();
  const { showToast } = useToast();
  const [selectedEvent, setSelectedEvent] = useState<SafetyEvent | null>(null);

  const pendingCount = events.filter(e => e.disputeStatus === 'pending').length;

  const handleSelect = (event: SafetyEvent) => {
    // Refresh from context in case state changed
    const fresh = events.find(e => e.id === event.id) ?? event;
    setSelectedEvent(fresh);
  };

  // Always show most current version of selected event
  const currentSelected = selectedEvent
    ? events.find(e => e.id === selectedEvent.id) ?? selectedEvent
    : null;

  const handleApprove = (eventId: string) => {
    resolveDispute(eventId, 'approved');
    showToast('Dispute approved — event archived, data labeled for retraining', 'success');
    setSelectedEvent(null);
  };

  const handleReject = (eventId: string) => {
    resolveDispute(eventId, 'rejected');
    showToast('Rejection noted — coaching session scheduled', 'error');
    setSelectedEvent(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6" style={{ backgroundColor: '#F0F6FE', minHeight: '100vh' }}>
      {/* Instruction banner */}
      <div
        className="rounded-xl p-4 mb-6 flex items-start gap-3"
        style={{ backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE' }}
      >
        <Info className="w-5 h-5 shrink-0 mt-0.5" style={{ color: '#1D4ED8' }} />
        <p className="text-sm" style={{ color: '#333333' }}>
          <span className="font-semibold" style={{ color: '#1D4ED8' }}>Tip: </span>
          Switch to the <strong style={{ color: '#00263E' }}>Driver View</strong> tab to submit a new dispute, then return here to review it in real-time.
          The two views share live state — no page refresh needed.
        </p>
      </div>

      {/* Page header */}
      <div
        className="rounded-xl p-5 mb-6 flex items-center justify-between"
        style={{ backgroundColor: '#FFFFFF', border: '1px solid #D6DBE1' }}
      >
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#00263E' }}>Fleet Manager Dashboard</h1>
          <p className="text-sm mt-1" style={{ color: '#6B7280' }}>Review driver disputes and manage safety records</p>
        </div>
        {pendingCount > 0 && (
          <div
            className="flex items-center gap-2 rounded-xl px-4 py-2"
            style={{ backgroundColor: '#FFF8E7', border: '1px solid #FBB924' }}
          >
            <AlertTriangle className="w-4 h-4" style={{ color: '#B45309' }} />
            <span className="text-sm font-semibold" style={{ color: '#B45309' }}>
              {pendingCount} Pending {pendingCount === 1 ? 'Dispute' : 'Disputes'}
            </span>
          </div>
        )}
      </div>

      {/* Two-panel layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6" style={{ height: 'calc(100vh - 280px)', minHeight: 600 }}>
        {/* Left panel — Inbox (40%) */}
        <div
          className="lg:col-span-2 rounded-xl flex flex-col overflow-hidden"
          style={{ backgroundColor: '#FFFFFF', border: '1px solid #D6DBE1' }}
        >
          <div className="px-4 pt-4 pb-0">
            <h2 className="font-bold text-base" style={{ color: '#00263E' }}>Dispute Inbox</h2>
          </div>
          <DisputeInbox
            events={events}
            selectedId={currentSelected?.id ?? null}
            onSelect={handleSelect}
          />
        </div>

        {/* Right panel — Review (60%) */}
        <div
          className="lg:col-span-3 rounded-xl overflow-hidden"
          style={{ backgroundColor: '#FFFFFF', border: '1px solid #D6DBE1' }}
        >
          <ReviewPanel
            event={currentSelected}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        </div>
      </div>
    </div>
  );
}
