import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <section
      className={cn("glass-card rounded-2xl p-5 text-card-foreground", className)}
      {...props}
    />
  );
}
