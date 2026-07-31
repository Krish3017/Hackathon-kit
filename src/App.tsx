import React, { useState } from "react";
import AuthContainer from "@/Auth/AuthContainer";
import NotFoundPage from "@/NotFound/NotFoundPage";
import Navbar from "@/Navigation/Navbar";
import Sidebar from "@/Sidebar/Sidebar";
import EmployeeList from "@/List/EmployeeList";
import DashboardPage from "@/Dashboard/DashboardPage";
import TestPage from "@/Test/TestPage";
import { ToastProvider } from "@/components/ui/toast";

export default function App() {
  const [view, setView] = useState<
    "dashboard" | "components" | "list" | "sidebar" | "navbar" | "auth" | "404"
  >("components");
  const [activeNavTab, setActiveNavTab] = useState("components");

  return (
    <ToastProvider>
      <div className="relative min-h-screen bg-zinc-950 text-zinc-50 font-sans p-2 sm:p-6">
        {/* Top Preview Switcher Bar */}
        <div className="fixed top-3 right-3 z-50 flex items-center gap-1.5 bg-zinc-900/95 border border-zinc-800 rounded-full px-3 py-1.5 text-xs shadow-2xl backdrop-blur max-w-full overflow-x-auto">
          <span className="text-zinc-400 font-medium mr-1 whitespace-nowrap">Preview Page:</span>
          <button
            onClick={() => setView("components")}
            className={`px-2.5 py-1 rounded-full font-medium transition-colors whitespace-nowrap ${
              view === "components"
                ? "bg-zinc-100 text-zinc-950 font-semibold"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Components Test
          </button>
          <button
            onClick={() => setView("dashboard")}
            className={`px-2.5 py-1 rounded-full font-medium transition-colors whitespace-nowrap ${
              view === "dashboard"
                ? "bg-zinc-100 text-zinc-950 font-semibold"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Dashboard Page
          </button>
          <button
            onClick={() => setView("list")}
            className={`px-2.5 py-1 rounded-full font-medium transition-colors whitespace-nowrap ${
              view === "list"
                ? "bg-zinc-100 text-zinc-950 font-semibold"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            List Component
          </button>
          <button
            onClick={() => setView("sidebar")}
            className={`px-2.5 py-1 rounded-full font-medium transition-colors whitespace-nowrap ${
              view === "sidebar"
                ? "bg-zinc-100 text-zinc-950 font-semibold"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Sidebar Component
          </button>
          <button
            onClick={() => setView("navbar")}
            className={`px-2.5 py-1 rounded-full font-medium transition-colors whitespace-nowrap ${
              view === "navbar"
                ? "bg-zinc-100 text-zinc-950 font-semibold"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Navbar Component
          </button>
          <button
            onClick={() => setView("auth")}
            className={`px-2.5 py-1 rounded-full font-medium transition-colors whitespace-nowrap ${
              view === "auth"
                ? "bg-zinc-100 text-zinc-950 font-semibold"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Auth Pages
          </button>
          <button
            onClick={() => setView("404")}
            className={`px-2.5 py-1 rounded-full font-medium transition-colors whitespace-nowrap ${
              view === "404"
                ? "bg-zinc-100 text-zinc-950 font-semibold"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            404 Page
          </button>
        </div>

        {/* 0. COMPONENTS TEST PAGE PREVIEW */}
        {view === "components" && (
          <div className="w-full pt-12 sm:pt-14">
            <TestPage />
          </div>
        )}

        {/* 1. DASHBOARD PAGE PREVIEW */}
        {view === "dashboard" && (
          <div className="w-full pt-12 sm:pt-14">
            <DashboardPage />
          </div>
        )}

        {/* 2. LIST COMPONENT PREVIEW */}
        {view === "list" && (
          <div className="w-full pt-10 sm:pt-12 max-w-7xl mx-auto">
            <EmployeeList />
          </div>
        )}

        {/* 3. SIDEBAR PREVIEW */}
        {view === "sidebar" && (
          <div className="w-full pt-10 sm:pt-12">
            <Sidebar />
          </div>
        )}

        {/* 4. NAVBAR PREVIEW */}
        {view === "navbar" && (
          <div className="w-full pt-10 space-y-6">
            <Navbar
              activeId={activeNavTab}
              onChange={(id) => {
                setActiveNavTab(id);
                if (id === "components") {
                  setView("components");
                }
              }}
            />
            {activeNavTab === "components" ? (
              <TestPage />
            ) : (
              <div className="p-8 text-center text-zinc-400 bg-zinc-900/40 border border-zinc-800 rounded-2xl max-w-xl mx-auto mt-8">
                Navigated to tab: <span className="text-zinc-100 font-semibold">{activeNavTab}</span>
              </div>
            )}
          </div>
        )}

        {/* 5. AUTH PAGES PREVIEW */}
        {view === "auth" && <AuthContainer initialMode="login" />}

        {/* 6. 404 PAGE PREVIEW */}
        {view === "404" && (
          <NotFoundPage
            onGoHome={() => setView("auth")}
            onExplore={() => setView("dashboard")}
          />
        )}
      </div>
    </ToastProvider>
  );
}
