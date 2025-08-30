import ProgressBar from './ProgressBar';
import { portfolioConfig } from '../config/portfolio.config';

interface Skill {
  name: string;
  percentage: number;
}

interface SkillsProgressProps {
  className?: string;
}

const skills: Skill[] = portfolioConfig.skills;

export default function SkillsProgress({ className = '' }: SkillsProgressProps) {
  return (
    <div className={`bg-background ${className}`}>
      <div className="space-y-6">
        {skills.map((skill) => (
          <ProgressBar 
            key={skill.name}
            label={skill.name}
            percentage={skill.percentage}
          />
        ))}
      </div>
    </div>
  );
}