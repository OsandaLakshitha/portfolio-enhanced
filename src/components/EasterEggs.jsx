import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Snake Game Component
const SnakeGame = ({ onClose }) => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }])
  const [food, setFood] = useState({ x: 15, y: 15 })
  const [direction, setDirection] = useState({ x: 1, y: 0 })
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const gridSize = 20
  const cellSize = 20

  const generateFood = useCallback(() => {
    return {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize),
    }
  }, [])

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }])
    setFood(generateFood())
    setDirection({ x: 1, y: 0 })
    setGameOver(false)
    setScore(0)
    setIsPaused(false)
  }

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameOver) return
      
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
          if (direction.y !== 1) setDirection({ x: 0, y: -1 })
          break
        case 'ArrowDown':
        case 's':
          if (direction.y !== -1) setDirection({ x: 0, y: 1 })
          break
        case 'ArrowLeft':
        case 'a':
          if (direction.x !== 1) setDirection({ x: -1, y: 0 })
          break
        case 'ArrowRight':
        case 'd':
          if (direction.x !== -1) setDirection({ x: 1, y: 0 })
          break
        case ' ':
          setIsPaused(p => !p)
          break
        case 'Escape':
          onClose()
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [direction, gameOver, onClose])

  useEffect(() => {
    if (gameOver || isPaused) return

    const moveSnake = () => {
      setSnake((prevSnake) => {
        const newHead = {
          x: (prevSnake[0].x + direction.x + gridSize) % gridSize,
          y: (prevSnake[0].y + direction.y + gridSize) % gridSize,
        }

        // Check collision with self
        if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
          setGameOver(true)
          return prevSnake
        }

        const newSnake = [newHead, ...prevSnake]

        // Check if eating food
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore(s => s + 10)
          setFood(generateFood())
        } else {
          newSnake.pop()
        }

        return newSnake
      })
    }

    const interval = setInterval(moveSnake, 100)
    return () => clearInterval(interval)
  }, [direction, food, gameOver, isPaused, generateFood])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-cyber-black/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="relative p-6 rounded-2xl glass border border-neon-green/50"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-xl font-bold text-neon-green">
            🐍 Snake Game
          </h3>
          <div className="flex items-center gap-4">
            <span className="font-mono text-sm text-gray-400">
              Score: <span className="text-neon-green">{score}</span>
            </span>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Game Board */}
        <div 
          className="relative border-2 border-neon-green/50 rounded-lg overflow-hidden"
          style={{ 
            width: gridSize * cellSize, 
            height: gridSize * cellSize,
            background: 'rgba(0, 0, 0, 0.5)'
          }}
        >
          {/* Grid lines */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(0, 255, 136, 0.3) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0, 255, 136, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: `${cellSize}px ${cellSize}px`
            }}
          />

          {/* Snake */}
          {snake.map((segment, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={`absolute rounded-sm ${index === 0 ? 'bg-neon-green shadow-[0_0_10px_#00ff88]' : 'bg-neon-green/70'}`}
              style={{
                left: segment.x * cellSize,
                top: segment.y * cellSize,
                width: cellSize - 2,
                height: cellSize - 2,
              }}
            />
          ))}

          {/* Food */}
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 0.5 }}
            className="absolute bg-neon-purple rounded-full shadow-[0_0_10px_#a855f7]"
            style={{
              left: food.x * cellSize,
              top: food.y * cellSize,
              width: cellSize - 2,
              height: cellSize - 2,
            }}
          />

          {/* Game Over Overlay */}
          {gameOver && (
            <div className="absolute inset-0 flex items-center justify-center bg-cyber-black/80">
              <div className="text-center">
                <h4 className="font-display text-2xl font-bold text-red-500 mb-2">Game Over!</h4>
                <p className="font-mono text-gray-400 mb-4">Score: {score}</p>
                <button
                  onClick={resetGame}
                  className="px-6 py-2 font-mono text-sm rounded-lg bg-neon-green text-cyber-black hover:shadow-[0_0_20px_rgba(0,255,136,0.5)] transition-shadow"
                >
                  Play Again
                </button>
              </div>
            </div>
          )}

          {/* Paused Overlay */}
          {isPaused && !gameOver && (
            <div className="absolute inset-0 flex items-center justify-center bg-cyber-black/80">
              <div className="text-center">
                <h4 className="font-display text-xl font-bold text-neon-blue mb-2">Paused</h4>
                <p className="font-mono text-sm text-gray-400">Press SPACE to continue</p>
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="mt-4 text-center">
          <p className="font-mono text-xs text-gray-500">
            Use <span className="text-neon-green">WASD</span> or <span className="text-neon-green">Arrow Keys</span> to move | 
            <span className="text-neon-blue"> SPACE</span> to pause | 
            <span className="text-neon-purple"> ESC</span> to close
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Matrix Effect Easter Egg
const MatrixEasterEgg = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-cyber-black"
      onClick={onClose}
    >
      <div className="text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl font-bold text-neon-green mb-4"
        >
          Wake up, Neo...
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="font-mono text-gray-400"
        >
          The Matrix has you...
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="font-mono text-neon-green mt-4"
        >
          Click anywhere to close
        </motion.p>
      </div>
    </motion.div>
  )
}

// Main Easter Eggs Component
const EasterEggs = () => {
  const [activeEasterEgg, setActiveEasterEgg] = useState(null)
  const [konamiProgress, setKonamiProgress] = useState(0)

  // Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
  const konamiCode = [
    'ArrowUp', 'ArrowUp', 
    'ArrowDown', 'ArrowDown', 
    'ArrowLeft', 'ArrowRight', 
    'ArrowLeft', 'ArrowRight', 
    'b', 'a'
  ]

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key

      if (key === konamiCode[konamiProgress]) {
        const newProgress = konamiProgress + 1
        setKonamiProgress(newProgress)
        
        if (newProgress === konamiCode.length) {
          setActiveEasterEgg('snake')
          setKonamiProgress(0)
        }
      } else if (key === konamiCode[0]) {
        setKonamiProgress(1)
      } else {
        setKonamiProgress(0)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [konamiProgress])

  // Listen for matrix easter egg (type "matrix" anywhere)
  useEffect(() => {
    let buffer = ''
    const handleKeyPress = (e) => {
      buffer += e.key.toLowerCase()
      buffer = buffer.slice(-6) // Keep last 6 characters
      
      if (buffer === 'matrix') {
        setActiveEasterEgg('matrix')
        buffer = ''
      }
    }

    window.addEventListener('keypress', handleKeyPress)
    return () => window.removeEventListener('keypress', handleKeyPress)
  }, [])

  return (
    <AnimatePresence>
      {activeEasterEgg === 'snake' && (
        <SnakeGame onClose={() => setActiveEasterEgg(null)} />
      )}
      {activeEasterEgg === 'matrix' && (
        <MatrixEasterEgg onClose={() => setActiveEasterEgg(null)} />
      )}
    </AnimatePresence>
  )
}

export default EasterEggs