import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Linkedin, Github, MapPin, Send, CheckCircle2, Copy, Sparkles, Terminal, MessageSquareCode, ArrowUpRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { portfolioData } from '../data/portfolioData';
import { soundEffects } from '../utils/soundEffects';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    soundEffects.playClick();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      soundEffects.playTransmissionSent();

      // Confetti burst
      try {
        confetti({
          particleCount: 75,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ef4444', '#dc2626', '#ffffff', '#b91c1c'],
        });
      } catch {}

      // Reset form after delay
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 3000);
    }, 1200);
  };

  const copyEmail = () => {
    soundEffects.playClick();
    navigator.clipboard.writeText(portfolioData.socials.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" className="relative py-24 bg-black bg-elegant-dots border-t border-white/10 overflow-hidden">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-cyber-grid opacity-25 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-red-950/15 blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-red-600/10 border border-red-600/40 text-red-500 font-mono text-xs uppercase tracking-[0.2em] mb-3">
            <MessageSquareCode className="w-3.5 h-3.5" />
            <span>08 // TRANSMISSION TERMINAL</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-black text-white uppercase tracking-tighter">
            LET'S <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">CONNECT</span>
          </h2>

          <p className="font-mono text-xs sm:text-sm text-white/50 mt-2 tracking-widest uppercase">
            Initialize direct transmission for internships, software engineering, or technical collaboration
          </p>

          <div className="w-20 h-px bg-red-600 mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Collaboration Vectors & Contact Coordinates */}
          <div className="lg:col-span-5 space-y-6">
            {/* Mission Statement Card */}
            <div className="p-6 sm:p-8 bg-white/5 border border-white/10 backdrop-blur-md space-y-4">
              <div className="font-mono text-xs text-red-500 font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                <Terminal className="w-4 h-4" /> INITIATE DIALOGUE
              </div>

              <p className="text-sm text-white/70 leading-relaxed font-sans">
                I'm always excited to connect with developers, recruiters, innovators, and fellow learners. Whether it's an internship, collaboration, hackathon, project, or simply a conversation about technology, let's connect.
              </p>

              {/* Interested in working together section */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <h4 className="font-display font-bold text-xs uppercase tracking-widest text-white">
                  INTERESTED IN WORKING TOGETHER?
                </h4>
                <ul className="space-y-2 text-xs font-mono text-white/80">
                  {portfolioData.collaborationInterests.map((interest, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                      <span>{interest}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Direct Coordinates Cards */}
            <div className="space-y-3">
              {/* Email Card with Copy button */}
              <div className="p-4 bg-white/5 border border-white/10 flex items-center justify-between group hover:border-red-600/50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-black border border-white/10 text-red-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">DIRECT EMAIL</span>
                    <a
                      href={`mailto:${portfolioData.socials.email}`}
                      className="text-xs sm:text-sm font-mono text-white hover:text-red-400 font-semibold"
                    >
                      {portfolioData.socials.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={copyEmail}
                  className="p-2 bg-black border border-white/10 hover:border-red-600/50 text-white/60 hover:text-white transition-colors cursor-pointer"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* LinkedIn & GitHub Grid */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={portfolioData.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => soundEffects.playHover()}
                  className="p-4 bg-white/5 border border-white/10 hover:border-red-600/60 hover:bg-white/10 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-2.5">
                    <Linkedin className="w-4 h-4 text-red-500" />
                    <div>
                      <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">NETWORK</span>
                      <span className="text-xs font-mono font-bold text-white group-hover:text-red-400">LINKEDIN</span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-white/40 group-hover:text-red-400 transition-colors" />
                </a>

                <a
                  href={portfolioData.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => soundEffects.playHover()}
                  className="p-4 bg-white/5 border border-white/10 hover:border-red-600/60 hover:bg-white/10 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-2.5">
                    <Github className="w-4 h-4 text-red-500" />
                    <div>
                      <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">SOURCE</span>
                      <span className="text-xs font-mono font-bold text-white group-hover:text-red-400">GITHUB</span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-white/40 group-hover:text-red-400 transition-colors" />
                </a>
              </div>

              {/* Phone & Mobile Contact Card */}
              <div className="p-4 bg-white/5 border border-white/10 flex items-center justify-between group hover:border-red-600/50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-black border border-white/10 text-red-500">
                    <span className="font-mono text-xs font-bold text-red-500">TEL</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">DIRECT MOBILE</span>
                    <a
                      href="tel:+919938235909"
                      className="text-xs sm:text-sm font-mono text-white hover:text-red-400 font-semibold"
                    >
                      +91 9938235909
                    </a>
                  </div>
                </div>
                <a
                  href="tel:+919938235909"
                  className="px-2.5 py-1 bg-black border border-white/10 hover:border-red-600/50 text-[10px] font-mono text-red-400 uppercase tracking-wider transition-colors"
                >
                  CALL
                </a>
              </div>

              {/* Location Card */}
              <div className="p-3.5 px-4 bg-white/5 border border-white/10 flex items-center space-x-3 text-xs font-mono text-white/60">
                <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                <span>{portfolioData.personal.location}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Modern Sci-Fi Transmission Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-6 sm:p-8 bg-white/5 border border-red-600/40 backdrop-blur-md relative"
            >
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10 text-xs font-mono">
                <span className="text-red-500 font-bold tracking-widest uppercase flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-red-500" /> ENCRYPTED DISPATCH TERMINAL
                </span>
                <span className="text-white/40">256-BIT SECURE</span>
              </div>

              {isSubmitted ? (
                <div className="py-12 flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 bg-red-600/20 border border-red-500 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-red-400" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-black text-white uppercase">
                    TRANSMISSION DISPATCHED
                  </h3>
                  <p className="text-xs sm:text-sm text-white/70 max-w-md font-sans">
                    Thank you, <strong className="text-red-400">{formData.name || 'Visitor'}</strong>. Your message has reached Vishal Kumar Anshu's terminal. Expect a response shortly.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 px-5 py-2 bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition-colors cursor-pointer uppercase tracking-wider"
                  >
                    SEND ANOTHER TRANSMISSION
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="font-mono text-white/80 text-[11px] uppercase tracking-wider block">
                        YOUR NAME <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Tony Stark / Recruiter"
                        className="w-full px-3.5 py-2.5 bg-black border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 font-mono text-xs transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="font-mono text-white/80 text-[11px] uppercase tracking-wider block">
                        EMAIL ADDRESS <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="name@company.com"
                        className="w-full px-3.5 py-2.5 bg-black border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 font-mono text-xs transition-colors"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label className="font-mono text-white/80 text-[11px] uppercase tracking-wider block">
                      TRANSMISSION SUBJECT
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Internship Opportunity / Project Collaboration / Technical Discussion"
                      className="w-full px-3.5 py-2.5 bg-black border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 font-mono text-xs transition-colors"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="font-mono text-white/80 text-[11px] uppercase tracking-wider block">
                      MESSAGE CONTENT <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Enter mission parameters, invitation, or inquiry details..."
                      className="w-full px-3.5 py-2.5 bg-black border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 font-mono text-xs transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    onMouseEnter={() => soundEffects.playHover()}
                    className="w-full py-3.5 bg-red-700 hover:bg-red-600 text-white font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>ENCRYPTING & DISPATCHING...</span>
                      </>
                    ) : (
                      <>
                        <span>SEND TRANSMISSION</span>
                        <Send className="w-4 h-4 ml-1" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
