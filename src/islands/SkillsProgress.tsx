import ProgressBar from './ProgressBar';

interface Skill {
  name: string;
  percentage: number;
}

interface SkillsProgressProps {
  className?: string;
}

const skills: Skill[] = [
  { name: 'Backend', percentage: 72 },
  { name: 'Frontend', percentage: 75 },
  { name: 'UI/UX Design', percentage: 61 },
  { name: 'AI', percentage: 84 },
  { name: 'DevOps', percentage: 53 },
  { name: 'Security', percentage: 67 },
];

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