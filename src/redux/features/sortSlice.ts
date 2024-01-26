import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { FilteredProp } from "../../model/stateProps";

type SortedProp = {
  data: FilteredProp[];
};

const initialState: SortedProp = {
  data: [],
};

export const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    updateSort: (state: any, action: PayloadAction<FilteredProp[]>) => {
      state.data = action.payload;
    },
    addSort: (state: any, action: PayloadAction<FilteredProp[]>) => {
      state.data = [...state.data, ...action.payload];
    },
    deleteSort: (state: any, action: PayloadAction<string>) => {
      state.data = state.data.filter(
        (item: FilteredProp) => item.color !== action.payload
      );
    },
  },
});

export const { updateSort, addSort, deleteSort } = sortSlice.actions;

export default sortSlice.reducer;
