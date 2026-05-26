"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const modes = [
    { value: "light", icon: Sun, label: "Light mode" },
    { value: "dark", icon: Moon, label: "Dark mode" },
    { value: "system", icon: Monitor, label: "System mode" },
  ];

  return (
    <div className="flex rounded-2xl border bg-white/50 p-1 dark:bg-white/10">
      {modes.map(({ value, icon: Icon, label }) => (
        <Button
          key={value}
          type="button"
          aria-label={label}
          title={label}
          variant={theme === value ? "default" : "ghost"}
          size="icon"
          className="size-9 rounded-xl"
          onClick={() => setTheme(value)}
        >
          <Icon className="size-4" />
        </Button>
      ))}
    </div>
  );
}
