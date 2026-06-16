// src/services/authService.js
class AuthService {
  constructor() {
    this.isAuthenticated = false
    this.user = null
  }

  async login(email, password) {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      if (email && password) {
        this.isAuthenticated = true
        this.user = { email, name: email.split('@')[0] }
        localStorage.setItem('auth_token', 'mock_token_' + Date.now())
        return { success: true, user: this.user }
      }
      throw new Error('Invalid credentials')
    } catch (error) {
      console.error('Login failed:', error)
      return { success: false, error: error.message }
    }
  }

  async register(name, email, password) {
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      this.isAuthenticated = true
      this.user = { email, name }
      localStorage.setItem('auth_token', 'mock_token_' + Date.now())
      return { success: true, user: this.user }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  logout() {
    this.isAuthenticated = false
    this.user = null
    localStorage.removeItem('auth_token')
    return { success: true }
  }

  getCurrentUser() {
    const token = localStorage.getItem('auth_token')
    if (token && !this.user) {
      this.isAuthenticated = true
      this.user = { email: 'user@example.com', name: 'User' }
    }
    return this.user
  }

  isLoggedIn() {
    return this.isAuthenticated || !!localStorage.getItem('auth_token')
  }
}

export const authService = new AuthService()