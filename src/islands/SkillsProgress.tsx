import ProgressBar from './ProgressBar';

interface Skill {
  name: string;
  percentage: number;
}

interface SkillsProgressProps {
  className?: string;
}

const skills: Skill[] = [
  { name: 'Backend', percentage: 92 },
  { name: 'Frontend', percentage: 88 },
  { name: 'UI/UX Design', percentage: 85 },
  { name: 'AI', percentage: 94 },
  { name: 'DevOps', percentage: 75 },
  { name: 'Security', percentage: 68 },
];

export default function SkillsProgress({ className = '' }: SkillsProgressProps) {
  return (
    <div className={`bg-background rounded-2xl px-8 py-6 ${className}`}>
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