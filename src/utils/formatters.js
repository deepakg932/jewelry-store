// src/utils/formatters.js
export const formatters = {
  currency: (amount) => {
    // Handle both string and number inputs
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    if (isNaN(numAmount)) return '$0.00';
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(numAmount);
  },
  
  date: (date, format = 'MMM dd, yyyy') => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  },
  
  phone: (phone) => {
    if (!phone) return '';
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) return `(${match[1]}) ${match[2]}-${match[3]}`;
    return phone;
  },
  
  cardNumber: (number) => {
    if (!number) return '';
    return number.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
  },
  
  truncate: (text, length = 100) => {
    if (!text) return '';
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
  },
};

// Safe formatPrice function that handles both strings and numbers
export const formatPrice = (price) => {
  // If price is undefined, null, or empty
  if (price === undefined || price === null || price === '') {
    return '$0.00';
  }
  
  // Convert to number if it's a string
  let numPrice;
  if (typeof price === 'string') {
    numPrice = parseFloat(price);
  } else {
    numPrice = price;
  }
  
  // Check if it's a valid number
  if (isNaN(numPrice)) {
    return '$0.00';
  }
  
  // Format the price
  return `$${numPrice.toFixed(2)}`;
};

// Safe formatDiscount function
export const formatDiscount = (original, current) => {
  const origNum = typeof original === 'string' ? parseFloat(original) : original;
  const currNum = typeof current === 'string' ? parseFloat(current) : current;
  
  if (isNaN(origNum) || isNaN(currNum) || origNum === 0) {
    return 0;
  }
  
  return Math.round(((origNum - currNum) / origNum) * 100);
};