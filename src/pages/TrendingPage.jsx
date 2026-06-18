// src/pages/TrendingPage.jsx - Final Fixed Version
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { apiService } from '@services/api';
import ProductCard from '@components/ui/ProductCard';
import { 
  Flame, 
  Filter, 
  Grid3x3, 
  LayoutList, 
  ChevronDown,
  Search,
  Star,
  ShoppingBag
} from 'lucide-react';

const TrendingPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [summary, setSummary] = useState(null);
  const [filters, setFilters] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('rank');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMetal, setSelectedMetal] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('🔄 Fetching trending products...');
        
        const response = await apiService.getTrendingProducts();
        console.log('📦 Full Response:', response);
        
        // Extract products from response.data
        let productsData = [];
        let summaryData = null;
        let filtersData = null;
        
        if (response) {
          // Check for data in different formats
          if (response.data && Array.isArray(response.data)) {
            productsData = response.data;
            console.log('✅ Products from response.data:', productsData.length);
          } else if (response.products && Array.isArray(response.products)) {
            productsData = response.products;
            console.log('✅ Products from response.products:', productsData.length);
          } else if (Array.isArray(response)) {
            productsData = response;
            console.log('✅ Products from response array:', productsData.length);
          }
          
          // Get summary - use the correct field names from API
          if (response.summary) {
            summaryData = {
              total_products: productsData.length,
              total_orders: response.summary.total_transactions || 0,
              total_revenue: response.summary.total_revenue || 0,
              total_sold: response.summary.total_items_sold || 0,
              average_order_value: response.summary.average_order_value || 0
            };
            console.log('✅ Summary:', summaryData);
          }
          
          if (response.filters) {
            filtersData = response.filters;
          }
        }
        
        console.log('✅ Final products data:', productsData);
        
        // Transform products
       
        
      
        
        setProducts(productsData);
        setFilteredProducts(productsData);
        
        if (summaryData) {
          setSummary(summaryData);
        }
        if (filtersData) {
          setFilters(filtersData);
        }
        
      } catch (err) {
        console.error('❌ Error fetching trending products:', err);
        setError('Failed to load trending products');
        setProducts([]);
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingProducts();
  }, []);

  // Filter and sort products
  useEffect(() => {
    let result = [...products];

    if (searchQuery) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.metal_type?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedMetal !== 'all') {
      result = result.filter(product =>
        product.metal_type?.toLowerCase() === selectedMetal.toLowerCase()
      );
    }

    switch (sortBy) {
      case 'rank':
        result.sort((a, b) => (a.rank || 999) - (b.rank || 999));
        break;
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        result.sort((a, b) => (b.total_quantity_sold || 0) - (a.total_quantity_sold || 0));
        break;
      case 'revenue':
        result.sort((a, b) => (b.total_revenue || 0) - (a.total_revenue || 0));
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  }, [products, searchQuery, selectedMetal, sortBy]);

  const getMetalTypes = () => {
    const metals = new Set();
    products.forEach(p => {
      if (p.metal_type) metals.add(p.metal_type);
    });
    return ['all', ...Array.from(metals)];
  };

  const sortOptions = [
    { value: 'rank', label: 'Trending Rank' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'revenue', label: 'Highest Revenue' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-12 w-48 bg-gray-200 rounded-lg mx-auto mb-3 animate-pulse" />
            <div className="h-4 w-64 bg-gray-100 rounded-lg mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-gray-200 rounded-2xl mb-4" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-100 rounded w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-50 rounded-full mb-6">
            <Flame className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-light text-gray-900 mb-4">Unable to Load Trending Products</h2>
          <p className="text-gray-500 mb-8">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-6">
            <Flame className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-2xl font-light text-gray-900 mb-4">No Trending Products Yet</h2>
          <p className="text-gray-500 mb-8">Check back soon for the hottest trends!</p>
          <Link 
            to="/shop"
            className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Browse All Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Trending Products | LUMIÈRE Jewelry</title>
        <meta name="description" content="Discover the most trending and popular jewelry pieces at LUMIÈRE" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-8 lg:mb-12">
            <div className="inline-block mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-50 to-red-50 text-orange-600 text-xs font-light tracking-wider uppercase border border-orange-200">
                <Flame className="w-3.5 h-3.5" />
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
                Hottest Picks
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-gray-900 mb-3">
              Trending <span className="font-serif italic">Now</span>
            </h1>
            
            <div className="flex justify-center gap-2 mb-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-gray-400" />
              <div className="w-2 h-2 rounded-full bg-gray-400" />
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-gray-400" />
            </div>
            
            <p className="text-gray-500 text-base max-w-md mx-auto font-light">
              Most sought-after pieces everyone's talking about
            </p>
          </div>

          {/* Summary Stats - Fixed with correct field names */}
          {summary && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
                <p className="text-2xl font-light text-gray-900">{summary.total_products || products.length}</p>
                <p className="text-xs text-gray-500 mt-1">Trending Products</p>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
                <p className="text-2xl font-light text-gray-900">{summary.total_orders || 0}</p>
                <p className="text-xs text-gray-500 mt-1">Total Orders</p>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
                <p className="text-2xl font-light text-gray-900">${summary.total_revenue || 0}</p>
                <p className="text-xs text-gray-500 mt-1">Revenue Generated</p>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
                <p className="text-2xl font-light text-gray-900">{summary.total_sold || 0}</p>
                <p className="text-xs text-gray-500 mt-1">Items Sold</p>
              </div>
            </div>
          )}

          {/* Search and Filter Bar */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex-1 w-full md:w-auto relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search trending products..."
                  className="w-full md:w-80 px-4 py-2.5 pl-10 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200 transition-all duration-300 text-sm"
                />
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="md:hidden flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm hover:bg-gray-50 transition-colors"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                  <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </button>

                <div className="hidden sm:flex items-center gap-1 p-1 bg-gray-100 rounded-xl">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      viewMode === 'grid' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Grid3x3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      viewMode === 'list' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <LayoutList className="w-4 h-4" />
                  </button>
                </div>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200 transition-all duration-300"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      Sort by: {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {showFilters && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Metal Type</label>
                  <div className="flex flex-wrap gap-2">
                    {getMetalTypes().map((metal) => (
                      <button
                        key={metal}
                        onClick={() => setSelectedMetal(metal)}
                        className={`px-3 py-1 rounded-full text-sm transition-all ${
                          selectedMetal === metal
                            ? 'bg-gray-900 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {metal === 'all' ? 'All' : metal}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="mb-6 text-gray-500">
            Showing {filteredProducts.length} of {products.length} trending products
          </div>

          {/* Products Grid/List */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {products.map((product, idx) => (
                <div
                  key={product.id}
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${Math.min(idx * 0.05, 0.8)}s forwards`,
                    opacity: 0,
                    transform: 'translateY(20px)'
                  }}
                >
                  <ProductCard product={product} index={idx} source="trending"/>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative w-full sm:w-48 h-48 overflow-hidden rounded-xl bg-gray-100">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/200x200?text=No+Image';
                        }}
                      />
                      {product.rank && (
                        <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                          <Flame className="w-3 h-3" />
                          #{product.rank}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 space-y-3">
                      <div>
                        <h3 className="font-serif text-xl font-bold text-gray-900">{product.name}</h3>
                        <p className="text-gray-500 text-sm">{product.sku}</p>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-gray-600">{product.metal_type}</span>
                        {product.purity && (
                          <>
                            <span className="w-1 h-1 rounded-full bg-gray-300" />
                            <span className="text-gray-600">{product.purity}</span>
                          </>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <ShoppingBag className="w-4 h-4" />
                          {product.total_quantity_sold || 0} sold
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          {product.rating || 4.8}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-gray-900">
                          ${product.price}
                        </span>
                        <Link
                          to={`/product/${product.id}`}
                          state={{ from: 'trending' }}
                          className="px-4 py-2 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No Results */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-light text-gray-900 mb-2">No trending products found</h3>
              <p className="text-gray-500">Try adjusting your filters or search terms.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedMetal('all');
                }}
                className="mt-4 text-gray-600 hover:text-gray-900 underline text-sm"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
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
    </>
  );
};

export default TrendingPage;