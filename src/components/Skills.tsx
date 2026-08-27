import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Code, 
  Terminal, 
  FileCode, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  Atom, 
  Globe, 
  Palette, 
  Layout, 
  Sparkles, 
  Database, 
  Server, 
  Network, 
  HardDrive, 
  Table, 
  Share2, 
  GitBranch, 
  Code2, 
  Send, 
  Figma, 
  TerminalSquare, 
  Container,
  Wrench,
  Flame,
  Check
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { SkillCategory, SkillItem } from '../types';
import { soundEffects } from '../utils/soundEffects';

export const Skills: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const getSkillIcon = (iconName: string) => {
    const map: Record<string, React.ReactNode> = {
      Code: <Code className="w-5 h-5 text-red-500" />,
      Terminal: <Terminal className="w-5 h-5 text-red-500" />,
      FileCode: <FileCode className="w-5 h-5 text-red-500" />,
      Cpu: <Cpu className="w-5 h-5 text-red-500" />,
      Layers: <Layers className="w-5 h-5 text-red-500" />,
      ShieldCheck: <ShieldCheck className="w-5 h-5 text-red-500" />,
      Atom: <Atom className="w-5 h-5 text-red-500" />,
      Globe: <Globe className="w-5 h-5 text-red-500" />,
      Palette: <Palette className="w-5 h-5 text-red-500" />,
      Layout: <Layout className="w-5 h-5 text-red-500" />,
      Sparkles: <Sparkles className="w-5 h-5 text-red-500" />,
      Database: <Database className="w-5 h-5 text-red-500" />,
      Server: <Server className="w-5 h-5 text-red-500" />,
      Network: <Network className="w-5 h-5 text-red-500" />,
      HardDrive: <HardDrive className="w-5 h-5 text-red-500" />,
      Table: <Table className="w-5 h-5 text-red-500" />,
      Share2: <Share2 className="w-5 h-5 text-red-500" />,
      GitBranch: <GitBranch className="w-5 h-5 text-red-500" />,
      Code2: <Code2 className="w-5 h-5 text-red-500" />,
      Send: <Send className="w-5 h-5 text-red-500" />,
      Figma: <Figma className="w-5 h-5 text-red-500" />,
      TerminalSquare: <TerminalSquare className="w-5 h-5 text-red-500" />,
      Container: <Container className="w-5 h-5 text-red-500" />,
    };
    return map[iconName] || <Cpu className="w-5 h-5 text-red-500" />;
  };

  const filteredCategories = activeTab === 'all'
    ? portfolioData.skillCategories
    : portfolioData.skillCategories.filter(c => c.id === activeTab);

  return (
    <section id="skills" className="relative py-24 bg-black bg-elegant-dots border-t border-white/10 overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-red-950/15 blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-red-600/10 border border-red-600/40 text-red-500 font-mono text-xs uppercase tracking-[0.2em] mb-3">
            <Wrench className="w-3.5 h-3.5" />
            <span>03 // TECHNICAL ARSENAL</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-black text-white uppercase tracking-tighter">
            SKILLS & <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">TECHNOLOGIES</span>
          </h2>

          <p className="font-mono text-xs sm:text-sm text-white/50 mt-2 tracking-widest uppercase">
            Proven technological capability across systems, frontend, backend and infrastructure
          </p>

          <div className="w-20 h-px bg-red-600 mt-4" />
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <button
            onClick={() => {
              soundEffects.playClick();
              setActiveTab('all');
            }}
            className={`px-4 py-2 font-mono text-xs tracking-[0.2em] transition-all uppercase cursor-pointer ${
              activeTab === 'all'
                ? 'bg-red-700 text-white font-bold border border-red-500'
                : 'bg-white/5 text-white/60 border border-white/10 hover:text-white hover:border-white/30'
            }`}
          >
            ALL ARSENAL
          </button>
          {portfolioData.skillCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                soundEffects.playClick();
                setActiveTab(cat.id);
              }}
              className={`px-4 py-2 font-mono text-xs tracking-[0.15em] transition-all uppercase cursor-pointer ${
                activeTab === cat.id
                  ? 'bg-red-700 text-white font-bold border border-red-500'
                  : 'bg-white/5 text-white/60 border border-white/10 hover:text-white hover:border-white/30'
              }`}
            >
              {cat.number} — {cat.title}
            </button>
          ))}
        </div>

        {/* Categories Stack */}
        <div className="space-y-12">
          {filteredCategories.map((category) => (
            <div key={category.id} className="space-y-4">
              {/* Category Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-white/10 gap-2">
                <div className="flex items-center space-x-3">
                  <span className="px-2.5 py-0.5 bg-red-600/10 border border-red-600/40 text-red-500 font-mono text-xs font-bold tracking-wider">
                    {category.number}
                  </span>
                  <h3 className="font-display font-bold text-lg sm:text-xl text-white uppercase tracking-wide">
                    {category.title}
                  </h3>
                </div>
                <p className="font-mono text-xs text-white/50 tracking-wider">
                  {category.description}
                </p>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.skills.map((skill, idx) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    onMouseEnter={() => soundEffects.playHover()}
                    className="p-4 bg-white/5 border border-white/10 hover:border-red-600/60 transition-all duration-300 group relative overflow-hidden"
                  >
                    {/* Header: Icon + Name + Level */}
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-black border border-white/10 group-hover:border-red-600/50 transition-all">
                          {getSkillIcon(skill.iconName)}
                        </div>
                        <div>
                          <h4 className="font-mono font-bold text-sm text-white group-hover:text-red-400 transition-colors">
                            {skill.name}
                          </h4>
                          {skill.featured && (
                            <span className="text-[9px] font-mono text-red-500 font-bold tracking-wider uppercase flex items-center gap-1">
                              <Flame className="w-2.5 h-2.5" /> CORE MASTERY
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="font-mono text-xs font-bold text-red-400">
                        {skill.level}%
                      </span>
                    </div>

                    {/* Description */}
                    {skill.description && (
                      <p className="text-xs text-white/60 font-sans mb-3 line-clamp-2 leading-relaxed">
                        {skill.description}
                      </p>
                    )}

                    {/* Progress Bar */}
                    <div className="w-full bg-black h-1.5 overflow-hidden border border-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: idx * 0.05 }}
                        className="h-full bg-gradient-to-r from-red-700 to-red-500"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
