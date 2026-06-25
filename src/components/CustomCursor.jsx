import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [trailPos, setTrailPos] = useState({ x: -100, y: -100 })
  const [clicking, setClicking] = useState(false)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY })
      setTimeout(() => setTrailPos({ x: e.clientX, y: e.clientY }), 80)
    }
    const down = () => setClicking(true)
    const up = () => setClicking(false)

    const enterLink = (e) => {
      if (e.target.closest('a, button, [data-hover]')) setHovering(true)
    }
    const leaveLink = (e) => {
      if (e.target.closest('a, button, [data-hover]')) setHovering(false)
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    window.addEventListener('mouseover', enterLink)
    window.addEventListener('mouseout', leaveLink)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
      window.removeEventListener('mouseover', enterLink)
      window.removeEventListener('mouseout', leaveLink)
    }
  }, [])

  return (
    <>
      {/* Trail dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full mix-blend-screen"
        animate={{
          x: trailPos.x - 20,
          y: trailPos.y - 20,
          scale: hovering ? 1.8 : clicking ? 0.6 : 1,
        }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        style={{
          width: 40,
          height: 40,
          background: 'radial-gradient(circle, #7c3aed44 0%, transparent 70%)',
          border: '1px solid #7c3aed66',
        }}
      />

      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        animate={{
          x: pos.x - 5,
          y: pos.y - 5,
          scale: clicking ? 0.5 : hovering ? 0 : 1,
        }}
        transition={{ type: 'spring', stiffness: 800, damping: 35 }}
        style={{
          width: 10,
          height: 10,
          background: hovering
            ? 'transparent'
            : 'radial-gradient(circle, #06b6d4 0%, #7c3aed 100%)',
          boxShadow: '0 0 10px #06b6d4',
        }}
      />
    </>
  )
}
