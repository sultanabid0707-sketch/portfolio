import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

let uid = 0

export default function ClickSparks() {
  const [sparks, setSparks] = useState([])

  const addSpark = useCallback((x, y) => {
    const id = uid++
    const count = 10
    const particles = Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2
      const dist = 40 + Math.random() * 40
      const colors = ['#8b5cf6', '#14b8a6', '#f97316', '#c4b5fd', '#ffffff', '#5eead4']
      return {
        id: `${id}-${i}`,
        x,
        y,
        dx: Math.cos(angle) * dist,
        dy: Math.sin(angle) * dist,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 3 + Math.random() * 4,
      }
    })
    setSparks((prev) => [...prev, ...particles])
    setTimeout(() => {
      setSparks((prev) => prev.filter((p) => !p.id.startsWith(`${id}-`)))
    }, 700)
  }, [])

  useEffect(() => {
    const onClick = (e) => addSpark(e.clientX, e.clientY)
    window.addEventListener('click', onClick)
    return () => window.removeEventListener('click', onClick)
  }, [addSpark])

  return (
    <div className="fixed inset-0 pointer-events-none z-[9997] overflow-hidden">
      <AnimatePresence>
        {sparks.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            initial={{ x: p.x, y: p.y, scale: 1, opacity: 1 }}
            animate={{
              x: p.x + p.dx,
              y: p.y + p.dy,
              scale: 0,
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
              translateX: '-50%',
              translateY: '-50%',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
