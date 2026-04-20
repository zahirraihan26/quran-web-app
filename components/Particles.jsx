'use client';

import React, { useEffect, useState } from 'react';

export default function Particles() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate 40 random glowing dust particles
    const generatedParticles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // Left %
      y: Math.random() * 100, // Top %
      size: Math.random() * 3 + 1, // 1px to 4px
      duration: Math.random() * 30 + 15, // 15s to 45s floating
      delay: Math.random() * 10,
      opacity: Math.random() * 0.4 + 0.1, // 0.1 to 0.5 opacity
    }));
    setParticles(generatedParticles);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-gold mix-blend-screen"
          style={{
            left: `${p.x}vw`,
            top: `${p.y}vh`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            boxShadow: `0 0 ${p.size * 3}px rgba(196, 164, 105, 0.8)`,
            animation: `float-particle ${p.duration}s infinite ease-in-out ${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
