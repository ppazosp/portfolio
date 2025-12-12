import BreakoutGame from './games/BreakoutGame';

export default function RetroArcade() {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-5xl px-4">
        {/* Landscape aspect ratio (3:2) */}
        <div className="relative border border-border bg-background overflow-hidden" style={{ aspectRatio: '3/2' }}>
          <BreakoutGame />

          {/* Scanline overlay */}
          <div className="absolute inset-0 pointer-events-none scanline-overlay" />
        </div>
      </div>
    </div>
  );
}
