// src/components/layout/Layout.jsx
import React from 'react'
import { Outlet } from 'react-router-dom'
import { CartProvider } from '@context/CartContext'
import { WishlistProvider } from '@context/WishlistContext'
import { ShopProvider } from '@context/ShopContext'
import Header from './Header'
import Footer from './Footer'
import CartDrawer from '@components/ui/CartDrawer'

const Layout = () => {
  return (
    <ShopProvider>
      <CartProvider>
        <WishlistProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 pt-20">
              <Outlet />
            </main>
            <Footer />
            <CartDrawer />
          </div>
        </WishlistProvider>
      </CartProvider>
    </ShopProvider>
  )
}

export default Layout