// src/pages/LatestPage.jsx
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { apiService } from "@services/api";
import ProductCard from "@components/ui/ProductCard";
import { Sparkles, Search, Filter, Grid3x3, LayoutList, ChevronDown } from "lucide-react";

const LatestPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedMetal, setSelectedMetal] = useState("all");

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        setLoading(true);
        const response = await apiService.getLatestProducts();
        if (response && response.products) {
          const transformed = response.products.map((product) => ({
            id: product.id,
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice || null,
            imageUrl: product.imageUrl,
            category: product.category || "Jewelry",
            inStock: product.inStock !== false,
            isNew: true,
            sku: product.sku,
            description: product.description,
            metal_type: product.metal_type,
            purity: product.purity,
          }));
          setProducts(transformed);
          setFilteredProducts(transformed);
        } else {
          setProducts([]);
          setFilteredProducts([]);
        }
      } catch (err) {
        console.error("Error fetching latest products:", err);
        setError("Failed to load latest products");
      } finally {
        setLoading(false);
      }
    };
    fetchLatest();
  }, []);

  useEffect(() => {
    let result = [...products];
    if (searchQuery) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sku?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.metal_type?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedMetal !== "all") {
      result = result.filter((p) => p.metal_type?.toLowerCase() === selectedMetal.toLowerCase());
    }
    setFilteredProducts(result);
  }, [products, searchQuery, selectedMetal]);

  const metalTypes = ["all", ...new Set(products.map((p) => p.metal_type).filter(Boolean))];

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
            <Sparkles className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-light text-gray-900 mb-4">Unable to Load Latest Products</h2>
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

  return (
    <>
      <Helmet>
        <title>Latest Arrivals | LUMIÈRE Jewelry</title>
        <meta name="description" content="Discover our newest jewelry arrivals" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 lg:mb-12">
            <div className="inline-block mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 text-xs font-light tracking-wider uppercase border border-blue-200">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Fresh Arrivals
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-gray-900 mb-3">
              New Arrivals
            </h1>
            <div className="flex justify-center gap-2 mb-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-gray-400" />
              <div className="w-2 h-2 rounded-full bg-gray-400" />
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-gray-400" />
            </div>
            <p className="text-gray-500 text-base max-w-md mx-auto font-light">
              Be the first to explore our newest pieces
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex-1 w-full md:w-auto relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search new arrivals..."
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
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      viewMode === "grid" ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <Grid3x3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      viewMode === "list" ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <LayoutList className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Metal Type</label>
                  <div className="flex flex-wrap gap-2">
                    {metalTypes.map((metal) => (
                      <button
                        key={metal}
                        onClick={() => setSelectedMetal(metal)}
                        className={`px-3 py-1 rounded-full text-sm transition-all ${
                          selectedMetal === metal
                            ? "bg-gray-900 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {metal === "all" ? "All" : metal}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mb-6 text-gray-500">
            Showing {filteredProducts.length} of {products.length} new arrivals
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-light text-gray-900 mb-2">No new arrivals found</h3>
              <p className="text-gray-500">Try adjusting your search or filters.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedMetal("all");
                }}
                className="mt-4 text-gray-600 hover:text-gray-900 underline text-sm"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
                  : "space-y-6"
              }
            >
              {filteredProducts.map((product, idx) => (
                <div
                  key={product.id}
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${Math.min(idx * 0.05, 0.8)}s forwards`,
                    opacity: 0,
                    transform: "translateY(20px)",
                  }}
                >
                  <ProductCard product={product} index={idx} source="latest" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
};

export default LatestPage;