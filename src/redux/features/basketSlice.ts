import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { FilteredProp, CategoryProp } from "../../model/stateProps";

type ResultType = { results: CategoryProp };

const initialState: ResultType = {
  results: {
    coat: [],
    hoodie: [],
    shirt: [],
    sweater: [],
  },
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addBasket: (state: any, action: PayloadAction<FilteredProp>) => {
      state.results[action.payload.category] = [
        ...state.results[action.payload.category],
        { ...action.payload, basket: true },
      ];
      localStorage.setItem(
        "basket-state",
        JSON.stringify({ state: state.results })
      );
    },
    deleteBasket: (state: any, action: PayloadAction<FilteredProp>) => {
      state.results[action.payload.category] = state.results[
        action.payload.category
      ].filter((item: FilteredProp) => item.id !== action.payload.id);
      localStorage.setItem(
        "basket-state",
        JSON.stringify({ state: state.results })
      );
    },
    updateBasketState: (state: any, action: PayloadAction<CategoryProp>) => {
      state.results = action.payload;
    },
  },
});

export const { addBasket, deleteBasket, updateBasketState } =
  basketSlice.actions;

export default basketSlice.reducer;
