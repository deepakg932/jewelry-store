// src/services/productService.js
import { apiClient } from '@utils/apiClient'
import { staticProducts } from '@data/products'

class ProductService {
  constructor() {
    this.useApi = true
    this.apiAvailable = true
  }

  async getAll() {
    try {
      if (!this.useApi) throw new Error('API disabled')
      const response = await apiClient.get('/products')
      if (response && response.data) {
        this.apiAvailable = true
        return this.transformApiProducts(response.data)
      }
      throw new Error('Invalid response')
    } catch (error) {
      console.warn('API failed, using static data:', error.message)
      this.apiAvailable = false
      return staticProducts
    }
  }

  async getById(id) {
    try {
      if (!this.useApi) throw new Error('API disabled')
      const response = await apiClient.get(`/products/${id}`)
      if (response && response.data) {
        return this.transformApiProduct(response.data)
      }
      throw new Error('Invalid response')
    } catch (error) {
      console.warn(`API failed for product ${id}, using static data`)
      return staticProducts.find(p => p.id === parseInt(id)) || staticProducts[0]
    }
  }

  async getByCategory(category) {
    try {
      const all = await this.getAll()
      return all.filter(p => p.category.toLowerCase() === category.toLowerCase())
    } catch (error) {
      return staticProducts.filter(p => p.category.toLowerCase() === category.toLowerCase())
    }
  }

  async search(query) {
    try {
      const all = await this.getAll()
      const q = query.toLowerCase()
      return all.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      )
    } catch (error) {
      return staticProducts.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase())
      )
    }
  }

  transformApiProducts(apiProducts) {
    if (!Array.isArray(apiProducts)) return staticProducts
    return apiProducts.slice(0, 20).map(p => ({
      id: p.id,
      name: p.title || `Product ${p.id}`,
      price: Math.floor(p.id * 10) + 50,
      originalPrice: Math.floor(p.id * 10) + 80,
      category: ['Rings', 'Necklaces', 'Earrings', 'Bracelets'][p.id % 4],
      description: p.body || 'Beautiful minimalist jewelry piece.',
      images: [`https://picsum.photos/id/${p.id + 100}/800/800`],
      inStock: p.id % 3 !== 0,
      rating: 4 + (p.id % 10) / 10,
      reviewCount: p.id * 10,
      material: ['Gold', 'Silver', 'Platinum'][p.id % 3],
    }))
  }

  transformApiProduct(apiProduct) {
    return {
      id: apiProduct.id,
      name: apiProduct.title,
      price: apiProduct.id * 10,
      category: 'Jewelry',
      description: apiProduct.body,
      images: [`https://picsum.photos/id/${apiProduct.id + 100}/800/800`],
      inStock: true,
      rating: 4.5,
    }
  }
}

export const productService = new ProductService()