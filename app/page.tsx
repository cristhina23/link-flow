import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { ArrowRight, BarChart3, Link2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export default async function HomePage() {
  const { userId } = await auth();
  const isSignedIn = Boolean(userId);

  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_20%_10%,rgba(251,146,60,0.25),transparent_28%),radial-gradient(circle_at_80%_0%,rgba(236,72,153,0.18),transparent_26%),var(--background)]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
        <Link href="/" className="flex items-center gap-3">
          <div className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-orange-400 via-pink-500 to-purple-500 text-white shadow-lg shadow-orange-500/25">
            <Link2 className="size-5" />
          </div>
          <span className="text-lg font-black">LinkFlow</span>
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {!isSignedIn ? (
            <SignInButton mode="modal">
              <Button type="button">Sign in</Button>
            </SignInButton>
          ) : (
            <Link href="/dashboard">
              <Button type="button">Dashboard</Button>
            </Link>
          )}
        </div>
      </nav>

      <section className="mx-auto grid min-h-[calc(100vh-88px)] max-w-7xl items-center gap-10 px-5 pb-16 lg:grid-cols-[1fr_.85fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">
            Remote productivity tracking
          </p>
          <h1 className="mt-4 max-w-4xl text-5xl font-black tracking-tight sm:text-7xl">
            LinkFlow
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            A warm, focused dashboard for remote workers who review tickets,
            links, and tasks all day. Count the work, save the session, and let
            your best hours reveal themselves.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {!isSignedIn ? (
              <SignInButton mode="modal">
                <Button type="button" size="lg">
                  Continue with Google
                  <ArrowRight className="size-5" />
                </Button>
              </SignInButton>
            ) : (
              <Link href="/dashboard">
                <Button type="button" size="lg">
                  Open dashboard
                  <ArrowRight className="size-5" />
                </Button>
              </Link>
            )}
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5">
          <div className="rounded-2xl bg-gradient-to-br from-slate-950 via-[#21142f] to-[#401c36] p-5 text-white shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/60">Today</p>
                <p className="text-3xl font-black">32 tickets</p>
              </div>
              <div className="rounded-full bg-orange-400/20 px-3 py-1 text-sm text-orange-200">
                80% goal
              </div>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                ["Hour", "9"],
                ["Avg/hr", "18"],
                ["Streak", "4d"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs text-white/50">{label}</p>
                  <p className="mt-2 text-2xl font-bold">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 h-36 rounded-2xl bg-white/10 p-4">
              <div className="flex h-full items-end gap-2">
                {[28, 45, 34, 76, 54, 88, 67, 96].map((height, index) => (
                  <div
                    key={index}
                    className="flex-1 rounded-t-xl bg-gradient-to-t from-orange-400 to-pink-400"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-4">
                <ShieldCheck className="size-5 text-orange-300" />
                <span className="text-sm">Clerk protected</span>
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-4">
                <BarChart3 className="size-5 text-pink-300" />
                <span className="text-sm">Recharts analytics</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
