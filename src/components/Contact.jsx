import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiMail, FiGithub, FiLinkedin, FiSend, FiMapPin, FiCheck } from 'react-icons/fi'

const contactLinks = [
  {
    icon: FiMail,
    label: 'Email',
    value: 'sultanabid0707@gmail.com',
    href: 'mailto:sultanabid0707@gmail.com',
    color: '#ec4899',
  },
  {
    icon: FiGithub,
    label: 'GitHub',
    value: 'SultanAbid07',
    href: 'https://github.com/SultanAbid07',
    color: '#ffffff',
  },
  {
    icon: FiLinkedin,
    label: 'LinkedIn',
    value: 'sultan-mohyuddin',
    href: 'https://linkedin.com/in/sultan-mohyuddin',
    color: '#0077b5',
  },
  {
    icon: FiMapPin,
    label: 'Location',
    value: 'Pakistan',
    href: null,
    color: '#7c3aed',
  },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSending(true)
    // Simulate send (replace with EmailJS / Formspree in production)
    setTimeout(() => {
      setSending(false)
      setSent(true)
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setSent(false), 4000)
    }, 1400)
  }

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="text-primary font-mono text-sm mb-2">// let's talk</p>
          <h2 className="text-4xl md:text-5xl font-black text-white section-title">
            Get In Touch
          </h2>
          <p className="text-slate-400 mt-6 max-w-lg">
            I'm currently open to new opportunities. Whether you have a project in mind,
            a job offer, or just want to chat — my inbox is always open.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact links */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-4"
          >
            {contactLinks.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.6 }}
              >
                {link.href ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-card hover:border-primary/30 transition-all group"
                    data-hover
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `${link.color}22`, color: link.color }}
                    >
                      <link.icon size={18} />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-0.5">{link.label}</div>
                      <div className="text-white text-sm font-medium group-hover:text-primary transition-colors">
                        {link.value}
                      </div>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-card">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `${link.color}22`, color: link.color }}
                    >
                      <link.icon size={18} />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-0.5">{link.label}</div>
                      <div className="text-white text-sm font-medium">{link.value}</div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}

            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-3 p-4 rounded-xl border border-secondary/30 bg-secondary/5 mt-6"
            >
              <div className="w-3 h-3 rounded-full bg-secondary animate-pulse" />
              <span className="text-secondary text-sm font-medium">Available for freelance & full-time roles</span>
            </motion.div>
          </motion.div>

          {/* Contact form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="space-y-4"
          >
            {[
              { name: 'name', label: 'Your Name', type: 'text', placeholder: 'John Doe' },
              { name: 'email', label: 'Email Address', type: 'email', placeholder: 'john@example.com' },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm text-slate-400 mb-1.5">{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  required
                  placeholder={field.placeholder}
                  className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-primary/60 transition-colors text-sm"
                />
              </div>
            ))}

            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Tell me about your project or opportunity..."
                className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-primary/60 transition-colors text-sm resize-none"
              />
            </div>

            <motion.button
              type="submit"
              disabled={sending || sent}
              whileHover={{ scale: 1.02, boxShadow: '0 0 25px #7c3aed66' }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all disabled:opacity-70"
              style={{
                background: sent
                  ? 'linear-gradient(135deg, #10b981, #059669)'
                  : 'linear-gradient(135deg, #7c3aed, #06b6d4)',
              }}
            >
              {sent ? (
                <>
                  <FiCheck /> Message Sent!
                </>
              ) : sending ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  <FiSend /> Send Message
                </>
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
