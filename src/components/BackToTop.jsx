import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowUp } from 'react-icons/fi'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1, boxShadow: '0 0 24px #7c3aed88' }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full flex items-center justify-center text-white"
          style={{
            background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
            boxShadow: '0 0 16px #7c3aed55',
          }}
          data-hover
          data-cursor-label="TOP"
        >
          {/* Rotating ring decoration */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-dashed border-white/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          />
          <FiArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
