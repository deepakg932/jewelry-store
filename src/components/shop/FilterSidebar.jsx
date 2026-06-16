// src/components/shop/FilterSidebar.jsx (FINAL FIXED)

import React, { useState, useEffect } from "react";

const FilterSidebar = ({ 
  categories = [], 
  selectedCategory = null, 
  onCategoryChange,
  priceRange = { min: 0, max: 10000 },
  onPriceRangeChange,
  totalProductsCount = 0,  // Total count of all products
  filteredProductsCount = 0  // Count of filtered products
}) => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [localSelectedCategory, setLocalSelectedCategory] = useState(selectedCategory);
  
  const maxPrice = priceRange.max || 10000;
  const currentMax = priceRange.max;

  // Sync with prop changes
  useEffect(() => {
    setLocalSelectedCategory(selectedCategory);
  }, [selectedCategory]);

  const handlePriceChange = (newMax) => {
    if (onPriceRangeChange) {
      onPriceRangeChange({ ...priceRange, max: parseInt(newMax) || 0 });
    }
  };

  const handleMinPriceChange = (newMin) => {
    if (onPriceRangeChange) {
      onPriceRangeChange({ ...priceRange, min: parseInt(newMin) || 0 });
    }
  };

  const handleCategorySelect = (categoryName) => {
    setLocalSelectedCategory(categoryName);
    if (onCategoryChange) {
      onCategoryChange(categoryName);
    }
  };

  const handleReset = () => {
    setLocalSelectedCategory(null);
    if (onCategoryChange) {
      onCategoryChange(null);
    }
    if (onPriceRangeChange) {
      onPriceRangeChange({ min: 0, max: maxPrice });
    }
  };

  // Get display categories (parent categories first)
  const displayCategories = categories.filter(cat => !cat.parent_id || cat.parent_id === null);
  const subCategories = categories.filter(cat => cat.parent_id);

  return (
    <div className="space-y-6">
      {/* Categories Section */}
      <div>
        <button 
          onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
          className="flex justify-between items-center w-full py-2 group"
        >
          <h3 className="font-medium text-gray-900 text-sm uppercase tracking-wider">
            CATEGORIES
          </h3>
          <svg 
            className={`w-4 h-4 text-gray-400 transition-transform duration-300 group-hover:text-gray-600 ${isCategoriesOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {isCategoriesOpen && (
          <div className="mt-4 space-y-1">
            {/* All Products Option - ALWAYS shows total count */}
            <button
              onClick={() => handleCategorySelect(null)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-300 ${
                !localSelectedCategory 
                  ? "bg-gray-900 text-white shadow-sm" 
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <span>All Products</span>
              <span className="float-right text-xs opacity-60">
                {totalProductsCount}  {/* Always show total count */}
              </span>
            </button>

            {/* Parent Categories */}
            {displayCategories.map((cat) => (
              <div key={cat.id}>
                <button
                  onClick={() => handleCategorySelect(cat.name)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-300 ${
                    localSelectedCategory === cat.name 
                      ? "bg-gray-900 text-white shadow-sm" 
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="float-right text-xs opacity-60">
                    {cat.count || 0}
                  </span>
                </button>
                
                {/* Subcategories */}
                {subCategories.filter(sub => sub.parent_id === cat.id).length > 0 && (
                  <div className="ml-4 mt-1 space-y-1">
                    {subCategories
                      .filter(sub => sub.parent_id === cat.id)
                      .map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => handleCategorySelect(sub.name)}
                          className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-all duration-300 ${
                            localSelectedCategory === sub.name 
                              ? "bg-gray-900 text-white shadow-sm" 
                              : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                          }`}
                        >
                          <span>{sub.name}</span>
                          <span className="float-right text-xs opacity-60">
                            {sub.count || 0}
                          </span>
                        </button>
                      ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Price Range Section */}
      <div className="pt-4 border-t border-gray-100">
        <button 
          onClick={() => setIsPriceOpen(!isPriceOpen)}
          className="flex justify-between items-center w-full py-2 group"
        >
          <h3 className="font-medium text-gray-900 text-sm uppercase tracking-wider">
            PRICE RANGE
          </h3>
          <svg 
            className={`w-4 h-4 text-gray-400 transition-transform duration-300 group-hover:text-gray-600 ${isPriceOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {isPriceOpen && (
          <div className="mt-4 space-y-4">
            {/* Price Range Display */}
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1">Min ($)</label>
                <input
                  type="number"
                  value={priceRange.min}
                  onChange={(e) => handleMinPriceChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200 transition-all"
                  min="0"
                  max={currentMax}
                />
              </div>
              <div className="px-3 text-gray-400">—</div>
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1">Max ($)</label>
                <input
                  type="number"
                  value={priceRange.max}
                  onChange={(e) => handlePriceChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200 transition-all"
                  min={priceRange.min}
                  max={maxPrice}
                />
              </div>
            </div>

            {/* Price Range Slider */}
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max={maxPrice}
                value={currentMax}
                onChange={(e) => handlePriceChange(e.target.value)}
                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900"
                style={{
                  background: `linear-gradient(to right, #111827 0%, #111827 ${(currentMax / maxPrice) * 100}%, #e5e7eb ${(currentMax / maxPrice) * 100}%, #e5e7eb 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>$0</span>
                <span>${maxPrice.toLocaleString()}+</span>
              </div>
            </div>

            {/* Suggested Price Ranges */}
            <div className="flex flex-wrap gap-2 pt-2">
              {[100, 500, 1000, 5000].map((price) => (
                <button
                  key={price}
                  onClick={() => handlePriceChange(price)}
                  className={`px-3 py-1 text-xs rounded-full border transition-all duration-300 ${
                    currentMax === price 
                      ? "border-gray-900 bg-gray-900 text-white" 
                      : "border-gray-200 text-gray-600 hover:border-gray-400 hover:bg-gray-50"
                  }`}
                >
                  Up to ${price}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Active Filters Summary */}
      {(localSelectedCategory || priceRange.min > 0 || priceRange.max < maxPrice) && (
        <div className="pt-4 border-t border-gray-100">
          <div className="mb-3">
            <p className="text-xs text-gray-500 mb-2">Active Filters:</p>
            <div className="flex flex-wrap gap-2">
              {localSelectedCategory && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                  {localSelectedCategory}
                  <button 
                    onClick={() => handleCategorySelect(null)}
                    className="ml-1 text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </span>
              )}
              {(priceRange.min > 0 || priceRange.max < maxPrice) && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                  ${priceRange.min} - ${priceRange.max}
                  <button 
                    onClick={() => {
                      if (onPriceRangeChange) {
                        onPriceRangeChange({ min: 0, max: maxPrice });
                      }
                    }}
                    className="ml-1 text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          </div>
          
          <button
            onClick={handleReset}
            className="w-full px-4 py-2.5 text-sm text-gray-600 hover:text-gray-900 transition-all duration-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2 border border-gray-200 hover:border-gray-300"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset All Filters
          </button>
        </div>
      )}

      {/* Results Count - Shows appropriate count */}
      <div className="pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">
            {localSelectedCategory ? `Products in ${localSelectedCategory}` : "Total Products"}
          </span>
          <span className="font-medium text-gray-900">
            {localSelectedCategory ? filteredProductsCount : totalProductsCount}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;