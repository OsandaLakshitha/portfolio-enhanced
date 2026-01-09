import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { id: 'hero', label: 'Home', icon: '⌂' },
  { id: 'about', label: 'About', icon: '◈' },
  { id: 'skills', label: 'Skills', icon: '⚡' },
  { id: 'projects', label: 'Projects', icon: '◧' },
  { id: 'contact', label: 'Contact', icon: '✉' },
]

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('hero')
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [hoverIndex, setHoverIndex] = useState(null)

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Intersection Observer for active section detection
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    }

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    navLinks.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = useCallback((id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'glass py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="#hero"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('hero')
              }}
              className="group flex items-center gap-2 font-mono text-xl font-bold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-neon-purple group-hover:text-neon-green transition-colors duration-300">
                &lt;
              </span>
              <span className="text-neon-green group-hover:text-glow-green transition-all duration-300">
                OSANDA
              </span>
              <span className="text-neon-purple group-hover:text-neon-green transition-colors duration-300">
                /&gt;
              </span>
              
              {/* Animated cursor */}
              <motion.span
                className="w-2 h-5 bg-neon-green ml-1"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                  className={`relative px-4 py-2 font-mono text-sm transition-all duration-300 rounded-lg ${
                    activeSection === link.id
                      ? 'text-neon-green'
                      : 'text-gray-400 hover:text-white'
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  {/* Active indicator background */}
                  {activeSection === link.id && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute inset-0 bg-neon-green/10 rounded-lg border border-neon-green/30"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  
                  {/* Hover glow effect */}
                  {hoverIndex === index && activeSection !== link.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-white/5 rounded-lg"
                    />
                  )}
                  
                  <span className="relative z-10 flex items-center gap-2">
                    <span className="text-xs opacity-60">{link.icon}</span>
                    {link.label}
                  </span>
                  
                  {/* Active dot indicator */}
                  {activeSection === link.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-neon-green rounded-full shadow-[0_0_10px_#00ff88]"
                    />
                  )}
                </motion.button>
              ))}
              
              {/* CTA Button */}
              <motion.a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('contact')
                }}
                className="ml-4 relative group px-5 py-2 font-mono text-sm font-semibold text-cyber-black bg-neon-green rounded-lg overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Animated shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
                <span className="relative z-10">Hire Me</span>
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              <motion.span
                className="w-6 h-0.5 bg-neon-green rounded-full"
                animate={mobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="w-6 h-0.5 bg-neon-green rounded-full"
                animate={mobileMenuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="w-6 h-0.5 bg-neon-green rounded-full"
                animate={mobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              />
            </motion.button>
          </div>
        </div>

        {/* Scrolled border effect */}
        {scrolled && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-green/50 to-transparent"
          />
        )}
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-cyber-black/80 backdrop-blur-sm md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 glass md:hidden"
            >
              {/* Close button */}
              <div className="flex justify-end p-4">
                <motion.button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-gray-400 hover:text-neon-green transition-colors"
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close menu"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>
              
              {/* Navigation Links */}
              <nav className="px-4 py-8">
                <ul className="space-y-2">
                  {navLinks.map((link, index) => (
                    <motion.li
                      key={link.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <button
                        onClick={() => scrollToSection(link.id)}
                        className={`w-full flex items-center gap-4 px-4 py-3 font-mono text-left rounded-lg transition-all duration-300 ${
                          activeSection === link.id
                            ? 'bg-neon-green/10 text-neon-green border-l-2 border-neon-green'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <span className="text-lg">{link.icon}</span>
                        <span>{link.label}</span>
                        
                        {activeSection === link.id && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="ml-auto w-2 h-2 bg-neon-green rounded-full shadow-[0_0_10px_#00ff88]"
                          />
                        )}
                      </button>
                    </motion.li>
                  ))}
                </ul>
                
                {/* Mobile CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8 px-4"
                >
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="w-full py-3 font-mono font-semibold text-cyber-black bg-neon-green rounded-lg hover:shadow-[0_0_20px_rgba(0,255,136,0.5)] transition-shadow"
                  >
                    Hire Me
                  </button>
                </motion.div>
                
                {/* Decorative terminal line */}
                <div className="mt-12 px-4">
                  <div className="font-mono text-xs text-gray-500">
                    <span className="text-neon-green">→</span> system.status: 
                    <span className="text-neon-green ml-2">ONLINE</span>
                  </div>
                  <div className="font-mono text-xs text-gray-500 mt-1">
                    <span className="text-neon-green">→</span> visitor.access: 
                    <span className="text-neon-blue ml-2">GRANTED</span>
                  </div>
                </div>
              </nav>
              
              {/* Bottom gradient border */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-neon-green via-neon-blue to-neon-purple" />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Progress bar at bottom of navbar */}
      <div className="fixed top-[60px] left-0 right-0 z-40 h-0.5 bg-cyber-gray/50">
        <motion.div
          className="h-full bg-gradient-to-r from-neon-green via-neon-blue to-neon-purple"
          style={{
            transformOrigin: 'left',
          }}
          initial={{ scaleX: 0 }}
          animate={{ 
            scaleX: typeof window !== 'undefined' 
              ? Math.min(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight), 1) 
              : 0 
          }}
          transition={{ duration: 0.1 }}
        />
      </div>
    </>
  )
}

export default Navbar