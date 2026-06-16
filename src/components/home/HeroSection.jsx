// src/components/home/HeroSection.jsx
import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { apiService } from '@services/api'

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [heroSlides, setHeroSlides] = useState([])
  const [loading, setLoading] = useState(true)
  const intervalRef = useRef(null)

  // Fetch banners from API
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setLoading(true)
        const banners = await apiService.getBanners()
        
        // Transform API banners to slide format
        const transformedSlides = banners
          .filter(banner => banner.isActive) // Only active banners
          .map((banner, index) => ({
            id: banner.id,
            image: banner.imageUrl,
            title: banner.title || 'Luxury Collection',
            subtitle: banner.subtitle || 'Discover timeless elegance',
            badge: banner.badge || 'Special Collection',
            ctaText: banner.ctaText || 'Shop Now',
            ctaLink: banner.ctaLink || '/shop'
          }))
        
        setHeroSlides(transformedSlides)
        
        // Reset to first slide when new banners are loaded
        if (transformedSlides.length > 0) {
          setCurrentSlide(0)
        }
      } catch (error) {
        console.error('Error fetching banners:', error)
        setHeroSlides([])
      } finally {
        setLoading(false)
      }
    }

    fetchBanners()
  }, [])

  const nextSlide = () => {
    if (isAnimating || heroSlides.length === 0) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    setTimeout(() => setIsAnimating(false), 800)
  }

  const prevSlide = () => {
    if (isAnimating || heroSlides.length === 0) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
    setTimeout(() => setIsAnimating(false), 800)
  }

  const goToSlide = (index) => {
    if (isAnimating || index === currentSlide || heroSlides.length === 0) return
    setIsAnimating(true)
    setCurrentSlide(index)
    setTimeout(() => setIsAnimating(false), 800)
  }

  // Auto-play carousel
  useEffect(() => {
    if (heroSlides.length === 0 || heroSlides.length === 1) return
    
    intervalRef.current = setInterval(nextSlide, 6000)
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [currentSlide, heroSlides.length])

  // Pause auto-play on hover
  const pauseAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  const resumeAutoPlay = () => {
    if (heroSlides.length === 0 || heroSlides.length === 1) return
    intervalRef.current = setInterval(nextSlide, 6000)
  }

  // Touch events for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      nextSlide()
    }
    if (touchStart - touchEnd < -75) {
      prevSlide()
    }
  }

  // Loading state
  if (loading) {
    return (
      <section className="relative h-screen min-h-[700px] w-full overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4" />
            <p className="text-white/60 text-sm tracking-wider uppercase">Loading...</p>
          </div>
        </div>
      </section>
    )
  }

  // If no banners, don't render anything
  if (heroSlides.length === 0) {
    return null
  }

  return (
    <section 
      className="relative h-screen min-h-[700px] w-full overflow-hidden"
      onMouseEnter={pauseAutoPlay}
      onMouseLeave={resumeAutoPlay}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
      <div className="relative h-full w-full">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-out ${
              index === currentSlide
                ? 'opacity-100 scale-100 z-10'
                : index < currentSlide
                ? 'opacity-0 -translate-x-full scale-95 z-0'
                : 'opacity-0 translate-x-full scale-95 z-0'
            }`}
          >
            {/* Background Image with Zoom Effect */}
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt={slide.title}
                className={`w-full h-full object-cover transition-transform duration-[8000ms] ${
                  index === currentSlide ? 'scale-110' : 'scale-100'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-black/60" />
            </div>

            {/* Animated Gradient Orbs */}
            <div className="absolute inset-0 z-1 opacity-30">
              <div className="absolute top-20 -left-4 w-72 h-72 bg-white/10 rounded-full mix-blend-overlay filter blur-xl animate-blob" />
              <div className="absolute top-40 -right-4 w-72 h-72 bg-white/10 rounded-full mix-blend-overlay filter blur-xl animate-blob animation-delay-2000" />
              <div className="absolute -bottom-8 left-20 w-72 h-72 bg-white/10 rounded-full mix-blend-overlay filter blur-xl animate-blob animation-delay-4000" />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center justify-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {/* Badge */}
                <div className={`inline-block mb-6 transition-all duration-700 delay-200 ${
                  index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                  <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-light tracking-wider uppercase">
                    <span className="w-1.5 h-1.5 bg-white rounded-full mr-2 animate-pulse" />
                    {slide.badge}
                  </span>
                </div>

                {/* Title */}
                <h1 className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-white mb-6 transition-all duration-700 delay-400 ${
                  index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                  {slide.title.split(' ').map((word, i, arr) => (
                    <React.Fragment key={i}>
                      {i === 0 && <span className="block font-serif">{word}</span>}
                      {i === 1 && <span className="block font-light tracking-[0.2em]">{word}</span>}
                      {i > 1 && ` ${word}`}
                    </React.Fragment>
                  ))}
                </h1>

                {/* Decorative Line */}
                <div className={`flex justify-center gap-2 mb-8 transition-all duration-700 delay-600 ${
                  index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                }`}>
                  <div className="w-12 h-px bg-white/60" />
                  <div className="w-3 h-3 rounded-full bg-white/80" />
                  <div className="w-12 h-px bg-white/60" />
                </div>

                {/* Description */}
                <p className={`text-white/90 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light backdrop-blur-sm px-6 py-4 rounded-2xl bg-black/10 transition-all duration-700 delay-800 ${
                  index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                  {slide.subtitle}
                </p>

                {/* CTA Buttons */}
                <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-700 delay-1000 ${
                  index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                  <Link 
                    to={slide.ctaLink} 
                    className="group relative px-8 py-3.5 bg-white text-gray-900 font-medium tracking-wide rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {slide.ctaText}
                      <svg 
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>

                  <Link 
                    to="/about" 
                    className="group px-8 py-3.5 bg-transparent border border-white/40 text-white font-medium tracking-wide rounded-full transition-all duration-300 hover:bg-white hover:text-gray-900 hover:border-white hover:scale-105 backdrop-blur-sm"
                  >
                    <span className="flex items-center gap-2">
                      Learn More
                      <svg 
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows - Only show if more than 1 slide */}
      {heroSlides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-300 hover:bg-white/20 hover:scale-110 group"
            aria-label="Previous slide"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-300 hover:bg-white/20 hover:scale-110 group"
            aria-label="Next slide"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dots Indicator - Only show if more than 1 slide */}
      {heroSlides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide
                  ? 'w-8 h-2 bg-white'
                  : 'w-2 h-2 bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 z-20 hidden md:block animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <span className="text-white/40 text-xs tracking-wider uppercase font-light">Scroll</span>
          <svg 
            className="w-5 h-5 text-white/40" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Slide Counter */}
      {heroSlides.length > 1 && (
        <div className="absolute top-8 right-8 z-20 hidden lg:block">
          <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
            <span className="text-white text-sm font-light tracking-wide">
              {String(currentSlide + 1).padStart(2, '0')} / {String(heroSlides.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      )}

      <style>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </section>
  )
}

export default HeroSection