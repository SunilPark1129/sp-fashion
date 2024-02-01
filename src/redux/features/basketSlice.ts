import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { FilteredProp } from "../../model/stateProps";
import Cookies from "js-cookie";

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
      Cookies.set(
        "project-sp1129-basket-wishlist",
        JSON.stringify({ state: state.results }),
        { sameSite: "strict", expires: 7 }
      );
    },
    deleteBasket: (state: any, action: PayloadAction<FilteredProp>) => {
      state.results = state.results.filter(
        ({ id }: { id: string }) => id !== action.payload.id
      );
      Cookies.set(
        "project-sp1129-basket-wishlist",
        JSON.stringify({ state: state.results }),
        { sameSite: "strict", expires: 7 }
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
