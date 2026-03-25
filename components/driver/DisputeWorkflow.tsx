'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, CheckCircle } from 'lucide-react';
import { DISPUTE_REASONS } from '@/lib/mockData';

interface Props {
  eventId?: string;
  eventLabel: string;
  onBack: () => void;
  onSubmit: (reasonCode: string, note: string) => void;
}

export default function DisputeWorkflow({ eventLabel, onBack, onSubmit }: Props) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedReason, setSelectedReason] = useState('');
  const [note, setNote] = useState('');

  const handleSelectReason = (code: string) => {
    setSelectedReason(code);
    setStep(2);
  };

  const handleSubmit = () => {
    onSubmit(selectedReason, note);
    setStep(3);
  };

  const selectedReasonData = DISPUTE_REASONS.find(r => r.code === selectedReason);

  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: '#FFFFFF' }}>
      {/* Header */}
      <div
        className="px-4 pt-4 pb-3 sticky top-0 z-10 border-b"
        style={{ backgroundColor: '#FFFFFF', borderColor: '#D6DBE1' }}
      >
        {step < 3 && (
          <button
            onClick={step === 1 ? onBack : () => setStep(1)}
            className="flex items-center gap-1 text-sm mb-2 transition-colors"
            style={{ color: '#0369EA' }}
          >
            <ChevronLeft className="w-4 h-4" />
            {step === 1 ? eventLabel : 'Back'}
          </button>
        )}
        {/* Step progress bar */}
        {step < 3 && (
          <div className="flex items-center gap-2">
            {[1, 2].map(s => (
              <div
                key={s}
                className="h-1 rounded-full flex-1 transition-all duration-300"
                style={{ backgroundColor: s <= step ? '#0369EA' : '#E5E7EB' }}
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Step 1 — Pick reason */}
        {step === 1 && (
          <div className="px-4 py-4">
            <h2 className="text-lg font-bold mb-1" style={{ color: '#00263E' }}>What really happened?</h2>
            <p className="text-sm mb-5" style={{ color: '#6B7280' }}>
              Select the reason that best describes the situation at the time of the flag.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {DISPUTE_REASONS.map(reason => (
                <button
                  key={reason.code}
                  onClick={() => handleSelectReason(reason.code)}
                  className="rounded-xl p-3.5 text-left flex flex-col gap-1.5 transition-all duration-150"
                  style={{ backgroundColor: '#FFFFFF', border: '1px solid #D6DBE1' }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = '#0369EA';
                    (e.currentTarget as HTMLElement).style.backgroundColor = '#F0F6FE';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = '#D6DBE1';
                    (e.currentTarget as HTMLElement).style.backgroundColor = '#FFFFFF';
                  }}
                >
                  <span className="text-sm font-semibold" style={{ color: '#333333' }}>{reason.label}</span>
                  <span className="text-xs leading-relaxed" style={{ color: '#6B7280' }}>{reason.description}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2 — Add note */}
        {step === 2 && (
          <div className="px-4 py-4">
            <h2 className="text-lg font-bold mb-1" style={{ color: '#00263E' }}>Add any details?</h2>
            <p className="text-sm mb-5" style={{ color: '#6B7280' }}>
              Optional — a brief note helps your manager make an informed decision.
            </p>

            {/* Selected reason chip */}
            {selectedReasonData && (
              <div
                className="rounded-lg px-3 py-2 mb-4"
                style={{ backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE' }}
              >
                <p className="text-xs font-medium" style={{ color: '#1D4ED8' }}>
                  Selected reason: {selectedReasonData.label}
                </p>
                <p className="text-xs" style={{ color: '#6B7280' }}>{selectedReasonData.description}</p>
              </div>
            )}

            <textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="e.g. I was adjusting the heat — the truck HVAC button is near the center console..."
              rows={4}
              className="w-full rounded-xl px-4 py-3 text-sm resize-none outline-none transition-colors"
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #D6DBE1',
                color: '#333333',
              }}
              onFocus={e => { (e.currentTarget as HTMLElement).style.borderColor = '#0369EA'; }}
              onBlur={e => { (e.currentTarget as HTMLElement).style.borderColor = '#D6DBE1'; }}
            />
            <p className="text-xs mt-1.5 mb-5" style={{ color: '#6B7280' }}>{note.length}/500 characters</p>

            <button
              onClick={handleSubmit}
              className="w-full text-white font-semibold py-3.5 rounded-xl transition-all duration-200 text-sm"
              style={{ backgroundColor: '#0369EA' }}
            >
              Submit Dispute
            </button>
          </div>
        )}

        {/* Step 3 — Confirmation */}
        {step === 3 && (
          <div className="px-4 py-12 flex flex-col items-center text-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mb-4 animate-pulse"
              style={{ backgroundColor: '#DCFCE7' }}
            >
              <CheckCircle className="w-8 h-8" style={{ color: '#16A34A' }} />
            </div>
            <h2 className="text-xl font-bold mb-2" style={{ color: '#00263E' }}>Dispute Submitted!</h2>
            <p className="text-sm leading-relaxed mb-2 max-w-xs" style={{ color: '#6B7280' }}>
              Your dispute has been sent to your fleet manager.
            </p>
            <p className="text-sm mb-8" style={{ color: '#6B7280' }}>
              Expected review: <span style={{ color: '#333333' }}>within 24 hours</span>
            </p>
            <div
              className="rounded-xl p-4 w-full text-left mb-6"
              style={{ backgroundColor: '#F0F6FE', border: '1px solid #BFDBFE' }}
            >
              <p className="text-xs mb-1 uppercase tracking-wider" style={{ color: '#6B7280' }}>You submitted</p>
              {selectedReasonData && (
                <p className="text-sm font-semibold mb-1" style={{ color: '#00263E' }}>{selectedReasonData.label}</p>
              )}
              {note && <p className="text-xs" style={{ color: '#6B7280' }}>&ldquo;{note}&rdquo;</p>}
            </div>
            <Link
              href="/manager"
              className="text-sm font-semibold underline underline-offset-2 transition-colors"
              style={{ color: '#0369EA' }}
            >
              → Switch to Manager Dashboard to review this dispute
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
