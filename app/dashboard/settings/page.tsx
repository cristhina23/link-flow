"use client";

import { motion } from "framer-motion";
import { toast } from "sonner";
import { Minus, Plus, Settings, Target, Clock, Save } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSession } from "@/components/session-provider";

export default function SettingsPage() {
  const { session, setDailyGoal, setDailyHoursGoal } = useSession();
  
  // Fallbacks if older local session hasn't initialized the new hours goal
  const currentGoal = session.dailyGoal;
  const currentHoursGoal = session.dailyHoursGoal ?? 8;

  const handleSave = () => {
    toast.success("Settings updated! Your goals are synchronized.");
  };

  return (
    <motion.main
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="mx-auto w-full max-w-4xl space-y-6 p-4 lg:p-8"
    >
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-500">
          Preferences
        </p>
        <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">
          Workspace Settings
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Configure your daily targets, shift schedules, and check your database sync status.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Ticket Target Configuration Card */}
        <Card className="p-6 space-y-5">
          <div className="flex items-center gap-3">
            <div className="grid size-11 place-items-center rounded-2xl bg-orange-400/15 text-orange-500">
              <Target className="size-5" />
            </div>
            <div>
              <h2 className="font-bold text-lg">Daily Ticket Goal</h2>
              <p className="text-sm text-muted-foreground">Target volume per session</p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 rounded-2xl border bg-white/45 p-4 dark:bg-white/5">
            <Button
              variant="secondary"
              size="icon"
              className="size-10 rounded-xl"
              onClick={() => setDailyGoal(Math.max(1, currentGoal - 5))}
            >
              <Minus className="size-4" />
            </Button>
            <div className="text-center">
              <span className="text-3xl font-black">{currentGoal}</span>
              <span className="text-xs block text-muted-foreground">tickets</span>
            </div>
            <Button
              variant="secondary"
              size="icon"
              className="size-10 rounded-xl"
              onClick={() => setDailyGoal(currentGoal + 5)}
            >
              <Plus className="size-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <input
              type="range"
              min="5"
              max="150"
              step="5"
              value={currentGoal}
              onChange={(e) => setDailyGoal(parseInt(e.target.value))}
              className="w-full h-2 rounded-lg bg-orange-200 accent-orange-500 cursor-pointer dark:bg-zinc-800"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>5 tickets</span>
              <span>150 tickets</span>
            </div>
          </div>
        </Card>

        {/* Expected Work Hours Configuration Card */}
        <Card className="p-6 space-y-5">
          <div className="flex items-center gap-3">
            <div className="grid size-11 place-items-center rounded-2xl bg-pink-400/15 text-pink-500">
              <Clock className="size-5" />
            </div>
            <div>
              <h2 className="font-bold text-lg">Daily Work Hours</h2>
              <p className="text-sm text-muted-foreground">Expected shift length</p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 rounded-2xl border bg-white/45 p-4 dark:bg-white/5">
            <Button
              variant="secondary"
              size="icon"
              className="size-10 rounded-xl"
              onClick={() => setDailyHoursGoal(Math.max(1, currentHoursGoal - 1))}
            >
              <Minus className="size-4" />
            </Button>
            <div className="text-center">
              <span className="text-3xl font-black">{currentHoursGoal}</span>
              <span className="text-xs block text-muted-foreground">hours</span>
            </div>
            <Button
              variant="secondary"
              size="icon"
              className="size-10 rounded-xl"
              onClick={() => setDailyHoursGoal(Math.min(24, currentHoursGoal + 1))}
            >
              <Plus className="size-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <input
              type="range"
              min="1"
              max="24"
              step="1"
              value={currentHoursGoal}
              onChange={(e) => setDailyHoursGoal(parseInt(e.target.value))}
              className="w-full h-2 rounded-lg bg-pink-200 accent-pink-500 cursor-pointer dark:bg-zinc-800"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1 hour</span>
              <span>24 hours</span>
            </div>
          </div>
        </Card>
      </div>

     

      <div className="flex justify-end">
        <Button onClick={handleSave} className="gap-2 px-6" size="lg">
          <Save className="size-4" />
          Save Configurations
        </Button>
      </div>
    </motion.main>
  );
}
