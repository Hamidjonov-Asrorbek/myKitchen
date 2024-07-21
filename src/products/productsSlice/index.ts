import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { message } from "antd";

// Define types for your product and state
type Product = {
  id: string;
  title: string;
};

type ProductsState = {
  data: Product[];
  filterData: Product[];
};

// Initial state with type
const initialState: ProductsState = {
  data: [],
  filterData: [],
};

// Define slice with TypeScript
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getData: (state, action: PayloadAction<Product[]>) => {
      state.data = action.payload;
      state.filterData = action.payload;
    },
    // searchData: (state, action: PayloadAction<string>) => {
    //   state.filterData = state.data.filter(({ title }) =>
    //     title.toLowerCase().includes(action.payload.toLowerCase())
    //   );
    // },
    deleteData: (state, action: PayloadAction<{ id: string }>) => {
      const itemId = action.payload.id;
      state.data = state.data.filter((item) => item.id !== itemId);
      localStorage.setItem("products", JSON.stringify(state.data));
      state.filterData = state.data;
      message.success("Item deleted");
    },
  },
});

export const { getData, deleteData } = productsSlice.actions;
export default productsSlice.reducer;
