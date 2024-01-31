import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { FilteredProp } from "../../model/stateProps";

type ResultType = { results: FilteredProp[] };

const initialState: ResultType = {
  results: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addBasket: (state: any, action: PayloadAction<FilteredProp>) => {
      state.results = [...state.results, { ...action.payload, basket: true }];
      localStorage.setItem(
        "basket-state",
        JSON.stringify({ state: state.results })
      );
    },
    deleteBasket: (state: any, action: PayloadAction<FilteredProp>) => {
      state.results = state.results.filter(
        ({ id }: { id: string }) => id !== action.payload.id
      );
      localStorage.setItem(
        "basket-state",
        JSON.stringify({ state: state.results })
      );
    },
    updateBasketState: (state: any, action: PayloadAction<[]>) => {
      state.results = action.payload;
    },
  },
});

export const { addBasket, deleteBasket, updateBasketState } =
  basketSlice.actions;

export default basketSlice.reducer;
