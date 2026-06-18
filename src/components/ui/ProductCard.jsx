// src/components/ui/ProductCard.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useWishlist } from "@context/WishlistContext";
import imagePLS from "../../assets/ChatGPT Image Jun 18, 2026, 11_13_51 AM.png"
const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};

// Helper to get image URL
const getImageUrl = (imagePath) => {
  if (!imagePath) return imagePLS;
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  // If it's a relative path, prepend the storage base URL
  return `https://jewelerybillingsoftware.com/storage/${imagePath}`;
};

const ProductCard = ({ product, index, source = 'shop' }) => {
  const navigate = useNavigate();
  const { isInWishlist, toggleItem } = useWishlist();
  const [isHovered, setIsHovered] = useState(false);
  const isWishlisted = isInWishlist(product.id);

  // Determine image source
  const imageSrc = getImageUrl(product.imageUrl || product.images || product.image);

  const handleEnquire = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate('/enquiry', {
      state: {
        productId: product.id,
        productName: product.name,
        productPrice: product.price,
        productImage: imageSrc,
      }
    });
  };

  return (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 transition-all duration-500 hover:shadow-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <Link to={`/product/${product.id}`} state={{ from: source }}>
        <div className="relative aspect-[5/5] overflow-hidden bg-gray-100">
          <img
            src={imageSrc}
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
            loading="lazy"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x400?text=No+Image';
            }}
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <span className="bg-gray-900 text-white text-xs px-3 py-1 rounded-full font-light tracking-wide">
                New
              </span>
            )}
            {product.originalPrice && product.inStock && (
              <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full font-light">
                -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
              </span>
            )}
            {product.metal_type && (
              <span className="bg-amber-500 text-white text-xs px-3 py-1 rounded-full font-light">
                {product.metal_type}
              </span>
            )}
            {product.isTrending && (
              <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-light flex items-center gap-1">
                🔥 #{product.rank}
              </span>
            )}
          </div>

          {/* Out of Stock Overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
              <span className="bg-white/90 text-gray-900 px-4 py-2 rounded-full text-sm font-medium tracking-wide">
                Sold Out
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Wishlist Button */}
      <button
        onClick={() => toggleItem(product)}
        className={`absolute top-3 right-3 p-2.5 rounded-full transition-all duration-300 backdrop-blur-sm ${
          isWishlisted 
            ? 'bg-red-500 text-white scale-110' 
            : 'bg-white/80 text-gray-600 hover:bg-white hover:shadow-md hover:scale-110'
        }`}
        aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <svg
          className={`w-4 h-4 transition-all ${isWishlisted ? 'fill-white stroke-white' : 'fill-none stroke-current'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>

      {/* Product Info */}
      <div className="p-5">
        <Link to={`/product/${product.id}`} state={{ from: source }}>
          <h3 className="font-light text-gray-900 text-base tracking-wide mb-1 hover:text-gray-600 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-gray-400 text-xs uppercase tracking-wider mb-3">
          {product.category || 'Jewelry'}
        </p>
        
        {/* Metal & Purity Info */}
        {(product.metal_type || product.purity) && (
          <div className="flex items-center gap-2 mb-3">
            {product.metal_type && (
              <span className="text-xs text-gray-500">{product.metal_type}</span>
            )}
            {product.purity && (
              <>
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                <span className="text-xs text-gray-500">{product.purity}</span>
              </>
            )}
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-900 text-lg">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-gray-400 text-sm line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          
          {product.inStock && (
            <button
              onClick={handleEnquire}
              className="text-gray-500 hover:text-gray-900 text-sm transition-colors duration-300 flex items-center gap-1 group"
              aria-label="Enquire about this product"
            >
              <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="hidden sm:inline">Enquire</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;