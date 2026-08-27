import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, ShieldAlert, Cpu, CheckCircle2, Layers, Terminal } from 'lucide-react';
import { ProjectItem } from '../types';
import { soundEffects } from '../utils/soundEffects';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative z-10 w-full max-w-3xl max-h-[90vh] flex flex-col bg-black border border-white/10 shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
            <div className="flex items-center space-x-3">
              <div className="px-3 py-1 bg-red-600/20 border border-red-600/40 text-red-400 font-mono text-xs font-bold uppercase tracking-wider">
                MISSION {project.missionNumber}
              </div>
              <span className="font-mono text-xs text-white/50">
                STATUS: <span className="text-red-400 font-semibold">{project.status}</span>
              </span>
            </div>

            <button
              onClick={() => {
                soundEffects.playClick();
                onClose();
              }}
              className="p-1.5 bg-black text-white/60 hover:text-white hover:bg-red-950/40 border border-white/10 hover:border-red-600/50 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
            {/* Project Image & Overlay */}
            <div className="relative overflow-hidden border border-white/10 aspect-video max-h-72 w-full bg-black">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover opacity-85"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[11px] font-mono uppercase tracking-widest text-red-400 px-2.5 py-0.5 bg-black/80 border border-red-600/40 font-bold">
                  {project.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-display font-black text-white mt-2 uppercase tracking-tight">
                  {project.title}
                </h2>
              </div>
            </div>

            {/* Tagline & Objective */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-white/90 leading-relaxed italic">
                "{project.tagline}"
              </p>
              <div className="p-4 bg-white/5 border border-white/10 space-y-1.5">
                <div className="font-mono text-xs text-red-500 font-bold uppercase tracking-[0.2em] flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" /> MISSION OBJECTIVE & SPECIFICATIONS
                </div>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                  {project.description}
                </p>
                {project.fullObjective && (
                  <p className="text-xs text-white/60 pt-1">
                    {project.fullObjective}
                  </p>
                )}
              </div>
            </div>

            {/* Metrics */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="grid grid-cols-2 gap-3">
                {project.metrics.map((m, idx) => (
                  <div key={idx} className="p-3 bg-white/5 border border-white/10 text-center">
                    <div className="text-xs font-mono text-white/40 uppercase tracking-widest">{m.label}</div>
                    <div className="text-lg sm:text-xl font-display font-black text-red-500 mt-0.5">
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Key Features & Architecture Highlights */}
            <div className="space-y-2">
              <h4 className="font-display font-bold text-xs uppercase tracking-widest text-white flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-red-500" /> KEY CAPABILITIES & FEATURES
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/80">
                {project.features.map((f, idx) => (
                  <li key={idx} className="flex items-start gap-2 p-2 bg-white/5 border border-white/10">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack */}
            <div className="space-y-2">
              <h4 className="font-display font-bold text-xs uppercase tracking-widest text-white/60 flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-red-500" /> TECHNOLOGICAL ARSENAL
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-black border border-white/10 text-white/80 font-mono text-xs uppercase tracking-wider"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-4 border-t border-white/10 bg-white/5 flex items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-2 px-4 py-2 bg-red-700 hover:bg-red-600 text-white font-mono text-xs transition-colors uppercase tracking-wider font-bold"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>LAUNCH LIVE DEMO</span>
                </a>
              )}
            </div>

            <button
              onClick={onClose}
              className="px-4 py-2 bg-black hover:bg-white/10 text-white/60 hover:text-white font-mono text-xs border border-white/10 transition-colors uppercase tracking-wider cursor-pointer"
            >
              DISMISS
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
