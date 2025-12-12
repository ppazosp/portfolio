import BreakoutGame from './games/BreakoutGame';

export default function RetroArcade() {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-4xl">
        {/* Mobile: portrait (taller), Desktop: landscape (wider) */}
        <div className="relative border border-border bg-background overflow-hidden h-[600px] md:h-[600px]">
          <BreakoutGame />

          {/* Scanline overlay */}
          <div className="absolute inset-0 pointer-events-none scanline-overlay" />
        </div>
      </div>
    </div>
  );
}
