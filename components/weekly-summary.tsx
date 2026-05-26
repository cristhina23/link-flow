"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AchievementCard } from "@/components/achievement-card";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import type { Achievement, WeeklyDay } from "@/types";
import { getWeeklyStats } from "@/utils/productivity";

type WeeklySummaryProps = {
  days: WeeklyDay[];
  achievements: Achievement[];
  showAchievements?: boolean;
};

export function WeeklySummary({
  days,
  achievements,
  showAchievements = true,
}: WeeklySummaryProps) {
  const [open, setOpen] = useState(true);
  const stats = getWeeklyStats(days);

  return (
    <Card id="weekly" className="p-0">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-4 p-5 text-left"
      >
        <div>
          <h2 className="text-xl font-bold">Weekly statistics</h2>
          <p className="text-sm text-muted-foreground">
            Totals, streaks, goal completion, and achievement progress
          </p>
        </div>
        <ChevronDown
          className={cn("size-5 transition-transform", open && "rotate-180")}
        />
      </button>
      {open ? (
        <div className={cn("grid gap-5 border-t p-5", showAchievements ? "xl:grid-cols-[1.2fr_.8fr]" : "grid-cols-1")}>
          <div>
            <div className="grid gap-3 sm:grid-cols-4">
              {[
                ["Weekly total", stats.weeklyTotal],
                ["Avg/day", stats.average],
                ["Goal rate", `${stats.completionRate}%`],
                ["Best day", stats.bestDay],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border bg-white/45 p-4 dark:bg-white/5">
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="mt-2 text-2xl font-bold">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={days}>
                  <XAxis dataKey="day" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 16,
                      background: "rgba(15, 23, 42, .92)",
                      border: "1px solid rgba(148, 163, 184, .25)",
                      color: "white",
                    }}
                  />
                  <Bar dataKey="total" radius={[12, 12, 4, 4]} fill="#ec4899" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-5 space-y-3">
              {days.map((day) => (
                <div key={day.day}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span>{day.day}</span>
                    <span className="text-muted-foreground">
                      {day.total}/{day.goal}
                    </span>
                  </div>
                  <Progress value={(day.total / day.goal) * 100} />
                </div>
              ))}
            </div>
          </div>
          {showAchievements && (
            <div className="space-y-3">
              {achievements.map((achievement) => (
                <AchievementCard
                  key={achievement.title}
                  achievement={achievement}
                />
              ))}
            </div>
          )}
        </div>
      ) : null}
    </Card>
  );
}
