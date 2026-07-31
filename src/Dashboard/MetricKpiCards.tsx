import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export interface KpiCardData {
  value: string;
  label: string;
  change: string;
  period: string;
  isPositive: boolean;
}

const defaultKpis: KpiCardData[] = [
  {
    value: "57%",
    label: "Team member showed up",
    change: "+32%",
    period: "from last week",
    isPositive: true,
  },
  {
    value: "7%",
    label: "Bugs reported",
    change: "-15%",
    period: "from last month",
    isPositive: false, // negative change shown in rose red
  },
  {
    value: "59%",
    label: "Server Uptime",
    change: "+0.5%",
    period: "from last 24h",
    isPositive: true,
  },
];

export default function MetricKpiCards({ kpis = defaultKpis }: { kpis?: KpiCardData[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 w-full">
      {kpis.map((kpi, idx) => (
        <div
          key={idx}
          className="bg-[#141416] text-zinc-50 p-5 sm:p-6 rounded-2xl border border-zinc-800/80 shadow-xl backdrop-blur flex flex-col justify-between"
        >
          <div>
            <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-50">
              {kpi.value}
            </div>
            <div className="text-sm text-zinc-400 mt-2 font-medium">
              {kpi.label}
            </div>
          </div>

          <div className="flex items-center gap-2 mt-6">
            <div
              className={`h-6 w-6 rounded-full flex items-center justify-center border ${
                kpi.isPositive
                  ? "bg-emerald-950/80 text-emerald-400 border-emerald-800/40"
                  : "bg-rose-950/80 text-rose-400 border-rose-800/40"
              }`}
            >
              {kpi.isPositive ? (
                <ArrowUpRight className="h-3.5 w-3.5" />
              ) : (
                <ArrowDownRight className="h-3.5 w-3.5" />
              )}
            </div>

            <span
              className={`text-xs font-semibold ${
                kpi.isPositive ? "text-emerald-400" : "text-rose-400"
              }`}
            >
              {kpi.change}
            </span>
            <span className="text-xs text-zinc-400 font-medium">
              {kpi.period}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
