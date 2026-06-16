// src/config/api.js
export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL || 'https://jsonplaceholder.typicode.com',
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
  useMockApi: import.meta.env.VITE_USE_MOCK_API === 'true',
  endpoints: {
    products: '/products',
    product: (id) => `/products/${id}`,
    categories: '/categories',
    orders: '/orders',
    contact: '/contact',
  },
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
}