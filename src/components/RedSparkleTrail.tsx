import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  maxSize: number;
  alpha: number;
  decay: number;
  color: string;
  glowColor: string;
  type: 'dust' | 'star' | 'shimmer';
  rotation: number;
  rotationSpeed: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

export const RedSparkleTrail: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const particles: Particle[] = [];
    const maxParticles = 250;

    const redPalettes = [
      { color: '#ef4444', glow: 'rgba(239, 68, 68, 0.8)' },   // Bright Red
      { color: '#dc2626', glow: 'rgba(220, 38, 38, 0.7)' },   // Crimson
      { color: '#f87171', glow: 'rgba(248, 113, 113, 0.9)' }, // Light Coral Red
      { color: '#ff2b4f', glow: 'rgba(255, 43, 79, 0.85)' },  // Neon Ruby
      { color: '#ffe4e6', glow: 'rgba(255, 228, 230, 0.9)' }, // White-Pink Star Core
      { color: '#ffffff', glow: 'rgba(239, 68, 68, 0.9)' },   // Pure White Spark
      { color: '#b91c1c', glow: 'rgba(185, 28, 28, 0.6)' },   // Deep Dark Red
    ];

    let lastX = -100;
    let lastY = -100;

    const addParticles = (x: number, y: number, count: number, speedMultiplier = 1) => {
      for (let i = 0; i < count; i++) {
        if (particles.length >= maxParticles) {
          particles.shift();
        }

        const angle = Math.random() * Math.PI * 2;
        const speed = (Math.random() * 1.8 + 0.3) * speedMultiplier;
        const palette = redPalettes[Math.floor(Math.random() * redPalettes.length)];
        
        // Distribution of particle types: mostly fine glitter dust, with occasional shiny 4-point stars
        const randType = Math.random();
        const type: 'dust' | 'star' | 'shimmer' = randType < 0.2 ? 'star' : randType < 0.5 ? 'shimmer' : 'dust';
        
        const size = type === 'star' 
          ? Math.random() * 4 + 3.5 
          : type === 'shimmer' 
            ? Math.random() * 2.5 + 1.5 
            : Math.random() * 1.8 + 0.6;

        particles.push({
          x: x + (Math.random() - 0.5) * 12,
          y: y + (Math.random() - 0.5) * 12,
          vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 0.4,
          vy: Math.sin(angle) * speed - (Math.random() * 0.6 + 0.1), // subtle upward buoyancy
          size,
          maxSize: size,
          alpha: 1,
          decay: Math.random() * 0.02 + 0.015,
          color: palette.color,
          glowColor: palette.glow,
          type,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.08,
          twinkleSpeed: Math.random() * 0.15 + 0.05,
          twinklePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      if (lastX !== -100) {
        const dx = x - lastX;
        const dy = y - lastY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Emit particles along movement path for smooth continuous glitter ribbon
        const steps = Math.min(Math.floor(dist / 4), 10);
        const particleCountPerStep = dist > 15 ? 2 : 1;

        for (let s = 0; s <= steps; s++) {
          const t = steps === 0 ? 0 : s / steps;
          const px = lastX + dx * t;
          const py = lastY + dy * t;
          addParticles(px, py, particleCountPerStep, Math.min(dist * 0.04, 2));
        }
      } else {
        addParticles(x, y, 4);
      }

      lastX = x;
      lastY = y;
    };

    const handleMouseDown = (e: MouseEvent) => {
      // Click burst: vibrant cluster of sparkling 4-point stars and glitter
      addParticles(e.clientX, e.clientY, 24, 2.8);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        addParticles(touch.clientX, touch.clientY, 3, 1.2);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Helper: Draw 4-point diamond star sparkle with center bloom
    const drawSparkleStar = (
      p: Particle,
      currentAlpha: number
    ) => {
      const { x, y, size, color, glowColor, rotation } = p;
      
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      
      // Outer radial glow halo
      const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 2.8);
      grad.addColorStop(0, glowColor);
      grad.addColorStop(0.5, 'rgba(239, 68, 68, 0.3)');
      grad.addColorStop(1, 'rgba(239, 68, 68, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(0, 0, size * 2.8, 0, Math.PI * 2);
      ctx.fill();

      // 4-point diamond star spikes
      ctx.fillStyle = color;
      ctx.globalAlpha = Math.min(1, currentAlpha * 1.2);
      
      ctx.beginPath();
      const outer = size * 2.2;
      const inner = size * 0.35;
      
      // Vertical and Horizontal elongated spikes
      for (let i = 0; i < 4; i++) {
        const angle = (i * Math.PI) / 2;
        const nextAngle = ((i + 1) * Math.PI) / 2;
        const midAngle = angle + Math.PI / 4;

        if (i === 0) {
          ctx.moveTo(Math.cos(angle) * outer, Math.sin(angle) * outer);
        } else {
          ctx.lineTo(Math.cos(angle) * outer, Math.sin(angle) * outer);
        }
        ctx.lineTo(Math.cos(midAngle) * inner, Math.sin(midAngle) * inner);
      }
      ctx.closePath();
      ctx.fill();

      // White-hot center pinhole
      ctx.fillStyle = '#ffffff';
      ctx.globalAlpha = currentAlpha;
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.45, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    // Main animation & render loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Physics update
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.97;
        p.vy *= 0.97;
        p.vy += 0.02; // gentle downward gravity
        p.alpha -= p.decay;
        p.rotation += p.rotationSpeed;
        p.twinklePhase += p.twinkleSpeed;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        const twinkle = Math.sin(p.twinklePhase);
        const currentAlpha = Math.max(0, Math.min(1, p.alpha * (0.7 + 0.3 * twinkle)));

        if (p.type === 'star') {
          drawSparkleStar(p, currentAlpha);
        } else if (p.type === 'shimmer') {
          // Shimmer micro glitter with glow
          ctx.save();
          ctx.globalAlpha = currentAlpha;
          ctx.fillStyle = p.glowColor;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();

          // Shiny tiny white center
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.4, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else {
          // Micro dust glitter particle
          ctx.save();
          ctx.globalAlpha = currentAlpha;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999] w-full h-full"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};
