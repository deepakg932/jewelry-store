// src/pages/CartPage.jsx
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '@context/CartContext'
import { formatPrice } from '@utils/formatters'

const CartPage = () => {
  const navigate = useNavigate()
  const { items, updateQuantity, removeItem, getTotalPrice, getTotalItems } = useCart()

  if (items.length === 0) {
    return (
      <div className="container-custom py-32 text-center">
        <h1 className="text-2xl font-heading font-light mb-4">Your Cart is Empty</h1>
        <Link to="/shop" className="inline-block px-8 py-3 bg-primary text-white rounded-xl">Continue Shopping</Link>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        <h1 className="text-3xl font-heading font-light text-primary mb-8">Shopping Cart ({getTotalItems()})</h1>
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1">
            <div className="hidden md:grid grid-cols-12 gap-4 pb-3 border-b border-borderLight text-sm text-textMedium mb-6">
              <div className="col-span-6">Product</div><div className="col-span-2 text-center">Price</div><div className="col-span-2 text-center">Quantity</div><div className="col-span-2 text-right">Total</div>
            </div>
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.cartId} className="flex flex-col md:grid md:grid-cols-12 gap-4 items-center pb-6 border-b border-borderLight">
                  <div className="flex gap-4 md:col-span-6 w-full"><div className="w-20 h-20 bg-secondary rounded-lg overflow-hidden"><img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" /></div><div><h3 className="font-heading font-medium text-textDark">{item.name}</h3>{item.size && <p className="text-textMedium text-xs">Size: {item.size}</p>}<button onClick={() => removeItem(item.cartId)} className="text-textMedium text-xs hover:text-accent mt-2">Remove</button></div></div>
                  <div className="text-center md:col-span-2"><span>{formatPrice(item.price)}</span></div>
                  <div className="md:col-span-2"><select value={item.quantity} onChange={(e) => updateQuantity(item.cartId, parseInt(e.target.value))} className="border border-borderLight rounded-lg px-3 py-1.5 text-sm">{[...Array(5)].map((_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}</select></div>
                  <div className="text-right md:col-span-2"><span className="font-medium">{formatPrice(item.price * item.quantity)}</span></div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-96"><div className="bg-secondary p-6 rounded-xl"><h3 className="font-heading text-lg font-medium mb-4">Order Summary</h3><div className="space-y-3"><div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(getTotalPrice())}</span></div><div className="border-t pt-3 mt-3"><div className="flex justify-between font-medium"><span>Total</span><span>{formatPrice(getTotalPrice())}</span></div></div></div><button onClick={() => navigate('/enquiry')} className="w-full mt-6 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90">Proceed to Enquiry</button></div></div>
        </div>
      </div>
    </div>
  )
}

export default CartPage