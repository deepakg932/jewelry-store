// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@context/AuthContext';
import { Helmet } from 'react-helmet-async';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  ChevronRight,
  AlertCircle,
  Gem,
  Heart,
  Shield,
  Sparkles,
  Award,
} from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.error || 'Failed to login. Please check your credentials.');
    }
    setLoading(false);
  };

  const benefits = [
    { icon: <Shield size={18} />, text: "Secure Login" },
    { icon: <Sparkles size={18} />, text: "Exclusive Offers" },
    { icon: <Heart size={18} />, text: "Save Favorites" },
    { icon: <Award size={18} />, text: "Reward Points" },
  ];

  return (
    <>
      <Helmet>
        <title>Login | LUMIÈRE Jewelry</title>
        <meta name="description" content="Login to your LUMIÈRE account" />
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

          {/* Horizontal Login Form Card */}
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left Side - Form */}
              <div className="p-8 lg:p-10">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                    <LogIn className="w-8 h-8 text-gray-900" />
                  </div>
                  <h2 className="text-2xl font-light text-gray-900">
                    Welcome Back
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Sign in to your LUMIÈRE account
                  </p>
                </div>

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
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  {/* Forgot Password */}
                  <div className="flex justify-end">
                    <Link 
                      to="/forgot-password" 
                      className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign In
                        <ChevronRight size={18} />
                      </>
                    )}
                  </button>

                  {/* Divider */}
                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-3 bg-white text-gray-500">Or continue with</span>
                    </div>
                  </div>

                  {/* Social Login */}
                  <div className="grid grid-cols-3 gap-3">
                    <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition group">
                      <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                      </svg>
                      <span className="text-sm text-gray-600 hidden sm:inline">Facebook</span>
                    </button>
                    <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition group">
                      <svg className="w-5 h-5 text-sky-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.968-12.108c0-.213 0-.425-.015-.637A10.025 10.025 0 0024 4.557z"/>
                      </svg>
                      <span className="text-sm text-gray-600 hidden sm:inline">Twitter</span>
                    </button>
                    <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition group">
                      <svg className="w-5 h-5 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                      </svg>
                      <span className="text-sm text-gray-600 hidden sm:inline">Instagram</span>
                    </button>
                  </div>

                  {/* Register Link */}
                  <div className="text-center pt-2">
                    <p className="text-sm text-gray-600">
                      Don't have an account?{' '}
                      <Link to="/register" className="text-gray-900 font-medium hover:underline transition">
                        Create Account
                      </Link>
                    </p>
                  </div>
                </form>
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
                      Welcome back to luxury jewelry at its finest
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

                  {/* Testimonial */}
                  <div className="mt-8 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                    <p className="text-sm italic text-white/90">
                      "LUMIÈRE offers the most elegant jewelry collection. Their customer service is exceptional!"
                    </p>
                    <p className="text-xs font-medium mt-2 text-white/80">— Jessica R.</p>
                    <div className="flex gap-1 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                  </div>

                  {/* Special Offer */}
                  <div className="mt-6 text-center">
                    <p className="text-xs text-white/70">Sign in to unlock exclusive offers & rewards</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;