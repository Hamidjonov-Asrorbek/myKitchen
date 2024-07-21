import { createSlice } from "@reduxjs/toolkit";

type DarkModeState = {
  value: boolean;
};
const initialState: DarkModeState = {
  value: localStorage.getItem("darkmode") === "light" ? true : false,
};

export const darkModeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.value = !state.value;
      localStorage.setItem("darkmode", state.value ? "light" : "dark");
    },
  },
});

export const { toggleDarkMode } = darkModeSlice.actions;

export const selectDarkMode = (state: { darkMode: DarkModeState }) =>
  state.darkMode.value;

export default darkModeSlice.reducer;
