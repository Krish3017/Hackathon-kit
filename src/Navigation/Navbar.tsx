import React, { useState } from "react";
import { Home, Rss, BookOpen, LucideIcon } from "lucide-react";

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  href?: string;
}

interface NavbarProps {
  items?: NavItem[];
  activeId?: string;
  onChange?: (id: string) => void;
  className?: string;
}

const defaultNavItems: NavItem[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "blog", label: "Blog", icon: Rss },
  { id: "docs", label: "Docs", icon: BookOpen },
];

export default function Navbar({
  items = defaultNavItems,
  activeId: controlledActiveId,
  onChange,
  className = "",
}: NavbarProps) {
  const [internalActiveId, setInternalActiveId] = useState("home");
  const currentActiveId = controlledActiveId ?? internalActiveId;

  const handleSelect = (id: string) => {
    setInternalActiveId(id);
    if (onChange) {
      onChange(id);
    }
  };

  return (
    <nav className={`flex items-center justify-center gap-6 sm:gap-8 py-2.5 bg-zinc-950 text-zinc-50 border-b border-zinc-900 select-none ${className}`}>
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = currentActiveId === item.id;

        return (
          <button
            key={item.id}
            onClick={() => handleSelect(item.id)}
            className={`group relative flex items-center gap-2 pb-1.5 text-xs sm:text-sm font-medium transition-colors ${
              isActive ? "text-zinc-50" : "text-zinc-400 hover:text-zinc-100"
            }`}
          >
            <Icon
              className={`h-3.5 w-3.5 sm:h-4 sm:w-4 transition-colors ${
                isActive ? "text-zinc-50" : "text-zinc-400 group-hover:text-zinc-100"
              }`}
            />
            <span>{item.label}</span>

            {/* Underline indicator: Solid when active, subtle opacity/scale expand on hover */}
            <span
              className={`absolute bottom-0 left-0 right-0 h-[2px] bg-zinc-50 rounded-full transition-all duration-200 origin-left ${
                isActive
                  ? "opacity-100 scale-x-100"
                  : "opacity-0 scale-x-0 group-hover:opacity-40 group-hover:scale-x-100"
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
}
