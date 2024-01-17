import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { FilteredProp, LikeStateProp } from "../../model/stateProps";

const initialState: LikeStateProp = {
  coat: [],
  hoodie: [],
  shirt: [],
  sweater: [],
};

export const likeSlice = createSlice({
  name: "likeState",
  initialState,
  reducers: {
    addLikeState: (state: any, action: PayloadAction<FilteredProp>) => {
      state[action.payload.category] = [
        ...state[action.payload.category],
        { ...action.payload, like: true },
      ];
    },
    deleteLikeState: (state: any, action: PayloadAction<FilteredProp>) => {
      state[action.payload.category] = state[action.payload.category].filter(
        (item: FilteredProp) => item.id !== action.payload.id
      );
    },
  },
});

export const { addLikeState, deleteLikeState } = likeSlice.actions;

export default likeSlice.reducer;
