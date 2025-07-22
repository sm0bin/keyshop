import { createSlice } from "@reduxjs/toolkit";
// import type { RootState } from "@/redux/store";
import type { ICartItem } from "@/types";

// interface ICartItem {
//   productId: string;
//   quantity: number;
//   price: number;
// }

const initialState = {
  items: [] as ICartItem[],
  totalAmount: 0,
  totalItems: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    setCartItems: (state, action) => {
      state.items = action.payload.items;
      state.totalAmount = action.payload.totalAmount;
      state.totalItems = action.payload.totalItems;
    },
    addItemToCart: (state, action) => {
      const item = action.payload;
      console.log("Adding item to cart:", item);
      const existingItem = state.items.find((i) => i.productId === item._id);
      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.product = item;
        // existingItem.price += item.price * item.quantity;
      } else {
        state.items.push({
          productId: item._id,
          quantity: 1,
          price: item.price,
          product: item,
        });
      }
      state.totalAmount += item.price * item.quantity;
      state.totalItems += 1;
    },
    removeItemFromCart: (state, action) => {
      const id = action.payload;
      const existingItemIndex = state.items.findIndex(
        (i) => i.productId === id
      );
      if (existingItemIndex >= 0) {
        const existingItem = state.items[existingItemIndex];
        state.totalAmount -= existingItem.price * existingItem.quantity;
        state.totalItems -= existingItem.quantity;
        state.items.splice(existingItemIndex, 1);
      }
    },
    updateCartItem: (state, action) => {
      const { productId, quantity } = action.payload;
      const existingItem = state.items.find((i) => i.productId === productId);
      if (existingItem) {
        const quantityDifference = quantity - existingItem.quantity;
        existingItem.quantity = quantity;
        state.totalAmount += existingItem.price * quantityDifference;
        state.totalItems += quantityDifference;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.totalItems = 0;
    },
  },
});

export const {
  setCartItems,
  addItemToCart,
  removeItemFromCart,
  updateCartItem,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
