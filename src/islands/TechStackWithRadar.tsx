import { useState } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts';
import { 
  SiNodedotjs, SiPython, SiPostgresql, SiMongodb, SiRedis, SiDocker,
  SiReact, SiTypescript, SiNextdotjs, SiTailwindcss, SiVite,
  SiFigma, SiAdobexd, SiSketch,
  SiTensorflow, SiPytorch, SiOpenai,
  SiAmazon, SiGithubactions, SiKubernetes, SiTerraform,
  SiAuth0, SiJsonwebtokens
} from 'react-icons/si';

interface SkillData {
  skill: string;
  value: number;
  fullMark: 100;
}

interface TechIcon {
  name: string;
  icon: any;
  category: string;
}

interface TechStackWithRadarProps {
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

const techStack: TechIcon[] = [
  // Backend
  { name: 'Node.js', icon: SiNodedotjs, category: 'Backend' },
  { name: 'Python', icon: SiPython, category: 'Backend' },
  { name: 'PostgreSQL', icon: SiPostgresql, category: 'Backend' },
  { name: 'MongoDB', icon: SiMongodb, category: 'Backend' },
  { name: 'Redis', icon: SiRedis, category: 'Backend' },
  { name: 'Docker', icon: SiDocker, category: 'Backend' },
  
  // Frontend
  { name: 'React', icon: SiReact, category: 'Frontend' },
  { name: 'TypeScript', icon: SiTypescript, category: 'Frontend' },
  { name: 'Next.js', icon: SiNextdotjs, category: 'Frontend' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, category: 'Frontend' },
  { name: 'Vite', icon: SiVite, category: 'Frontend' },
  
  // UI/UX Design
  { name: 'Figma', icon: SiFigma, category: 'UI/UX Design' },
  { name: 'Adobe XD', icon: SiAdobexd, category: 'UI/UX Design' },
  { name: 'Sketch', icon: SiSketch, category: 'UI/UX Design' },
  
  // AI
  { name: 'TensorFlow', icon: SiTensorflow, category: 'AI' },
  { name: 'PyTorch', icon: SiPytorch, category: 'AI' },
  { name: 'OpenAI', icon: SiOpenai, category: 'AI' },
  
  // DevOps
  { name: 'AWS', icon: SiAmazon, category: 'DevOps' },
  { name: 'GitHub Actions', icon: SiGithubactions, category: 'DevOps' },
  { name: 'Kubernetes', icon: SiKubernetes, category: 'DevOps' },
  { name: 'Terraform', icon: SiTerraform, category: 'DevOps' },
  
  // Security
  { name: 'Auth0', icon: SiAuth0, category: 'Security' },
  { name: 'JWT', icon: SiJsonwebtokens, category: 'Security' },
];


export default function TechStackWithRadar({ className = '' }: TechStackWithRadarProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const filteredTechStack = selectedCategory 
    ? techStack.filter(tech => tech.category === selectedCategory)
    : techStack;

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };


  return (
    <div className={`bg-background ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Column - Tech Stack Icons */}
        <div className="space-y-6">
          <div className="text-xs text-muted font-mono uppercase tracking-wider mb-6">
            {selectedCategory ? `${selectedCategory} Technologies` : 'Technology Stack'}
          </div>
          
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-6">
            {filteredTechStack.map((tech) => (
              <div
                key={tech.name}
                className="flex flex-col items-center space-y-2"
              >
                <div className="p-3 border border-border">
                  <tech.icon className="w-8 h-8 text-foreground" />
                </div>
                <span className="text-xs text-muted font-mono text-center leading-tight">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
          
          {selectedCategory && (
            <button
              className="text-xs text-muted font-mono mt-6"
              onClick={() => setSelectedCategory(null)}
            >
              ← Show all technologies
            </button>
          )}
        </div>

        {/* Right Column - Spider Chart */}
        <div className="w-full h-[500px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart 
              data={skillsData} 
              margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
              onClick={(data) => {
                if (data && data.activeLabel) {
                  handleCategoryClick(data.activeLabel);
                }
              }}
            >
              <PolarGrid 
                stroke="hsl(var(--color-border))" 
                strokeWidth={1}
                radialLines={false}
              />
              <PolarAngleAxis 
                dataKey="skill"
                tick={{ 
                  fontSize: 14, 
                  fill: 'hsl(var(--color-foreground))',
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, Liberation Mono, monospace'
                }}
                axisLine={false}
                className="text-sm font-mono"
              />
              <Radar
                name="Skills"
                dataKey="value"
                stroke="hsl(var(--color-foreground))"
                fill="hsl(var(--color-foreground))"
                fillOpacity={selectedCategory ? 0.05 : 0.1}
                strokeWidth={2}
                dot={false}
              />
            </RadarChart>
          </ResponsiveContainer>
          
          {/* Larger center clickable area */}
          <div 
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div 
              className="w-32 h-32 rounded-full pointer-events-auto"
              onClick={() => setSelectedCategory(null)}
            />
          </div>
          
          {/* Chart Instructions */}
          <div className="text-center mt-4">
            <p className="text-xs text-muted font-mono">
              Click on chart segments to filter technologies
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}