import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { FiExternalLink, FiGithub, FiX, FiCode, FiLayers, FiShoppingCart } from 'react-icons/fi'

const projects = [
  {
    id: 1,
    title: 'Restaurant Management Platform',
    tagline: 'Full-Stack Web App',
    description:
      'A complete restaurant management system with table reservations, real-time order tracking, and integrated Stripe payment processing. Built with React, Node.js, Express, and MongoDB.',
    longDesc:
      'This platform revolutionizes restaurant operations by providing an end-to-end solution for managing reservations, orders, menus, and payments. Features include real-time WebSocket notifications for kitchen staff, automated email confirmations, analytics dashboard for revenue tracking, and secure Stripe payment integration with 3D Secure support.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe', 'Socket.io', 'JWT'],
    github: 'https://github.com/SultanAbid07',
    live: '#',
    color: '#7c3aed',
    icon: FiShoppingCart,
    highlights: [
      'Real-time order tracking via WebSockets',
      'Stripe payment integration with webhooks',
      'JWT authentication & role-based access',
      'Responsive admin dashboard',
    ],
  },
  {
    id: 2,
    title: 'E-Commerce API',
    tagline: 'RESTful Backend Service',
    description:
      'Scalable REST API powering a modern e-commerce platform. Features product management, cart system, user authentication, and order processing.',
    longDesc:
      'A production-ready RESTful API built with Node.js and Express, backed by MongoDB with Mongoose ODM. Includes JWT-based auth, rate limiting, input validation, and comprehensive error handling. Deployed on cloud infrastructure with CI/CD pipeline.',
    tech: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Mongoose', 'Redis'],
    github: 'https://github.com/SultanAbid07',
    live: '#',
    color: '#06b6d4',
    icon: FiLayers,
    highlights: [
      'RESTful design with pagination',
      'Redis caching for performance',
      'Rate limiting & security headers',
      'Automated testing suite',
    ],
  },
  {
    id: 3,
    title: 'React Component Library',
    tagline: 'Open Source UI Kit',
    description:
      'A collection of reusable, accessible, and beautifully designed React components with TypeScript support and Storybook documentation.',
    longDesc:
      'Built with accessibility in mind, this component library follows WAI-ARIA guidelines and supports full keyboard navigation. Each component is thoroughly tested, tree-shakable, and comes with TypeScript definitions. Published to npm with automated releases.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Storybook', 'Vitest'],
    github: 'https://github.com/SultanAbid07',
    live: '#',
    color: '#ec4899',
    icon: FiCode,
    highlights: [
      'TypeScript type definitions',
      'WCAG 2.1 AA accessibility',
      'Storybook documentation',
      'Published to npm registry',
    ],
  },
]

function ProjectModal({ project, onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 40 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="bg-card border border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 relative"
          onClick={(e) => e.stopPropagation()}
          style={{ boxShadow: `0 0 60px ${project.color}33` }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <FiX />
          </button>

          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
            style={{ background: `${project.color}22`, color: project.color }}
          >
            <project.icon size={22} />
          </div>

          <div
            className="text-xs font-mono px-2 py-1 rounded inline-block mb-2"
            style={{ color: project.color, background: `${project.color}22` }}
          >
            {project.tagline}
          </div>

          <h3 className="text-2xl font-bold text-white mb-4">{project.title}</h3>
          <p className="text-slate-300 leading-relaxed mb-6">{project.longDesc}</p>

          <h4 className="text-sm font-semibold text-white mb-3">Key Highlights</h4>
          <ul className="space-y-2 mb-6">
            {project.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-slate-400 text-sm">
                <span style={{ color: project.color }} className="mt-0.5">▸</span>
                {h}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-full text-xs font-mono"
                style={{ color: project.color, background: `${project.color}22`, border: `1px solid ${project.color}44` }}
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex gap-4">
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition-colors"
            >
              <FiGithub /> GitHub
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.04, boxShadow: `0 0 20px ${project.color}66` }}
              whileTap={{ scale: 0.97 }}
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold"
              style={{ background: `linear-gradient(135deg, ${project.color}, #06b6d4)` }}
            >
              <FiExternalLink /> Live Demo
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function ProjectCard({ project, index, onOpen }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="card-3d h-[380px] cursor-pointer"
      data-hover
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen(project)}
    >
      <div className="card-3d-inner">
        {/* Front */}
        <div
          className="card-front p-6 flex flex-col justify-between border border-white/5 bg-card"
          style={{ boxShadow: hovered ? `0 0 40px ${project.color}33, inset 0 0 40px ${project.color}08` : 'none' }}
        >
          <div>
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
              style={{ background: `${project.color}22`, color: project.color }}
            >
              <project.icon size={22} />
            </div>
            <div
              className="text-xs font-mono px-2 py-0.5 rounded inline-block mb-2"
              style={{ color: project.color, background: `${project.color}22` }}
            >
              {project.tagline}
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">{project.description}</p>
          </div>

          <div>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tech.slice(0, 4).map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded text-xs font-mono"
                  style={{ color: project.color, background: `${project.color}18` }}
                >
                  {t}
                </span>
              ))}
              {project.tech.length > 4 && (
                <span className="px-2 py-0.5 rounded text-xs font-mono text-slate-500 bg-white/5">
                  +{project.tech.length - 4}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span style={{ color: project.color }}>↻</span>
              Hover to flip
            </div>
          </div>

          {/* Gradient border top */}
          <div
            className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
            style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }}
          />
        </div>

        {/* Back */}
        <div
          className="card-back p-6 flex flex-col justify-between border border-white/10"
          style={{
            background: `linear-gradient(135deg, ${project.color}22, #16161f)`,
            borderColor: `${project.color}44`,
          }}
        >
          <div>
            <h3 className="text-xl font-bold text-white mb-4">{project.title}</h3>
            <ul className="space-y-2 mb-4">
              {project.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-slate-300 text-sm">
                  <span style={{ color: project.color }}>▸</span>
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <div className="flex gap-3">
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors"
              >
                <FiGithub size={14} /> Code
              </a>
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 text-sm hover:opacity-80 transition-opacity font-semibold"
                style={{ color: project.color }}
              >
                <FiExternalLink size={14} /> Live Demo
              </a>
            </div>
            <button
              className="w-full py-2 rounded-xl text-sm font-semibold text-white transition-all"
              style={{ background: project.color, boxShadow: `0 0 16px ${project.color}66` }}
              onClick={() => onOpen(project)}
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [modal, setModal] = useState(null)

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="text-primary font-mono text-sm mb-2">// my work</p>
          <h2 className="text-4xl md:text-5xl font-black text-white section-title">
            Featured Projects
          </h2>
          <p className="text-slate-400 mt-6 max-w-lg">
            Hover over a card to flip it — click for the full story behind each project.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onOpen={setModal}
            />
          ))}
        </div>
      </div>

      {modal && <ProjectModal project={modal} onClose={() => setModal(null)} />}
    </section>
  )
}
