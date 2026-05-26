"use client";

import { motion } from "framer-motion";
import { demoWeeklyData } from "@/utils/productivity";
import dynamic from "next/dynamic";

const WeeklySummary = dynamic(
  () => import("@/components/weekly-summary").then((mod) => mod.WeeklySummary),
  { ssr: false },
);

export default function StreaksPage() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="mx-auto w-full max-w-7xl space-y-6 p-4 lg:p-8"
    >
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-purple-500">
          Streaks & Performance
        </p>
        <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">
          Maintain your daily flow.
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Analyze historical ticket volumes, streaks, and target completions.
        </p>
      </div>

      <WeeklySummary days={demoWeeklyData} achievements={[]} showAchievements={false} />
    </motion.main>
  );
}
