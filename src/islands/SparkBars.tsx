import { motion } from 'framer-motion';

interface SparkBarsProps {
  data: number[];
  className?: string;
  height?: number;
}

export default function SparkBars({ data, className = '', height = 40 }: SparkBarsProps) {
  if (!data || data.length === 0) return null;

  const maxValue = Math.max(...data);
  const normalizedData = data.map(value => (value / maxValue) * height);

  return (
    <div className={`flex items-end gap-0.5 ${className}`} style={{ height: `${height}px` }}>
      {normalizedData.map((value, index) => (
        <motion.div
          key={index}
          className="bg-foreground min-w-[2px] rounded-sm"
          style={{ height: `${Math.max(value, 2)}px` }}
          initial={{ height: 0 }}
          animate={{ height: `${Math.max(value, 2)}px` }}
          transition={{
            duration: 1.5,
            delay: index * 0.1,
            ease: [0.23, 1, 0.32, 1],
          }}
        />
      ))}
    </div>
  );
}