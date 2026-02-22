import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  alpha: number;
  vx: number;
  vy: number;
  life: number;
}

const CursorParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const createParticle = (x: number, y: number) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 2 + 0.5;
      
      particlesRef.current.push({
        x,
        y,
        size: Math.random() * 4 + 2,
        alpha: 1,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      
      // Create multiple particles on mouse move
      for (let i = 0; i < 3; i++) {
        createParticle(
          e.clientX + (Math.random() - 0.5) * 10,
          e.clientY + (Math.random() - 0.5) * 10
        );
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current.filter((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= 0.02;
        particle.alpha = particle.life;
        particle.size *= 0.98;

        if (particle.life <= 0) return false;

        // Draw particle with glow effect
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 2
        );
        
        gradient.addColorStop(0, `hsla(217, 100%, 60%, ${particle.alpha})`);
        gradient.addColorStop(0.5, `hsla(217, 100%, 50%, ${particle.alpha * 0.5})`);
        gradient.addColorStop(1, `hsla(217, 100%, 40%, 0)`);

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Inner bright core
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(217, 100%, 80%, ${particle.alpha})`;
        ctx.fill();

        return true;
      });

      // Limit particles for performance
      if (particlesRef.current.length > 100) {
        particlesRef.current = particlesRef.current.slice(-100);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ background: 'transparent' }}
    />
  );
};

export default CursorParticles;
