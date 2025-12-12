import BreakoutGame from './games/BreakoutGame';

export default function RetroArcade() {
  return (
    <div className="flex justify-center">
      <div className="w-full px-4 max-w-3xl md:max-w-6xl">
        {/* Portrait on mobile (9:16), Widescreen on desktop (16:9) */}
        <div
          className="relative border border-border bg-background overflow-hidden"
          style={{ aspectRatio: 'var(--arcade-aspect, 9/16)' }}
        >
          <style>{`
            @media (min-width: 768px) {
              [style*="--arcade-aspect"] {
                aspect-ratio: 16/9 !important;
              }
            }
          `}</style>
          <BreakoutGame />

          {/* Scanline overlay */}
          <div className="absolute inset-0 pointer-events-none scanline-overlay" />
        </div>
      </div>
    </div>
  );
}
