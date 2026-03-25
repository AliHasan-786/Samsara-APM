'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { SafetyEvent, mockEvents } from '@/lib/mockData';

interface DisputeContextType {
  events: SafetyEvent[];
  submitDispute: (eventId: string, reasonCode: string, note: string) => void;
  resolveDispute: (eventId: string, action: 'approved' | 'rejected') => void;
}

const DisputeContext = createContext<DisputeContextType | null>(null);

export function DisputeProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<SafetyEvent[]>(mockEvents);

  const submitDispute = (eventId: string, reasonCode: string, note: string) => {
    setEvents(prev =>
      prev.map(e =>
        e.id === eventId
          ? { ...e, disputeStatus: 'pending', disputeReasonCode: reasonCode, disputeNote: note }
          : e
      )
    );
  };

  const resolveDispute = (eventId: string, action: 'approved' | 'rejected') => {
    setEvents(prev =>
      prev.map(e =>
        e.id === eventId
          ? {
              ...e,
              disputeStatus: action,
              managerAction: action,
              coachingScheduled: action === 'rejected' ? true : e.coachingScheduled,
            }
          : e
      )
    );
  };

  return (
    <DisputeContext.Provider value={{ events, submitDispute, resolveDispute }}>
      {children}
    </DisputeContext.Provider>
  );
}

export function useDisputes() {
  const ctx = useContext(DisputeContext);
  if (!ctx) throw new Error('useDisputes must be used within DisputeProvider');
  return ctx;
}
