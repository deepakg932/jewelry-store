// src/pages/ContactPage.jsx
import React, { useState } from 'react';
import Newsletter from '../components/ui/Newsletter';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="pt-24">
        <div className="container-custom py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-heading font-light text-primary tracking-tight">Get in Touch</h1>
              <p className="text-textMedium mt-3">We'd love to hear from you. Send us a message and we'll respond within 24 hours.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-12">
              <div className="flex-1">
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <svg className="w-5 h-5 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <h3 className="font-heading font-medium text-textDark">Email</h3>
                      <p className="text-textMedium text-sm">hello@lumiere.com</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <svg className="w-5 h-5 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <h3 className="font-heading font-medium text-textDark">Phone</h3>
                      <p className="text-textMedium text-sm">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <svg className="w-5 h-5 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <h3 className="font-heading font-medium text-textDark">Studio</h3>
                      <p className="text-textMedium text-sm">123 Minimalist Ave, Design District, NY 10001</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1">
                {submitted ? (
                  <div className="bg-secondary p-8 rounded-xl text-center">
                    <svg className="w-12 h-12 text-accent mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-textDark font-medium">Message Sent!</p>
                    <p className="text-textMedium text-sm mt-2">We'll get back to you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-borderLight rounded-xl focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-borderLight rounded-xl focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-borderLight rounded-xl focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>
                    <div>
                      <textarea
                        name="message"
                        rows={5}
                        placeholder="Your Message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-borderLight rounded-xl focus:outline-none focus:border-accent transition-colors resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full px-6 py-3 bg-primary text-white text-sm font-heading font-medium rounded-xl hover:bg-primary/90 transition-all duration-300"
                    >
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Newsletter />
    </>
  );
};

export default ContactPage;