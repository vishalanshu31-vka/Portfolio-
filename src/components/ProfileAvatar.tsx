import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Camera, Shield, CheckCircle2, User, RefreshCw } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

interface ProfileAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showBadge?: boolean;
  interactive?: boolean;
  className?: string;
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  size = 'hero',
  showBadge = true,
  interactive = false,
  className = '',
}) => {
  // const [customImage, setCustomImage] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  // const fileInputRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   // Check if custom user avatar was saved
  //   try {
  //     const saved = localStorage.getItem('vka_user_avatar');
  //     if (saved) {
  //       setCustomImage(saved);
  //     }
  //   } catch (e) {
  //     console.warn('LocalStorage unavailable for avatar');
  //   }
  // }, []);

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (event) => {
  //       const dataUrl = event.target?.result as string;
  //       setCustomImage(dataUrl);
  //       setImageError(false);
  //       try {
  //         localStorage.setItem('vka_user_avatar', dataUrl);
  //       } catch (err) {}
  //       soundEffects.playTransmissionSent();
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // const handleResetAvatar = (e: React.MouseEvent) => {
  //   e.stopPropagation();
  //   setCustomImage(null);
  //   setImageError(false);
  //   try {
  //     localStorage.removeItem('vka_user_avatar');
  //   } catch (err) {}
  //   soundEffects.playClick();
  // };

  // Dimensions based on size
  const sizeMap = {
    sm: {
      container: 'w-12 h-12',
      image: 'w-10 h-10',
      badge: 'text-[9px] px-1.5 py-0.5',
      ringSize: 'w-14 h-14',
    },
    md: {
      container: 'w-24 h-24',
      image: 'w-20 h-20',
      badge: 'text-[10px] px-2 py-0.5',
      ringSize: 'w-28 h-28',
    },
    lg: {
      container: 'w-36 h-36',
      image: 'w-32 h-32',
      badge: 'text-xs px-2.5 py-1',
      ringSize: 'w-40 h-40',
    },
    hero: {
      container: 'w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64',
      image: 'w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60',
      badge: 'text-xs px-3 py-1',
      ringSize: 'w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72',
    },
  };

  const config = sizeMap[size];

  // Default high-fidelity stylized portrait representation of Vishal
  const defaultPortraitImage = '/Portfolio-/profile.jpeg';

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      onMouseEnter={() => {
        setIsHovered(true);
        if (interactive) soundEffects.playHover();
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hidden file input for easy photo updating */}
      {/* <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      /> */}

      {/* Outer Rotating HUD Radar Ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className={`absolute ${config.ringSize} rounded-full border border-dashed border-red-500/30 pointer-events-none`}
      />

      {/* Counter-Rotating Tactical Ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
        className={`absolute ${config.ringSize} rounded-full border border-red-600/20 pointer-events-none`}
        style={{
          borderTopColor: 'rgba(239, 68, 68, 0.7)',
          borderBottomColor: 'rgba(239, 68, 68, 0.7)',
        }}
      />

      {/* Glowing Outer Radial Ambient Aura */}
      <div className="absolute inset-0 rounded-full bg-red-600/20 blur-xl scale-95 pointer-events-none animate-pulse" />

      {/* Main Avatar Container Frame */}
      <div
        className={`relative ${config.image} rounded-full p-1 bg-gradient-to-tr from-red-600 via-zinc-800 to-red-500 shadow-[0_0_40px_rgba(220,38,38,0.4)] group overflow-hidden`}
      >
        {/* Inner Masked Image */}
        <div className="w-full h-full rounded-full overflow-hidden bg-zinc-950 relative border-2 border-black/80 flex items-center justify-center">
          {!imageError ? (
            <img
              src="/Portfolio-/profile.jpeg"
              alt="Vishal Kumar Anshu"
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            /* Aesthetic Fallback Vector Avatar */
            <div className="w-full h-full bg-gradient-to-b from-zinc-900 via-zinc-950 to-black flex flex-col items-center justify-center relative p-3">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-red-600 to-orange-500 flex items-center justify-center text-white font-display font-black text-2xl shadow-lg mb-1">
                VKA
              </div>
              <span className="text-[10px] font-mono text-red-400 font-bold uppercase tracking-wider">
                VISHAL KUMAR ANSHU
              </span>
            </div>
          )}
</div>
          {/* Cyber Scanline Light Sweep on Hover */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/15 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-1000 pointer-events-none" />


      {/* Tactical Status Badge at Bottom */}
      {showBadge && (
        <div
          className={`absolute -bottom-2 sm:-bottom-3 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-zinc-950/95 border border-red-600/70 rounded-full ${config.badge} font-mono font-bold text-white flex items-center gap-1.5 shadow-[0_0_15px_rgba(220,38,38,0.5)] z-20`}
        >
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="tracking-widest uppercase text-[10px] text-zinc-200">
            VISHAL • <span className="text-red-400">AI/ML</span>
          </span>
        </div>
      )}
    </div>
  );
};
