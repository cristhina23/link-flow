"use client";

import { motion } from "framer-motion";
import { BarChart3, Clock3, Flame, Target, TimerReset } from "lucide-react";
import { MetricsCard } from "@/components/metrics-card";
import { useSession } from "@/components/session-provider";
import { formatHour } from "@/utils/productivity";
import dynamic from "next/dynamic";

const ProgressChart = dynamic(
  () => import("@/components/progress-chart").then((mod) => mod.ProgressChart),
  { ssr: false },
);

export default function AnalyticsPage() {
  const { session, metrics } = useSession();

  return (
    <motion.main
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="mx-auto w-full max-w-7xl space-y-6 p-4 lg:p-8"
    >
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-pink-500">
          Analytics & Performance
        </p>
        <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">
          Track your hourly rhythm.
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Observe when you work best, see average paces, and view daily goals.
        </p>
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

      <ProgressChart data={session.hourlyStats} />
    </motion.main>
  );
}
