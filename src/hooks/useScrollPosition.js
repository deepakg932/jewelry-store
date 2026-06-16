// src/hooks/useScrollPosition.js
import { useState, useEffect } from 'react'

export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0)
  const [isAtTop, setIsAtTop] = useState(true)
  const [direction, setDirection] = useState('up')
  const [lastY, setLastY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      setScrollY(currentY)
      setIsAtTop(currentY === 0)
      setDirection(currentY > lastY ? 'down' : 'up')
      setLastY(currentY)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastY])

  return { scrollY, isAtTop, direction }
}