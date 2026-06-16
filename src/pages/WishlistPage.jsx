// src/pages/WishlistPage.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { useWishlist } from '@context/WishlistContext'
import ProductCard from '@components/ui/ProductCard'

const WishlistPage = () => {
  const { items } = useWishlist()

  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        <h1 className="text-3xl font-heading font-light text-primary mb-8">My Wishlist ({items.length})</h1>
        {items.length === 0 ? (
          <div className="text-center py-12"><p className="text-textMedium mb-4">Your wishlist is empty</p><Link to="/shop" className="inline-block px-8 py-3 bg-primary text-white rounded-xl">Explore Products</Link></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">{items.map((product, idx) => <ProductCard key={product.id} product={product} index={idx} />)}</div>
        )}
      </div>
    </div>
  )
}

export default WishlistPage