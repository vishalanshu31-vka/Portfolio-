import React from 'react';
import { motion } from 'motion/react';
import { ArrowUp, Terminal, Shield, Sparkles } from 'lucide-react';
import { DoomsdayCanvas } from './DoomsdayCanvas';
import { portfolioData } from '../data/portfolioData';
import { soundEffects } from '../utils/soundEffects';

interface FinalCinematicSectionProps {
  onBackToTop: () => void;
}

export const FinalCinematicSection: React.FC<FinalCinematicSectionProps> = ({ onBackToTop }) => {
  return (
    <section className="relative py-28 bg-[#020204] border-t border-red-950/60 overflow-hidden flex flex-col items-center justify-center text-center">
      {/* Background Doomsday Canvas */}
      <DoomsdayCanvas intensity="subtle" interactive={true} />

      {/* Cyber Grid */}
      <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none" />

      {/* Atmospheric Central Red Glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-red-900/15 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-red-950/70 border border-red-800/50 text-red-400 font-mono text-xs uppercase tracking-widest"
        >
          <Shield className="w-3.5 h-3.5" />
          <span>MISSION INITIATIVE: 2026 & BEYOND</span>
        </motion.div>

        {/* Large Cinematic Callout */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-2xl sm:text-4xl md:text-5xl font-display font-extrabold text-zinc-100 uppercase tracking-wide"
        >
          Built by struggle, driven by dreams
        </motion.h2>

        {/* Name Reveal */}
        <motion.h3
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-3xl sm:text-5xl md:text-6xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-red-400 to-red-600 uppercase drop-shadow-[0_0_30px_rgba(239,68,68,0.5)]"
        >
          {portfolioData.personal.name}
        </motion.h3>

        {/* Motto */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="font-mono text-xs sm:text-sm text-red-400 tracking-[0.35em] uppercase font-bold"
        >
          BUILD. LEARN. CREATE.
        </motion.p>

        {/* Back To Top Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="pt-6"
        >
          <button
            onClick={() => {
              soundEffects.playClick();
              onBackToTop();
            }}
            onMouseEnter={() => soundEffects.playHover()}
            className="px-6 py-3.5 rounded-xl bg-zinc-900/90 hover:bg-red-950/60 border border-zinc-800 hover:border-red-600/70 text-zinc-200 hover:text-white font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center space-x-2.5 mx-auto glow-red-subtle group"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
