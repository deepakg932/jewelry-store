// src/components/ui/Newsletter.jsx
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const Newsletter = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) { toast.success('Subscribed! Check your email.'); setEmail('') }
  }

  return (
    <section className="py-16 bg-background border-t border-borderLight">
      <div className="container-custom max-w-2xl text-center"><h3 className="text-2xl font-heading font-light text-primary tracking-tight mb-2">Join the Circle</h3><p className="text-textMedium text-sm mb-6">Be the first to know about new collections and exclusive offers.</p><form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3"><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="flex-1 px-4 py-3 border border-borderLight rounded-xl focus:outline-none focus:border-accent text-sm" required /><button type="submit" className="px-6 py-3 bg-primary text-white text-sm font-heading font-medium rounded-xl hover:bg-primary/90 transition-all">Subscribe</button></form></div>
    </section>
  )
}

export default Newsletter