"use client";

import { motion, Variants } from "framer-motion";
import { AchievementCard } from "@/components/achievement-card";
import { achievements } from "@/utils/productivity";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 14 } },
};

export default function BadgesPage() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="mx-auto w-full max-w-7xl space-y-6 p-4 lg:p-8"
    >
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-500">
          Achievements & Badges
        </p>
        <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">
          Celebrate your milestones.
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Unlock rewards and build consistency with each productive session.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {achievements.map((achievement) => (
          <motion.div key={achievement.title} variants={itemVariants}>
            <AchievementCard achievement={achievement} />
          </motion.div>
        ))}
      </motion.div>
    </motion.main>
  );
}
