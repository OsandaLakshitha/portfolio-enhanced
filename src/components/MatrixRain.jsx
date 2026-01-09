import { useEffect, useRef, useCallback } from 'react'

const MatrixRain = () => {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const dropsRef = useRef([])
  
  // Matrix characters - mix of katakana, numbers, and symbols
  const characters = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%^&*(){}[]|;:<>?'
  
  const initializeDrops = useCallback((columnCount) => {
    const drops = []
    for (let i = 0; i < columnCount; i++) {
      drops[i] = {
        y: Math.random() * -100, // Start above screen at random positions
        speed: Math.random() * 0.5 + 0.5, // Random speed between 0.5 and 1
        opacity: Math.random() * 0.5 + 0.5, // Random opacity
        length: Math.floor(Math.random() * 15) + 10, // Trail length
      }
    }
    return drops
  }, [])
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      
      const fontSize = 14
      const columnCount = Math.ceil(canvas.width / fontSize)
      dropsRef.current = initializeDrops(columnCount)
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    
    const fontSize = 14
    const columnCount = Math.ceil(canvas.width / fontSize)
    
    // Initialize drops if not already done
    if (dropsRef.current.length === 0) {
      dropsRef.current = initializeDrops(columnCount)
    }
    
    const draw = () => {
      // Create fade effect - semi-transparent black rectangle
      ctx.fillStyle = 'rgba(2, 6, 23, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Set font
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`
      
      for (let i = 0; i < dropsRef.current.length; i++) {
        const drop = dropsRef.current[i]
        
        // Pick a random character
        const char = characters[Math.floor(Math.random() * characters.length)]
        
        // Calculate x position
        const x = i * fontSize
        const y = drop.y * fontSize
        
        // Draw the leading character (brightest)
        ctx.fillStyle = `rgba(0, 255, 136, ${drop.opacity})`
        ctx.shadowColor = '#00ff88'
        ctx.shadowBlur = 10
        ctx.fillText(char, x, y)
        
        // Draw trailing characters with diminishing opacity
        ctx.shadowBlur = 0
        for (let j = 1; j < drop.length; j++) {
          const trailChar = characters[Math.floor(Math.random() * characters.length)]
          const trailOpacity = drop.opacity * (1 - j / drop.length) * 0.5
          
          // Alternate between green and blue for some variation
          if (j % 3 === 0) {
            ctx.fillStyle = `rgba(0, 212, 255, ${trailOpacity})`
          } else {
            ctx.fillStyle = `rgba(0, 255, 136, ${trailOpacity})`
          }
          
          ctx.fillText(trailChar, x, y - j * fontSize)
        }
        
        // Move drop down
        drop.y += drop.speed
        
        // Reset drop when it goes off screen
        if (drop.y * fontSize > canvas.height + drop.length * fontSize) {
          drop.y = Math.random() * -20
          drop.speed = Math.random() * 0.5 + 0.5
          drop.opacity = Math.random() * 0.5 + 0.5
        }
      }
      
      animationRef.current = requestAnimationFrame(draw)
    }
    
    draw()
    
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [initializeDrops, characters])
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ 
        opacity: 0.15,
        mixBlendMode: 'screen',
      }}
      aria-hidden="true"
    />
  )
}

export default MatrixRain