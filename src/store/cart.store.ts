import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Product } from "@/types/product.types";

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set) => ({
        items: [],
        addToCart: (product) =>
          set((state) => {
            const existing = state.items.find((item) => item.id === product.id);
            if (existing) {
              return {
                items: state.items.map((item) =>
                  item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item,
                ),
              };
            }
            return {
              items: [...state.items, { ...product, quantity: 1 }],
            };
          }),
        removeFromCart: (productId) =>
          set((state) => ({
            items: state.items.filter((item) => item.id !== productId),
          })),
        updateQuantity: (productId, quantity) =>
          set((state) => ({
            items: state.items
              .map((item) =>
                item.id === productId ? { ...item, quantity } : item,
              )
              .filter((item) => item.quantity > 0),
          })),
        clearCart: () => ({ items: [] }),
      }),
      {
        name: "reactrtu-cart",
        partialize: (state) => ({ items: state.items }),
      },
    ),
    { name: "CartStore" },
  ),
);
