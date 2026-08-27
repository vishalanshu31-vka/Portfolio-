import React, { useEffect, useRef } from 'react';

interface DoomsdayCanvasProps {
  interactive?: boolean;
  intensity?: 'subtle' | 'medium' | 'high';
  className?: string;
}

export const DoomsdayCanvas: React.FC<DoomsdayCanvasProps> = ({
  interactive = true,
  intensity = 'medium',
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Mouse coordinates with smoothing
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particles system
    const particleCount = intensity === 'high' ? 85 : intensity === 'medium' ? 55 : 35;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      baseAlpha: number;
      pulseSpeed: number;
      pulsePhase: number;
      color: string;
      isRedEnergy: boolean;
    }> = [];

    const colors = [
      'rgba(239, 68, 68, ', // Red
      'rgba(220, 38, 38, ', // Crimson
      'rgba(248, 113, 113, ', // Light Red
      'rgba(255, 255, 255, ', // White spark
    ];

    for (let i = 0; i < particleCount; i++) {
      const isRed = Math.random() > 0.25;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4 - 0.15,
        size: Math.random() * (isRed ? 2.5 : 1.5) + 0.8,
        alpha: Math.random() * 0.7 + 0.2,
        baseAlpha: Math.random() * 0.6 + 0.2,
        pulseSpeed: Math.random() * 0.03 + 0.01,
        pulsePhase: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        isRedEnergy: isRed,
      });
    }

    // Energy Core Rings definition
    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse follow
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      const centerX = width / 2 + (mouse.x - width / 2) * 0.08;
      const centerY = height / 2 + (mouse.y - height / 2) * 0.08;

      // Draw Doomsday Central Glow Core
      const coreGradient = ctx.createRadialGradient(
        centerX,
        centerY,
        10,
        centerX,
        centerY,
        Math.min(width, height) * 0.45
      );
      coreGradient.addColorStop(0, 'rgba(239, 68, 68, 0.14)');
      coreGradient.addColorStop(0.3, 'rgba(185, 28, 28, 0.06)');
      coreGradient.addColorStop(0.7, 'rgba(153, 27, 27, 0.02)');
      coreGradient.addColorStop(1, 'rgba(3, 3, 5, 0)');

      ctx.fillStyle = coreGradient;
      ctx.fillRect(0, 0, width, height);

      // Draw Rotating Geometric HUD Core Rings
      angle += 0.005;

      ctx.save();
      ctx.translate(centerX, centerY);

      // Outer Ring
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.12)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(0, 0, Math.min(width, height) * 0.28, 0, Math.PI * 2);
      ctx.stroke();

      // Segmented Rotating Ring 1
      ctx.save();
      ctx.rotate(angle);
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.25)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([18, 12, 6, 12]);
      ctx.beginPath();
      ctx.arc(0, 0, Math.min(width, height) * 0.22, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Segmented Rotating Ring 2 (Reverse)
      ctx.save();
      ctx.rotate(-angle * 1.4);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1;
      ctx.setLineDash([30, 25, 10, 25]);
      ctx.beginPath();
      ctx.arc(0, 0, Math.min(width, height) * 0.16, 0, Math.PI * 2);
      ctx.stroke();

      // Hexagonal or Polygon Core
      const polyRadius = Math.min(width, height) * 0.1;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (i * Math.PI) / 3;
        const px = Math.cos(a) * polyRadius;
        const py = Math.sin(a) * polyRadius;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.35)';
      ctx.stroke();
      ctx.restore();

      // Core Crosshairs / Axis
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.08)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(0, -Math.min(width, height) * 0.35);
      ctx.lineTo(0, Math.min(width, height) * 0.35);
      ctx.moveTo(-Math.min(width, height) * 0.35, 0);
      ctx.lineTo(Math.min(width, height) * 0.35, 0);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.restore();

      // Draw & Update Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.pulsePhase += p.pulseSpeed;

        // Wrap around bounds
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Slight parallax push from mouse
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          const force = (140 - dist) / 140;
          p.x += (dx / dist) * force * 0.8;
          p.y += (dy / dist) * force * 0.8;
        }

        const currentAlpha = p.baseAlpha + Math.sin(p.pulsePhase) * 0.2;
        ctx.fillStyle = `${p.color}${Math.max(0.05, Math.min(1, currentAlpha))})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby red energy particles with thin lightning/laser lines
        if (p.isRedEnergy) {
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            if (p2.isRedEnergy) {
              const ndx = p.x - p2.x;
              const ndy = p.y - p2.y;
              const ndist = Math.sqrt(ndx * ndx + ndy * ndy);
              if (ndist < 75) {
                const lineAlpha = (1 - ndist / 75) * 0.15;
                ctx.strokeStyle = `rgba(239, 68, 68, ${lineAlpha})`;
                ctx.lineWidth = 0.6;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
              }
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [interactive, intensity]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none w-full h-full ${className}`}
    />
  );
};
