// src/components/ui/CartDrawer.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '@context/CartContext'
import { formatPrice } from '@utils/formatters'

const CartDrawer = () => {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, getTotalPrice, getTotalItems } = useCart()

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/20 z-50" onClick={() => setIsOpen(false)} />
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 shadow-xl flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-borderLight">
          <h2 className="font-heading text-xl font-medium text-primary">Your Cart ({getTotalItems()})</h2>
          <button onClick={() => setIsOpen(false)} className="text-textMedium hover:text-primary">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-textMedium mb-4">Your cart is empty</p>
              <Link to="/shop" onClick={() => setIsOpen(false)} className="inline-block px-6 py-3 bg-primary text-white text-sm rounded-xl hover:bg-primary/90 transition-colors">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.cartId} className="flex gap-4">
                  <div className="w-20 h-20 bg-secondary rounded-lg overflow-hidden flex-shrink-0">
                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-heading font-medium text-textDark text-sm">{item.name}</h4>
                    <p className="text-textMedium text-xs mt-0.5">{formatPrice(item.price)}</p>
                    {item.size && <p className="text-textMedium text-xs">Size: {item.size}</p>}
                    <div className="flex items-center gap-3 mt-2">
                      <select value={item.quantity} onChange={(e) => updateQuantity(item.cartId, parseInt(e.target.value))} className="text-sm border border-borderLight rounded-lg px-2 py-1 bg-white">
                        {[1, 2, 3, 4, 5].map(q => <option key={q} value={q}>{q}</option>)}
                      </select>
                      <button onClick={() => removeItem(item.cartId)} className="text-textMedium text-xs hover:text-accent transition-colors">Remove</button>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-medium text-textDark">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-borderLight p-6">
            <div className="flex justify-between mb-4">
              <span className="text-textDark">Subtotal</span>
              <span className="font-heading font-medium text-primary">{formatPrice(getTotalPrice())}</span>
            </div>
            <Link to="/cart" onClick={() => setIsOpen(false)} className="block w-full text-center px-6 py-3 bg-primary text-white text-sm rounded-xl hover:bg-primary/90 transition-colors mb-3">
              View Cart
            </Link>
            <Link to="/enquiry" onClick={() => setIsOpen(false)} className="block w-full text-center px-6 py-3 border border-primary text-primary text-sm rounded-xl hover:bg-primary hover:text-white transition-colors">
              Enquiry
            </Link>
          </div>
        )}
      </div>
    </>
  )
}

export default CartDrawer