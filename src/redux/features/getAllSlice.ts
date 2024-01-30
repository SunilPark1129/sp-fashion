import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BasketProp, CategoryBasketProp } from "../../model/stateProps";
import { BASE_URL } from "../../data/key";

export const requestHTTPAll = createAsyncThunk("api/fetchAll", async () => {
  const response = await fetch(`${BASE_URL}/results/`);
  if (!response.ok) {
    throw new Error("could not response");
  }
  return (await response.json()) as CategoryBasketProp;
});

interface PostState {
  loading: boolean;
  data: BasketProp[];
  error: string | undefined;
}

const initialState: PostState = {
  loading: false,
  data: [],
  error: "",
};

export const getAllSlice = createSlice({
  name: "getPost",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(requestHTTPAll.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(requestHTTPAll.fulfilled, (state, action) => {
      state.loading = false;
      const temp: BasketProp[] = [];
      Object.values(action.payload).forEach((item) => {
        temp.push(...item);
      });
      state.data = temp;
    });
    builder.addCase(requestHTTPAll.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default getAllSlice.reducer;
