"use client";

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  life: number;
  maxLife: number;
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, move: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle resize
    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    // Initialize canvas
    handleResize();
    window.addEventListener('resize', handleResize);

    // Mouse events
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.move = true;

      // Create particles on mouse move for additional effect
      if (mouseRef.current.move) {
        for (let i = 0; i < 2; i++) {
          createParticle(
            mouseRef.current.x,
            mouseRef.current.y,
            Math.random() * 4 + 1,
            getRandomColor()
          );
        }
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.move = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Generate initial particles
    for (let i = 0; i < 50; i++) {
      createParticle(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        Math.random() * 4 + 1,
        getRandomColor()
      );
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        // Update particle position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.life--;

        // Fade out particles towards end of life
        const alpha = particle.life / particle.maxLife;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color.replace('1)', `${alpha})`);
        ctx.fill();

        // Remove dead particles
        if (particle.life <= 0) {
          particlesRef.current.splice(index, 1);

          // Create new particle to replace dead one
          createParticle(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            Math.random() * 4 + 1,
            getRandomColor()
          );
        }

        // Handle edge cases
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    // Helper functions
    function createParticle(x: number, y: number, size: number, color: string) {
      const newParticle: Particle = {
        x,
        y,
        size,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color,
        life: Math.random() * 200 + 50,
        maxLife: Math.random() * 200 + 50
      };
      particlesRef.current.push(newParticle);
    }

    function getRandomColor() {
      const colors = [
        'rgba(59, 130, 246, 1)',  // blue-500
        'rgba(79, 70, 229, 1)',   // indigo-600
        'rgba(124, 58, 237, 1)',  // violet-600
        'rgba(16, 185, 129, 1)',  // emerald-500
        'rgba(99, 102, 241, 1)',  // indigo-500
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    }

    // Start animation
    requestRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
      />
      <div className="fixed inset-0 bg-background/80 backdrop-blur-[2px] pointer-events-none z-0" />
    </>
  );
}
