import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { BasketProp } from "../../model/stateProps";

export interface BasketState {
  basket: BasketProp[];
}

const initialState: BasketState = {
  basket: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addBasket: (state, action: PayloadAction<BasketProp>) => {
      state.basket = [...state.basket, action.payload];
    },
    deleteBasket: (state, action: PayloadAction<string>) => {
      state.basket = state.basket.filter(
        (item: BasketProp) => item.id !== action.payload
      );
    },
    clearBasket: (state) => {
      state = initialState;
    },
  },
});

export const { addBasket, deleteBasket } = basketSlice.actions;

export default basketSlice.reducer;
