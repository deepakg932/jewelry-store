// src/components/home/CategoryIcons.jsx (Premium Redesign)
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { apiService } from "@services/api";
import { motion } from "framer-motion";

const CategoryIcons = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const fetchedCategories = await apiService.getCategories();

        const activeCategories = fetchedCategories
          .filter((cat) => cat.isActive !== false)
          .map((category) => ({
            id: category.id,
            name: category.name,
            slug: category.slug,
            count: category.product_count || 0,
            image: category.imageUrl,
            icon: getCategoryIcon(category.name),
            parent_id: category.parent_id,
            subcategories: category.subcategories,
            gradient: getGradient(category.name),
          }));

        setCategories(activeCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const getCategoryIcon = (categoryName) => {
    const name = categoryName?.toLowerCase() || "";
    const iconMap = {
      rings: "💍",
      necklaces: "📿",
      earrings: "✨",
      bracelets: "🔗",
      pendants: "💎",
      chains: "⛓️",
      bangles: "🔄",
      "nose pins": "👃",
      "gold coins": "🪙",
      "gold bars": "📀",
      diamond: "💎",
      gemstone: "🔮",
      pearl: "🦪",
      silver: "🥈",
      platinum: "⭐",
      wedding: "💒",
      engagement: "💍",
      watch: "⌚",
      necklace: "📿",
      bracelet: "🔗",
      pendant: "💎",
      "nose pin": "👃",
      earring: "👂",
    };

    for (const [key, icon] of Object.entries(iconMap)) {
      if (name.includes(key)) return icon;
    }

    const defaultIcons = ["💎", "✨", "⭐", "💍", "🔮", "💫", "🌟"];
    const index = (categoryName?.length || 0) % defaultIcons.length;
    return defaultIcons[index];
  };

  const getGradient = (categoryName) => {
    const name = categoryName?.toLowerCase() || "";
    const gradients = {
      rings: "from-amber-400 to-rose-400",
      necklace: "from-purple-400 to-pink-400",
      earrings: "from-blue-400 to-cyan-400",
      bracelet: "from-emerald-400 to-teal-400",
      diamond: "from-cyan-400 to-blue-500",
      gold: "from-yellow-400 to-amber-500",
      silver: "from-gray-300 to-gray-400",
      platinum: "from-slate-300 to-gray-400",
      wedding: "from-rose-400 to-pink-500",
      engagement: "from-pink-400 to-rose-500",
      watch: "from-indigo-400 to-purple-500",
    };

    for (const [key, gradient] of Object.entries(gradients)) {
      if (name.includes(key)) return gradient;
    }
    return "from-gray-400 to-gray-500";
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e, index) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 15;
    setMousePosition({ x, y });
    setHoveredCard(index);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
    setMousePosition({ x: 0, y: 0 });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  // Loading Skeleton
  if (loading) {
    return (
      <section
        ref={sectionRef}
        className="py-20 bg-gradient-to-b from-white to-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="w-32 h-4 bg-gray-200 rounded-full animate-pulse mx-auto" />
            <div className="w-64 h-12 bg-gray-200 rounded-lg animate-pulse mx-auto mt-4" />
            <div className="w-48 h-4 bg-gray-200 rounded animate-pulse mx-auto mt-3" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="text-center">
                <div className="aspect-square rounded-2xl bg-gray-200 animate-pulse" />
                <div className="w-24 h-4 bg-gray-200 rounded animate-pulse mx-auto mt-4" />
                <div className="w-16 h-3 bg-gray-200 rounded animate-pulse mx-auto mt-2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (categories.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 bg-gradient-to-b from-white via-gray-50/50 to-white relative overflow-hidden"
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-100/30 to-pink-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-100/30 to-cyan-100/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-amber-100/10 to-rose-100/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-gray-900/5 to-gray-800/5 text-gray-600 text-xs font-medium tracking-wider uppercase border border-gray-200/50 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-900 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gray-900"></span>
            </span>
            Shop by Category
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mt-6 mb-4 tracking-tight"
          >
            Discover Your Style
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="text-gray-500 text-lg max-w-2xl mx-auto font-light"
          >
            Explore our curated collections and find the perfect piece that
            speaks to you
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex justify-center gap-3 mt-6"
          >
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-gray-300" />
            <div className="w-2 h-2 rounded-full bg-gray-300" />
            <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-gray-300" />
          </motion.div>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              custom={index}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={handleMouseLeave}
              className="relative  "
            >
              <Link
                to={`/shop?category=${encodeURIComponent(category.name)}`}
                className="block group"
              >
                <div
                  className="relative  rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500"
                  style={{
                    transform:
                      hoveredCard === index
                        ? `perspective(800px) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg) scale(1.02)`
                        : "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)",
                    transition: "transform 0.2s ease-out",
                  }}
                >
                  {/* Card Background */}
                  <div className="relative overflow-hidden">
                    {/* Gradient Background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}
                    />

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Corner Accents */}
                    <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-white/30 rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-white/30 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-white/30 rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-white/30 rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Glow Ring */}
                    <div className="absolute inset-2 rounded-xl border-2 border-white/0 group-hover:border-white/30 transition-all duration-500 pointer-events-none" />
                  </div>

                  {/* Category Info */}
                  <div className="p-12 text-center bg-white/80 backdrop-blur-sm">
                    <h3 className="text-base font-semibold text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
                      {category.name}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1 flex items-center justify-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-gray-300" />
                      {category.count}{" "}
                      {category.count === 1 ? "Product" : "Products"}
                      <span className="w-1 h-1 rounded-full bg-gray-300" />
                    </p>
                  </div>
                </div>

                {/* Shine Effect */}
                <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.7 }}
          className="text-center mt-16 md:mt-20"
        >
          <Link
            to="/shop"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
          >
            <span className="font-medium">Explore All Categories</span>
            <svg
              className="w-5 h-5 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CategoryIcons;
