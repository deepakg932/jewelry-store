import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Send,
  Crown,
  Sparkles,
  Mail,
  Phone,
  User,
  MessageCircle,
  Calendar,
  Gem,
  Clock,
  CheckCircle,
  Shield,
  Star,
  ArrowRight,
  Heart,
  ChevronRight,
  Diamond,
  Award,
  ThumbsUp,
  X,
  MapPin
} from 'lucide-react';
import toast from 'react-hot-toast';
import { apiService } from '@services/api';
import { formatPrice } from '@utils/formatters';

// If you have an AuthContext, uncomment the line below and use it.
// import { useAuth } from '@context/AuthContext';

const EnquiryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const productData = location.state || {};

  // Get user ID from auth context or localStorage
  // Option 1: using AuthContext (recommended)
  // const { user } = useAuth();
  // const userId = user?.id || null;

  // Option 2: fallback to localStorage (if you store user data after login)
  const userData = JSON.parse(localStorage.getItem('user') || '{}');
  const userId = userData?.id || null;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    message: productData.productId
      ? `I'm interested in the product: ${productData.productName} (ID: ${productData.productId})`
      : '',
    product_id: productData.productId || null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Payload exactly as per API requirement
      const payload = {
        user_id: userId, // Include user_id (could be null if not logged in)
        mobile: formData.phone,
        email: formData.email,
        address: formData.address || '',
        message: formData.message,
        product_id: formData.product_id, // Could be null
      };

      await apiService.submitEnquiry(payload);

      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success('Thank you for your enquiry! Our team will contact you within 24 hours.', {
        icon: '✨',
        duration: 5000,
        style: {
          background: '#FFFFFF',
          color: '#8B7355',
          border: '1px solid #D4C5A9',
        },
      });

      setTimeout(() => {
        setIsSubmitted(false);
        navigate('/');
      }, 3000);
    } catch (error) {
      console.error('Enquiry submission error:', error);
      toast.error('Failed to send enquiry. Please try again.');
      setIsSubmitting(false);
    }
  };

  // If submitted, show success screen
  if (isSubmitted) {
    return (
      <>
        <Helmet>
          <title>Enquiry Submitted | LUMIÈRE</title>
          <meta name="description" content="Your enquiry has been submitted successfully. Our team will contact you soon." />
        </Helmet>
        <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-amber-100">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-gray-500/10 rounded-full blur-3xl"></div>
                  <div className="relative w-24 h-24 bg-gradient-to-r from-amber-100 to-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-12 h-12 text-amber-600" />
                  </div>
                </div>
                <h1 className="text-3xl md:text-4xl font-light mb-3 text-gray-900">
                  Enquiry <span className="font-medium text-amber-600">Submitted!</span>
                </h1>
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-6"></div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Thank you for your interest in LUMIÈRE. Our luxury concierge will review your enquiry
                  and get back to you within 24 hours.
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-amber-600">
                  <Sparkles className="w-4 h-4" />
                  <span>A confirmation email has been sent to your inbox</span>
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Enquiry | LUMIÈRE Jewelry</title>
        <meta name="description" content="Request a consultation for custom jewelry design, private appointments, or general enquiries. Our luxury concierge is at your service." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-amber-50/30 via-white to-gray-50/30 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="mb-6 inline-flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors group"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>

          {/* Animated Background Elements */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-gray-500/5 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
          </div>

          {/* Header Section */}
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 relative">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50/80 border border-amber-200 mb-6">
              <Diamond className="w-4 h-4 text-amber-600" />
              <span className="text-amber-700 text-sm font-light tracking-wide">LUXURY CONSULTATION</span>
              <Sparkles className="w-4 h-4 text-amber-600" />
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-gray-900 mb-4">
              {productData.productName ? (
                <>Enquire about <span className="font-serif italic text-amber-600">{productData.productName}</span></>
              ) : (
                <>Let's Create <span className="block font-serif italic text-amber-600 mt-1">Something Beautiful</span></>
              )}
            </h1>

            <div className="w-20 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto my-6"></div>

            <p className="text-gray-500 text-base md:text-lg font-light leading-relaxed">
              {productData.productName
                ? `Share your interest in this piece and our team will assist you with pricing and availability.`
                : `Share your vision with us. Whether it's a custom masterpiece, private viewing, or general enquiry — our team is at your service.`
              }
            </p>
          </div>

          {/* Product Preview (if product data exists) */}
          {productData.productName && (
            <div className="max-w-2xl mx-auto mb-8 bg-white rounded-2xl shadow-lg border border-amber-100 p-4 flex items-center gap-4">
              {productData.productImage && (
                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={`https://jewelerybillingsoftware.com/storage/${productData.productImage}`}
                    alt={productData.productName}
                    className="w-full h-full object-cover"
                    onError={(e) => e.target.src = 'https://via.placeholder.com/80x80?text=No+Image'}
                  />
                </div>
              )}
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{productData.productName}</h4>
                {productData.productPrice && (
                  <p className="text-gray-500 text-sm">{formatPrice(productData.productPrice)}</p>
                )}
                <p className="text-xs text-gray-400">Product ID: {productData.productId}</p>
              </div>
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-amber-100 p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name (collected but not sent) */}
                  <div className="group">
                    <label className="block text-sm font-light text-gray-700 mb-2 transition-all group-hover:text-amber-600">
                      <User className="w-4 h-4 inline mr-1" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className={`w-full bg-gray-50 border rounded-lg px-4 py-3 text-gray-800 transition-all outline-none ${
                        focusedField === 'name'
                          ? 'border-amber-400 ring-2 ring-amber-100 bg-white'
                          : 'border-gray-200 hover:border-amber-300'
                      }`}
                      placeholder="Your full name"
                    />
                  </div>

                  {/* Email */}
                  <div className="group">
                    <label className="block text-sm font-light text-gray-700 mb-2 transition-all group-hover:text-amber-600">
                      <Mail className="w-4 h-4 inline mr-1" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className={`w-full bg-gray-50 border rounded-lg px-4 py-3 text-gray-800 transition-all outline-none ${
                        focusedField === 'email'
                          ? 'border-amber-400 ring-2 ring-amber-100 bg-white'
                          : 'border-gray-200 hover:border-amber-300'
                      }`}
                      placeholder="your@email.com"
                    />
                  </div>

                  {/* Phone (maps to mobile) */}
                  <div className="group">
                    <label className="block text-sm font-light text-gray-700 mb-2 transition-all group-hover:text-amber-600">
                      <Phone className="w-4 h-4 inline mr-1" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className={`w-full bg-gray-50 border rounded-lg px-4 py-3 text-gray-800 transition-all outline-none ${
                        focusedField === 'phone'
                          ? 'border-amber-400 ring-2 ring-amber-100 bg-white'
                          : 'border-gray-200 hover:border-amber-300'
                      }`}
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  {/* Address */}
                  <div className="group">
                    <label className="block text-sm font-light text-gray-700 mb-2 transition-all group-hover:text-amber-600">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={`w-full bg-gray-50 border rounded-lg px-4 py-3 text-gray-800 transition-all outline-none ${
                        focusedField === 'address'
                          ? 'border-amber-400 ring-2 ring-amber-100 bg-white'
                          : 'border-gray-200 hover:border-amber-300'
                      }`}
                      placeholder="123, Park Street, Mumbai - 400001"
                    />
                  </div>

                  {/* Message */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-light text-gray-700 mb-2">
                      <MessageCircle className="w-4 h-4 inline mr-1" />
                      Your Message / Requirements *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 focus:bg-white outline-none transition-all resize-none hover:border-amber-300"
                      placeholder="Describe your vision, requirements, or any specific questions you have for our team..."
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full bg-gray-900 text-white font-light tracking-wide py-4 px-8 rounded-full transition-all duration-300 hover:bg-gray-800 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin inline-block mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 inline mr-2 transition-transform group-hover:translate-x-1" />
                        Submit Enquiry
                        <ArrowRight className="w-5 h-5 inline ml-2 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                    <span className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 group-hover:translate-x-full"></span>
                  </button>
                </div>
              </form>
            </div>

            {/* Sidebar - Concierge Info (unchanged) */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-amber-100">
                  <div className="text-center">
                    <div className="inline-flex p-3 bg-amber-50 rounded-full mb-4">
                      <Crown className="w-8 h-8 text-amber-600" />
                    </div>
                    <h3 className="text-xl font-light tracking-wide mb-1">
                      Luxury <span className="font-medium text-amber-600">Concierge</span>
                    </h3>
                    <div className="w-12 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto my-4"></div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-amber-50 transition-all group cursor-pointer">
                      <Phone className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wide">CALL US</p>
                        <p className="text-gray-800 font-medium">+91 98765 43210</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-amber-50 transition-all group cursor-pointer">
                      <Mail className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wide">EMAIL US</p>
                        <p className="text-gray-800 font-medium">hello@lumiere.com</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-amber-50 transition-all group cursor-pointer">
                      <Clock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wide">BUSINESS HOURS</p>
                        <p className="text-gray-700 text-sm">Mon-Sat: 10 AM - 7 PM</p>
                        <p className="text-gray-400 text-sm">Sunday: By Appointment</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-amber-100">
                  <h4 className="text-md font-light tracking-wide mb-4 text-center">What Happens Next?</h4>
                  <div className="space-y-4">
                    {[
                      { step: 1, text: "Our team reviews your enquiry", icon: <Shield className="w-4 h-4" /> },
                      { step: 2, text: "We contact you within 24 hours", icon: <Phone className="w-4 h-4" /> },
                      { step: 3, text: "Schedule private consultation", icon: <Calendar className="w-4 h-4" /> },
                      { step: 4, text: "Begin your luxury journey", icon: <Diamond className="w-4 h-4" /> }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 group cursor-pointer">
                        <div className="relative">
                          <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-sm text-amber-700 font-medium group-hover:scale-110 transition-transform">
                            {item.step}
                          </div>
                          {idx < 3 && (
                            <div className="absolute left-1/2 -translate-x-1/2 top-full w-px h-3 bg-gradient-to-b from-amber-300 to-transparent"></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-600 group-hover:text-amber-700 transition-colors">
                            {item.text}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-2xl shadow-lg p-6 text-center border border-amber-100">
                  <div className="flex justify-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">Trusted by 10,000+ customers</p>
                  <div className="flex justify-center gap-4 mt-4">
                    <Award className="w-5 h-5 text-amber-400" />
                    <ThumbsUp className="w-5 h-5 text-amber-400" />
                    <Heart className="w-5 h-5 text-amber-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes pulseSlow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        .animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; opacity: 0; }
        .animate-scale-in { animation: scaleIn 0.5s ease-out forwards; }
        .animate-pulse-slow { animation: pulseSlow 4s ease-in-out infinite; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-600 { animation-delay: 0.6s; }
        .delay-1000 { animation-delay: 1s; }
      `}</style>
    </>
  );
};

export default EnquiryPage;