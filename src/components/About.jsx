import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiCode, FiLayers, FiZap, FiAward } from 'react-icons/fi'

const stats = [
  { label: 'Projects Built', value: 15, suffix: '+', icon: FiLayers },
  { label: 'Technologies', value: 12, suffix: '+', icon: FiCode },
  { label: 'Years Learning', value: 3, suffix: '+', icon: FiZap },
  { label: 'Certifications', value: 5, suffix: '+', icon: FiAward },
]

function AnimatedCounter({ target, suffix, inView }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = Math.ceil(target / 40)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(start)
    }, 40)
    return () => clearInterval(timer)
  }, [inView, target])
  return <>{count}{suffix}</>
}

const timeline = [
  {
    year: '2021',
    title: 'Started the Journey',
    desc: 'Began learning HTML, CSS, and JavaScript. Built first static websites.',
    color: '#8b5cf6',
  },
  {
    year: '2022',
    title: 'Dived into React',
    desc: 'Mastered React hooks, state management, and component architecture.',
    color: '#14b8a6',
  },
  {
    year: '2023',
    title: 'Full-Stack Growth',
    desc: 'Learned Node.js, Express, MongoDB. Built RESTful APIs and integrated Stripe payments.',
    color: '#f97316',
  },
  {
    year: '2024',
    title: 'Advanced Development',
    desc: 'Worked on real-world projects including a restaurant management platform.',
    color: '#c4b5fd',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="mb-16">
            <p className="text-primary font-mono text-sm mb-2">// about me</p>
            <h2 className="text-4xl md:text-5xl font-black text-white section-title">
              Who I Am
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Left — bio */}
            <div className="space-y-6">
              <motion.p variants={fadeUp} className="text-slate-300 text-lg leading-relaxed">
                I'm <span className="text-white font-semibold">Sultan Mohyuddin</span>, a
                passionate Full-Stack Developer from Pakistan with a love for building
                immersive, performant web applications.
              </motion.p>
              <motion.p variants={fadeUp} className="text-slate-400 leading-relaxed">
                My expertise spans the entire web stack — from crafting pixel-perfect
                React interfaces to designing scalable Node.js backends and MongoDB
                databases. I believe great software lives at the intersection of
                functionality and beauty.
              </motion.p>
              <motion.p variants={fadeUp} className="text-slate-400 leading-relaxed">
                When I'm not coding, I'm exploring new technologies, contributing to
                open-source, and sharpening my problem-solving skills on competitive
                programming challenges.
              </motion.p>

              {/* Stats */}
              <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4 pt-4">
                {stats.map(({ label, value, suffix, icon: Icon }) => (
                  <div
                    key={label}
                    className="gradient-border p-4 rounded-xl flex items-center gap-3 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="text-primary text-lg" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-white">
                        <AnimatedCounter target={value} suffix={suffix} inView={inView} />
                      </div>
                      <div className="text-xs text-slate-500">{label}</div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — timeline */}
            <motion.div variants={fadeUp} className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-accent" />

              <div className="space-y-8">
                {timeline.map((item, i) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: 30 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.12, duration: 0.6 }}
                    className="pl-12 relative"
                  >
                    {/* Dot */}
                    <div
                      className="absolute left-2.5 top-1.5 w-3 h-3 rounded-full -translate-x-1/2"
                      style={{ backgroundColor: item.color, boxShadow: `0 0 8px ${item.color}` }}
                    />
                    <div
                      className="inline-block px-2 py-0.5 rounded text-xs font-mono font-semibold mb-1"
                      style={{ color: item.color, background: `${item.color}22` }}
                    >
                      {item.year}
                    </div>
                    <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
