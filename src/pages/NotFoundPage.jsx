// src/pages/NotFoundPage.jsx
import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className="container-custom py-32 text-center">
      <div className="text-7xl mb-4">✨</div>
      <h1 className="text-3xl font-heading font-light text-primary mb-2">404 - Page Not Found</h1>
      <p className="text-textMedium mb-8">The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/" className="inline-block px-8 py-3 bg-primary text-white rounded-xl hover:bg-primary/90">Return Home</Link>
    </div>
  )
}

export default NotFoundPage