import type { Achievement, HourlyStat, WeeklyDay } from "@/types";

export const DEFAULT_GOAL = 40;

export const demoWeeklyData: WeeklyDay[] = [
  { day: "Mon", total: 38, goal: 40 },
  { day: "Tue", total: 44, goal: 40 },
  { day: "Wed", total: 31, goal: 40 },
  { day: "Thu", total: 52, goal: 40 },
  { day: "Fri", total: 46, goal: 40 },
  { day: "Sat", total: 18, goal: 25 },
  { day: "Sun", total: 0, goal: 25 },
];

export const achievements: Achievement[] = [
  {
    title: "Momentum builder",
    description: "Saved three productive sessions this week.",
  },
  {
    title: "Goal crusher",
    description: "Completed a daily ticket target.",
  },
  {
    title: "Prime hour",
    description: "Found your strongest productivity window.",
  },
];

export function getCurrentHour() {
  return new Date().getHours();
}

export function createEmptyHourlyStats(): HourlyStat[] {
  return Array.from({ length: 12 }, (_, index) => {
    const hour = Math.max(8, getCurrentHour() - 8) + index;
    return { hour: hour % 24, tickets: 0 };
  });
}

export function formatHour(hour: number) {
  const normalized = hour % 24;
  const suffix = normalized >= 12 ? "PM" : "AM";
  const display = normalized % 12 || 12;
  return `${display} ${suffix}`;
}

export function getMotivation(count: number, goal: number) {
  const remaining = Math.max(goal - count, 0);

  if (count >= goal) return "Goal completed! Amazing work!";
  if (remaining <= 8) return `Only ${remaining} tickets left!`;
  if (count === 0) return "You got this!";
  if (count / goal >= 0.5) return "Keep going, you're doing great!";
  return "Every ticket is momentum.";
}

export function getBestHour(hourlyStats: HourlyStat[]) {
  return hourlyStats.reduce(
    (best, stat) => (stat.tickets > best.tickets ? stat : best),
    hourlyStats[0] ?? { hour: getCurrentHour(), tickets: 0 },
  );
}

export function getWeeklyStats(days: WeeklyDay[]) {
  const weeklyTotal = days.reduce((sum, day) => sum + day.total, 0);
  const average = Math.round(weeklyTotal / days.length);
  const completeDays = days.filter((day) => day.total >= day.goal).length;
  const bestDay = days.reduce(
    (best, day) => (day.total > best.total ? day : best),
    days[0],
  );

  return {
    weeklyTotal,
    average,
    completionRate: Math.round((completeDays / days.length) * 100),
    bestDay: bestDay?.day ?? "n/a",
  };
}
