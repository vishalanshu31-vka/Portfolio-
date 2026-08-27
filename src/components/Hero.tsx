import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Code,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Sparkles,
  Terminal,
  Shield,
  Zap,
  Compass,
  Cpu,
  GraduationCap,
  Award,
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { DoomsdayCanvas } from './DoomsdayCanvas';
import { soundEffects } from '../utils/soundEffects';
import { ProfileAvatar } from './ProfileAvatar';

interface HeroProps {
  onOpenResume: () => void;
  onExploreWork: () => void;
  onEnterWorld: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume, onExploreWork, onEnterWorld }) => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % portfolioData.personal.subTitles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-20 overflow-hidden bg-black bg-elegant-dots"
    >
      {/* Dynamic Doomsday Interactive Background Canvas */}
      <DoomsdayCanvas intensity="high" interactive={true} />

      {/* Cyber Grid Overlay */}
      <div className="absolute inset-0 bg-cyber-grid opacity-30 pointer-events-none" />

      {/* Elegant Dark Concentric Rings & Crosshair HUD */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[640px] h-[640px] border border-red-600/15 rounded-full animate-pulse" />
        <div className="absolute w-[460px] h-[460px] border border-red-950/60 rounded-full" />
        <div className="absolute w-[300px] h-[300px] border border-white/5 rounded-full" />
        <div className="absolute h-full w-px bg-gradient-to-b from-transparent via-red-600/20 to-transparent" />
        <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-red-600/20 to-transparent" />
      </div>

      {/* Top Right Minimal HUD Telemetry Indicators */}
      <div className="absolute top-24 right-8 hidden md:block text-right font-mono text-[10px] text-white/40 space-y-1 pointer-events-none z-10">
        <div className="text-red-400 font-bold tracking-widest uppercase">CADET: VISHAL KUMAR ANSHU</div>
        <p className="tracking-wider">LOCATION: {portfolioData.personal.location}</p>
        <p className="tracking-wider text-red-500">{portfolioData.personal.statusBadge}</p>
        <div className="w-20 h-px bg-red-600/40 mt-1 ml-auto" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Architect Tag Header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="h-px w-8 sm:w-12 bg-red-600" />
          <span className="text-[10px] sm:text-xs font-mono tracking-[0.35em] sm:tracking-[0.5em] text-red-500 uppercase font-bold">
            Architect of the Digital Void // AI & ML
          </span>
          <div className="h-px w-8 sm:w-12 bg-red-600" />
        </motion.div>

        {/* Profile Photo Avatar Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-6 relative"
        >
          <ProfileAvatar size="hero" showBadge={true} interactive={true} />
        </motion.div>

        {/* Hero Super Name with Elegant Dark Gradient */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black tracking-tighter leading-none italic uppercase text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-zinc-400 drop-shadow-[0_0_50px_rgba(239,68,68,0.35)] select-none"
        >
          VISHAL KUMAR ANSHU
        </motion.h1>

        {/* Dynamic Rotating Subtitle Role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-4 flex items-center justify-center font-mono text-xs sm:text-sm text-red-400 font-bold tracking-[0.25em] uppercase"
        >
          <span className="text-white/40 mr-2">[FOCUS]</span>
          <span className="border-b border-red-500/60 pb-0.5 text-white">
            {portfolioData.personal.subTitles[currentRoleIndex]}
          </span>
        </motion.div>

        {/* User-Requested Short Introduction Quote Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 max-w-3xl relative"
        >
          <div className="relative px-6 py-4 sm:px-8 sm:py-5 bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/15 backdrop-blur-md rounded-lg shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            {/* Tech Corner Accents */}
            <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-red-500" />
            <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-red-500" />
            <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-red-500" />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-red-500" />

            <p className="text-sm sm:text-base md:text-lg font-sans font-medium text-white/90 leading-relaxed sm:leading-relaxed text-center">
              {portfolioData.personal.introduction}
            </p>
          </div>
        </motion.div>

        {/* Interactive CTA Buttons in Elegant Dark Layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 w-full"
        >
          {/* Explore Work CTA */}
          <button
            onClick={() => {
              soundEffects.playClick();
              onExploreWork();
            }}
            onMouseEnter={() => soundEffects.playHover()}
            className="group relative px-7 sm:px-9 py-3.5 sm:py-4 bg-red-700 hover:bg-red-600 text-white font-bold tracking-[0.2em] uppercase overflow-hidden text-xs sm:text-sm shadow-[0_0_30px_rgba(220,38,38,0.45)] transition-all flex items-center gap-2 cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Compass className="w-4 h-4" />
              <span>EXPLORE MY WORK</span>
            </span>
            <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 opacity-20 pointer-events-none" />
          </button>

          {/* View Resume CTA */}
          <button
            onClick={() => {
              soundEffects.playClick();
              onOpenResume();
            }}
            onMouseEnter={() => soundEffects.playHover()}
            className="px-6 sm:px-8 py-3.5 sm:py-4 border border-red-600/40 hover:border-red-500 bg-red-600/10 hover:bg-red-600/20 text-red-400 hover:text-white font-mono font-bold tracking-[0.2em] uppercase text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>VIEW RESUME</span>
          </button>
        </motion.div>

        {/* Social Links Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 flex items-center space-x-3 text-white/50 font-mono text-xs"
        >
          <a
            href={portfolioData.socials.github}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => soundEffects.playHover()}
            className="p-2.5 border border-white/10 hover:border-red-500 hover:text-red-400 bg-white/5 transition-all"
            title="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={portfolioData.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => soundEffects.playHover()}
            className="p-2.5 border border-white/10 hover:border-red-500 hover:text-red-400 bg-white/5 transition-all"
            title="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${portfolioData.socials.email}`}
            onMouseEnter={() => soundEffects.playHover()}
            className="p-2.5 border border-white/10 hover:border-red-500 hover:text-red-400 bg-white/5 transition-all"
            title="Send Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
