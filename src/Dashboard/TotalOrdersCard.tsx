import React, { useState, useEffect } from "react";
import { TrendingUp, ChevronDown, Activity, BarChart2 } from "lucide-react";

interface OrderDataPoint {
  date: string;
  orders: number;
  heightPercent: number;
}

const mockOrderPoints: OrderDataPoint[] = [
  { date: "01 Apr, 2025", orders: 110, heightPercent: 30 },
  { date: "02 Apr, 2025", orders: 130, heightPercent: 40 },
  { date: "03 Apr, 2025", orders: 145, heightPercent: 50 },
  { date: "04 Apr, 2025", orders: 160, heightPercent: 62 },
  { date: "05 Apr, 2025", orders: 205, heightPercent: 92 }, // Peak
  { date: "06 Apr, 2025", orders: 175, heightPercent: 75 },
  { date: "07 Apr, 2025", orders: 180, heightPercent: 78 },
  { date: "08 Apr, 2025", orders: 185, heightPercent: 80 },
  { date: "09 Apr, 2025", orders: 150, heightPercent: 65 },
  { date: "10 Apr, 2025", orders: 155, heightPercent: 68 },
  { date: "11 Apr, 2025", orders: 160, heightPercent: 70 },
  { date: "12 Apr, 2025", orders: 135, heightPercent: 55 },
  { date: "13 Apr, 2025", orders: 145, heightPercent: 62 },
  { date: "14 Apr, 2025", orders: 150, heightPercent: 65 },
  { date: "15 Apr, 2025", orders: 140, heightPercent: 60 },
  { date: "16 Apr, 2025", orders: 175, heightPercent: 78 },
  { date: "17 Apr, 2025", orders: 165, heightPercent: 72 },
  { date: "18 Apr, 2025", orders: 155, heightPercent: 68 },
  { date: "19 Apr, 2025", orders: 130, heightPercent: 55 },
  { date: "20 Apr, 2025", orders: 166, heightPercent: 70 },
];

export default function TotalOrdersCard() {
  const [viewMode, setViewMode] = useState<"line" | "bar">("line");
  const [timeRange, setTimeRange] = useState("Past 30 days");
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null); // Default null: no stuck tooltip!
  const [isLoading, setIsLoading] = useState(true);

  // Loading motion animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const activePoint = hoveredIdx !== null ? mockOrderPoints[hoveredIdx] : null;

  return (
    <div
      onMouseLeave={() => setHoveredIdx(null)}
      className="w-full h-full bg-[#111113] text-zinc-50 p-3.5 rounded-2xl border border-zinc-800/80 hover:border-zinc-700/80 transition-all duration-200 shadow-xl relative overflow-hidden select-none flex flex-col justify-between"
    >
      {/* Loading Motion Shimmer Banner */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-800/30 to-transparent -translate-x-full animate-[shimmer_1.2s_infinite] z-30 pointer-events-none" />
      )}

      {/* Whole Card Matrix Background Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#10b98120_1px,transparent_1px)] [bg-size:12px_12px] opacity-80" />

      {/* BACKGROUND CHART */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden pt-12 pb-8 px-2">
        {/* LINE VIEW BACKGROUND */}
        {viewMode === "line" && (
          <svg viewBox="0 0 400 120" className="w-full h-full overflow-visible pointer-events-none">
            <defs>
              <linearGradient id="fullCardEmeraldGradCompact" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            <path
              d="M 0,110 Q 30,100 50,80 T 90,70 T 120,15 T 150,35 T 180,35 T 210,55 T 240,35 T 270,25 T 300,55 T 330,60 Q 360,65 400,55 L 400,120 L 0,120 Z"
              fill="url(#fullCardEmeraldGradCompact)"
              className="pointer-events-none"
            />
            <path
              d="M 0,110 Q 30,100 50,80 T 90,70 T 120,15 T 150,35 T 180,35 T 210,55 T 240,35 T 270,25 T 300,55 T 330,60 Q 360,65 400,55"
              fill="none"
              stroke="#34d399"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="600"
              strokeDashoffset={isLoading ? "600" : "0"}
              className="transition-all duration-1000 ease-out pointer-events-none"
            />

            {/* Dynamic Active Circle Dot ONLY rendered on active hover */}
            {activePoint && !isLoading && (
              <circle
                cx={(hoveredIdx! / (mockOrderPoints.length - 1)) * 390 + 5}
                cy={120 - (activePoint.heightPercent / 100) * 105}
                r="4.5"
                fill="#a7f3d0"
                stroke="#10b981"
                strokeWidth="1.5"
                className="shadow-[0_0_10px_rgba(52,211,153,0.9)] transition-all duration-150 pointer-events-none"
              />
            )}
          </svg>
        )}

        {/* BAR VIEW BACKGROUND */}
        {viewMode === "bar" && (
          <div className="w-full h-full flex items-end justify-between gap-1 pt-6 px-1 pointer-events-none">
            {mockOrderPoints.map((pt, i) => {
              const isCurrent = hoveredIdx === i;
              const currentHeight = isLoading ? "0%" : `${pt.heightPercent}%`;

              return (
                <div
                  key={i}
                  style={{
                    height: currentHeight,
                    transitionDelay: `${i * 30}ms`,
                  }}
                  className={`w-full rounded-t-xs transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) ${
                    isCurrent
                      ? "bg-emerald-300 shadow-[0_0_12px_rgba(52,211,153,0.9)] scale-y-105"
                      : "bg-emerald-500/60"
                  }`}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Invisible Interactive Hover Overlay Hitboxes */}
      <div
        onMouseLeave={() => setHoveredIdx(null)}
        className="absolute inset-0 w-full h-full z-10 flex"
      >
        {mockOrderPoints.map((_, i) => (
          <div
            key={i}
            onMouseEnter={() => !isLoading && setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
            className="flex-1 h-full cursor-pointer"
          />
        ))}
      </div>

      {/* Dynamic Tooltip ONLY rendered on active hover */}
      {activePoint && !isLoading && (
        <div
          style={{
            left: `${Math.min(75, Math.max(10, (hoveredIdx! / mockOrderPoints.length) * 100))}%`,
          }}
          className="absolute top-14 bg-zinc-900/95 border border-zinc-700/80 rounded-lg px-2.5 py-1 shadow-2xl z-30 transition-all duration-150 pointer-events-none text-left"
        >
          <div className="text-[11px] font-bold text-zinc-100">{activePoint.orders} orders</div>
          <div className="text-[9px] text-zinc-400">{activePoint.date}</div>
        </div>
      )}

      {/* CARD CONTENT OVERLAY */}
      <div className="flex items-start justify-between relative z-20 pointer-events-none">
        <div>
          <div className="flex items-center gap-2 pointer-events-auto">
            <h3 className="text-xs font-semibold text-zinc-100">Total orders</h3>
            {/* View Switcher Toggle */}
            <div className="flex items-center bg-zinc-900/90 border border-zinc-800 p-0.5 rounded-md text-zinc-400">
              <button
                onClick={() => setViewMode("line")}
                aria-label="Line View"
                className={`p-0.5 rounded transition-colors ${
                  viewMode === "line"
                    ? "bg-zinc-800 text-zinc-100"
                    : "hover:text-zinc-200"
                }`}
              >
                <Activity className="h-3 w-3" />
              </button>
              <button
                onClick={() => setViewMode("bar")}
                aria-label="Bar View"
                className={`p-0.5 rounded transition-colors ${
                  viewMode === "bar"
                    ? "bg-zinc-800 text-zinc-100"
                    : "hover:text-zinc-200"
                }`}
              >
                <BarChart2 className="h-3 w-3" />
              </button>
            </div>
          </div>
          <div className="text-2xl font-black tracking-tight text-zinc-50 mt-1">
            3.15K
          </div>
        </div>

        {/* Growth Badge & Dropdown in Top Right Corner */}
        <div className="flex items-center gap-1.5 text-[10px] pointer-events-auto">
          <span className="flex items-center font-semibold text-emerald-400">
            <TrendingUp className="h-3 w-3 mr-0.5" />
            66.0%
          </span>
          <button
            onClick={() => setTimeRange(timeRange === "Past 30 days" ? "Past 7 days" : "Past 30 days")}
            className="flex items-center gap-0.5 text-zinc-400 hover:text-zinc-200 font-medium bg-zinc-900/80 border border-zinc-800 px-1.5 py-0.5 rounded-md"
          >
            <span>{timeRange}</span>
            <ChevronDown className="h-2.5 w-2.5" />
          </button>
        </div>
      </div>

      {/* Footer Stats Row at bottom of Card */}
      <div className="flex items-center justify-between text-[10px] text-zinc-400 border-t border-zinc-800/60 pt-1.5 relative z-20 mt-8 pointer-events-none">
        <span className="text-emerald-400 font-semibold">+4 today</span>
        <div className="flex items-center gap-1">
          <span><strong className="text-zinc-200">205</strong> peak</span>
          <span>•</span>
          <span><strong className="text-zinc-200">100</strong> low</span>
          <span>•</span>
          <span><strong className="text-zinc-200">166</strong> avg</span>
        </div>
      </div>
    </div>
  );
}
