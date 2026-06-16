// src/pages/CheckoutPage.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '@context/CartContext'
import { formatPrice } from '@utils/formatters'
import toast from 'react-hot-toast'

const CheckoutPage = () => {
  const navigate = useNavigate()
  const { items, getTotalPrice, clearCart } = useCart()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', address: '', city: '', zipCode: '', cardNumber: '', expiry: '', cvv: '' })

  if (items.length === 0) { navigate('/cart'); return null }

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })
  const handleSubmit = (e) => { e.preventDefault(); if (step < 2) setStep(step + 1); else { toast.success('Order placed successfully!'); clearCart(); navigate('/') } }

  return (
    <div className="pt-24 pb-16"><div className="container-custom max-w-4xl"><h1 className="text-3xl font-heading font-light mb-8">Checkout</h1>
      <div className="flex mb-8">{['Shipping', 'Payment'].map((label, idx) => (<div key={idx} className={`flex-1 text-center pb-2 border-b-2 ${step === idx + 1 ? 'border-accent text-accent' : 'border-borderLight text-textMedium'}`}>{label}</div>))}</div>
      <form onSubmit={handleSubmit}>
        {step === 1 && (<div className="space-y-4"><div className="grid grid-cols-2 gap-4"><input type="text" name="firstName" placeholder="First Name" required onChange={handleChange} className="px-4 py-2 border rounded-lg" /><input type="text" name="lastName" placeholder="Last Name" required onChange={handleChange} className="px-4 py-2 border rounded-lg" /></div><input type="email" name="email" placeholder="Email" required onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" /><input type="text" name="address" placeholder="Address" required onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" /><div className="grid grid-cols-2 gap-4"><input type="text" name="city" placeholder="City" required onChange={handleChange} className="px-4 py-2 border rounded-lg" /><input type="text" name="zipCode" placeholder="ZIP Code" required onChange={handleChange} className="px-4 py-2 border rounded-lg" /></div><button type="submit" className="w-full py-3 bg-primary text-white rounded-lg">Continue to Payment</button></div>)}
        {step === 2 && (<div className="space-y-4"><input type="text" name="cardNumber" placeholder="Card Number" required onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" /><div className="grid grid-cols-2 gap-4"><input type="text" name="expiry" placeholder="MM/YY" required onChange={handleChange} className="px-4 py-2 border rounded-lg" /><input type="text" name="cvv" placeholder="CVV" required onChange={handleChange} className="px-4 py-2 border rounded-lg" /></div><div className="bg-secondary p-4 rounded-lg"><div className="flex justify-between font-medium"><span>Total</span><span>{formatPrice(getTotalPrice())}</span></div></div><div className="flex gap-4"><button type="button" onClick={() => setStep(1)} className="flex-1 py-3 border rounded-lg">Back</button><button type="submit" className="flex-1 py-3 bg-primary text-white rounded-lg">Place Order</button></div></div>)}
      </form>
    </div></div>
  )
}

export default CheckoutPage