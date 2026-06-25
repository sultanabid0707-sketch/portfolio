import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="py-10 border-t border-white/5 relative">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-mono text-sm text-slate-500">
          <span className="text-white">&lt;</span>
          <span className="text-primary">Sultan</span>
          <span className="text-white"> /&gt;</span>
          <span className="ml-3">© 2024 All rights reserved</span>
        </div>

        <div className="flex items-center gap-1 text-sm text-slate-500">
          Built with
          <FiHeart className="text-accent mx-1" />
          using React, Three.js & Framer Motion
        </div>

        <div className="flex items-center gap-4">
          {[
            { icon: FiGithub, href: 'https://github.com/SultanAbid07' },
            { icon: FiLinkedin, href: 'https://linkedin.com/in/sultan-mohyuddin' },
            { icon: FiMail, href: 'mailto:sultanabid0707@gmail.com' },
          ].map(({ icon: Icon, href }, i) => (
            <motion.a
              key={i}
              href={href}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.2, color: '#7c3aed' }}
              className="text-slate-500 hover:text-primary transition-colors"
            >
              <Icon size={16} />
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  )
}
