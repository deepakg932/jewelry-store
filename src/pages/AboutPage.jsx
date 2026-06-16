// src/pages/AboutPage.jsx
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { apiService } from "@services/api";

const AboutPage = () => {
  const [pageContent, setPageContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutPage = async () => {
      try {
        setLoading(true);
        const data = await apiService.getPageBySlug('about-us');
        
        if (data && data.content) {
          setPageContent(data);
        } else {
          setError('Page content not found');
        }
      } catch (err) {
        console.error('Error fetching about page:', err);
        setError('Failed to load page content');
      } finally {
        setLoading(false);
      }
    };

    fetchAboutPage();
  }, []);

  // Stats data - You can also fetch this from API if you have a stats endpoint
  const stats = [
    { value: "5+", label: "Years of Excellence", icon: "🏆", key: "years" },
    { value: "15k+", label: "Happy Customers", icon: "😊", key: "customers" },
    { value: "50+", label: "Unique Designs", icon: "✨", key: "designs" },
    { value: "100%", label: "Ethically Sourced", icon: "🌱", key: "ethical" },
  ];

  // Helper function to render content with paragraphs
  const renderContent = (content) => {
    if (!content) return null;
    
    // Split content by double newlines or periods for paragraphs
    const paragraphs = content.split(/\n\n+/);
    
    return paragraphs.map((paragraph, index) => (
      <p key={index} className="text-gray-600 leading-relaxed mb-6">
        {paragraph.trim()}
      </p>
    ));
  };

  if (loading) {
    return (
      <>
        <Helmet>
          <title>About Us | LUMIÈRE Jewelry</title>
          <meta name="description" content="Learn about LUMIÈRE - modern minimalist jewelry crafted with intention and care." />
        </Helmet>

        <div className="pt-24">
          {/* Hero Skeleton */}
          <div className="relative h-[50vh] min-h-[400px] bg-gray-200 animate-pulse" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-3xl mx-auto">
              <div className="animate-pulse space-y-6">
                <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error || !pageContent) {
    return (
      <>
        <Helmet>
          <title>About Us | LUMIÈRE Jewelry</title>
        </Helmet>

        <div className="pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-50 rounded-full mb-6">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-light text-gray-900 mb-4">Page Not Found</h1>
            <p className="text-gray-500 mb-8">The about page content is currently unavailable.</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{pageContent.title || 'About Us'} | LUMIÈRE Jewelry</title>
        <meta 
          name="description" 
          content={pageContent.meta_description || "Learn about LUMIÈRE - modern minimalist jewelry crafted with intention and care."} 
        />
        {pageContent.meta_keywords && (
          <meta name="keywords" content={pageContent.meta_keywords} />
        )}
      </Helmet>

      <div className="pt-24">
        {/* Hero Section */}
        <div className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
          {pageContent.featured_image ? (
            <img
              src={pageContent.featured_image}
              alt={pageContent.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800" />
          )}
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-4">
              {pageContent.title || 'Our Story'}
            </h1>
            <div className="flex justify-center gap-2 mb-4">
              <div className="w-12 h-px bg-white/60" />
              <div className="w-2 h-2 rounded-full bg-white/80" />
              <div className="w-12 h-px bg-white/60" />
            </div>
            <p className="text-white/90 text-lg max-w-2xl mx-auto font-light">
              {pageContent.meta_description || 'Modern minimalist jewelry crafted with intention, quality, and care.'}
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl mx-auto">
            {/* Main Content */}
            <div className="mb-16">
              <div className="prose prose-gray max-w-none">
                {renderContent(pageContent.content)}
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {stats.map((stat) => (
                <div
                  key={stat.key}
                  className="text-center p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="text-4xl mb-3">{stat.icon}</div>
                  <div className="text-2xl font-light text-gray-900">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-500 mt-2 font-light tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Craftsmanship Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
              <div className="group overflow-hidden rounded-2xl">
                <img
                  src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=600&h=400&fit=crop"
                  alt="Craftsmanship"
                  className="rounded-2xl w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h2 className="text-2xl md:text-3xl font-light tracking-tight text-gray-900 mb-4">
                  Crafted with Precision
                </h2>
                <div className="w-12 h-px bg-gray-300 mb-6" />
                <p className="text-gray-600 leading-relaxed mb-4">
                  Every piece of jewelry that leaves our studio undergoes
                  rigorous quality checks. Our master craftsmen combine
                  traditional techniques with modern technology to create pieces
                  that last a lifetime.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  From the initial sketch to the final polish, we ensure that
                  each detail meets our exacting standards.
                </p>
              </div>
            </div>

            {/* Sustainability Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="order-2 md:order-1 flex flex-col justify-center">
                <h2 className="text-2xl md:text-3xl font-light tracking-tight text-gray-900 mb-4">
                  Sustainable Luxury
                </h2>
                <div className="w-12 h-px bg-gray-300 mb-6" />
                <p className="text-gray-600 leading-relaxed mb-4">
                  We're committed to reducing our environmental footprint. Our
                  materials are sourced from certified ethical suppliers, and
                  our packaging is 100% recyclable.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  We believe that luxury shouldn't come at the cost of the
                  planet. That's why we're constantly innovating to make our
                  processes more sustainable.
                </p>
              </div>
              <div className="order-1 md:order-2 group overflow-hidden rounded-2xl">
                <img
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop"
                  alt="Sustainability"
                  className="rounded-2xl w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-16 text-center">
              <div className="bg-gray-50 rounded-2xl p-8 md:p-12 border border-gray-100">
                <h3 className="text-xl md:text-2xl font-light text-gray-900 mb-3">
                  Discover Our Collection
                </h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  Explore our range of timeless pieces designed to be cherished for years to come.
                </p>
                <a 
                  href="/shop" 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all duration-300 hover:scale-105"
                >
                  Shop Now
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;