import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

// Skills data organized by category based on your CV
const skillCategories = [
  {
    id: 'frontend',
    name: 'Frontend Development',
    icon: '🎨',
    color: 'neon-green',
    skills: [
      { name: 'React.js', level: 90, icon: '⚛️' },
      { name: 'HTML5', level: 95, icon: '🌐' },
      { name: 'CSS3', level: 90, icon: '🎨' },
      { name: 'JavaScript', level: 90, icon: '🟨' },
      { name: 'Tailwind CSS', level: 85, icon: '🎐' },
    ],
  },
  {
    id: 'backend',
    name: 'Backend Development',
    icon: '⚙️',
    color: 'neon-blue',
    skills: [
      { name: 'Node.js', level: 85, icon: '🟢' },
      { name: 'Express.js', level: 82, icon: '🚂' },
      { name: 'PHP', level: 75, icon: '🐘' },
      { name: 'Laravel', level: 70, icon: '🔴' },
      { name: 'REST API', level: 85, icon: '🔗' },
    ],
  },
  {
    id: 'languages',
    name: 'Programming Languages',
    icon: '💻',
    color: 'neon-purple',
    skills: [
      { name: 'JavaScript', level: 90, icon: '🟨' },
      { name: 'Java', level: 80, icon: '☕' },
      { name: 'Python', level: 75, icon: '🐍' },
      { name: 'C', level: 70, icon: '🔷' },
      { name: 'C++', level: 70, icon: '🔶' },
      { name: 'Kotlin', level: 65, icon: '🟣' },
    ],
  },
  {
    id: 'database',
    name: 'Database',
    icon: '🗄️',
    color: 'neon-orange',
    skills: [
      { name: 'MongoDB', level: 85, icon: '🍃' },
      { name: 'MySQL', level: 82, icon: '🐬' },
      { name: 'Oracle DB', level: 70, icon: '🔴' },
      { name: 'SQLite', level: 72, icon: '📦' },
    ],
  },
  {
    id: 'testing',
    name: 'Testing & QA',
    icon: '🧪',
    color: 'neon-pink',
    skills: [
      { name: 'Postman', level: 90, icon: '📮' },
      { name: 'Selenium', level: 70, icon: '🤖' },
      { name: 'Manual Testing', level: 85, icon: '✅' },
      { name: 'API Testing', level: 85, icon: '🔌' },
      { name: 'Regression Testing', level: 80, icon: '🔄' },
    ],
  },
  {
    id: 'tools',
    name: 'Tools & Others',
    icon: '🛠️',
    color: 'neon-green',
    skills: [
      { name: 'Git/GitHub', level: 88, icon: '📚' },
      { name: 'VS Code', level: 92, icon: '💙' },
      { name: 'Figma', level: 70, icon: '🎨' },
      { name: 'Agile/Scrum', level: 78, icon: '🔄' },
      { name: 'Linux', level: 72, icon: '🐧' },
    ],
  },
]

// Soft skills from your CV
const softSkills = [
  { name: 'Attention to Detail', icon: '🔍' },
  { name: 'Analytical Thinking', icon: '🧠' },
  { name: 'Clear Communication', icon: '💬' },
  { name: 'Team Collaboration', icon: '🤝' },
  { name: 'Documentation', icon: '📝' },
  { name: 'Problem Solving', icon: '💡' },
]

// Color mappings for Tailwind
const colorClasses = {
  'neon-green': {
    bg: 'bg-neon-green',
    bgLight: 'bg-neon-green/10',
    border: 'border-neon-green/30',
    borderHover: 'hover:border-neon-green/60',
    text: 'text-neon-green',
    shadow: 'shadow-[0_0_20px_rgba(0,255,136,0.3)]',
  },
  'neon-blue': {
    bg: 'bg-neon-blue',
    bgLight: 'bg-neon-blue/10',
    border: 'border-neon-blue/30',
    borderHover: 'hover:border-neon-blue/60',
    text: 'text-neon-blue',
    shadow: 'shadow-[0_0_20px_rgba(0,212,255,0.3)]',
  },
  'neon-purple': {
    bg: 'bg-neon-purple',
    bgLight: 'bg-neon-purple/10',
    border: 'border-neon-purple/30',
    borderHover: 'hover:border-neon-purple/60',
    text: 'text-neon-purple',
    shadow: 'shadow-[0_0_20px_rgba(168,85,247,0.3)]',
  },
  'neon-orange': {
    bg: 'bg-neon-orange',
    bgLight: 'bg-neon-orange/10',
    border: 'border-neon-orange/30',
    borderHover: 'hover:border-neon-orange/60',
    text: 'text-neon-orange',
    shadow: 'shadow-[0_0_20px_rgba(251,146,60,0.3)]',
  },
  'neon-pink': {
    bg: 'bg-neon-pink',
    bgLight: 'bg-neon-pink/10',
    border: 'border-neon-pink/30',
    borderHover: 'hover:border-neon-pink/60',
    text: 'text-neon-pink',
    shadow: 'shadow-[0_0_20px_rgba(244,114,182,0.3)]',
  },
}

// Animated skill bar component
const SkillBar = ({ skill, color, delay = 0 }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const colors = colorClasses[color]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="group"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">{skill.icon}</span>
          <span className="font-mono text-sm text-gray-300 group-hover:text-white transition-colors">
            {skill.name}
          </span>
        </div>
        <span className={`font-mono text-xs ${colors.text}`}>
          {skill.level}%
        </span>
      </div>
      <div className="relative h-2 bg-cyber-gray rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1, delay: delay + 0.2, ease: 'easeOut' }}
          className={`absolute inset-y-0 left-0 ${colors.bg} rounded-full`}
        />
        {/* Glow effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: delay + 0.5 }}
          className={`absolute inset-y-0 left-0 ${colors.bg} rounded-full blur-sm opacity-50`}
          style={{ width: `${skill.level}%` }}
        />
      </div>
    </motion.div>
  )
}

// Grid skill component for alternative view
const GridSkill = ({ skill, color, index }) => {
  const colors = colorClasses[color]
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.1, y: -5 }}
      className="relative group cursor-pointer"
    >
      <div
        className={`w-20 h-20 sm:w-24 sm:h-24 flex flex-col items-center justify-center rounded-xl ${colors.bgLight} border ${colors.border} ${colors.borderHover} transition-all duration-300`}
      >
        <span className="text-2xl mb-1">{skill.icon}</span>
        <span className="font-mono text-xs text-gray-400 group-hover:text-white transition-colors text-center px-1">
          {skill.name}
        </span>
      </div>
      
      {/* Level indicator on hover */}
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className={`font-mono text-xs ${colors.text}`}>{skill.level}%</span>
      </div>
    </motion.div>
  )
}

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('frontend')
  const [viewMode, setViewMode] = useState('bars') // 'bars' or 'grid'
  const containerRef = useRef(null)

  const activeSkills = skillCategories.find(cat => cat.id === activeCategory)
  const activeColors = colorClasses[activeSkills?.color || 'neon-green']

  return (
    <section
      ref={containerRef}
      id="skills"
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-purple/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-neon-blue/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1 mb-4 font-mono text-sm text-neon-blue border border-neon-blue/30 rounded-full"
          >
            {'// SKILLS & EXPERTISE'}
          </motion.span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-6">
            <span className="text-white">Technical </span>
            <span 
              style={{
                background: 'linear-gradient(135deg, #00ff88 0%, #00d4ff 50%, #a855f7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Skills
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400">
            Proficient in modern JavaScript frameworks and server-side development.
            Skilled in RESTful API design, database modeling, and agile workflows.
          </p>
        </motion.div>

        {/* View Mode Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex p-1 rounded-lg glass border border-white/10">
            <button
              onClick={() => setViewMode('bars')}
              className={`px-4 py-2 font-mono text-sm rounded-md transition-all ${
                viewMode === 'bars'
                  ? 'bg-neon-green/20 text-neon-green'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Progress
              </span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 font-mono text-sm rounded-md transition-all ${
                viewMode === 'grid'
                  ? 'bg-neon-green/20 text-neon-green'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                Grid
              </span>
            </button>
          </div>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12"
        >
          {skillCategories.map((category) => {
            const colors = colorClasses[category.color]
            const isActive = activeCategory === category.id
            
            return (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`relative px-3 sm:px-5 py-2 sm:py-3 font-mono text-xs sm:text-sm rounded-lg transition-all duration-300 ${
                  isActive
                    ? `${colors.bgLight} ${colors.text} ${colors.border} border ${colors.shadow}`
                    : 'text-gray-400 hover:text-white glass border border-white/10 hover:border-white/20'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-1 sm:gap-2">
                  <span>{category.icon}</span>
                  <span className="hidden sm:inline">{category.name}</span>
                  <span className="sm:hidden">{category.name.split(' ')[0]}</span>
                </span>
                
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeSkillTab"
                    className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 ${colors.bg} rounded-full`}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            )
          })}
        </motion.div>

        {/* Skills Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCategory}-${viewMode}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`p-6 sm:p-8 rounded-2xl glass border ${activeColors.border}`}
          >
            {/* Category Header */}
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/10">
              <span className="text-3xl">{activeSkills?.icon}</span>
              <div>
                <h3 className={`font-display text-xl font-bold ${activeColors.text}`}>
                  {activeSkills?.name}
                </h3>
                <p className="text-sm text-gray-400">
                  {activeSkills?.skills.length} technologies
                </p>
              </div>
            </div>

            {/* Skills Content */}
            {viewMode === 'bars' ? (
              <div className="grid sm:grid-cols-2 gap-6">
                {activeSkills?.skills.map((skill, index) => (
                  <SkillBar
                    key={skill.name}
                    skill={skill}
                    color={activeSkills.color}
                    delay={index * 0.1}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap justify-center gap-4">
                {activeSkills?.skills.map((skill, index) => (
                  <GridSkill
                    key={skill.name}
                    skill={skill}
                    color={activeSkills.color}
                    index={index}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Soft Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <h3 className="font-display text-xl font-bold text-center mb-8 text-gray-400">
            <span className="text-neon-purple">{'{'}</span>
            {' Soft Skills '}
            <span className="text-neon-purple">{'}'}</span>
          </h3>

          <div className="flex flex-wrap justify-center gap-3">
            {softSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -3 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-neon-purple/30 hover:border-neon-purple/60 transition-all cursor-default"
              >
                <span className="text-lg">{skill.icon}</span>
                <span className="font-mono text-sm text-gray-300">{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* All Categories Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <h3 className="font-display text-xl font-bold text-center mb-8 text-gray-400">
            <span className="text-neon-green">{'<'}</span>
            {' Full Stack Overview '}
            <span className="text-neon-green">{'/>'}</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {skillCategories.map((category, catIndex) => {
              const colors = colorClasses[category.color]
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: catIndex * 0.1 }}
                  className={`p-4 rounded-xl glass border ${colors.border} ${colors.borderHover} transition-all duration-300 group cursor-pointer`}
                  onClick={() => setActiveCategory(category.id)}
                  whileHover={{ y: -5 }}
                >
                  <div className="text-center">
                    <span className="text-2xl mb-2 block group-hover:scale-110 transition-transform">
                      {category.icon}
                    </span>
                    <span className={`font-mono text-xs ${colors.text}`}>
                      {category.name.split(' ')[0]}
                    </span>
                    <div className="mt-2 text-xs text-gray-500">
                      {category.skills.length} skills
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Currently Learning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400 mb-4 font-mono text-sm">
            <span className="text-neon-purple">// Currently exploring:</span>
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Docker', 'AWS', 'TypeScript', 'Next.js', 'React Native'].map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className="px-4 py-2 font-mono text-sm rounded-full glass border border-neon-blue/30 text-neon-blue hover:border-neon-blue/60 transition-colors cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills