import { cn } from "@/lib/utils";

type ProgressProps = {
  value: number;
  className?: string;
};

export function Progress({ value, className }: ProgressProps) {
  const safeValue = Math.min(Math.max(value, 0), 100);

  return (
    <div
      className={cn(
        "h-2 overflow-hidden rounded-full bg-black/10 dark:bg-white/10",
        className,
      )}
    >
      <div
        className="h-full rounded-full bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 transition-all duration-500"
        style={{ width: `${safeValue}%` }}
      />
    </div>
  );
}
