import React from "react";
import { Button } from "@/components/ui/button";
import { Home, Compass, ArrowLeft } from "lucide-react";

interface NotFoundPageProps {
  onGoHome?: () => void;
  onExplore?: () => void;
}

export default function NotFoundPage({ onGoHome, onExplore }: NotFoundPageProps) {
  return (
    <div className="fixed inset-0 bg-zinc-950 text-zinc-50 flex flex-col items-center justify-center px-4 overflow-hidden select-none">
      {/* Ambient radial glow background */}
      <div className="absolute inset-0 pointer-events-none [background:radial-gradient(70%_50%_at_50%_45%,rgba(255,255,255,0.05),transparent_70%)]" />

      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#1f1f2315_1px,transparent_1px),linear-gradient(to_bottom,#1f1f2315_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-lg mx-auto">
        {/* Giant metallic gradient 404 text matching reference design */}
        <h1 className="text-8xl sm:text-[11rem] font-black tracking-tighter leading-none bg-gradient-to-b from-zinc-100 via-zinc-400 to-zinc-700 bg-clip-text text-transparent drop-shadow-2xl">
          404
        </h1>

        {/* Subtitle message */}
        <p className="mt-4 sm:mt-6 text-base sm:text-xl text-zinc-300 font-normal leading-relaxed max-w-md">
          The page you&apos;re looking for might have been moved or doesn&apos;t exist.
        </p>

        {/* Action Buttons matching reference image */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Button
            onClick={onGoHome}
            className="w-full sm:w-auto h-12 px-6 rounded-xl bg-zinc-100 text-zinc-900 hover:bg-zinc-200 font-medium text-base shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Home className="h-5 w-5" />
            <span>Go Home</span>
          </Button>

          <Button
            onClick={onExplore}
            variant="outline"
            className="w-full sm:w-auto h-12 px-6 rounded-xl border border-zinc-800 bg-zinc-950/80 text-zinc-100 hover:bg-zinc-900 font-medium text-base transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Compass className="h-5 w-5" />
            <span>Explore</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
