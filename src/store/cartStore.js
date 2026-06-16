// src/store/cartStore.js (Using Zustand for better performance)
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'react-hot-toast';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      
      addItem: (product, quantity = 1, size = null) => {
        const items = get().items;
        const existingItem = items.find(
          (item) => item.id === product.id && item.size === size
        );
        
        let newItems;
        if (existingItem) {
          newItems = items.map((item) =>
            item.id === product.id && item.size === size
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          newItems = [...items, { ...product, quantity, size, cartId: crypto.randomUUID() }];
        }
        
        set({ items: newItems, isOpen: true });
        toast.success(`${product.name} added to cart`);
        
        // Analytics tracking
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'add_to_cart', {
            currency: 'USD',
            value: product.price * quantity,
            items: [{ id: product.id, name: product.name, quantity }],
          });
        }
      },
      
      removeItem: (cartId) => {
        set((state) => ({
          items: state.items.filter((item) => item.cartId !== cartId),
        }));
        toast.success('Item removed from cart');
      },
      
      updateQuantity: (cartId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(cartId);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.cartId === cartId ? { ...item, quantity } : item
          ),
        }));
      },
      
      clearCart: () => {
        set({ items: [] });
        toast.success('Cart cleared');
      },
      
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      
      getTotalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
      
      getTotalPrice: () => {
        return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },
    }),
    {
      name: 'lumiere-cart',
      version: 1,
    }
  )
);