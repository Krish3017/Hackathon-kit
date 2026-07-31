import React from "react";
import { Info } from "lucide-react";

export default function CampaignDataCard() {
  const sparklinePoints =
    "0,35 10,48 20,47 30,22 40,40 50,25 60,32 70,55 80,38 90,28 100,42 110,41 120,38 130,40 140,24 150,48 160,30 170,30 180,18 190,40 200,22 210,45 220,25 230,35";

  return (
    <div className="w-full bg-zinc-900/70 text-zinc-50 p-5 rounded-2xl border border-zinc-800/80 shadow-xl backdrop-blur flex flex-col justify-between">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-sm font-semibold text-zinc-200">
          <span>Campaign Data</span>
          <Info className="h-3.5 w-3.5 text-zinc-500 hover:text-zinc-300 cursor-pointer" />
        </div>
        <button className="px-3 py-1 rounded-lg border border-zinc-800 bg-zinc-950 text-xs font-medium text-zinc-200 hover:bg-zinc-800 transition-colors">
          Details
        </button>
      </div>

      {/* Main Metric Value & Pill Badge */}
      <div className="flex items-center gap-3 mt-3">
        <span className="text-2xl font-bold tracking-tight text-zinc-50">
          $1,750.00
        </span>
        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
          Last 28 days
        </span>
      </div>

      {/* Split Sparkline & Percentage Section matching Screenshot 2 */}
      <div className="mt-5 pt-3 border-t border-zinc-800/60 flex items-center justify-between">
        {/* Left Side: Jagged Sky Blue Sparkline */}
        <div className="flex-1 pr-4">
          <svg viewBox="0 0 230 60" className="w-full h-12 overflow-visible">
            <polyline
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={sparklinePoints}
            />
          </svg>
        </div>

        {/* Vertical Separator */}
        <div className="w-[1px] h-12 bg-zinc-800" />

        {/* Right Side: Percentage & Subtitle */}
        <div className="pl-5 flex flex-col justify-center min-w-[90px]">
          <span className="text-xl font-bold text-zinc-50 leading-none">
            45%
          </span>
          <span className="text-[11px] text-zinc-400 mt-1">
            $32.9K used
          </span>
        </div>
      </div>
    </div>
  );
}
