import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Code snippets for typing practice
const codeSnippets = {
  easy: [
    'const hello = "world";',
    'let count = 0;',
    'return true;',
    'console.log(data);',
    'if (x > 0) { }',
    'const arr = [];',
    'function init() {}',
    'export default App;',
    'import React from "react";',
  ],
  medium: [
    'const sum = (a, b) => a + b;',
    'const users = await fetchUsers();',
    'export default function App() {}',
    'const [state, setState] = useState(0);',
    'return items.map(item => item.id);',
    'const data = JSON.parse(response);',
    'useEffect(() => { fetchData(); }, []);',
    'const handleClick = (e) => e.preventDefault();',
  ],
  hard: [
    'const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);',
    'const handleSubmit = async (e) => { e.preventDefault(); await saveData(); };',
    'export const getServerSideProps = async (context) => { return { props: {} }; };',
    'const reducer = (state, action) => { switch(action.type) { default: return state; } };',
  ],
  expert: [
    'const debounce = <T extends (...args: any[]) => any>(fn: T, delay: number): ((...args: Parameters<T>) => void) => { let timeoutId: ReturnType<typeof setTimeout>; return (...args) => { clearTimeout(timeoutId); timeoutId = setTimeout(() => fn(...args), delay); }; };',
  ],
}

// Get random snippet based on difficulty
const getRandomSnippet = (difficulty) => {
  const snippets = codeSnippets[difficulty]
  return snippets[Math.floor(Math.random() * snippets.length)]
}

// Character component for individual letter display
const Character = ({ char, status, isCursor }) => {
  const statusClasses = {
    pending: 'text-gray-500',
    correct: 'text-neon-green',
    incorrect: 'text-red-500 bg-red-500/20 rounded',
    current: 'text-white',
  }

  return (
    <span
      className={`relative font-mono text-xl sm:text-2xl transition-colors duration-75 ${statusClasses[status]}`}
    >
      {char === ' ' ? '\u00A0' : char}
      {isCursor && (
        <motion.span
          className="absolute -bottom-1 left-0 w-full h-0.5 bg-neon-green"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.53, repeat: Infinity }}
        />
      )}
    </span>
  )
}

// Stats display component
const StatBox = ({ label, value, unit = '', icon, color = 'neon-green' }) => {
  const colorClasses = {
    'neon-green': 'border-neon-green/30 text-neon-green',
    'neon-blue': 'border-neon-blue/30 text-neon-blue',
    'neon-purple': 'border-neon-purple/30 text-neon-purple',
    'neon-orange': 'border-neon-orange/30 text-neon-orange',
  }

  return (
    <div className={`p-4 rounded-xl glass border ${colorClasses[color]}`}>
      <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
        <span>{icon}</span>
        <span>{label}</span>
      </div>
      <div className={`font-display text-2xl font-bold ${colorClasses[color].split(' ')[1]}`}>
        {value}
        <span className="text-sm ml-1 text-gray-500">{unit}</span>
      </div>
    </div>
  )
}

// High Score Card Component
const HighScoreCard = ({ level, scores, isActive }) => {
  const levelColors = {
    easy: 'neon-green',
    medium: 'neon-blue',
    hard: 'neon-purple',
    expert: 'neon-orange',
  }
  
  const color = levelColors[level]
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`p-4 rounded-xl glass border transition-all duration-300 ${
        isActive
          ? `border-${color}/50 shadow-[0_0_15px_rgba(0,255,136,0.2)]`
          : 'border-white/10'
      }`}
    >
      <div className="font-mono text-xs text-gray-500 mb-1 uppercase flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full bg-${color}`} />
        {level}
      </div>
      <div className="font-display text-xl font-bold text-white">
        {scores.wpm > 0 ? (
          <>
            {scores.wpm} <span className="text-sm text-gray-400">WPM</span>
          </>
        ) : (
          <span className="text-gray-600">--</span>
        )}
      </div>
      {scores.wpm > 0 && (
        <div className={`text-xs text-${color} mt-1`}>
          {scores.accuracy}% accuracy
        </div>
      )}
    </motion.div>
  )
}

const TypingGame = () => {
  const [difficulty, setDifficulty] = useState('medium')
  const [snippet, setSnippet] = useState('')
  const [userInput, setUserInput] = useState('')
  const [isActive, setIsActive] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)
  const [errors, setErrors] = useState(0)
  const [totalKeystrokes, setTotalKeystrokes] = useState(0)
  const [finalStats, setFinalStats] = useState({ wpm: 0, accuracy: 0 })
  const [highScores, setHighScores] = useState(() => {
    // Try to load from localStorage
    const saved = localStorage.getItem('typingGameHighScores')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {
        return {
          easy: { wpm: 0, accuracy: 0 },
          medium: { wpm: 0, accuracy: 0 },
          hard: { wpm: 0, accuracy: 0 },
          expert: { wpm: 0, accuracy: 0 },
        }
      }
    }
    return {
      easy: { wpm: 0, accuracy: 0 },
      medium: { wpm: 0, accuracy: 0 },
      hard: { wpm: 0, accuracy: 0 },
      expert: { wpm: 0, accuracy: 0 },
    }
  })
  
  const inputRef = useRef(null)
  const containerRef = useRef(null)

  // Save high scores to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('typingGameHighScores', JSON.stringify(highScores))
  }, [highScores])

  // Initialize game
  const initGame = useCallback(() => {
    const newSnippet = getRandomSnippet(difficulty)
    setSnippet(newSnippet)
    setUserInput('')
    setIsActive(false)
    setIsComplete(false)
    setStartTime(null)
    setEndTime(null)
    setErrors(0)
    setTotalKeystrokes(0)
    setFinalStats({ wpm: 0, accuracy: 0 })
    
    // Focus input after a short delay
    setTimeout(() => {
      inputRef.current?.focus()
    }, 100)
  }, [difficulty])

  // Initialize on mount and difficulty change
  useEffect(() => {
    initGame()
  }, [initGame])

  // Live timer update
  const [displayTime, setDisplayTime] = useState(0)
  
  useEffect(() => {
    let interval
    if (isActive && !isComplete && startTime) {
      interval = setInterval(() => {
        setDisplayTime(Math.floor((Date.now() - startTime) / 1000))
      }, 100)
    }
    return () => clearInterval(interval)
  }, [isActive, isComplete, startTime])

  // Live WPM calculation
  const liveWPM = useCallback(() => {
    if (!startTime || !isActive || isComplete) return 0
    const timeInMinutes = (Date.now() - startTime) / 60000
    if (timeInMinutes < 0.01) return 0
    const wordsTyped = userInput.length / 5
    return Math.round(wordsTyped / timeInMinutes)
  }, [startTime, isActive, isComplete, userInput.length])

  const [currentWPM, setCurrentWPM] = useState(0)
  
  useEffect(() => {
    if (isActive && !isComplete) {
      const interval = setInterval(() => {
        setCurrentWPM(liveWPM())
      }, 500)
      return () => clearInterval(interval)
    }
  }, [isActive, isComplete, liveWPM])

  // Handle input
  const handleInput = useCallback((e) => {
    const value = e.target.value
    
    // Start timer on first keystroke
    if (!isActive && value.length > 0) {
      setIsActive(true)
      setStartTime(Date.now())
    }

    // Track keystrokes
    if (value.length > userInput.length) {
      setTotalKeystrokes(prev => prev + 1)
      
      // Check if the new character is correct
      const newCharIndex = value.length - 1
      if (value[newCharIndex] !== snippet[newCharIndex]) {
        setErrors(prev => prev + 1)
      }
    }

    setUserInput(value)

    // Check completion
    if (value === snippet) {
      const completionTime = Date.now()
      const timeInMinutes = (completionTime - startTime) / 60000
      const wordsTyped = snippet.length / 5
      const wpm = Math.round(wordsTyped / timeInMinutes)
      const accuracy = Math.round(((totalKeystrokes + 1 - errors) / (totalKeystrokes + 1)) * 100)
      
      setIsComplete(true)
      setEndTime(completionTime)
      setFinalStats({ wpm, accuracy })
      
      // Update high scores if this is a new record
      setHighScores(prev => {
        if (wpm > prev[difficulty].wpm) {
          const newScores = {
            ...prev,
            [difficulty]: { wpm, accuracy }
          }
          return newScores
        }
        return prev
      })
    }
  }, [isActive, userInput, snippet, difficulty, startTime, totalKeystrokes, errors])

  // Get character status
  const getCharStatus = (index) => {
    if (index >= userInput.length) return 'pending'
    if (index === userInput.length) return 'current'
    if (userInput[index] === snippet[index]) return 'correct'
    return 'incorrect'
  }

  // Calculate current accuracy for live display
  const currentAccuracy = totalKeystrokes > 0 
    ? Math.round(((totalKeystrokes - errors) / totalKeystrokes) * 100)
    : 100

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        initGame()
      }
      if (e.key === 'Tab' && !e.shiftKey) {
        e.preventDefault()
        initGame()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [initGame])

  // Focus input when clicking container
  const focusInput = () => {
    inputRef.current?.focus()
  }

  // Clear all high scores
  const clearHighScores = () => {
    const emptyScores = {
      easy: { wpm: 0, accuracy: 0 },
      medium: { wpm: 0, accuracy: 0 },
      hard: { wpm: 0, accuracy: 0 },
      expert: { wpm: 0, accuracy: 0 },
    }
    setHighScores(emptyScores)
    localStorage.removeItem('typingGameHighScores')
  }

  // Get performance message
  const getPerformanceMessage = (wpm) => {
    if (wpm >= 100) return { emoji: '🏆', text: 'Legendary!', color: 'text-yellow-400' }
    if (wpm >= 80) return { emoji: '🚀', text: 'Incredible!', color: 'text-neon-green' }
    if (wpm >= 60) return { emoji: '⚡', text: 'Great Job!', color: 'text-neon-blue' }
    if (wpm >= 40) return { emoji: '👍', text: 'Nice!', color: 'text-neon-purple' }
    return { emoji: '💪', text: 'Keep Practicing!', color: 'text-gray-400' }
  }

  return (
    <section id="typing-game" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1 mb-4 font-mono text-sm text-neon-purple border border-neon-purple/30 rounded-full"
          >
            {'// INTERACTIVE CHALLENGE'}
          </motion.span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-6">
            <span className="text-white">Typing </span>
            <span 
              style={{
                background: 'linear-gradient(135deg, #00ff88 0%, #00d4ff 50%, #a855f7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Speed Test
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400">
            Test your coding speed! Type the code snippet as fast and accurately as you can.
            <span className="text-neon-green"> Beat your high score!</span>
          </p>
        </motion.div>

        {/* Difficulty Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center gap-2 mb-8"
        >
          {['easy', 'medium', 'hard', 'expert'].map((level) => {
            const hasHighScore = highScores[level].wpm > 0
            return (
              <button
                key={level}
                onClick={() => setDifficulty(level)}
                disabled={isActive && !isComplete}
                className={`relative px-4 py-2 font-mono text-sm rounded-lg transition-all ${
                  difficulty === level
                    ? 'bg-neon-green/20 text-neon-green border border-neon-green/50'
                    : 'text-gray-400 hover:text-white glass border border-white/10 hover:border-white/20'
                } ${isActive && !isComplete ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
                {hasHighScore && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-neon-green rounded-full" />
                )}
              </button>
            )
          })}
        </motion.div>

        {/* Game Container */}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onClick={focusInput}
          className="relative p-6 sm:p-8 rounded-2xl glass border border-neon-purple/30 cursor-text"
        >
          {/* Window Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="ml-4 font-mono text-sm text-gray-400">
                typing_test.js
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className={`text-sm font-mono ${isActive ? 'text-neon-green' : 'text-gray-500'}`}>
                {isActive ? (isComplete ? '✓ Complete' : '● Recording...') : '○ Ready'}
              </span>
            </div>
          </div>

          {/* Code Display */}
          <div className="min-h-[100px] sm:min-h-[120px] mb-6 p-4 rounded-xl bg-cyber-black/50 overflow-x-auto">
            <div className="flex flex-wrap leading-relaxed">
              {snippet.split('').map((char, index) => (
                <Character
                  key={index}
                  char={char}
                  status={getCharStatus(index)}
                  isCursor={index === userInput.length && !isComplete}
                />
              ))}
            </div>
          </div>

          {/* Hidden Input */}
          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={handleInput}
            disabled={isComplete}
            className="absolute opacity-0 pointer-events-none"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
          />

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <StatBox
              label="Time"
              value={isComplete ? Math.floor((endTime - startTime) / 1000) : displayTime}
              unit="s"
              icon="⏱️"
              color="neon-blue"
            />
            <StatBox
              label="WPM"
              value={isComplete ? finalStats.wpm : (isActive ? currentWPM : '--')}
              icon="⚡"
              color="neon-green"
            />
            <StatBox
              label="Accuracy"
              value={isComplete ? finalStats.accuracy : (userInput.length > 0 ? currentAccuracy : '--')}
              unit="%"
              icon="🎯"
              color="neon-purple"
            />
            <StatBox
              label="Errors"
              value={errors}
              icon="❌"
              color="neon-orange"
            />
          </div>

          {/* Progress Bar */}
          <div className="relative h-2 bg-cyber-gray rounded-full overflow-hidden mb-6">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-neon-green via-neon-blue to-neon-purple rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(userInput.length / snippet.length) * 100}%` }}
              transition={{ duration: 0.1 }}
            />
            {/* Progress percentage */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-xs text-white/50">
                {Math.round((userInput.length / snippet.length) * 100)}%
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <kbd className="px-2 py-1 rounded bg-cyber-gray font-mono text-xs">Tab</kbd>
              <span>or</span>
              <kbd className="px-2 py-1 rounded bg-cyber-gray font-mono text-xs">Esc</kbd>
              <span>to restart</span>
            </div>
            
            <motion.button
              onClick={initGame}
              className="flex items-center gap-2 px-6 py-3 font-mono text-sm rounded-lg bg-neon-green/10 border border-neon-green/30 text-neon-green hover:bg-neon-green/20 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              New Snippet
            </motion.button>
          </div>

          {/* Completion Overlay */}
          <AnimatePresence>
            {isComplete && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center bg-cyber-black/90 backdrop-blur-sm rounded-2xl"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="text-center p-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.2 }}
                    className="text-6xl mb-4"
                  >
                    {getPerformanceMessage(finalStats.wpm).emoji}
                  </motion.div>
                  <h3 className={`font-display text-3xl font-bold mb-2 ${getPerformanceMessage(finalStats.wpm).color}`}>
                    {getPerformanceMessage(finalStats.wpm).text}
                  </h3>
                  <p className="text-gray-400 mb-2">
                    You typed at <span className="text-neon-green font-bold">{finalStats.wpm} WPM</span> with{' '}
                    <span className="text-neon-blue font-bold">{finalStats.accuracy}%</span> accuracy
                  </p>
                  
                  {/* New high score indicator */}
                  {finalStats.wpm > 0 && finalStats.wpm >= highScores[difficulty].wpm && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="mb-4"
                    >
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/20 border border-yellow-500/50 text-yellow-400 text-sm font-mono">
                        🏆 New High Score!
                      </span>
                    </motion.div>
                  )}
                  
                  <div className="flex gap-4 justify-center mt-6">
                    <motion.button
                      onClick={initGame}
                      className="px-6 py-3 font-mono font-semibold rounded-lg bg-neon-green text-cyber-black hover:shadow-[0_0_20px_rgba(0,255,136,0.5)] transition-shadow"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Try Again
                    </motion.button>
                    <motion.button
                      onClick={() => {
                        const nextDifficulty = {
                          easy: 'medium',
                          medium: 'hard',
                          hard: 'expert',
                          expert: 'easy',
                        }
                        setDifficulty(nextDifficulty[difficulty])
                      }}
                      className="px-6 py-3 font-mono rounded-lg border border-white/20 text-white hover:border-white/40 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Next Level →
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* High Scores */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-mono text-sm text-gray-500">
              {'// YOUR HIGH SCORES'}
            </h4>
            {Object.values(highScores).some(s => s.wpm > 0) && (
              <button
                onClick={clearHighScores}
                className="font-mono text-xs text-gray-600 hover:text-red-500 transition-colors"
              >
                Clear All
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Object.entries(highScores).map(([level, scores]) => (
              <HighScoreCard
                key={level}
                level={level}
                scores={scores}
                isActive={difficulty === level}
              />
            ))}
          </div>
          
          {/* Total stats */}
          {Object.values(highScores).some(s => s.wpm > 0) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 p-4 rounded-xl glass border border-white/10"
            >
              <div className="flex flex-wrap items-center justify-center gap-6 text-center">
                <div>
                  <div className="font-mono text-xs text-gray-500">Best WPM</div>
                  <div className="font-display text-2xl font-bold text-neon-green">
                    {Math.max(...Object.values(highScores).map(s => s.wpm))}
                  </div>
                </div>
                <div className="hidden sm:block w-px h-8 bg-white/10" />
                <div>
                  <div className="font-mono text-xs text-gray-500">Best Accuracy</div>
                  <div className="font-display text-2xl font-bold text-neon-blue">
                    {Math.max(...Object.values(highScores).filter(s => s.wpm > 0).map(s => s.accuracy))}%
                  </div>
                </div>
                <div className="hidden sm:block w-px h-8 bg-white/10" />
                <div>
                  <div className="font-mono text-xs text-gray-500">Levels Completed</div>
                  <div className="font-display text-2xl font-bold text-neon-purple">
                    {Object.values(highScores).filter(s => s.wpm > 0).length}/4
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Fun Facts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-gray-500 font-mono">
            <span className="text-neon-purple">fun_fact:</span> Professional typists average 
            <span className="text-neon-green"> 65-75 WPM</span>. Competitive typists hit 
            <span className="text-neon-blue"> 150+ WPM</span>! 🏆
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default TypingGame