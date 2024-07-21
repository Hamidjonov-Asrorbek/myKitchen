import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "../products/productsSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import cartSlice from "../cart/cartSlice";
export const store = configureStore({
  reducer: {
    products: productsSlice,
    cart: cartSlice,
  },
});
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
