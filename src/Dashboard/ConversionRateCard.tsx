import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";

export default function ConversionRateCard() {
  const topLayerPoints =
    "0,50 25,45 50,55 75,40 100,50 125,35 150,15 175,25 200,5 225,55 250,30 275,55";
  const topAreaPath = `M 0,60 L ${topLayerPoints} L 275,60 Z`;

  const bottomLayerPoints =
    "0,55 25,50 50,48 75,52 100,45 125,50 150,30 175,35 200,20 225,50 250,38 275,58";
  const bottomAreaPath = `M 0,60 L ${bottomLayerPoints} L 275,60 Z`;

  return (
    <div className="w-full bg-zinc-900/70 text-zinc-50 p-5 rounded-2xl border border-zinc-800/80 shadow-xl backdrop-blur flex flex-col justify-between">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-zinc-200">
          Conversion Rate
        </span>
        <button className="px-3 py-1 rounded-lg border border-zinc-800 bg-zinc-950 text-xs font-medium text-zinc-200 hover:bg-zinc-800 transition-colors">
          Details
        </button>
      </div>

      {/* Main Metric Value & Pill Badge */}
      <div className="flex items-center gap-2.5 mt-2">
        <span className="text-3xl font-bold tracking-tight text-zinc-50">
          16.9%
        </span>
        <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
          +2.1%
        </span>
      </div>

      {/* Sub-metrics Breakdown */}
      <div className="mt-3 space-y-1.5 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-zinc-400">Added to Cart</span>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-zinc-100">3,842</span>
            <span className="text-emerald-400 text-[11px] flex items-center">
              <ArrowUp className="h-3 w-3 mr-0.5" />
              +1.8%
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-zinc-400">Reached Checkout</span>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-zinc-100">1,256</span>
            <span className="text-rose-400 text-[11px] flex items-center">
              <ArrowDown className="h-3 w-3 mr-0.5" />
              -1.2%
            </span>
          </div>
        </div>
      </div>

      {/* Dual Layered Area Chart Container matching Screenshot 3 */}
      <div className="mt-4 bg-zinc-950/80 border border-zinc-800/70 rounded-xl p-2.5 relative overflow-hidden">
        <svg viewBox="0 0 275 60" className="w-full h-16 overflow-visible">
          <defs>
            <linearGradient id="topAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4ade80" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#4ade80" stopOpacity="0.05" />
            </linearGradient>

            <linearGradient id="bottomAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#059669" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Grid lines background */}
          {[15, 30, 45].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="275"
              y2={y}
              stroke="#27272a"
              strokeWidth="0.75"
              strokeDasharray="2 2"
            />
          ))}

          {/* Top Layer Area */}
          <path d={topAreaPath} fill="url(#topAreaGrad)" />
          <polyline
            fill="none"
            stroke="#86efac"
            strokeWidth="1.5"
            points={topLayerPoints}
          />

          {/* Bottom Layer Area */}
          <path d={bottomAreaPath} fill="url(#bottomAreaGrad)" />
          <polyline
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
            points={bottomLayerPoints}
          />
        </svg>
      </div>
    </div>
  );
}
