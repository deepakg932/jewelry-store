// src/pages/HomePage.jsx
import React from 'react'
import { Helmet } from 'react-helmet-async'
import HeroSection from '@components/home/HeroSection'
import CategoryIcons from '@components/home/CategoryIcons'
import FeaturedProducts from '@components/home/FeaturedProducts'
import LatestProducts from '@components/home/LatestProducts'   // <-- add this
import OfferSection from '@components/home/OfferSection'
import TrendingProducts from '@components/home/TrendingProducts'
import Testimonials from '@components/home/Testimonials'
import Newsletter from '@components/ui/Newsletter'

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>LUMIÈRE | Modern Minimalist Jewelry</title>
        <meta name="description" content="Discover timeless minimalist jewelry crafted with intention. Free shipping worldwide on orders over $100." />
      </Helmet>
      <HeroSection />
      <CategoryIcons />
      <FeaturedProducts />
      <LatestProducts />    {/* New section */}
      <TrendingProducts />
      <OfferSection />
      <Testimonials />
      <Newsletter />
    </>
  )
}

export default HomePage