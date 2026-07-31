import React, { useState, useEffect } from "react";
import { TrendingUp } from "lucide-react";

interface ChannelDataPoint {
  date: string;
  online: number;
  retail: number;
  xPos: number;
  yOnline: number;
  yRetail: number;
}

const channelPoints: ChannelDataPoint[] = [
  { date: "Apr 7", online: 45, retail: 85, xPos: 25, yOnline: 35, yRetail: 65 },
  { date: "Apr 8", online: 60, retail: 90, xPos: 75, yOnline: 25, yRetail: 55 },
  { date: "Apr 9", online: 55, retail: 70, xPos: 125, yOnline: 30, yRetail: 70 },
  { date: "Apr 10", online: 58, retail: 92, xPos: 175, yOnline: 28, yRetail: 52 },
  { date: "Apr 11", online: 75, retail: 112, xPos: 225, yOnline: 12, yRetail: 40 },
  { date: "Apr 12", online: 65, retail: 105, xPos: 275, yOnline: 20, yRetail: 45 },
  { date: "Apr 13", online: 80, retail: 120, xPos: 325, yOnline: 8, yRetail: 35 },
];

export default function ChannelSalesCard() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Loading motion animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const activePoint = hoveredIdx !== null ? channelPoints[hoveredIdx] : null;

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
          <h3 className="text-xs font-semibold text-zinc-100">Channel sales</h3>
          <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-full flex items-center">
            <TrendingUp className="h-3 w-3 mr-0.5" />
            58.3%
          </span>
        </div>
        <p className="text-[10px] text-zinc-400 mt-0.5">Daily sales count by channel, last 7 days.</p>
      </div>

      {/* Main Step Line Chart Container */}
      <div className="mt-2 mb-1 h-28 relative flex flex-col justify-end">
        {/* Floating Dark Tooltip */}
        {activePoint && !isLoading && (
          <div
            style={{
              left: `${(hoveredIdx! / (channelPoints.length - 1)) * 65 + 15}%`,
            }}
            className="absolute top-1 -translate-x-1/2 bg-black/95 border border-zinc-700/90 rounded-lg p-2 shadow-2xl z-30 pointer-events-none space-y-0.5 text-[11px] min-w-[120px] transition-all duration-150"
          >
            <div className="flex items-center justify-between text-zinc-200">
              <div className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-xs bg-white inline-block" />
                <span>Online</span>
              </div>
              <span className="font-bold text-zinc-50">{activePoint.online}</span>
            </div>
            <div className="flex items-center justify-between text-zinc-400">
              <div className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-xs bg-zinc-500 inline-block" />
                <span>Retail</span>
              </div>
              <span className="font-bold text-zinc-200">{activePoint.retail}</span>
            </div>
          </div>
        )}

        {/* Step Line SVG */}
        <svg viewBox="0 0 350 80" className="w-full h-full overflow-visible z-10">
          {/* Grid lines */}
          {[15, 40, 65].map((y) => (
            <line key={y} x1="0" y1={y} x2="350" y2={y} stroke="#1f1f23" strokeWidth="1" />
          ))}

          {/* Top Step Curve (Online - White) */}
          <path
            d="M 0,35 H 50 V 25 H 100 V 30 H 150 V 28 H 200 V 12 H 250 V 20 H 300 V 8 H 350"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.75"
            strokeDasharray="400"
            strokeDashoffset={isLoading ? "400" : "0"}
            className="transition-all duration-1000 ease-out"
          />

          {/* Bottom Step Curve (Retail - Grey) */}
          <path
            d="M 0,65 H 50 V 55 H 100 V 70 H 150 V 52 H 200 V 40 H 250 V 45 H 300 V 35 H 350"
            fill="none"
            stroke="#71717a"
            strokeWidth="1.25"
            strokeDasharray="400"
            strokeDashoffset={isLoading ? "400" : "0"}
            className="transition-all duration-1000 ease-out delay-150"
          />

          {/* Active Hover Dots */}
          {activePoint && !isLoading && (
            <g>
              <circle
                cx={activePoint.xPos}
                cy={activePoint.yOnline}
                r="4"
                fill="#ffffff"
                stroke="#a1a1aa"
                strokeWidth="1.5"
              />
              <circle
                cx={activePoint.xPos}
                cy={activePoint.yRetail}
                r="4"
                fill="#a1a1aa"
                stroke="#52525b"
                strokeWidth="1.5"
              />
            </g>
          )}

          {/* Invisible Hover Hitboxes */}
          {channelPoints.map((pt, i) => (
            <rect
              key={i}
              x={i * 50}
              y="0"
              width="50"
              height="80"
              fill="transparent"
              className="cursor-pointer"
              onMouseEnter={() => !isLoading && setHoveredIdx(i)}
            />
          ))}
        </svg>

        {/* X-Axis Date Labels */}
        <div className="flex items-center justify-between text-[9px] text-zinc-500 mt-1 pt-1 border-t border-zinc-800/80 font-medium">
          {channelPoints.map((pt, i) => (
            <span
              key={i}
              className={`transition-colors ${
                hoveredIdx === i ? "text-zinc-200 font-semibold" : ""
              }`}
            >
              {pt.date}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
