// src/context/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const savedCart = localStorage.getItem('lumiere_cart')
    if (savedCart) setItems(JSON.parse(savedCart))
  }, [])

  useEffect(() => {
    localStorage.setItem('lumiere_cart', JSON.stringify(items))
  }, [items])

  const addItem = (product, quantity = 1, size = null) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id && i.size === size)
      if (existing) {
        return prev.map(i =>
          i.id === product.id && i.size === size
            ? { ...i, quantity: i.quantity + quantity }
            : i
        )
      }
      return [...prev, { ...product, quantity, size, cartId: Date.now() }]
    })
    toast.success(`${product.name} added to cart`)
    setIsOpen(true)
  }

  const removeItem = (cartId) => {
    setItems(prev => prev.filter(i => i.cartId !== cartId))
    toast.success('Item removed')
  }

  const updateQuantity = (cartId, quantity) => {
    if (quantity <= 0) {
      removeItem(cartId)
      return
    }
    setItems(prev => prev.map(i => i.cartId === cartId ? { ...i, quantity } : i))
  }

  const clearCart = () => {
    setItems([])
    toast.success('Cart cleared')
  }

  const getTotalItems = () => items.reduce((sum, i) => sum + i.quantity, 0)
  const getTotalPrice = () => items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  return (
    <CartContext.Provider value={{
      items, isOpen, setIsOpen, addItem, removeItem,
      updateQuantity, clearCart, getTotalItems, getTotalPrice,
    }}>
      {children}
    </CartContext.Provider>
  )
}