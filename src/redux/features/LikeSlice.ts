import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { FilteredProp } from "../../model/stateProps";
import Cookies from "js-cookie";

type ResultType = { results: FilteredProp[] };

const initialState: ResultType = {
  results: [],
};

export const likeSlice = createSlice({
  name: "likeState",
  initialState,
  reducers: {
    addLikeState: (state: any, action: PayloadAction<FilteredProp>) => {
      state.results = [...state.results, { ...action.payload, like: true }];
      Cookies.set(
        "project-sp1129-like-wishlist",
        JSON.stringify({ state: state.results }),
        { sameSite: "strict", expires: 7 }
      );
    },
    deleteLikeState: (state: any, action: PayloadAction<FilteredProp>) => {
      state.results = state.results.filter(
        ({ id }: { id: string }) => id !== action.payload.id
      );
      Cookies.set(
        "project-sp1129-like-wishlist",
        JSON.stringify({ state: state.results }),
        { sameSite: "strict", expires: 7 }
      );
    },
    updateLikeState: (state: any, action: PayloadAction<[]>) => {
      state.results = action.payload;
    },
  },
});

export const { addLikeState, deleteLikeState, updateLikeState } =
  likeSlice.actions;

export default likeSlice.reducer;
