import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { FiExternalLink, FiGithub, FiX, FiCode, FiLayers, FiShoppingCart } from 'react-icons/fi'

const projects = [
  {
    id: 1,
    title: 'Restaurant Management Platform',
    tagline: 'Full-Stack Web App',
    description: 'A complete restaurant management system with table reservations, real-time order tracking, and integrated Stripe payment processing.',
    longDesc: 'This platform revolutionizes restaurant operations by providing an end-to-end solution for managing reservations, orders, menus, and payments. Features include real-time WebSocket notifications for kitchen staff, automated email confirmations, analytics dashboard for revenue tracking, and secure Stripe payment integration with 3D Secure support.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe', 'Socket.io', 'JWT'],
    github: 'https://github.com/SultanAbid07',
    live: '#',
    color: '#8b5cf6',
    icon: FiShoppingCart,
    highlights: ['Real-time order tracking via WebSockets', 'Stripe payment integration with webhooks', 'JWT authentication & role-based access', 'Responsive admin dashboard'],
  },
  {
    id: 2,
    title: 'E-Commerce API',
    tagline: 'RESTful Backend Service',
    description: 'Scalable REST API powering a modern e-commerce platform with product management, cart system, user auth, and order processing.',
    longDesc: 'A production-ready RESTful API built with Node.js and Express, backed by MongoDB with Mongoose ODM. Includes JWT-based auth, rate limiting, input validation, and comprehensive error handling. Deployed on cloud infrastructure with CI/CD pipeline.',
    tech: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Mongoose', 'Redis'],
    github: 'https://github.com/SultanAbid07',
    live: '#',
    color: '#14b8a6',
    icon: FiLayers,
    highlights: ['RESTful design with pagination', 'Redis caching for performance', 'Rate limiting & security headers', 'Automated testing suite'],
  },
  {
    id: 3,
    title: 'React Component Library',
    tagline: 'Open Source UI Kit',
    description: 'A collection of reusable, accessible React components with TypeScript support, Storybook docs, and published to npm.',
    longDesc: 'Built with accessibility in mind following WAI-ARIA guidelines with full keyboard navigation. Each component is thoroughly tested, tree-shakable, and comes with TypeScript definitions. Published to npm with automated releases.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Storybook', 'Vitest'],
    github: 'https://github.com/SultanAbid07',
    live: '#',
    color: '#f97316',
    icon: FiCode,
    highlights: ['TypeScript type definitions', 'WCAG 2.1 AA accessibility', 'Storybook documentation', 'Published to npm registry'],
  },
]

function ProjectModal({ project, onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 40 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.85, opacity: 0, y: 40 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-4 sm:p-8 relative"
          onClick={(e) => e.stopPropagation()}
          style={{ background: 'var(--bg-card)', border: `1px solid ${project.color}33`, boxShadow: `0 0 60px ${project.color}22` }}
        >
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"><FiX /></button>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${project.color}22`, color: project.color }}><project.icon size={22} /></div>
          <div className="text-xs font-mono px-2 py-1 rounded inline-block mb-2" style={{ color: project.color, background: `${project.color}22` }}>{project.tagline}</div>
          <h3 className="text-2xl font-bold text-white mb-4">{project.title}</h3>
          <p className="text-slate-300 leading-relaxed mb-6">{project.longDesc}</p>
          <h4 className="text-sm font-semibold text-white mb-3">Key Highlights</h4>
          <ul className="space-y-2 mb-6">
            {project.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-slate-400 text-sm"><span style={{ color: project.color }} className="mt-0.5">▸</span>{h}</li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((t) => (<span key={t} className="px-3 py-1 rounded-full text-xs font-mono" style={{ color: project.color, background: `${project.color}22`, border: `1px solid ${project.color}44` }}>{t}</span>))}
          </div>
          <div className="flex flex-wrap gap-3">
            <motion.a whileHover={{ scale: 1.04 }} href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition-colors"><FiGithub /> GitHub</motion.a>
            <motion.a whileHover={{ scale: 1.04 }} href={project.live} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold" style={{ background: `linear-gradient(135deg, ${project.color}, #14b8a6)` }}><FiExternalLink /> Live Demo</motion.a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function TiltCard({ project, index, onOpen }) {
  const ref = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [glare, setGlare] = useState({ x: 50, y: 50 })

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), { stiffness: 150, damping: 18 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), { stiffness: 150, damping: 18 })

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
    setGlare({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setHovered(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: '1000px' }}
    >
      {/* Tilt wrapper — NO overflow:hidden here, that kills 3D */}
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setHovered(true)}
        onClick={() => onOpen(project)}
        whileHover={{ scale: 1.03 }}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative h-[360px] rounded-2xl cursor-pointer"
      >
        {/* Inner shell handles overflow + background — separate from 3D element */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{
            background: 'var(--bg-card)',
            border: `1px solid ${hovered ? project.color + '55' : 'rgba(255,255,255,0.06)'}`,
            boxShadow: hovered ? `0 24px 64px ${project.color}30` : '0 4px 24px rgba(0,0,0,0.3)',
            transition: 'border-color 0.3s, box-shadow 0.3s',
          }}
        >
          {/* Glare shine */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: hovered
                ? `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.13) 0%, transparent 55%)`
                : 'transparent',
            }}
          />
          {/* Top accent */}
          <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, ${project.color}, transparent 70%)` }} />

        <div className="p-6 flex flex-col h-full relative z-20">
          <div>
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${project.color}20`, color: project.color }}>
                <project.icon size={22} />
              </div>
              <motion.div className="flex gap-2" animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : -6 }} transition={{ duration: 0.2 }}>
                <a href={project.github} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-colors" style={{ background: 'rgba(255,255,255,0.08)' }}><FiGithub size={14} /></a>
                <a href={project.live} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-colors" style={{ background: 'rgba(255,255,255,0.08)' }}><FiExternalLink size={14} /></a>
              </motion.div>
            </div>
            <div className="text-xs font-mono px-2 py-0.5 rounded inline-block mb-2" style={{ color: project.color, background: `${project.color}18` }}>{project.tagline}</div>
            <h3 className="text-lg font-bold text-white mb-2 leading-snug">{project.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">{project.description}</p>
          </div>

          <div className="mt-auto">
            <div className="flex flex-wrap gap-1.5 mb-3">
              {project.tech.slice(0, 4).map((t) => (<span key={t} className="px-2 py-0.5 rounded text-xs font-mono" style={{ color: project.color, background: `${project.color}18` }}>{t}</span>))}
              {project.tech.length > 4 && <span className="px-2 py-0.5 rounded text-xs font-mono text-slate-500 bg-white/5">+{project.tech.length - 4}</span>}
            </div>
            <motion.p animate={{ opacity: hovered ? 1 : 0.4, x: hovered ? 0 : -4 }} transition={{ duration: 0.2 }} className="text-xs font-medium" style={{ color: project.color }}>
              Click for full details →
            </motion.p>
          </div>
        </div>
        </div>{/* end inner shell */}
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [modal, setModal] = useState(null)

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="mb-16">
          <p className="text-primary font-mono text-sm mb-2">// my work</p>
          <h2 className="text-4xl md:text-5xl font-black text-white section-title">Featured Projects</h2>
          <p className="text-slate-400 mt-6 max-w-lg">Hover to tilt in 3D — click any card for the full story.</p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => <TiltCard key={project.id} project={project} index={i} onOpen={setModal} />)}
        </div>
      </div>
      {modal && <ProjectModal project={modal} onClose={() => setModal(null)} />}
    </section>
  )
}
