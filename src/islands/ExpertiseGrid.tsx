import { useState } from 'react';
import { motion } from 'framer-motion';

interface ExpertiseItem {
  title: string;
  description: string;
  progress: number;
}

interface ExpertiseGridProps {
  capabilities: ExpertiseItem[];
  className?: string;
}

export default function ExpertiseGrid({ capabilities, className = '' }: ExpertiseGridProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {capabilities.map((capability, index) => (
        <motion.div
          key={capability.title}
          className="group relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          onHoverStart={() => setHoveredIndex(index)}
          onHoverEnd={() => setHoveredIndex(null)}
        >
          {/* Background glow effect */}
          <motion.div
            className="absolute -inset-0.5 bg-gradient-to-r from-accent/10 via-accent/5 to-accent/10 rounded-lg opacity-0 blur-sm"
            animate={{
              opacity: hoveredIndex === index ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Main card */}
          <div className="relative border-subtle rounded-lg p-6 bg-background h-full transition-all duration-300 group-hover:border-accent/20">
            {/* Header with number badge */}
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-mono text-foreground leading-tight pr-4">
                {capability.title}
              </h3>
              <div className="flex-shrink-0 w-8 h-8 border border-border rounded-full flex items-center justify-center text-xs font-mono text-muted group-hover:border-accent/40 group-hover:text-accent/80 transition-colors">
                {String(index + 1).padStart(2, '0')}
              </div>
            </div>
            
            {/* Description */}
            <p className="text-sm text-muted font-mono mb-6 leading-relaxed">
              {capability.description}
            </p>
            
            {/* Progress indicator with enhanced styling */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted font-mono uppercase tracking-wider">
                  Proficiency
                </span>
                <span className="text-sm text-foreground font-mono text-tabular">
                  {capability.progress}%
                </span>
              </div>
              
              {/* Custom progress bar */}
              <div className="relative h-2 bg-border rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    background: `linear-gradient(90deg, 
                      hsl(var(--color-foreground)) 0%, 
                      hsl(var(--color-accent)) 100%)`,
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${capability.progress}%` }}
                  transition={{
                    duration: 1.5,
                    delay: index * 0.1 + 0.5,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                />
                
                {/* Animated dot */}
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 w-1 h-1 bg-accent rounded-full shadow-lg"
                  initial={{ left: '0%' }}
                  animate={{ left: `${capability.progress}%` }}
                  transition={{
                    duration: 1.5,
                    delay: index * 0.1 + 0.5,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                  style={{
                    filter: 'drop-shadow(0 0 4px hsl(var(--color-accent)))',
                    marginLeft: '-2px',
                  }}
                />
              </div>
            </div>
            
            {/* Subtle corner accent */}
            <motion.div
              className="absolute top-6 right-6 w-1 h-1 bg-accent rounded-full opacity-0"
              animate={{
                opacity: hoveredIndex === index ? 0.6 : 0,
                scale: hoveredIndex === index ? 1.5 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}