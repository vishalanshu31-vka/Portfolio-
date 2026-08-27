export interface SkillItem {
  name: string;
  level: number; // 0-100
  iconName: string;
  category: 'languages' | 'frontend' | 'backend' | 'tools';
  description?: string;
  featured?: boolean;
}

export interface SkillCategory {
  id: string;
  number: string;
  title: string;
  description: string;
  skills: SkillItem[];
}

export interface LearningItem {
  id: string;
  title: string;
  tag: string;
  description: string;
  progress: number;
  topics: string[];
  iconName: string;
  status: 'In Progress' | 'Active Exploration' | 'Core Mastery';
}

export interface ProjectItem {
  id: string;
  missionNumber: string;
  title: string;
  tagline: string;
  description: string;
  fullObjective?: string;
  status: 'COMPLETED' | 'ACTIVE REFACTOR' | 'PROTOTYPE' | 'DEPLOYED';
  category: 'Full Stack' | 'AI / ML' | 'Systems & C++' | 'Web App';
  technologies: string[];
  features: string[];
  metrics?: { label: string; value: string }[];
  githubUrl: string;
  liveUrl?: string;
  image: string;
  highlights: string[];
}

export interface CertificateItem {
  id: string;
  title: string;
  organization: string;
  category: 'MongoDB & AI Architecture' | 'Machine Learning & AI' | 'Computer Systems & Programming';
  docType?: 'Proof of Completion' | 'Skill Credential' | 'Course Certificate' | 'Internship Evaluation & Certificate' | 'Certificate of Appreciation';
  issueDate: string;
  credentialId: string;
  credentialUrl?: string;
  verifyPlatform?: string;
  description: string;
  skillsGained: string[];
  image: string;
  badgeCode: string;
  signatories?: string[];
  score?: string;
  performanceMetrics?: { label: string; value: string }[];
  featured?: boolean;
}

export interface AchievementItem {
  id: string;
  title: string;
  category: 'Hackathon' | 'Coding' | 'Academic' | 'Leadership';
  rank?: string;
  date: string;
  organizer: string;
  description: string;
  highlights: string[];
  badge: string;
  featured?: boolean;
}

export interface StatItem {
  id: string;
  label: string;
  value: number;
  suffix: string;
  subtext: string;
  iconName: string;
}

export interface AcademicJourney {
  degree: string;
  major: string;
  university: string;
  duration: string;
  currentCGPA: string;
  status: string;
  focusAreas: string[];
  highlights: string[];
  coursework: string[];
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  email: string;
  twitter?: string;
  leetcode?: string;
  resumeUrl: string;
}

export interface PortfolioData {
  personal: {
    name: string;
    shortName: string;
    title: string;
    subTitles: string[];
    tagline: string;
    introduction: string;
    heroStatement: string;
    bio: string;
    avatar?: string;
    location: string;
    statusBadge: string;
    highlightCards: {
      id: string;
      title: string;
      subtitle: string;
      description: string;
      iconName: string;
      stat: string;
    }[];
  };
  socials: SocialLinks;
  education: AcademicJourney;
  skillCategories: SkillCategory[];
  currentlyLearning: LearningItem[];
  projects: ProjectItem[];
  certifications: CertificateItem[];
  achievements: AchievementItem[];
  stats: StatItem[];
  collaborationInterests: string[];
}
