import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { Trophy, Award, Medal, Zap, Terminal, GraduationCap, FolderGit2, Sparkles, CheckCircle2, Crown } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { StatItem } from '../types';
import { soundEffects } from '../utils/soundEffects';

interface StatCounterProps {
  stat: StatItem;
}

const StatCounter: React.FC<StatCounterProps> = ({ stat }) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = stat.value;
    const isDecimal = end % 1 !== 0;
    const duration = 1400; // ms
    const startTime = performance.now();

    const updateCount = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
      const current = isDecimal
        ? parseFloat((easeProgress * end).toFixed(2))
        : Math.floor(easeProgress * end);

      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setDisplayValue(end);
      }
    };

    requestAnimationFrame(updateCount);
  }, [isInView, stat.value]);

  const getStatIcon = (iconName: string) => {
    switch (iconName) {
      case 'FolderGit2':
        return <FolderGit2 className="w-5 h-5 text-red-500" />;
      case 'Award':
        return <Award className="w-5 h-5 text-red-500" />;
      case 'Trophy':
        return <Trophy className="w-5 h-5 text-red-500" />;
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5 text-red-500" />;
      default:
        return <Terminal className="w-5 h-5 text-red-500" />;
    }
  };

  return (
    <div
      ref={ref}
      onMouseEnter={() => soundEffects.playHover()}
      className="p-5 bg-white/5 border border-white/10 hover:border-red-600/70 transition-all duration-300 flex flex-col justify-between group"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="p-2.5 bg-black border border-white/10 group-hover:border-red-600/50 transition-all">
          {getStatIcon(stat.iconName)}
        </div>
        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
      </div>

      <div>
        <div className="text-3xl sm:text-4xl font-display font-black text-white group-hover:text-red-400 transition-colors">
          {displayValue}
          <span className="text-red-500">{stat.suffix}</span>
        </div>
        <h4 className="font-display font-bold text-xs sm:text-sm text-white uppercase tracking-wide mt-1">
          {stat.label}
        </h4>
        <p className="text-[11px] font-mono text-white/40 mt-1 uppercase tracking-wider">
          {stat.subtext}
        </p>
      </div>
    </div>
  );
};

export const Achievements: React.FC = () => {
  const featuredAchievement = portfolioData.achievements.find((a) => a.featured) || portfolioData.achievements[0];
  const secondaryAchievements = portfolioData.achievements.filter((a) => a.id !== featuredAchievement.id);

  return (
    <section id="achievements" className="relative py-24 bg-black bg-elegant-dots border-t border-white/10 overflow-hidden">
      {/* Background Cyber Grids */}
      <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/3 -left-32 w-80 h-80 rounded-full bg-red-950/20 blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-red-600/10 border border-red-600/40 text-red-500 font-mono text-xs uppercase tracking-[0.2em] mb-3">
            <Trophy className="w-3.5 h-3.5" />
            <span>07 // VICTORIES & MILESTONES</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-black text-white uppercase tracking-tighter">
            HIGHLIGHTS OF MY <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">JOURNEY</span>
          </h2>

          <p className="font-mono text-xs sm:text-sm text-white/50 mt-2 tracking-widest uppercase">
            Recognitions, Hackathon Podiums & Quantitative Coding Metrics
          </p>

          <div className="w-20 h-px bg-red-600 mt-4" />
        </div>

        {/* Animated Numerical Telemetry Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-16">
          {portfolioData.stats.map((stat) => (
            <StatCounter key={stat.id} stat={stat} />
          ))}
        </div>

        {/* Main Highlighted Achievement Feature Card */}
        <div className="mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-6 sm:p-10 bg-white/5 border border-red-600/60 relative overflow-hidden group"
          >
            {/* Background Glow Ring */}
            <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-red-600/10 blur-3xl pointer-events-none" />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-red-600/20 border border-red-500 flex items-center justify-center">
                  <Crown className="w-7 h-7 text-red-400" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 bg-red-700 text-white font-mono text-[10px] font-bold uppercase tracking-widest">
                      FEATURED TRIUMPH
                    </span>
                    <span className="font-mono text-xs text-red-400 font-bold">
                      {featuredAchievement.badge}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-3xl font-display font-black text-white uppercase mt-1">
                    {featuredAchievement.title}
                  </h3>
                </div>
              </div>

              <div className="font-mono text-xs text-white/60 text-left lg:text-right space-y-1">
                <div className="text-red-400 font-bold">{featuredAchievement.rank}</div>
                <div>{featuredAchievement.organizer}</div>
                <div className="text-white/40">{featuredAchievement.date}</div>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <p className="text-sm sm:text-base text-white/80 leading-relaxed font-sans max-w-4xl">
                {featuredAchievement.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {featuredAchievement.highlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-black border border-white/10 flex items-start space-x-2.5 text-xs text-white/70"
                  >
                    <CheckCircle2 className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Secondary Achievements Cards Grid (if any) */}
        {secondaryAchievements.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {secondaryAchievements.map((ach, idx) => (
              <motion.div
                key={ach.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onMouseEnter={() => soundEffects.playHover()}
                className="p-6 bg-white/5 border border-white/10 hover:border-red-600/70 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2 py-0.5 bg-black border border-white/10 text-red-400 font-mono text-[10px] uppercase font-bold tracking-wider">
                      {ach.category}
                    </span>
                    <span className="font-mono text-[10px] text-white/40">
                      {ach.date}
                    </span>
                  </div>

                  <h4 className="font-display font-bold text-base text-white uppercase group-hover:text-red-400 transition-colors">
                    {ach.title}
                  </h4>

                  <p className="font-mono text-xs text-white/40 mt-0.5 uppercase tracking-wider">
                    {ach.organizer}
                  </p>

                  <p className="text-xs text-white/60 font-sans mt-3 leading-relaxed">
                    {ach.description}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10 space-y-1.5 text-[11px] font-mono text-white/60">
                  {ach.highlights.slice(0, 2).map((h, hIdx) => (
                    <div key={hIdx} className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-red-500" />
                      <span className="truncate">{h}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
