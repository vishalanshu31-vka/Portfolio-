import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, Menu, X, Volume2, VolumeX, Sparkles, Terminal, RotateCcw } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { soundEffects } from '../utils/soundEffects';

interface NavbarProps {
  onOpenResume: () => void;
  onReplayIntro: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume, onReplayIntro, activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(soundEffects.isMuted());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'HOME', href: '#home', id: 'home' },
    { label: 'ABOUT', href: '#about', id: 'about' },
    { label: 'ACADEMIC', href: '#academic', id: 'academic' },
    { label: 'SKILLS', href: '#skills', id: 'skills' },
    { label: 'LEARNING', href: '#learning', id: 'learning' },
    { label: 'PROJECTS', href: '#projects', id: 'projects' },
    { label: 'CERTIFICATIONS', href: '#certifications', id: 'certifications' },
    { label: 'ACHIEVEMENTS', href: '#achievements', id: 'achievements' },
    { label: 'CONTACT', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    soundEffects.playClick();
    setIsMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleSound = () => {
    const newMuted = soundEffects.toggleMute();
    setIsMuted(newMuted);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-black/90 backdrop-blur-md border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.9)] py-3'
            : 'bg-black/40 backdrop-blur-md border-b border-white/10 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Protocol Badge */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="group flex items-center gap-3.5 select-none"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 border-2 border-red-600 flex items-center justify-center rotate-45 group-hover:border-red-500 transition-all shadow-[0_0_15px_rgba(220,38,38,0.4)]">
              <span className="-rotate-45 font-black text-xs sm:text-sm tracking-tighter text-white group-hover:scale-110 transition-transform">
                VKA
              </span>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[11px] sm:text-xs font-mono text-red-500 tracking-[0.25em] sm:tracking-[0.3em] uppercase font-bold">
                Protocol v4.0
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono text-white/40 uppercase tracking-wider hidden sm:block">
                Operational Capacity: 100%
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links with Elegant Dark Numbering */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, '#about')}
              onMouseEnter={() => soundEffects.playHover()}
              className={`text-xs font-mono tracking-widest transition-colors ${
                activeSection === 'about' ? 'text-red-500 font-bold' : 'text-white/60 hover:text-red-500'
              }`}
            >
              01. DATA_CORE
            </a>
            <a
              href="#academic"
              onClick={(e) => handleNavClick(e, '#academic')}
              onMouseEnter={() => soundEffects.playHover()}
              className={`text-xs font-mono tracking-widest transition-colors ${
                activeSection === 'academic' ? 'text-red-500 font-bold' : 'text-white/60 hover:text-red-500'
              }`}
            >
              02. ACADEMIC
            </a>
            <a
              href="#skills"
              onClick={(e) => handleNavClick(e, '#skills')}
              onMouseEnter={() => soundEffects.playHover()}
              className={`text-xs font-mono tracking-widest transition-colors ${
                activeSection === 'skills' ? 'text-red-500 font-bold' : 'text-white/60 hover:text-red-500'
              }`}
            >
              03. ARSENAL
            </a>
            <a
              href="#learning"
              onClick={(e) => handleNavClick(e, '#learning')}
              onMouseEnter={() => soundEffects.playHover()}
              className={`text-xs font-mono tracking-widest transition-colors ${
                activeSection === 'learning' ? 'text-red-500 font-bold' : 'text-white/60 hover:text-red-500'
              }`}
            >
              04. INTEL
            </a>
            <a
              href="#projects"
              onClick={(e) => handleNavClick(e, '#projects')}
              onMouseEnter={() => soundEffects.playHover()}
              className={`text-xs font-mono tracking-widest transition-colors ${
                activeSection === 'projects' ? 'text-red-500 font-bold' : 'text-white/60 hover:text-red-500'
              }`}
            >
              05. MISSIONS
            </a>
            <a
              href="#certifications"
              onClick={(e) => handleNavClick(e, '#certifications')}
              onMouseEnter={() => soundEffects.playHover()}
              className={`text-xs font-mono tracking-widest transition-colors ${
                activeSection === 'certifications' ? 'text-red-500 font-bold' : 'text-white/60 hover:text-red-500'
              }`}
            >
              06. CREDENTIALS
            </a>
            <a
              href="#achievements"
              onClick={(e) => handleNavClick(e, '#achievements')}
              onMouseEnter={() => soundEffects.playHover()}
              className={`text-xs font-mono tracking-widest transition-colors ${
                activeSection === 'achievements' ? 'text-red-500 font-bold' : 'text-white/60 hover:text-red-500'
              }`}
            >
              07. VICTORIES
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              onMouseEnter={() => soundEffects.playHover()}
              className={`text-xs font-mono tracking-widest transition-colors ${
                activeSection === 'contact' ? 'text-red-500 font-bold' : 'text-white/60 hover:text-red-500'
              }`}
            >
              08. TRANSMIT
            </a>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Replay Intro */}
            <button
              onClick={() => {
                soundEffects.playClick();
                onReplayIntro();
              }}
              title="Replay Cinematic Intro Sequence"
              className="hidden sm:flex items-center space-x-1 px-2.5 py-1.5 border border-white/10 hover:border-red-600/50 bg-white/5 hover:bg-red-950/30 text-white/50 hover:text-red-400 transition-colors text-[10px] font-mono tracking-wider uppercase"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden xl:inline">REPLAY</span>
            </button>

            {/* Audio Toggle */}
            <button
              onClick={handleToggleSound}
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
              className="p-2 border border-white/10 hover:border-red-600/50 bg-white/5 text-white/60 hover:text-red-400 transition-colors"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-white/30" /> : <Volume2 className="w-3.5 h-3.5 text-red-500" />}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => {
                soundEffects.playClick();
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              className="lg:hidden p-2 border border-white/10 bg-white/5 text-white/70 hover:text-red-500 hover:border-red-600/50 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Animated HUD Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[68px] z-40 bg-black/98 border-b border-white/10 p-6 lg:hidden shadow-[0_20px_40px_rgba(0,0,0,0.95)]"
          >
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 text-xs font-mono text-white/50">
              <span className="text-red-500 flex items-center gap-1.5 tracking-widest uppercase">
                <Terminal className="w-3.5 h-3.5" /> SYSTEM DIRECTORY
              </span>
              <button
                onClick={() => {
                  soundEffects.playClick();
                  onReplayIntro();
                }}
                className="text-white/40 hover:text-red-400 flex items-center gap-1 text-[11px]"
              >
                <RotateCcw className="w-3 h-3" /> REPLAY INTRO
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 font-mono">
              <a
                href="#about"
                onClick={(e) => handleNavClick(e, '#about')}
                className="p-2.5 border border-white/10 hover:border-red-600/60 bg-white/5 text-xs text-white/80 tracking-wider uppercase"
              >
                01. DATA_CORE
              </a>
              <a
                href="#academic"
                onClick={(e) => handleNavClick(e, '#academic')}
                className="p-2.5 border border-white/10 hover:border-red-600/60 bg-white/5 text-xs text-white/80 tracking-wider uppercase"
              >
                02. ACADEMIC
              </a>
              <a
                href="#skills"
                onClick={(e) => handleNavClick(e, '#skills')}
                className="p-2.5 border border-white/10 hover:border-red-600/60 bg-white/5 text-xs text-white/80 tracking-wider uppercase"
              >
                03. ARSENAL
              </a>
              <a
                href="#learning"
                onClick={(e) => handleNavClick(e, '#learning')}
                className="p-2.5 border border-white/10 hover:border-red-600/60 bg-white/5 text-xs text-white/80 tracking-wider uppercase"
              >
                04. INTEL
              </a>
              <a
                href="#projects"
                onClick={(e) => handleNavClick(e, '#projects')}
                className="p-2.5 border border-white/10 hover:border-red-600/60 bg-white/5 text-xs text-white/80 tracking-wider uppercase"
              >
                05. MISSIONS
              </a>
              <a
                href="#certifications"
                onClick={(e) => handleNavClick(e, '#certifications')}
                className="p-2.5 border border-white/10 hover:border-red-600/60 bg-white/5 text-xs text-white/80 tracking-wider uppercase"
              >
                06. CREDENTIALS
              </a>
              <a
                href="#achievements"
                onClick={(e) => handleNavClick(e, '#achievements')}
                className="p-2.5 border border-white/10 hover:border-red-600/60 bg-white/5 text-xs text-white/80 tracking-wider uppercase"
              >
                07. VICTORIES
              </a>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="p-2.5 border border-white/10 hover:border-red-600/60 bg-white/5 text-xs text-white/80 tracking-wider uppercase"
              >
                08. TRANSMIT
              </a>
            </div>

            <div className="mt-5 pt-4 border-t border-white/10 flex gap-3">
              <button
                onClick={() => {
                  soundEffects.playClick();
                  setIsMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="w-full py-2.5 border border-red-600/50 bg-red-600/20 hover:bg-red-600 text-white font-mono text-xs tracking-[0.2em] font-bold uppercase transition-all"
              >
                VIEW FULL DOSSIER
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
