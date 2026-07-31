import React, { useState } from "react";
import NetRevenueCard from "./NetRevenueCard";
import ChannelSalesCard from "./ChannelSalesCard";
import TotalOrdersCard from "./TotalOrdersCard";
import {
  LayoutDashboard,
  BarChart3,
  Folder,
  Users,
  Workflow,
  Key,
  Settings,
  CreditCard,
  HelpCircle,
  FileText,
  Send,
  Bell,
  Sun,
  RotateCw,
  Sidebar as SidebarIcon,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  Receipt,
  UserPlus,
} from "lucide-react";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("Dashboard");

  return (
    <div className="fixed inset-0 h-screen w-screen bg-[#09090b] text-zinc-50 font-sans select-none overflow-hidden flex">
      {/* 1. Left Sidebar (Viewport Fit) */}
      <aside className="w-52 bg-[#09090b] border-r border-zinc-800/80 p-3 flex flex-col justify-between flex-shrink-0 h-full">
        <div>
          {/* Top Sidebar Action Icons */}
          <div className="flex items-center gap-2 mb-3 text-zinc-400">
            <button className="p-1 rounded-md hover:bg-zinc-800/80 hover:text-zinc-100 transition-colors">
              <Sun className="h-3.5 w-3.5" />
            </button>
            <button className="p-1 rounded-md hover:bg-zinc-800/80 hover:text-zinc-100 transition-colors">
              <RotateCw className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Section 1: Product */}
          <div className="mb-3">
            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1 px-1">
              Product
            </div>
            <div className="space-y-0.5">
              {[
                { name: "Dashboard", icon: LayoutDashboard },
                { name: "Analytics", icon: BarChart3 },
                { name: "Projects", icon: Folder },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => setActiveTab(item.name)}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      isActive
                        ? "bg-zinc-800/80 text-zinc-50 font-semibold"
                        : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Workspace */}
          <div className="mb-3">
            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1 px-1">
              Workspace
            </div>
            <div className="space-y-0.5">
              {[
                { name: "Team", icon: Users },
                { name: "Integrations", icon: Workflow },
                { name: "API Keys", icon: Key },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => setActiveTab(item.name)}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      isActive
                        ? "bg-zinc-800/80 text-zinc-50 font-semibold"
                        : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 3: Administration */}
          <div className="mb-3">
            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1 px-1">
              Administration
            </div>
            <div className="space-y-0.5">
              {[
                { name: "Settings", icon: Settings },
                { name: "Billing", icon: CreditCard },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => setActiveTab(item.name)}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      isActive
                        ? "bg-zinc-800/80 text-zinc-50 font-semibold"
                        : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Sidebar Box */}
        <div className="space-y-1.5 pt-2 border-t border-zinc-800/60">
          <div className="p-2 rounded-lg bg-zinc-900/60 border border-zinc-800/60 text-[10px] hover:border-zinc-700 transition-colors">
            <div className="text-[9px] text-zinc-500 uppercase tracking-wider font-bold">
              Changelog
            </div>
            <div className="font-semibold text-zinc-200">Product update</div>
            <div className="text-[9px] text-zinc-400">
              Performance boosts & UI polish.
            </div>
          </div>

          <div className="space-y-0.5 text-[10px]">
            <a href="#" className="flex items-center gap-2 px-1.5 py-0.5 text-zinc-400 hover:text-zinc-200">
              <HelpCircle className="h-3 w-3" />
              <span>Help Center</span>
            </a>
            <a href="#" className="flex items-center gap-2 px-1.5 py-0.5 text-zinc-400 hover:text-zinc-200">
              <FileText className="h-3 w-3" />
              <span>Documentation</span>
            </a>
          </div>

          <div className="text-[9px] text-zinc-600 px-1">
            © 2026 Ethereal LLC
          </div>
        </div>
      </aside>

      {/* 2. Main Right Content Panel (Fits 100% into Viewport with 0 Vertical Scrollbars) */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#09090b] h-full overflow-hidden">
        {/* Top Header Bar */}
        <header className="flex items-center justify-between px-4 py-2 border-b border-zinc-800/80 bg-[#09090b]/90 flex-shrink-0">
          <div className="flex items-center gap-2 text-xs">
            <button className="p-1 text-zinc-400 hover:text-zinc-200">
              <SidebarIcon className="h-3.5 w-3.5" />
            </button>
            <span className="text-zinc-500 font-medium">/</span>
            <span className="font-semibold text-zinc-200">Dashboard</span>
          </div>

          <div className="flex items-center gap-2 text-zinc-400">
            <button className="p-1.5 rounded-lg hover:bg-zinc-800/80 hover:text-zinc-100 transition-colors">
              <Send className="h-3.5 w-3.5" />
            </button>
            <button className="p-1.5 rounded-lg hover:bg-zinc-800/80 hover:text-zinc-100 transition-colors relative">
              <Bell className="h-3.5 w-3.5" />
              <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </button>
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
              alt="Avatar"
              className="h-6 w-6 rounded-full object-cover ring-1 ring-zinc-700 ml-1 cursor-pointer"
            />
          </div>
        </header>

        {/* Viewport Dashboard Grid (100% Height Fit) */}
        <div className="flex-1 p-3 grid grid-rows-[auto_1fr_1fr] gap-2.5 overflow-hidden">
          {/* Row 1: 4 Metric Cards Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
            <div className="bg-[#111113] border border-zinc-800/80 hover:border-zinc-700/80 rounded-xl p-2.5 flex flex-col justify-between transition-all hover:scale-[1.01] cursor-pointer">
              <span className="text-[10px] text-zinc-400 font-medium">Active users</span>
              <div className="text-xl font-extrabold text-zinc-50 my-0.5">847</div>
              <div className="text-[9px] text-emerald-400 font-medium flex items-center">
                <TrendingUp className="h-2.5 w-2.5 mr-0.5" />
                3.1% vs last week
              </div>
            </div>

            <div className="bg-[#111113] border border-zinc-800/80 hover:border-zinc-700/80 rounded-xl p-2.5 flex flex-col justify-between transition-all hover:scale-[1.01] cursor-pointer">
              <span className="text-[10px] text-zinc-400 font-medium">Revenue</span>
              <div className="text-xl font-extrabold text-zinc-50 my-0.5">$18,290</div>
              <div className="text-[9px] text-emerald-400 font-medium flex items-center">
                <TrendingUp className="h-2.5 w-2.5 mr-0.5" />
                12.4% vs last week
              </div>
            </div>

            <div className="bg-[#111113] border border-zinc-800/80 hover:border-zinc-700/80 rounded-xl p-2.5 flex flex-col justify-between transition-all hover:scale-[1.01] cursor-pointer">
              <span className="text-[10px] text-zinc-400 font-medium">Conversion Rate</span>
              <div className="text-xl font-extrabold text-zinc-50 my-0.5">3.28%</div>
              <div className="text-[9px] text-rose-400 font-medium flex items-center">
                <TrendingDown className="h-2.5 w-2.5 mr-0.5" />
                0.4% vs last week
              </div>
            </div>

            <div className="bg-[#111113] border border-zinc-800/80 hover:border-zinc-700/80 rounded-xl p-2.5 flex flex-col justify-between transition-all hover:scale-[1.01] cursor-pointer">
              <span className="text-[10px] text-zinc-400 font-medium">New signups</span>
              <div className="text-xl font-extrabold text-zinc-50 my-0.5">142</div>
              <div className="text-[9px] text-emerald-400 font-medium flex items-center">
                <TrendingUp className="h-2.5 w-2.5 mr-0.5" />
                8.7% vs last week
              </div>
            </div>
          </div>

          {/* Row 2: 50/50 Split (Net Revenue Bar Chart & Channel Sales Step Line Chart) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5 overflow-hidden">
            <NetRevenueCard />
            <ChannelSalesCard />
          </div>

          {/* Row 3: 50/50 Split (Total Orders Card 50% & Invoices / Activity 50%) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5 overflow-hidden">
            <TotalOrdersCard />

            <div className="bg-[#111113] border border-zinc-800/80 hover:border-zinc-700/80 rounded-xl p-3 flex flex-col justify-between transition-all">
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold text-zinc-100">Recent Invoices & Activity</h4>
                  <span className="text-[10px] text-emerald-400 font-medium flex items-center bg-emerald-950/60 border border-emerald-800/40 px-1.5 py-0.5 rounded-full">
                    <CheckCircle2 className="h-2.5 w-2.5 mr-0.5" />
                    Caught up
                  </span>
                </div>
                <p className="text-[9px] text-zinc-400 mt-0.5">Balances, payouts, and latest workspace updates.</p>
              </div>

              {/* Table snippet */}
              <div className="my-1.5 space-y-1 text-[10px]">
                <div className="flex items-center justify-between border-b border-zinc-800/60 pb-0.5 text-zinc-500 font-medium text-[9px]">
                  <span>Customer</span>
                  <span>Invoice</span>
                  <span>Amount</span>
                </div>

                <div className="flex items-center justify-between font-medium">
                  <span className="text-zinc-200">Northwind Labs</span>
                  <span className="text-zinc-400">#1045</span>
                  <span className="text-zinc-100 font-semibold">$2,400.00</span>
                </div>

                <div className="flex items-center justify-between font-medium">
                  <span className="text-zinc-200">Blue River Co.</span>
                  <span className="text-zinc-400">#1044</span>
                  <span className="text-zinc-100 font-semibold">$890.00</span>
                </div>
              </div>

              {/* Activity feed list */}
              <div className="pt-1.5 border-t border-zinc-800/60 space-y-1 text-[10px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Receipt className="h-3 w-3 text-zinc-400" />
                    <span className="text-zinc-300 font-medium">Invoice #1045 marked paid</span>
                  </div>
                  <span className="text-[9px] text-zinc-500">2h ago</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <UserPlus className="h-3 w-3 text-zinc-400" />
                    <span className="text-zinc-300 font-medium">Jordan joined team</span>
                  </div>
                  <span className="text-[9px] text-zinc-500">Today</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
