import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// Quick links
const quickLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
]

// Social links
const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/osandalakshitha',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/osandalakshitha',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/osandalakshitha',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    name: 'Email',
    url: 'mailto:osandalakshitha01@gmail.com',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
]

// Status messages that cycle
const statusMessages = [
  'Ready to code',
  'Building the future',
  'Coffee level: optimal',
  'Debugging life',
  'Pushing to production',
  'npm run dev',
  'git commit -m "fixed"',
  'sudo make coffee',
]

const Footer = () => {
  const [currentStatus, setCurrentStatus] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const currentYear = new Date().getFullYear()

  // Cycle through status messages
  useEffect(() => {
    if (isHovered) return
    const interval = setInterval(() => {
      setCurrentStatus((prev) => (prev + 1) % statusMessages.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [isHovered])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToSection = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="relative border-t border-white/10">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyber-black via-cyber-dark to-transparent opacity-50" />
      
      {/* Decorative grid */}
      <div className="absolute inset-0 bg-grid opacity-10" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <motion.a
              href="#hero"
              onClick={(e) => {
                e.preventDefault()
                scrollToTop()
              }}
              className="inline-flex items-center gap-2 font-mono text-xl font-bold group"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-neon-purple group-hover:text-neon-green transition-colors">
                &lt;
              </span>
              <span className="text-neon-green group-hover:text-glow-green transition-all">
                OSANDA
              </span>
              <span className="text-neon-purple group-hover:text-neon-green transition-colors">
                /&gt;
              </span>
            </motion.a>
            
            <p className="text-gray-400 max-w-sm">
              Building digital experiences with passion and precision. 
              Let's create something amazing together.
            </p>

            {/* Terminal-style status */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyber-black/50 border border-neon-green/20 font-mono text-sm cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <span className="flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-neon-green opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-green" />
              </span>
              <motion.span
                key={currentStatus}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-gray-400"
              >
                {statusMessages[currentStatus]}
              </motion.span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-mono text-sm text-neon-green mb-4">
              {'// NAVIGATION'}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection(link.href)
                    }}
                    className="text-gray-400 hover:text-neon-green transition-colors font-mono text-sm inline-flex items-center gap-2 group"
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-neon-purple opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-mono text-sm text-neon-blue mb-4">
              {'// CONNECT'}
            </h3>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg glass border border-white/10 text-gray-400 hover:text-neon-green hover:border-neon-green/30 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>

            {/* Email CTA */}
            <div className="mt-6">
              <a
                href="mailto:osandalakshitha01@gmail.com"
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-neon-green transition-colors font-mono"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                osandalakshitha01@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Bottom Bar */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="font-mono text-sm text-gray-500">
            <span className="text-neon-purple">©</span> {currentYear}{' '}
            <span className="text-gray-400">Osanda Lakshitha</span>
            <span className="text-neon-green">.</span> All rights reserved
            <span className="text-neon-green">;</span>
          </div>

          {/* Built with */}
          <div className="flex items-center gap-4 text-sm text-gray-500 font-mono">
            <span>Built with</span>
            <div className="flex items-center gap-2">
              <motion.span
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="text-neon-blue"
                title="React"
              >
                ⚛️
              </motion.span>
              <motion.span
                whileHover={{ scale: 1.2 }}
                className="text-neon-purple"
                title="Vite"
              >
                ⚡
              </motion.span>
              <motion.span
                whileHover={{ scale: 1.2 }}
                className="text-neon-green"
                title="Tailwind CSS"
              >
                🎨
              </motion.span>
            </div>
            <span>&</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-red-500"
            >
              ❤️
            </motion.span>
          </div>

          {/* Back to top */}
          <motion.button
            onClick={scrollToTop}
            className="p-2 rounded-lg glass border border-white/10 text-gray-400 hover:text-neon-green hover:border-neon-green/30 transition-all duration-300"
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Back to top"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </motion.button>
        </div>

        {/* Easter Egg - Konami Code Hint */}
        <div className="pb-4 text-center">
          <p className="font-mono text-xs text-gray-600">
            <span className="text-neon-purple">{'/* '}</span>
            ↑ ↑ ↓ ↓ ← → ← → B A
            <span className="text-neon-purple">{' */'}</span>
          </p>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-neon-green via-neon-blue to-neon-purple" />
    </footer>
  )
}

export default Footer