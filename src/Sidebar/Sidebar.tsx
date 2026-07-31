import React, { useState } from "react";
import {
  LayoutDashboard,
  UserCog,
  Settings,
  LogOut,
  LucideIcon,
} from "lucide-react";

export interface SidebarLink {
  id: string;
  label: string;
  icon: LucideIcon;
  href?: string;
}

interface SidebarProps {
  links?: SidebarLink[];
  activeId?: string;
  onSelect?: (id: string) => void;
  brandName?: string;
  userName?: string;
  userAvatar?: string;
  children?: React.ReactNode;
}

const defaultLinks: SidebarLink[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "profile", label: "Profile", icon: UserCog },
  { id: "settings", label: "Settings", icon: Settings },
  { id: "logout", label: "Logout", icon: LogOut },
];

const defaultAvatar =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80";

export default function Sidebar({
  links = defaultLinks,
  activeId: controlledActiveId,
  onSelect,
  brandName = "Acet Labs",
  userName = "Manu Arora",
  userAvatar = defaultAvatar,
  children,
}: SidebarProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [internalActiveId, setInternalActiveId] = useState("dashboard");
  const activeId = controlledActiveId ?? internalActiveId;

  const handleSelect = (id: string) => {
    setInternalActiveId(id);
    if (onSelect) onSelect(id);
  };

  return (
    <div className="flex min-h-[500px] w-full bg-zinc-950 text-zinc-50 rounded-2xl border border-zinc-800/80 overflow-hidden shadow-2xl">
      {/* Sidebar Container */}
      <aside
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative flex flex-col justify-between py-5 px-3 bg-zinc-900/90 border-r border-zinc-800/80 transition-all duration-300 ease-in-out z-20 ${
          isHovered ? "w-60" : "w-[60px]"
        }`}
      >
        {/* Top Brand Logo */}
        <div className="flex items-center gap-3 px-1.5 overflow-hidden">
          <div className="h-7 w-7 rounded-lg bg-zinc-100 flex-shrink-0 flex items-center justify-center shadow">
            <div className="h-3 w-3 rounded bg-zinc-950" />
          </div>
          <span
            className={`font-semibold text-sm text-zinc-100 whitespace-nowrap transition-opacity duration-200 ${
              isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            {brandName}
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="my-auto flex flex-col gap-1.5">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = activeId === link.id;

            return (
              <button
                key={link.id}
                onClick={() => handleSelect(link.id)}
                className={`flex items-center gap-3 px-2.5 py-2 rounded-xl text-sm font-medium transition-all duration-150 overflow-hidden group ${
                  isActive
                    ? "bg-zinc-800 text-zinc-50"
                    : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50"
                }`}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <span
                  className={`whitespace-nowrap transition-opacity duration-200 ${
                    isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  {link.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Bottom Profile Avatar */}
        <div className="flex items-center gap-3 px-1.5 overflow-hidden pt-2 border-t border-zinc-800/50">
          <img
            src={userAvatar}
            alt={userName}
            className="h-7 w-7 rounded-full object-cover flex-shrink-0 ring-1 ring-zinc-700"
          />
          <span
            className={`text-xs sm:text-sm font-medium text-zinc-200 whitespace-nowrap transition-opacity duration-200 ${
              isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            {userName}
          </span>
        </div>
      </aside>

      {/* Main Layout Area */}
      <main className="flex-1 p-6 bg-zinc-950 overflow-y-auto">
        {children ? (
          children
        ) : (
          <div className="flex flex-col gap-4 h-full">
            {/* Top 4 Dashboard Skeleton Cards matching screenshot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="h-28 rounded-xl bg-zinc-900/60 border border-zinc-800/50 animate-pulse" />
              <div className="h-28 rounded-xl bg-zinc-900/60 border border-zinc-800/50 animate-pulse" />
              <div className="h-28 rounded-xl bg-zinc-900/60 border border-zinc-800/50 animate-pulse" />
              <div className="h-28 rounded-xl bg-zinc-900/60 border border-zinc-800/50 animate-pulse" />
            </div>

            {/* Bottom 2 Large Content Cards matching screenshot */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
              <div className="min-h-[220px] rounded-xl bg-zinc-900/60 border border-zinc-800/50" />
              <div className="min-h-[220px] rounded-xl bg-zinc-900/60 border border-zinc-800/50" />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
