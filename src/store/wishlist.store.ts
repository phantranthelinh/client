import { Product } from "@/entities/product";
import { create } from "zustand";

type WishlistState = {
  wishlistItems: Product[];
  addToWishlist: (item: Product) => void;
  deleteFromWishlist: (id: string) => void;
};

const useWishlistStore = create<WishlistState>((set) => ({
  wishlistItems: [],

  addToWishlist: (item) => {
    set((state) => {
      const existingItem = state.wishlistItems.find((p) => p._id === item._id);
      if (!existingItem) {
        return { wishlistItems: [...state.wishlistItems, item] };
      }
      return state;
    });
  },

  deleteFromWishlist: (id) => {
    set((state) => ({
      wishlistItems: state.wishlistItems.filter((item) => item._id !== id),
    }));
  },
}));

// Custom hook to access the wishlist store
export const useWishlist = () => {
  return useWishlistStore();
};

// Exporting methods for direct use
export const { addToWishlist, deleteFromWishlist } =
  useWishlistStore.getState();
