// src/components/home/OfferSection.jsx
import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Clock, Gift, Truck, Sparkles, ArrowRight, Tag, Gem, Shield, Diamond, Zap, Crown } from 'lucide-react'
import { apiService } from '../../services/api'
import toast from 'react-hot-toast'

const OfferSection = () => {
  const [offers, setOffers] = useState([])
  const [loading, setLoading] = useState(true)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  // Fetch offers from API
  useEffect(() => {
    const fetchOffers = async () => {
      setLoading(true)
      try {
        const offersData = await apiService.getOffers()
        console.log("Fetched offers data:", offersData)
        
        if (offersData && offersData.length > 0) {
          // Map API offers to component format
          const mappedOffers = offersData.map((offer, index) => {
            // Determine icon based on offer title
            let icon = <Tag className="w-6 h-6" />
            const title = offer.title?.toLowerCase() || ''
            
            if (title.includes('shipping') || title.includes('free')) {
              icon = <Truck className="w-6 h-6" />
            } else if (title.includes('gift') || title.includes('welcome') || title.includes('first')) {
              icon = <Gift className="w-6 h-6" />
            } else if (title.includes('diamond')) {
              icon = <Diamond className="w-6 h-6" />
            } else if (title.includes('gold')) {
              icon = <Crown className="w-6 h-6" />
            }
            
            // Calculate valid till date from API
            let validTillText = "Limited period"
            if (offer.valid_to) {
              const validToDate = new Date(offer.valid_to)
              const options = { year: 'numeric', month: 'short', day: 'numeric' }
              validTillText = `Valid till ${validToDate.toLocaleDateString('en-US', options)}`
            }
            
            // Process image URL
            let imageUrl = null
            if (offer.imageUrl) {
              let cleanUrl = offer.imageUrl.replace(/\\\//g, '/')
              if (cleanUrl.startsWith('http://') || cleanUrl.startsWith('https://')) {
                imageUrl = cleanUrl
              } else {
                imageUrl = `https://jewelerybillingsoftware.com/storage/${cleanUrl.replace(/^\/+/, '')}`
              }
            }
            
            // Determine gradient color
            const gradients = [
              "from-amber-500 to-amber-600",
              "from-rose-500 to-rose-600",
              "from-emerald-500 to-emerald-600",
              "from-purple-500 to-purple-600",
              "from-blue-500 to-blue-600",
              "from-indigo-500 to-indigo-600"
            ]
            const gradientIndex = (offer.id || index) % gradients.length
            
            return {
              id: offer.id,
              title: offer.title || "Special Offer",
              discount: offer.discount_percentage ? `${offer.discount_percentage}% OFF` : "Special Deal",
              description: offer.description || "Limited time offer",
              code: offer.code || "",
              color: gradients[gradientIndex],
              icon: icon,
              validTill: validTillText,
              buttonText: offer.button_text || "Shop Now",
              linkUrl: offer.custom_url || offer.link_url || "/shop",
              linkType: offer.link_type || "custom",
              imageUrl: imageUrl
            }
          })
          
          setOffers(mappedOffers)
        } else {
          setOffers([])
        }
      } catch (error) {
        console.error("Error fetching offers:", error)
        toast.error("Failed to load offers", { duration: 3000 })
        setOffers([])
      } finally {
        setLoading(false)
      }
    }
    
    fetchOffers()
  }, [])

  // Set target date (7 days from now for flash sale)
  const targetDate = new Date()
  targetDate.setDate(targetDate.getDate() + 7)
  targetDate.setHours(23, 59, 59, 999)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const difference = targetDate - now

      if (difference <= 0) {
        clearInterval(timer)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleCopyCode = (code) => {
    if (!code) {
      toast.error('No coupon code available', {
        icon: '⚠️',
        duration: 2000,
      })
      return
    }
    
    navigator.clipboard.writeText(code)
    toast.success(`${code} copied to clipboard!`, {
      icon: '📋',
      duration: 2000,
      style: {
        background: '#FFFFFF',
        color: '#b76e79',
        border: '1px solid #b76e79',
        borderRadius: '12px',
      },
    })
  }

  // Don't render if no offers and not loading
  if (!loading && offers.length === 0) {
    return null
  }

  return (
    <section ref={sectionRef} className="py-16 md:py-20 bg-gradient-to-br from-amber-50/50 via-white to-gray-50/50 overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-amber-100/20 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-amber-100/5 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-12">
          <div className={`inline-block mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/80 text-amber-700 text-xs font-light tracking-wider uppercase border border-amber-200">
              <Sparkles className="w-4 h-4" />
              Special Offers
              <Sparkles className="w-4 h-4" />
            </span>
          </div>
          
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-gray-900 mb-3 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            Exclusive <span className="font-serif italic text-amber-600">Deals</span> For You
          </h2>
          
          <div className={`flex justify-center gap-2 mb-4 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-amber-400" />
            <div className="w-2 h-2 rounded-full bg-amber-400" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-amber-400" />
          </div>
          
          <p className={`text-gray-500 text-base max-w-md mx-auto font-light transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            Don't miss out on these amazing offers. Limited time only!
          </p>
        </div>

        {/* Flash Sale Timer */}
        <div className={`mb-12 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gradient-to-r from-gray-700 to-gray-800 rounded-2xl p-6 md:p-8 text-center shadow-xl relative overflow-hidden group">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-white animate-pulse" />
                <span className="text-white text-sm uppercase tracking-wider font-light">Flash Sale Ends In</span>
                <Clock className="w-5 h-5 text-white animate-pulse" />
              </div>
              
              <div className="flex justify-center gap-4 md:gap-8">
                <div className="text-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 md:p-4 min-w-[70px] md:min-w-[90px]">
                    <div className="text-2xl md:text-4xl font-bold text-white">{String(timeLeft.days).padStart(2, '0')}</div>
                    <div className="text-white/80 text-xs uppercase mt-1">Days</div>
                  </div>
                </div>
                <div className="text-2xl md:text-4xl font-bold text-white self-center">:</div>
                <div className="text-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 md:p-4 min-w-[70px] md:min-w-[90px]">
                    <div className="text-2xl md:text-4xl font-bold text-white">{String(timeLeft.hours).padStart(2, '0')}</div>
                    <div className="text-white/80 text-xs uppercase mt-1">Hours</div>
                  </div>
                </div>
                <div className="text-2xl md:text-4xl font-bold text-white self-center">:</div>
                <div className="text-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 md:p-4 min-w-[70px] md:min-w-[90px]">
                    <div className="text-2xl md:text-4xl font-bold text-white">{String(timeLeft.minutes).padStart(2, '0')}</div>
                    <div className="text-white/80 text-xs uppercase mt-1">Minutes</div>
                  </div>
                </div>
                <div className="text-2xl md:text-4xl font-bold text-white self-center">:</div>
                <div className="text-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 md:p-4 min-w-[70px] md:min-w-[90px]">
                    <div className="text-2xl md:text-4xl font-bold text-white">{String(timeLeft.seconds).padStart(2, '0')}</div>
                    <div className="text-white/80 text-xs uppercase mt-1">Seconds</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-amber-100">
                <div className="p-6 md:p-8 space-y-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-xl animate-pulse"></div>
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-16 w-full bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Offer Cards Grid */}
        {!loading && offers.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
            {offers.map((offer, index) => (
              <div
                key={offer.id}
                className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-amber-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 150 + 500}ms` }}
              >
                {/* Gradient Border Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${offer.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`}></div>
                
                <div className="relative bg-white p-6 md:p-8 rounded-2xl">
                  {/* Icon or Image */}
                  {offer.imageUrl ? (
                    <div className="mb-4 rounded-xl overflow-hidden h-32 w-full">
                      <img 
                        src={offer.imageUrl} 
                        alt={offer.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          e.target.style.display = 'none'
                        }}
                      />
                    </div>
                  ) : (
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${offer.color} text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {offer.icon}
                    </div>
                  )}
                  
                  {/* Offer Tag */}
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-50 text-amber-600 text-xs rounded-full border border-amber-200">
                      <Tag className="w-3 h-3" />
                      Limited
                    </span>
                  </div>
                  
                  {/* Title & Discount */}
                  <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-2">{offer.title}</h3>
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{offer.discount}</div>
                  <p className="text-gray-600 text-sm mb-4">{offer.description}</p>
                  
                  {/* Offer Code */}
                  {offer.code && (
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-100 group-hover:border-amber-200 transition-colors">
                      <div className="flex items-center justify-between">
                        <code className="text-amber-600 font-mono text-sm tracking-wider">{offer.code}</code>
                        <button
                          onClick={() => handleCopyCode(offer.code)}
                          className="text-xs text-gray-500 hover:text-amber-600 transition-colors"
                        >
                          Copy Code
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {/* Validity */}
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {offer.validTill}
                  </p>
                  
                  {/* Shop Now Link */}
                  <Link
                    to={offer.linkUrl}
                    target={offer.linkUrl?.startsWith('http') ? "_blank" : "_self"}
                    className="inline-flex items-center gap-2 mt-4 text-sm text-gray-700 group-hover:text-amber-600 transition-colors"
                  >
                    {offer.buttonText}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Feature Highlights */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-amber-100 transition-all duration-700 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center group cursor-pointer">
            <div className="inline-flex p-3 rounded-full bg-amber-50 group-hover:bg-amber-100 transition-colors mb-3">
              <Truck className="w-5 h-5 text-amber-600" />
            </div>
            <h4 className="text-sm font-medium text-gray-800">Free Shipping</h4>
            <p className="text-xs text-gray-400">On orders ₹15,000+</p>
          </div>
          
          <div className="text-center group cursor-pointer">
            <div className="inline-flex p-3 rounded-full bg-amber-50 group-hover:bg-amber-100 transition-colors mb-3">
              <Gem className="w-5 h-5 text-amber-600" />
            </div>
            <h4 className="text-sm font-medium text-gray-800">Authentic Products</h4>
            <p className="text-xs text-gray-400">100% Certified</p>
          </div>
          
          <div className="text-center group cursor-pointer">
            <div className="inline-flex p-3 rounded-full bg-amber-50 group-hover:bg-amber-100 transition-colors mb-3">
              <Shield className="w-5 h-5 text-amber-600" />
            </div>
            <h4 className="text-sm font-medium text-gray-800">Secure Payments</h4>
            <p className="text-xs text-gray-400">SSL Encrypted</p>
          </div>
          
          <div className="text-center group cursor-pointer">
            <div className="inline-flex p-3 rounded-full bg-amber-50 group-hover:bg-amber-100 transition-colors mb-3">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <h4 className="text-sm font-medium text-gray-800">24/7 Support</h4>
            <p className="text-xs text-gray-400">Customer Care</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulseSlow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.05);
          }
        }
        .animate-pulse-slow {
          animation: pulseSlow 4s ease-in-out infinite;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </section>
  )
}

export default OfferSection