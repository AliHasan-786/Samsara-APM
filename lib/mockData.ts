export type DisputeStatus = 'pending' | 'approved' | 'rejected' | 'none';
export type EventType = 'distraction' | 'fatigue' | 'phone_use' | 'seatbelt' | 'speeding';

export interface SafetyEvent {
  id: string;
  driverId: string;
  driverName: string;
  eventType: EventType;
  aiLabel: string;
  aiConfidenceScore: number; // 0-100
  timestamp: string;
  location: string;
  videoThumbnail: string; // emoji or placeholder
  disputeStatus: DisputeStatus;
  disputeReasonCode?: string;
  disputeNote?: string;
  managerAction?: 'approved' | 'rejected';
  coachingScheduled?: boolean;
}

export const DISPUTE_REASONS = [
  { code: 'sun_glare', label: 'Sun Glare', description: 'Bright light caused camera artifact' },
  { code: 'mirror_check', label: 'Mirror Check', description: 'Looking at mirrors, not phone' },
  { code: 'medical', label: 'Medical Gesture', description: 'Scratching, yawning, or medical need' },
  { code: 'road_conditions', label: 'Road Conditions', description: 'Evasive maneuver for safety' },
  { code: 'cargo_check', label: 'Cargo Check', description: 'Checking load or blind spot' },
  { code: 'radio_hvac', label: 'Radio / HVAC', description: 'Adjusting in-cab controls' },
];

export const mockEvents: SafetyEvent[] = [
  {
    id: 'evt-001',
    driverId: 'drv-101',
    driverName: 'Marcus Johnson',
    eventType: 'distraction',
    aiLabel: 'Distracted Driving',
    aiConfidenceScore: 71,
    timestamp: '2024-01-15T08:23:00Z',
    location: 'I-80 W, Sacramento, CA',
    videoThumbnail: '🎥',
    disputeStatus: 'none',
  },
  {
    id: 'evt-002',
    driverId: 'drv-102',
    driverName: 'Priya Patel',
    eventType: 'phone_use',
    aiLabel: 'Mobile Phone Use',
    aiConfidenceScore: 58,
    timestamp: '2024-01-15T10:47:00Z',
    location: 'US-101 N, San Jose, CA',
    videoThumbnail: '🎥',
    disputeStatus: 'none',
  },
  {
    id: 'evt-003',
    driverId: 'drv-103',
    driverName: 'Derek Washington',
    eventType: 'fatigue',
    aiLabel: 'Driver Fatigue',
    aiConfidenceScore: 83,
    timestamp: '2024-01-14T22:15:00Z',
    location: 'I-5 S, Fresno, CA',
    videoThumbnail: '🎥',
    disputeStatus: 'pending',
    disputeReasonCode: 'medical',
    disputeNote: 'Yawned once due to allergies, not fatigue. Just completed 6-hour rest.',
  },
  {
    id: 'evt-004',
    driverId: 'drv-104',
    driverName: 'Sofia Reyes',
    eventType: 'distraction',
    aiLabel: 'Distracted Driving',
    aiConfidenceScore: 62,
    timestamp: '2024-01-14T14:30:00Z',
    location: 'CA-99 N, Modesto, CA',
    videoThumbnail: '🎥',
    disputeStatus: 'approved',
    disputeReasonCode: 'mirror_check',
    disputeNote: 'Checking side mirror for lane change.',
    managerAction: 'approved',
  },
  {
    id: 'evt-005',
    driverId: 'drv-101',
    driverName: 'Marcus Johnson',
    eventType: 'phone_use',
    aiLabel: 'Mobile Phone Use',
    aiConfidenceScore: 45,
    timestamp: '2024-01-13T16:55:00Z',
    location: 'I-580 E, Oakland, CA',
    videoThumbnail: '🎥',
    disputeStatus: 'pending',
    disputeReasonCode: 'radio_hvac',
    disputeNote: 'Adjusting truck temperature control, not a phone.',
  },
  {
    id: 'evt-006',
    driverId: 'drv-105',
    driverName: "James O'Brien",
    eventType: 'seatbelt',
    aiLabel: 'Seatbelt Violation',
    aiConfidenceScore: 91,
    timestamp: '2024-01-13T09:10:00Z',
    location: 'I-10 E, Los Angeles, CA',
    videoThumbnail: '🎥',
    disputeStatus: 'rejected',
    disputeReasonCode: 'cargo_check',
    disputeNote: 'Briefly leaned to check cargo shift.',
    managerAction: 'rejected',
    coachingScheduled: true,
  },
  {
    id: 'evt-007',
    driverId: 'drv-102',
    driverName: 'Priya Patel',
    eventType: 'distraction',
    aiLabel: 'Distracted Driving',
    aiConfidenceScore: 54,
    timestamp: '2024-01-12T11:20:00Z',
    location: 'US-101 S, San Francisco, CA',
    videoThumbnail: '🎥',
    disputeStatus: 'none',
  },
];
