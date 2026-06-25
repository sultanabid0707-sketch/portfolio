import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [clicking, setClicking] = useState(false)

  const mx = useMotionValue(-300)
  const my = useMotionValue(-300)

  // Dot — near-instant
  const dotX = useSpring(mx, { stiffness: 3000, damping: 70 })
  const dotY = useSpring(my, { stiffness: 3000, damping: 70 })

  // Ring — slight lag
  const ringX = useSpring(mx, { stiffness: 320, damping: 28 })
  const ringY = useSpring(my, { stiffness: 320, damping: 28 })

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const move = (e) => { mx.set(e.clientX); my.set(e.clientY); setVisible(true) }
    const leave = () => setVisible(false)
    const enter = () => setVisible(true)
    const down = () => setClicking(true)
    const up = () => setClicking(false)
    const over = (e) => { if (e.target.closest('a, button, [data-hover]')) setHovering(true) }
    const out = (e) => { if (e.target.closest('a, button, [data-hover]')) setHovering(false) }

    window.addEventListener('mousemove', move)
    document.documentElement.addEventListener('mouseleave', leave)
    document.documentElement.addEventListener('mouseenter', enter)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    window.addEventListener('mouseover', over)
    window.addEventListener('mouseout', out)
    return () => {
      window.removeEventListener('mousemove', move)
      document.documentElement.removeEventListener('mouseleave', leave)
      document.documentElement.removeEventListener('mouseenter', enter)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
      window.removeEventListener('mouseover', over)
      window.removeEventListener('mouseout', out)
    }
  }, [mx, my])

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null

  return (
    <motion.div animate={{ opacity: visible ? 1 : 0 }} transition={{ duration: 0.12 }}>
      {/* Ring */}
      <motion.div
        className="fixed pointer-events-none z-[9995] rounded-full"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          border: `1.5px solid ${hovering ? '#f97316' : '#8b5cf699'}`,
          boxShadow: hovering
            ? '0 0 16px #f9731644, inset 0 0 6px #f9731611'
            : '0 0 8px #8b5cf622',
          transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        }}
        animate={{
          width: clicking ? 16 : hovering ? 42 : 26,
          height: clicking ? 16 : hovering ? 42 : 26,
          opacity: clicking ? 0.6 : 0.9,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      />

      {/* Dot */}
      <motion.div
        className="fixed pointer-events-none z-[9999] rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: clicking ? 7 : hovering ? 3 : 5,
          height: clicking ? 7 : hovering ? 3 : 5,
          backgroundColor: hovering ? '#f97316' : '#ffffff',
          boxShadow: hovering
            ? '0 0 8px #f97316cc'
            : '0 0 5px rgba(255,255,255,0.85)',
          opacity: clicking ? 0.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 800, damping: 32 }}
      />
    </motion.div>
  )
}
