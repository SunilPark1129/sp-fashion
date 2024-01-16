import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface BasketState {
  items: PayloadProp[];
}

export interface PayloadProp {
  id: string;
  image: string;
  name: string;
  color: string;
}

const initialState: BasketState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addBasket: (state, action: PayloadAction<PayloadProp>) => {
      state.items = [...state.items, action.payload];
    },
    deleteBasket: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item: PayloadProp) => item.id !== action.payload
      );
    },
    clearBasket: (state) => {
      state = initialState;
    },
  },
});

export const { addBasket, deleteBasket } = basketSlice.actions;

export default basketSlice.reducer;
