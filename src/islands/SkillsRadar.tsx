import { motion } from 'framer-motion';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip, ResponsiveContainer } from 'recharts';

interface SkillData {
  skill: string;
  value: number;
  fullMark: 100;
}

interface SkillsRadarProps {
  className?: string;
}

const skillsData: SkillData[] = [
  { skill: 'Backend', value: 92, fullMark: 100 },
  { skill: 'Frontend', value: 88, fullMark: 100 },
  { skill: 'UI/UX Design', value: 85, fullMark: 100 },
  { skill: 'AI', value: 94, fullMark: 100 },
  { skill: 'DevOps', value: 75, fullMark: 100 },
  { skill: 'Security', value: 68, fullMark: 100 },
];


const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border rounded px-3 py-2 shadow-lg">
        <p className="text-sm font-mono text-foreground">
          {`${payload[0].payload.skill}: ${payload[0].value}%`}
        </p>
      </div>
    );
  }
  return null;
};


export default function SkillsRadar({ className = '' }: SkillsRadarProps) {
  return (
    <motion.div
      className={`bg-background ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="w-full h-[600px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={skillsData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <PolarGrid 
              stroke="hsl(var(--color-border))" 
              strokeWidth={1}
              radialLines={false}
            />
            <PolarAngleAxis 
              dataKey="skill"
              tick={{ 
                fontSize: 16, 
                fill: 'hsl(var(--color-foreground))',
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, Liberation Mono, monospace'
              }}
              axisLine={false}
              className="text-base font-mono"
            />
            <Radar
              name="Skills"
              dataKey="value"
              stroke="hsl(var(--color-foreground))"
              fill="hsl(var(--color-foreground))"
              fillOpacity={0.1}
              strokeWidth={2}
              dot={{
                r: 4,
                fill: 'hsl(var(--color-foreground))',
                strokeWidth: 0
              }}
            />
            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}