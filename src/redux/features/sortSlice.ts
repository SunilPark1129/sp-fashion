import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { FilteredProp } from "../../model/stateProps";

type SortedProp = {
  data: FilteredProp[] | null;
};

const initialState: SortedProp = {
  data: null,
};

export const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    updateSort: (state: any, action: PayloadAction<FilteredProp[]>) => {
      state.data = action.payload;
    },
    cleanupSort: (state: any) => {
      state.data = null;
    },
  },
});

export const { updateSort, cleanupSort } = sortSlice.actions;

export default sortSlice.reducer;
