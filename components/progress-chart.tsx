"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "@/components/ui/card";
import type { HourlyStat } from "@/types";
import { formatHour } from "@/utils/productivity";

type ProgressChartProps = {
  data: HourlyStat[];
};

export function ProgressChart({ data }: ProgressChartProps) {
  const chartData = data.map((stat) => ({
    ...stat,
    label: formatHour(stat.hour),
  }));

  return (
    <Card className="h-80">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Daily progress</h2>
          <p className="text-sm text-muted-foreground">
            Hourly ticket flow for the active session
          </p>
        </div>
      </div>
      <div className="h-60 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ left: -20, right: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, .25)" />
            <XAxis dataKey="label" tickLine={false} axisLine={false} fontSize={12} />
            <YAxis tickLine={false} axisLine={false} fontSize={12} />
            <Tooltip
              contentStyle={{
                borderRadius: 16,
                border: "1px solid rgba(148, 163, 184, .25)",
                background: "rgba(15, 23, 42, .92)",
                color: "white",
              }}
            />
            <Line
              type="monotone"
              dataKey="tickets"
              stroke="#f97316"
              strokeWidth={4}
              dot={{ r: 4, strokeWidth: 2, fill: "#fff" }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
