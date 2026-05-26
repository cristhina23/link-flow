import { UserButton } from "@clerk/nextjs";
import { Bell, Command, Search } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b bg-background/75 px-4 py-3 backdrop-blur-2xl lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <div className="hidden min-w-0 items-center gap-3 rounded-2xl border bg-white/55 px-4 py-2 text-sm text-muted-foreground shadow-sm dark:bg-white/10 md:flex md:w-96">
          <Search className="size-4 shrink-0" />
          <span className="truncate">Search sessions, streaks, or goals</span>
          <Command className="ml-auto size-4 shrink-0" />
        </div>
        <div className="md:hidden">
          <p className="text-sm font-semibold">Today</p>
          <p className="text-xs text-muted-foreground">Live session</p>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="secondary" size="icon" aria-label="Notifications">
            <Bell className="size-4" />
          </Button>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "size-11",
              },
            }}
          />
        </div>
      </div>
    </header>
  );
}
