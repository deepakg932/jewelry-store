// src/components/shop/ProductSort.jsx (Enhanced with additional features)
import React, { useState, useRef, useEffect } from 'react'

const ProductSort = ({ 
  value, 
  onChange, 
  options,
  disabled = false,
  onClear 
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const selectedLabel = options.find(opt => opt.value === value)?.label || 'Sort by'

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen])

  const handleSelect = (optValue) => {
    if (disabled) return
    onChange(optValue)
    setIsOpen(false)
  }

  const getSortIcon = (optionValue) => {
    if (optionValue.includes('price-asc')) return '↑'
    if (optionValue.includes('price-desc')) return '↓'
    if (optionValue.includes('name-asc')) return 'A→Z'
    if (optionValue.includes('name-desc')) return 'Z→A'
    return null
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`flex items-center gap-2 px-4 py-2.5 border rounded-xl text-sm transition-all duration-300 min-w-[160px] justify-between ${
          disabled 
            ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
            : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-300'
        }`}
      >
        <div className="flex items-center gap-2">
          {/* Sort icon */}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
          </svg>
          <span className="font-light">{selectedLabel}</span>
        </div>
        <svg 
          className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && !disabled && (
        <>
          {/* Backdrop for mobile */}
          <div 
            className="fixed inset-0 z-0 md:hidden" 
            onClick={() => setIsOpen(false)}
          />
          
          <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 z-10 overflow-hidden animate-fade-in">
            <div className="py-1">
              {options.map((opt, index) => {
                const icon = getSortIcon(opt.value)
                const isSelected = value === opt.value
                
                return (
                  <button
                    key={opt.value}
                    onClick={() => handleSelect(opt.value)}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-all duration-200 flex items-center justify-between group ${
                      isSelected
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                    style={{
                      animation: `slideIn 0.2s ease-out ${index * 0.03}s forwards`,
                      opacity: 0,
                      transform: 'translateX(-10px)'
                    }}
                  >
                    <div className="flex items-center gap-2">
                      {icon && (
                        <span className={`text-xs font-mono ${isSelected ? 'text-white/70' : 'text-gray-400'}`}>
                          {icon}
                        </span>
                      )}
                      <span>{opt.label}</span>
                    </div>
                    {isSelected && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                )
              })}
            </div>
            
            {/* Clear sort option */}
            {onClear && value !== 'featured' && (
              <>
                <div className="border-t border-gray-100 my-1" />
                <button
                  onClick={() => {
                    onClear()
                    setIsOpen(false)
                  }}
                  className="w-full text-left px-4 py-2.5 text-sm text-gray-500 hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Clear Sort
                </button>
              </>
            )}
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  )
}

export default ProductSort