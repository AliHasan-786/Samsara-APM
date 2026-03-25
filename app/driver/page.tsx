'use client';

import { useState } from 'react';
import PhoneMockup from '@/components/PhoneMockup';
import SafetyEventList from '@/components/driver/SafetyEventList';
import EventDetail from '@/components/driver/EventDetail';
import DisputeWorkflow from '@/components/driver/DisputeWorkflow';
import { useDisputes } from '@/context/DisputeContext';
import { useToast } from '@/components/Toast';
import { SafetyEvent } from '@/lib/mockData';
import { Info } from 'lucide-react';

type DriverView = 'list' | 'detail' | 'dispute';

export default function DriverPage() {
  const { events, submitDispute } = useDisputes();
  const { showToast } = useToast();
  const [view, setView] = useState<DriverView>('list');
  const [selectedEvent, setSelectedEvent] = useState<SafetyEvent | null>(null);

  // Show all events — demo users can dispute any of them
  const DRIVER_ID = undefined;

  const handleSelectEvent = (event: SafetyEvent) => {
    setSelectedEvent(event);
    setView('detail');
  };

  const handleDispute = () => {
    setView('dispute');
  };

  const handleSubmitDispute = (reasonCode: string, note: string) => {
    if (!selectedEvent) return;
    submitDispute(selectedEvent.id, reasonCode, note);
    showToast('Dispute submitted — your manager will review within 24 hours', 'success');
  };

  const handleBackToList = () => {
    setView('list');
    setSelectedEvent(null);
  };

  const handleBackToDetail = () => {
    setView('detail');
  };

  // Refresh selected event from context
  const currentEvent = selectedEvent
    ? events.find(e => e.id === selectedEvent.id) ?? selectedEvent
    : null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10" style={{ backgroundColor: '#F0F6FE', minHeight: '100vh' }}>
      {/* Instruction banner */}
      <div
        className="rounded-xl p-4 mb-8 flex items-start gap-3"
        style={{ backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE' }}
      >
        <Info className="w-5 h-5 shrink-0 mt-0.5" style={{ color: '#1D4ED8' }} />
        <div>
          <p className="text-sm font-semibold mb-1" style={{ color: '#1D4ED8' }}>
            Interact with the phone below — submit a dispute to see it appear in the Manager Dashboard instantly
          </p>
          <p className="text-sm" style={{ color: '#333333' }}>
            Tap any event to review details, then dispute an unfair AI flag in 2 steps.
            After submitting, visit the <strong style={{ color: '#00263E' }}>Manager Dashboard</strong> to see it in the review queue.
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 items-start">
        {/* Left — label + phone */}
        <div className="flex-1 flex flex-col items-center">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-2" style={{ color: '#00263E' }}>Driver&apos;s Perspective</h1>
            <p className="text-sm" style={{ color: '#6B7280' }}>Mobile App — iOS-style interface</p>
          </div>

          <PhoneMockup>
            {view === 'list' && (
              <SafetyEventList
                events={events}
                onSelectEvent={handleSelectEvent}
                driverFilter={DRIVER_ID}
              />
            )}
            {view === 'detail' && currentEvent && (
              <EventDetail
                event={currentEvent}
                onBack={handleBackToList}
                onDispute={handleDispute}
              />
            )}
            {view === 'dispute' && currentEvent && (
              <DisputeWorkflow
                eventId={currentEvent.id}
                eventLabel={currentEvent.aiLabel}
                onBack={handleBackToDetail}
                onSubmit={handleSubmitDispute}
              />
            )}
          </PhoneMockup>
        </div>

        {/* Right — context explainer */}
        <div className="lg:w-80 space-y-4">
          <div
            className="rounded-xl p-5"
            style={{ backgroundColor: '#FFFFFF', border: '1px solid #D6DBE1' }}
          >
            <h2 className="font-bold mb-3 text-base" style={{ color: '#00263E' }}>What you&apos;re seeing</h2>
            <div className="space-y-3">
              {[
                {
                  step: '1',
                  title: 'Event List',
                  desc: 'Driver sees all AI-flagged safety events with confidence scores color-coded by certainty.',
                  active: view === 'list',
                },
                {
                  step: '2',
                  title: 'Event Detail',
                  desc: 'Simulated dashcam view, event metadata, and an animated confidence bar.',
                  active: view === 'detail',
                },
                {
                  step: '3',
                  title: 'Dispute Workflow',
                  desc: '2-step form: pick reason → add optional note. Submits and updates context instantly.',
                  active: view === 'dispute',
                },
              ].map(item => (
                <div
                  key={item.step}
                  className="flex gap-3 rounded-lg p-3 transition-colors"
                  style={item.active ? { backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE' } : {}}
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                    style={
                      item.active
                        ? { backgroundColor: '#0369EA', color: '#FFFFFF' }
                        : { backgroundColor: '#E5E7EB', color: '#6B7280' }
                    }
                  >
                    {item.step}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: item.active ? '#0369EA' : '#333333' }}>
                      {item.title}
                    </p>
                    <p className="text-xs mt-0.5 leading-relaxed" style={{ color: '#6B7280' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="rounded-xl p-5"
            style={{ backgroundColor: '#FFFFFF', border: '1px solid #D6DBE1' }}
          >
            <h3 className="font-bold mb-2 text-sm" style={{ color: '#00263E' }}>Design Decisions</h3>
            <ul className="space-y-2 text-xs" style={{ color: '#6B7280' }}>
              <li className="flex gap-2">
                <span className="shrink-0" style={{ color: '#0369EA' }}>—</span>
                Confidence score color-coding (amber/orange/red) communicates AI uncertainty without jargon
              </li>
              <li className="flex gap-2">
                <span className="shrink-0" style={{ color: '#0369EA' }}>—</span>
                2-tap dispute flow minimizes friction for time-pressed commercial drivers
              </li>
              <li className="flex gap-2">
                <span className="shrink-0" style={{ color: '#0369EA' }}>—</span>
                Pre-defined reason codes ensure structured data for RLHF labeling pipeline
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
