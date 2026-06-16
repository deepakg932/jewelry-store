// src/pages/ProfilePage.jsx
import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Package, 
  Heart, 
  Settings, 
  LogOut,
  Edit2,
  Save,
  X,
  ChevronRight,
  ShoppingBag,
  Truck,
  CheckCircle,
  Clock,
  Star,
  Award,
  Crown,
  Shield,
  Camera,
  MapPinned,
  CreditCard,
  Lock,
  Bell
} from 'lucide-react'
import toast from 'react-hot-toast'

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: 'Priya Sharma',
    email: 'priya@example.com',
    phone: '+91 98765 43210',
    address: '123, Luxury Apartments, Bandra West, Mumbai - 400050',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400050',
    joinDate: 'January 15, 2024',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop'
  })

  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState('orders')
  const [editForm, setEditForm] = useState(user)
  const [orders, setOrders] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [loading, setLoading] = useState(true)

  // Mock orders data
  const mockOrders = [
    {
      id: 'ORD-001',
      date: '2024-03-15',
      total: 24999,
      status: 'delivered',
      items: 2,
      image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=100&h=100&fit=crop'
    },
    {
      id: 'ORD-002',
      date: '2024-03-10',
      total: 15999,
      status: 'shipped',
      items: 1,
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=100&h=100&fit=crop'
    },
    {
      id: 'ORD-003',
      date: '2024-03-05',
      total: 8999,
      status: 'processing',
      items: 1,
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=100&h=100&fit=crop'
    }
  ]

  // Mock wishlist data
  const mockWishlist = [
    {
      id: 1,
      name: 'Diamond Solitaire Ring',
      price: 45999,
      originalPrice: 55999,
      image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=200&h=200&fit=crop',
      inStock: true
    },
    {
      id: 2,
      name: 'Pearl Drop Earrings',
      price: 18999,
      originalPrice: 24999,
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=200&h=200&fit=crop',
      inStock: true
    }
  ]

  useEffect(() => {
    // Load orders from localStorage or use mock data
    const savedOrders = localStorage.getItem('lumiere_orders')
    setOrders(savedOrders ? JSON.parse(savedOrders) : mockOrders)
    
    const savedWishlist = localStorage.getItem('lumiere_wishlist')
    setWishlist(savedWishlist ? JSON.parse(savedWishlist) : mockWishlist)
    
    setLoading(false)
  }, [])

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    setUser(editForm)
    setIsEditing(false)
    toast.success('Profile updated successfully!', {
      icon: '✨',
      style: {
        background: '#FFFFFF',
        color: '#8B7355',
        border: '1px solid #D4C5A9',
      },
    })
  }

  const handleCancel = () => {
    setEditForm(user)
    setIsEditing(false)
  }

  const handleInputChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    })
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'delivered': return 'text-green-600 bg-green-50'
      case 'shipped': return 'text-blue-600 bg-blue-50'
      case 'processing': return 'text-amber-600 bg-amber-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getStatusIcon = (status) => {
    switch(status) {
      case 'delivered': return <CheckCircle className="w-4 h-4" />
      case 'shipped': return <Truck className="w-4 h-4" />
      case 'processing': return <Clock className="w-4 h-4" />
      default: return <Package className="w-4 h-4" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-gray-200 rounded-lg mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl p-6">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <div className="h-5 bg-gray-200 rounded w-32 mx-auto mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-40 mx-auto"></div>
                </div>
              </div>
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl p-6">
                  <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-12 bg-gray-200 rounded"></div>
                    <div className="h-12 bg-gray-200 rounded"></div>
                    <div className="h-12 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>My Profile | LUMIÈRE</title>
        <meta name="description" content="Manage your profile, view orders, and track wishlist at LUMIÈRE Jewelry." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-amber-50/30 via-white to-gray-50/30 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-8 lg:mb-12">
            <div className="inline-block mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/80 text-amber-700 text-xs font-light tracking-wider uppercase border border-amber-200">
                <Crown className="w-4 h-4" />
                My Account
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-gray-900 mb-3">
              My <span className="font-serif italic text-amber-600">Profile</span>
            </h1>
            <div className="flex justify-center gap-2">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-amber-400" />
              <div className="w-2 h-2 rounded-full bg-amber-400" />
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-amber-400" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                {/* Profile Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-amber-100 p-6 text-center">
                  <div className="relative inline-block mb-4">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-24 h-24 rounded-full object-cover ring-4 ring-amber-100"
                    />
                    <button className="absolute bottom-0 right-0 p-1.5 bg-amber-600 rounded-full text-white hover:bg-amber-700 transition-colors">
                      <Camera className="w-3 h-3" />
                    </button>
                  </div>
                  
                  <h3 className="text-lg font-medium text-gray-900 mb-1">{user.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">{user.email}</p>
                  
                  <div className="flex justify-center gap-2 mb-4">
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-50 text-amber-600 text-xs rounded-full">
                      <Award className="w-3 h-3" />
                      Gold Member
                    </span>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Joined {user.joinDate}
                    </p>
                  </div>
                </div>

                {/* Navigation Tabs */}
                <div className="bg-white rounded-2xl shadow-lg border border-amber-100 p-4">
                  <button
                    onClick={() => setActiveTab('orders')}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 mb-1 ${
                      activeTab === 'orders'
                        ? 'bg-amber-50 text-amber-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <Package className="w-5 h-5" />
                      <span className="text-sm font-medium">My Orders</span>
                    </span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${activeTab === 'orders' ? 'translate-x-1' : ''}`} />
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('wishlist')}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 mb-1 ${
                      activeTab === 'wishlist'
                        ? 'bg-amber-50 text-amber-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <Heart className="w-5 h-5" />
                      <span className="text-sm font-medium">Wishlist</span>
                      {wishlist.length > 0 && (
                        <span className="ml-auto text-xs bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full">
                          {wishlist.length}
                        </span>
                      )}
                    </span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${activeTab === 'wishlist' ? 'translate-x-1' : ''}`} />
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${
                      activeTab === 'settings'
                        ? 'bg-amber-50 text-amber-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <Settings className="w-5 h-5" />
                      <span className="text-sm font-medium">Account Settings</span>
                    </span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${activeTab === 'settings' ? 'translate-x-1' : ''}`} />
                  </button>
                </div>

                {/* Stats Card */}
                <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl p-6 text-white text-center">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-2xl font-bold">{orders.length}</div>
                      <div className="text-xs opacity-90">Total Orders</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{wishlist.length}</div>
                      <div className="text-xs opacity-90">Wishlist Items</div>
                    </div>
                  </div>
                  <button className="w-full mt-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl text-sm font-medium hover:bg-white/30 transition-colors">
                    View Order History
                  </button>
                </div>

                {/* Logout Button */}
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors">
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div className="bg-white rounded-2xl shadow-lg border border-amber-100 p-6 md:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-light text-gray-900">My Orders</h2>
                    <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white">
                      <option>All Orders</option>
                      <option>Last 30 Days</option>
                      <option>Last 6 Months</option>
                    </select>
                  </div>

                  {orders.length === 0 ? (
                    <div className="text-center py-12">
                      <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-light text-gray-900 mb-2">No orders yet</h3>
                      <p className="text-gray-500 mb-4">Start shopping to see your orders here</p>
                      <Link to="/shop" className="inline-flex items-center gap-2 px-6 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors">
                        Shop Now <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div key={order.id} className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow">
                          <div className="flex flex-wrap gap-4 items-start justify-between">
                            <div className="flex gap-4">
                              <img src={order.image} alt={order.id} className="w-16 h-16 rounded-lg object-cover" />
                              <div>
                                <p className="font-medium text-gray-900">Order #{order.id}</p>
                                <p className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
                                <p className="text-sm text-gray-600">{order.items} items • ₹{order.total.toLocaleString()}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                {getStatusIcon(order.status)}
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </span>
                              <button className="block mt-2 text-sm text-amber-600 hover:text-amber-700">
                                View Details
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Wishlist Tab */}
              {activeTab === 'wishlist' && (
                <div className="bg-white rounded-2xl shadow-lg border border-amber-100 p-6 md:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-light text-gray-900">My Wishlist</h2>
                    <span className="text-sm text-gray-500">{wishlist.length} items</span>
                  </div>

                  {wishlist.length === 0 ? (
                    <div className="text-center py-12">
                      <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-light text-gray-900 mb-2">Your wishlist is empty</h3>
                      <p className="text-gray-500 mb-4">Save your favorite items here</p>
                      <Link to="/shop" className="inline-flex items-center gap-2 px-6 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors">
                        Explore Products <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {wishlist.map((item) => (
                        <div key={item.id} className="flex gap-4 p-4 border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
                          <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900 mb-1">{item.name}</h3>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-amber-600 font-medium">₹{item.price.toLocaleString()}</span>
                              {item.originalPrice && (
                                <span className="text-gray-400 text-sm line-through">₹{item.originalPrice.toLocaleString()}</span>
                              )}
                            </div>
                            <div className="flex gap-3">
                              <button className="px-4 py-1.5 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors">
                                Add to Cart
                              </button>
                              <button className="px-4 py-1.5 border border-gray-300 text-gray-600 text-sm rounded-lg hover:border-red-300 hover:text-red-500 transition-colors">
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="bg-white rounded-2xl shadow-lg border border-amber-100 p-6 md:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-light text-gray-900">Account Settings</h2>
                    {!isEditing ? (
                      <button onClick={handleEdit} className="flex items-center gap-2 px-4 py-2 text-sm text-amber-600 hover:bg-amber-50 rounded-lg transition-colors">
                        <Edit2 className="w-4 h-4" />
                        Edit Profile
                      </button>
                    ) : (
                      <div className="flex gap-2">
                        <button onClick={handleSave} className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700">
                          <Save className="w-4 h-4" />
                          Save
                        </button>
                        <button onClick={handleCancel} className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 text-gray-600 text-sm rounded-lg hover:bg-gray-50">
                          <X className="w-4 h-4" />
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-6">
                    {/* Personal Information */}
                    <div>
                      <h3 className="text-md font-medium text-gray-900 mb-4 flex items-center gap-2">
                        <User className="w-5 h-5 text-amber-600" />
                        Personal Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-500 mb-1">Full Name</label>
                          {isEditing ? (
                            <input
                              type="text"
                              name="name"
                              value={editForm.name}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none"
                            />
                          ) : (
                            <p className="text-gray-900">{user.name}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm text-gray-500 mb-1">Email Address</label>
                          {isEditing ? (
                            <input
                              type="email"
                              name="email"
                              value={editForm.email}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none"
                            />
                          ) : (
                            <p className="text-gray-900">{user.email}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm text-gray-500 mb-1">Phone Number</label>
                          {isEditing ? (
                            <input
                              type="tel"
                              name="phone"
                              value={editForm.phone}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none"
                            />
                          ) : (
                            <p className="text-gray-900">{user.phone}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Address */}
                    <div className="pt-4 border-t border-gray-100">
                      <h3 className="text-md font-medium text-gray-900 mb-4 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-amber-600" />
                        Shipping Address
                      </h3>
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="block text-sm text-gray-500 mb-1">Street Address</label>
                          {isEditing ? (
                            <input
                              type="text"
                              name="address"
                              value={editForm.address}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none"
                            />
                          ) : (
                            <p className="text-gray-900">{user.address}</p>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm text-gray-500 mb-1">City</label>
                            {isEditing ? (
                              <input
                                type="text"
                                name="city"
                                value={editForm.city}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none"
                              />
                            ) : (
                              <p className="text-gray-900">{user.city}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-sm text-gray-500 mb-1">State</label>
                            {isEditing ? (
                              <input
                                type="text"
                                name="state"
                                value={editForm.state}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none"
                              />
                            ) : (
                              <p className="text-gray-900">{user.state}</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-sm text-gray-500 mb-1">Pincode</label>
                            {isEditing ? (
                              <input
                                type="text"
                                name="pincode"
                                value={editForm.pincode}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none"
                              />
                            ) : (
                              <p className="text-gray-900">{user.pincode}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Security */}
                    <div className="pt-4 border-t border-gray-100">
                      <h3 className="text-md font-medium text-gray-900 mb-4 flex items-center gap-2">
                        <Lock className="w-5 h-5 text-amber-600" />
                        Security
                      </h3>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:border-amber-400 hover:text-amber-600 transition-colors">
                        Change Password
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div> 
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfilePage
