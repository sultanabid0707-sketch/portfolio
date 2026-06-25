import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const categories = [
  {
    name: 'Frontend',
    color: '#61dafb',
    skills: [
      { name: 'React / Next.js', level: 90 },
      { name: 'TypeScript', level: 80 },
      { name: 'Tailwind CSS', level: 92 },
      { name: 'Framer Motion', level: 75 },
      { name: 'Three.js / R3F', level: 65 },
    ],
  },
  {
    name: 'Backend',
    color: '#68a063',
    skills: [
      { name: 'Node.js', level: 88 },
      { name: 'Express.js', level: 90 },
      { name: 'REST API Design', level: 85 },
      { name: 'GraphQL', level: 60 },
      { name: 'Socket.io', level: 72 },
    ],
  },
  {
    name: 'Database & Cloud',
    color: '#47a248',
    skills: [
      { name: 'MongoDB', level: 87 },
      { name: 'PostgreSQL', level: 68 },
      { name: 'Redis', level: 62 },
      { name: 'AWS / Vercel', level: 70 },
      { name: 'Docker', level: 58 },
    ],
  },
  {
    name: 'Tools & Workflow',
    color: '#8b5cf6',
    skills: [
      { name: 'Git / GitHub', level: 92 },
      { name: 'VS Code', level: 95 },
      { name: 'Postman', level: 88 },
      { name: 'Figma', level: 65 },
      { name: 'Linux CLI', level: 72 },
    ],
  },
]

const techLogos = [
  'React', 'Node.js', 'MongoDB', 'TypeScript', 'Express',
  'Tailwind', 'Git', 'Docker', 'PostgreSQL', 'Next.js',
  'Redis', 'AWS', 'Stripe', 'Socket.io', 'Figma',
]

function SkillBar({ name, level, color, index, inView }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-slate-300 text-sm font-medium">{name}</span>
        <span className="text-xs font-mono" style={{ color }}>{level}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full skill-bar-fill"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
          style={{ background: `linear-gradient(90deg, ${color}, #14b8a6)` }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="text-primary font-mono text-sm mb-2">// my toolkit</p>
          <h2 className="text-4xl md:text-5xl font-black text-white section-title">
            Skills & Tools
          </h2>
        </motion.div>

        {/* Skill categories */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: ci * 0.1, duration: 0.7 }}
              className="gradient-border p-6 rounded-2xl"
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: cat.color, boxShadow: `0 0 8px ${cat.color}` }}
                />
                <h3 className="font-semibold text-white">{cat.name}</h3>
              </div>
              <div className="space-y-4">
                {cat.skills.map((skill, si) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    color={cat.color}
                    index={si + ci * 5}
                    inView={inView}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scrolling tech badge strip */}
        <div className="overflow-hidden relative">
          <div className="flex gap-4 animate-[marquee_20s_linear_infinite]">
            {[...techLogos, ...techLogos].map((tech, i) => (
              <div
                key={i}
                className="flex-shrink-0 px-5 py-2 rounded-full border border-white/10 text-slate-400 text-sm font-mono bg-white/3 hover:border-primary/50 hover:text-white transition-colors whitespace-nowrap"
              >
                {tech}
              </div>
            ))}
          </div>
          {/* Fade edges */}
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-dark to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-dark to-transparent pointer-events-none" />
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}
