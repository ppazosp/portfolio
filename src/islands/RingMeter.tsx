import { motion } from 'framer-motion';

interface RingMeterProps {
  value: number;
  max: number;
  label: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export default function RingMeter({
  value,
  max,
  label,
  size = 60,
  strokeWidth = 2,
  className = '',
}: RingMeterProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = (value / max) * 100;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <div className="relative">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="hsl(var(--color-border))"
            strokeWidth={strokeWidth}
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="hsl(var(--color-foreground))"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{
              duration: 2,
              ease: [0.23, 1, 0.32, 1],
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-mono text-tabular">
            {Math.round(percentage)}%
          </span>
        </div>
      </div>
      <span className="text-xs text-muted font-mono text-center">{label}</span>
    </div>
  );
}