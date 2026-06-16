// src/pages/ShopPage.jsx - FIXED VERSION

import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { apiService } from "@services/api";
import ProductCard from "@components/ui/ProductCard";
import FilterSidebar from "@components/shop/FilterSidebar";
import ProductSort from "@components/shop/ProductSort";

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [allProducts, setAllProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingCategory, setLoadingCategory] = useState(false);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [isVisible, setIsVisible] = useState(false);
  const [categoryProductsMap, setCategoryProductsMap] = useState({});

  const SORT_OPTIONS = [
    { value: "featured", label: "Featured" },
    { value: "newest", label: "Newest First" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "name-asc", label: "Name: A to Z" },
    { value: "name-desc", label: "Name: Z to A" },
  ];

  useEffect(() => {
    setIsVisible(true);
    fetchCategoriesAndAllProducts();
  }, []);

  useEffect(() => {
    if (categories.length > 0 && categoryParam && categoryParam !== "all") {
      handleCategoryFromUrl();
    }
  }, [categories, categoryParam]);

  useEffect(() => {
    applyFiltersAndSorting();
  }, [displayedProducts, sortBy, searchQuery, priceRange]);

  // Fetch all categories and their products
  const fetchCategoriesAndAllProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const fetchedCategories = await apiService.getCategories();
      console.log("=== FETCHED CATEGORIES ===", fetchedCategories);
      setCategories(fetchedCategories);

      await fetchAllProductsByCategory(fetchedCategories);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load products. Please try again later.");
      setLoading(false);
    }
  };

  // Fetch products for each category and store in map
  const fetchAllProductsByCategory = async (categoriesList) => {
    try {
      setLoadingCategory(true);
      let allProductsArray = [];
      const productsMap = {};

      for (const category of categoriesList) {
        console.log(
          `🔍 Fetching products for category: ${category.name} (ID: ${category.id})`,
        );

        const result = await apiService.getProductsByCategory(category.id);
        console.log(`📦 Products for ${category.name}:`, result);

        let categoryProducts = [];
        if (result && result.products && result.products.length > 0) {
          categoryProducts = result.products.map((product) => ({
            ...product,
            category_id: category.id,
            category_name: category.name,
            category: category.name,
          }));

          allProductsArray.push(...categoryProducts);
        }

        // Store products for this category
        productsMap[category.id] = categoryProducts;
        productsMap[category.name.toLowerCase()] = categoryProducts;
      }

      console.log("=== ALL PRODUCTS ===", allProductsArray);
      console.log("=== CATEGORY PRODUCTS MAP ===", productsMap);

      setAllProducts(allProductsArray);
      setDisplayedProducts(allProductsArray);
      setCategoryProductsMap(productsMap);

      // Update categories with product counts
      const updatedCategories = categoriesList.map((cat) => ({
        ...cat,
        products: productsMap[cat.id] || [],
        count: (productsMap[cat.id] || []).length,
      }));
      setCategories(updatedCategories);

      // Calculate price range
      const allPrices = allProductsArray.map((p) => p.price);
      if (allPrices.length > 0) {
        setPriceRange({
          min: Math.min(...allPrices, 0),
          max: Math.max(...allPrices, 1000000),
        });
      }

      // Handle URL category param
      if (categoryParam && categoryParam !== "all") {
        const matchedCategory = updatedCategories.find(
          (cat) => cat.name?.toLowerCase() === categoryParam.toLowerCase(),
        );

        if (matchedCategory) {
          const categoryProducts = productsMap[matchedCategory.id] || [];
          setSelectedCategory(matchedCategory.name);
          setSelectedCategoryId(matchedCategory.id);
          setDisplayedProducts(categoryProducts);

          const prices = categoryProducts.map((p) => p.price);
          if (prices.length > 0) {
            setPriceRange({
              min: Math.min(...prices, 0),
              max: Math.max(...prices, 1000000),
            });
          }
        }
      }
    } catch (err) {
      console.error("Error fetching products by category:", err);
    } finally {
      setLoading(false);
      setLoadingCategory(false);
    }
  };

  // Handle category from URL
  const handleCategoryFromUrl = () => {
    const matchedCategory = categories.find(
      (cat) => cat.name?.toLowerCase() === categoryParam.toLowerCase(),
    );

    if (matchedCategory && matchedCategory.name !== selectedCategory) {
      const categoryProducts = categoryProductsMap[matchedCategory.id] || [];
      setSelectedCategory(matchedCategory.name);
      setSelectedCategoryId(matchedCategory.id);
      setDisplayedProducts(categoryProducts);

      const prices = categoryProducts.map((p) => p.price);
      if (prices.length > 0) {
        setPriceRange({
          min: Math.min(...prices, 0),
          max: Math.max(...prices, 1000000),
        });
      }
    }
  };

  // Handle category change - FIXED
  const handleCategoryChange = (categoryName) => {
    console.log("=== CATEGORY CHANGED TO:", categoryName);

    if (!categoryName) {
      // Show all products
      setSelectedCategory(null);
      setSelectedCategoryId(null);
      setDisplayedProducts(allProducts);

      const prices = allProducts.map((p) => p.price);
      if (prices.length > 0) {
        setPriceRange({
          min: Math.min(...prices, 0),
          max: Math.max(...prices, 1000000),
        });
      }
      setSearchParams({});
    } else {
      // Find category by name
      const category = categories.find(
        (cat) => cat.name.toLowerCase() === categoryName.toLowerCase(),
      );

      console.log("Found category:", category);

      if (category) {
        // Get products for this category from the map
        const categoryProducts = categoryProductsMap[category.id] || [];
        console.log(`Products for ${category.name}:`, categoryProducts);

        setSelectedCategory(category.name);
        setSelectedCategoryId(category.id);
        setDisplayedProducts(categoryProducts);

        const prices = categoryProducts.map((p) => p.price);
        if (prices.length > 0) {
          setPriceRange({
            min: Math.min(...prices, 0),
            max: Math.max(...prices, 1000000),
          });
        } else {
          // If no products, reset price range
          setPriceRange({ min: 0, max: 10000 });
        }

        setSearchParams({
          category:
            category.slug || category.name.toLowerCase().replace(/ /g, "-"),
        });
      }
    }
  };

  // Apply filters and sorting
  const applyFiltersAndSorting = () => {
    let result = [...displayedProducts];

    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        (product) =>
          (product.name &&
            product.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (product.description &&
            product.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase())) ||
          (product.sku &&
            product.sku.toLowerCase().includes(searchQuery.toLowerCase())),
      );
    }

    // Apply price range filter
    result = result.filter(
      (product) =>
        product.price >= priceRange.min && product.price <= priceRange.max,
    );

    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "name-asc":
          return (a.name || "").localeCompare(b.name || "");
        case "name-desc":
          return (b.name || "").localeCompare(a.name || "");
        case "newest":
          return (b.id || 0) - (a.id || 0);
        default:
          return 0;
      }
    });

    setFilteredProducts(result);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSortBy("featured");
    const prices = displayedProducts.map((p) => p.price);
    if (prices.length > 0) {
      setPriceRange({
        min: Math.min(...prices, 0),
        max: Math.max(...prices, 1000000),
      });
    }
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith("http")) return imagePath;
    if (imagePath.startsWith("/storage"))
      return `https://jewelerybillingsoftware.com${imagePath}`;
    return `https://jewelerybillingsoftware.com/storage/${imagePath}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-gray-200 rounded-lg mb-8 mx-auto"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i}>
                  <div className="aspect-square bg-gray-200 rounded-2xl mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Shop | LUMIÈRE Jewelry</title>
        <meta
          name="description"
          content="Explore our collection of modern minimalist jewelry."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loadingCategory && (
            <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl p-6 flex items-center gap-3 shadow-xl">
                <div className="w-6 h-6 border-2 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-gray-700">Loading products...</span>
              </div>
            </div>
          )}

          {/* Page Header */}
          <div
            className={`text-center mb-8 lg:mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="inline-block mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-900/5 text-gray-600 text-xs font-light tracking-wider uppercase border border-gray-200">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-900 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-gray-900"></span>
                </span>
                Our Collection
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-gray-900 mb-3">
              {selectedCategory || "Shop All"}
            </h1>
            <div className="flex justify-center gap-2 mb-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-gray-400" />
              <div className="w-2 h-2 rounded-full bg-gray-400" />
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-gray-400" />
            </div>
            <p className="text-gray-500 text-base max-w-md mx-auto font-light">
              {selectedCategory
                ? `Discover our exquisite collection of ${selectedCategory.toLowerCase()}`
                : "Discover timeless pieces crafted with precision and passion"}
            </p>
          </div>

          {/* Category Navigation Strip */}
          {categories.length > 0 && (
            <div className="mb-6 overflow-x-auto">
              <div className="flex gap-2 pb-2">
                <button
                  onClick={() => handleCategoryChange(null)}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all duration-300 ${!selectedCategory ? "bg-gray-900 text-white shadow-md" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                >
                  All Products
                  <span className="ml-2 text-xs opacity-75">
                    ({allProducts.length})
                  </span>
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.name)}
                    className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all duration-300 ${selectedCategory === category.name ? "bg-gray-900 text-white shadow-md" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                  >
                    {category.name}
                    <span className="ml-2 text-xs opacity-75">
                      ({category.count || 0})
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Bar */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex-1 w-full md:w-auto relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full md:w-80 px-4 py-2.5 pl-10 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200 transition-all duration-300 text-sm"
                />
                <svg
                  className="absolute left-3 top-3 w-4 h-4 text-gray-400"
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
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="hidden sm:flex items-center gap-1 p-1 bg-gray-100 rounded-xl">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg transition-all duration-300 ${viewMode === "grid" ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700"}`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg transition-all duration-300 ${viewMode === "list" ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700"}`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M4 6h16M4 10h16M4 14h16M4 18h16"
                      />
                    </svg>
                  </button>
                </div>
                <ProductSort
                  value={sortBy}
                  onChange={setSortBy}
                  options={SORT_OPTIONS}
                />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <aside className="md:w-72 lg:w-80 flex-shrink-0">
              <div className="sticky top-28 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <FilterSidebar
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onCategoryChange={handleCategoryChange}
                  priceRange={priceRange}
                  onPriceRangeChange={setPriceRange}
                  totalProductsCount={allProducts.length} // <- Pass total count
                  filteredProductsCount={displayedProducts.length}
                />
              </div>
            </aside>

            {/* Products */}
            <main className="flex-1">
              {error && (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-red-50 rounded-full mb-4">
                    <svg
                      className="w-8 h-8 text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-600">
                    Error loading products: {error}
                  </p>
                  <button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              )}

              {!error && filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                    <svg
                      className="w-8 h-8 text-gray-400"
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
                  </div>
                  <h3 className="text-lg font-light text-gray-900 mb-2">
                    No products found
                  </h3>
                  <p className="text-gray-500">
                    Try adjusting your filters or search terms.
                  </p>
                  <button
                    onClick={handleClearFilters}
                    className="mt-4 text-gray-600 hover:text-gray-900 underline text-sm"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <p className="text-sm text-gray-500">
                      Showing{" "}
                      <span className="font-medium text-gray-900">
                        {filteredProducts.length}
                      </span>{" "}
                      products
                      {selectedCategory && (
                        <span className="ml-2 text-rose-500">
                          {" "}
                          in {selectedCategory}
                        </span>
                      )}
                    </p>
                  </div>

                  <div
                    className={
                      viewMode === "grid"
                        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
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
                        <ProductCard
                          product={{
                            ...product,
                            images: product.imageUrl
                              ? [getImageUrl(product.imageUrl)]
                              : [
                                  "https://via.placeholder.com/400x400?text=No+Image",
                                ],
                          }}
                          index={idx}
                          viewMode={viewMode}
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </main>
          </div>
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

export default ShopPage;
