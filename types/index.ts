export type HourlyStat = {
  hour: number;
  tickets: number;
};

export type WorkSessionDraft = {
  currentTickets: number;
  dailyGoal: number;
  dailyHoursGoal?: number;
  hourlyStats: HourlyStat[];
  startedAt: string;
  streak: number;
};

export type SavedSessionPayload = {
  date: string;
  totalTickets: number;
  dailyGoal: number;
  totalHours: number;
  averagePerHour: number;
  hourlyStats: HourlyStat[];
};

export type WeeklyDay = {
  day: string;
  total: number;
  goal: number;
};

export type Achievement = {
  title: string;
  description: string;
  unlockedAt?: string;
};
