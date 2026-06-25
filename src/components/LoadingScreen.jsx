import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAME = 'Sultan Mohyuddin'

export default function LoadingScreen({ onComplete }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // letters finish ~NAME.length * 0.07s + hold 0.8s
    const t = setTimeout(() => setVisible(false), NAME.length * 70 + 1400)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          key="loader"
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden"
          style={{ backgroundColor: 'var(--bg-dark)' }}
        >
          {/* Background glow */}
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
            animate={{ scale: [0.8, 1.1, 0.9], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              background: 'radial-gradient(circle, #8b5cf633 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />

          {/* Name letters */}
          <div className="flex flex-wrap justify-center mb-6" style={{ perspective: 600 }}>
            {NAME.split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 50, rotateX: -80 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  delay: i * 0.07,
                  duration: 0.55,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="font-black text-5xl md:text-7xl inline-block"
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #14b8a6 50%, #f97316 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  letterSpacing: char === ' ' ? '0.3em' : '-0.01em',
                  minWidth: char === ' ' ? '0.5em' : 'auto',
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: NAME.length * 0.07 + 0.3, duration: 0.6 }}
            className="text-slate-400 font-mono text-sm tracking-[0.3em] uppercase"
          >
            Full-Stack Developer
          </motion.p>

          {/* Animated dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: NAME.length * 0.07 + 0.5 }}
            className="flex gap-2 mt-8"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: '#8b5cf6' }}
                animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </motion.div>

          {/* Progress bar at bottom */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.2, duration: (NAME.length * 0.07 + 1.2), ease: 'easeInOut' }}
            className="absolute bottom-0 left-0 right-0 h-[2px] origin-left"
            style={{ background: 'linear-gradient(90deg, #8b5cf6, #14b8a6, #f97316)' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
