// timeUtils.ts

// Types
export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night';

export interface TimeState {
  hour: number;
  minute: number;
  isDaytime: boolean;
  timeOfDay: TimeOfDay;
}

// Constants
export const TIME_RANGES = {
  MORNING: { start: 5, end: 12 },
  AFTERNOON: { start: 12, end: 17 },
  EVENING: { start: 17, end: 20 },
  DAYTIME: { start: 6, end: 18 }
} as const;

// Utility functions
export const parseTime = (timeString: string): TimeState => {
  if (typeof timeString !== 'string') {
    throw new Error('Invalid time string');
  }
  const [hours, minutes] = timeString.split(':').map(Number);
  
  return {
    hour: hours,
    minute: minutes,
    isDaytime: hours >= TIME_RANGES.DAYTIME.start && hours < TIME_RANGES.DAYTIME.end,
    timeOfDay: getTimeOfDay(hours)
  };
};

export const getTimeOfDay = (hours: number): TimeOfDay => {
  if (hours >= TIME_RANGES.MORNING.start && hours < TIME_RANGES.MORNING.end) return 'morning';
  if (hours >= TIME_RANGES.AFTERNOON.start && hours < TIME_RANGES.AFTERNOON.end) return 'afternoon';
  if (hours >= TIME_RANGES.EVENING.start && hours < TIME_RANGES.EVENING.end) return 'evening';
  return 'night';
};

export const formatTime = (timeState: TimeState): string => {
  const { hour, minute } = timeState;
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
};

export const isNightTime = (timeState: TimeState): boolean => !timeState.isDaytime;

export const getTimeLabel = (timeOfDay: TimeOfDay): string => {
  const labels = {
    morning: 'Mañana',
    afternoon: 'Tarde',
    evening: 'Atardecer',
    night: 'Noche'
  };
  return labels[timeOfDay];
};