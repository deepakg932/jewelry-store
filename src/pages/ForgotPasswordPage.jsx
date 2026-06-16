// src/pages/ForgotPasswordPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Mail,
  ArrowLeft,
  Send,
  CheckCircle,
  AlertCircle,
  Gem,
  Shield,
  Sparkles,
  Heart,
  Award,
  ChevronRight,
} from "lucide-react";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate API call - Replace with actual API call
    setTimeout(() => {
      if (email && email.includes('@')) {
        setSuccess(true);
        // In production, call your API here
        // await apiService.forgotPassword(email);
      } else {
        setError('Please enter a valid email address');
      }
      setLoading(false);
    }, 1500);
  };

  const benefits = [
    { icon: <Shield size={18} />, text: "Secure Password Reset" },
    { icon: <Sparkles size={18} />, text: "Quick Recovery" },
    { icon: <Heart size={18} />, text: "Account Protection" },
    { icon: <Award size={18} />, text: "24/7 Support" },
  ];

  return (
    <>
      <Helmet>
        <title>Forgot Password | LUMIÈRE Jewelry</title>
        <meta name="description" content="Reset your LUMIÈRE account password" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-block group">
              <h1 className="text-3xl font-light tracking-[0.2em]">
                LUMI<span className="text-gray-900 font-medium">ÈRE</span>
              </h1>
              <div className="h-px w-0 bg-gray-900 transition-all duration-300 group-hover:w-full mt-1 mx-auto"></div>
            </Link>
          </div>

          {/* Horizontal Forgot Password Card */}
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left Side - Form */}
              <div className="p-8 lg:p-10">
                {/* Back Button */}
                <Link 
                  to="/login" 
                  className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-6 group"
                >
                  <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                  <span className="text-sm">Back to Login</span>
                </Link>

                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                    <Mail className="w-8 h-8 text-gray-900" />
                  </div>
                  <h2 className="text-2xl font-light text-gray-900">
                    Reset Password
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Enter your email to receive reset instructions
                  </p>
                </div>

                {!success ? (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {error && (
                      <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
                        <AlertCircle size={16} />
                        {error}
                      </div>
                    )}

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                          placeholder="your@email.com"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        We'll send a password reset link to this email address
                      </p>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Reset Link
                          <Send size={18} />
                        </>
                      )}
                    </button>

                    {/* Register Link */}
                    <div className="text-center pt-4">
                      <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-gray-900 font-medium hover:underline transition">
                          Create Account
                        </Link>
                      </p>
                    </div>
                  </form>
                ) : (
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">
                      Check Your Email
                    </h3>
                    <p className="text-gray-600 text-sm mb-6">
                      We've sent a password reset link to<br />
                      <span className="font-medium text-gray-900">{email}</span>
                    </p>
                    <div className="space-y-3">
                      <button
                        onClick={() => navigate('/login')}
                        className="w-full bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        Return to Login
                        <ChevronRight size={18} />
                      </button>
                      <button
                        onClick={() => {
                          setSuccess(false);
                          setEmail('');
                        }}
                        className="w-full text-gray-600 hover:text-gray-900 text-sm transition-colors"
                      >
                        Use different email address
                      </button>
                    </div>
                  </div>
                )}

                {/* Help Text */}
                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-400">
                    Didn't receive the email? Check your spam folder or{' '}
                    <Link to="/contact" className="text-gray-600 hover:text-gray-900">
                      contact support
                    </Link>
                  </p>
                </div>
              </div>

              {/* Right Side - Benefits & Features */}
              <div className="relative bg-gray-900 p-8 lg:p-10 text-white overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
                  <div className="absolute bottom-10 right-10 w-60 h-60 bg-white rounded-full blur-3xl"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white rounded-full blur-3xl"></div>
                </div>

                <div className="relative z-10 h-full flex flex-col justify-center">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6 backdrop-blur-sm">
                      <Gem className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-light tracking-[0.2em] mb-2">LUMIÈRE</h3>
                    <p className="text-white/90 text-sm">
                      Your journey with luxury jewelry continues
                    </p>
                  </div>

                  <div className="space-y-4">
                    {benefits.map((benefit, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
                      >
                        <div className="text-white">{benefit.icon}</div>
                        <span className="text-sm font-medium">{benefit.text}</span>
                      </div>
                    ))}
                  </div>

                  {/* Security Info */}
                  <div className="mt-8 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium mb-1">Security Guaranteed</p>
                        <p className="text-xs text-white/70">
                          Your account security is our top priority. We use industry-standard encryption to protect your data.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Support Hours */}
                  <div className="mt-6 text-center">
                    <p className="text-xs text-white/70">
                      Need help? Contact our support team 24/7
                    </p>
                    <Link 
                      to="/contact" 
                      className="inline-block text-xs text-white/90 hover:text-white underline mt-1"
                    >
                      support@lumiere.com
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="text-center mt-6">
            <p className="text-xs text-gray-400">
              By continuing, you agree to our{' '}
              <Link to="/terms" className="text-gray-500 hover:text-gray-700">Terms of Service</Link>
              {' '}and{' '}
              <Link to="/privacy" className="text-gray-500 hover:text-gray-700">Privacy Policy</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;