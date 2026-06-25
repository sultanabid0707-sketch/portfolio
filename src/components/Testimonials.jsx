import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiStar } from 'react-icons/fi'

const testimonials = [
  {
    name: 'Ahmed Raza',
    role: 'CTO, TechStart PK',
    avatar: 'AR',
    color: '#8b5cf6',
    stars: 5,
    text: "Sultan delivered our restaurant platform ahead of schedule with exceptional quality. The real-time order tracking and Stripe integration worked flawlessly from day one. His attention to detail and clean code made future updates a breeze.",
  },
  {
    name: 'Sarah Khan',
    role: 'Product Manager, NovaByte',
    avatar: 'SK',
    color: '#14b8a6',
    stars: 5,
    text: "Working with Sultan was an absolute pleasure. He took our vague requirements and turned them into a polished, performant application. His React skills are top-notch and he communicates exceptionally well throughout the process.",
  },
  {
    name: 'Omar Farooq',
    role: 'Founder, DigitalCraft',
    avatar: 'OF',
    color: '#f97316',
    stars: 5,
    text: "Sultan built our entire e-commerce API in record time. The codebase is clean, well-documented, and scalable. When we needed to add features months later, it was effortless. Highly recommend for any full-stack project.",
  },
]

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="testimonials" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="text-primary font-mono text-sm mb-2">// kind words</p>
          <h2 className="text-4xl md:text-5xl font-black text-white section-title">
            Testimonials
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, boxShadow: `0 20px 60px ${t.color}22` }}
              className="relative rounded-2xl p-6 flex flex-col gap-4"
              style={{
                background: 'var(--bg-card)',
                border: `1px solid rgba(255,255,255,0.06)`,
                transition: 'box-shadow 0.3s',
              }}
            >
              {/* Top accent */}
              <div className="absolute top-0 left-6 right-6 h-px" style={{ background: `linear-gradient(90deg, transparent, ${t.color}, transparent)` }} />

              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: t.stars }).map((_, si) => (
                  <motion.div
                    key={si}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: i * 0.12 + si * 0.06 + 0.3 }}
                  >
                    <FiStar size={14} style={{ color: t.color, fill: t.color }} />
                  </motion.div>
                ))}
              </div>

              {/* Quote */}
              <p className="text-slate-300 text-sm leading-relaxed flex-1">
                "{t.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{ background: `${t.color}25`, color: t.color, border: `1px solid ${t.color}44` }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="text-white text-sm font-semibold">{t.name}</div>
                  <div className="text-slate-500 text-xs">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
