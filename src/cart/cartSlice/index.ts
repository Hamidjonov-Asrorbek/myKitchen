import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { message } from "antd";

type Product = {
  id: string;
  [key: string]: any;
};

type CartState = {
  products: Product[];
};

const initialState: CartState = {
  products: JSON.parse(localStorage.getItem("cart") ?? "[]") ?? [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const existingItem = state.products.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        message.warning("Item already in cart");
      } else {
        state.products = [...state.products, action.payload];
        message.success("Item added to cart");
        localStorage.setItem("cart", JSON.stringify(state.products));
      }
    },
    deleteToCart(state, action: PayloadAction<{ id: string }>) {
      state.products = state.products.filter(
        (item) => item.id !== action.payload.id
      );
      localStorage.setItem("cart", JSON.stringify(state.products));
      message.success("Item deleted from cart");
    },
    amountCart(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
      localStorage.setItem("cart", JSON.stringify(state.products));
    },
  },
});

export const { addToCart, deleteToCart, amountCart } = cartSlice.actions;
export default cartSlice.reducer;
