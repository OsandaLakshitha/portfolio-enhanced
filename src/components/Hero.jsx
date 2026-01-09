import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import useTypewriter from '../hooks/useTypewriter'

// Floating geometric shapes component
const FloatingShapes = () => {
  const shapes = [
    { type: 'circle', size: 60, x: '10%', y: '20%', delay: 0 },
    { type: 'square', size: 40, x: '85%', y: '15%', delay: 0.5 },
    { type: 'triangle', size: 50, x: '75%', y: '70%', delay: 1 },
    { type: 'circle', size: 30, x: '5%', y: '75%', delay: 1.5 },
    { type: 'square', size: 25, x: '90%', y: '50%', delay: 2 },
    { type: 'diamond', size: 35, x: '15%', y: '50%', delay: 0.8 },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{ left: shape.x, top: shape.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            delay: shape.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {shape.type === 'circle' && (
            <div 
              className="rounded-full border border-neon-green/30"
              style={{ width: shape.size, height: shape.size }}
            />
          )}
          {shape.type === 'square' && (
            <div 
              className="border border-neon-blue/30"
              style={{ width: shape.size, height: shape.size }}
            />
          )}
          {shape.type === 'triangle' && (
            <div 
              className="border-l border-b border-neon-purple/30"
              style={{ 
                width: 0, 
                height: 0, 
                borderLeft: `${shape.size / 2}px solid transparent`,
                borderRight: `${shape.size / 2}px solid transparent`,
                borderBottom: `${shape.size}px solid rgba(168, 85, 247, 0.3)`,
              }}
            />
          )}
          {shape.type === 'diamond' && (
            <div 
              className="border border-neon-green/30 rotate-45"
              style={{ width: shape.size, height: shape.size }}
            />
          )}
        </motion.div>
      ))}
    </div>
  )
}

// Social links data
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

const Hero = () => {
  const containerRef = useRef(null)
  const [isGlitching, setIsGlitching] = useState(false)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])
  
  const springY = useSpring(y, { stiffness: 100, damping: 30 })
  const springOpacity = useSpring(opacity, { stiffness: 100, damping: 30 })
  const springScale = useSpring(scale, { stiffness: 100, damping: 30 })

  const { text: roleText, isTyping } = useTypewriter({
    words: [
      'Full Stack Developer',
      'Software Engineer',
      'UI/UX Enthusiast',
      'Problem Solver',
      'Open Source Contributor',
      'Tech Innovator',
    ],
    typeSpeed: 70,
    deleteSpeed: 40,
    delayBetweenWords: 2000,
    loop: true,
  })

  // Glitch effect trigger
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 200)
    }, 4000)

    return () => clearInterval(glitchInterval)
  }, [])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      
      {/* Floating shapes */}
      <FloatingShapes />
      
      {/* Radial gradient overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(2, 6, 23, 0.5) 50%, rgba(2, 6, 23, 1) 100%)'
        }}
      />
      
      {/* Main content */}
      <motion.div
        style={{ y: springY, opacity: springOpacity, scale: springScale }}
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full glass border border-neon-green/20"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-green" />
          </span>
          <span className="font-mono text-sm text-gray-300">
            Available for opportunities
          </span>
        </motion.div>

        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-mono text-neon-green text-lg mb-4"
        >
          <span className="text-gray-500">{'// '}</span>
          Hello, World! I'm
        </motion.p>

        {/* Name - FIXED */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6"
        >
          {/* Main visible text with gradient */}
          <span 
            className="relative inline-block"
            style={{
              background: 'linear-gradient(135deg, #00ff88 0%, #00d4ff 50%, #a855f7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            OSANDA LAKSHITHA
          </span>
          
          {/* Glitch layers */}
          {isGlitching && (
            <>
              <span 
                className="absolute top-0 left-0 w-full font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-neon-blue opacity-70"
                style={{ 
                  clipPath: 'inset(10% 0 60% 0)',
                  transform: 'translate(-3px, -2px)',
                }}
                aria-hidden="true"
              >
                OSANDA LAKSHITHA
              </span>
              <span 
                className="absolute top-0 left-0 w-full font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-neon-pink opacity-70"
                style={{ 
                  clipPath: 'inset(50% 0 20% 0)',
                  transform: 'translate(3px, 2px)',
                }}
                aria-hidden="true"
              >
                OSANDA LAKSHITHA
              </span>
            </>
          )}
        </motion.h1>

        {/* Role with typewriter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center gap-3 text-xl sm:text-2xl md:text-3xl mb-8 min-h-[48px]"
        >
          <span className="text-neon-purple font-mono">{'<'}</span>
          <span className="font-mono text-white">
            {roleText}
            <motion.span
              animate={{ opacity: isTyping ? [1, 0] : 1 }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="inline-block w-[3px] h-6 sm:h-8 bg-neon-green ml-1 align-middle"
            />
          </span>
          <span className="text-neon-purple font-mono">{'/>'}</span>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-2xl mx-auto text-gray-400 text-lg mb-12 leading-relaxed"
        >
          Crafting digital experiences with clean code and creative solutions. 
          Passionate about building scalable applications that make a difference.
          <span className="text-neon-blue"> Let's build something amazing together.</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          {/* Primary CTA */}
          <motion.button
            onClick={() => scrollToSection('projects')}
            className="group relative px-8 py-4 font-mono font-semibold text-cyber-black bg-neon-green rounded-lg overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Animated background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-neon-green via-neon-blue to-neon-green"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
            />
            <span className="relative z-10 flex items-center gap-2">
              <span>View My Work</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </motion.button>

          {/* Secondary CTA */}
          <motion.button
            onClick={() => scrollToSection('contact')}
            className="group relative px-8 py-4 font-mono font-semibold rounded-lg overflow-hidden border border-neon-green/50 hover:border-neon-green transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center gap-2 text-white group-hover:text-neon-green transition-colors">
              <span>Get In Touch</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </span>
          </motion.button>

          {/* Download OsandaLakshithaCV */}
          <motion.a
            href="/OsandaLakshithaCV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 font-mono text-gray-400 hover:text-neon-purple transition-colors flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>OsandaLakshithaCV</span>
          </motion.a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center justify-center gap-4"
        >
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-3 rounded-lg glass border border-white/10 text-gray-400 hover:text-neon-green hover:border-neon-green/50 transition-all duration-300"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              aria-label={social.name}
            >
              {social.icon}
              
              {/* Tooltip */}
              <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs font-mono bg-cyber-gray rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {social.name}
              </span>
            </motion.a>
          ))}
        </motion.div>

        {/* Terminal hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-16 font-mono text-sm text-gray-500"
        >
          <span className="text-neon-green">→</span> Scroll down to explore or try the{' '}
          <button 
            onClick={() => scrollToSection('terminal')}
            className="text-neon-blue hover:underline"
          >
            interactive terminal
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 cursor-pointer"
          onClick={() => scrollToSection('terminal')}
        >
          <span className="font-mono text-xs text-gray-500">scroll</span>
          <div className="w-6 h-10 rounded-full border-2 border-gray-600 flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-neon-green rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Corner decorations */}
      <div className="absolute top-24 left-4 sm:left-8 font-mono text-xs text-gray-600 hidden sm:block">
        <div>{'<html>'}</div>
        <div className="ml-2">{'<body>'}</div>
        <div className="ml-4 text-neon-green/50">{'<hero>'}</div>
      </div>
      
      <div className="absolute bottom-24 right-4 sm:right-8 font-mono text-xs text-gray-600 hidden sm:block text-right">
        <div className="text-neon-green/50">{'</hero>'}</div>
        <div className="mr-2">{'</body>'}</div>
        <div>{'</html>'}</div>
      </div>
    </section>
  )
}

export default Hero