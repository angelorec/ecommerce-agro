import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { HiperProduct } from './hiper/types';

export interface CartItem {
  product: HiperProduct;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  
  // Actions
  addItem: (product: HiperProduct, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setIsOpen: (isOpen: boolean) => void;
  toggleCart: () => void;
  
  // Computed (getters)
  getTotalItems: () => number;
  getSubtotal: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      
      addItem: (product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(item => item.product.id === product.id);
          
          if (existingItem) {
            // Update quantity, up to max stock
            const newQuantity = Math.min(existingItem.quantity + quantity, product.stock);
            return {
              items: state.items.map(item => 
                item.product.id === product.id 
                  ? { ...item, quantity: newQuantity } 
                  : item
              ),
              isOpen: true // Auto open cart on add
            };
          }
          
          return {
            items: [...state.items, { product, quantity: Math.min(quantity, product.stock) }],
            isOpen: true
          };
        });
      },
      
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter(item => item.product.id !== productId)
        }));
      },
      
      updateQuantity: (productId, quantity) => {
        set((state) => {
          const item = state.items.find(i => i.product.id === productId);
          if (!item) return state;
          
          const newQuantity = Math.max(1, Math.min(quantity, item.product.stock));
          
          return {
            items: state.items.map(i => 
              i.product.id === productId 
                ? { ...i, quantity: newQuantity } 
                : i
            )
          };
        });
      },
      
      clearCart: () => set({ items: [] }),
      
      setIsOpen: (isOpen) => set({ isOpen }),
      
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      
      getTotalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
      
      getSubtotal: () => get().items.reduce((total, item) => {
        const price = item.product.promotionalPrice || item.product.price;
        return total + (price * item.quantity);
      }, 0),
    }),
    {
      name: 'rancho-cart-storage',
      // Don't persist isOpen state
      partialize: (state) => ({ items: state.items }),
    }
  )
);
