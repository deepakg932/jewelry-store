// src/components/ui/InquiryModal.jsx
import React, { useState } from 'react';

const InquiryModal = ({ isOpen, onClose, productName }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setFormData({ name: '', email: '', message: '' });
    }, 2000);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/20 z-50" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-xl z-50 shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-borderLight">
          <h3 className="font-heading text-xl font-medium text-primary">Product Inquiry</h3>
          <button onClick={onClose} className="text-textMedium hover:text-primary">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8">
              <svg className="w-12 h-12 text-accent mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-textDark">Thank you for your inquiry!</p>
              <p className="text-textMedium text-sm mt-2">We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-textDark mb-1">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-borderLight rounded-lg focus:outline-none focus:border-accent transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-textDark mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-borderLight rounded-lg focus:outline-none focus:border-accent transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-textDark mb-1">Message</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  placeholder={`I'm interested in the ${productName}...`}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2 border border-borderLight rounded-lg focus:outline-none focus:border-accent transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-primary text-white text-sm font-heading font-medium rounded-xl hover:bg-primary/90 transition-all duration-300"
              >
                Send Inquiry
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default InquiryModal;