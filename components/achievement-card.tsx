import { Trophy } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { Achievement } from "@/types";

type AchievementCardProps = {
  achievement: Achievement;
};

export function AchievementCard({ achievement }: AchievementCardProps) {
  return (
    <Card className="flex items-start gap-3 p-4">
      <div className="grid size-10 shrink-0 place-items-center rounded-2xl bg-orange-400/15 text-orange-500">
        <Trophy className="size-5" />
      </div>
      <div>
        <p className="font-semibold">{achievement.title}</p>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          {achievement.description}
        </p>
      </div>
    </Card>
  );
}
