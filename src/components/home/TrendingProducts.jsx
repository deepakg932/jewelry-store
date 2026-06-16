// src/components/home/TrendingProducts.jsx
import React, { useState, useEffect, useRef } from "react";
import ProductCard from "@components/ui/ProductCard";
import { apiService } from "@services/api";
import { Flame } from "lucide-react";

const TrendingProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  console.log(products)

  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        console.log('🔄 Fetching trending products...');
        const response = await apiService.getTrendingProducts();
        console.log('📦 Response:', response);
        
        // Extract products from response
        let productsData = [];
        if (response && response.products && Array.isArray(response.products)) {
          productsData = response.products;
        } else if (response && Array.isArray(response)) {
          productsData = response;
        }
        
        console.log('✅ Products found:', productsData.length);
        
        // Transform products to match ProductCard expected format (exactly like FeaturedProducts)
        const transformedProducts = productsData.map(product => ({
          id: product.id,
          name: product.name,
          price: product.price || 0,
          originalPrice: product.originalPrice || null,
          images: product.images ,
          category: product.category || product.metal_type || 'Jewelry',
          inStock: product.inStock !== false,
          isNew: false,
          isBestseller: product.rank <= 3 || false,
          sku: product.sku || `TR-${product.id}`,
          description: product.description || '',
          net_weight: product.net_weight || null,
          metal_type: product.metal_type || '',
          purity: product.purity || '',
          total_quantity_sold: product.total_quantity_sold || 0,
          total_orders: product.total_orders || 0,
          rank: product.rank || 0,
          rating: product.rating || 4.8,
          reviews: product.reviews || 10,
          badge: product.rank <= 3 ? 'Trending 🔥' : null,
        }));
        
        setProducts(transformedProducts.slice(0, 8));
      } catch (error) {
        console.error("Error fetching trending products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTrendingProducts();
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
            <div className="w-24 h-0.5 bg-gray-200 mx-auto mb-4" />
            <div className="h-8 w-48 bg-gray-200 rounded-lg mx-auto mb-3 animate-pulse" />
            <div className="h-4 w-64 bg-gray-100 rounded-lg mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-gray-200 rounded-2xl mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-100 rounded w-1/2"></div>
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
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-50 to-red-50 text-orange-600 text-xs font-light tracking-wider uppercase border border-orange-200">
              <Flame className="w-3.5 h-3.5" />
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              Hottest Picks
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-gray-900 mb-3">
            Trending <span className="font-serif italic">Now</span>
          </h2>
          
          <div className="flex justify-center gap-2 mb-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-gray-400" />
            <div className="w-2 h-2 rounded-full bg-gray-400" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-gray-400" />
          </div>
          
          <p className="text-gray-500 text-base max-w-md mx-auto font-light">
            Most sought-after pieces everyone's talking about
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
              <ProductCard product={product} index={idx} />
            </div>
          ))}
        </div>

        {/* View All Button */}
        {products.length > 0 && (
          <div className="text-center mt-12 lg:mt-16">
            <a 
              href="/trending"
              className="group relative inline-flex items-center justify-center px-8 py-3 border border-gray-300 rounded-full hover:border-gray-900 transition-all duration-300 hover:shadow-lg overflow-hidden"
            >
              <span className="relative z-10 text-gray-700 group-hover:text-gray-900 text-sm font-light tracking-wide uppercase flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-500" />
                View All Trending Products
              </span>
              <svg 
                className="relative z-10 w-4 h-4 ml-2 text-gray-700 group-hover:text-gray-900 group-hover:translate-x-1 transition-all duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
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

export default TrendingProducts;