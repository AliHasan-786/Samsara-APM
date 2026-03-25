'use client';

import { CheckCircle, XCircle, AlertTriangle, MapPin, Clock, User, MessageSquare } from 'lucide-react';
import { SafetyEvent, DISPUTE_REASONS } from '@/lib/mockData';

const confidenceLabel = (score: number) => {
  if (score < 60) return {
    text: 'Low Confidence',
    color: '#B45309',
    bg: '#FFF8E7',
    border: '#FBB924',
    bar: 'bg-amber-500',
  };
  if (score <= 75) return {
    text: 'Medium Confidence',
    color: '#C2410C',
    bg: '#FFF1F0',
    border: '#FB923C',
    bar: 'bg-orange-500',
  };
  return {
    text: 'High Confidence',
    color: '#991B1B',
    bg: '#FEF2F2',
    border: '#FCA5A5',
    bar: 'bg-red-500',
  };
};

const formatDateTime = (ts: string) => {
  const d = new Date(ts);
  return d.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
};

const initials = (name: string) =>
  name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

interface Props {
  event: SafetyEvent | null;
  onApprove: (eventId: string) => void;
  onReject: (eventId: string) => void;
}

export default function ReviewPanel({ event, onApprove, onReject }: Props) {
  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-8">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
          style={{ backgroundColor: '#F0F6FE' }}
        >
          <AlertTriangle className="w-7 h-7" style={{ color: '#D6DBE1' }} />
        </div>
        <h3 className="font-semibold mb-2" style={{ color: '#6B7280' }}>Select a dispute to review</h3>
        <p className="text-sm" style={{ color: '#6B7280' }}>
          Choose a pending dispute from the inbox on the left to see the AI vs. Driver comparison.
        </p>
      </div>
    );
  }

  const conf = confidenceLabel(event.aiConfidenceScore);
  const reasonData = DISPUTE_REASONS.find(r => r.code === event.disputeReasonCode);
  const isResolved = event.disputeStatus === 'approved' || event.disputeStatus === 'rejected';

  return (
    <div className="flex flex-col h-full overflow-y-auto p-6" style={{ backgroundColor: '#FFFFFF' }}>
      {/* Driver header */}
      <div className="flex items-center gap-4 mb-6 pb-6 border-b" style={{ borderColor: '#D6DBE1' }}>
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-base font-bold"
          style={{ backgroundColor: '#EFF6FF', color: '#0369EA' }}
        >
          {initials(event.driverName)}
        </div>
        <div>
          <h2 className="text-lg font-bold" style={{ color: '#00263E' }}>{event.driverName}</h2>
          <div className="flex items-center gap-3 text-sm" style={{ color: '#6B7280' }}>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {formatDateTime(event.timestamp)}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {event.location}
            </span>
          </div>
        </div>
        {isResolved && (
          <div className="ml-auto">
            {event.disputeStatus === 'approved' ? (
              <span
                className="flex items-center gap-1.5 text-sm font-medium rounded-full px-3 py-1"
                style={{ backgroundColor: '#ECFDF5', color: '#065F46', border: '1px solid #0DAB41' }}
              >
                <CheckCircle className="w-4 h-4" /> Approved
              </span>
            ) : (
              <span
                className="flex items-center gap-1.5 text-sm font-medium rounded-full px-3 py-1"
                style={{ backgroundColor: '#FEF2F2', color: '#991B1B', border: '1px solid #DF2036' }}
              >
                <XCircle className="w-4 h-4" /> Rejected
              </span>
            )}
          </div>
        )}
      </div>

      {/* Side-by-side comparison */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* AI Assessment */}
        <div className="rounded-xl p-4" style={{ backgroundColor: '#F8FAFC', border: '1px solid #D6DBE1' }}>
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4" style={{ color: '#DF2036' }} />
            <h3 className="text-sm font-bold" style={{ color: '#333333' }}>AI&apos;s Assessment</h3>
          </div>
          <p className="font-semibold text-base mb-1" style={{ color: '#00263E' }}>{event.aiLabel}</p>
          <p className="text-xs mb-3" style={{ color: '#6B7280' }}>What the computer vision model detected</p>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span style={{ color: '#6B7280' }}>Confidence</span>
              <span className="font-bold" style={{ color: conf.color }}>{event.aiConfidenceScore}%</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#E5E7EB' }}>
              <div
                className={`h-full ${conf.bar} rounded-full`}
                style={{ width: `${event.aiConfidenceScore}%` }}
              />
            </div>
            <span
              className="inline-block text-xs px-2 py-0.5 rounded-full"
              style={{ backgroundColor: conf.bg, border: `1px solid ${conf.border}`, color: conf.color }}
            >
              {conf.text}
            </span>
          </div>
        </div>

        {/* Driver's Claim */}
        <div className="rounded-xl p-4" style={{ backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE' }}>
          <div className="flex items-center gap-2 mb-3">
            <User className="w-4 h-4" style={{ color: '#0369EA' }} />
            <h3 className="text-sm font-bold" style={{ color: '#333333' }}>Driver&apos;s Claim</h3>
          </div>
          {reasonData ? (
            <>
              <p className="font-semibold text-base mb-1" style={{ color: '#00263E' }}>{reasonData.label}</p>
              <p className="text-xs mb-3" style={{ color: '#6B7280' }}>{reasonData.description}</p>
            </>
          ) : (
            <p className="text-xs mb-3" style={{ color: '#6B7280' }}>No reason provided</p>
          )}

          {event.disputeNote && (
            <div className="rounded-lg p-3" style={{ backgroundColor: '#FFFFFF' }}>
              <div className="flex items-center gap-1.5 mb-1.5">
                <MessageSquare className="w-3 h-3" style={{ color: '#6B7280' }} />
                <span className="text-xs font-medium" style={{ color: '#6B7280' }}>Driver&apos;s Note</span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: '#333333' }}>&ldquo;{event.disputeNote}&rdquo;</p>
            </div>
          )}
        </div>
      </div>

      {/* Insight callout */}
      <div
        className="rounded-xl p-4 mb-6 text-sm"
        style={{
          backgroundColor: '#F0F6FE',
          borderLeft: '4px solid #0369EA',
          color: '#333333',
        }}
      >
        <strong style={{ color: '#00263E' }}>Review Guidance:</strong>{' '}
        {event.aiConfidenceScore < 60
          ? 'Low AI confidence suggests higher chance of false positive. Consider approving if the driver\'s explanation is plausible.'
          : event.aiConfidenceScore <= 75
          ? 'Medium confidence — weigh the driver\'s explanation carefully against the event type.'
          : 'High AI confidence. Verify the driver\'s claim is consistent with the detection before approving.'}
      </div>

      {/* Action buttons */}
      {!isResolved ? (
        <div className="flex flex-col gap-3 mt-auto">
          <button
            onClick={() => onApprove(event.id)}
            className="flex items-center justify-center gap-2 text-white font-semibold py-3 rounded-xl transition-all duration-200 text-sm w-full"
            style={{ backgroundColor: '#0DAB41' }}
          >
            <CheckCircle className="w-4 h-4" />
            Approve Dispute
          </button>
          <button
            onClick={() => onReject(event.id)}
            className="flex items-center justify-center gap-2 font-semibold py-3 rounded-xl transition-all duration-200 text-sm w-full"
            style={{ backgroundColor: 'transparent', border: '1.5px solid #DF2036', color: '#DF2036' }}
          >
            <XCircle className="w-4 h-4" />
            Send to Coaching
          </button>
          <p className="text-xs text-center" style={{ color: '#6B7280' }}>
            Approved disputes are labeled as training data for model retraining
          </p>
        </div>
      ) : (
        <div
          className="rounded-xl p-4 text-center"
          style={{ backgroundColor: '#F8FAFC', border: '1px solid #D6DBE1' }}
        >
          <p className="text-sm" style={{ color: '#6B7280' }}>
            {event.disputeStatus === 'approved'
              ? 'This event has been archived and the data has been labeled for model retraining.'
              : 'A coaching session has been scheduled. This event remains in the driver\'s record.'}
          </p>
        </div>
      )}
    </div>
  );
}
