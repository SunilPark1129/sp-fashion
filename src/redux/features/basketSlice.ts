import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { FilteredProp, CategoryProp } from "../../model/stateProps";

const initialState: CategoryProp = {
  coat: [],
  hoodie: [],
  shirt: [],
  sweater: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addBasket: (state: any, action: PayloadAction<FilteredProp>) => {
      state[action.payload.category] = [
        ...state[action.payload.category],
        { ...action.payload, basket: true },
      ];
    },
    deleteBasket: (state: any, action: PayloadAction<FilteredProp>) => {
      state[action.payload.category] = state[action.payload.category].filter(
        (item: FilteredProp) => item.id !== action.payload.id
      );
    },
  },
});

export const { addBasket, deleteBasket } = basketSlice.actions;

export default basketSlice.reducer;
