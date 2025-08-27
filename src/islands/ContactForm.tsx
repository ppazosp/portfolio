import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContactFormProps {
  className?: string;
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactForm({ className = '' }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Create mailto link
      const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      const mailtoLink = `mailto:pablo@osixtech.com?subject=${subject}&body=${body}`;
      
      // Open mailto link
      window.location.href = mailtoLink;
      
      // Show success state
      setIsSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' });
        setIsSubmitted(false);
      }, 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        className={`border-subtle rounded-lg p-6 bg-background ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-center">
          <div className="w-12 h-12 border border-foreground rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-foreground font-mono">✓</span>
          </div>
          <h3 className="text-lg font-mono text-foreground mb-2">Message Sent</h3>
          <p className="text-sm text-muted font-mono">
            Your email client should open with the message pre-filled.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`border-subtle rounded-lg p-6 bg-background ${className}`}>
      <div className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-mono text-foreground mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-background border border-border rounded font-mono text-sm text-foreground placeholder-muted focus:outline-none focus:border-foreground transition-colors"
            placeholder="Your name"
          />
          <AnimatePresence>
            {errors.name && (
              <motion.p
                className="mt-1 text-xs font-mono text-red-400"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                {errors.name}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-mono text-foreground mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-background border border-border rounded font-mono text-sm text-foreground placeholder-muted focus:outline-none focus:border-foreground transition-colors"
            placeholder="your.email@example.com"
          />
          <AnimatePresence>
            {errors.email && (
              <motion.p
                className="mt-1 text-xs font-mono text-red-400"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                {errors.email}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-mono text-foreground mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 bg-background border border-border rounded font-mono text-sm text-foreground placeholder-muted focus:outline-none focus:border-foreground transition-colors resize-none"
            placeholder="Your message..."
          />
          <AnimatePresence>
            {errors.message && (
              <motion.p
                className="mt-1 text-xs font-mono text-red-400"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                {errors.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-background border border-foreground rounded font-mono text-sm text-foreground hover:bg-foreground hover:text-background transition-colors duration-200"
        >
          Send Message
        </button>
      </div>
    </form>
  );
}