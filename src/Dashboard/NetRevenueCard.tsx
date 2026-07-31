import React, { useState, useEffect } from "react";
import { TrendingUp } from "lucide-react";

interface DaySales {
  day: string;
  sales: string;
  rawSales: number;
  heightPercent: number;
}

const revenueData: DaySales[] = [
  { day: "Mon", sales: "2,850", rawSales: 2850, heightPercent: 52 },
  { day: "Tue", sales: "2,410", rawSales: 2410, heightPercent: 46 },
  { day: "Wed", sales: "3,520", rawSales: 3520, heightPercent: 64 },
  { day: "Thu", sales: "4,004", rawSales: 4004, heightPercent: 72 },
  { day: "Fri", sales: "4,820", rawSales: 4820, heightPercent: 84 },
  { day: "Sat", sales: "3,910", rawSales: 3910, heightPercent: 70 },
  { day: "Sun", sales: "5,640", rawSales: 5640, heightPercent: 96 },
];

export default function NetRevenueCard() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Smooth loading animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const activeItem = hoveredIdx !== null ? revenueData[hoveredIdx] : null;

  return (
    <div
      onMouseLeave={() => setHoveredIdx(null)}
      className="w-full h-full bg-[#111113] text-zinc-50 p-3.5 rounded-xl border border-zinc-800/80 hover:border-zinc-700/80 transition-all duration-200 shadow-xl backdrop-blur flex flex-col justify-between select-none relative overflow-hidden"
    >
      {/* Loading Motion Shimmer Banner */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-800/30 to-transparent -translate-x-full animate-[shimmer_1.2s_infinite] z-20 pointer-events-none" />
      )}

      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h3 className="text-xs font-semibold text-zinc-100">Net revenue</h3>
          <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-full flex items-center">
            <TrendingUp className="h-3 w-3 mr-0.5" />
            66.9%
          </span>
        </div>
        <p className="text-[10px] text-zinc-400 mt-0.5">Daily net sales, last 7 days.</p>
      </div>

      {/* Main Bar Chart Container */}
      <div className="mt-2 mb-1 h-28 relative flex items-end justify-between gap-2 px-1 border-b border-zinc-800/80 pb-1">
        {/* Floating Dark Tooltip */}
        {activeItem && !isLoading && (
          <div
            style={{
              left: `${(hoveredIdx! / (revenueData.length - 1)) * 75 + 5}%`,
            }}
            className="absolute top-1 -translate-x-1/2 bg-black/90 border border-zinc-700/80 rounded-lg px-2.5 py-1 shadow-2xl z-30 pointer-events-none flex items-center gap-2 transition-all duration-150"
          >
            <div className="flex items-center gap-1 text-[11px] text-zinc-300">
              <span className="h-2 w-2 rounded-xs bg-zinc-300 inline-block" />
              <span>Sales</span>
            </div>
            <span className="text-[11px] font-bold text-zinc-50">{activeItem.sales}</span>
          </div>
        )}

        {/* 7 Metallic Bar Chart items with Loading Entrance Motion */}
        {revenueData.map((item, i) => {
          const isHovered = hoveredIdx === i;
          const currentHeight = isLoading ? "0%" : `${item.heightPercent}%`;

          return (
            <div
              key={i}
              onMouseEnter={() => !isLoading && setHoveredIdx(i)}
              className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
            >
              <div
                style={{
                  height: currentHeight,
                  transitionDelay: `${i * 60}ms`,
                }}
                className={`w-full rounded-t-xs transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) ${
                  isHovered
                    ? "bg-gradient-to-t from-zinc-700 via-zinc-300 to-white shadow-[0_0_12px_rgba(255,255,255,0.3)]"
                    : "bg-gradient-to-t from-zinc-900 via-zinc-600 to-zinc-400 group-hover:from-zinc-800 group-hover:to-zinc-200"
                }`}
              />
              <span
                className={`text-[9px] mt-1 font-medium transition-colors ${
                  isHovered ? "text-zinc-100 font-semibold" : "text-zinc-500"
                }`}
              >
                {item.day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
