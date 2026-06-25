import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = ['Home', 'About', 'Projects', 'Skills', 'Testimonials', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('Home')
  const [mobileOpen, setMobileOpen] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (link) => {
    setActive(link)
    setMobileOpen(false)
    const el = document.getElementById(link.toLowerCase())
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-dark/80 backdrop-blur-xl border-b border-primary/20 shadow-lg shadow-primary/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-xl font-bold font-mono cursor-pointer"
          onClick={() => handleNav('Home')}
        >
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Sultan Mohyuddin
          </span>
        </motion.div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <motion.button
              key={link}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNav(link)}
              className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                active === link ? 'text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {active === link && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-lg bg-primary/20 border border-primary/40"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative">{link}</span>
            </motion.button>
          ))}
          <motion.a
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px #8b5cf688' }}
            whileTap={{ scale: 0.95 }}
            href="/Sultan_Mohyuddin_Professional_CV.pdf"
            target="_blank"
            rel="noreferrer"
            className="ml-3 px-5 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-primary to-secondary text-white"
          >
            Resume
          </motion.a>

        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${mobileOpen ? 'opacity-0' : ''}`} />
          <div className={`w-6 h-0.5 bg-white transition-all ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark/95 backdrop-blur-xl border-t border-primary/20"
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {links.map((link) => (
                <button
                  key={link}
                  onClick={() => handleNav(link)}
                  className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    active === link
                      ? 'bg-primary/20 text-white border border-primary/40'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
