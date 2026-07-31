import React, { useState } from "react";
import { Skeleton, SkeletonCard } from "@/components/ui/skeleton";
import { Toast, useToast, ToastType } from "@/components/ui/toast";
import { Dialogue } from "@/components/ui/dialogue";
import { Sparkles, MessageSquare, Layers, Eye, RefreshCw, CheckCircle2, XCircle, AlertCircle, Info } from "lucide-react";

export default function TestPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [modalConfirmed, setModalConfirmed] = useState(false);
  const [interactiveToasts, setInteractiveToasts] = useState<
    { id: number; type: ToastType; message: string }[]
  >([]);

  // Hook for floating toasts (if ToastProvider wraps app)
  let toastApi: ReturnType<typeof useToast> | null = null;
  try {
    toastApi = useToast();
  } catch (e) {
    // fallback if no context wrapper
  }

  const triggerToast = (type: ToastType, message: string) => {
    if (toastApi) {
      toastApi[type](message);
    } else {
      const id = Date.now();
      setInteractiveToasts((prev) => [...prev, { id, type, message }]);
      setTimeout(() => {
        setInteractiveToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4000);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 p-4 sm:p-8 max-w-6xl mx-auto space-y-12 pb-24">
      {/* Page Header */}
      <div className="space-y-3 border-b border-zinc-900 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>UI Components Playground</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-zinc-100">
          Component Verification Page
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base max-w-2xl">
          Test and verify the <span className="text-zinc-200 font-semibold">Skeleton</span> loading states,{" "}
          <span className="text-zinc-200 font-semibold">Toast</span> notifications (4 exact types), and the{" "}
          <span className="text-zinc-200 font-semibold">Dialogue (Modal)</span> component.
        </p>
      </div>

      {/* SECTION 1: TOAST COMPONENTS */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-900 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xl font-bold text-zinc-100">1. Toast Component (4 Types)</h2>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Exact replication of Success, Error, Warning, and Info toasts as shown in images.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => triggerToast("success", "This is a success message example!")}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#092518] border border-[#15482e] text-emerald-300 hover:bg-[#0f3825] transition-colors"
            >
              + Success Toast
            </button>
            <button
              onClick={() => triggerToast("error", "This is a error message example!")}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#2a0c0c] border border-[#521616] text-red-300 hover:bg-[#3d1414] transition-colors"
            >
              + Error Toast
            </button>
            <button
              onClick={() => triggerToast("warning", "This is a warning message example!")}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#2b1706] border border-[#562e0c] text-amber-300 hover:bg-[#3d220a] transition-colors"
            >
              + Warning Toast
            </button>
            <button
              onClick={() => triggerToast("info", "This is a info message example!")}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#171f45] border border-[#2a3875] text-blue-300 hover:bg-[#202b5e] transition-colors"
            >
              + Info Toast
            </button>
          </div>
        </div>

        {/* Static Exact Replicas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Success */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" /> Type: Success
              </span>
              <span>Image 1 Match</span>
            </div>
            <Toast
              type="success"
              message="This is a success message example!"
              onClose={() => {}}
            />
          </div>

          {/* Error */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
              <span className="flex items-center gap-1.5 text-red-400">
                <XCircle className="w-3.5 h-3.5" /> Type: Error
              </span>
              <span>Image 2 Match</span>
            </div>
            <Toast
              type="error"
              message="This is a error message example!"
              onClose={() => {}}
            />
          </div>

          {/* Warning */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
              <span className="flex items-center gap-1.5 text-amber-400">
                <AlertCircle className="w-3.5 h-3.5" /> Type: Warning
              </span>
              <span>Image 3 Match</span>
            </div>
            <Toast
              type="warning"
              message="This is a warning message example!"
              onClose={() => {}}
            />
          </div>

          {/* Info */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
              <span className="flex items-center gap-1.5 text-blue-400">
                <Info className="w-3.5 h-3.5" /> Type: Info
              </span>
              <span>Image 4 Match</span>
            </div>
            <Toast
              type="info"
              message="This is a info message example!"
              onClose={() => {}}
            />
          </div>
        </div>

        {/* Floating toast fallback list if not wrapped in provider */}
        {interactiveToasts.length > 0 && (
          <div className="fixed top-5 right-5 z-50 flex flex-col gap-2 max-w-md w-full px-4 sm:px-0">
            {interactiveToasts.map((t) => (
              <Toast
                key={t.id}
                type={t.type}
                message={t.message}
                onClose={() =>
                  setInteractiveToasts((prev) => prev.filter((item) => item.id !== t.id))
                }
              />
            ))}
          </div>
        )}
      </section>

      {/* SECTION 2: DIALOGUE / MODAL COMPONENT */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            <div>
              <h2 className="text-xl font-bold text-zinc-100">2. Dialogue (Modal) Component</h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                Animated backdrop modal matching the exact design and feature set.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-zinc-100 text-zinc-950 hover:bg-zinc-200 font-semibold text-sm rounded-xl transition-all shadow-lg active:scale-95 flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            Open Modal
          </button>
        </div>

        {/* In-page Modal Preview Display */}
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[220px] text-center space-y-4">
          {modalConfirmed ? (
            <div className="space-y-2 animate-in fade-in duration-300">
              <div className="w-12 h-12 rounded-full bg-emerald-950/80 border border-emerald-800 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <p className="text-zinc-200 font-semibold text-base">Modal Action Confirmed!</p>
              <p className="text-zinc-400 text-xs">You clicked Confirm in the dialogue window.</p>
              <button
                onClick={() => setModalConfirmed(false)}
                className="text-xs text-indigo-400 underline hover:text-indigo-300 pt-1"
              >
                Reset Status
              </button>
            </div>
          ) : (
            <>
              <p className="text-zinc-300 text-sm max-w-md">
                Click the button below or top right to launch the full-screen modal backdrop with ESC key and click-outside capabilities.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-5 py-2.5 bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 text-zinc-100 font-medium text-sm rounded-xl transition-colors"
              >
                Launch Beautiful Modal
              </button>
            </>
          )}
        </div>
      </section>

      {/* SECTION 3: SKELETON COMPONENT */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-900 pb-4">
          <div>
            <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
              <RefreshCw className={`w-5 h-5 text-amber-400 ${isLoading ? "animate-spin" : ""}`} />
              3. Skeleton Component
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Pulse placeholder components for loading states (Text, Circular, Cards, Controls).
            </p>
          </div>

          <button
            onClick={() => setIsLoading(!isLoading)}
            className="px-4 py-2 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-200 font-medium text-xs sm:text-sm rounded-xl transition-colors self-start sm:self-auto"
          >
            Toggle State: {isLoading ? "Show Loaded UI" : "Show Skeleton Loading"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Item 1: Card Skeleton / Profile */}
          <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between text-xs text-zinc-400 font-mono border-b border-zinc-800 pb-2">
              <span>Profile Card Component</span>
              <span className={isLoading ? "text-amber-400" : "text-emerald-400"}>
                {isLoading ? "State: Loading" : "State: Ready"}
              </span>
            </div>

            {isLoading ? (
              <SkeletonCard />
            ) : (
              <div className="p-4 border border-zinc-800 rounded-2xl bg-zinc-950/90 space-y-4 animate-in fade-in duration-300">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                    alt="User avatar"
                    className="h-10 w-10 rounded-full object-cover border border-zinc-700"
                  />
                  <div>
                    <h4 className="text-sm font-semibold text-zinc-100">Sarah Jenkins</h4>
                    <p className="text-xs text-zinc-400">Senior Product Designer</p>
                  </div>
                </div>
                <div className="p-3 bg-zinc-900/80 rounded-xl text-xs text-zinc-300 leading-relaxed">
                  Building next-generation design systems, responsive interfaces, and interactive motion prototypes.
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800/60 text-xs font-medium">
                    Active Now
                  </span>
                  <button className="px-3 py-1.5 rounded-lg bg-zinc-100 text-zinc-950 font-medium text-xs hover:bg-zinc-200 transition-colors">
                    View Profile
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Item 2: Lines & Shapes Skeleton */}
          <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between text-xs text-zinc-400 font-mono border-b border-zinc-800 pb-2">
              <span>Generic Skeleton Variants</span>
              <span className={isLoading ? "text-amber-400" : "text-emerald-400"}>
                {isLoading ? "State: Loading" : "State: Ready"}
              </span>
            </div>

            {isLoading ? (
              <div className="space-y-4 py-2">
                <div className="flex items-center gap-4">
                  <Skeleton variant="circular" className="h-12 w-12 shrink-0" />
                  <div className="space-y-2 flex-1">
                    <Skeleton variant="text" className="h-4 w-3/4" />
                    <Skeleton variant="text" className="h-3 w-1/2" />
                  </div>
                </div>
                <Skeleton variant="rounded" className="h-16 w-full" />
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-1/3 rounded-lg" />
                  <Skeleton className="h-8 w-1/3 rounded-lg" />
                  <Skeleton className="h-8 w-1/3 rounded-lg" />
                </div>
              </div>
            ) : (
              <div className="space-y-4 py-2 animate-in fade-in duration-300">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-indigo-900/50 border border-indigo-700/50 flex items-center justify-center text-indigo-300 font-bold text-lg">
                    HK
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-zinc-100">Hackathon Kit UI</h4>
                    <p className="text-xs text-zinc-400">v2.4.0 • Production Release</p>
                  </div>
                </div>
                <div className="p-3 bg-zinc-900/80 border border-zinc-800 rounded-xl text-xs text-zinc-300">
                  All components loaded dynamically with zero latency.
                </div>
                <div className="flex gap-2">
                  <span className="flex-1 py-1.5 text-center bg-zinc-900 text-zinc-300 text-xs rounded-lg border border-zinc-800">
                    React 18
                  </span>
                  <span className="flex-1 py-1.5 text-center bg-zinc-900 text-zinc-300 text-xs rounded-lg border border-zinc-800">
                    Tailwind CSS
                  </span>
                  <span className="flex-1 py-1.5 text-center bg-zinc-900 text-zinc-300 text-xs rounded-lg border border-zinc-800">
                    TypeScript
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* DIALOGUE COMPONENT INSTANCE */}
      <Dialogue
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          setModalConfirmed(true);
          triggerToast("success", "Action confirmed from Beautiful Modal!");
        }}
        title="Beautiful Modal"
        description="This is a beautiful animated modal with smooth entrance and exit animations. Click outside or press Escape to close."
        features={[
          "Smooth animations",
          "Backdrop blur effect",
          "Responsive design",
          "Keyboard navigation (ESC to close)",
        ]}
        confirmText="Confirm"
        cancelText="Cancel"
      />
    </div>
  );
}
