import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ⚠️ IMPORTANT: Replace with your Formspree form ID
// Get it from: https://formspree.io/forms
const FORMSPREE_FORM_ID = import.meta.env.VITE_FORMSPREE_ID || 'YOUR_FORM_ID'

// Contact info
const contactInfo = [
  {
    type: 'Email',
    value: 'osandalakshitha01@gmail.com',
    href: 'mailto:osandalakshitha01@gmail.com',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: 'neon-green',
  },
  {
    type: 'Location',
    value: 'Colombo, Sri Lanka',
    href: 'https://maps.google.com/?q=Colombo,Sri+Lanka',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    color: 'neon-blue',
  },
  {
    type: 'Availability',
    value: 'Open for opportunities',
    href: null,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    color: 'neon-purple',
  },
]

// Social links
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
    name: 'Discord',
    url: 'https://discord.com/users/osanda',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
      </svg>
    ),
  },
]

// Form field component
const FormField = ({ label, type, name, placeholder, value, onChange, error, textarea = false, required = false }) => {
  const [isFocused, setIsFocused] = useState(false)

  const inputClasses = `
    w-full px-4 py-3 font-mono text-sm
    bg-cyber-black/50 border rounded-lg
    text-white placeholder-gray-500
    transition-all duration-300
    ${error 
      ? 'border-red-500 focus:border-red-500' 
      : isFocused 
        ? 'border-neon-green shadow-[0_0_20px_rgba(0,255,136,0.2)]' 
        : 'border-white/10 hover:border-white/20'
    }
    focus:outline-none
  `

  return (
    <div className="space-y-2">
      <label className="block font-mono text-sm text-gray-400">
        <span className="text-neon-green">{'>'}</span> {label}
        {required && <span className="text-red-500 ml-1">*</span>}
        {error && <span className="text-red-500 ml-2">({error})</span>}
      </label>
      {textarea ? (
        <textarea
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          rows={5}
          required={required}
          className={`${inputClasses} resize-none`}
        />
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          required={required}
          className={inputClasses}
        />
      )}
    </div>
  )
}

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error' | null
  const [errorMessage, setErrorMessage] = useState('')

  const formRef = useRef(null)
  const isInView = useInView(formRef, { once: true })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'too short'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'invalid format'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'too short (min 10 chars)'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate form
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)
    setErrorMessage('')

    try {
      // Submit to Formspree
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'No Subject',
          message: formData.message,
          _subject: `Portfolio Contact: ${formData.subject || 'New Message'}`,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setSubmitStatus('error')
        if (data.errors) {
          setErrorMessage(data.errors.map(err => err.message).join(', '))
        } else {
          setErrorMessage('Something went wrong. Please try again.')
        }
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
      setErrorMessage('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
      
      // Auto-hide success message after 5 seconds
      if (submitStatus !== 'error') {
        setTimeout(() => setSubmitStatus(null), 5000)
      }
    }
  }

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8">
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
            className="inline-block px-4 py-1 mb-4 font-mono text-sm text-neon-pink border border-neon-pink/30 rounded-full"
          >
            {'// GET IN TOUCH'}
          </motion.span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-6">
            <span className="text-white">Let's </span>
            <span 
              style={{
                background: 'linear-gradient(135deg, #00ff88 0%, #00d4ff 50%, #a855f7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Connect
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400">
            Have a project in mind or want to collaborate? I'd love to hear from you.
            Drop me a message and let's create something amazing together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.type}
                  href={info.href}
                  target={info.href?.startsWith('http') ? '_blank' : undefined}
                  rel={info.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className={`flex items-center gap-4 p-4 rounded-xl glass border border-white/10 hover:border-neon-green/50 transition-all duration-300 ${
                    info.href ? 'cursor-pointer' : 'cursor-default'
                  }`}
                >
                  <div className="p-3 rounded-lg bg-neon-green/10 text-neon-green">
                    {info.icon}
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 font-mono">{info.type}</div>
                    <div className="text-white font-medium">{info.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h3 className="font-mono text-sm text-gray-500 mb-4">
                {'// CONNECT WITH ME'}
              </h3>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="p-3 rounded-xl glass border border-white/10 text-gray-400 hover:text-neon-green hover:border-neon-green/30 transition-all duration-300"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Terminal-style message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-4 rounded-xl bg-cyber-black/50 border border-neon-green/20"
            >
              <div className="font-mono text-sm space-y-1">
                <div className="text-gray-500">$ contact --status</div>
                <div className="text-neon-green">
                  <span className="animate-pulse">●</span> Status: Available
                </div>
                <div className="text-gray-400">Response time: ~24 hours</div>
                <div className="text-gray-400">Timezone: GMT+5:30</div>
              </div>
            </motion.div>

            {/* Quick response badge */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 p-4 rounded-xl glass border border-neon-purple/30"
            >
              <div className="text-3xl">⚡</div>
              <div>
                <div className="font-semibold text-white">Quick Response</div>
                <div className="text-sm text-gray-400">Usually reply within 24 hours</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Form Header */}
              <div className="flex items-center gap-2 pb-4 border-b border-white/10">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="ml-2 font-mono text-sm text-gray-400">
                  send_message.sh
                </span>
              </div>

              {/* Form Fields */}
              <div className="grid sm:grid-cols-2 gap-6">
                <FormField
                  label="name"
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                  required
                />
                <FormField
                  label="email"
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  required
                />
              </div>

              <FormField
                label="subject"
                type="text"
                name="subject"
                placeholder="Project Collaboration"
                value={formData.subject}
                onChange={handleChange}
                error={errors.subject}
              />

              <FormField
                label="message"
                name="message"
                placeholder="Tell me about your project..."
                value={formData.message}
                onChange={handleChange}
                error={errors.message}
                textarea
                required
              />

              {/* Honeypot field for spam protection (hidden) */}
              <input
                type="text"
                name="_gotcha"
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`
                  relative w-full py-4 font-mono font-semibold rounded-lg
                  overflow-hidden transition-all duration-300
                  ${isSubmitting 
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                    : 'bg-neon-green text-cyber-black hover:shadow-[0_0_30px_rgba(0,255,136,0.5)]'
                  }
                `}
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <span>Send Message</span>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                )}
                
                {/* Animated shine effect */}
                {!isSubmitting && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                )}
              </motion.button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-lg font-mono text-sm bg-neon-green/10 border border-neon-green/30 text-neon-green"
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Message sent successfully! I'll get back to you soon.</span>
                  </span>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-lg font-mono text-sm bg-red-500/10 border border-red-500/30 text-red-500"
                >
                  <span className="flex items-start gap-2">
                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>
                      {errorMessage || 'Something went wrong. Please try again.'}
                      <button
                        type="button"
                        onClick={() => setSubmitStatus(null)}
                        className="ml-2 underline hover:no-underline"
                      >
                        Dismiss
                      </button>
                    </span>
                  </span>
                </motion.div>
              )}

              {/* Privacy note */}
              <p className="text-xs text-gray-500 text-center font-mono">
                <span className="text-neon-purple">*</span> Your information is secure and will never be shared.
                <br />
                <span className="text-gray-600">Powered by Formspree</span>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact