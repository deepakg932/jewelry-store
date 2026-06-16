// src/pages/ProductDetailPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useCart } from "@context/CartContext";
import { useWishlist } from "@context/WishlistContext";
import { apiService } from "@services/api";
import { formatPrice } from "@utils/formatters";
import toast from "react-hot-toast";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isTrending, setIsTrending] = useState(false);
  const { addItem } = useCart();
  const { isInWishlist, toggleItem } = useWishlist();

  // Check if coming from trending page
  const fromTrending = location.state?.from === 'trending' || 
                       location.pathname.includes('/trending') ||
                       sessionStorage.getItem('fromTrending') === 'true';

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        // First try to get from trending products
        const trendingResponse = await apiService.getTrendingProducts();
        let foundProduct = null;
        let isTrendingProduct = false;
        
        if (trendingResponse && trendingResponse.products) {
          foundProduct = trendingResponse.products.find(p => p.id === parseInt(id));
          if (foundProduct) {
            isTrendingProduct = true;
            setIsTrending(true);
          }
        }
        
        // If not found in trending, fetch from regular products
        if (!foundProduct) {
          const allProducts = await apiService.getProducts();
          foundProduct = allProducts.find(p => p.id === parseInt(id));
          setIsTrending(false);
        }
        
        if (foundProduct) {
          // Transform product to match expected format
          const transformedProduct = {
            id: foundProduct.id,
            name: foundProduct.name,
            price: foundProduct.price,
            originalPrice: foundProduct.originalPrice || null,
            description: foundProduct.description || "Beautiful handcrafted jewelry piece",
            images: foundProduct.imageUrl ? [foundProduct.imageUrl] : ['https://via.placeholder.com/600x600?text=No+Image'],
            category: foundProduct.category || "Jewelry",
            sku: foundProduct.sku,
            inStock: foundProduct.inStock !== false,
            rating: foundProduct.rating || 4.5,
            reviewCount: foundProduct.reviews || foundProduct.reviewCount || 0,
            metal_type: foundProduct.metal_type,
            purity: foundProduct.purity,
            net_weight: foundProduct.net_weight,
            sizes: foundProduct.sizes || ["One Size"],
            isNew: foundProduct.isNew || false,
            isBestseller: foundProduct.isBestseller || false,
            isTrending: isTrendingProduct,
            rank: foundProduct.rank,
            total_quantity_sold: foundProduct.total_quantity_sold,
          };
          
          setProduct(transformedProduct);
          setSelectedSize(transformedProduct.sizes[0]);
          
          // Fetch related products from same category
          let otherProducts = [];
          
          if (isTrendingProduct && trendingResponse && trendingResponse.products) {
            // Get related from trending
            otherProducts = trendingResponse.products
              .filter(p => p.id !== parseInt(id) && p.category === transformedProduct.category)
              .slice(0, 4)
              .map(p => ({
                id: p.id,
                name: p.name,
                price: p.price,
                imageUrl: p.imageUrl,
                category: p.category,
                isTrending: true
              }));
          } else {
            // Get related from regular products
            const allProducts = await apiService.getProducts();
            otherProducts = allProducts
              .filter(p => p.id !== parseInt(id) && p.category === transformedProduct.category)
              .slice(0, 4)
              .map(p => ({
                id: p.id,
                name: p.name,
                price: p.price,
                imageUrl: p.imageUrl,
                category: p.category,
                isTrending: false
              }));
          }
          
          setRelatedProducts(otherProducts);
        } else {
          toast.error("Product not found");
          navigate("/shop");
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
        toast.error("Failed to load product");
        navigate("/shop");
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchProduct();
    }
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (!product) return;
    
    if (product.sizes && product.sizes[0] !== "One Size" && !selectedSize) {
      toast.error("Please select a size");
      return;
    }
    
    const cartProduct = {
      ...product,
      price: typeof product.price === 'string' ? parseFloat(product.price) : product.price,
      selectedSize: selectedSize,
      quantity: quantity
    };
    
    addItem(cartProduct, quantity);
    toast.success(`${product.name} added to cart!`);
  };

  const handleBuyNow = () => {
    navigate("/enquiry");
  };

  const handleBack = () => {
    if (isTrending || fromTrending) {
      navigate('/trending');
    } else {
      navigate('/shop');
    }
  };

  if (loading) {
    return (
      <div className="pt-24 pb-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/2">
              <div className="aspect-square bg-gray-200 rounded-2xl"></div>
              <div className="flex gap-3 mt-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-20 h-20 bg-gray-200 rounded-lg"></div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 space-y-6">
              <div className="h-10 bg-gray-200 rounded-lg w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded-lg w-1/4"></div>
              <div className="h-24 bg-gray-200 rounded-lg"></div>
              <div className="h-12 bg-gray-200 rounded-lg w-1/3"></div>
              <div className="h-16 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const isWishlisted = isInWishlist(product.id);

  return (
    <>
      <Helmet>
        <title>{product.name} | LUMIÈRE</title>
        <meta name="description" content={product.description} />
      </Helmet>
      
      <div className="pt-24 pb-16 bg-gradient-to-b from-white to-gray-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb with Back Button */}
          <div className="mb-8 flex items-center justify-between">
            <nav className="flex items-center gap-2 text-sm">
              <button onClick={() => navigate("/")} className="text-gray-500 hover:text-gray-900 transition-colors">
                Home
              </button>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" />
              </svg>
              <button 
                onClick={handleBack}
                className="text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1"
              >
                {isTrending || fromTrending ? 'Trending' : 'Shop'}
              </button>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-gray-900">{product.name}</span>
            </nav>
            
            {/* Back Button */}
            <button 
              onClick={handleBack}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {isTrending || fromTrending ? 'Back to Trending' : 'Back to Shop'}
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Product Images */}
            <div className="lg:w-1/2">
              <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                <img
                  src={product.images[mainImage]}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/600x600?text=No+Image';
                  }}
                />
              </div>
              
              {product.images.length > 1 && (
                <div className="flex gap-3 mt-4">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setMainImage(idx)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                        mainImage === idx 
                          ? "border-gray-900 shadow-md" 
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} view ${idx + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/80x80?text=No+Image';
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="lg:w-1/2">
              {/* Badges */}
              <div className="flex gap-2 mb-4 flex-wrap">
                {product.isNew && (
                  <span className="bg-gray-900 text-white text-xs px-3 py-1 rounded-full font-light tracking-wide">
                    New Arrival
                  </span>
                )}
                {product.isBestseller && (
                  <span className="bg-amber-500 text-white text-xs px-3 py-1 rounded-full font-light tracking-wide">
                    Bestseller
                  </span>
                )}
                {product.isTrending && (
                  <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-light tracking-wide flex items-center gap-1">
                    🔥 Trending #{product.rank}
                  </span>
                )}
                {!product.inStock && (
                  <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full font-light tracking-wide">
                    Sold Out
                  </span>
                )}
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900">
                    {product.name}
                  </h1>
                  <p className="text-gray-500 text-sm mt-2">{product.sku && `SKU: ${product.sku}`}</p>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-2 mt-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-amber-400 fill-amber-400" : "text-gray-300 fill-gray-300"}`}
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 2L15 8.5L22 9.5L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9.5L9 8.5L12 2Z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-gray-500 text-sm">
                      {product.rating} ({product.reviewCount} reviews)
                    </span>
                  </div>
                  
                  {/* Trending Stats */}
                  {product.isTrending && product.total_quantity_sold && (
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                      <span>🔥 {product.total_quantity_sold} sold</span>
                      <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                      <span>Rank #{product.rank}</span>
                    </div>
                  )}
                </div>
                
                {/* Wishlist Button */}
                <button
                  onClick={() => toggleItem(product)}
                  className="p-3 rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-110"
                  aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <svg
                    className={`w-5 h-5 transition-all ${
                      isWishlisted 
                        ? "fill-red-500 stroke-red-500" 
                        : "stroke-gray-600 fill-none hover:stroke-red-500"
                    }`}
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
              </div>

              {/* Price */}
              <div className="mt-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-light text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-gray-400 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
              </div>

              {/* Metal & Purity Info */}
              {(product.metal_type || product.purity || product.net_weight) && (
                <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="grid grid-cols-3 gap-4">
                    {product.metal_type && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Metal Type</p>
                        <p className="text-sm font-medium text-gray-900">{product.metal_type}</p>
                      </div>
                    )}
                    {product.purity && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Purity</p>
                        <p className="text-sm font-medium text-gray-900">{product.purity}</p>
                      </div>
                    )}
                    {product.net_weight && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Net Weight</p>
                        <p className="text-sm font-medium text-gray-900">{product.net_weight}g</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Size Selection */}
              {product.sizes && product.sizes[0] !== "One Size" && (
                <div className="mt-8">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium text-gray-900">
                      Size
                    </span>
                    <button className="text-xs text-gray-500 hover:text-gray-900 transition-colors">
                      Size Guide
                    </button>
                  </div>
                  <div className="flex gap-3 flex-wrap">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                          selectedSize === size 
                            ? "border-gray-900 bg-gray-900 text-white" 
                            : "border-gray-300 text-gray-600 hover:border-gray-900"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity and Actions */}
              <div className="mt-8 space-y-4">
                <div className="flex gap-4">
                  <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-3 hover:bg-gray-50 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="w-12 text-center text-gray-900">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-3 hover:bg-gray-50 transition-colors"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className={`flex-1 px-8 py-3 rounded-full transition-all duration-300 ${
                      product.inStock
                        ? "bg-gray-900 text-white hover:bg-gray-800 hover:scale-105"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {product.inStock ? "Add to Cart" : "Sold Out"}
                  </button>
                </div>
                
                <button
                  onClick={handleBuyNow}
                  disabled={!product.inStock}
                  className={`w-full px-8 py-3 rounded-full border-2 transition-all duration-300 ${
                    product.inStock
                      ? "border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white hover:scale-105"
                      : "border-gray-300 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Enquire Now
                </button>
              </div>

              {/* Additional Info */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <span>Free Shipping</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>30-Day Returns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <div className="mt-20">
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-light tracking-tight text-gray-900 mb-3">
                  You May Also Like
                </h2>
                <div className="flex justify-center gap-2 mb-4">
                  <div className="w-12 h-px bg-gradient-to-r from-transparent to-gray-400" />
                  <div className="w-2 h-2 rounded-full bg-gray-400" />
                  <div className="w-12 h-px bg-gradient-to-l from-transparent to-gray-400" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <div
                    key={relatedProduct.id}
                    className="group cursor-pointer"
                    onClick={() => {
                      // Pass state to indicate coming from trending
                      if (relatedProduct.isTrending || isTrending) {
                        navigate(`/product/${relatedProduct.id}`, { state: { from: 'trending' } });
                      } else {
                        navigate(`/product/${relatedProduct.id}`);
                      }
                    }}
                  >
                    <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 mb-4 relative">
                      <img
                        src={relatedProduct.imageUrl || 'https://via.placeholder.com/400x400?text=No+Image'}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/400x400?text=No+Image';
                        }}
                      />
                      {relatedProduct.isTrending && (
                        <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                          🔥 Trending
                        </span>
                      )}
                    </div>
                    <h3 className="font-light text-gray-900 text-sm mb-1">{relatedProduct.name}</h3>
                    <p className="text-gray-500 text-sm">{formatPrice(relatedProduct.price)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;