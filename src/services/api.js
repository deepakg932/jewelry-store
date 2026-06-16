// src/services/api.js

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

// Helper to make API calls
const apiFetch = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}/${API_KEY}${endpoint}`;
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    console.log(`📡 API Call: ${url}`);
    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json();
    console.log(`📡 API Response for ${endpoint}:`, data);

    if (data.success) {
      return data.data;
    }

    return data;
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw error;
  }
};

export const apiService = {
  // ========== MENUS API ==========

  // Get all menus
  async getAllMenus() {
    console.log("🔄 Fetching all menus...");
    try {
      const menus = await apiFetch("/menus");
      console.log("✅ All menus fetched:", menus);
      return menus || [];
    } catch (error) {
      console.error("❌ Error fetching menus:", error);
      return [];
    }
  },

  // Get header menus only
  async getHeaderMenus() {
    const menus = await this.getAllMenus();
    const headerMenus = menus.filter(
      (menu) => menu.location === "header" && menu.is_active === 1,
    );
    console.log("✅ Header menus:", headerMenus);
    return headerMenus;
  },

  // Get footer menus
  async getFooterMenus() {
    const menus = await this.getAllMenus();
    const footerMenus = menus.filter(
      (menu) => menu.location === "footer" && menu.is_active === 1,
    );
    console.log("✅ Footer menus:", footerMenus);
    return footerMenus;
  },

  // ========== SOCIAL LINKS API ==========

  // Get all social links
  async getSocialLinks() {
    console.log("🔄 Fetching social links...");
    try {
      const socialLinks = await apiFetch("/social-links");
      console.log("✅ Social links fetched:", socialLinks);
      return socialLinks || [];
    } catch (error) {
      console.error("❌ Error fetching social links:", error);
      return [];
    }
  },

  // Get active social links only
  async getActiveSocialLinks() {
    const socialLinks = await this.getSocialLinks();
    const activeLinks = socialLinks.filter((link) => link.is_active === 1);
    console.log("✅ Active social links:", activeLinks.length);
    return activeLinks;
  },

  // ========== PAGES API ==========

  async getAllPages() {
    console.log("🔄 Fetching all pages...");
    try {
      const pages = await apiFetch("/pages");
      console.log("✅ All pages fetched:", pages);
      return pages || [];
    } catch (error) {
      console.error("❌ Error fetching pages:", error);
      return [];
    }
  },

  async getPageBySlug(slug) {
    console.log(`🔄 Fetching page: ${slug}...`);
    try {
      const page = await apiFetch(`/page/${slug}`);
      console.log(`✅ Page fetched:`, page);
      return page;
    } catch (error) {
      console.error(`❌ Error fetching page ${slug}:`, error);
      return null;
    }
  },

  // ========== BANNERS API ==========
  async getBanners() {
    console.log("🔄 Fetching banners...");
    try {
      const banners = await apiFetch("/banners");
      if (banners && Array.isArray(banners) && banners.length > 0) {
        return banners.map((banner) => ({
          id: banner.id,
          title: banner.title || "",
          subtitle: banner.subtitle || "",
          ctaText: banner.button_text || "Shop Now",
          imageUrl:
            banner.image_url ||
            "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=1600",
          isActive: banner.is_active === 1,
        }));
      }
      return [];
    } catch (error) {
      console.error("Banners error:", error);
      return [];
    }
  },

  // ========== OFFERS API ==========
  async getOffers() {
    console.log("🔄 Fetching offers from API...");
    try {
      const url = `${API_BASE_URL}/${API_KEY}/offers`;
      const response = await fetch(url);
      const data = await response.json();

      console.log("Offers API response:", data);

      if (
        data.success &&
        data.data &&
        Array.isArray(data.data) &&
        data.data.length > 0
      ) {
        return data.data.map((offer) => ({
          id: offer.id,
          title: offer.title || "Special Offer",
          description: offer.description || "Limited time deal!",
          discount: offer.discount_percentage
            ? `${offer.discount_percentage}%`
            : "Special",
          code: offer.coupon_code || "",
          imageUrl: offer.image_url,
          isActive: offer.is_active === 1,
          backgroundColor: `from-${["red", "blue", "green", "purple", "amber", "indigo"][(offer.id || 1) % 6]}-500 to-${["orange", "purple", "teal", "pink", "red", "blue"][(offer.id || 1) % 6]}-500`,
        }));
      }
      return [];
    } catch (error) {
      console.error("Offers error:", error);
      return [];
    }
  },

  // ========== CATEGORIES API ==========

  async getCategories() {
    console.log("🔄 Fetching categories...");
    try {
      const response = await fetch(`${API_BASE_URL}/${API_KEY}/categories`);
      const data = await response.json();
      console.log("Categories API response:", data);

      if (data.success && data.data && Array.isArray(data.data)) {
        return data.data.map((category) => ({
          id: category.id,
          name: category.name,
          slug: category.name?.toLowerCase().replace(/ /g, "-"),
          description: category.description,
          imageUrl: category.image
            ? `${API_BASE_URL.replace("/api/cms/public", "")}/storage/${category.image}`
            : null,
          image: category.image,
          product_count: category.product_count || 0,
          parent_id: category.parent_id,
          subcategories: category.subcategories || [],
        }));
      }

      return [];
    } catch (error) {
      console.error("❌ Error fetching categories:", error);
      return [];
    }
  },

  // Get single category by ID with products
  async getCategoryById(id) {
    console.log(`🔄 Fetching category: ${id}...`);
    try {
      const categoryData = await apiFetch(`/category/${id}`);
      console.log("✅ Category fetched:", categoryData);

      if (categoryData && categoryData.category) {
        const category = categoryData.category;
        const products = categoryData.products?.data || [];

        return {
          id: category.id,
          name: category.name,
          slug: category.name?.toLowerCase().replace(/ /g, "-"),
          description: category.description,
          imageUrl: category.image
            ? `https://jewelerybillingsoftware.com/storage/${category.image}`
            : null,
          color: category.color,
          type: category.type,
          isActive: category.is_active === 1,
          product_count: categoryData.products?.total || 0,
          products: products.map((product) => ({
            id: product.id,
            name: product.name,
            price: product.sale_price,
            imageUrl: product.image
              ? `https://jewelerybillingsoftware.com/storage/${product.image}`
              : null,
            sku: product.sku,
            description: product.description,
          })),
          subcategories: categoryData.subcategories || [],
        };
      }

      return null;
    } catch (error) {
      console.error(`❌ Error fetching category ${id}:`, error);
      return null;
    }
  },

  // ========== PRODUCTS API ==========
  async getProducts(page = 1, perPage = 20) {
    try {
      const url = `${API_BASE_URL}/${API_KEY}/products?page=${page}&per_page=${perPage}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log("Products API response:", data);

      if (data.success && data.data && data.data.data) {
        return data.data.data.map((product) => ({
          id: product.id,
          name: product.name,
          price: parseFloat(product.sale_price) || 0,
          originalPrice: parseFloat(product.mrp) || null,
          imageUrl: `https://jewelerybillingsoftware.com/storage/${product.image}`,
          net_weight: product.net_weight,
          metal_type: product.metal_type,
          purity: product.purity,
          sku: product.sku,
          description: product.description,
          category_id: product.category_id,
          category_name: product.category?.name || "Jewellery",
          category: product.category?.name || "Jewellery",
          badge: product.is_new
            ? "New"
            : product.is_best_seller
              ? "Best Seller"
              : null,
          isNew: product.is_new || false,
          rating: 4.8,
          reviews: 120,
          inStock: true,
          metal: product.metal_type || "Gold",
        }));
      }

      // Handle case where data.data is directly an array
      if (Array.isArray(data.data)) {
        return data.data.map((product) => ({
          id: product.id,
          name: product.name,
          price: parseFloat(product.sale_price) || 0,
          originalPrice: parseFloat(product.mrp) || null,
          imageUrl: product.image,
          net_weight: product.net_weight,
          metal_type: product.metal_type,
          purity: product.purity,
          sku: product.sku,
          description: product.description,
          category_id: product.category_id,
          category_name: "Jewellery",
          category: "Jewellery",
          badge: null,
          isNew: false,
          rating: 4.8,
          reviews: 120,
          inStock: true,
          metal: product.metal_type || "Gold",
        }));
      }

      return [];
    } catch (error) {
      console.error("Products error:", error);
      return [];
    }
  },

  // Add this method to your apiService object in src/services/api.js

  // ========== TRENDING PRODUCTS API ==========
  async getTrendingProducts() {
    console.log("🔥 Fetching trending products...");
    try {
      // Using the absolute URL as it's a different base path
      const url = `https://jewelerybillingsoftware.com/api/trending/products`;
      const response = await fetch(url);
      const data = await response.json();

      console.log("Trending API response:", data);

      if (data.success && data.data && Array.isArray(data.data)) {
        // Map and enrich the trending data
        const trendingProducts = data.data.map((product) => ({
          id: product.id,
          name: product.name,
          price: parseFloat(product.sale_price) || 0,
          originalPrice: null, // Not provided in this API
          images: product.image
            ? `https://jewelerybillingsoftware.com/storage/${product.image}`
            : null,
          sku: product.sku,
          description: product.description,
          metal_type: product.metal_type,
          purity: product.purity,
          design_code: product.design_code,
          barcode_no: product.barcode_no,
          current_stock_pieces: product.current_stock_pieces,
          total_quantity_sold: parseFloat(product.total_quantity_sold) || 0,
          total_orders: product.total_orders || 0,
          total_revenue: parseFloat(product.total_revenue) || 0,
          average_selling_price: parseFloat(product.average_selling_price) || 0,
          last_sold_date: product.last_sold_date,
          rank: product.rank,
          trending_badge: product.trending_badge,
          // For compatibility with ProductCard
          category: product.metal_type || "Jewelry",
          rating: 4.8, // Default rating since not provided
          reviews: Math.floor(product.total_orders * 5) || 10,
          inStock: parseInt(product.current_stock_pieces) > 0,
          isNew: false,
          metal: product.metal_type || "Gold",
        }));

        // Also return the summary and filters for the page
        return {
          products: trendingProducts,
          summary: data.summary,
          filters: data.filters,
        };
      }

      return { products: [], summary: null, filters: null };
    } catch (error) {
      console.error("Trending products error:", error);
      return { products: [], summary: null, filters: null };
    }
  },

  // Get single product by ID (from trending API first, then regular products)
  async getProductById(id) {
    console.log(`🔄 Fetching product with ID: ${id}...`);
    try {
      // First try to get from trending products
      const trendingUrl = `https://jewelerybillingsoftware.com/api/trending/products`;
      const trendingResponse = await fetch(trendingUrl);
      const trendingData = await trendingResponse.json();

      if (trendingData.success && trendingData.data) {
        const trendingProduct = trendingData.data.find(
          (p) => p.id === parseInt(id),
        );
        if (trendingProduct) {
          console.log("✅ Product found in trending API:", trendingProduct);
          return {
            id: trendingProduct.id,
            name: trendingProduct.name,
            price: parseFloat(trendingProduct.sale_price) || 0,
            originalPrice: null,
            imageUrl: trendingProduct.image
              ? `https://jewelerybillingsoftware.com/storage/${trendingProduct.image}`
              : null,
            sku: trendingProduct.sku,
            description:
              trendingProduct.description ||
              "Beautiful piece from our trending collection",
            metal_type: trendingProduct.metal_type,
            purity: trendingProduct.purity,
            design_code: trendingProduct.design_code,
            barcode_no: trendingProduct.barcode_no,
            current_stock_pieces: trendingProduct.current_stock_pieces,
            total_quantity_sold: trendingProduct.total_quantity_sold,
            rank: trendingProduct.rank,
            trending_badge: trendingProduct.trending_badge,
            category: trendingProduct.metal_type || "Jewelry",
            inStock: parseInt(trendingProduct.current_stock_pieces) > 0,
            isTrending: true,
            rating: 4.8,
            reviews: Math.floor(trendingProduct.total_orders * 5) || 10,
            metal: trendingProduct.metal_type || "Gold",
            net_weight: null,
            purity: trendingProduct.purity,
          };
        }
      }

      // If not found in trending, fetch from regular products
      const productsData = await this.getProducts(1, 100);
      const regularProduct = productsData.find((p) => p.id === parseInt(id));

      if (regularProduct) {
        console.log(
          "✅ Product found in regular products API:",
          regularProduct,
        );
        return regularProduct;
      }

      return null;
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      return null;
    }
  },

  // Add a new method to get products by category ID
  async getProductsByCategory(categoryId) {
    console.log(`🔄 Fetching products for category: ${categoryId}...`);
    try {
      const response = await fetch(
        `${API_BASE_URL}/${API_KEY}/category/${categoryId}`,
      );
      const data = await response.json();
      console.log(`Products for category ${categoryId}:`, data);

      if (data.success && data.data && data.data.products) {
        return {
          category: data.data.category,
          products: data.data.products.data.map((product) => ({
            id: product.id,
            name: product.name,
            price: parseFloat(product.sale_price) || 0,
            originalPrice: parseFloat(product.mrp) || null,
            imageUrl: product.image,
            net_weight: product.net_weight,
            metal_type: product.metal_type,
            purity: product.purity,
            sku: product.sku,
            description: product.description,
            category_id: data.data.category.id,
            category_name: data.data.category.name,
            category: data.data.category.name,
            inStock: true,
            isNew: false,
            metal: product.metal_type || "Gold",
            rating: 4.8,
          })),
          total: data.data.products.total,
        };
      }

      return { category: null, products: [], total: 0 };
    } catch (error) {
      console.error(
        `Error fetching products for category ${categoryId}:`,
        error,
      );
      return { category: null, products: [], total: 0 };
    }
  },

  // ========== ENQUIRY ==========
  async submitEnquiry(enquiryData) {
    try {
      const response = await apiFetch("/enquiry", {
        method: "POST",
        body: JSON.stringify(enquiryData),
      });
      return response;
    } catch (error) {
      console.error("Enquiry error:", error);
      throw error;
    }
  },

  async submitContact(formData) {
    try {
      const response = await apiFetch("/contact", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      return response;
    } catch (error) {
      console.error("Contact error:", error);
      throw error;
    }
  },
};
