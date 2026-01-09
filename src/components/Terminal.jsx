import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Command definitions with responses based on your CV
const commands = {
  help: {
    description: 'Show available commands',
    response: `
Available commands:
  help          - Show this help message
  about         - Learn about me
  skills        - View my technical skills
  projects      - See my featured projects
  experience    - View my work experience
  education     - Check my education background
  contact       - Get my contact information
  social        - View social media links
  clear         - Clear the terminal
  date          - Show current date/time
  whoami        - Display current user
  sudo hire     - Execute the ultimate command 😎
  theme         - Toggle terminal theme
  neofetch      - Display system info
    `,
  },
  about: {
    description: 'Learn about me',
    response: `
┌─────────────────────────────────────────────────────────────┐
│  ABOUT OSANDA CHAMIKARA                                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  👨‍💻 Full-Stack Developer & QA Engineer                      │
│  📍 Based in Nawalapitiya, Sri Lanka                        │
│  🎓 BSc (Hons) IT Undergraduate at SLIIT                    │
│                                                             │
│  Full-stack software engineering undergraduate with         │
│  hands-on experience building responsive, user-centric      │
│  web and mobile applications.                               │
│                                                             │
│  Proficient in modern JavaScript frameworks (React,         │
│  Node.js) and server-side development with PHP & Laravel.   │
│                                                             │
│  Skilled in RESTful API design, database modeling, and      │
│  agile development workflows. Passionate about writing      │
│  clean, maintainable code.                                  │
│                                                             │
│  🎯 Goal: Contribute to innovative software teams as a      │
│           Web & Software Engineering Intern                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
    `,
  },
  skills: {
    description: 'View my technical skills',
    response: `
┌─ TECHNICAL SKILLS ───────────────────────────────────────────┐
│                                                              │
│  ▸ Frontend Development                                      │
│    React.js             ████████████████████░░ 90%           │
│    HTML/CSS             ████████████████████░░ 95%           │
│    JavaScript           ████████████████████░░ 90%           │
│    Tailwind CSS         ████████████████░░░░░░ 80%           │
│                                                              │
│  ▸ Backend Development                                       │
│    Node.js              ████████████████████░░ 85%           │
│    Express.js           ████████████████░░░░░░ 80%           │
│    PHP / Laravel        ██████████████░░░░░░░░ 70%           │
│                                                              │
│  ▸ Programming Languages                                     │
│    JavaScript           ████████████████████░░ 90%           │
│    Python               ████████████████░░░░░░ 75%           │
│    Java                 ████████████████░░░░░░ 80%           │
│    C / C++              ██████████████░░░░░░░░ 70%           │
│    Kotlin               ████████████░░░░░░░░░░ 60%           │
│                                                              │
│  ▸ Database                                                  │
│    MongoDB              ████████████████████░░ 85%           │
│    MySQL                ████████████████░░░░░░ 80%           │
│    Oracle DB            ██████████████░░░░░░░░ 70%           │
│    SQLite               ██████████████░░░░░░░░ 70%           │
│                                                              │
│  ▸ Testing & Tools                                           │
│    Postman              ████████████████████░░ 90%           │
│    Selenium             ██████████████░░░░░░░░ 70%           │
│    Git/GitHub           ████████████████████░░ 85%           │
│                                                              │
└──────────────────────────────────────────────────────────────┘
    `,
  },
  projects: {
    description: 'See my featured projects',
    response: `
┌─ FEATURED PROJECTS ─────────────────────────────────────────┐
│                                                             │
│  01. NoteGenius Web App (2025)                              │
│      ├─ MERN-based note-taking application                  │
│      ├─ User authentication & note CRUD operations          │
│      ├─ JWT token security & session handling               │
│      └─ Tech: React.js, Express.js, Node.js, MongoDB        │
│                                                             │
│  02. Ceylon Travels - Travel Booking Platform (2024)        │
│      ├─ Full travel booking user journey                    │
│      ├─ Package browsing → booking → confirmation           │
│      ├─ Cross-browser & responsive design                   │
│      └─ Tech: React.js, Express.js, Node.js, MongoDB        │
│                                                             │
│  03. Kanthi AI ChatBot (2023)                               │
│      ├─ AI-powered chatbot using Gemini API                 │
│      ├─ Natural language processing                         │
│      └─ Tech: React.js, Gemini API                          │
│                                                             │
│  04. Online Pharmacy Website (2024)                         │
│      ├─ E-commerce platform for pharmacy                    │
│      ├─ Product search, cart & checkout                     │
│      └─ Tech: HTML, CSS, JavaScript, Java, MySQL            │
│                                                             │
│  05. Food Delivery Website (2024)                           │
│      ├─ Dynamic menu displays & order functionality         │
│      ├─ Mobile-friendly responsive design                   │
│      └─ Tech: React.js, Tailwind CSS                        │
│                                                             │
│  Type 'projects --view' to scroll to projects section       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
    `,
  },
  experience: {
    description: 'View my work experience',
    response: `
┌─ WORK EXPERIENCE ───────────────────────────────────────────┐
│                                                             │
│  ▸ Software Development Intern                              │
│    Amzaum IT — Remote / UK                                  │
│    ─────────────────────────────────────────────────────    │
│                                                             │
│    • Spearheaded the end-to-end development and             │
│      deployment of Amzaum IT's official company website     │
│                                                             │
│    • Built multiple client-facing web applications using    │
│      the MERN stack (MongoDB, Express.js, React, Node.js)   │
│                                                             │
│    • Implemented responsive UIs, RESTful APIs, and          │
│      secure authentication systems                          │
│                                                             │
│    • Handled domain configuration, server setup, and        │
│      deployment pipelines                                   │
│                                                             │
│    • Ensured high availability and performance of all       │
│      web assets                                             │
│                                                             │
│    Technologies: React.js, Node.js, Express.js, MongoDB     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
    `,
  },
  education: {
    description: 'Check my education background',
    response: `
┌─ EDUCATION ─────────────────────────────────────────────────┐
│                                                             │
│  🎓 BSc (Hons) Information Technology                       │
│     Sri Lanka Institute of Information Technology (SLIIT)   │
│     2022 - Expected 2026                                    │
│                                                             │
│  📜 Engineering Technology                                   │
│     Anuruddha Kumara National College, Nawalapitiya         │
│     2020 | Results: 2C 1S                                   │
│                                                             │
│  💻 Diploma in PC Hardware Engineering                       │
│     and Network Administration                              │
│     ESOFT Metro Campus                                      │
│     2017                                                    │
│                                                             │
│  📚 Current Focus:                                           │
│     • Full-Stack Web Development                            │
│     • Quality Assurance & Testing                           │
│     • Mobile App Development                                │
│     • Cloud Technologies & DevOps                           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
    `,
  },
  contact: {
    description: 'Get my contact information',
    response: `
┌─ CONTACT INFORMATION ───────────────────────────────────────┐
│                                                             │
│  📧 Email:    osandalakshitha01@gmail.com                   │
│  📱 Phone:    +94 75 4 927 750                              │
│  📍 Location: No 77 UC Rd, Nawalapitiya, Sri Lanka          │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  💬 Open for:                                                │
│     • Internship positions                                  │
│     • Full-time opportunities                               │
│     • Freelance projects                                    │
│     • Open source collaboration                             │
│                                                             │
│  🎯 Seeking: Web & Software Engineering Intern role         │
│                                                             │
│  Response time: Usually within 24 hours                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
    `,
  },
  social: {
    description: 'View social media links',
    response: `
┌─ SOCIAL MEDIA ──────────────────────────────────────────────┐
│                                                             │
│  🐙 GitHub:    github.com/osandalakshitha                   │
│  💼 LinkedIn:  linkedin.com/in/osandalakshitha              │
│  📧 Email:     osandalakshitha01@gmail.com                  │
│                                                             │
│  Feel free to connect! I'm always happy to chat about       │
│  tech, projects, or potential opportunities.                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
    `,
  },
  clear: {
    description: 'Clear the terminal',
    action: 'clear',
  },
  date: {
    description: 'Show current date/time',
    response: () => `
  Current Date/Time: ${new Date().toLocaleString()}
  Timezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}
    `,
  },
  whoami: {
    description: 'Display current user',
    response: `
  visitor@osanda-portfolio
  ─────────────────────────
  Name: Osanda Chamikara
  Role: Full-Stack Developer & QA Engineer
  Status: BSc IT Undergraduate @ SLIIT
  Access Level: Guest
  Session: Active ✓
    `,
  },
  'sudo hire': {
    description: 'Execute the ultimate command',
    response: `
  ╔═══════════════════════════════════════════════════════════╗
  ║                                                           ║
  ║   🎉 CONGRATULATIONS! 🎉                                  ║
  ║                                                           ║
  ║   You've unlocked the secret command!                     ║
  ║                                                           ║
  ║   Osanda is:                                              ║
  ║   ✓ Available for internship opportunities                ║
  ║   ✓ Experienced with MERN stack development               ║
  ║   ✓ Skilled in QA & Testing methodologies                 ║
  ║   ✓ Ready to contribute to your team                      ║
  ║                                                           ║
  ║   📧 Contact: osandalakshitha01@gmail.com                 ║
  ║   📱 Phone:   +94 75 4 927 750                            ║
  ║                                                           ║
  ║   Let's build something amazing together! 🚀              ║
  ║                                                           ║
  ╚═══════════════════════════════════════════════════════════╝
    `,
  },
  neofetch: {
    description: 'Display system info',
    response: `
        ██████████████████        visitor@osanda-portfolio
        ██████████████████        ─────────────────────────
        ██████████████████        OS: Osanda Portfolio v2.0
        ██████████████████        Host: React 18 + Vite
        ████████    ██████        Kernel: JavaScript ES2024
        ████████    ██████        Uptime: ${Math.floor(Math.random() * 99) + 1} days
        ██████████████████        Shell: ZSH 5.9
        ██████████████████        Terminal: Cyberpunk Theme
        ████████    ██████        
        ████████    ██████        Developer: Osanda Chamikara
        ██████████████████        University: SLIIT
        ██████████████████        Stack: MERN + Tailwind
        ██████████████████        Status: Open to Work
                                  
                                  ███████████████████████
    `,
  },
  theme: {
    description: 'Toggle terminal theme',
    action: 'theme',
  },
  'projects --view': {
    description: 'Navigate to projects section',
    action: 'navigate',
    target: 'projects',
  },
  'contact --open': {
    description: 'Navigate to contact section',
    action: 'navigate',
    target: 'contact',
  },
}

const Terminal = () => {
  const [history, setHistory] = useState([
    {
      type: 'system',
      content: `
Welcome to Osanda's Interactive Terminal v2.0.0
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Type 'help' to see available commands.
Try 'sudo hire' for a surprise! 😎
      `,
    },
  ])
  const [currentInput, setCurrentInput] = useState('')
  const [commandHistory, setCommandHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isTyping, setIsTyping] = useState(false)
  const [theme, setTheme] = useState('green') // green, blue, purple
  
  const inputRef = useRef(null)
  const outputRef = useRef(null)

  // Theme colors
  const themes = {
    green: {
      primary: 'text-neon-green',
      prompt: 'text-neon-green',
      border: 'border-neon-green/30',
      glow: 'shadow-[0_0_30px_rgba(0,255,136,0.2)]',
    },
    blue: {
      primary: 'text-neon-blue',
      prompt: 'text-neon-blue',
      border: 'border-neon-blue/30',
      glow: 'shadow-[0_0_30px_rgba(0,212,255,0.2)]',
    },
    purple: {
      primary: 'text-neon-purple',
      prompt: 'text-neon-purple',
      border: 'border-neon-purple/30',
      glow: 'shadow-[0_0_30px_rgba(168,85,247,0.2)]',
    },
  }

  const currentTheme = themes[theme]

  // Auto-scroll to bottom
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [history])

  // Focus input on click
  const focusInput = useCallback(() => {
    inputRef.current?.focus()
  }, [])

  // Type out response with animation
  const typeResponse = useCallback(async (response) => {
    setIsTyping(true)
    const chars = response.split('')
    let typed = ''
    
    for (let i = 0; i < chars.length; i++) {
      typed += chars[i]
      setHistory(prev => {
        const newHistory = [...prev]
        newHistory[newHistory.length - 1] = {
          type: 'output',
          content: typed,
        }
        return newHistory
      })
      
      // Variable typing speed for natural feel
      if (chars[i] === '\n') {
        await new Promise(r => setTimeout(r, 15))
      } else {
        await new Promise(r => setTimeout(r, 3))
      }
    }
    
    setIsTyping(false)
  }, [])

  // Execute command
  const executeCommand = useCallback(async (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase()
    
    // Add command to history
    setHistory(prev => [
      ...prev,
      { type: 'command', content: cmd },
    ])
    setCommandHistory(prev => [cmd, ...prev])
    setHistoryIndex(-1)
    
    // Find matching command
    const commandKey = Object.keys(commands).find(
      key => trimmedCmd === key || trimmedCmd.startsWith(key + ' ')
    )
    
    if (!commandKey) {
      setHistory(prev => [
        ...prev,
        { 
          type: 'error', 
          content: `Command not found: ${cmd}\nType 'help' for available commands.` 
        },
      ])
      return
    }
    
    const command = commands[commandKey]
    
    // Handle special actions
    if (command.action === 'clear') {
      setHistory([])
      return
    }
    
    if (command.action === 'theme') {
      const themeKeys = Object.keys(themes)
      const currentIndex = themeKeys.indexOf(theme)
      const nextTheme = themeKeys[(currentIndex + 1) % themeKeys.length]
      setTheme(nextTheme)
      setHistory(prev => [
        ...prev,
        { type: 'output', content: `  Theme changed to: ${nextTheme} ✓` },
      ])
      return
    }
    
    if (command.action === 'navigate') {
      const element = document.getElementById(command.target)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
        setHistory(prev => [
          ...prev,
          { type: 'output', content: `  Navigating to ${command.target}...` },
        ])
      }
      return
    }
    
    // Get response
    let response = typeof command.response === 'function' 
      ? command.response() 
      : command.response
    
    // Add placeholder for typing animation
    setHistory(prev => [...prev, { type: 'output', content: '' }])
    
    // Type out response
    await typeResponse(response)
    
  }, [theme, typeResponse])

  // Handle input
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !isTyping) {
      executeCommand(currentInput)
      setCurrentInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setCurrentInput(commandHistory[newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setCurrentInput(commandHistory[newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setCurrentInput('')
      }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      // Auto-complete
      const matchingCommands = Object.keys(commands).filter(
        cmd => cmd.startsWith(currentInput.toLowerCase())
      )
      if (matchingCommands.length === 1) {
        setCurrentInput(matchingCommands[0])
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault()
      setHistory([])
    }
  }, [currentInput, commandHistory, historyIndex, executeCommand, isTyping])

  return (
    <section id="terminal" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            <span className="text-gray-400">{'>'}</span>
            <span 
              style={{
                background: 'linear-gradient(135deg, #00ff88 0%, #00d4ff 50%, #a855f7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            > Interactive Terminal</span>
          </h2>
          <p className="text-gray-400 font-mono">
            Try typing commands to learn more about me
          </p>
        </motion.div>

        {/* Terminal Window */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`
            relative rounded-lg overflow-hidden 
            bg-cyber-dark/90 backdrop-blur-sm
            border ${currentTheme.border}
            ${currentTheme.glow}
          `}
          onClick={focusInput}
        >
          {/* Terminal Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-cyber-gray/50 border-b border-white/10">
            <div className="flex items-center gap-2">
              {/* Window controls */}
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 cursor-pointer" />
                <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 cursor-pointer" />
                <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 cursor-pointer" />
              </div>
              {/* Title */}
              <span className="ml-4 font-mono text-sm text-gray-400">
                osanda@portfolio:~
              </span>
            </div>
            
            {/* Theme indicator */}
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  executeCommand('theme')
                }}
                className={`font-mono text-xs ${currentTheme.primary} hover:opacity-80 transition-opacity`}
              >
                [{theme}]
              </button>
            </div>
          </div>

          {/* Terminal Output */}
          <div
            ref={outputRef}
            className="h-96 overflow-y-auto p-4 font-mono text-sm"
          >
            <AnimatePresence>
              {history.map((entry, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-2"
                >
                  {entry.type === 'command' && (
                    <div className="flex items-start gap-2">
                      <span className={currentTheme.prompt}>
                        visitor@osanda:~$
                      </span>
                      <span className="text-white">{entry.content}</span>
                    </div>
                  )}
                  {entry.type === 'output' && (
                    <pre className={`${currentTheme.primary} whitespace-pre-wrap break-words`}>
                      {entry.content}
                    </pre>
                  )}
                  {entry.type === 'error' && (
                    <pre className="text-red-400 whitespace-pre-wrap">
                      {entry.content}
                    </pre>
                  )}
                  {entry.type === 'system' && (
                    <pre className="text-gray-400 whitespace-pre-wrap">
                      {entry.content}
                    </pre>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Current Input Line */}
            <div className="flex items-start gap-2">
              <span className={currentTheme.prompt}>
                visitor@osanda:~$
              </span>
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isTyping}
                  className="w-full bg-transparent text-white outline-none caret-transparent"
                  autoFocus
                  spellCheck={false}
                  autoComplete="off"
                />
                {/* Custom cursor */}
                <span
                  className="absolute top-0 pointer-events-none text-white"
                  style={{ left: `${currentInput.length}ch` }}
                >
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className={`inline-block w-2 h-5 ${theme === 'green' ? 'bg-neon-green' : theme === 'blue' ? 'bg-neon-blue' : 'bg-neon-purple'}`}
                  />
                </span>
              </div>
            </div>
          </div>

          {/* Terminal Footer */}
          <div className="px-4 py-2 bg-cyber-gray/30 border-t border-white/5">
            <div className="flex items-center justify-between text-xs font-mono text-gray-500">
              <div className="flex items-center gap-4">
                <span>↑↓ History</span>
                <span>Tab Autocomplete</span>
                <span>Ctrl+L Clear</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${isTyping ? 'bg-yellow-500 animate-pulse' : 'bg-neon-green'}`} />
                <span>{isTyping ? 'Processing...' : 'Ready'}</span>
              </div>
            </div>
          </div>

          {/* Scan line effect */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              className="absolute left-0 right-0 h-px bg-white/5"
              animate={{ y: ['-100%', '400px'] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        </motion.div>

        {/* Quick Commands */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-2"
        >
          <span className="text-gray-500 text-sm font-mono">Quick commands:</span>
          {['help', 'about', 'skills', 'projects', 'experience', 'sudo hire'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => {
                setCurrentInput(cmd)
                inputRef.current?.focus()
              }}
              className="px-3 py-1 text-xs font-mono rounded-full glass border border-white/10 text-gray-400 hover:text-neon-green hover:border-neon-green/30 transition-colors"
            >
              {cmd}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Terminal