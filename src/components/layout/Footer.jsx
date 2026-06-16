// src/components/layout/Footer.jsx
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { apiService } from '@services/api'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [footerMenus, setFooterMenus] = useState([])
  const [socialLinks, setSocialLinks] = useState([])
  const [loading, setLoading] = useState(true)
  const [contactInfo, setContactInfo] = useState({
    email: 'info@lumiere.com',
    phone: '+1 (555) 123-4567',
    address: '123 Luxury Lane, Jewelry District'
  })

  // Fetch footer data from API
  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        setLoading(true)
        const [menus, socials] = await Promise.all([
          apiService.getFooterMenus(),
          apiService.getActiveSocialLinks()
        ])
        
        setFooterMenus(menus)
        setSocialLinks(socials)
        
        // Try to fetch contact info from a contact page or settings if available
        try {
          const contactPage = await apiService.getPageBySlug('contact')
          if (contactPage && contactPage.content) {
            // You can parse contact info from page content or create a separate API endpoint
            // For now, keep default contact info
          }
        } catch (error) {
          console.log('No contact page found, using default contact info')
        }
        
      } catch (error) {
        console.error('Error fetching footer data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFooterData()
  }, [])

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      // You can integrate newsletter subscription API here
      console.log('Subscribing email:', email)
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  // Helper function to get menu path
  const getMenuPath = (menuName) => {
    const menuLower = menuName.toLowerCase()
    
    switch (menuLower) {
      case 'home':
        return '/'
      case 'about':
      case 'about us':
        return '/about'
      case 'contact':
      case 'contact us':
        return '/contact'
      case 'shop':
        return '/shop'
      case 'wishlist':
        return '/wishlist'
      case 'faq':
        return '/faq'
      case 'privacy policy':
        return '/privacy'
      case 'terms':
      case 'terms and consdition':
      case 'terms of service':
        return '/terms'
      case 'shipping info':
      case 'returns & exchanges':
        return '/shipping'
      default:
        return `/${menuLower.replace(/ /g, '-')}`
    }
  }

  // Group menus by category or just display all footer menus
  // You can customize this logic based on your menu structure
  const getMenuItemsByCategory = () => {
    // If you have menu categories, you can filter them
    // For now, we'll split menus into two columns: Quick Links and Support
    const allMenus = footerMenus
    const midPoint = Math.ceil(allMenus.length / 2)
    
    return {
      quickLinks: allMenus.slice(0, midPoint),
      support: allMenus.slice(midPoint)
    }
  }

  const { quickLinks, support } = getMenuItemsByCategory()

  // Render social media icon based on platform
  const getSocialIcon = (platform) => {
    const icons = {
      facebook: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
        </svg>
      ),
      instagram: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
        </svg>
      ),
      twitter: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.968-12.108c0-.213 0-.425-.015-.637A10.025 10.025 0 0024 4.557z"/>
        </svg>
      ),
      pinterest: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.163-1.5-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.607 0 11.985-5.365 11.985-11.987C23.999 5.365 18.624 0 12.017 0z"/>
        </svg>
      ),
      linkedin: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.771-.773 1.771-1.729V1.729C24 .774 23.204 0 22.225 0z"/>
        </svg>
      ),
      youtube: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.376.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.376-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    }
    
    const platformLower = platform?.toLowerCase() || ''
    return icons[platformLower] || icons.facebook
  }

  // Loading skeleton
  if (loading) {
    return (
      <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white/80 border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="space-y-4">
                <div className="w-24 h-4 bg-white/10 rounded animate-pulse" />
                <div className="space-y-2">
                  {[1, 2, 3, 4].map(j => (
                    <div key={j} className="w-32 h-3 bg-white/5 rounded animate-pulse" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white/80 border-t border-white/10 mt-20">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1.5 space-y-4">
            <Link to="/">
              <h3 className="text-2xl font-light tracking-[0.2em] text-white hover:text-gray-300 transition-colors">
                LUMIÈRE
              </h3>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed font-light">
              Timeless elegance crafted for the modern soul.
            </p>
            
            {/* Social Links - Dynamic from API */}
            <div className="flex gap-3 pt-2">
              {socialLinks.map(link => (
                <a 
                  key={link.id}
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all duration-300 hover:scale-110"
                  aria-label={link.platform}
                >
                  <span className="text-gray-400 group-hover:text-white transition-colors">
                    {getSocialIcon(link.platform)}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links - Dynamic from API */}
          {quickLinks.length > 0 && (
            <div>
              <h4 className="font-light text-white text-sm tracking-wider uppercase mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2">
                {quickLinks.map(menu => (
                  <li key={menu.id}>
                    <Link 
                      to={getMenuPath(menu.name)} 
                      className="text-gray-400 text-sm hover:text-white transition-colors duration-300 inline-block hover:translate-x-1 transform"
                    >
                      {menu.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Support Links - Dynamic from API */}
          {support.length > 0 && (
            <div>
              <h4 className="font-light text-white text-sm tracking-wider uppercase mb-4">
                Support
              </h4>
              <ul className="space-y-2">
                {support.map(menu => (
                  <li key={menu.id}>
                    <Link 
                      to={getMenuPath(menu.name)} 
                      className="text-gray-400 text-sm hover:text-white transition-colors duration-300 inline-block hover:translate-x-1 transform"
                    >
                      {menu.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Contact Column */}
          <div>
            <h4 className="font-light text-white text-sm tracking-wider uppercase mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <svg className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-400 text-sm">{contactInfo.email}</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-gray-400 text-sm">{contactInfo.phone}</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-400 text-sm">{contactInfo.address}</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="font-light text-white text-sm tracking-wider uppercase mb-4">
              Newsletter
            </h4>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to get special offers, free giveaways, and exclusive deals.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2.5 bg-white text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-100 transition-all duration-300 hover:scale-105 transform"
              >
                Subscribe
              </button>
            </form>
            {subscribed && (
              <div className="mt-3 text-green-400 text-xs text-center animate-fade-in">
                Thanks for subscribing! 🎉
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-xs">
              © {new Date().getFullYear()} LUMIÈRE. All rights reserved.
            </p>
            
            <div className="flex gap-6">
              {footerMenus.slice(0, 3).map(menu => (
                <Link 
                  key={menu.id}
                  to={getMenuPath(menu.name)} 
                  className="text-gray-500 text-xs hover:text-white transition-colors"
                >
                  {menu.name}
                </Link>
              ))}
            </div>
            
            {/* Payment Methods */}
            <div className="flex gap-3">
              <div className="w-8 h-5 bg-white/10 rounded"></div>
              <div className="w-8 h-5 bg-white/10 rounded"></div>
              <div className="w-8 h-5 bg-white/10 rounded"></div>
              <div className="w-8 h-5 bg-white/10 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </footer>
  )
}

export default Footer