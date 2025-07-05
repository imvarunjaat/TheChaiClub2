'use client';

import { useEffect, useRef } from 'react';

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Particle array
    const particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      alpha: number;
      targetAlpha: number;
      sparkleIntensity: number;
    }[] = [];

    // Vibrant color palette with good contrast
    const colors = [
      '#FFD1DC', // Soft pink
      '#FFECB8', // Warm cream
      '#FFB347', // Peach
      '#FF6961', // Coral
      '#AEC6CF', // Pastel blue
      '#B5EAD7', // Mint green
      '#E2F0CB', // Light green
      '#C7CEEA', // Lavender
      '#F8B195', // Salmon
      '#F67280'  // Rosy pink
    ];

    // Create particles (more dense)
    const particleCount = Math.floor(window.innerWidth * window.innerHeight / 4000);
    
    for (let i = 0; i < particleCount; i++) {
      const colorIndex = Math.floor(Math.random() * colors.length);
      const baseAlpha = Math.random() * 0.6 + 0.2; // More visible
      
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 5 + 2, // Larger particles
        speedX: (Math.random() * 0.22 - 0.11) * 1.3, // Small, safe increase
        speedY: (Math.random() * 0.22 - 0.11) * 1.3, // Small, safe increase
        color: colors[colorIndex],
        alpha: baseAlpha,
        targetAlpha: baseAlpha,
        sparkleIntensity: Math.random() * 0.8 + 0.2
      });
    }

    // Animation loop
    let animationId: number;
    let lastTime = 0;
    let sparkleTimer = 0;
    
    const animate = (timestamp: number) => {
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;
      sparkleTimer += deltaTime;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Add subtle background sparkle effect
      if (sparkleTimer > 100) {
        sparkleTimer = 0;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      particles.forEach(particle => {
        // Calculate distance to cursor
        const dx = particle.x - mousePos.current.x;
        const dy = particle.y - mousePos.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Add repulsion force when near cursor (stronger magnetic effect)
        if (distance < 150) {
          const force = (150 - distance) / 15;
          const angle = Math.atan2(dy, dx);
          
          particle.x += Math.cos(angle) * force;
          particle.y += Math.sin(angle) * force;
        }
        
        // Update position with increased speed
        particle.x += particle.speedX * (0.8 + Math.random() * 0.4);
        particle.y += particle.speedY * (0.8 + Math.random() * 0.4);
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // More dramatic pulsing for sparkle effect
        particle.alpha += (particle.targetAlpha - particle.alpha) * 0.1;
        if (Math.random() < 0.02) { // Increased frequency
          particle.targetAlpha = (Math.random() * 0.5 + 0.3) * particle.sparkleIntensity;
        }
        
        // Draw particle with enhanced glow
        ctx.save();
        
        // Sparkle effect (random bright flashes)
        if (Math.random() < 0.03) { // Increased frequency
          ctx.shadowBlur = 30; // Increased glow
          ctx.globalAlpha = 0.9;
        } else {
          ctx.shadowBlur = 20 * particle.sparkleIntensity; // Increased glow
          ctx.globalAlpha = particle.alpha;
        }
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.shadowColor = particle.color;
        ctx.fill();
        
        // Add occasional bright sparkle dots
        if (Math.random() < 0.008) { // Increased frequency
          ctx.beginPath();
          ctx.arc(
            particle.x + (Math.random() * 6 - 3),
            particle.y + (Math.random() * 6 - 3),
            particle.size * 0.7,
            0,
            Math.PI * 2
          );
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.fill();
        }
        
        ctx.restore();
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate(0);
    
    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
    />
  );
}
