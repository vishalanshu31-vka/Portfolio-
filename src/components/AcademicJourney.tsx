import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, BookOpen, Award, CheckCircle2, Calendar, MapPin, Sparkles, Terminal } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { soundEffects } from '../utils/soundEffects';

export const AcademicJourney: React.FC = () => {
  const { education } = portfolioData;

  return (
    <section id="academic" className="relative py-24 bg-black bg-elegant-dots border-t border-white/10 overflow-hidden">
      {/* Background Cyber Grid Accent */}
      <div className="absolute inset-0 bg-cyber-grid-dense opacity-20 pointer-events-none" />
      <div className="absolute -right-32 top-1/2 w-80 h-80 rounded-full bg-red-950/20 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-red-600/10 border border-red-600/40 text-red-500 font-mono text-xs uppercase tracking-[0.2em] mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>02 // ACADEMIC PROFILE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-black text-white uppercase tracking-tighter">
            ACADEMIC <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">JOURNEY</span>
          </h2>

          <p className="font-mono text-xs sm:text-sm text-white/50 mt-2 tracking-widest uppercase">
            Foundations in Computer Science, Systems & Computation
          </p>

          <div className="w-20 h-px bg-red-600 mt-4" />
        </div>

        {/* Dedicated Academic Command Card */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-6 sm:p-10 bg-white/5 border border-white/10 hover:border-red-600/60 transition-all duration-300 backdrop-blur-md relative group"
          >
            {/* Top HUD Telemetry Banner */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/10 text-xs font-mono">
              <div className="flex items-center space-x-2 text-red-500 font-bold tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                <span>STATUS: {education.status.toUpperCase()}</span>
              </div>
              <div className="px-3 py-1 bg-red-600/10 border border-red-600/40 text-red-400 font-mono text-xs font-bold tracking-widest uppercase">
                CGPA: {education.currentCGPA}
              </div>
            </div>

            {/* University & Degree Information */}
            <div className="mt-6 flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="space-y-2">
                <span className="text-xs font-mono text-white/40 uppercase tracking-[0.2em]">
                  UNDERGRADUATE DEGREE PROGRAM
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-black text-white uppercase tracking-tight">
                  {education.degree}
                </h3>
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-white/60 pt-1">
                  <span className="flex items-center gap-1.5 text-white">
                    <BookOpen className="w-4 h-4 text-red-500" />
                    {education.university}
                  </span>
                  <span className="flex items-center gap-1.5 text-red-400">
                    <Calendar className="w-4 h-4" />
                    {education.duration}
                  </span>
                </div>
              </div>
            </div>

            {/* Current Focus Areas Grid */}
            <div className="mt-8 pt-6 border-t border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-display font-bold text-xs uppercase tracking-[0.2em] text-red-500 flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5" /> PRIMARY FOCUS AREAS & DOMAINS
                </h4>
                <span className="text-[10px] font-mono text-white/40 tracking-wider">6 CORE VECTORS</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {education.focusAreas.map((area, idx) => (
                  <div
                    key={idx}
                    onMouseEnter={() => soundEffects.playHover()}
                    className="p-3 bg-black border border-white/10 hover:border-red-600/60 transition-all flex items-center space-x-2.5 group/item"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-red-600 group-hover/item:scale-125 transition-all shrink-0" />
                    <span className="font-mono text-xs text-white/80 group-hover/item:text-white font-medium">
                      {area}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Academic Coursework & Departmental Highlights */}
            <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Coursework */}
              <div className="space-y-3">
                <h4 className="font-display font-bold text-xs uppercase tracking-widest text-white/80">
                  RELEVANT CORE COURSEWORK
                </h4>
                <div className="flex flex-wrap gap-2">
                  {education.coursework.map((course, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-black border border-white/10 text-white/70 font-mono text-[11px] uppercase tracking-wider"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>

              {/* Department Highlights */}
              <div className="space-y-3">
                <h4 className="font-display font-bold text-xs uppercase tracking-widest text-white/80">
                  DEPARTMENTAL HIGHLIGHTS
                </h4>
                <ul className="space-y-2 text-xs text-white/60 font-sans">
                  {education.highlights.map((h, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-red-500 mt-0.5 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Schooling & Foundational Milestones */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <h4 className="font-display font-bold text-xs uppercase tracking-[0.2em] text-red-500 mb-4 flex items-center gap-2">
                <Award className="w-3.5 h-3.5" /> FOUNDATIONAL EDUCATION MILESTONES
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-black border border-white/10 hover:border-red-600/40 transition-all space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-white font-bold">ODM PUBLIC SCHOOL</span>
                    <span className="text-red-400">2022 – 2024</span>
                  </div>
                  <div className="text-xs text-white/60">BBSR, Odisha • Intermediate (PCM)</div>
                  <div className="text-xs font-mono text-red-400 font-semibold pt-1">
                    Score: 76.0%
                  </div>
                </div>

                <div className="p-4 bg-black border border-white/10 hover:border-red-600/40 transition-all space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-white font-bold">D.A.V PUBLIC SCHOOL</span>
                    <span className="text-red-400">2021 – 2022</span>
                  </div>
                  <div className="text-xs text-white/60">Paradeep, Odisha • Matriculation</div>
                  <div className="text-xs font-mono text-red-400 font-semibold pt-1">
                    Score: 88.0%
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
