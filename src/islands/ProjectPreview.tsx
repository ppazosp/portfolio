import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

interface ProjectPreviewProps {
  title: string;
  role: string;
  problem: string;
  approach: string;
  outcome: string;
  stack: string[];
  metrics: { label: string; value: string }[];
  links: { label: string; url: string }[];
  className?: string;
}

export default function ProjectPreview({
  title,
  role,
  problem,
  approach,
  outcome,
  stack,
  metrics,
  links,
  className = '',
}: ProjectPreviewProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="border-subtle rounded-lg p-6 bg-background transition-colors duration-200 hover:border-foreground/20">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-mono text-foreground mb-1">{title}</h3>
            <p className="text-sm text-muted font-mono">{role}</p>
          </div>
          {links.length > 0 && (
            <ExternalLink className="w-4 h-4 text-muted" />
          )}
        </div>
        
        <p className="text-sm text-muted font-mono leading-relaxed line-clamp-2">
          {problem}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {stack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs font-mono bg-border/50 text-muted rounded"
            >
              {tech}
            </span>
          ))}
          {stack.length > 3 && (
            <span className="px-2 py-1 text-xs font-mono text-muted">
              +{stack.length - 3} more
            </span>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 z-10 border-subtle rounded-lg bg-background p-6 shadow-2xl border-foreground/20"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-mono text-foreground mb-1">{title}</h3>
                <p className="text-sm text-muted font-mono">{role}</p>
              </div>
              {links.length > 0 && (
                <div className="flex gap-2">
                  {links.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:text-accent/80 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-3 text-sm font-mono">
              <div>
                <p className="text-muted mb-1">Problem</p>
                <p className="text-foreground leading-relaxed">{problem}</p>
              </div>
              
              <div>
                <p className="text-muted mb-1">Approach</p>
                <p className="text-foreground leading-relaxed">{approach}</p>
              </div>
              
              <div>
                <p className="text-muted mb-1">Outcome</p>
                <p className="text-foreground leading-relaxed">{outcome}</p>
              </div>
            </div>

            {metrics.length > 0 && (
              <div className="mt-4 border-t border-border pt-4">
                <p className="text-muted text-sm font-mono mb-2">Impact</p>
                <div className="grid grid-cols-2 gap-3">
                  {metrics.map((metric) => (
                    <div key={metric.label} className="flex justify-between">
                      <span className="text-xs text-muted font-mono">{metric.label}</span>
                      <span className="text-xs text-foreground font-mono text-tabular">
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-4 flex flex-wrap gap-1">
              {stack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-xs font-mono bg-border/50 text-muted rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}