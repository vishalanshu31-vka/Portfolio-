import React from 'react';
import { motion } from 'motion/react';
import { Cpu, Zap, Brain, Terminal, Shield, ArrowUpRight, CheckCircle2, UserCheck, Sparkles } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { soundEffects } from '../utils/soundEffects';
import { ProfileAvatar } from './ProfileAvatar';

export const About: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    Cpu: <Cpu className="w-6 h-6 text-red-500" />,
    Zap: <Zap className="w-6 h-6 text-red-500" />,
    Brain: <Brain className="w-6 h-6 text-red-500" />,
    Terminal: <Terminal className="w-6 h-6 text-red-500" />,
  };

  return (
    <section id="about" className="relative py-24 bg-black bg-elegant-dots border-t border-white/10 overflow-hidden">
      {/* Background Grid & Ambient Red Energy */}
      <div className="absolute inset-0 bg-cyber-grid opacity-25 pointer-events-none" />
      <div className="absolute top-1/3 -left-48 w-96 h-96 rounded-full bg-red-950/20 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-red-600/10 border border-red-600/40 text-red-500 font-mono text-xs uppercase tracking-[0.2em] mb-3">
            <UserCheck className="w-3.5 h-3.5" />
            <span>01 // DATA_CORE & PERSONA</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-black text-white uppercase tracking-tighter">
            ABOUT <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">VISHAL</span>
          </h2>

          <p className="font-mono text-xs sm:text-sm text-white/50 mt-2 tracking-widest uppercase">
            Architecting high-performance digital systems & computational logic
          </p>

          <div className="w-20 h-px bg-red-600 mt-4" />
        </div>

        {/* Two-Column About Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left Column: Mission Persona Dossier */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 sm:p-8 bg-white/5 border border-white/10 backdrop-blur-sm relative group hover:border-red-600/60 transition-all duration-300">
              {/* Corner Tech Marks */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-red-600" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-red-600" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-red-600" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-red-600" />

              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10 text-xs font-mono">
                <span className="text-red-500 font-semibold flex items-center gap-1.5 tracking-wider uppercase">
                  <Shield className="w-4 h-4 text-red-500" /> BIOGRAPHICAL DOSSIER
                </span>
                <span className="text-white/40 tracking-widest">ID: VKA-CSE-2026</span>
              </div>

              {/* Profile Card Header with Avatar */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-5 pb-5 border-b border-white/10 text-center sm:text-left">
                <ProfileAvatar size="md" showBadge={false} interactive={false} />
                <div>
                  <h4 className="text-lg font-display font-bold text-white uppercase">
                    {portfolioData.personal.name}
                  </h4>
                  <p className="text-xs font-mono text-red-400 font-semibold mt-0.5">
                    {portfolioData.personal.title}
                  </p>
                  <p className="text-xs font-mono text-white/50 mt-1">
                    {portfolioData.personal.location}
                  </p>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-display font-bold text-white uppercase leading-snug">
                Turning abstract computational challenges into robust, high-performance software.
              </h3>

              <div className="space-y-4 mt-6 text-sm text-white/70 leading-relaxed font-sans">
                <p className="text-white/90 border-l-2 border-red-500 pl-3 bg-red-950/20 py-2">
                  {portfolioData.personal.introduction}
                </p>
                <p>
                  {portfolioData.personal.bio}
                </p>
                <p>
                  Whether engineering predictive models and end-to-end NLP pipelines with <strong className="text-white">Python</strong>, <strong className="text-white">Scikit-learn</strong>, and <strong className="text-white">Pandas</strong>, or implementing algorithmic systems in <strong className="text-white">C++</strong>, I focus on clean mathematical modeling, data leakage remediation, and high-performance computation.
                </p>
              </div>

              {/* Quick Key Attributes */}
              <div className="grid grid-cols-2 gap-3 pt-6 mt-6 border-t border-white/10 text-xs font-mono">
                <div className="flex items-center space-x-2 text-white/80">
                  <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                  <span>Rapid Prototyping</span>
                </div>
                <div className="flex items-center space-x-2 text-white/80">
                  <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                  <span>High Concurrency</span>
                </div>
                <div className="flex items-center space-x-2 text-white/80">
                  <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                  <span>Clean Architecture</span>
                </div>
                <div className="flex items-center space-x-2 text-white/80">
                  <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                  <span>Algorithmic Optimization</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Highlight Attribute Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 gap-4">
            {portfolioData.personal.highlightCards.map((card, idx) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onMouseEnter={() => soundEffects.playHover()}
                className="p-6 bg-white/5 border border-white/10 hover:border-red-600/60 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Subtle Card Glow Effect */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 rounded-full blur-2xl group-hover:bg-red-600/15 transition-all" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-black border border-white/10 group-hover:border-red-600/50 transition-all">
                      {iconMap[card.iconName] || <Sparkles className="w-6 h-6 text-red-500" />}
                    </div>
                    <span className="text-xs font-mono px-2.5 py-1 bg-red-600/10 border border-red-600/40 text-red-400 font-bold tracking-wider">
                      {card.stat}
                    </span>
                  </div>

                  <h4 className="font-display font-bold text-base sm:text-lg text-white uppercase tracking-wide group-hover:text-red-400 transition-colors">
                    {card.title}
                  </h4>
                  <p className="text-xs font-mono text-white/40 uppercase mt-0.5 tracking-wider">
                    {card.subtitle}
                  </p>

                  <p className="text-sm text-white/70 font-sans mt-3 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/40 group-hover:text-red-400 transition-colors uppercase tracking-widest">
                  <span>SPECIALIZATION ACTIVE</span>
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
