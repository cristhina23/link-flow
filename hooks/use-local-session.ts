"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { WorkSessionDraft } from "@/types";
import {
  createEmptyHourlyStats,
  DEFAULT_GOAL,
  getBestHour,
  getCurrentHour,
} from "@/utils/productivity";

const STORAGE_KEY = "linkflow:active-session";

function getInitialSession(): WorkSessionDraft {
  return {
    currentTickets: 0,
    dailyGoal: DEFAULT_GOAL,
    dailyHoursGoal: 8,
    hourlyStats: createEmptyHourlyStats(),
    startedAt: new Date().toISOString(),
    streak: 4,
  };
}

export function useLocalSession() {
  const [session, setSession] = useState<WorkSessionDraft>(() => {
    if (typeof window === "undefined") return getInitialSession();

    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return { ...getInitialSession(), ...JSON.parse(saved) };
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }

    return getInitialSession();
  });
  const [now, setNow] = useState(() => new Date().getTime());

  useEffect(() => {
    const interval = window.setInterval(() => setNow(new Date().getTime()), 60000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  }, [session]);

  const updateCurrentHour = useCallback((delta: number) => {
    setSession((current) => {
      const hour = getCurrentHour();
      const hourlyStats = current.hourlyStats.some((stat) => stat.hour === hour)
        ? current.hourlyStats.map((stat) =>
            stat.hour === hour
              ? { ...stat, tickets: Math.max(stat.tickets + delta, 0) }
              : stat,
          )
        : [...current.hourlyStats.slice(1), { hour, tickets: Math.max(delta, 0) }];

      return {
        ...current,
        currentTickets: Math.max(current.currentTickets + delta, 0),
        hourlyStats,
      };
    });
  }, []);

  const resetSession = useCallback(() => {
    const fresh = getInitialSession();
    setSession(fresh);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
  }, []);

  const metrics = useMemo(() => {
    const bestHour = getBestHour(session.hourlyStats);
    const elapsedHours = Math.max(
      (now - new Date(session.startedAt).getTime()) / 1000 / 60 / 60,
      1,
    );

    return {
      bestHour,
      thisHour:
        session.hourlyStats.find((stat) => stat.hour === getCurrentHour())
          ?.tickets ?? 0,
      averagePerHour: Math.round(session.currentTickets / elapsedHours),
      remaining: Math.max(session.dailyGoal - session.currentTickets, 0),
      progress: Math.round((session.currentTickets / session.dailyGoal) * 100),
      elapsedHours,
    };
  }, [now, session]);

  return {
    session,
    metrics,
    increment: () => updateCurrentHour(1),
    decrement: () => updateCurrentHour(-1),
    resetSession,
    setDailyGoal: (dailyGoal: number) =>
      setSession((current) => ({ ...current, dailyGoal })),
    setDailyHoursGoal: (dailyHoursGoal: number) =>
      setSession((current) => ({ ...current, dailyHoursGoal: Math.max(1, dailyHoursGoal) })),
  };
}
