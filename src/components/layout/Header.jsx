// src/components/layout/Header.jsx
import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '@context/CartContext'
import { useWishlist } from '@context/WishlistContext'
import { useScrollPosition } from '@hooks/useScrollPosition'
import { apiService } from '@services/api'
import { useAuth } from '@context/AuthContext';

const Header = () => {
  const { getTotalItems, setIsOpen } = useCart()
  const { count } = useWishlist()
  const location = useLocation()
  const { scrollY } = useScrollPosition()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [navLinks, setNavLinks] = useState([])
  const [loading, setLoading] = useState(true)
  const { user, isAuthenticated } = useAuth();
  const isScrolled = scrollY > 20

  // Fetch header menus from API
  useEffect(() => {
    const fetchMenus = async () => {
      try {
        setLoading(true)
        const headerMenus = await apiService.getHeaderMenus()
        
        // Transform API menu data to navigation format
        const transformedMenus = headerMenus.map(menu => ({
          name: menu.name,
          path: getMenuPath(menu.name)
        }))
        
        setNavLinks(transformedMenus)
      } catch (error) {
        console.error('Error fetching header menus:', error)
        // Fallback to default menus if API fails
        setNavLinks([
          { name: 'Home', path: '/' },
          { name: 'Shop', path: '/shop' },
          { name: 'About', path: '/about' },
          { name: 'Contact', path: '/contact' }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchMenus()
  }, [])

  // Helper function to determine path based on menu name
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
      default:
        // For custom pages, create a slug from the menu name
        return `/${menuLower.replace(/ /g, '-')}`
    }
  }

  // Loading skeleton
  if (loading) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo Skeleton */}
            <div className="w-32 h-8 bg-gray-200 animate-pulse rounded" />
            
            {/* Desktop Navigation Skeleton */}
            <div className="hidden lg:flex items-center gap-12">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-16 h-4 bg-gray-200 animate-pulse rounded" />
              ))}
            </div>
            
            {/* Icons Skeleton */}
            <div className="flex items-center gap-6 lg:gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-5 h-5 bg-gray-200 animate-pulse rounded-full" />
              ))}
            </div>
          </div>
        </div>
      </header>
    )
  }

  return (
    <>
      <header className={`
        fixed top-0 left-0 right-0 z-50 
        transition-all duration-500 ease-out
        ${isScrolled 
          ? 'bg-white backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.08)] border-b border-black/5' 
          : 'bg-white border-b border-black/5'
        }
      `}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <Link 
              to="/" 
              className="group relative z-10"
            >
              <span className="text-3xl lg:text-4xl font-light tracking-[0.3em] text-gray-900">
                LUMIÈRE
              </span>
              <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-gray-900 to-gray-600 transition-all duration-500 group-hover:w-full" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-12">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`
                    relative text-sm font-light tracking-wide uppercase
                    transition-all duration-300 py-2
                    ${location.pathname === link.path 
                      ? 'text-gray-900' 
                      : 'text-gray-500 hover:text-gray-900'
                    }
                  `}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gray-900" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Right Icons */}
            <div className="flex items-center gap-6 lg:gap-8">
              {/* Search Button */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="relative group"
                aria-label="Search"
              >
                <svg 
                  className="w-5 h-5 text-gray-600 transition-all duration-300 group-hover:text-gray-900 group-hover:scale-110" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="1.5" 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                  />
                </svg>
              </button>

              {/* Wishlist */}
              <Link 
                to="/wishlist" 
                className="relative group"
                aria-label="Wishlist"
              >
                <svg 
                  className="w-5 h-5 text-gray-600 transition-all duration-300 group-hover:text-gray-900 group-hover:scale-110" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="1.5" 
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                  />
                </svg>
                {count > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-[11px] font-medium rounded-full w-5 h-5 flex items-center justify-center shadow-lg animate-scale-in">
                    {count > 9 ? '9+' : count}
                  </span>
                )}
              </Link>

              {isAuthenticated ? (
  <Link to="/profile" className="relative group" aria-label="Profile">
    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-all duration-300">
      <span className="text-sm font-medium">
        {user?.name?.charAt(0).toUpperCase()}
      </span>
    </div>
  </Link>
) : (
  <Link to="/login" className="relative group" aria-label="Login">
    <svg className="w-5 h-5 text-gray-600 transition-all duration-300 group-hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  </Link>
)}

              {/* Cart */}
              <button 
                onClick={() => setIsOpen(true)} 
                className="relative group"
                aria-label="Cart"
              >
                <svg 
                  className="w-5 h-5 text-gray-600 transition-all duration-300 group-hover:text-gray-900 group-hover:scale-110" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="1.5" 
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" 
                  />
                </svg>
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-[11px] font-medium rounded-full w-5 h-5 flex items-center justify-center shadow-lg animate-scale-in">
                    {getTotalItems() > 9 ? '9+' : getTotalItems()}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button 
                className="lg:hidden relative w-6 h-6 focus:outline-none"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Menu"
              >
                <span className={`
                  absolute h-[2px] w-6 bg-gray-900 rounded-full
                  transition-all duration-300 ease-out
                  ${mobileMenuOpen ? 'rotate-45 top-3' : 'top-1.5'}
                `} />
                <span className={`
                  absolute h-[2px] w-6 bg-gray-900 rounded-full top-3
                  transition-all duration-300 ease-out
                  ${mobileMenuOpen ? 'opacity-0' : ''}
                `} />
                <span className={`
                  absolute h-[2px] w-6 bg-gray-900 rounded-full
                  transition-all duration-300 ease-out
                  ${mobileMenuOpen ? '-rotate-45 top-3' : 'top-4.5'}
                `} />
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className={`
          absolute top-full left-0 right-0 bg-white border-b border-black/5
          transition-all duration-300 ease-out overflow-hidden
          ${searchOpen ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}
        `}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full px-5 py-4 pr-12 text-gray-900 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:border-gray-400 focus:bg-white transition-all duration-300"
                autoFocus={searchOpen}
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <>
        {mobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
        <div className={`
          fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-white shadow-2xl z-50 lg:hidden
          transition-transform duration-500 ease-out transform
          ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}>
          <div className="flex flex-col h-full">
            <div className="flex justify-end p-6">
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex-1 px-8 py-4">
              <nav className="flex flex-col gap-1">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`
                      py-4 text-lg font-light tracking-wide uppercase
                      transition-all duration-300 border-b border-gray-100
                      ${location.pathname === link.path 
                        ? 'text-gray-900 translate-x-2' 
                        : 'text-gray-500 hover:text-gray-900 hover:translate-x-2'
                      }
                    `}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="p-8 border-t border-gray-100">
              <p className="text-xs text-gray-400 tracking-wide text-center">
                © 2024 LUMIÈRE. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </>

      {/* Global animation styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scale-in {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </>
  )
}

export default Header