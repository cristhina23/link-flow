import { BarChart3, Flame, Gauge, Link2, Trophy } from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: Gauge },
  { label: "Analytics", icon: BarChart3 },
  { label: "Streaks", icon: Flame },
  { label: "Badges", icon: Trophy },
];

export function Sidebar() {
  return (
    <aside className="hidden min-h-screen w-72 shrink-0 border-r bg-white/45 p-5 backdrop-blur-2xl dark:bg-white/[0.04] lg:block">
      <div className="flex items-center gap-3">
        <div className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-orange-400 via-pink-500 to-purple-500 text-white shadow-lg shadow-orange-500/25">
          <Link2 className="size-5" />
        </div>
        <div>
          <p className="text-lg font-bold">LinkFlow</p>
          <p className="text-xs text-muted-foreground">Productivity OS</p>
        </div>
      </div>
      <nav className="mt-10 space-y-2">
        {navItems.map(({ label, icon: Icon }, index) => (
          <a
            key={label}
            href={index === 0 ? "/dashboard" : "#weekly"}
            className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-muted-foreground transition hover:bg-white/70 hover:text-foreground dark:hover:bg-white/10"
          >
            <Icon className="size-4" />
            {label}
          </a>
        ))}
      </nav>
      <div className="mt-10 rounded-2xl border bg-gradient-to-br from-orange-500/15 via-pink-500/10 to-purple-500/15 p-4">
        <p className="text-sm font-semibold">Remote focus mode</p>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Track the work as it happens, then archive each session when your
          shift is ready for a clean handoff.
        </p>
      </div>
    </aside>
  );
}
