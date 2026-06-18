// src/components/home/LatestProducts.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ProductCard from "@components/ui/ProductCard";
import { apiService } from "@services/api";
import { Sparkles } from "lucide-react";

const LatestProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const response = await apiService.getLatestProducts();
        console.log("Latest products response:", response);
        const productsData = response?.products || [];
        // Map to match ProductCard format
        const transformed = productsData.map((product) => ({
          id: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice || null,
          imageUrl: product.imageUrl,
          category: product.category || "Jewelry",
          inStock: product.inStock !== false,
          isNew: true, // all latest are new
          isBestseller: false,
          sku: product.sku,
          description: product.description,
          net_weight: product.net_weight,
          metal_type: product.metal_type,
          purity: product.purity,
        }));
        setProducts(transformed.slice(0, 8));
      } catch (error) {
        console.error("Error fetching latest products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchLatest();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  if (loading) {
    return (
      <section className="py-20 lg:py-28 bg-gradient-to-b from-gray-50/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-8 w-48 bg-gray-200 rounded-lg mx-auto mb-3 animate-pulse" />
            <div className="h-4 w-64 bg-gray-100 rounded-lg mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-gray-200 rounded-2xl mb-4" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-100 rounded w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 bg-gradient-to-b from-gray-50/30 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-block mb-4 transition-all duration-700 transform opacity-100 translate-y-0">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 text-xs font-light tracking-wider uppercase border border-blue-200">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Fresh Arrivals
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-gray-900 mb-3">
            Latest <span className="font-serif italic">Arrivals</span>
          </h2>

          <div className="flex justify-center gap-2 mb-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-gray-400" />
            <div className="w-2 h-2 rounded-full bg-gray-400" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-gray-400" />
          </div>

          <p className="text-gray-500 text-base max-w-md mx-auto font-light">
            Discover our newest pieces just added to the collection
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {products.map((product, idx) => (
            <div
              key={product.id}
              style={{
                animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s forwards`,
                opacity: 0,
                transform: 'translateY(20px)'
              }}
            >
              <ProductCard product={product} index={idx} source="latest" />
            </div>
          ))}
        </div>

        {/* View All Button */}
        {products.length > 0 && (
          <div className="text-center mt-12 lg:mt-16">
            <Link
              to="/latest"
              className="group relative inline-flex items-center justify-center px-8 py-3 border border-gray-300 rounded-full hover:border-gray-900 transition-all duration-300 hover:shadow-lg overflow-hidden"
            >
              <span className="relative z-10 text-gray-700 group-hover:text-gray-900 text-sm font-light tracking-wide uppercase flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-500" />
                View All New Arrivals
              </span>
              <svg
                className="relative z-10 w-4 h-4 ml-2 text-gray-700 group-hover:text-gray-900 group-hover:translate-x-1 transition-all duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default LatestProducts;