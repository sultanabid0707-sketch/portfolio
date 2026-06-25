import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const mx = useMotionValue(-200)
  const my = useMotionValue(-200)

  // Dot — instant
  const dotX = useSpring(mx, { stiffness: 2000, damping: 60 })
  const dotY = useSpring(my, { stiffness: 2000, damping: 60 })

  // Ring — medium lag
  const ringX = useSpring(mx, { stiffness: 180, damping: 22 })
  const ringY = useSpring(my, { stiffness: 180, damping: 22 })

  // Blob — slow drift
  const blobX = useSpring(mx, { stiffness: 60, damping: 18 })
  const blobY = useSpring(my, { stiffness: 60, damping: 18 })

  const [hovering, setHovering] = useState(false)
  const [clicking, setClicking] = useState(false)
  const [label, setLabel] = useState('')

  useEffect(() => {
    const onMove = (e) => {
      mx.set(e.clientX)
      my.set(e.clientY)
    }
    const onDown = () => setClicking(true)
    const onUp = () => setClicking(false)

    const onOver = (e) => {
      const el = e.target.closest('a, button, [data-hover]')
      if (el) {
        setHovering(true)
        setLabel(el.dataset.cursorLabel || '')
      }
    }
    const onOut = (e) => {
      if (e.target.closest('a, button, [data-hover]')) {
        setHovering(false)
        setLabel('')
      }
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('mouseover', onOver)
    window.addEventListener('mouseout', onOut)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mouseout', onOut)
    }
  }, [mx, my])

  return (
    <>
      {/* Layer 1 — soft ambient blob */}
      <motion.div
        className="fixed pointer-events-none z-[9990] rounded-full"
        style={{
          x: blobX,
          y: blobY,
          translateX: '-50%',
          translateY: '-50%',
          width: hovering ? 120 : 80,
          height: hovering ? 120 : 80,
          background: hovering
            ? 'radial-gradient(circle, #ec489955 0%, transparent 70%)'
            : 'radial-gradient(circle, #7c3aed33 0%, transparent 70%)',
          filter: 'blur(20px)',
          transition: 'width 0.4s ease, height 0.4s ease, background 0.4s ease',
        }}
      />

      {/* Layer 2 — rotating gradient ring */}
      <motion.div
        className="fixed pointer-events-none z-[9995] rounded-full flex items-center justify-center"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: clicking ? 24 : hovering ? 56 : 36,
          height: clicking ? 24 : hovering ? 56 : 36,
          scale: clicking ? 0.85 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        {/* Rotating conic gradient border */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          style={{
            background: hovering
              ? 'conic-gradient(from 0deg, #ec4899, #7c3aed, #06b6d4, #ec4899)'
              : 'conic-gradient(from 0deg, #7c3aed, #06b6d4, #a78bfa, #7c3aed)',
            padding: 1.5,
            borderRadius: '50%',
          }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{ background: clicking ? 'transparent' : '#0a0a0f' }}
          />
        </motion.div>

        {/* Hover label */}
        {hovering && label && (
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10 text-white text-[8px] font-mono font-bold tracking-widest uppercase pointer-events-none"
          >
            {label}
          </motion.span>
        )}

        {/* Hover arrow */}
        {hovering && !label && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10 text-white text-xs pointer-events-none"
          >
            →
          </motion.span>
        )}
      </motion.div>

      {/* Layer 3 — precise core dot */}
      <motion.div
        className="fixed pointer-events-none z-[9999] rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, #ffffff 0%, #06b6d4 60%, #7c3aed 100%)',
          boxShadow: '0 0 8px #06b6d4, 0 0 16px #7c3aed44',
        }}
        animate={{
          width: hovering ? 0 : clicking ? 14 : 7,
          height: hovering ? 0 : clicking ? 14 : 7,
          opacity: hovering ? 0 : 1,
        }}
        transition={{ type: 'spring', stiffness: 600, damping: 30 }}
      />
    </>
  )
}
