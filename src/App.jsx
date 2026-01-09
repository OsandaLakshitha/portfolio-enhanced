import { useState, useEffect, useLayoutEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Terminal from './components/Terminal'
import MatrixRain from './components/MatrixRain'
import TypingGame from './components/TypingGame'
import Skills from './components/Skills'
import Projects from './components/Projects'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import EasterEggs from './components/EasterEggs' // Add this import

function App() {
  const [loading, setLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)

  // Force scroll to top on initial load
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Disable scroll during loading
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden'
      document.body.style.height = '100vh'
      window.scrollTo(0, 0)
    } else {
      document.body.style.overflow = ''
      document.body.style.height = ''
    }

    return () => {
      document.body.style.overflow = ''
      document.body.style.height = ''
    }
  }, [loading])

  // Disable browser scroll restoration
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)
    
    return () => {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'auto'
      }
    }
  }, [])

  // Loading progress simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setLoading(false)
            window.scrollTo(0, 0)
          }, 500)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {/* Easter Eggs - Always Active */}
      <EasterEggs />

      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] bg-cyber-black flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center"
            >
              <div className="font-mono text-neon-green text-2xl mb-8">
                <span className="text-neon-purple">&lt;</span>
                OSANDA
                <span className="text-neon-purple">/&gt;</span>
              </div>
              
              <div className="w-64 h-2 bg-cyber-gray rounded-full overflow-hidden mb-4">
                <motion.div
                  className="h-full bg-gradient-to-r from-neon-green via-neon-blue to-neon-purple"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(loadingProgress, 100)}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              
              <div className="font-mono text-sm text-gray-400">
                {loadingProgress < 30 && "Initializing system..."}
                {loadingProgress >= 30 && loadingProgress < 60 && "Loading modules..."}
                {loadingProgress >= 60 && loadingProgress < 90 && "Compiling awesomeness..."}
                {loadingProgress >= 90 && "Ready!"}
              </div>
              
              <div className="font-mono text-xs text-gray-500 mt-2">
                {Math.min(Math.round(loadingProgress), 100)}%
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        className="relative min-h-screen bg-cyber-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <MatrixRain />
        <Navbar />
        <main>
          <Hero />
          <Terminal />
          <About />
          <Skills />
          <TypingGame />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </motion.div>
    </>
  )
}

export default App