// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@context/AuthContext';
import { Helmet } from 'react-helmet-async';
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserPlus,
  Phone,
  Shield,
  Sparkles,
  ChevronRight,
  AlertCircle,
  Gem,
  Heart,
  Truck,
  Award,
} from "lucide-react";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!/(?=.*[A-Za-z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain both letters and numbers";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "You must accept the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      const { confirmPassword, acceptTerms, ...registerData } = formData;
      const result = await register(registerData);
      
      if (result.success) {
        navigate('/profile');
      } else {
        setErrors({ submit: result.error || 'Registration failed. Please try again.' });
      }
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const passwordStrength = () => {
    const password = formData.password;
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return Math.min(strength, 4);
  };

  const strengthText = ["Weak", "Fair", "Good", "Strong"];
  const strengthColors = [
    "bg-red-500",
    "bg-yellow-500",
    "bg-blue-500",
    "bg-green-500",
  ];

  const benefits = [
    { icon: <Shield size={18} />, text: "Secure Registration" },
    { icon: <Sparkles size={18} />, text: "15% off first order" },
    { icon: <Truck size={18} />, text: "Free Shipping over $100" },
    { icon: <Heart size={18} />, text: "Wishlist & Favorites" },
    { icon: <Gem size={18} />, text: "Premium Quality" },
    { icon: <Award size={18} />, text: "Rewards Program" },
  ];

  return (
    <>
      <Helmet>
        <title>Create Account | LUMIÈRE Jewelry</title>
        <meta name="description" content="Create a new account at LUMIÈRE" />
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

          {/* Horizontal Register Form Card */}
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left Side - Form */}
              <div className="p-8 lg:p-10">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                    <UserPlus className="w-8 h-8 text-gray-900" />
                  </div>
                  <h2 className="text-2xl font-light text-gray-900">
                    Create Account
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Join the LUMIÈRE family
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {errors.submit && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                      {errors.submit}
                    </div>
                  )}

                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                            errors.name
                              ? "border-red-400 focus:ring-red-100"
                              : "border-gray-200 focus:border-gray-900 focus:ring-gray-100"
                          }`}
                          placeholder="Full name"
                        />
                      </div>
                      {errors.name && (
                        <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle size={12} />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                            errors.email
                              ? "border-red-400 focus:ring-red-100"
                              : "border-gray-200 focus:border-gray-900 focus:ring-gray-100"
                          }`}
                          placeholder="Email address"
                        />
                      </div>
                      {errors.email && (
                        <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle size={12} />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                          errors.phone
                            ? "border-red-400 focus:ring-red-100"
                            : "border-gray-200 focus:border-gray-900 focus:ring-gray-100"
                        }`}
                        placeholder="Phone number"
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle size={12} />
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Password & Confirm Password Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-10 py-2.5 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                            errors.password
                              ? "border-red-400 focus:ring-red-100"
                              : "border-gray-200 focus:border-gray-900 focus:ring-gray-100"
                          }`}
                          placeholder="Create password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      {formData.password && (
                        <div className="mt-2">
                          <div className="flex gap-1 mb-1">
                            {[...Array(4)].map((_, i) => (
                              <div
                                key={i}
                                className={`h-1 flex-1 rounded-full transition-all ${
                                  i < passwordStrength()
                                    ? strengthColors[passwordStrength() - 1]
                                    : "bg-gray-200"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-xs text-gray-500">
                            Strength: {strengthText[passwordStrength() - 1] || "Weak"}
                          </p>
                        </div>
                      )}
                      {errors.password && (
                        <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle size={12} />
                          {errors.password}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-10 py-2.5 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                            errors.confirmPassword
                              ? "border-red-400 focus:ring-red-100"
                              : "border-gray-200 focus:border-gray-900 focus:ring-gray-100"
                          }`}
                          placeholder="Confirm password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle size={12} />
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Terms & Conditions */}
                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      name="acceptTerms"
                      checked={formData.acceptTerms}
                      onChange={handleChange}
                      className="mt-0.5 w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                    />
                    <label className="text-sm text-gray-600">
                      I agree to the{" "}
                      <Link to="/terms" className="text-gray-900 hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link to="/privacy" className="text-gray-900 hover:underline">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                  {errors.acceptTerms && (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle size={12} />
                      {errors.acceptTerms}
                    </p>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Creating Account...
                      </>
                    ) : (
                      <>
                        Create Account
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
                      <span className="px-3 bg-white text-gray-500">Or sign up with</span>
                    </div>
                  </div>

                  {/* Social Sign Up - Optional, can be removed if not needed */}
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

                  {/* Login Link */}
                  <div className="text-center pt-2">
                    <p className="text-sm text-gray-600">
                      Already have an account?{" "}
                      <Link to="/login" className="text-gray-900 font-medium hover:underline transition">
                        Sign In
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
                      Join our community and experience luxury jewelry at its finest
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
                      "Absolutely love my purchase! The quality is exceptional and customer service is outstanding."
                    </p>
                    <p className="text-xs font-medium mt-2 text-white/80">— Sarah M.</p>
                    <div className="flex gap-1 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                  </div>

                  {/* Member Counter */}
                  <div className="mt-6 text-center">
                    <p className="text-xs text-white/70">Join 50,000+ happy customers</p>
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

export default RegisterPage;