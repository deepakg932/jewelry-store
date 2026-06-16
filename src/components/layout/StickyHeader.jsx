// src/components/layout/StickyHeader.jsx
import React, { useState, useEffect } from 'react';

const StickyHeader = ({ children }) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`sticky-header ${isSticky ? 'shadow-sm' : ''}`}>
      {children}
    </div>
  );
};

export default StickyHeader;