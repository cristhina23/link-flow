import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { DashboardApp } from "@/components/dashboard-app";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(251,146,60,0.22),transparent_34%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.18),transparent_30%),var(--background)]">
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="min-w-0 flex-1">
          <Header />
          <DashboardApp />
        </div>
      </div>
    </div>
  );
}
