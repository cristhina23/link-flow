import { Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type MotivationBannerProps = {
  message: string;
  progress: number;
  streak: number;
};

export function MotivationBanner({
  message,
  progress,
  streak,
}: MotivationBannerProps) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="relative p-5">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 via-pink-400/10 to-purple-500/20" />
        <div className="relative flex items-center gap-4">
          <div className="grid size-12 place-items-center rounded-2xl bg-white/70 text-orange-500 shadow-sm dark:bg-white/10">
            <Sparkles className="size-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-lg font-bold">{message}</p>
            <p className="text-sm text-muted-foreground">
              {streak} day streak active
            </p>
          </div>
        </div>
        <Progress value={progress} className="relative mt-5" />
      </div>
    </Card>
  );
}
