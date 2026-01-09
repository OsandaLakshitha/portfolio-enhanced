import { useState, useEffect, useCallback, useRef } from 'react'

/**
 * Custom hook for typewriter effect
 * @param {Object} options - Configuration options
 * @param {string[]} options.words - Array of words/phrases to type
 * @param {number} options.typeSpeed - Typing speed in ms (default: 80)
 * @param {number} options.deleteSpeed - Deleting speed in ms (default: 50)
 * @param {number} options.delayBetweenWords - Pause after typing complete word (default: 2000)
 * @param {number} options.delayBeforeDelete - Pause before starting to delete (default: 1500)
 * @param {boolean} options.loop - Whether to loop through words (default: true)
 * @param {boolean} options.cursor - Whether to show cursor (default: true)
 * @param {Function} options.onWordComplete - Callback when a word is fully typed
 * @param {Function} options.onComplete - Callback when all words are typed (if not looping)
 */
const useTypewriter = ({
  words = ['Hello World'],
  typeSpeed = 80,
  deleteSpeed = 50,
  delayBetweenWords = 2000,
  delayBeforeDelete = 1500,
  loop = true,
  onWordComplete,
  onComplete,
} = {}) => {
  const [text, setText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)
  const [wordIndex, setWordIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  
  const timeoutRef = useRef(null)
  const currentWord = words[wordIndex]
  
  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])
  
  // Main typing logic
  useEffect(() => {
    if (isComplete || isPaused) return
    
    const handleTyping = () => {
      if (!isDeleting) {
        // Typing phase
        if (text.length < currentWord.length) {
          // Add randomness to typing speed for more natural feel
          const randomSpeed = typeSpeed + Math.random() * 50
          timeoutRef.current = setTimeout(() => {
            setText(currentWord.slice(0, text.length + 1))
          }, randomSpeed)
        } else {
          // Word complete
          setIsTyping(false)
          if (onWordComplete) onWordComplete(wordIndex)
          
          // Wait before deleting
          timeoutRef.current = setTimeout(() => {
            if (loop || wordIndex < words.length - 1) {
              setIsDeleting(true)
            } else {
              setIsComplete(true)
              if (onComplete) onComplete()
            }
          }, delayBeforeDelete)
        }
      } else {
        // Deleting phase
        if (text.length > 0) {
          const randomSpeed = deleteSpeed + Math.random() * 30
          timeoutRef.current = setTimeout(() => {
            setText(text.slice(0, -1))
          }, randomSpeed)
        } else {
          // Deletion complete
          setIsDeleting(false)
          setIsTyping(true)
          
          // Move to next word
          timeoutRef.current = setTimeout(() => {
            setWordIndex((prev) => {
              if (prev >= words.length - 1) {
                return loop ? 0 : prev
              }
              return prev + 1
            })
          }, delayBetweenWords - delayBeforeDelete)
        }
      }
    }
    
    handleTyping()
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [
    text,
    isDeleting,
    wordIndex,
    currentWord,
    typeSpeed,
    deleteSpeed,
    delayBetweenWords,
    delayBeforeDelete,
    loop,
    isComplete,
    isPaused,
    words.length,
    onWordComplete,
    onComplete,
  ])
  
  // Pause/OsandaLakshithaCV functionality
  const pause = useCallback(() => {
    setIsPaused(true)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }, [])
  
  const OsandaLakshithaCV = useCallback(() => {
    setIsPaused(false)
  }, [])
  
  // Reset functionality
  const reset = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setText('')
    setWordIndex(0)
    setIsTyping(true)
    setIsDeleting(false)
    setIsComplete(false)
    setIsPaused(false)
  }, [])
  
  // Skip to specific word
  const skipTo = useCallback((index) => {
    if (index >= 0 && index < words.length) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      setText('')
      setWordIndex(index)
      setIsDeleting(false)
      setIsTyping(true)
    }
  }, [words.length])
  
  return {
    text,
    isTyping,
    isDeleting,
    isComplete,
    isPaused,
    wordIndex,
    currentWord,
    pause,
    OsandaLakshithaCV,
    reset,
    skipTo,
  }
}

export default useTypewriter