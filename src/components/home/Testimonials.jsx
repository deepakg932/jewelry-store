// src/components/home/Testimonials.jsx
import React, { useState, useEffect, useRef } from 'react'
import { staticTestimonials } from '@data/products'

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

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

  // Auto-rotate testimonials on mobile
  useEffect(() => {
    if (window.innerWidth < 768) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % staticTestimonials.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [])

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % staticTestimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + staticTestimonials.length) % staticTestimonials.length)
  }

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 bg-gradient-to-br from-gray-500/10 to-gray-500/10 overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gray-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gray-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-gray-50 to-transparent rounded-full blur-3xl opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className={`inline-block mb-4 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
          }`}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-900/5 text-gray-600 text-xs font-light tracking-wider uppercase border border-gray-200">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Trusted by Thousands
            </span>
          </div>
          
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-gray-900 mb-3 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}>
            What Our <span className="font-serif italic">Customers</span> Say
          </h2>
          
          <div className={`flex justify-center gap-2 mb-4 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}>
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-gray-400" />
            <div className="w-2 h-2 rounded-full bg-gray-400" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-gray-400" />
          </div>
          
          <p className={`text-gray-500 text-base max-w-md mx-auto font-light transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}>
            Join 15,000+ happy customers who love their LUMIÈRE pieces
          </p>
        </div>

        {/* Desktop Grid View (hidden on mobile) */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {staticTestimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`group relative bg-white rounded-2xl p-6 lg:p-8 border border-gray-100 hover:border-gray-200 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100 + 400}ms` }}
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <svg className="w-12 h-12 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 transition-all duration-300 ${
                      i < testimonial.rating 
                        ? 'text-yellow-400 fill-yellow-400' 
                        : 'text-gray-200 fill-gray-200'
                    }`}
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2L15 8.5L22 9.5L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9.5L9 8.5L12 2Z" />
                  </svg>
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 text-sm lg:text-base leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </p>

              {/* Customer Info */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <div className="relative">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-md"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 text-sm lg:text-base">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-400 text-xs">{testimonial.role}</p>
                </div>
              </div>

              {/* Hover Gradient Border */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gray-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Mobile Carousel View */}
        <div className="md:hidden relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {staticTestimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg">
                    {/* Quote Icon */}
                    <div className="mb-4">
                      <svg className="w-10 h-10 text-gray-200" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>

                    {/* Rating */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < testimonial.rating 
                              ? 'text-yellow-400 fill-yellow-400' 
                              : 'text-gray-200 fill-gray-200'
                          }`}
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2L15 8.5L22 9.5L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9.5L9 8.5L12 2Z" />
                        </svg>
                      ))}
                    </div>

                    {/* Text */}
                    <p className="text-gray-700 text-sm leading-relaxed mb-6">
                      "{testimonial.text}"
                    </p>

                    {/* Customer */}
                    <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">
                          {testimonial.name}
                        </h4>
                        <p className="text-gray-400 text-xs">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Navigation Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {staticTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`transition-all duration-300 rounded-full ${
                  activeIndex === index
                    ? 'w-8 h-2 bg-gray-900'
                    : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all duration-300"
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all duration-300"
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Trust Indicators */}
        <div className={`mt-16 pt-8 border-t border-gray-200 text-center transition-all duration-700 delay-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`}>
          <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-light text-gray-900">15,000+</div>
              <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-light text-gray-900">4.9</div>
              <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-light text-gray-900">98%</div>
              <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">Recommend Us</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}

export default Testimonials