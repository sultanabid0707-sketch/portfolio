import { useEffect, useState, Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { FiArrowDown, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'

const TechCube = lazy(() => import('./TechCube'))

const ROLES = [
  'Full-Stack Developer',
  'React Specialist',
  'Node.js Engineer',
  'UI/UX Craftsman',
  'MongoDB Expert',
]

function TypeWriter({ texts }) {
  const [index, setIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = texts[index]
    let timeout

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80)
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setIndex((i) => (i + 1) % texts.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, deleting, index, texts])

  return (
    <span>
      <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
        {displayed}
      </span>
      <span className="animate-pulse text-secondary">|</span>
    </span>
  )
}

const socials = [
  { icon: FiGithub, href: 'https://github.com/SultanAbid07', label: 'GitHub' },
  { icon: FiLinkedin, href: 'https://linkedin.com/in/sultan-mohyuddin', label: 'LinkedIn' },
  { icon: FiMail, href: 'mailto:sultanabid0707@gmail.com', label: 'Email' },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
}
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center py-20">
        {/* Left — text */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-6 z-10"
        >
          <motion.div variants={item} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-mono">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            Available for work
          </motion.div>

          <motion.h1 variants={item} className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight">
            <span className="text-white">Hi, I'm </span>
            <span className="glow-text bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Sultan
            </span>
            <br />
            <span className="text-white">Mohyuddin</span>
          </motion.h1>

          <motion.h2 variants={item} className="text-xl md:text-2xl text-slate-400 font-light h-8">
            <TypeWriter texts={ROLES} />
          </motion.h2>

          <motion.p variants={item} className="text-slate-400 text-base leading-relaxed max-w-lg">
            I craft high-performance, interactive web applications with a passion for
            clean architecture, stunning UIs, and seamless user experiences. Let's build
            something extraordinary.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={item} className="flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: '0 0 30px #7c3aed66' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-primary to-secondary"
              style={{ boxShadow: '0 0 20px #7c3aed44' }}
            >
              View My Work
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04, borderColor: '#7c3aed', color: '#fff' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3.5 rounded-xl font-semibold text-slate-300 border border-slate-600 hover:border-primary transition-colors"
            >
              Get In Touch
            </motion.button>
          </motion.div>

          {/* Socials */}
          <motion.div variants={item} className="flex items-center gap-4 pt-2">
            {socials.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                whileHover={{ scale: 1.15, y: -3, color: '#7c3aed' }}
                whileTap={{ scale: 0.9 }}
                className="text-slate-500 hover:text-primary transition-colors text-xl"
              >
                <Icon />
              </motion.a>
            ))}
            <div className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
            <span className="text-slate-600 text-xs font-mono">v2.0</span>
          </motion.div>
        </motion.div>

        {/* Right — 3D Cube */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-[420px] lg:h-[500px] z-10"
        >
          {/* Glow ring behind cube */}
          <div className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(ellipse at center, #7c3aed22 0%, transparent 70%)',
              filter: 'blur(30px)',
            }}
          />
          <Suspense fallback={
            <div className="flex items-center justify-center h-full text-primary animate-pulse font-mono text-sm">
              Loading 3D scene...
            </div>
          }>
            <TechCube />
          </Suspense>

          {/* Floating badge labels */}
          {[
            { label: 'React', color: '#61dafb', pos: 'top-6 right-6' },
            { label: 'Node.js', color: '#68a063', pos: 'bottom-12 right-0' },
            { label: 'MongoDB', color: '#47a248', pos: 'bottom-6 left-6' },
          ].map(({ label, color, pos }) => (
            <motion.div
              key={label}
              className={`absolute ${pos} px-3 py-1.5 rounded-full text-xs font-mono font-semibold`}
              style={{
                background: `${color}22`,
                border: `1px solid ${color}55`,
                color,
                boxShadow: `0 0 12px ${color}33`,
              }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: Math.random() * 2 }}
            >
              {label}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
        <FiArrowDown className="text-primary" />
      </motion.div>
    </section>
  )
}
