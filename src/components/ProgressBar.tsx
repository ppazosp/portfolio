interface ProgressBarProps {
  label: string;
  percentage: number;
  className?: string;
}

export default function ProgressBar({ label, percentage, className = '' }: ProgressBarProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      {/* Skill name and percentage */}
      <div className="flex justify-between items-baseline">
        <span className="text-sm font-mono text-muted">
          {label}
        </span>
        <span className="text-sm font-mono text-foreground text-tabular">
          {percentage}%
        </span>
      </div>
      
      {/* Progress bar */}
      <div className="relative h-6 flex gap-[1px] sm:gap-[2px]">
        {/* Generate vertical lines */}
        {Array.from({ length: 100 }, (_, i) => {
          const isActive = (i) < percentage;
          return (
            <div
              key={i}
              className="flex-1"
              style={{
                backgroundColor: isActive ? 'hsl(0 0% 90%)' : 'hsl(0 0% 20%)',
                minWidth: '1px'
              }}
            />
          );
        })}
      </div>
    </div>
  );
}