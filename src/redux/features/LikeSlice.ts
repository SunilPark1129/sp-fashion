import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { FilteredProp } from "../../model/stateProps";

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
      localStorage.setItem(
        "like-state",
        JSON.stringify({ state: state.results })
      );
    },
    deleteLikeState: (state: any, action: PayloadAction<FilteredProp>) => {
      state.results = state.results.filter(
        ({ id }: { id: string }) => id !== action.payload.id
      );
      localStorage.setItem(
        "like-state",
        JSON.stringify({ state: state.results })
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
