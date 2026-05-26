import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type MetricsCardProps = {
  title: string;
  value: string;
  detail: string;
  icon: LucideIcon;
  tone?: "orange" | "pink" | "purple" | "blue" | "green";
};

const tones = {
  orange: "from-orange-400/20 to-amber-300/10 text-orange-500",
  pink: "from-pink-400/20 to-rose-300/10 text-pink-500",
  purple: "from-purple-400/20 to-fuchsia-300/10 text-purple-500",
  blue: "from-sky-400/20 to-indigo-300/10 text-sky-500",
  green: "from-emerald-400/20 to-lime-300/10 text-emerald-500",
};

export function MetricsCard({
  title,
  value,
  detail,
  icon: Icon,
  tone = "orange",
}: MetricsCardProps) {
  return (
    <Card className="min-h-36 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="mt-3 text-3xl font-bold tracking-tight">{value}</p>
        </div>
        <div
          className={cn(
            "grid size-11 place-items-center rounded-2xl bg-gradient-to-br",
            tones[tone],
          )}
        >
          <Icon className="size-5" />
        </div>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">{detail}</p>
    </Card>
  );
}
