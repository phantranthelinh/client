/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProductDto } from "@/models/product";
import { create } from "zustand";

export type TCartItem = {
  cartItemId: string;
  quantity: number;
  size: string;
  totalPrice?: number;
} & ProductDto;

interface CartState {
  cartItems: TCartItem[];
  checkoutItems: TCartItem[];
  addToCart: (item: Omit<TCartItem, "totalPrice">) => void;
  updateCart: (id: string, key: keyof TCartItem, val: number) => void;
  deleteFromCart: (id: string) => void;
  addCheckoutItems: (item: any) => void;
  clearCart: () => void;
  resetCheckoutItems: () => void;
}

const useCartStore = create<CartState>((set, get) => ({
  cartItems: JSON.parse(localStorage.getItem("cartItems") || "[]"),
  checkoutItems: [],
  addToCart: (item) => {
    set((state) => {
      const existingItem = state.cartItems.find(
        (p) => p._id === item._id && p.size === item.size
      );

      let updatedCartItems;

      if (existingItem) {
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
          totalPrice: existingItem.price * (existingItem.quantity + 1),
        };

        updatedCartItems = state.cartItems.map((i) =>
          i._id === item._id && i.size === item.size ? updatedItem : i
        );
      } else {
        updatedCartItems = [
          ...state.cartItems,
          { ...item, quantity: 1, totalPrice: item.price },
        ];
      }

      // Store updated cart in localStorage
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

      return { cartItems: updatedCartItems };
    });
  },

  updateCart: (cartItemId, key, val) => {
    const updatedCartItems = get().cartItems.map((item) => {
      if (item.cartItemId === cartItemId) {
        const updatedItem = { ...item, [key]: val };
        if (key === "quantity") {
          updatedItem.totalPrice = updatedItem.price * val;
        }
        return updatedItem;
      }
      return item;
    });

    set({ cartItems: updatedCartItems });
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  },

  deleteFromCart: (id) => {
    const updatedCartItems = get().cartItems.filter(
      (item) => item.cartItemId !== id
    );
    set({ cartItems: updatedCartItems });
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  },

  clearCart: () => {
    set({ cartItems: [] });
    localStorage.setItem("cartItems", JSON.stringify([]));
  },

  addCheckoutItems: (item) => {
    set((state) => {
      const existingItemIndex = state.checkoutItems.findIndex(
        (existingItem) => existingItem._id === item._id
      );
      if (existingItemIndex !== -1) {
        return {
          checkoutItems: state.checkoutItems.map((existingItem, index) => {
            if (index === existingItemIndex) {
              return {
                ...existingItem,
                quantity: (existingItem.quantity || 1) + 1,
              };
            }
            return existingItem;
          }),
        };
      } else {
        return {
          checkoutItems: [...state.checkoutItems, { ...item, quantity: 1 }],
        };
      }
    });
  },
  resetCheckoutItems: () => set({ checkoutItems: [] }),
}));

export const useCart = () => {
  return useCartStore();
};

export const {
  addToCart,
  updateCart,
  deleteFromCart,
  clearCart,
  addCheckoutItems,
  resetCheckoutItems,
} = useCartStore.getState();
