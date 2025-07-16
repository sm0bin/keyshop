import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    product: null,
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setProduct: (state, action) => {
      state.product = action.payload;
    },
    clearProduct: (state) => {
      state.product = null;
    },
  },
});

export const { setProducts, setProduct, clearProduct } = productSlice.actions;

export default productSlice.reducer;

export const selectProducts = (state: RootState) => state.product.products;
export const selectProduct = (state: RootState) => state.product.product;
