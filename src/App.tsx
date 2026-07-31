import React, { useState } from "react";
import AuthContainer from "@/Auth/AuthContainer";
import NotFoundPage from "@/NotFound/NotFoundPage";
import Navbar from "@/Navigation/Navbar";
import Sidebar from "@/Sidebar/Sidebar";

export default function App() {
  const [view, setView] = useState<"sidebar" | "navbar" | "auth" | "404">("sidebar");
  const [activeNavTab, setActiveNavTab] = useState("home");

  return (
    <div className="relative min-h-screen bg-zinc-950 text-zinc-50 font-sans p-2 sm:p-6">
      {/* Top Preview Switcher Bar */}
      <div className="fixed top-3 right-3 z-50 flex items-center gap-1.5 bg-zinc-900/90 border border-zinc-800 rounded-full px-3 py-1.5 text-xs shadow-2xl backdrop-blur">
        <span className="text-zinc-400 font-medium mr-1">Preview Page:</span>
        <button
          onClick={() => setView("sidebar")}
          className={`px-2.5 py-1 rounded-full font-medium transition-colors ${
            view === "sidebar"
              ? "bg-zinc-100 text-zinc-950 font-semibold"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          Sidebar Component
        </button>
        <button
          onClick={() => setView("navbar")}
          className={`px-2.5 py-1 rounded-full font-medium transition-colors ${
            view === "navbar"
              ? "bg-zinc-100 text-zinc-950 font-semibold"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          Navbar Component
        </button>
        <button
          onClick={() => setView("auth")}
          className={`px-2.5 py-1 rounded-full font-medium transition-colors ${
            view === "auth"
              ? "bg-zinc-100 text-zinc-950 font-semibold"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          Auth Pages
        </button>
        <button
          onClick={() => setView("404")}
          className={`px-2.5 py-1 rounded-full font-medium transition-colors ${
            view === "404"
              ? "bg-zinc-100 text-zinc-950 font-semibold"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          404 Page
        </button>
      </div>

      {/* 1. SIDEBAR PREVIEW */}
      {view === "sidebar" && (
        <div className="w-full pt-10 sm:pt-12">
          <Sidebar />
        </div>
      )}

      {/* 2. NAVBAR PREVIEW */}
      {view === "navbar" && (
        <div className="w-full pt-10">
          <Navbar
            activeId={activeNavTab}
            onChange={(id) => setActiveNavTab(id)}
          />
        </div>
      )}

      {/* 3. AUTH PAGES PREVIEW */}
      {view === "auth" && <AuthContainer initialMode="login" />}

      {/* 4. 404 PAGE PREVIEW */}
      {view === "404" && (
        <NotFoundPage
          onGoHome={() => setView("auth")}
          onExplore={() => setView("sidebar")}
        />
      )}
    </div>
  );
}
