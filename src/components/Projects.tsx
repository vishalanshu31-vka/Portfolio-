import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, ShieldAlert, Cpu, Terminal, ArrowUpRight, FolderGit2, Sparkles, Filter } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { ProjectItem } from '../types';
import { soundEffects } from '../utils/soundEffects';

interface ProjectsProps {
  onSelectProject: (project: ProjectItem) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const categories = ['ALL', 'AI / ML', 'Full Stack', 'Systems & C++'];

  const filteredProjects = activeCategory === 'ALL'
    ? portfolioData.projects
    : portfolioData.projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="relative py-24 bg-black bg-elegant-dots border-t border-white/10 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-red-950/20 blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-red-600/10 border border-red-600/40 text-red-500 font-mono text-xs uppercase tracking-[0.2em] mb-3">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>05 // MISSION ARCHIVES</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-black text-white uppercase tracking-tighter">
            FEATURED <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">PROJECTS</span>
          </h2>

          <p className="font-mono text-xs sm:text-sm text-white/50 mt-2 tracking-widest uppercase">
            Things I've Built • Real systems, AI tools, and algorithmic experiments brought to life
          </p>

          <div className="w-20 h-px bg-red-600 mt-4" />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundEffects.playClick();
                setActiveCategory(cat);
              }}
              className={`px-4 py-2 font-mono text-xs tracking-[0.15em] transition-all uppercase cursor-pointer ${
                activeCategory === cat
                  ? 'bg-red-700 text-white font-bold border border-red-500'
                  : 'bg-white/5 text-white/60 border border-white/10 hover:text-white hover:border-white/30'
              }`}
            >
              {cat === 'ALL' ? 'ALL MISSIONS (06)' : cat}
            </button>
          ))}
        </div>

        {/* Cinematic Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              onMouseEnter={() => soundEffects.playHover()}
              className="bg-white/5 border border-white/10 hover:border-red-600/60 transition-all duration-300 flex flex-col justify-between overflow-hidden group relative"
            >
              <div>
                {/* Project Image & Mission Tag Overlay */}
                <div className="relative aspect-video w-full overflow-hidden bg-black border-b border-white/10">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                  {/* Top HUD Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 bg-black/90 border border-red-600/60 text-red-400 font-mono text-[11px] font-bold tracking-widest uppercase">
                      MISSION {project.missionNumber}
                    </span>

                    <span className="px-2 py-0.5 bg-black/80 border border-white/20 text-white/80 font-mono text-[10px] uppercase tracking-wider">
                      {project.status}
                    </span>
                  </div>

                  {/* Category Pill */}
                  <div className="absolute bottom-3 left-3">
                    <span className="px-2 py-0.5 bg-red-600/20 border border-red-600/40 text-red-300 font-mono text-[10px] uppercase tracking-wider">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6 space-y-3">
                  <h3 className="font-display font-bold text-lg text-white uppercase group-hover:text-red-400 transition-colors line-clamp-1">
                    {project.title}
                  </h3>

                  <p className="text-xs text-white/60 line-clamp-3 leading-relaxed font-sans">
                    {project.description}
                  </p>

                  {/* Technologies Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.technologies.slice(0, 4).map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono px-2 py-0.5 bg-black border border-white/10 text-white/70 uppercase tracking-wider"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 bg-black border border-white/10 text-red-400 uppercase">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="p-4 px-6 border-t border-white/10 bg-black/40 flex items-center justify-between gap-2">
                <button
                  onClick={() => {
                    soundEffects.playClick();
                    onSelectProject(project);
                  }}
                  className="flex items-center space-x-1.5 text-xs font-mono text-white/80 hover:text-red-400 transition-colors uppercase tracking-wider cursor-pointer"
                >
                  <span>MISSION SPECS</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center space-x-2">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => soundEffects.playClick()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-700 hover:bg-red-600 border border-red-500 text-white font-mono text-[11px] font-bold uppercase tracking-wider transition-colors"
                      title="Launch Live Demo"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>DEMO</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
