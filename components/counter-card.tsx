"use client";

import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SaveSessionButton } from "@/components/save-session-button";
import type { HourlyStat, SavedSessionPayload } from "@/types";

type CounterCardProps = {
  count: number;
  goal: number;
  progress: number;
  hourlyStats: HourlyStat[];
  totalHours: number;
  averagePerHour: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onSaved: () => void;
};

export function CounterCard({
  count,
  goal,
  progress,
  hourlyStats,
  totalHours,
  averagePerHour,
  onIncrement,
  onDecrement,
  onSaved,
}: CounterCardProps) {
  const circumference = 2 * Math.PI * 74;
  const offset = circumference - (Math.min(progress, 100) / 100) * circumference;
  const payload: SavedSessionPayload = {
    date: new Date().toISOString().slice(0, 10),
    totalTickets: count,
    dailyGoal: goal,
    totalHours,
    averagePerHour,
    hourlyStats,
  };

  return (
    <Card className="relative overflow-hidden p-6">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 via-pink-500/10 to-purple-600/20" />
      <div className="relative grid gap-7 lg:grid-cols-[1fr_220px]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Live ticket counter
          </p>
          <motion.p
            key={count}
            initial={{ scale: 0.92, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mt-5 text-8xl font-black tracking-tight sm:text-9xl"
          >
            {count}
          </motion.p>
          <p className="mt-2 text-sm text-muted-foreground">
            {Math.max(goal - count, 0)} tickets remaining toward a {goal} ticket
            daily goal.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              type="button"
              size="lg"
              variant="secondary"
              aria-label="Decrease ticket count"
              title="Decrease ticket count"
              onClick={onDecrement}
            >
              <Minus className="size-5" />
            </Button>
            <Button
              type="button"
              size="lg"
              aria-label="Increase ticket count"
              title="Increase ticket count"
              onClick={onIncrement}
            >
              <Plus className="size-5" />
              Add ticket
            </Button>
            <SaveSessionButton payload={payload} onSaved={onSaved} />
          </div>
        </div>
        <div className="grid place-items-center">
          <div className="relative size-48">
            <svg className="size-48 -rotate-90" viewBox="0 0 180 180">
              <circle
                cx="90"
                cy="90"
                r="74"
                stroke="currentColor"
                strokeWidth="16"
                className="text-black/10 dark:text-white/10"
                fill="none"
              />
              <motion.circle
                cx="90"
                cy="90"
                r="74"
                stroke="url(#goalGradient)"
                strokeWidth="16"
                strokeLinecap="round"
                fill="none"
                strokeDasharray={circumference}
                animate={{ strokeDashoffset: offset }}
                transition={{ type: "spring", stiffness: 80, damping: 18 }}
              />
              <defs>
                <linearGradient id="goalGradient" x1="0" x2="1" y1="0" y2="1">
                  <stop stopColor="#fb923c" />
                  <stop offset="0.55" stopColor="#ec4899" />
                  <stop offset="1" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 grid place-items-center text-center">
              <div>
                <p className="text-4xl font-black">{Math.min(progress, 100)}%</p>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Goal
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
