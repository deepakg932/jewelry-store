// src/context/WishlistContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const WishlistContext = createContext()

export const useWishlist = () => {
  const context = useContext(WishlistContext)
  if (!context) throw new Error('useWishlist must be used within WishlistProvider')
  return context
}

export const WishlistProvider = ({ children }) => {
  const [items, setItems] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem('lumiere_wishlist')
    if (saved) setItems(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem('lumiere_wishlist', JSON.stringify(items))
  }, [items])

  const addItem = (product) => {
    if (!items.find(i => i.id === product.id)) {
      setItems(prev => [...prev, product])
      toast.success('Added to wishlist')
    }
  }

  const removeItem = (productId) => {
    setItems(prev => prev.filter(i => i.id !== productId))
    toast.success('Removed from wishlist')
  }

  const isInWishlist = (productId) => items.some(i => i.id === productId)

  const toggleItem = (product) => {
    if (isInWishlist(product.id)) {
      removeItem(product.id)
    } else {
      addItem(product)
    }
  }

  return (
    <WishlistContext.Provider value={{ items, addItem, removeItem, isInWishlist, toggleItem, count: items.length }}>
      {children}
    </WishlistContext.Provider>
  )
}