import React from 'react';
import { motion } from 'motion/react';
import { BrainCircuit, Binary, Workflow, Database, Flame, Sparkles, BookMarked, ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { soundEffects } from '../utils/soundEffects';

export const CurrentlyLearning: React.FC = () => {
  const getLearningIcon = (iconName: string) => {
    switch (iconName) {
      case 'BrainCircuit':
        return <BrainCircuit className="w-6 h-6 text-red-500" />;
      case 'Binary':
        return <Binary className="w-6 h-6 text-red-500" />;
      case 'Workflow':
        return <Workflow className="w-6 h-6 text-red-500" />;
      case 'DatabaseBackup':
      default:
        return <Database className="w-6 h-6 text-red-500" />;
    }
  };

  return (
    <section id="learning" className="relative py-24 bg-black bg-elegant-dots border-t border-white/10 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-cyber-grid-dense opacity-20 pointer-events-none" />
      <div className="absolute -left-32 top-1/3 w-80 h-80 rounded-full bg-red-950/20 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-red-600/10 border border-red-600/40 text-red-500 font-mono text-xs uppercase tracking-[0.2em] mb-3">
            <BookMarked className="w-3.5 h-3.5" />
            <span>04 // INTEL PROGRESSION</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-black text-white uppercase tracking-tighter">
            CURRENTLY <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">LEARNING</span>
          </h2>

          <p className="font-mono text-xs sm:text-sm text-white/50 mt-2 tracking-widest uppercase">
            Active exploration frontiers and advanced architectural mastery
          </p>

          <div className="w-20 h-px bg-red-600 mt-4" />
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portfolioData.currentlyLearning.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onMouseEnter={() => soundEffects.playHover()}
              className="p-6 bg-white/5 border border-white/10 hover:border-red-600/60 transition-all duration-300 relative group flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 bg-black border border-white/10 group-hover:border-red-600/50 transition-all">
                      {getLearningIcon(item.iconName)}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-red-500 px-2 py-0.5 bg-red-600/10 border border-red-600/40 font-bold">
                        {item.tag}
                      </span>
                      <h3 className="font-display font-bold text-base sm:text-lg text-white uppercase tracking-wide mt-1.5 group-hover:text-red-400 transition-colors">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <div className="text-right font-mono">
                    <div className="text-lg font-bold text-red-400">{item.progress}%</div>
                    <span className="text-[9px] text-white/40 uppercase tracking-widest block">
                      {item.status}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-sans mb-5">
                  {item.description}
                </p>

                {/* Core Topics Checklist */}
                <div className="space-y-2 mb-5">
                  <span className="font-mono text-[11px] text-white/40 uppercase tracking-widest block">
                    ACTIVE MODULES & CONCEPTS:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.topics.map((topic, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[11px] font-mono px-2 py-0.5 bg-black border border-white/10 text-white/70 uppercase tracking-wider"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Progress Bar Visualization */}
              <div className="space-y-1.5 pt-4 border-t border-white/10">
                <div className="flex justify-between text-[10px] font-mono text-white/40 uppercase tracking-wider">
                  <span>MASTERY TRAJECTORY</span>
                  <span>{item.progress}/100</span>
                </div>
                <div className="w-full bg-black h-2 overflow-hidden border border-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeOut', delay: idx * 0.1 }}
                    className="h-full bg-gradient-to-r from-red-800 via-red-600 to-red-400"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
