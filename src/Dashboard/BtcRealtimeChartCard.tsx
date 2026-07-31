import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";

export default function BtcRealtimeChartCard() {
  const [chartType, setChartType] = useState<"line" | "area">("area");
  const [coin, setCoin] = useState("BTC");
  const [fiat, setFiat] = useState("USD");

  const price = 62699.78;
  const change = 0.0;
  const changePercent = 0.0;

  // Static points data matching screenshot 1
  const pointsData = [
    { time: "09:36:51 PM", val: 62705.2 },
    { time: "09:36:51 PM", val: 62700.8 },
    { time: "09:36:51 PM", val: 62700.7 },
    { time: "09:36:51 PM", val: 62700.7 },
    { time: "09:36:52 PM", val: 62700.65 },
    { time: "09:36:52 PM", val: 62700.6 },
    { time: "09:36:52 PM", val: 62700.6 },
    { time: "09:36:52 PM", val: 62700.6 },
    { time: "09:36:53 PM", val: 62700.5 },
    { time: "09:36:54 PM", val: 62699.78 },
  ];

  const minVal = 62698.0;
  const maxVal = 62706.0;

  const svgWidth = 800;
  const svgHeight = 200;
  const paddingX = 40;
  const paddingY = 20;

  const pointsString = pointsData
    .map((d, index) => {
      const x =
        paddingX + (index / (pointsData.length - 1)) * (svgWidth - paddingX * 2);
      const y =
        paddingY +
        (1 - (d.val - minVal) / (maxVal - minVal)) * (svgHeight - paddingY * 2);
      return `${x},${y}`;
    })
    .join(" ");

  const lastPointX = svgWidth - paddingX;
  const lastPointY =
    paddingY +
    (1 - (price - minVal) / (maxVal - minVal)) * (svgHeight - paddingY * 2);

  const areaPath = `M ${paddingX},${svgHeight - 10} L ${pointsString} L ${lastPointX},${svgHeight - 10} Z`;

  return (
    <div className="w-full bg-zinc-900/70 border border-zinc-800/80 rounded-2xl p-5 sm:p-6 shadow-xl backdrop-blur flex flex-col justify-between">
      {/* Header controls matching screenshot 1 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-100">
            {coin}/{fiat} Real-Time Chart
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Live price updates via Coinbase. Fallback to CoinGecko if needed.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-zinc-400">Dark Mode</span>
            <div className="w-7 h-4 bg-emerald-500 rounded-full flex items-center p-0.5 cursor-pointer">
              <div className="w-3 h-3 bg-white rounded-full ml-auto shadow" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-zinc-400">Live</span>
            <div className="w-7 h-4 bg-emerald-500 rounded-full flex items-center p-0.5">
              <div className="w-3 h-3 bg-white rounded-full ml-auto shadow" />
            </div>
          </div>

          {/* Line / Area Switcher */}
          <div className="flex items-center bg-zinc-950 border border-zinc-800 p-0.5 rounded-lg text-zinc-400">
            <button
              onClick={() => setChartType("line")}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                chartType === "line"
                  ? "bg-zinc-800 text-zinc-100 font-medium"
                  : "hover:text-zinc-200"
              }`}
            >
              Line
            </button>
            <button
              onClick={() => setChartType("area")}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                chartType === "area"
                  ? "bg-zinc-800 text-zinc-100 font-medium"
                  : "hover:text-zinc-200"
              }`}
            >
              Area
            </button>
          </div>
        </div>
      </div>

      {/* Sub-header Price & Dropdowns */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mt-5">
        <div>
          <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-50">
            ${price.toFixed(2)}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs font-semibold text-emerald-400 flex items-center">
              <ArrowUpRight className="h-3.5 w-3.5 mr-0.5" />
              ${change.toFixed(2)} ({changePercent.toFixed(2)}%)
            </span>
            <span className="text-[11px] text-zinc-500 font-mono">
              WS: Connected
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <div>
            <span className="text-[10px] text-zinc-500 uppercase block mb-1">Coin</span>
            <select
              value={coin}
              onChange={(e) => setCoin(e.target.value)}
              className="bg-zinc-950 border border-zinc-800 text-zinc-200 rounded-lg px-2.5 py-1 font-medium outline-none cursor-pointer"
            >
              <option value="BTC">BTC</option>
              <option value="ETH">ETH</option>
              <option value="SOL">SOL</option>
            </select>
          </div>
          <div>
            <span className="text-[10px] text-zinc-500 uppercase block mb-1">Fiat</span>
            <select
              value={fiat}
              onChange={(e) => setFiat(e.target.value)}
              className="bg-zinc-950 border border-zinc-800 text-zinc-200 rounded-lg px-2.5 py-1 font-medium outline-none cursor-pointer"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
        </div>
      </div>

      {/* SVG Chart Container */}
      <div className="mt-5 bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-3 sm:p-4 relative">
        <svg viewBox="0 0 800 220" className="w-full h-auto overflow-visible">
          <defs>
            <linearGradient id="btcStaticGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[62706, 62704, 62702, 62700, 62698].map((yVal) => {
            const yPos =
              paddingY +
              (1 - (yVal - minVal) / (maxVal - minVal)) * (svgHeight - paddingY * 2);
            return (
              <g key={yVal}>
                <line
                  x1={paddingX}
                  y1={yPos}
                  x2={svgWidth - paddingX}
                  y2={yPos}
                  stroke="#27272a"
                  strokeDasharray="3 3"
                />
                <text
                  x={paddingX}
                  y={yPos - 4}
                  fill="#71717a"
                  fontSize="9"
                  fontFamily="sans-serif"
                >
                  ${yVal.toFixed(2)}
                </text>
              </g>
            );
          })}

          {/* Area Fill */}
          {chartType === "area" && (
            <path d={areaPath} fill="url(#btcStaticGrad)" />
          )}

          {/* Line Stroke */}
          <polyline
            fill="none"
            stroke="#10b981"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={pointsString}
          />

          {/* Endpoint Dot */}
          <circle cx={lastPointX} cy={lastPointY} r="5" fill="#10b981" />

          {/* X Axis Time Labels */}
          {pointsData.map((d, index) => {
            const x =
              paddingX +
              (index / (pointsData.length - 1)) * (svgWidth - paddingX * 2);
            return (
              <text
                key={index}
                x={x}
                y={svgHeight + 12}
                fill="#71717a"
                fontSize="9"
                textAnchor="middle"
              >
                {d.time}
              </text>
            );
          })}
        </svg>
      </div>

      {/* Footer info matching screenshot 1 */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mt-3 text-[11px] text-zinc-500">
        <span>Data: Coinbase WS, CoinGecko fallback</span>
        <span>Glass UI • Tailwind CSS • Recharts</span>
      </div>
    </div>
  );
}
