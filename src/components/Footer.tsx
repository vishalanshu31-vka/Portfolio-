import React from 'react';
import { Github, Linkedin, Mail, Shield, Terminal, ArrowUp, Heart } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { soundEffects } from '../utils/soundEffects';

export const Footer: React.FC = () => {
  return (
    <footer className="relative py-12 bg-black bg-elegant-dots border-t border-white/10 text-white/50 font-sans text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-1.5">
            <div className="flex items-center space-x-3">
              <div className="w-7 h-7 border border-red-600 flex items-center justify-center rotate-45">
                <span className="-rotate-45 font-black text-[10px] text-white">VKA</span>
              </div>
              <span className="font-display font-black text-sm text-white uppercase tracking-widest">
                {portfolioData.personal.name}
              </span>
            </div>
            <p className="font-mono text-xs text-white/40 tracking-wider">
              "Turning raw concepts into atomic grade technology."
            </p>
          </div>

          {/* Social Links in Elegant Dark Style */}
          <div className="flex items-center space-x-3">
            <a
              href={portfolioData.socials.github}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => soundEffects.playHover()}
              className="p-2.5 border border-white/10 hover:border-red-500 hover:text-red-400 bg-white/5 transition-all"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={portfolioData.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => soundEffects.playHover()}
              className="p-2.5 border border-white/10 hover:border-red-500 hover:text-red-400 bg-white/5 transition-all"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${portfolioData.socials.email}`}
              onMouseEnter={() => soundEffects.playHover()}
              className="p-2.5 border border-white/10 hover:border-red-500 hover:text-red-400 bg-white/5 transition-all"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Bottom Credits & Status */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-white/40 font-mono text-[11px]">
          <div>
            © {new Date().getFullYear()} ARCHIVE // {portfolioData.personal.name.toUpperCase()}. ALL PROTOCOLS RESERVED.
          </div>

          <div className="flex items-center space-x-2 text-red-500 font-bold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
            <Terminal className="w-3 h-3 text-red-500" />
            <span>CORE TELEMETRY: ALL SYSTEMS NOMINAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
