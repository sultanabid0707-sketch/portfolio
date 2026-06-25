import { useMemo } from 'react'

const PARTICLE_COUNT = 28

export default function ParticleBackground() {
  const particles = useMemo(() =>
    Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 12 + 8,
      delay: Math.random() * -15,
      color: ['#7c3aed', '#06b6d4', '#ec4899', '#a78bfa', '#22d3ee'][
        Math.floor(Math.random() * 5)
      ],
    })),
  [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Ambient gradient orbs */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-10 blur-[120px]"
        style={{
          background: 'radial-gradient(circle, #7c3aed, transparent)',
          top: '-10%',
          left: '-10%',
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-8 blur-[100px]"
        style={{
          background: 'radial-gradient(circle, #06b6d4, transparent)',
          bottom: '10%',
          right: '-5%',
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full opacity-6 blur-[90px]"
        style={{
          background: 'radial-gradient(circle, #ec4899, transparent)',
          top: '40%',
          left: '40%',
        }}
      />

      {/* Floating particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            animation: `particleDrift ${p.duration}s ${p.delay}s ease-in-out infinite`,
          }}
        />
      ))}

      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#7c3aed 1px, transparent 1px), linear-gradient(90deg, #7c3aed 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />
    </div>
  )
}
