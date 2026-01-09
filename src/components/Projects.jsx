import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

// Projects data based on your CV
const projects = [
  {
    id: 1,
    title: 'NoteGenius Web App',
    subtitle: 'MERN Stack Note-Taking Application',
    description: 'A full-stack note-taking application with user authentication, note CRUD operations, and version control features. Includes JWT token security and session handling.',
    longDescription: 'Validated full-stack functionality of a MERN-based note-taking application through manual and regression testing. Designed and executed test cases for user authentication, note CRUD operations, and version control features. Reported UI inconsistencies and API response errors using structured bug reports. Verified JWT token security and session handling during testing cycles.',
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&h=600&fit=crop',
    technologies: ['React.js', 'Express.js', 'Node.js', 'MongoDB', 'Postman', 'JWT'],
    category: 'fullstack',
    github: 'https://github.com/osandalakshitha/notegenius',
    live: null,
    featured: true,
    year: '2025',
    stats: {
      stars: 45,
      forks: 12,
      views: '2K',
    },
  },
  {
    id: 2,
    title: 'Ceylon Travels',
    subtitle: 'Travel Booking Platform',
    description: 'A comprehensive travel booking platform with package browsing, booking flow, and confirmation system. Features cross-browser compatibility and responsive design.',
    longDescription: 'Conducted end-to-end testing of user journey: package browsing → booking → confirmation. Performed cross-browser and responsive design validation on mobile and desktop views. Used Postman to test backend API endpoints for data accuracy and error handling.',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop',
    technologies: ['React.js', 'Express.js', 'Node.js', 'MongoDB', 'Postman'],
    category: 'fullstack',
    github: 'https://github.com/osandalakshitha/ceylon-travels',
    live: null,
    featured: true,
    year: '2024',
    stats: {
      stars: 38,
      forks: 8,
      views: '1.5K',
    },
  },
  {
    id: 3,
    title: 'Kanthi AI ChatBot',
    subtitle: 'AI-Powered Conversational Assistant',
    description: 'An intelligent chatbot powered by Google Gemini API with natural language processing capabilities. Handles various user queries with contextual responses.',
    longDescription: 'Developed an AI-powered chatbot using Google Gemini API. Tested natural language responses under various input conditions. Documented edge cases where the chatbot failed to understand queries. Implemented error handling and fallback responses for better user experience.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    technologies: ['React.js', 'Gemini API', 'JavaScript', 'CSS'],
    category: 'ai',
    github: 'https://github.com/osandalakshitha/kanthi-ai',
    live: null,
    featured: true,
    year: '2023',
    stats: {
      stars: 52,
      forks: 15,
      views: '3K',
    },
  },
  {
    id: 4,
    title: 'Online Pharmacy Website',
    subtitle: 'E-Commerce Healthcare Platform',
    description: 'A complete e-commerce platform for pharmacy products with product search, cart management, and secure checkout flow.',
    longDescription: 'Created detailed test scenarios for product search, cart management, and checkout flow. Logged defects related to form validation, image loading, and navigation flow. Participated in usability testing to improve user experience. Implemented responsive design for mobile and desktop users.',
    image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=800&h=600&fit=crop',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Java', 'MySQL', 'Postman'],
    category: 'fullstack',
    github: 'https://github.com/osandalakshitha/online-pharmacy',
    live: null,
    featured: false,
    year: '2024',
    stats: {
      stars: 28,
      forks: 6,
      views: '1K',
    },
  },
  {
    id: 5,
    title: 'Food Delivery Website',
    subtitle: 'React-Based Food Ordering Platform',
    description: 'A modern food delivery platform with dynamic menu displays, real-time order functionality, and mobile-friendly responsive design.',
    longDescription: 'Created a React-based food delivery platform with dynamic menu displays and order functionality. Ensured mobile-friendly design using CSS and JavaScript. Implemented Tailwind CSS for rapid UI development. Built reusable components for menu items, cart, and checkout.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop',
    technologies: ['React.js', 'Tailwind CSS', 'JavaScript'],
    category: 'frontend',
    github: 'https://github.com/osandalakshitha/food-delivery',
    live: null,
    featured: false,
    year: '2024',
    stats: {
      stars: 35,
      forks: 10,
      views: '1.8K',
    },
  },
  {
    id: 6,
    title: 'Amzaum IT Website',
    subtitle: 'Company Portfolio & Client Projects',
    description: 'Official company website for Amzaum IT with multiple client-facing web applications built during internship.',
    longDescription: 'Spearheaded the end-to-end development and deployment of Amzaum IT\'s official company website, serving as the primary digital presence for the organization. Built multiple client-facing web applications using the MERN stack, implementing responsive UIs, RESTful APIs, and secure authentication. Handled domain configuration, server setup, and deployment pipelines.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST API'],
    category: 'fullstack',
    github: 'https://github.com/osandalakshitha',
    live: null,
    featured: false,
    year: '2024',
    stats: {
      stars: 20,
      forks: 5,
      views: '800',
    },
  },
]

// Categories for filtering
const categories = [
  { id: 'all', name: 'All Projects', icon: '◈' },
  { id: 'featured', name: 'Featured', icon: '⭐' },
  { id: 'fullstack', name: 'Full Stack', icon: '🔷' },
  { id: 'frontend', name: 'Frontend', icon: '🎨' },
  { id: 'ai', name: 'AI/ML', icon: '🤖' },
]

// Project Card Component
const ProjectCard = ({ project, index, onExpand }) => {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative rounded-2xl overflow-hidden glass border border-white/10 hover:border-neon-green/50 transition-all duration-500 flex flex-col h-full"
    >
      {/* Featured Badge */}
      {project.featured && (
        <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-neon-green/20 border border-neon-green/50 text-neon-green text-xs font-mono">
          ⭐ Featured
        </div>
      )}

      {/* Year Badge */}
      <div className="absolute top-4 left-4 z-20 px-2 py-1 rounded bg-cyber-black/80 text-neon-blue text-xs font-mono border border-neon-blue/30">
        {project.year}
      </div>

      {/* Image Container */}
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-cyber-black via-cyber-black/50 to-transparent" />
        
        {/* Tech stack overlay */}
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs font-mono rounded bg-cyber-black/80 text-neon-green border border-neon-green/30"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-2 py-1 text-xs font-mono rounded bg-cyber-black/80 text-gray-400">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-3">
          <h3 className="font-display text-xl font-bold text-white group-hover:text-neon-green transition-colors mb-1">
            {project.title}
          </h3>
          <p className="text-sm text-neon-purple font-mono">{project.subtitle}</p>
        </div>

        <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">
          {project.description}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 mb-4 text-xs font-mono text-gray-500">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            {project.stats.stars}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 3a3 3 0 00-3 3v2.25a3 3 0 003 3h2.25a3 3 0 003-3V6a3 3 0 00-3-3H6zM15.75 3a3 3 0 00-3 3v2.25a3 3 0 003 3H18a3 3 0 003-3V6a3 3 0 00-3-3h-2.25zM6 12.75a3 3 0 00-3 3V18a3 3 0 003 3h2.25a3 3 0 003-3v-2.25a3 3 0 00-3-3H6zM17.625 13.5a.75.75 0 00-1.5 0v2.625H13.5a.75.75 0 000 1.5h2.625v2.625a.75.75 0 001.5 0v-2.625h2.625a.75.75 0 000-1.5h-2.625V13.5z" />
            </svg>
            {project.stats.forks}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            {project.stats.views}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 mt-auto">
          {project.live && (
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-neon-green/10 border border-neon-green/30 text-neon-green text-sm font-mono hover:bg-neon-green/20 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Demo
            </motion.a>
          )}
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg glass border border-white/10 text-gray-300 text-sm font-mono hover:text-white hover:border-white/30 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            Code
          </motion.a>
          <motion.button
            onClick={() => onExpand(project)}
            className="p-2.5 rounded-lg glass border border-white/10 text-gray-400 hover:text-neon-purple hover:border-neon-purple/30 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="View details"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-neon-green/5 via-transparent to-transparent" />
      </div>
    </motion.div>
  )
}

// Project Detail Modal
const ProjectModal = ({ project, onClose }) => {
  if (!project) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cyber-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl glass border border-neon-green/30"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-cyber-black/50 text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image */}
        <div className="relative h-64 sm:h-72">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cyber-black via-cyber-black/50 to-transparent" />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="px-2 py-1 rounded bg-cyber-black/80 text-neon-blue text-xs font-mono border border-neon-blue/30">
              {project.year}
            </span>
            {project.featured && (
              <span className="px-3 py-1 rounded-full bg-neon-green/20 border border-neon-green/50 text-neon-green text-xs font-mono">
                ⭐ Featured
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          <div className="mb-6">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
              {project.title}
            </h3>
            <p className="text-neon-purple font-mono">{project.subtitle}</p>
          </div>

          <p className="text-gray-300 leading-relaxed mb-6">
            {project.longDescription}
          </p>

          {/* Technologies */}
          <div className="mb-6">
            <h4 className="font-mono text-sm text-gray-500 mb-3">// Technologies Used</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 text-sm font-mono rounded-full bg-neon-green/10 text-neon-green border border-neon-green/30"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-xl bg-cyber-gray/30 text-center">
              <div className="text-2xl font-bold text-neon-green">{project.stats.stars}</div>
              <div className="text-xs text-gray-500 font-mono">Stars</div>
            </div>
            <div className="p-4 rounded-xl bg-cyber-gray/30 text-center">
              <div className="text-2xl font-bold text-neon-blue">{project.stats.forks}</div>
              <div className="text-xs text-gray-500 font-mono">Forks</div>
            </div>
            <div className="p-4 rounded-xl bg-cyber-gray/30 text-center">
              <div className="text-2xl font-bold text-neon-purple">{project.stats.views}</div>
              <div className="text-xs text-gray-500 font-mono">Views</div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            {project.live && (
              <motion.a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-neon-green text-cyber-black font-mono font-semibold hover:shadow-[0_0_30px_rgba(0,255,136,0.5)] transition-shadow"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                View Live Demo
              </motion.a>
            )}
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-white/20 text-white font-mono hover:border-white/40 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              View Source Code
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)

  // Filter projects
  const filteredProjects = projects.filter((project) => {
    if (activeCategory === 'all') return true
    if (activeCategory === 'featured') return project.featured
    return project.category === activeCategory
  })

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
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
            className="inline-block px-4 py-1 mb-4 font-mono text-sm text-neon-orange border border-neon-orange/30 rounded-full"
          >
            {'// MY WORK'}
          </motion.span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-6">
            <span className="text-white">Featured </span>
            <span 
              style={{
                background: 'linear-gradient(135deg, #00ff88 0%, #00d4ff 50%, #a855f7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Projects
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400">
            A collection of projects I've built during my journey as a developer.
            From full-stack applications to AI-powered solutions.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 font-mono text-sm rounded-lg transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-neon-green/20 text-neon-green border border-neon-green/50 shadow-[0_0_20px_rgba(0,255,136,0.2)]'
                  : 'text-gray-400 hover:text-white glass border border-white/10 hover:border-white/20'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-2">
                <span>{category.icon}</span>
                <span className="hidden sm:inline">{category.name}</span>
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onExpand={setSelectedProject}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-400 font-mono">No projects found in this category.</p>
          </motion.div>
        )}

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 mb-4 font-mono text-sm">
            <span className="text-neon-green">{'>'}</span> Want to see more?
          </p>
          <motion.a
            href="https://github.com/osandalakshitha"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 font-mono font-semibold rounded-lg bg-white/5 border border-white/20 text-white hover:bg-white/10 hover:border-white/40 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            Explore My GitHub
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </motion.a>
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

export default Projects