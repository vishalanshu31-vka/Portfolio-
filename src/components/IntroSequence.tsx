import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { soundEffects } from '../utils/soundEffects';
import { Shield, Sparkles, Terminal, Volume2, VolumeX } from 'lucide-react';

interface IntroSequenceProps {
  onComplete: () => void;
  onSkip: () => void;
}

export const IntroSequence: React.FC<IntroSequenceProps> = ({ onComplete, onSkip }) => {
  const [step, setStep] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(soundEffects.isMuted());

  useEffect(() => {
    soundEffects.init();
    setIsMuted(soundEffects.isMuted());
    soundEffects.playEnergySurge();

    // Step 0: Initial black screen with subtle sparks (0ms)
    // Step 1: "THE FUTURE IS BEING BUILT." (600ms)
    const t1 = setTimeout(() => {
      setStep(1);
      soundEffects.playHover();
    }, 700);

    // Step 2: "ONE DEVELOPER." (1900ms)
    const t2 = setTimeout(() => {
      setStep(2);
      soundEffects.playHover();
    }, 2000);

    // Step 3: Cinematic reveal "VISHAL KUMAR ANSHU" (3200ms)
    const t3 = setTimeout(() => {
      setStep(3);
      soundEffects.playEnergySurge();
    }, 3200);

    // Step 4: Finish intro and transition to main app (4800ms)
    const t4 = setTimeout(() => {
      onComplete();
    }, 4900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  const handleToggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newMuteState = soundEffects.toggleMute();
    setIsMuted(newMuteState);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
      className="fixed inset-0 z-50 bg-[#030305] flex flex-col items-center justify-center overflow-hidden cursor-pointer select-none"
      onClick={onSkip}
    >
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-cyber-grid opacity-30 pointer-events-none" />

      {/* Atmospheric Central Red Glow */}
      <motion.div
        animate={{
          scale: [0.9, 1.25, 1],
          opacity: [0.15, 0.45, 0.25],
        }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute w-[600px] h-[600px] rounded-full bg-radial from-red-600/30 via-red-900/10 to-transparent blur-3xl pointer-events-none"
      />

      {/* Corner HUD Telemetry Overlays */}
      <div className="absolute top-6 left-6 flex items-center space-x-3 text-xs font-mono text-red-500/70">
        <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
        <span className="tracking-widest">SYSTEM INITIALIZATION // PROTOCOL: VKA_CORE</span>
      </div>

      {/* Skip Intro & Sound Controls (Top Right) */}
      <div className="absolute top-6 right-6 flex items-center space-x-4 z-50">
        <button
          onClick={handleToggleSound}
          className="flex items-center space-x-2 px-3 py-1.5 rounded border border-red-900/50 bg-black/60 text-xs font-mono text-zinc-400 hover:text-red-400 hover:border-red-500/50 transition-colors"
          title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5 text-zinc-500" /> : <Volume2 className="w-3.5 h-3.5 text-red-500" />}
          <span className="hidden sm:inline">{isMuted ? 'AUDIO OFF' : 'AUDIO ON'}</span>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            soundEffects.playClick();
            onSkip();
          }}
          className="flex items-center space-x-2 px-4 py-1.5 rounded border border-red-600/50 bg-red-950/40 text-xs font-mono font-bold text-red-400 hover:bg-red-600 hover:text-white transition-all shadow-[0_0_15px_rgba(239,68,68,0.3)] group"
        >
          <span>SKIP INTRO</span>
          <span className="group-hover:translate-x-0.5 transition-transform font-sans">→</span>
        </button>
      </div>

      {/* Center Cinematic Content Stream */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Animated HUD Reticle Rings */}
        <div className="relative mx-auto w-44 h-44 sm:w-56 sm:h-56 mb-8 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full border border-dashed border-red-600/30"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-3 rounded-full border border-red-500/20"
          />
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-20 h-20 rounded-full bg-red-950/60 border border-red-500 flex items-center justify-center glow-red"
          >
            <Shield className="w-9 h-9 text-red-500 animate-pulse" />
          </motion.div>
        </div>

        {/* Text Sequence */}
        <div className="min-h-[140px] flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
                transition={{ duration: 0.5 }}
                className="space-y-2"
              >
                <span className="font-mono text-xs text-red-500 tracking-[0.3em] uppercase">
                  [ INCOMING TRANSMISSION ]
                </span>
                <h2 className="text-2xl sm:text-4xl font-display font-extrabold tracking-wider text-zinc-100 uppercase">
                  THE FUTURE IS BEING BUILT.
                </h2>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, scale: 0.92, filter: 'blur(4px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.08, filter: 'blur(4px)' }}
                transition={{ duration: 0.45 }}
                className="space-y-2"
              >
                <span className="font-mono text-xs text-red-400 tracking-[0.4em] uppercase">
                  DIRECTIVE // MULTIVERSE CODEX
                </span>
                <h2 className="text-3xl sm:text-5xl font-display font-black tracking-widest text-red-500 text-glow-red uppercase">
                  ONE DEVELOPER.
                </h2>
              </motion.div>
            )}

            {step >= 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4"
              >
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-red-950/80 border border-red-500/60 text-red-400 text-xs font-mono">
                  <Terminal className="w-3.5 h-3.5 text-red-400" />
                  <span className="tracking-widest">IDENTIFICATION CONFIRMED</span>
                </div>

                <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-100 to-red-400 uppercase drop-shadow-[0_0_35px_rgba(239,68,68,0.7)]">
                  VISHAL KUMAR ANSHU
                </h1>

                <p className="font-mono text-xs sm:text-sm text-zinc-400 tracking-widest uppercase">
                  Computer Science Student <span className="text-red-500">|</span> Developer <span className="text-red-500">|</span> Tech Enthusiast
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Progress Bar & Click Prompt */}
      <div className="absolute bottom-8 w-full max-w-md px-6 text-center">
        <div className="w-full bg-zinc-900 h-1 rounded-full overflow-hidden border border-zinc-800">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 4.8, ease: 'linear' }}
            className="h-full bg-gradient-to-r from-red-700 to-red-500 glow-red"
          />
        </div>
        <p className="mt-3 text-[11px] font-mono text-zinc-500 tracking-wider">
          CLICK ANYWHERE TO ENTER COMMAND CENTER
        </p>
      </div>
    </motion.div>
  );
};
