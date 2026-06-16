// src/pages/ResetPasswordPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Gem,
  Shield,
  Sparkles,
  ChevronRight,
  Key,
} from "lucide-react";

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (!/(?=.*[A-Za-z])(?=.*\d)/.test(formData.password)) {
      setError('Password must contain both letters and numbers');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    // Simulate API call - Replace with actual API call
    setTimeout(() => {
      setSuccess(true);
      // In production, call your API here
      // await apiService.resetPassword(token, formData.password);
      setLoading(false);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    }, 1500);
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
    { icon: <Shield size={18} />, text: "Strong Password Protection" },
    { icon: <Sparkles size={18} />, text: "Secure Account Recovery" },
    { icon: <Key size={18} />, text: "Encrypted Data" },
    { icon: <CheckCircle size={18} />, text: "Instant Access" },
  ];

  return (
    <>
      <Helmet>
        <title>Reset Password | LUMIÈRE Jewelry</title>
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

          {/* Horizontal Reset Password Card */}
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left Side - Form */}
              <div className="p-8 lg:p-10">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                    <Key className="w-8 h-8 text-gray-900" />
                  </div>
                  <h2 className="text-2xl font-light text-gray-900">
                    Create New Password
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Enter your new password below
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

                    {/* New Password */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                          placeholder="Enter new password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
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
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                          placeholder="Confirm new password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                        >
                          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>

                    {/* Password Requirements */}
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs font-medium text-gray-700 mb-2">Password Requirements:</p>
                      <ul className="text-xs text-gray-600 space-y-1">
                        <li className="flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full ${formData.password.length >= 6 ? 'bg-green-500' : 'bg-gray-300'}`} />
                          At least 6 characters
                        </li>
                        <li className="flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full ${/[A-Z]/.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'}`} />
                          At least one uppercase letter
                        </li>
                        <li className="flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full ${/[0-9]/.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'}`} />
                          At least one number
                        </li>
                      </ul>
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
                          Resetting Password...
                        </>
                      ) : (
                        <>
                          Reset Password
                          <ChevronRight size={18} />
                        </>
                      )}
                    </button>

                    {/* Back to Login */}
                    <div className="text-center pt-4">
                      <Link to="/login" className="text-sm text-gray-600 hover:text-gray-900 transition-colors inline-flex items-center gap-1">
                        ← Back to Login
                      </Link>
                    </div>
                  </form>
                ) : (
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">
                      Password Reset Successfully!
                    </h3>
                    <p className="text-gray-600 text-sm mb-6">
                      Your password has been changed.<br />
                      Redirecting you to login...
                    </p>
                    <div className="w-12 h-12 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin mx-auto"></div>
                  </div>
                )}
              </div>

              {/* Right Side - Benefits & Features */}
              <div className="relative bg-gray-900 p-8 lg:p-10 text-white overflow-hidden">
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
                      Your security is our priority
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

                  {/* Security Tips */}
                  <div className="mt-8 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                    <h4 className="text-sm font-medium mb-2">Security Tips:</h4>
                    <ul className="text-xs text-white/70 space-y-1">
                      <li>• Never share your password with anyone</li>
                      <li>• Use a unique password for this account</li>
                      <li>• Enable two-factor authentication</li>
                      <li>• Change password regularly</li>
                    </ul>
                  </div>

                  {/* Contact Support */}
                  <div className="mt-6 text-center">
                    <p className="text-xs text-white/70">
                      Having trouble?{' '}
                      <Link to="/contact" className="text-white/90 hover:text-white underline">
                        Contact Support
                      </Link>
                    </p>
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

export default ResetPasswordPage;