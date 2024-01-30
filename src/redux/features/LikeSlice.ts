import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { FilteredProp, CategoryProp } from "../../model/stateProps";

type ResultType = { results: CategoryProp };

const initialState: ResultType = {
  results: { coat: [], hoodie: [], shirt: [], sweater: [] },
};

export const likeSlice = createSlice({
  name: "likeState",
  initialState,
  reducers: {
    addLikeState: (state: any, action: PayloadAction<FilteredProp>) => {
      state.results[action.payload.category] = [
        ...state.results[action.payload.category],
        { ...action.payload, like: true },
      ];
      localStorage.setItem(
        "like-state",
        JSON.stringify({ state: state.results })
      );
    },
    deleteLikeState: (state: any, action: PayloadAction<FilteredProp>) => {
      state.results[action.payload.category] = state.results[
        action.payload.category
      ].filter((item: FilteredProp) => item.id !== action.payload.id);
      localStorage.setItem(
        "like-state",
        JSON.stringify({ state: state.results })
      );
    },
    updateLikeState: (state: any, action: PayloadAction<CategoryProp>) => {
      state.results = action.payload;
      console.log(state.results);
    },
  },
});

export const { addLikeState, deleteLikeState, updateLikeState } =
  likeSlice.actions;

export default likeSlice.reducer;
