"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { BarChart3, Clock3, Flame, Target, TimerReset } from "lucide-react";
import { CounterCard } from "@/components/counter-card";
import { MetricsCard } from "@/components/metrics-card";
import { MotivationBanner } from "@/components/motivation-banner";
import { useLocalSession } from "@/hooks/use-local-session";
import {
  achievements,
  demoWeeklyData,
  formatHour,
  getMotivation,
} from "@/utils/productivity";

const ProgressChart = dynamic(
  () => import("@/components/progress-chart").then((mod) => mod.ProgressChart),
  { ssr: false },
);

const WeeklySummary = dynamic(
  () => import("@/components/weekly-summary").then((mod) => mod.WeeklySummary),
  { ssr: false },
);

export function DashboardApp() {
  const {
    session,
    metrics,
    increment,
    decrement,
    resetSession,
  } = useLocalSession();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement) return;
      if (event.key === "+" || event.key === "=") increment();
      if (event.key === "-") decrement();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [decrement, increment]);

  const motivation = getMotivation(session.currentTickets, session.dailyGoal);

  return (
    <motion.main
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="mx-auto w-full max-w-7xl space-y-6 p-4 lg:p-8"
    >
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-500">
            LinkFlow workspace
          </p>
          <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">
            Keep your ticket flow visible.
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Count reviewed links, save finished sessions, and watch your hourly
            rhythm turn into better remote-work streaks.
          </p>
        </div>
        <div className="rounded-2xl border bg-white/55 px-4 py-3 text-sm shadow-sm dark:bg-white/10">
          <span className="font-semibold">Shortcuts:</span>{" "}
          <span className="text-muted-foreground">+ add, - subtract</span>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_.6fr]">
        <CounterCard
          count={session.currentTickets}
          goal={session.dailyGoal}
          progress={metrics.progress}
          hourlyStats={session.hourlyStats}
          totalHours={metrics.elapsedHours}
          averagePerHour={metrics.averagePerHour}
          onIncrement={increment}
          onDecrement={decrement}
          onSaved={resetSession}
        />
        <MotivationBanner
          message={motivation}
          progress={metrics.progress}
          streak={session.streak}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <MetricsCard
          title="This hour"
          value={`${metrics.thisHour}`}
          detail="Tickets completed during the current hour."
          icon={Clock3}
          tone="orange"
        />
        <MetricsCard
          title="Average/hour"
          value={`${metrics.averagePerHour}`}
          detail="Pace from the active session window."
          icon={BarChart3}
          tone="pink"
        />
        <MetricsCard
          title="Best hour"
          value={formatHour(metrics.bestHour.hour)}
          detail={`${metrics.bestHour.tickets} tickets in that window.`}
          icon={Flame}
          tone="purple"
        />
        <MetricsCard
          title="Daily total"
          value={`${session.currentTickets}`}
          detail="Current unsaved session total."
          icon={Target}
          tone="blue"
        />
        <MetricsCard
          title="Remaining"
          value={`${metrics.remaining}`}
          detail="Tickets left until goal completion."
          icon={TimerReset}
          tone="green"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[.9fr_1.1fr]">
        <ProgressChart data={session.hourlyStats} />
        <WeeklySummary days={demoWeeklyData} achievements={achievements} />
      </div>
    </motion.main>
  );
}
