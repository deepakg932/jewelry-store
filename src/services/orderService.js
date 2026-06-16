// src/services/orderService.js
import { apiClient } from '@utils/apiClient'

class OrderService {
  async createOrder(orderData) {
    try {
      const response = await apiClient.post('/orders', orderData)
      return { success: true, orderId: response.data?.id || Date.now() }
    } catch (error) {
      console.warn('Order API failed, simulating order:', error)
      return { success: true, orderId: Date.now(), isMock: true }
    }
  }

  async getOrders() {
    try {
      const response = await apiClient.get('/orders')
      return response.data || []
    } catch (error) {
      console.warn('Failed to fetch orders, returning empty array')
      return []
    }
  }

  async getOrderById(id) {
    try {
      const response = await apiClient.get(`/orders/${id}`)
      return response.data
    } catch (error) {
      console.warn(`Failed to fetch order ${id}`)
      return null
    }
  }
}

export const orderService = new OrderService()