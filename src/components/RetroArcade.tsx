import BreakoutGame from './games/BreakoutGame';

export default function RetroArcade() {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-2xl">
        {/* Portrait orientation for mobile and desktop */}
        <div className="relative border border-border bg-background overflow-hidden h-[700px] md:h-[800px]">
          <BreakoutGame />

          {/* Scanline overlay */}
          <div className="absolute inset-0 pointer-events-none scanline-overlay" />
        </div>
      </div>
    </div>
  );
}
