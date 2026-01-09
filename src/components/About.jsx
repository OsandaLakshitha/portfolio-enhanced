import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'

// Stats data based on your CV
const stats = [
  { label: 'Projects Completed', value: '30+', icon: '🚀' },
  { label: 'Technologies', value: '15+', icon: '⚡' },
  { label: 'Years Learning', value: '4+', icon: '📚' },
  { label: 'Years of Experience', value: '3+', icon: '🏆' },
]

// Journey/Timeline data based on your CV
const journey = [
  {
    year: '2024',
    title: 'Software Development Intern',
    company: 'Amzaum IT — Remote / UK',
    description: 'Spearheaded end-to-end development of company website. Built multiple client-facing web applications using MERN stack with responsive UIs and RESTful APIs.',
    tech: ['React.js', 'Node.js', 'MongoDB', 'Express.js'],
    type: 'work',
  },
  {
    year: '2022',
    title: 'BSc (Hons) Information Technology',
    company: 'Sri Lanka Institute of Information Technology (SLIIT)',
    description: 'Currently pursuing degree with focus on software engineering, web development, and quality assurance.',
    tech: ['Java', 'Python', 'React', 'Database Systems'],
    type: 'education',
  },
  {
    year: '2020',
    title: 'Engineering Technology',
    company: 'Anuruddha Kumara National College, Nawalapitiya',
    description: 'Completed with results: 2C 1S. Built foundation in technology and engineering principles.',
    tech: ['Mathematics', 'Physics', 'ICT'],
    type: 'education',
  },
  {
    year: '2017',
    title: 'Diploma in PC Hardware Engineering',
    company: 'ESOFT Metro Campus',
    description: 'Diploma in PC Hardware Engineering and Network Administration. Learned hardware troubleshooting and networking fundamentals.',
    tech: ['Hardware', 'Networking', 'Troubleshooting'],
    type: 'education',
  },
]

// Interests data
const interests = [
  { name: 'Web Development', icon: '🌐', color: 'neon-green' },
  { name: 'Quality Assurance', icon: '🧪', color: 'neon-blue' },
  { name: 'API Design', icon: '🔗', color: 'neon-purple' },
  { name: 'Mobile Apps', icon: '📱', color: 'neon-pink' },
  { name: 'Open Source', icon: '💻', color: 'neon-orange' },
  { name: 'Problem Solving', icon: '🧩', color: 'neon-blue' },
]

// Code snippet that represents you
const codeSnippet = `const osanda = {
  name: "Osanda Chamikara",
  role: "Full-Stack Developer & QA Engineer",
  location: "Nawalapitiya, Sri Lanka 🇱🇰",
  
  education: {
    university: "SLIIT",
    degree: "BSc (Hons) IT",
    expected: 2026
  },
  
  skills: {
    frontend: ["React", "HTML", "CSS", "JavaScript"],
    backend: ["Node.js", "Express", "PHP", "Laravel"],
    database: ["MongoDB", "MySQL", "Oracle"],
    testing: ["Postman", "Selenium", "Manual QA"]
  },
  
  currentFocus: "MERN Stack Development",
  passion: "Building user-centric applications",
  
  isAvailable: () => true,
  contact: () => "osandalakshitha01@gmail.com"
};`

// Timeline item component
const TimelineItem = ({ item, index }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const typeColors = {
    work: 'border-neon-green bg-neon-green/10',
    education: 'border-neon-blue bg-neon-blue/10',
    milestone: 'border-neon-purple bg-neon-purple/10',
  }

  const typeIcons = {
    work: '💼',
    education: '🎓',
    milestone: '🏆',
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative flex items-start gap-6 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row`}
    >
      {/* Timeline line */}
      <div className="hidden md:flex absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neon-green via-neon-blue to-neon-purple -translate-x-1/2" />
      
      {/* Content */}
      <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'} text-left pl-12 md:pl-0`}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`p-6 rounded-xl glass border ${typeColors[item.type]} transition-all duration-300`}
        >
          <div className={`flex items-center gap-3 mb-3 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
            <span className="text-2xl">{typeIcons[item.type]}</span>
            <div>
              <h4 className="font-display text-lg font-bold text-white">{item.title}</h4>
              <p className="text-sm text-gray-400">{item.company}</p>
            </div>
          </div>
          <p className="text-gray-300 text-sm mb-4">{item.description}</p>
          <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
            {item.tech.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs font-mono rounded bg-cyber-gray/50 text-neon-green border border-neon-green/20"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Year bubble */}
      <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 flex-shrink-0">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
          className="w-16 h-16 rounded-full glass border border-neon-green/30 flex items-center justify-center"
        >
          <span className="font-mono text-sm font-bold text-neon-green">{item.year}</span>
        </motion.div>
      </div>

      {/* Spacer for alignment */}
      <div className="hidden md:block flex-1" />
    </motion.div>
  )
}

const About = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100])

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background decoration */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 opacity-30"
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-blue/10 rounded-full blur-3xl" />
      </motion.div>

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
            className="inline-block px-4 py-1 mb-4 font-mono text-sm text-neon-green border border-neon-green/30 rounded-full"
          >
            {'// ABOUT ME'}
          </motion.span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-6">
            <span className="text-white">Get to </span>
            <span 
              style={{
                background: 'linear-gradient(135deg, #00ff88 0%, #00d4ff 50%, #a855f7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Know Me
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400">
            A passionate developer building responsive, user-centric web and mobile applications.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Left: Bio & Code */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Bio Text */}
            <div className="space-y-4">
              <p className="text-lg text-gray-300 leading-relaxed">
                Hey there! I'm <span className="text-neon-green font-semibold">Osanda Chamikara</span>, 
                a full-stack software engineering undergraduate at <span className="text-neon-blue">SLIIT</span> with 
                hands-on experience building responsive, user-centric web and mobile applications.
              </p>
              <p className="text-gray-400 leading-relaxed">
                I'm proficient in modern JavaScript frameworks like <span className="text-neon-purple">React</span> and 
                <span className="text-neon-purple"> Node.js</span>, as well as server-side development with PHP and Laravel. 
                I specialize in RESTful API design, database modeling, and agile development workflows.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Currently working as a <span className="text-neon-green">Software Development Intern</span> at 
                Amzaum IT (UK), where I've built multiple client-facing web applications using the MERN stack.
                I'm passionate about writing clean, maintainable code and continuously expanding my expertise.
              </p>
              <p className="text-gray-400 leading-relaxed">
                <span className="text-neon-blue">🎯 Goal:</span> Contribute to innovative software teams as a 
                Web & Software Engineering Intern.
              </p>
            </div>

            {/* Code representation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative rounded-xl overflow-hidden glass border border-neon-green/20"
            >
              {/* Code header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-cyber-gray/50 border-b border-white/10">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="ml-2 font-mono text-xs text-gray-400">about-me.js</span>
              </div>
              
              {/* Code content */}
              <pre className="p-4 overflow-x-auto text-xs sm:text-sm">
                <code className="font-mono">
                  {codeSnippet.split('\n').map((line, i) => (
                    <div key={i} className="flex">
                      <span className="w-6 sm:w-8 text-gray-600 select-none text-right pr-2">{i + 1}</span>
                      <span className="flex-1">
                        {line.includes('const ') && (
                          <span>
                            <span className="text-neon-purple">const </span>
                            <span className="text-neon-blue">{line.split('const ')[1].split(' ')[0]}</span>
                            <span className="text-white">{line.split(line.split('const ')[1].split(' ')[0])[1]}</span>
                          </span>
                        )}
                        {line.includes(':') && !line.includes('const') && !line.includes('//') && (
                          <span>
                            <span className="text-neon-green">{line.split(':')[0]}</span>
                            <span className="text-white">:</span>
                            <span className="text-neon-orange">{line.split(':').slice(1).join(':')}</span>
                          </span>
                        )}
                        {line.includes('//') && (
                          <span className="text-gray-500">{line}</span>
                        )}
                        {!line.includes(':') && !line.includes('const') && !line.includes('//') && (
                          <span className="text-gray-400">{line}</span>
                        )}
                      </span>
                    </div>
                  ))}
                </code>
              </pre>
            </motion.div>
          </motion.div>

          {/* Right: Stats & Interests */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="p-6 rounded-xl glass border border-white/10 hover:border-neon-green/30 transition-all duration-300 text-center group"
                >
                  <span className="text-3xl mb-3 block group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </span>
                  <div className="font-display text-3xl font-bold text-neon-green mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Interests */}
            <div className="p-6 rounded-xl glass border border-white/10">
              <h3 className="font-display text-xl font-bold mb-4 text-white">
                <span className="text-neon-purple">#</span> Interests & Focus Areas
              </h3>
              <div className="flex flex-wrap gap-3">
                {interests.map((interest, index) => (
                  <motion.div
                    key={interest.name}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyber-gray/50 border border-white/10 hover:border-neon-green/30 transition-colors cursor-default"
                  >
                    <span>{interest.icon}</span>
                    <span className="text-sm font-mono text-gray-300">{interest.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Facts */}
            <div className="p-6 rounded-xl glass border border-white/10">
              <h3 className="font-display text-xl font-bold mb-4 text-white">
                <span className="text-neon-blue">&gt;</span> Quick Facts
              </h3>
              <ul className="space-y-3">
                {[
                  { label: 'Location', value: 'Nawalapitiya, Sri Lanka 🇱🇰', icon: '📍' },
                  { label: 'University', value: 'SLIIT (2022-2026)', icon: '🎓' },
                  { label: 'Role', value: 'Full-Stack Developer & QA', icon: '💻' },
                  { label: 'Stack', value: 'MERN + PHP/Laravel', icon: '⚡' },
                  { label: 'Status', value: 'Open for Internships', icon: '✅' },
                ].map((fact, index) => (
                  <motion.li
                    key={fact.label}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
                  >
                    <span className="flex items-center gap-2 text-gray-400">
                      <span>{fact.icon}</span>
                      {fact.label}
                    </span>
                    <span className="font-mono text-sm text-neon-green">{fact.value}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Timeline / Journey Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="font-display text-2xl font-bold text-center mb-12">
            <span className="text-gray-400">{'<'}</span>
            <span 
              style={{
                background: 'linear-gradient(135deg, #00ff88 0%, #00d4ff 50%, #a855f7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              My Journey
            </span>
            <span className="text-gray-400">{' />'}</span>
          </h3>

          <div className="relative space-y-12">
            {journey.map((item, index) => (
              <TimelineItem
                key={index}
                item={item}
                index={index}
              />
            ))}
          </div>
        </motion.div>

        {/* OsandaLakshithaCV CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-gray-400 mb-6">
            Want to know more about my experience?
          </p>
          <motion.a
            href="/OsandaLakshithaCV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 font-mono font-semibold rounded-lg bg-gradient-to-r from-neon-green/10 to-neon-blue/10 border border-neon-green/30 text-neon-green hover:border-neon-green/60 hover:shadow-[0_0_20px_rgba(0,255,136,0.3)] transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Full OsandaLakshithaCV
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default About