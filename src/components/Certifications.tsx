import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Award,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Calendar,
  Building2,
  CheckCircle2,
  Search,
  Filter,
  Trophy,
  Sparkles,
  LayoutGrid,
  Rows,
  Layers,
  ArrowUpRight,
  BadgeCheck,
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { CertificateItem } from '../types';
import { soundEffects } from '../utils/soundEffects';

interface CertificationsProps {
  onSelectCertificate: (cert: CertificateItem) => void;
}

export const Certifications: React.FC<CertificationsProps> = ({ onSelectCertificate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewLayout, setViewLayout] = useState<'grid' | 'carousel'>('grid');
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const categories = [
    { id: 'ALL', label: 'ALL CREDENTIALS', count: portfolioData.certifications.length },
    {
      id: 'MongoDB & AI Architecture',
      label: 'MONGODB & AI (5)',
      count: portfolioData.certifications.filter((c) => c.category === 'MongoDB & AI Architecture').length,
    },
    {
      id: 'Machine Learning & AI',
      label: 'ML & AI INTERNSHIPS (2)',
      count: portfolioData.certifications.filter((c) => c.category === 'Machine Learning & AI').length,
    },
    {
      id: 'Computer Systems & Programming',
      label: 'CORE SYSTEMS & C++ (2)',
      count: portfolioData.certifications.filter((c) => c.category === 'Computer Systems & Programming').length,
    },
  ];

  const filteredCertificates = useMemo(() => {
    return portfolioData.certifications.filter((cert) => {
      const matchesCategory =
        selectedCategory === 'ALL' || cert.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        cert.title.toLowerCase().includes(q) ||
        cert.organization.toLowerCase().includes(q) ||
        cert.credentialId.toLowerCase().includes(q) ||
        cert.badgeCode.toLowerCase().includes(q) ||
        cert.skillsGained.some((s) => s.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const scroll = (direction: 'left' | 'right') => {
    soundEffects.playClick();
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Helper for Issuer Brand Colors
  const getIssuerBadgeStyle = (org: string) => {
    if (org.includes('MongoDB')) {
      return {
        bg: 'bg-emerald-950/40 border-emerald-500/50 text-emerald-400',
        accent: 'text-emerald-400',
        border: 'hover:border-emerald-500/70',
        pill: 'bg-emerald-600/20 text-emerald-300 border-emerald-600/40',
        tag: 'MongoDB Skill Badge',
      };
    }
    if (org.includes('3Skill')) {
      return {
        bg: 'bg-indigo-950/40 border-indigo-500/50 text-indigo-400',
        accent: 'text-indigo-400',
        border: 'hover:border-indigo-500/70',
        pill: 'bg-indigo-600/20 text-indigo-300 border-indigo-600/40',
        tag: 'Internship & Evaluation',
      };
    }
    if (org.includes('iamNeo')) {
      return {
        bg: 'bg-red-950/40 border-red-500/50 text-red-400',
        accent: 'text-red-400',
        border: 'hover:border-red-600/70',
        pill: 'bg-red-600/20 text-red-300 border-red-600/40',
        tag: 'NIIT / LPU 150 Hrs',
      };
    }
    if (org.includes('Infosys')) {
      return {
        bg: 'bg-blue-950/40 border-blue-500/50 text-blue-400',
        accent: 'text-blue-400',
        border: 'hover:border-blue-500/70',
        pill: 'bg-blue-600/20 text-blue-300 border-blue-600/40',
        tag: 'Infosys Springboard',
      };
    }
    return {
      bg: 'bg-sky-950/40 border-sky-500/50 text-sky-400',
      accent: 'text-sky-400',
      border: 'hover:border-sky-500/70',
      pill: 'bg-sky-600/20 text-sky-300 border-sky-600/40',
      tag: 'Cisco NetAcad / C++',
    };
  };

  return (
    <section id="certifications" className="relative py-24 bg-black bg-elegant-dots border-t border-white/10 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none" />
      <div className="absolute -right-40 top-1/3 w-96 h-96 rounded-full bg-red-950/15 blur-[140px] pointer-events-none" />
      <div className="absolute -left-40 bottom-1/4 w-96 h-96 rounded-full bg-emerald-950/10 blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-red-600/10 border border-red-600/40 text-red-500 font-mono text-xs uppercase tracking-[0.2em] mb-3">
              <Award className="w-3.5 h-3.5" />
              <span>06 // VERIFIED CERTIFICATES & INDUSTRY BADGES</span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-black text-white uppercase tracking-tighter">
              CERTIFICATIONS & <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">CREDENTIALS</span>
            </h2>

            <p className="font-mono text-xs sm:text-sm text-white/50 mt-2 tracking-widest uppercase">
              9 Verified Industry Credentials • MongoDB AI Specializations • 3Skill AIML Internship • Cisco & iamNeo
            </p>
          </div>

          {/* Quick Metrics HUD */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 text-xs font-mono">
            <div className="p-3 bg-white/5 border border-white/10 rounded">
              <span className="text-[10px] text-white/40 block uppercase">TOTAL CERTS</span>
              <span className="text-white font-bold text-base">9 Verified</span>
            </div>
            <div className="p-3 bg-emerald-950/20 border border-emerald-500/30 rounded">
              <span className="text-[10px] text-emerald-400 block uppercase">MONGODB AI</span>
              <span className="text-emerald-300 font-bold text-base">5 Badges</span>
            </div>
            <div className="p-3 bg-indigo-950/20 border border-indigo-500/30 rounded">
              <span className="text-[10px] text-indigo-400 block uppercase">INTERNSHIP</span>
              <span className="text-indigo-300 font-bold text-base">93% Top Score</span>
            </div>
          </div>
        </div>

        {/* Filter Toolbar & Search */}
        <div className="mb-8 p-4 bg-[#0a0a0f] border border-white/10 rounded-lg flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  soundEffects.playClick();
                  setSelectedCategory(cat.id);
                }}
                className={`px-3 py-1.5 rounded text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-red-600 text-white font-bold shadow-md'
                    : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input & Layout Mode */}
          <div className="flex items-center space-x-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search skills, MongoDB, C++..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-black border border-white/10 rounded text-xs font-mono text-white placeholder-white/40 focus:outline-none focus:border-red-600/60"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-xs font-mono"
                >
                  ✕
                </button>
              )}
            </div>

            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center bg-black border border-white/10 p-0.5 rounded">
              <button
                onClick={() => {
                  soundEffects.playClick();
                  setViewLayout('grid');
                }}
                className={`p-1.5 rounded transition-all cursor-pointer ${
                  viewLayout === 'grid' ? 'bg-red-600 text-white' : 'text-white/50 hover:text-white'
                }`}
                title="Grid Layout"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  soundEffects.playClick();
                  setViewLayout('carousel');
                }}
                className={`p-1.5 rounded transition-all cursor-pointer ${
                  viewLayout === 'carousel' ? 'bg-red-600 text-white' : 'text-white/50 hover:text-white'
                }`}
                title="Carousel Layout"
              >
                <Rows className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Direction Buttons if in carousel mode */}
        {viewLayout === 'carousel' && (
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono text-white/50">
              SHOWING {filteredCertificates.length} CREDENTIALS • SCROLL TO EXPLORE
            </span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => scroll('left')}
                className="p-2 bg-black border border-white/10 text-white/70 hover:text-white hover:border-red-600/60 transition-all cursor-pointer"
                title="Previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="p-2 bg-black border border-white/10 text-white/70 hover:text-white hover:border-red-600/60 transition-all cursor-pointer"
                title="Next"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Certificate Display Area */}
        {filteredCertificates.length === 0 ? (
          <div className="py-16 text-center bg-white/5 border border-white/10 rounded-lg p-8">
            <ShieldCheck className="w-10 h-10 text-white/30 mx-auto mb-3" />
            <p className="font-mono text-sm text-white/70 uppercase">No credentials match your query</p>
            <button
              onClick={() => {
                setSelectedCategory('ALL');
                setSearchQuery('');
              }}
              className="mt-3 px-4 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-mono font-bold rounded uppercase tracking-wider cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : viewLayout === 'grid' ? (
          /* ================= GRID VIEW ================= */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCertificates.map((cert, idx) => {
              const style = getIssuerBadgeStyle(cert.organization);

              return (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  onMouseEnter={() => soundEffects.playHover()}
                  className={`bg-[#0d0d14] border border-white/10 ${style.border} transition-all duration-300 rounded-lg flex flex-col justify-between overflow-hidden group shadow-lg`}
                >
                  <div>
                    {/* Visual Card Banner with Issuer Badge */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900 border-b border-white/10">
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className={`w-full h-full ${
                          cert.image.endsWith('.svg') ? 'object-contain bg-white p-1' : 'object-cover'
                        } group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100`}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d14] via-[#0d0d14]/20 to-transparent pointer-events-none" />

                      {/* Top Pill with Issuer Type */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                        <span className={`px-2.5 py-0.5 rounded border text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-md shadow-md ${style.pill}`}>
                          {style.tag}
                        </span>

                        {cert.score && (
                          <span className="px-2 py-0.5 rounded bg-black/80 border border-green-500/50 text-green-400 text-[10px] font-mono font-bold shadow-md">
                            {cert.score.includes('93%') ? '93% SCORE' : '150 HRS'}
                          </span>
                        )}
                      </div>

                      {/* Bottom Organization & Date */}
                      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs font-mono text-white/90 drop-shadow-md pointer-events-none">
                        <span className="flex items-center gap-1.5 font-bold bg-black/70 px-2 py-0.5 rounded backdrop-blur-sm border border-white/10">
                          <Building2 className={`w-3.5 h-3.5 ${style.accent}`} />
                          {cert.organization.split('(')[0]}
                        </span>
                        <span className="text-white/80 text-[11px] bg-black/70 px-2 py-0.5 rounded backdrop-blur-sm border border-white/10">
                          {cert.issueDate}
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-5 space-y-3">
                      <h3 className="font-display font-bold text-base text-white uppercase group-hover:text-red-400 transition-colors line-clamp-2 leading-snug">
                        {cert.title}
                      </h3>

                      <p className="text-xs text-white/60 line-clamp-2 leading-relaxed font-sans">
                        {cert.description}
                      </p>

                      {/* Skills tags */}
                      <div className="flex flex-wrap gap-1 pt-1">
                        {cert.skillsGained.slice(0, 3).map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="text-[10px] font-mono px-2 py-0.5 bg-black border border-white/10 text-white/70 flex items-center gap-1 uppercase tracking-wider rounded"
                          >
                            <CheckCircle2 className={`w-2.5 h-2.5 ${style.accent}`} />
                            {skill}
                          </span>
                        ))}
                        {cert.skillsGained.length > 3 && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 bg-black border border-white/10 text-white/40 rounded">
                            +{cert.skillsGained.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="p-4 px-5 border-t border-white/10 bg-black/60 flex items-center justify-between gap-2">
                    <div className="font-mono text-[11px] text-white/40 truncate max-w-[120px]">
                      ID: {cert.credentialId.slice(0, 8)}...
                    </div>

                    <div className="flex items-center space-x-2">
                      {cert.credentialUrl && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 bg-white/5 hover:bg-white/15 text-white/60 hover:text-white border border-white/10 rounded transition-colors"
                          title="Open external verification link"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}

                      <button
                        onClick={() => {
                          soundEffects.playClick();
                          onSelectCertificate(cert);
                        }}
                        className="flex items-center space-x-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold rounded transition-all uppercase tracking-wider cursor-pointer shadow"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>INSPECT</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          /* ================= CAROUSEL HORIZONTAL VIEW ================= */
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto pb-6 pt-2 gap-6 snap-x snap-mandatory scrollbar-none md:scrollbar-thin"
            style={{ scrollbarWidth: 'thin' }}
          >
            {filteredCertificates.map((cert, idx) => {
              const style = getIssuerBadgeStyle(cert.organization);

              return (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  onMouseEnter={() => soundEffects.playHover()}
                  className={`min-w-[310px] sm:min-w-[360px] max-w-[380px] snap-start shrink-0 bg-[#0d0d14] border border-white/10 ${style.border} transition-all duration-300 rounded-lg flex flex-col justify-between overflow-hidden group shadow-lg`}
                >
                  <div>
                    {/* Visual Card Banner with Issuer Badge */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900 border-b border-white/10">
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className={`w-full h-full ${
                          cert.image.endsWith('.svg') ? 'object-contain bg-white p-1' : 'object-cover'
                        } group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100`}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d14] via-[#0d0d14]/20 to-transparent pointer-events-none" />

                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                        <span className={`px-2.5 py-0.5 rounded border text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-md shadow-md ${style.pill}`}>
                          {style.tag}
                        </span>

                        {cert.score && (
                          <span className="px-2 py-0.5 rounded bg-black/80 border border-green-500/50 text-green-400 text-[10px] font-mono font-bold shadow-md">
                            {cert.score.includes('93%') ? '93% SCORE' : '150 HRS'}
                          </span>
                        )}
                      </div>

                      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs font-mono text-white/90 drop-shadow-md pointer-events-none">
                        <span className="flex items-center gap-1.5 font-bold bg-black/70 px-2 py-0.5 rounded backdrop-blur-sm border border-white/10">
                          <Building2 className={`w-3.5 h-3.5 ${style.accent}`} />
                          {cert.organization.split('(')[0]}
                        </span>
                        <span className="text-white/80 text-[11px] bg-black/70 px-2 py-0.5 rounded backdrop-blur-sm border border-white/10">{cert.issueDate}</span>
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <h3 className="font-display font-bold text-base text-white uppercase group-hover:text-red-400 transition-colors line-clamp-2 leading-snug">
                        {cert.title}
                      </h3>

                      <p className="text-xs text-white/60 line-clamp-2 leading-relaxed font-sans">
                        {cert.description}
                      </p>

                      <div className="flex flex-wrap gap-1 pt-1">
                        {cert.skillsGained.slice(0, 3).map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="text-[10px] font-mono px-2 py-0.5 bg-black border border-white/10 text-white/70 flex items-center gap-1 uppercase tracking-wider rounded"
                          >
                            <CheckCircle2 className={`w-2.5 h-2.5 ${style.accent}`} />
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 px-5 border-t border-white/10 bg-black/60 flex items-center justify-between gap-2">
                    <div className="font-mono text-[11px] text-white/40 truncate max-w-[120px]">
                      ID: {cert.credentialId.slice(0, 8)}...
                    </div>

                    <div className="flex items-center space-x-2">
                      {cert.credentialUrl && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 bg-white/5 hover:bg-white/15 text-white/60 hover:text-white border border-white/10 rounded transition-colors"
                          title="Open external verification link"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}

                      <button
                        onClick={() => {
                          soundEffects.playClick();
                          onSelectCertificate(cert);
                        }}
                        className="flex items-center space-x-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold rounded transition-all uppercase tracking-wider cursor-pointer shadow"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>INSPECT</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
